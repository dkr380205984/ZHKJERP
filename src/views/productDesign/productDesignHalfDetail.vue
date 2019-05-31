<template>
  <div id="rawMaterialOrderDetail">
    <div class="head">
      <h2>半成品加工详情</h2>
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
        <div class="stepTitle">所需原料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="table">
                <li class="material">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex-direction: row;border-bottom:0;flex:3">
                    <span style="border-bottom:0;border-right:1px solid #ddd;">配色/尺码</span>
                    <span style="border-bottom:0;border-right:1px solid #ddd;">生产计划数</span>
                    <span style="border-bottom:0;border-right:1px solid #ddd;">颜色</span>
                    <span>重量</span>
                  </span>
                  <span>工艺单信息</span>
                </li>
                <li v-for="(item,index) in product" :key="index">
                  <span>{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span style="flex:3">
                    <span v-for="(itemColour,indexColour) in item.info" :key="indexColour">
                      <span>{{itemColour.color}}/{{itemColour.size}}</span>
                      <span>{{itemColour.production_num}}</span>
                      <span v-if="itemColour.colorArr">
                        <span v-for="(val,ind) in itemColour.colorArr" :key="ind">{{val.color}}</span>
                      </span>
                        <span v-if="itemColour.colorArr">
                        <span v-for="(val,ind) in itemColour.colorArr" :key="ind">{{val.weight}}千克</span>
                      </span>
                      <span style="flex:2" v-if="!itemColour.colorArr">
                        <span style="color:#F56C6C">配料单信息缺失</span>
                      </span>
                    </span>
                  </span>
                  <span v-if="item.has_craft===1" style="color:#1A95FF;">点击查看</span>
                  <span v-if="item.has_craft===0" style="color:#ccc;">暂无工艺单</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">织造信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="table">
                <li class="material">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex-direction: row;border-bottom:0;flex:4">
                    <span style="border-bottom:0;border-right:1px solid #ddd;">生产单位</span>
                    <span style="border-bottom:0;border-right:1px solid #ddd;">配色/尺码</span>
                    <span style="border-bottom:0;border-right:1px solid #ddd;">单价</span>
                    <span style="border-bottom:0;border-right:1px solid #ddd;">数量</span>
                    <span>总价</span>
                  </span>
                  <span>备注</span>
                  <span>完成时间</span>
                  <span>操作</span>
                </li>
                <li v-for="(item,index) in materialList" :key="index">

                </li>
                <div class="logList">展开日志</div>
              </ul>
              <div class="handle">
                <div class="order" @click="$router.push('/index/productDesignWeavingCreate/' + $route.params.id)">
                  <img class="icon" src="@/assets/image/icon/orderIcon.png">
                  <span>去织造</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料分配信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="table">
                <li class="material">
                  <span>生产单位</span>
                  <span>原料名称</span>
                  <span style="flex-direction: row;border-bottom:0;flex:2">
                    <span style="border-bottom:0;border-right:1px solid #ddd;">原料颜色</span>
                    <span>原料重量</span>
                  </span>
                  <span>操作</span>
                </li>
                <li v-for="(item,index) in materialList" :key="index">

                </li>
              </ul>
            </div>
          </div>
        </div>
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
      productInfo: [],
      product: [],
      state: true,
      materialList: []
    }
  },
  mounted () {
    Promise.all([
      productionDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      // console.log(res[0])
      this.order = res[0].data.data.production_detail.order_info
      this.productInfo = res[0].data.data.production_detail.product_info
      let productPlan = res[0].data.data.product_plan
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
            state: state,
            info: [{
              color: item.color,
              order_num: item.order_num,
              size: item.size,
              total_num: item.total_num,
              production_num: item.production_num,
              production_sunhao: item.production_sunhao
            }]
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
                state: state,
                info: itemPro.info.concat([{
                  color: item.color,
                  order_num: item.order_num,
                  size: item.size,
                  total_num: item.total_num,
                  production_num: item.production_num,
                  production_sunhao: item.production_sunhao
                }])
              }
            } else {
              return itemPro
            }
          })
        }
      })
      // 将整理出来的数据统计一下是否全部有计划单
      this.product.forEach((item) => {
        if (item.state !== 2) {
          this.state = false
        }
      })
      // product第一轮整理完毕后，对配料单完整的数据进行原料计算
      this.product = this.product.map((item) => {
        if (item.state === 2) {
          return {
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            state: item.state,
            info: item.info.map((itemInfo) => {
              let json = {
                color: itemInfo.color,
                order_num: itemInfo.order_num,
                size: itemInfo.size,
                total_num: itemInfo.total_num,
                production_num: itemInfo.production_num,
                production_sunhao: itemInfo.production_sunhao,
                colorArr: []
              }
              productPlan[item.product_code].forEach((itemPlan) => {
                if (itemPlan.color_match_name === itemInfo.color && itemPlan.size === itemInfo.size) {
                  json.colorArr.push({
                    color: itemPlan.color_name,
                    weight: (itemPlan.number * itemInfo.order_num * (1 + itemInfo.production_sunhao / 100) / 1000).toFixed(2)
                  })
                }
              })
              return json
            })
          }
        } else {
          return item
        }
      })
      // product第二轮整理完之后，把有无工艺单的信息匹配出来
      let arr = [] // arr存储了所有批次的产品信息，部分产品信息会重复
      this.order.order_batch.forEach((itemBatch) => {
        arr = arr.concat(itemBatch.batch_info)
      })
      this.product = this.product.map((item) => {
        let json = item
        json.has_craft = arr.find((itemFind) => itemFind.productCode === item.product_code).productInfo.has_craft
        return json
      })
      console.log(this.product)
    })
  }
}
</script>

<style scoped lang='less'>
  @import "~@/assets/css/rawMaterialOrderDetail.less";
</style>
