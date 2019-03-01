<template>
  <div id="register">
    <div class="header">
      <img src="@/assets/image/login/logo.png" />
      <h1 @click="$router.push('/login')">织慧科技订单管理系统</h1>
    </div>
    <div class="registerCtn">
      <div class="title">注册员工账号</div>
      <div class="inputCtn">
        <span class="label">登录手机号：</span>
        <input type="text" placeholder="请输入登录的手机号" />
      </div>
      <div class="inputCtn">
        <span class="label">验证码：</span>
        <input type="text" placeholder="请输入验证码" style="width:80px"/>
        <div class="send" @click="sendYzm">{{time}}</div>
      </div>
      <div class="inputCtn">
        <span class="label">登录密码：</span>
        <input type="text" placeholder="请输入密码" />
      </div>
      <div class="inputCtn">
        <span class="label">重复密码：</span>
        <input type="text" placeholder="请再次输入密码" />
      </div>
      <div class="regBtn">注册</div>
      <div class="goBack" @click="$router.push('/login')">返回登录页</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: '发送验证码',
      timer: '',
      yzmNum: 60
    }
  },
  methods: {
    sendYzm () {
      this.time = '已发送' + this.yzmNum + '秒'
      this.timer = setInterval(() => {
        if (this.yzmNum > 0) {
          this.yzmNum--
          this.time = '已发送' + this.yzmNum + '秒'
        } else {
          this.time = '重新发送'
          this.yzmNum = 60
          clearInterval(this.timer)
          this.timer = ''
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assets/css/register.less';
</style>
