<template>
  <div class="login">
    <el-card class="login_card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form class="myForm" ref="myForm" :model="myForm" :rules="myrules">
        <el-form-item prop="phone">
          <el-input v-model="myForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="verify">
          <el-input style="width:65%" v-model="myForm.verify" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;margin-top:1px">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="myForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="login" style="width:100%">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myForm: {
        phone: '',
        verify: '',
        agree: false
      },
      myrules: {
        phone: [{ required: true, message: '请输入您的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }],
        verify: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        agree: [{ validator: (rule, value, callback) => {
          value ? callback() : callback(new Error('您未同意用户协议'))
        } }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          console.log('校验成功')
        }
      })
    }
  }
}
</script>

<style lang='less'>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 44px;
      }
    }
    .myForm {
      margin-top: 20px;
    }
  }
}
</style>
