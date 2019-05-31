<template>
  <div id="rawMaterialOrderPage">
    <div class="head">
      <h2>半成品加工</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号:</span>
            <span class="content important">{{order.order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">订单公司:</span>
            <span class="content">{{order.client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">{{order.order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">{{order.group_name}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="table">
            <div class="tableTitle">
              <span>产品编号</span>
              <span>产品品类</span>
              <span>下单数</span>
              <span>库存调取数</span>
              <span>生产计划数</span>
            </div>
            <template v-if="productList.length !== 0">
              <div class="tableInfo" v-for="(item,index) in productList" :key="index">
              </div>
            </template>
            <div v-else class="tableInfo"><span>暂无信息</span></div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品织造</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>产品编号</span>
              <span>产品品类</span>
              <span>颜色/尺码</span>
              <span>下单数</span>
              <span>库存调取数</span>
              <span>生产计划数</span>
            </div>
            <div class="tableInfo">
              <span>产品编号</span>
              <span>产品品类</span>
              <span>颜色/尺码</span>
              <span>下单数</span>
              <span>库存调取数</span>
              <span>生产计划数</span>
            </div>
          </div>
          <div class="buyInfo">
            <ul class="buyFrom">
              <span class="el-icon-close"></span>
              <li>
                <span>加工单位:</span>
                <el-input size="small" placeholder="加工单位"></el-input>
              </li>
              <li class="col">
                <div>
                  <span>价格数量:</span>
                  <div>
                    <el-input size="small" placeholder="价格"></el-input>
                    <strong>—</strong>
                    <el-input size="small" placeholder="数量"></el-input>
                  </div>
                </div>
                <em class="el-icon-plus"></em>
              </li>
              <li>
                <span>产品总价:</span>
                <el-input size="small" placeholder="总价"></el-input>
              </li>
              <li>
                <span>所需原料:</span>
                <el-input size="small" placeholder="总价"></el-input>
              </li>
              <li>
                <span>完成时间:</span>
                <el-input size="small" placeholder="总价"></el-input>
              </li>
              <li>
                <span>备注信息:</span>
                <el-input type="textarea" placeholder="请输入内容" style="width:243px;margin: 0 0 0 15px;height:45px;"></el-input>
              </li>
            </ul>
          </div>
          <div class="addBtn">
            <span>+</span>
            <span>添加公司</span>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn" @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { productionDetail } from '@/assets/js/api.js'
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
      productList: [],
      haha: ''
    }
  },
  mounted () {
    Promise.all([
      productionDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      this.order = res[0].data.data.production_detail.order_info
      // this.productInfo = res[0].data.data.production_detail.product_info
      // let productPlan = res[0].data.data.product_plan
    })
  },
  methods: {
    saveAll () {

    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderPage.less";
</style>
