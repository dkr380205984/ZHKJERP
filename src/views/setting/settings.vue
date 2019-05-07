<template>
  <div id="settings">
    <div class="head">
      <h2>系统设置</h2>
    </div>
    <div class="body">
      <div class="blocks" v-for="(item,index) in list" :key="index">
        <img class="iamge" src="" />
        <span class="description"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        name: '产品设置',
        img: ''
      }, {
        name: '工艺单设置',
        img: ''
      }, {
        name: '原料设置',
        img: ''
      }, {
        name: '辅料设置',
        img: ''
      }, {
        name: '账号设置',
        img: ''
      }]
    }
  }
}
</script>

<style>

</style>
