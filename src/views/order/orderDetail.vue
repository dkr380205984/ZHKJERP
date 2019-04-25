<template>
  <div id='orderDetail'>
    <div class='head'>
      <h2>订单详情</h2>
    </div>
    <div class='body'>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订单号:</span>
          <span class="content">{{order_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn twoLine">
          <span class="label">外贸公司:</span>
          <span class="content">{{client_name}}</span>
        </div>
        <div class="inputCtn twoLine">
          <span class="label">联系人:</span>
          <span class="content">{{contacts}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn twoLine">
          <span class="label">结算单位:</span>
          <span class="content">{{account_unit}}</span>
        </div>
        <div class="inputCtn twoLine">
          <span class="label">汇率:</span>
          <span class="content">100=787人民币</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn twoLine">
          <span class="label">税率:</span>
          <span class="content">{{exchange_rate}}%</span>
        </div>
        <div class="inputCtn twoLine">
          <span class="label">总价:</span>
          <span class="content">{{total_price}}元</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">下单日期:</span>
          <span class="content">{{order_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订单批次:</span>
          <span class="content">
            <div class="list"
                 v-for="(item,key) in list"
                 :key="key">
              <div class="title">第{{key+1}}批</div>
              <div class="content">
                <div class="contentCtn">
                  <span class="label">交货日期:</span>
                  <span class="content">{{item.delivery_time}}</span>
                </div>
                <div class="contentCtn">
                  <span class="label">产品信息:</span>
                  <span class="content">
                    <span v-for="(value,index) in item.product_info"
                          :key='index'>
                      <span style='flex:3;'>{{value.product_code}}({{value.product_class}})</span>
                      <span>{{value.size}}/{{value.color}}</span>
                      <span>{{value.price}}元/条</span>
                      <span>{{value.number}}条</span>
                      <span>{{value.number * value.price}}元</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">备注:</span>
          <span class="content">{{remark}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="goBack"
                  @click="$router.go(-1)">返回</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      account_unit: '',
      order_code: '',
      order_time: '',
      exchange_rate: '',
      client_name: '',
      contacts: '',
      remark: '',
      total_price: '',
      list: []
    }
  },
  methods: {

  },
  created () {
    orderDetail(
      {
        id: this.$route.params.id
      }
    ).then(res => {
      let data = res.data.data
      // console.log(data)
      this.account_unit = data.account_unit
      this.client_name = data.client_name
      this.contacts = data.contacts
      this.exchange_rate = data.exchange_rate
      this.order_code = data.order_code
      this.order_time = data.order_time
      this.total_price = data.total_price
      this.remark = data.remark
      data.order_batch.forEach((item, key) => {
        let obj = {}
        obj.delivery_time = item.delivery_time
        obj.product_info = []
        item.batch_info.forEach((value, index) => {
          value.size.forEach((content, number) => {
            let obj1 = {}
            obj1.product_code = value.productCode
            obj1.size = content.name[0]
            obj1.color = content.name[1]
            obj1.number = content.numbers
            obj1.price = content.unitPrice
            obj1.product_class = (value.productInfo.category_info.product_category ? value.productInfo.category_info.product_category + '/' : '') + (value.productInfo.type_name ? value.productInfo.type_name + '/' : '') + (value.productInfo.style_name ? value.productInfo.style_name : '')
            obj.product_info.push(obj1)
            // console.log(obj)
          })
        })
        this.list.push(obj)
      })

      // console.log(this.list)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/orderDetail.less";
</style>
