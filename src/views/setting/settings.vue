<template>
  <div id="settings">
    <div class="head">
      <h2>系统设置</h2>
    </div>
    <div class="body">
      <div class="blockCtn">
        <div @click="$router.push(item.url)"
          class="blocks"
          v-for="(item,index) in list"
          :key="index">
          <img class="image"
            :src="item.img" />
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
        name: '产品设置',
        img: require('../../assets/image/setting/产品设置-蓝.png'),
        url: '/index/productSetting'
      }, {
        name: '工艺单设置',
        img: require('../../assets/image/setting/工艺单设置-蓝.png'),
        url: '/index/designFormSetting'
      }, {
        name: '物料设置',
        img: require('../../assets/image/setting/原料设置-蓝.png'),
        url: '/index/yarnSetting'
      }, {
        name: '岗位小组管理',
        img: require('../../assets/image/setting/账号设置-蓝.png'),
        url: '/index/accountSetting'
      }, {
        name: '包装辅料设置',
        img: require('../../assets/image/setting/包装设置-蓝.png'),
        url: '/index/packagMaterialList'
      }, {
        name: '加工工序设置',
        img: require('../../assets/image/setting/产品设置-蓝.png'),
        url: '/index/processSetting'
      }, {
        name: '物料价格设置',
        img: require('../../assets/image/setting/原料设置-蓝.png'),
        url: '/index/materialPriceList'
      }]

      //   , {
      //   name: '库存设置',
      //   img: require('../../assets/image/setting/产品设置-蓝.png'),
      //   url: '/index/stockList'
      // }

    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/settings.less";
</style>
