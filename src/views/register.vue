<template>
  <div id="register">
    <div class="header">
      <img src="@/assets/image/login/logo.png" />
      <h1 @click="$router.push('/login')">织慧科技订单管理系统</h1>
    </div>
    <div class="registerCtn">
      <div class="title">注册账号</div>
      <div class="stepCtn">
        <div class="steps" :class="{'atStep1':step===1,'atStep2':step===2}">
          <div class="stepOnce step1">
            <div class="inputCtn">
              <span class="label">注册身份：</span>
              <el-select v-model="types" placeholder="请选择">
                <el-option
                  v-for="item in typesArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
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
            <div class="regBtn" @click="step++">注册</div>
          </div>
          <div class="stepOnce step2">
            <div class="inputCtn">
              <span class="label">外贸公司：</span>
              <el-select v-model="company" placeholder="请选择外贸公司">
                <el-option
                  v-for="item in companyArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="inputCtn">
              <span class="label">姓名/简称：</span>
              <input type="text" placeholder="请输入姓名和简称" />
            </div>
            <div class="inputCtn">
              <span class="label">内部授权码：</span>
              <input type="text" placeholder="请向系统管理员询问内部授权码" />
            </div>
             <div class="btnCtn">
              <div class="btn" @click="step--">上一步</div>
              <div class="btn">完成注册</div>
            </div>
          </div>
        </div>
      </div>
      <div class="goBack" @click="$router.push('/login')">返回登录页</div>
    </div>
  </div>
</template>

<script>
import { register } from '@/assets/js/api.js'
export default {
  data () {
    return {
      time: '发送验证码',
      timer: '',
      yzmNum: 60,
      telephone: '',
      password: '',
      types: '工厂职工',
      step: 1,
      typesArr: [{
        value: '1',
        label: '工厂职工'
      }, {
        value: '0',
        label: '外贸公司员工'
      }],
      company: '',
      companyArr: [{
        value: '1',
        label: 'A公司'
      }, {
        value: '2',
        label: 'B公司'
      }, {
        value: '3',
        label: 'C公司'
      }]
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
    goRegister () {
      let _this = this
      register({
        telephone: _this.telephone,
        password: _this.password
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assets/css/register.less';
</style>
<style lang="less">
#register{
  .el-input__inner{
    color:#666;
    font-size:16px;
    font-family: 'systemfont';
  }
}
</style>
