<template>
  <div id="productDesignCreate">
    <div class="head">
      <h2>添加生产计划单</h2>
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
          <span class="content">{{order.remark}}</span>
        </div>
      </div>
       <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">生产数量：</span>
          <div class="specialTable">
            <div class="tableRow titleTableRow">
              <div class="tableColumn flex3">订单信息</div>
              <div class="tableColumn">库存数量</div>
              <div class="tableColumn">库存调取</div>
              <div class="tableColumn">工厂生产</div>
              <div class="tableColumn">总计</div>
            </div>
            <div class="tableRow bodyTableRow" v-for="(item) in order.order_batch" :key="item.id">
              <div class="tableColumn flex3">随便输点</div>
              <div class="tableColumn">暂时没有</div>
              <div class="tableColumn">
                <input class="inputs" placeholder="库存调取数量" />
              </div>
              <div class="tableColumn">
                <input class="inputs" placeholder="工厂生产数量" />
              </div>
              <div class="tableColumn">统计值</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="clearAll">清空</div>
        <div class="okBtn" @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail } from '@/assets/js/api.js'
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
        user_name: ''
      }
    }
  },
  methods: {
    clearAll () {

    },
    saveAll () {

    }
  },
  mounted () {
    orderDetail({
      id: this.$route.params.id
    }).then((res) => {
      console.log(res)
      this.order = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productDesignCreate.less';
</style>
