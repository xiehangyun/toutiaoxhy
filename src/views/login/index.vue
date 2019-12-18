<template>
    <div class="login">
        <el-card class="login_card">
            <div class="title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <el-form class="myForm">
                <el-form-item>
                    <el-input placeholder='请输入手机号'>

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width:65%"  placeholder='请输入验证码'></el-input>
                    <el-button style="float:right;margin-top:1px">发送验证码</el-button>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%;margin-top:10px">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_card {
        width: 440px;
        height: 300px;
        .title {
            text-align: center;
            img {
                height: 44px;
            }
        }
        .myForm {
            margin-top: 30px
        }
    }
}
</style>
