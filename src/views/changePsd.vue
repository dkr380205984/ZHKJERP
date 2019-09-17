<template>
  <div id="changePsd">
    <div class="header">
      <img src="@/assets/image/login/logo.png" />
      <h1 @click="$router.push('/login')">织慧科技订单管理系统</h1>
    </div>
    <div class="changePsdCtn">
      <div class="title">找回密码</div>
      <div class="stepCtn">
        <el-steps :active="active"
          finish-status="success"
          :align-center="true">
          <el-step title="验证手机号"></el-step>
          <el-step title="修改密码"></el-step>
          <el-step title="修改成功"></el-step>
        </el-steps>
      </div>
      <div class="stepsMain">
        <div class="stepMainCtn"
          :class="{'atStep1':active===0,'atStep2':active===1,'atStep3':active===3}">
          <div class="stepOnce step1">
            <div class="inputCtn">
              <span class="label">登录手机号：</span>
              <input type="text"
                placeholder="请输入登录的手机号"
                @blur="filterTelephone"
                v-model="telephone" />
              <span class="tips error"
                v-show="telephoneFlag">手机格式错误</span>
              <span class="tips success"
                v-show="!telephoneFlag&&telephoneS">手机格式正确</span>
            </div>
            <div class="inputCtn">
              <span class="label">验证码：</span>
              <input type="text"
                placeholder="请输入验证码"
                style="width:80px"
                v-model="yzm" />
              <div class="send"
                @click="sendYzm"
                :style="{'cursor':yzmGray?'not-allowed':'pointer','background':yzmGray?'#888':'#40BEF7'}">{{time}}</div>
            </div>
            <div class="btnCtn">
              <div class="btn"
                @click="next">下一步</div>
            </div>
          </div>
          <div class="stepOnce step2">
            <div class="inputCtn">
              <span class="label">新密码：</span>
              <input type="password"
                placeholder="请输入新密码"
                v-model="newPsd" />
            </div>
            <div class="inputCtn">
              <span class="label">重复密码：</span>
              <input type="password"
                placeholder="请再次输入密码"
                v-model="newPsdAgain" />
            </div>
            <div class="btnCtn">
              <div class="btn"
                @click="active--">上一步</div>
              <div class="btn"
                @click="changePsd">确认修改</div>
            </div>
          </div>
          <div class="stepOnce step3">
            <div class="line1">您的密码已经修改成功!</div>
            <div class="line2">3秒后自动跳转到登录页面<span class="dot">...</span></div>
          </div>
        </div>
      </div>
      <div class="goBack"
        @click="$router.push('/login')">返回登录页</div>
    </div>
  </div>
</template>

<script>
import { sendCode, updatePsd } from '@/assets/js/api.js'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      time: '发送验证码',
      timer: '',
      yzm: '',
      yzmNum: 60,
      yzmGray: false,
      active: 0,
      telephone: '',
      telephoneFlag: false,
      telephoneS: false,
      newPsd: '',
      newPsdAgain: ''
    }
  },
  methods: {
    sendYzm () {
      let _this = this
      if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
        Message.error({
          message: '你的手机号格式有误请重新输入'
        })
      } else if (this.yzmGray) {
        Message.error({
          message: '请不要频繁操作'
        })
      } else {
        this.yzmGray = true
        this.time = '已发送' + this.yzmNum + '秒'
        this.timer = setInterval(() => {
          if (this.yzmNum > 0) {
            this.yzmNum--
            this.time = '已发送' + this.yzmNum + '秒'
          } else {
            this.yzmGray = false
            this.time = '重新发送'
            this.yzmNum = 60
            clearInterval(this.timer)
            this.timer = ''
          }
        }, 1000)
        sendCode({
          telephone: _this.telephone
        }).then((res) => {
          console.log(res)
        })
      }
    },
    next () {
      if (this.yzm === '' || !(/^1[34578]\d{9}$/.test(this.telephone))) {
        Message.error({
          message: '请填写正确信息'
        })
      } else {
        this.active++
      }
    },
    changePsd () {
      let _this = this
      if (this.newPsd !== this.newPsdAgain && !this.newPsdAgain) {
        Message.error({
          message: '你两次输入的密码不一致，请重新输入'
        })
        this.newPsd = ''
        this.newPsdAgain = ''
      } else {
        updatePsd({
          phone: _this.telephone,
          password: _this.newPsd,
          code: _this.yzm
        }).then((res) => {
          if (res.data.code === 200) {
            _this.active += 2
          } else {
            Message.error({
              message: res.data.message
            })
          }
        })
      }
    },
    filterTelephone () {
      if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
        this.telephoneFlag = true
        this.telephoneS = true
      } else {
        this.telephoneFlag = false
        this.telephoneS = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/changePsd.less";
</style>
<style lang="less">
// 步骤条组件样式修改
#changePsd {
  .el-step__head.is-success {
    color: #10aef5;
    border-color: #10aef5;
  }
  .el-step__title.is-success {
    color: #10aef5;
  }
  .el-step__icon.is-text {
    border: 1px solid;
  }
  .el-step__head.is-process {
    color: #666 !important;
    border-color: #666 !important;
  }
  .el-step__title.is-process {
    color: #666;
    font-weight: normal;
  }
  .el-step__head.is-wait {
    color: #999 !important;
    border-color: #888 !important;
  }
  .el-step__title.is-wait {
    color: #999 !important;
  }
}
</style>
