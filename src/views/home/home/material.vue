<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="UpDateImg" :show-file-list="false" action="aa">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="tabChange"  v-loading="loading">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="index">
            <img :src="item.url" />
            <el-row class="operate" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-on" :style="{color: item.is_collected ? 'red' : ''}" @click="collectCut(item)"></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item.id)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.tatol"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="pageChange"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="index">
            <img :src="item.url" />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.tatol"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="pageChange"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { delMaterial, collectCut, UpDateImg, getMaterial } from '../../../actions/material'
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        tatol: 0
      }
    }
  },
  methods: {
    async delMaterial (id) {
      await this.$confirm('确定要删除此素材吗？')
      await delMaterial(id.toString())
      this.getMaterial()
    },
    async collectCut (item) {
      await collectCut(item.id.toString(), { collect: !item.is_collected })
      this.getMaterial()
    },
    pageChange (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    async UpDateImg (params) {
      this.loading = true
      let form = new FormData()
      form.append('image', params.file)
      await UpDateImg(form)
      this.loading = false
      this.getMaterial()
    },
    tabChange () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    async getMaterial () {
      this.loading = true
      let result = await getMaterial({ collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize })
      this.loading = false
      this.list = result.data.results
      this.page.tatol = result.data.total_count
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
