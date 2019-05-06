<template>
  <div id="error">
    <div class="imgs">
      <img :src="pic"/>
    </div>
    <div class="errorCode">{{$route.params.id}}</div>
    <div class="description">糟糕！页面出问题了<span style="align-items:bottom">......</span></div>
    <div class="btn">
      <span class="goBack" @click="$router.go(-1)">点击返回</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pic: require('../assets/image/index/error.jpg')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/error.less';
</style>
