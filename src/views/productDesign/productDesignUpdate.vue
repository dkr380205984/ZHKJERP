<template>
  <div id="productDesignCreate"
    v-loading="loading">
    <div class="head">
      <h2>修改生产计划单</h2>
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
          <span class="content">100{{order.account_unit}} = {{order.exchange_rate+'人民币'}}</span>
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
      <div class="lineCtn"
        style="max-width:1200px">
        <div class="inputCtn oneLine">
          <span class="label">生产数量：</span>
          <div class="specialTable">
            <div class="left"
              style="width:150px">
              <div class="firstLine"
                style="font-size:14px;">产品品类</div>
              <div class="mergeLine"
                v-for="(item,index) in product"
                :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}"
                :key="item.product_code">
                <span>{{item.product_code}}</span>
                <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
              </div>
            </div>
            <div class="right">
              <div class="tableRow titleTableRow">
                <div class="tableColumn"
                  style="font-size:14px;">尺寸/颜色</div>
                <div class="tableColumn"
                  style="font-size:14px;">下单数</div>
                <div class="tableColumn"
                  style="font-size:14px;">库存数量</div>
                <div class="tableColumn"
                  style="font-size:14px;">原库存调取</div>
                <div class="tableColumn"
                  style="font-size:14px;">现库存调取</div>
                <div class="tableColumn"
                  style="font-size:14px;">库存变动</div>
                <div class="tableColumn"
                  style="font-size:14px;">工厂生产</div>
                <div class="tableColumn"
                  style="font-size:14px;">总计</div>
                <div class="tableColumn"
                  style="font-size:14px;">生产损耗(%)</div>
              </div>
              <div class="tableRow bodyTableRow"
                v-for="(item) in productInfo"
                :key="item.id">
                <div class="tableColumn">{{item.size}}/{{item.color}}</div>
                <div class="tableColumn">{{item.order_num}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_number}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_pick}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.stock_pick_now" />
                </div>
                <div class="tableColumn">{{item|stockFilter}}</div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.production_num" />
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick_now) + parseInt(item.production_num))?(parseInt(item.stock_pick_now) + parseInt(item.production_num)):'待计算'}}</div>
                <div class="tableColumn"><input class="inputs"
                    placeholder="损耗比"
                    v-model="item.production_sunhao" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { productionDetail, productionSave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      lock: true,
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
      productInfo: [],
      product: []
    }
  },
  methods: {
    clearAll () {

    },
    saveAll () {
      if (!this.lock) {
        let stockState = true
        let numberState = true
        this.productInfo.forEach((item) => {
          if ((parseInt(item.stock_pick_now) - parseInt(item.stock_pick)) > parseInt(item.stock_number)) {
            stockState = false
          }
          if (!item.production_num) {
            numberState = false
          }
        })
        if (!stockState) {
          this.$message.error({
            message: '检测到库存调取数量大于库存数量,请修改后提交'
          })
          return
        }
        if (!numberState) {
          this.$message.error({
            message: '检测到有未填写的工厂生产数量,请输入后提交'
          })
          return
        }
        let json = {
          id: this.$route.params.planId,
          is_update: true,
          company_id: window.sessionStorage.getItem('company_id'),
          order_id: this.$route.params.id,
          detail_info: this.productInfo.map((item) => {
            return {
              category_name: item.category_name,
              style_name: item.style_name,
              type_name: item.type_name,
              unit_name: item.unit_name,
              product_code: item.product_code,
              size: item.size,
              color: item.color,
              order_num: item.order_num,
              stock_pick: parseInt(item.stock_pick_now),
              stock_pick_change: parseInt(item.stock_pick_now) - parseInt(item.stock_pick),
              production_num: item.production_num,
              total_num: parseInt(item.stock_pick_now) + parseInt(item.production_num),
              production_sunhao: item.production_sunhao
            }
          })
        }
        this.loading = true
        this.lock = true
        productionSave(json).then((res) => {
          console.log(res)
          if (res.data.status) {
            this.$message.success({
              message: '修改成功'
            })
            this.$router.push('/index/productDesignList')
          } else {
            this.$message.error({
              message: '库存变动,请刷新页面后重试'
            })
          }
          this.loading = false
          this.lock = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    }
  },
  filters: {
    stockFilter (item) {
      if (parseInt(item.stock_pick) >= parseInt(item.stock_pick_now)) {
        return '入库' + (item.stock_pick - item.stock_pick_now) + item.unit_name
      } else {
        return '出库' + (item.stock_pick_now - item.stock_pick) + item.unit_name
      }
    }
  },
  mounted () {
    productionDetail({
      order_id: this.$route.params.id
    }).then((res) => {
      console.log(res)
      this.order = res.data.data.production_detail.order_info
      this.productInfo = res.data.data.production_detail.product_info.map((item) => {
        item.stock_pick_now = item.stock_pick
        item.stock_pick_real = 0
        return item
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
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productDesignCreate.less";
</style>
