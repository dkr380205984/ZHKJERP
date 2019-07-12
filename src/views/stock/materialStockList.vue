<template>
  <div id="settings">
    <div class="head">
      <h2>物料仓库</h2>
    </div>
    <div class="body">
      <div class="blockCtn">
        <div @click="$router.push( '/index/materialStockDetail/' + item.id)"
          class="blocks"
          v-for="(item,index) in list"
          :key="index">
          <img class="image"
            src="../../assets/image/setting/仓库-蓝.png" />
          <span class="description">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        name: '本厂',
        id: null
      }, {
        name: '仓库1',
        id: 1
      }, {
        name: '仓库2',
        id: 2
      }, {
        name: '仓库3',
        id: 3
      }, {
        name: '仓库4',
        id: 4
      }, {
        name: '仓库5',
        id: 5
      }]
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/settings.less";
</style>
