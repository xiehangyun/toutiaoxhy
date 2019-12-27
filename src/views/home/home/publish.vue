<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :model="formDate" :rules="publishRules" style="margin-left: 50px" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input style="width:60%" v-model="formDate.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:300px" v-model="formDate.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top:100px">
        <el-radio-group @change="changeType" v-model="formDate.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <publish-cover :list="formDate.cover.images" @selectOneImg="revceiveImg"></publish-cover>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formDate.channel_id">
          <el-option v-for="(item,index) in channelsList" :value="item.id" :key="index" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticales()" type="primary">发布</el-button>
        <el-button @click="publishArticales(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formDate: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channelsList: [],
      publishRules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题长度需要在5-30个字之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道不能为空', trigger: 'blur' }]
      },
      articlesId: ''
    }
  },
  watch: {
    $route: function (to, form) {
      if (Object.keys(to.params).length) {
      } else {
        this.formDate = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    revceiveImg (img, index) {
      this.formDate.cover.images = this.formDate.cover.images.map((item, i) => index === i ? img : item)
    },
    changeType () {
      if (this.formDate.cover.type === 0) {
        this.formDate.cover.images = []
      } else if (this.formDate.cover.type === 1) {
        this.formDate.cover.images = ['']
      } else if (this.formDate.cover.type === 3) {
        this.formDate.cover.images = ['', '', '']
      }
    },
    getChannelsList () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channelsList = result.data.channels
      })
    },
    publishArticales (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            method: this.articlesId ? 'put' : 'post',
            url: this.articlesId ? `/articles/${this.articlesId}` : `/articles`,
            params: { draft },
            data: this.formDate
          }).then(result => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticles (id) {
      this.$axios({
        url: `articles/${id}`
      }).then(result => {
        this.formDate = result.data
      })
    }
  },
  created () {
    this.getChannelsList()
    let { id } = this.$route.params
    this.articlesId = id
    id && this.getArticles(id)
  }
}
</script>

<style lang="less" scoped>

</style>
