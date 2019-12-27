<template>
  <el-tabs v-model="actionName" v-loading="loading">
    <el-tab-pane label="素材库" name="material">
      <div class="select-cover-list">
        <el-card class="cover-card" v-for="(item,index) in list" :key="index">
          <img @click="pitchOnImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="currentPageChange"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload
        :show-file-list="false"
        :http-request="saveCoverImg"
        class="upload"
        action="saveImg"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      actionName: 'material',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    saveCoverImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
        this.loading = false
      })
    },
    currentPageChange (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    pitchOnImg (url) {
      this.$emit('selectOneImg', url)
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.page.total = result.data.total_count
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-cover-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .cover-card {
    width: 120px;
    height: 120px;
    margin: 10px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload {
  display: flex;
  justify-content: center;
  i {
    font-size: 50px;
    padding: 60px;
    border: 1px dashed #ccc;
  }
}
</style>
