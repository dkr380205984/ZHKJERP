<template>
  <div id="changePsd">
    <div class="header">
      <img src="@/assets/image/login/logo.png" />
      <h1 @click="$router.push('/login')">织慧科技订单管理系统</h1>
    </div>
    <div class="changePsdCtn">
      <div class="title">找回密码</div>
      <div class="stepCtn">
        <el-steps :active="active" finish-status="success" :align-center="true">
          <el-step title="验证手机号"></el-step>
          <el-step title="修改密码"></el-step>
          <el-step title="修改成功"></el-step>
        </el-steps>
      </div>
      <div class="stepsMain">
        <div class="stepMainCtn" :class="{'atStep1':active===0,'atStep2':active===1,'atStep3':active===3}">
          <div class="stepOnce step1">
            <div class="inputCtn">
              <span class="label">登录手机号：</span>
              <input type="text" placeholder="请输入登录的手机号" />
            </div>
            <div class="inputCtn">
              <span class="label">验证码：</span>
              <input type="text" placeholder="请输入验证码" style="width:80px"/>
              <div class="send" @click="sendYzm">{{time}}</div>
            </div>
            <div class="btnCtn">
              <div class="btn" @click="active++">下一步</div>
            </div>
          </div>
          <div class="stepOnce step2">
            <div class="inputCtn">
              <span class="label">新密码：</span>
              <input type="text" placeholder="请输入新密码" />
            </div>
            <div class="inputCtn">
              <span class="label">重复密码：</span>
              <input type="text" placeholder="请再次输入密码"/>
            </div>
            <div class="btnCtn">
              <div class="btn" @click="active--">上一步</div>
              <div class="btn" @click="changePsd">确认修改</div>
            </div>
          </div>
          <div class="stepOnce step3">
            <div class="line1">您的密码已经修改成功!</div>
            <div class="line2">3秒后自动跳转到登录页面<span class="dot">...</span></div>
          </div>
        </div>
      </div>
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
      yzmNum: 60,
      active: 0
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
    },
    changePsd () {
      this.active = this.active + 2
      console.log(this.active)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/changePsd.less';
</style>
<style lang="less">
  #changePsd{
    .el-step__head.is-success{
      color: #10AEF5;
      border-color: #10AEF5;
    }
    .el-step__title.is-success{
      color: #10AEF5;
    }
    .el-step__icon.is-text{
      border:1px solid;
    }
  }
</style>
