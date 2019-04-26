<template>
  <div id="productDesignDetail" v-loading="loading">
    <div class="head">
      <h2>生产计划单详情</h2>
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
      <div class="lineCtn" style="max-width:1200px">
        <div class="inputCtn oneLine" >
          <span class="label">生产数量：</span>
          <div class="specialTable">
            <div class="left">
              <div class="firstLine">产品品类</div>
              <div class="mergeLine" v-for="(item,index) in product" :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}" :key="item.product_code">
                <span @click="$router.push('/index/productDetail/'+item.product_code)" style="color:#1A95FF;cursor:pointer">{{item.product_code}}</span>
                <span @click="$router.push('/index/productDetail/'+item.product_code)" style="color:#1A95FF;cursor:pointer">{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
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
                <div class="tableColumn">{{item.order_num}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_num}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  {{item.stock_pick}}{{item.unit_name}}
                </div>
                <div class="tableColumn">
                  {{item.production_num}}{{item.unit_name}}
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick) + parseInt(item.production_num))?(parseInt(item.stock_pick) + parseInt(item.production_num)):'待计算'}}{{item.unit_name}}</div>
              </div>
            </div>
            <div class="left" style="border-left:1px solid #b5b5b5;width:120px">
              <div class="firstLine">操作</div>
              <div class="mergeLine" v-for="(item,index) in product" :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}" :key="item.product_code">
                <div class="btnCtns">
                  <span class="btns normal" v-if="item.state===2" @click="$router.push('/index/rawMaterialPlan/'+$route.params.id+'/'+item.product_code)">查看计划单</span>
                  <span class="btns normal" v-if="item.state===1" @click="$router.push('/index/productPlanUpdate/'+item.product_code)">配料单(修改)</span>
                  <span class="btns normal" v-if="item.state===0" @click="$router.push('/index/productPlanCreate/'+item.product_code)">配料单(添加)</span>
                </div>
              </div>
            </div>
            <div class="left" style="border-left:1px solid #b5b5b5;width:120px">
              <div class="firstLine">操作</div>
              <div class="mergeLine" style="height:calc(100% - 61px)">
                <div class="btnCtns">
                  <span class="btns normal" v-if="state" @click="$router.push('/index/rawMaterialStat/'+$route.params.id)">查看统计单</span>
                  <span class="btns ban" style="color:#b5b5b5!important;cursor:not-allowed;" v-if="!state">查看统计单</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { productionDetail } from '@/assets/js/api.js'
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
      productInfo: [],
      product: [],
      state: true
    }
  },
  methods: {
  },
  mounted () {
    productionDetail({
      order_id: this.$route.params.id
    }).then((res) => {
      this.order = res.data.data.production_detail.order_info
      this.productInfo = res.data.data.production_detail.product_info
      let productPlan = res.data.data.product_plan
      // 合并相同编号的产品数据
      this.productInfo.forEach((item) => {
        let finded = this.product.find((itemFind, index) => itemFind.product_code === item.product_code)
        if (!finded) {
          let state = 0 // 0代表没有计划单,1代表不完整,2代表完整
          if (productPlan[item.product_code]) {
            productPlan[item.product_code].forEach((itemPlan) => {
              if (itemPlan.color_match_name === item.color && itemPlan.size === item.size) {
                state = 2
              } else {
                if (state !== 2) {
                  state = 1
                }
              }
            })
          } else {
            state = 0
          }
          this.product.push({
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            num: 1,
            state: state
          })
        } else {
          this.product = this.product.map((itemPro) => {
            if (itemPro.product_code === finded.product_code) {
              let state = itemPro.state
              if (state === 2) {
                productPlan[item.product_code].forEach((itemPlan) => {
                  if (itemPlan.color_match_name === item.color && itemPlan.size === item.size) {
                    state = 3
                  } else {
                    if (state !== 3) {
                      state = 1
                    }
                  }
                })
              }
              if (state === 3) {
                state = 2
              }
              return {
                product_code: itemPro.product_code,
                category_name: itemPro.category_name,
                type_name: itemPro.type_name,
                style_name: itemPro.style_name,
                num: (itemPro.num + 1),
                state: state
              }
            } else {
              return item
            }
          })
        }
      })
      console.log(this.product)
      // 将整理出来的数据统计一下是否全部有计划单
      this.product.forEach((item) => {
        if (item.state !== 2) {
          this.state = false
        }
      })
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productDesignDetail.less';
</style>
