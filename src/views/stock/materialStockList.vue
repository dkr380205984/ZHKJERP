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
import { clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      list: [{
        name: '本厂',
        id: 0
      }]
    }
  },
  created () {
    // materialStockList({
    //   company_id: window.sessionStorage.getItem('company_id')
    // }).then(res => {
    //   console.log(res)
    // })
    clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      let stockList = res.data.data.filter(key => (key.type.indexOf(9) !== -1))
      console.log(stockList)
      stockList.forEach(item => {
        let flag = this.list.find(key => key.name === item.name)
        if (!flag) {
          this.list.push({
            name: item.name,
            id: item.id
          })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/settings.less";
</style>
