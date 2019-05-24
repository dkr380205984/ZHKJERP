<template>
  <div id="productDesignTable"
       v-loading='loading'
       @click.right="goTop">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>桐庐凯瑞针纺有限公司{{type === '0' ? '原' : '辅'}}料统计单</h2>
        </div>
        <div class="info">
          <span>订单编号：<em class="bold12">KR{{year + (type === '0' ? 'YL' : 'FL' ) + order.order_code}}</em></span>
          <span>创建日期：{{order.order_time}}</span>
        </div>
      </li>
      <li class="information">
        <span>订单号</span>
        <span>{{order.order_code}}</span>
        <span>下单日期</span>
        <span>{{order.order_time}}</span>
      </li>
      <li class="information">
        <span>订单公司</span>
        <span>{{order.client_name}}</span>
        <span>负责组</span>
        <span>{{order.group_name}}</span>
      </li>
      <li class="size-info">
        <div class="title"><span>产品详情</span></div>
        <div class="content">
          <!-- 此处接口暂时未调 -->
          <div v-for="(item,key) in order.order_batch"
               :key="key">
            <div>
              <span>{{item.product_code}}</span>
              <span>{{item.type}}</span>
              <span>{{item.number}}条</span>
            </div>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <template v-for="(item,key) in materialInfo">
          <ul class="size-table"
              v-if='
                 (item.type).toString()===type'
              :key="key">
            <li>
              <span>原料名称</span>
              <span>{{key}}</span>
              <span>合计</span>
              <span v-if="item.type===0">{{(item.total_number/1000).toFixed(2) + '千' + item.unit}}</span>
              <span v-if="item.type===1">{{parseInt(item.total_number) + item.unit}}</span>
            </li>
            <template v-for="(value,index) in item">
              <li :key="index"
                  v-if="index !== 'total_number' && index !== 'type'&&index !== 'unit'">
                <span>{{item.type===1?'数量':'颜色重量'}}</span>
                <span v-if="item.type===0">{{index + " " + (value/1000).toFixed(2) + '千' + item.unit}}</span>
                <span v-if="item.type===1">{{index + " " + parseInt(value) + item.unit}}</span>
              </li>
            </template>
          </ul>
        </template>
      </li>
      <li class="beizhu">备注：</li>
    </ul>
  </div>
</template>

<script>
import { productionStat, orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order: {
        order_code: '',
        client_name: '',
        order_time: '',
        order_batch: [],
        group_name: ''
      },
      year: '',
      type: '',
      materialInfo: {}
    }
  },
  filters: {
    filterType (item) {
      return (item.category_info.product_category ? item.category_info.product_category + '/' : '') + (item.type_name ? item.type_name + '/' : '') + (item.style_name ? item.style_name + '/' : '') + (item.flower_id ? item.flower_id : '')
    },
    filterNumber (item) {
      let num = 0
      item.forEach((value, index) => {
        num += Number(value.numbers)
      })
      return num
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    }
  },
  created () {
    Promise.all([productionStat({
      order_id: this.$route.params.id
    }), orderDetail({
      id: this.$route.params.id
    })]).then((res) => {
      this.order.order_code = res[1].data.data.order_code
      this.order.client_name = res[1].data.data.client_name
      console.log(res[1].data.data.order_batch)
      let arr = []
      res[1].data.data.order_batch.forEach((item, key) => {
        item.batch_info.forEach((value, index) => {
          let types = value.productInfo.category_info.product_category + (value.productInfo.type_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.style_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
          value.size.forEach((val, ind) => {
            arr.push({
              type: types,
              product_code: value.productCode,
              number: val.numbers
            })
          })
        })
      })
      arr.forEach(item => {
        let flag = this.order.order_batch.find(val => val.product_code === item.product_code)
        if (!flag) {
          this.order.order_batch.push({
            type: item.type,
            product_code: item.product_code,
            number: item.number
          })
        } else {
          flag.number = Number(flag.number) + Number(item.number)
        }
      })
      console.log(this.order)
      // this.order.order_batch = res[1].data.data.order_batch
      this.order.order_time = res[1].data.data.order_time
      this.materialInfo = res[0].data.data[0]
      this.order.group_name = res[1].data.data.group_name
      this.type = document.location.href.split('type=')[1]
    })
    this.year = new Date().getFullYear().toString().split('20')[1]
  },
  updated () {
    this.loading = false
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStatisticsTable.less";
</style>
<style lang="less">
html,
body {
  overflow: visible !important;
}
</style>
