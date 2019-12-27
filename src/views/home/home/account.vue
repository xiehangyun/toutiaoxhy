<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload action="abc" :http-request="saveUserImg" class="upload" :show-file-list="false">
      <div class="img-box"><img :src="formDate.photo ? formDate.photo : defaultImg" alt="" /></div>
    </el-upload>
    <el-form label-width="100px" ref="userForm" style="margin-left: 100px" :model="formDate" :rules="userRules">
      <el-form-item label="用户名" prop="name"><el-input style="width: 30%" v-model="formDate.name"></el-input></el-form-item>
      <el-form-item label="简介" prop="intro"><el-input style="width: 30%" v-model="formDate.intro"></el-input></el-form-item>
      <el-form-item label="邮箱" prop="email"><el-input style="width: 30%" v-model="formDate.email"></el-input></el-form-item>
      <el-form-item label="手机号" prop="mobile"><el-input style="width: 30%" disabled v-model="formDate.mobile"></el-input></el-form-item>
      <el-form-item>
        <el-button @click="saveUserData" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../../assets/img/787cfa53c95ebe75.jpg'),
      formDate: {
        name: '',
        intro: '',
        email: '',
        photo: '',
        mobile: ''
      },
      userRules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 2, max: 7, message: '用户名需要在2至7个字符之间' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pttern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    saveUserImg (parmas) {
      this.loading = true
      let data = new FormData()
      data.append('photo', parmas.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(result => {
        this.formDate.photo = result.data.photo
        eventBus.$emit('userAccountChange')
        this.loading = false
      })
    },
    saveUserData () {
      this.$refs.userForm.validate((isOk) => {
        if (isOk) {
          this.loading = true
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formDate
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.loading = false
            eventBus.$emit('userAccountChange')
          })
        }
      })
    },
    getUserData () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formDate = result.data
      })
    }
  },
  created () {
    this.getUserData()
  }
}
</script>

<style lang="less" scoped>
.upload {
  position: absolute;
  right: 300px;
  .img-box {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    img {
      min-width: 100%;
      max-width: 120%;
      min-height: 100%;
      max-height: 110%;
    }
  }
}
</style>
