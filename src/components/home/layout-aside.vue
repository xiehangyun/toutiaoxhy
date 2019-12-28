<template>
  <div class="layout-aside" style="transition: 0.3s all;" :style="unfoldOrfold ? 'width:60px' : 'width:230px'">
    <div class="title" :style="unfoldOrfold ? 'width:60px' : 'width:230px'" style="transition: 0.3s all;">
      <img :src="unfoldOrfold ? smallImg : bigImg" alt />
    </div>
    <el-menu :collapse="unfoldOrfold" router background-color="#323745" style="transition: 0.3s all;" text-color="#adafb5" :style="unfoldOrfold ? 'width:60px' : 'width:230px'" active-text-color="#ffd04b" :default-active="onRoutes">
      <el-menu-item index="/home"><i class="el-icon-s-home"></i><span>首页</span></el-menu-item>
      <el-submenu index='1'>
        <template slot="title"><i class="el-icon-reading"></i><span>内容管理</span></template>
        <el-menu-item index="/home/publish"><i class="el-icon-s-promotion"></i>发布文章</el-menu-item>
        <el-menu-item index="/home/articles"><i class="el-icon-s-management"></i>文章列表</el-menu-item>
        <el-menu-item index="/home/comment"><i class="el-icon-s-comment"></i>评论列表</el-menu-item>
        <el-menu-item index="/home/material"><i class="el-icon-picture"></i>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index='2'>
        <template slot="title"><i class="el-icon-s-flag"></i><span>粉丝管理</span></template>
        <el-menu-item index="/home/picture"><i class="el-icon-picture-outline-round"></i>图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo"><i class="el-icon-picture-outline"></i>粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslife"><i class="el-icon-s-grid"></i>粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslist"><i class="el-icon-s-order"></i>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account"><i class="el-icon-user-solid"></i><span>账户信息</span></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultAt: '',
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  },
  props: ['unfoldOrfold'],
  computed: {
    onRoutes () {
      return this.$route.path
    }
  }
}
</script>

<style lang="less">
.layout-aside {
    position: fixed;
    width: 230px;
    height: 100vh;
    overflow: hidden;
  .title {
    background-color: #2e2f32;
    text-align: center;
    padding: 10px 0px;
    img {
        height: 35px
    }
  }
}
.el-menu {
  border-right: none;
}
</style>
