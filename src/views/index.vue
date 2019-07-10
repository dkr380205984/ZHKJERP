<template>
  <div id="index">
    <common-header></common-header>
    <div class="mainCtn">
      <div class="menuCtn">
        <!-- 本层嵌套是为了消除滚动条的影响 该容器预留五像素宽度给滚动条-->
        <div class="menuCtnForScroll">
          <el-menu class="myMenu"
            background-color="#2E384E"
            text-color="#EEEEEE"
            active-text-color="#FFFFFF"
            :default-active="$route.path"
            :router="true">
            <el-submenu v-for="(item,index) in menu"
              :index="index.toString()"
              :key="item.name">
              <span slot="title">{{item.name}}</span>
              <el-menu-item v-for="(item2) in item.children"
                :index="item2.url"
                :key="item2.name">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 此容器左侧有留白五像素，在布局的时候需要留意给左侧滚动条的五像素 -->
      <div class="contentCtn">
        <!-- 面包屑容器需要顶到左侧导航栏,由于左侧五像素预留给marign了,因此需要用伪类补齐五像素的留白,具体查看CSS -->
        <div class="breadCtn">
          <span class="father">主页</span>
          <!-- <span class="break">/</span>
          <span class="now">添加产品</span> -->
        </div>
        <div class="mainCtn2">
          <div class="mainCtnForScroll">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { menu } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      menu: menu
    }
  },

  methods: {

  },
  created () {

  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/index.less";
</style>
