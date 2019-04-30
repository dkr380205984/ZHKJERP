<template>
  <div id="rawMaterialStat"
       v-loading="loading">
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
          <span class="content">100元 = {{order.exchange_rate}}{{order.account_unit}}</span>
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
          <div class="content">
            <div class="btn">
              <template v-for="(item,index) in materialInfo">
                <span :class="{'active': sizeName.material === index }"
                      :key="index"
                      v-if="item.type === 0"
                      @click="changeSize(index,'material')">{{index}}</span>
              </template>
            </div>
            <ul class="table">
              <li>
                <span>原料名称</span>
                <span>{{sizeName.material}}</span>
                <span>合计</span>
                <span>{{materialInfo[sizeName.material] ? (materialInfo[sizeName.material].total_number/1000).toFixed(2) + '千克' : ''}}</span>
              </li>
              <template v-for="(value,index) in materialInfo[sizeName.material]">
                <li v-if="index !== 'total_number' && index !== 'type'&& index !== 'unit'"
                    :key="index">
                  <span>颜色重量</span>
                  <span>{{index + ' ' + (value/1000).toFixed(2) + '千克'}}</span>
                </li>
              </template>
            </ul>
            <span @click="openWin('/productStatisticsTable/' + $route.params.id + '?type=0')"
                  class="print">去打印</span>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">辅料计划：</span>
          <div class="content">
            <div class="btn">
              <template v-for="(item,index) in materialInfo">
                <span :class="{'active': sizeName.ingredients === index }"
                      :key="index"
                      v-if="item.type === 1"
                      @click="changeSize(index,'ingredients')">{{index}}</span>
              </template>
            </div>
            <ul class="table">
              <li>
                <span>辅料名称</span>
                <span>{{sizeName.ingredients}}</span>
                <span>合计</span>
                <span>{{materialInfo[sizeName.ingredients] ? materialInfo[sizeName.ingredients].total_number + materialInfo[sizeName.ingredients].unit : ''}}</span>
              </li>
              <template v-for="(value,index) in materialInfo[sizeName.ingredients]">
                <li v-if="index !== 'total_number' && index !== 'type' && index !== 'unit'"
                    :key="index">
                  <span>数量</span>
                  <span>{{index + ' ' + value + materialInfo[sizeName.ingredients].unit}}</span>
                </li>
              </template>
            </ul>
            <span @click="openWin('/productStatisticsTable/' + $route.params.id + '?type=1')"
                  class="print">去打印</span>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="content btn">
            <span class="goBack"
                  @click="$router.go(-1)">返回</span>
            <span class="change"
                  @click="$router.go(-1)">修改</span>
          </span>
        </div>
      </div>
    </div>
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
      },
      materialInfo: {},
      sizeName: {
        material: '',
        ingredients: ''
      }
    }
  },
  methods: {
    changeSize (item, name) {
      this.sizeName[name] = item
      this.sizeTable = item
    },
    openWin (url) {
      window.open(url)
    }
  },
  created () {
    Promise.all([productionStat({
      order_id: this.$route.params.id
    }), orderDetail({
      id: this.$route.params.id
    })]).then((res) => {
      console.log(res[0].data.data)
      this.order.order_code = res[1].data.data.order_code
      this.order.client_name = res[1].data.data.client_name
      this.order.account_unit = res[1].data.data.account_unit
      this.order.contacts = res[1].data.data.contacts
      this.order.remark = res[1].data.data.remark
      this.order.order_time = res[1].data.data.order_time
      this.order.total_price = res[1].data.data.total_price
      this.order.user_name = res[1].data.data.user_name
      this.order.tax_rate = res[1].data.data.tax_rate
      this.order.exchange_rate = res[1].data.data.exchange_rate
      this.materialInfo = res[0].data.data[0]
      console.log(this.materialInfo)
      for (let prop in this.materialInfo) {
        if (this.materialInfo[prop].type === 0 && this.sizeName.material === '') {
          this.sizeName.material = prop
        } else if (this.materialInfo[prop].type === 1 && this.sizeName.ingredients === '') {
          this.sizeName.ingredients = prop
        }
      }
    })
  },
  updated () {
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialStat.less";
</style>
