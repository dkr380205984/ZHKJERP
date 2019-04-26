<template>
  <div id="rawMaterialStat">
    <div class="head">
      <h2>生产统计详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">订单号：</span>
          <span class="content important">{{order.order_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">外贸公司：</span>
          <span class="content">{{order.client_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">联系人：</span>
          <span class="content">{{order.contacts}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">结算单位：</span>
          <span class="content">{{order.account_unit}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">汇率：</span>
          <span class="content">1 = {{order.exchange_rate}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">税率：</span>
          <span class="content">{{order.tax_rate}}%</span>
        </div>
        <div class="inputCtn">
          <span class="label">订单价：</span>
          <span class="content">{{order.total_price}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人：</span>
          <span class="content">{{order.user_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">下单日期：</span>
          <span class="content">{{order.order_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">备注：</span>
          <span class="content">{{order.remark?order.remark:'暂无信息'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料计划：</span>

        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">辅料计划：</span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productionStat } from '@/assets/js/api.js'
export default {
  data () {
    return {
      order: {
        order_code: '',
        client_name: '',
        remark: '',
        account_unit: '',
        contacts: '',
        exchange_rate: '',
        order_time: '',
        order_batch: [],
        product_stock: '',
        tax_rate: '',
        total_price: '',
        user_name: '',
        id: ''
      }
    }
  },
  mounted () {
    Promise.all([productionStat({
      order_id: this.$route.params.id
    })]).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/rawMaterialStat.less';
</style>
