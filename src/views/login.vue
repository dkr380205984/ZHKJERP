<template>
  <div id="login">
    <div class="loginCtn">
      <div class="enterpriseInfo">
        <img src="@/assets/image/login/logo.png" />
        <span>织慧科技ERP管理系统</span>
      </div>
      <div class="main">
        <div class="atLeft">
          <div class="enterpriseImg">
            <img src="@/assets/image/login/enterprise.jpg" />
            <span class="vip">Vip3</span>
          </div>
          <div class="enterpriseName">企业名称</div>
          <div class="time">2019-02-27</div>
        </div>
        <div class="atRight">
          <div class="title">登录</div>
          <div class="inputCtn">
            <div class="icon">
              <img src="@/assets/image/login/username.png" />
            </div>
            <input type="text" placeholder="请输入账号"/>
          </div>
          <div class="inputCtn">
            <div class="icon">
              <img src="@/assets/image/login/password.png" />
            </div>
            <input type="password" placeholder="请输入密码"/>
          </div>
          <div class="oprCtn">
            <el-checkbox v-model="remPsd">记住密码</el-checkbox>
            <div class="forgotPsd" @click="$router.push('/changePsd')">忘记密码？</div>
          </div>
          <div class="loginBtn">登录</div>
          <div class="regCtn">
            <div class="reg" @click="$router.push('/register')">注册员工账号</div>
            <div class="reg" @click="$router.push('/register')">注册公司账号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/assets/js/api.js'
export default {
  name: 'home',
  data () {
    return {
      remPsd: true
    }
  },
  methods: {
  },
  created () {
    login({
      telephone: '123456',
      password: '123456'
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assets/css/login.less';
</style>
