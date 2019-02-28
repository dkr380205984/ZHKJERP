<template>
  <div id="changePsd">
    <div class="changePsdCtn">
      <div class="enterpriseInfo">
        <img src="@/assets/image/login/logo.png" />
        <span>织慧科技ERP管理系统</span>
      </div>
      <div class="main">
        <div class="stepCtn" :class="step?'first':'second'">
          <div class="firstStep step">
            <div class="inputCtn">
              <span class="label">手机号：</span>
              <input type="text" placeholder="请输入手机号" />
            </div>
            <div class="inputCtn">
              <span class="label">验证码：</span>
              <input type="text" placeholder="请输入验证码" style="width:80px"/>
              <div class="send" @click="sendYzm">{{time}}</div>
            </div>
            <div class="button" @click="step=!step">下一步</div>
          </div>
          <div class="secondStep step">
            <div class="goBack" @click="step=!step">返回上一页</div>
            <div class="inputCtn">
              <span class="label">输入新密码：</span>
              <input type="text" placeholder="请输入新密码" />
            </div>
            <div class="inputCtn">
              <span class="label">重复密码：</span>
              <input type="text" placeholder="请再次输入密码" />
            </div>
            <div class="button">完成</div>
          </div>
        </div>
      </div>
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
      step: true
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
  @import '~@/assets/css/changePsd.less';
</style>
