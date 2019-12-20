<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <el-col :span="6" class="left">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right">
      <el-row type="flex" align="middle" justify="end">
        <img :src="userInfo.photo || defaultImg" alt />
        <el-dropdown trigger="click" @command="userHandle">
          <span>
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
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  created () {
    let token = window.sessionStorage.getItem('user-token')
    this.$axios({
      url: `/user/profile`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        this.userInfo = result.data.data
      })
      .catch(() => {
        this.open()
      })
  },
  methods: {
    userHandle (command) {
      if (command === 'logout') {
        window.sessionStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/xiehangyun'
      }
    },
    open () {
      this.$alert('请登陆账号', '网页提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.pushPage()
        }
      })
    },
    pushPage () {
      this.$router.push('/login')
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
