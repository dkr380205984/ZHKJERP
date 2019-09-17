<template>
  <div id="productDesignWeavingTable"
    @click.right="goTop"
    v-loading='loading'>
    <h2>{{company_name + '包装订购单'}}</h2>
    <div class="processCodeTime">
      <span>订购单编号：{{orderMaterial_code}}</span>
      <span>创建时间：{{create_time}}</span>
    </div>
    <div class="tableBox">
      <div>
        <span>
          <span>订单号</span>
          <span>{{order_code}}</span>
          <span>下单日期</span>
          <span>{{order_time}}</span>
        </span>
        <span>
          <span>订单公司</span>
          <span>{{order_company}}</span>
          <span>负责小组</span>
          <span>{{group_name}}</span>
        </span>
      </div>
      <div>
        <span>
          <span>联系人</span>
          <span>{{linkman}}</span>
          <span>联系人电话</span>
          <span>{{linkman_tel}}</span>
        </span>
      </div>
      <div>
        <span>
          <span>订购单位</span>
          <span>{{client_name}}</span>
          <span>总价</span>
          <span>{{total_price|fixedFilter}}{{'元'}}</span>
        </span>
      </div>
      <div>
        <ul class="tables"
          style="width:inherit">
          <li class="title">
            <span>包装名称</span>
            <span>尺寸</span>
            <span>属性</span>
            <span>单价</span>
            <span>数量</span>
            <span>合计金额</span>
          </li>
          <li v-for="(item,key) in packagInfo"
            :key="key"
            class="content">
            <span class="tableRow">{{item.name}}</span>
            <span class="tableRow">{{item.size}}</span>
            <span class="tableRow">
              <template v-if="item.attr.length === 1 && !item.attr[0].pack_attr">-</template>
              <template v-for="(val,ind) in item.attr"
                v-else>{{ind !== 0 ? ',' : ''}}{{val.pack_attr}}</template>
            </span>
            <span class="tableRow">{{item.price|fixedFilter}}元</span>
            <span class="tableRow">{{Math.ceil(item.number)}}</span>
            <span class="tableRow">{{item.price*item.number|fixedFilter}}元</span>
          </li>
        </ul>
      </div>
      <div class="remark">
        <span>
          <span>备注</span>
          <span></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, authList, clientList, packagMaterialDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      company_name: '桐庐凯瑞针纺有限公司',
      orderMaterial_code: '',
      create_time: '',
      order_code: '',
      order_time: '',
      order_company: '',
      group_name: '',
      client_name: '',
      linkman_tel: '',
      linkman: '',
      total_price: 0,
      packagInfo: []
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    }
  },
  created () {
    let date = new Date()
    this.create_time = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
    // 获取公司
    this.client_name = this.$route.params.clientName
    Promise.all([
      orderDetail({
        id: this.$route.params.orderId
      }), authList({
        company_id: window.sessionStorage.getItem('company_id')
      }), clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }), packagMaterialDetail({
        order_id: this.$route.params.orderId
      })

    ]).then(res => {
      let orderInfo = res[0].data.data
      let linkman = res[1].data.data.find(val => val.id === window.sessionStorage.getItem('user_id'))
      let clientInfo = res[2].data.data
      console.log(this.$route.params.time)
      let packagInfo = res[3].data.data.filter(val => (val.created_at === this.$route.params.time && val.client_id === Number(this.$route.params.clientId)))
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.group_name = orderInfo.group_name
      this.order_company = orderInfo.client_name
      this.order_time = orderInfo.order_time
      // 初始化联系人信息
      this.linkman = linkman.name
      this.linkman_tel = linkman.mobile
      // 将公司名称转为简称
      this.order_company = clientInfo.find(val => val.name === this.order_company).abbreviation ? clientList.find(val => val.id === this.order_company).abbreviation : this.order_company
      console.log(packagInfo)
      packagInfo.forEach(item => {
        this.total_price = Number(this.total_price ? this.total_price : 0) + Number(item.price * item.number)
        this.client_name = item.client_name
        let flag = this.packagInfo.find(key => (key.name === item.material_name && key.size === item.size && key.price === item.price))
        if (!flag) {
          this.packagInfo.push({
            name: item.material_name,
            size: item.size,
            attr: JSON.parse(item.attribute),
            price: item.price,
            number: item.number
          })
        } else {
          flag.number = Number(flag.number ? flag.number : 0) + Number(item.number)
        }
      })
      this.loading = false
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/css/productDesignWeavingTable.less";
</style>
<style lang="less">
html {
  overflow: visible;
}
body {
  overflow: visible;
}
</style>
