<template>
  <div id="productDesignTable">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>{{order.client_name}}{{type === '0' ? '原' : '辅'}}料统计单</h2>
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
        <div class="title">产品详情</div>
        <div class="content">
          <!-- 此处接口暂时未调 -->
          <div v-for="(item,key) in order.order_batch"
               :key="key">
            <template v-for='value in item.batch_info'>
              <span :key='value.productCode + "x"'>{{value.productCode}}</span>
              <span :key='value.productCode + "y"'>{{value.productInfo|filterType}}</span>
              <span :key="value.productCode + 'z'">{{value.size|filterNumber}}条</span>
            </template>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <template v-for="(item,key) in materialInfo">
          <ul class="size-table"
              v-if='(item.type).toString() === type'
              :key="key">
            <li>
              <span>原料名称</span>
              <span>{{key}}</span>
              <span>合计</span>
              <span>{{item.total_number + 'kg'}}</span>
            </li>
            <template v-for="(value,index) in item">
              <li :key="index"
                  v-if="index !== 'total_number' && index !== 'type'">
                <span>颜色重量</span>
                <span>{{index + " " + value + 'kg'}}</span>
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
      order: {
        order_code: '',
        client_name: '',
        // remark: '',
        // account_unit: '',
        // contacts: '',
        // exchange_rate: '',
        order_time: '',
        order_batch: [],
        // product_stock: '',
        // tax_rate: '',
        // total_price: '',
        group_name: ''
        // id: ''
      },
      year: '',
      type: '',
      materialInfo: {}
      // sizeName: {
      //   material: '',
      //   ingredients: ''
      // }
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

  },
  mounted () {
    Promise.all([productionStat({
      order_id: this.$route.params.id
    }), orderDetail({
      id: this.$route.params.id
    })]).then((res) => {
      console.log(res)
      this.order.order_code = res[1].data.data.order_code
      this.order.client_name = res[1].data.data.client_name
      this.order.order_batch = res[1].data.data.order_batch
      // this.order.account_unit = res[1].data.data.account_unit
      // this.order.contacts = res[1].data.data.contacts
      // this.order.remark = res[1].data.data.remark
      this.order.order_time = res[1].data.data.order_time
      // this.order.total_price = res[1].data.data.total_price
      // this.order.user_name = res[1].data.data.user_name
      // this.order.tax_rate = res[1].data.data.tax_rate
      // this.order.exchange_rate = res[1].data.data.exchange_rate
      this.materialInfo = res[0].data.data[0]
      this.order.group_name = res[1].data.data.group_name
      // for (let prop in this.materialInfo) {
      //   if (this.materialInfo[prop].type === 0 && this.sizeName.material === '') {
      //     this.sizeName.material = prop
      //   } else if (this.materialInfo[prop].type === 1 && this.sizeName.ingredients === '') {
      //     this.sizeName.ingredients = prop
      //   }
      // }
      console.log(this.order.order_batch)
      this.type = document.location.href.split('type=')[1]
    })
    this.year = new Date().getFullYear().toString().split('20')[1]
    // console.log(this.year)
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStatisticsTable.less";
</style>
