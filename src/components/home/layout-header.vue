<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <el-col :span="6" class="left">
      <i @click="unfoldOrfoldSwitch" :class="unfoldOrfold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right">
      <el-row type="flex" align="middle" justify="end">
        <img :src="userInfo.photo || defaultImg" alt />
        <el-dropdown trigger="click" @command="userHandle">
          <span style="cursor: pointer">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { userProfile } from '../../actions/home-header'
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      unfoldOrfold: false,
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  created () {
    this.getUserAccoount()
    eventBus.$on('userAccountChange', () => {
      this.getUserAccoount()
    })
  },
  methods: {
    unfoldOrfoldSwitch () {
      this.unfoldOrfold = !this.unfoldOrfold
      eventBus.$emit('unfoldOrfoldSwitch')
    },
    userHandle (command) {
      if (command === 'logout') {
        window.sessionStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/xiehangyun'
      }
    },
    async getUserAccoount () {
      let result = await userProfile()
      this.userInfo = result.data
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 20px;
    .title {
      margin-left: 4px;
      color: #2c3e50;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
