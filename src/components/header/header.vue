<template>
  <div class="headerCompt">
    <div class="cmpCtn">
      <img class="cmpLogo" src="@/assets/image/index/copDefault.png" />
      <span class="cmpName">企业名称</span>
    </div>
    <div class="menuCtn">
      <div class="menuLeft">
        <!-- <i class="el-icon-back"></i> -->
        <span class="goBack" @click="$router.push('/index')">缺一个返回首页的按钮</span>
        <!-- <input class="search" placeholder="搜索..." /> -->
      </div>
      <div class="menuRight">
        <el-badge :value="200" :max="99" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
        <i class="el-icon-setting"></i>
        <div class="selectCtn">
          <el-dropdown @command="commondHandler">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personManage">人员管理</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './header.less'
export default {
  methods: {
    commondHandler (cmd) {
      console.log(cmd)
      if (cmd) {
        // this.$router.push({ name: cmd })
        // 这里刷新页面是为了解决左侧导航栏不能刷新的问题
        window.location.replace('/index/personManage')
      }
    }
  }
}
</script>
