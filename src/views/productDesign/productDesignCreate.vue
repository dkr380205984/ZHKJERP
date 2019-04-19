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
            <div class="left">
              <div class="firstLine">产品品类</div>
              <div class="mergeLine" v-for="(item,index) in product" :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}" :key="item.product_code">
                <span>{{item.product_code}}</span>
                <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
              </div>
            </div>
            <div class="right">
              <div class="tableRow titleTableRow">
                <div class="tableColumn">尺寸/颜色</div>
                <div class="tableColumn ">下单数</div>
                <div class="tableColumn">库存数量</div>
                <div class="tableColumn">库存调取</div>
                <div class="tableColumn">工厂生产</div>
                <div class="tableColumn">总计</div>
              </div>
              <div class="tableRow bodyTableRow" v-for="(item) in productInfo" :key="item.id">
                <div class="tableColumn">{{item.size}}/{{item.color}}</div>
                <div class="tableColumn">{{item.numbers}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_num}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  <input class="inputs" placeholder="输入数字" v-model="item.stock_pick"/>
                </div>
                <div class="tableColumn">
                  <input class="inputs" placeholder="输入数字" v-model="item.production_num"/>
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick) + parseInt(item.production_num))?(parseInt(item.stock_pick) + parseInt(item.production_num)):'待计算'}}</div>
              </div>
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
import { orderStockDetail, productionSave } from '@/assets/js/api.js'
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
      },
      productInfo: [],
      product: []
    }
  },
  methods: {
    clearAll () {

    },
    saveAll () {
      console.log(this.productInfo)
      let json = {
        company_id: window.sessionStorage.getItem('company_id'),
        order_id: this.order.id,
        detail_info: this.productInfo.map((item) => {
          return {
            category_name: item.category_name,
            style_name: item.style_name,
            type_name: item.type_name,
            unit_name: item.unit_name,
            product_code: item.product_code,
            size: item.size,
            color: item.color,
            order_num: item.numbers,
            stock_num: item.stock_num,
            stock_pick: item.stock_pick,
            production_num: item.production_num,
            total_num: parseInt(item.stock_pick) + parseInt(item.production_num)
          }
        })
      }
      productionSave(json).then((res) => {
        console.log(res)
        this.$message.success({
          message: '添加成功'
        })
      })
    }
  },
  mounted () {
    orderStockDetail({
      order_id: this.$route.params.id,
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      console.log(res)
      this.order = res.data.data.order
      let obj = res.data.data.stock_data
      Object.keys(obj).forEach((key) => {
        obj[key].forEach((item) => {
          this.productInfo.push({
            product_code: key,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            stock_num: item.stock_num,
            size: item.size,
            color: item.color,
            numbers: item.numbers,
            unit_name: item.unit_name,
            stock_pick: 0,
            production_num: ''
          })
        })
      })
      // 合并相同编号的产品数据
      this.productInfo.forEach((item) => {
        let finded = this.product.find((itemFind, index) => itemFind.product_code === item.product_code)
        if (!finded) {
          this.product.push({
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            num: 1
          })
        } else {
          this.product = this.product.map((item) => {
            if (item.product_code === finded.product_code) {
              return {
                product_code: item.product_code,
                category_name: item.category_name,
                type_name: item.type_name,
                style_name: item.style_name,
                num: (item.num + 1)
              }
            } else {
              return item
            }
          })
        }
      })
      console.log(this.product)
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productDesignCreate.less';
</style>
