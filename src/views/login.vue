<template>
  <div id="login">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="background"
    ></vue-particles>
    <div class="loginCtn">
      <div class="atLeft">
        <el-carousel height="370px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in picArr" :key="index">
            <img class="rotateImg" :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="atRight">
        <div class="title">织慧科技订单管理系统</div>
        <div class="welcome">欢迎登录</div>
        <div class="inputCtn">
          <input type="text" placeholder="请输入手机号" v-model="telephone"/>
        </div>
        <div class="inputCtn">
          <input type="text" placeholder="请输入密码" v-model="password"/>
        </div>
        <div class="psdOp">
          <el-checkbox v-model="remPsd">记住密码</el-checkbox>
          <div class="fogotPsd" @click="$router.push('/changePsd')">忘记密码？</div>
        </div>
        <div class="loginBtn" @click="goLogin">登录</div>
        <div class="regBtn" @click="$router.push('/register')">注册账号</div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/assets/js/api.js'
import { Message } from 'element-ui'
export default {
  name: 'home',
  data () {
    return {
      telephone: '',
      password: '',
      remPsd: true,
      picArr: [require('../assets/image/login/rotation1.png'), require('../assets/image/login/rotation1.png'), require('../assets/image/login/rotation1.png')]
    }
  },
  methods: {
    goLogin () {
      let _this = this
      login({
        telephone: _this.telephone,
        password: _this.password
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          Message.success({
            message: '登录成功'
          })
          _this.$router.push('/index')
        } else {
          Message.error({
            message: res.data.message
          })
          _this.password = ''
        }
      })
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assets/css/login.less';
</style>
<style lang="less">
//登录页 轮播图的样式
#login {
  .el-carousel__arrow{
    display: none;
  }
  .el-checkbox__label{
    font-size:12px;
    color:#888888;
    padding-left:4px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color:#CEDDEF!important;
    background-color: #CEDDEF;
    &:hover{
      border-color:#CEDDEF!important;
    }
  }
}
</style>
