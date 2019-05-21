<template>
  <div id="rawMaterialOrderDetail"
       v-loading="loading">
    <div class="head">
      <h2>原料订购详情</h2>
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
            <span class="content important"
                  @click="$router.push('/index/orderDetail/' + $route.params.id)">{{order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <span class="content">{{client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">{{order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">{{group_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品信息:</span>
            <span class="content">
              <ul class="productInfo">
                <li v-for="(item,key) in productList"
                    :key="key">
                  <span @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}({{item.type}})</span>
                  <span>{{item.product_size+'/'+item.product_color}}</span>
                  <span>{{item.number+'条'}}</span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn maxWidth"
               v-for="(item,key) in materialList"
               :key="key">
            <div class="label smallFont">{{item.material}}</div>
            <div class="content marginBig">
              <span v-for="(value,index) in item.need"
                    :key="index">
                <span class="title">{{value.name}}:</span>
                <span class="content">{{value.value + 'kg'}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">订购信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding"
               v-for="(item,key) in list"
               :key="key">
            <div class="title">
              <span>{{item.material}}</span>
              <span>合计：{{item.total_number}}kg</span>
            </div>
            <div class="content">
              <ul class="table">
                <li>
                  <span>订购公司</span>
                  <span class="flex3">
                    <span>颜色</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>包装</span>
                  </span>
                  <span>总价</span>
                  <span>下单日期</span>
                  <span>备注</span>
                </li>
                <li v-for="(value,index) in item.info"
                    :key="index">
                  <span>{{value.company ? value.company : '仓库'}}</span>
                  <span class="flex3">
                    <span v-for="(content,number) in value.info"
                          :key="number">
                      <span>{{content.color}}</span>
                      <span>{{content.price + '元/kg'}}</span>
                      <span>{{content.value + 'kg'}}</span>
                      <span>{{content.attr ? content.attr : '暂无'}}</span>
                    </span>
                  </span>
                  <span>{{value.total_price + '元'}}</span>
                  <span>{{value.create_time}}</span>
                  <span>{{value.remark ? value.remark : '暂无备注'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
             @click="$router.go(-1)">返回</div>
        <div class="okBtn"
             @click="change">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { rawMaterialOrderList, orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      list: [],
      productList: [],
      materialList: []
    }
  },
  methods: {
    change () {
      this.$message(
        {
          message: '修改成功',
          type: 'success'
        }
      )
    }
  },
  created () {
    Promise.all([
      rawMaterialOrderList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      }),
      orderDetail({
        id: this.$route.params.id
      })
    ]).then(res => {
      console.log(res)
      let materialInfo = res[0].data.data
      console.log(materialInfo)
      let orderInfo = res[1].data.data
      // console.log(orderInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.order_time = orderInfo.order_time
      this.client_name = orderInfo.client_name
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      orderInfo.order_batch.forEach((item, key) => {
        item.batch_info.forEach((value, index) => {
          let types = value.productInfo.category_info.product_category + (value.productInfo.type_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.style_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
          value.size.forEach((val, ind) => {
            this.productList.push({
              type: types,
              product_code: value.productCode,
              product_size: val.name[0],
              product_color: val.name[1],
              number: val.numbers
            })
          })
        })
      })
      // 初始化原料信息与订购信息
      materialInfo.forEach(item => {
        // 初始化原料信息
        if (this.materialList.length === 0) {
          this.materialList.push({
            material: item.material_name,
            need: [
              {
                name: item.color_code,
                value: item.weight
              }
            ]
          })
        } else {
          let arr = this.materialList.find(val => val.material === item.material_name)
          if (arr) {
            let obj = arr.need.find(val => val.name === item.color_code)
            if (!obj) {
              arr.need.push({
                name: item.color_code,
                value: item.weight
              })
            } else {
              obj.value = Number(obj.value) + Number(item.weight)
            }
          } else {
            this.materialList.push({
              material: item.material_name,
              need: [
                {
                  name: item.color_code,
                  value: item.weight
                }
              ]
            })
          }
        }
        // 初始化订购信息
        if (this.list.length === 0) {
          this.list.push({
            material: item.material_name,
            total_number: Number(item.weight),
            info: [{
              company: item.client_name,
              total_price: Number(item.total_price),
              create_time: item.order_time.split(' ')[0],
              remark: item.desc,
              info: [{
                color: item.color_code,
                value: Number(item.weight),
                attr: item.attribute,
                price: item.total_price / item.weight
              }]
            }]
          })
        } else {
          let arr = this.list.find(val => val.material === item.material_name)
          if (arr) {
            arr.total_number = Number(arr.total_number) + Number(item.weight)
            let arr1 = arr.info.find(val => val.company === item.client_name)
            if (arr1) {
              arr1.total_price = Number(arr1.total_price) + Number(item.total_price)
              arr1.info.push({
                color: item.color_code,
                value: Number(item.weight),
                attr: item.attribute,
                price: item.total_price / item.weight
              })
            } else {
              arr.info.push({
                company: item.client_name,
                total_price: Number(item.total_price),
                create_time: item.order_time.split(' ')[0],
                remark: item.desc,
                info: [{
                  color: item.color_code,
                  value: Number(item.weight),
                  attr: item.attribute,
                  price: item.total_price / item.weight
                }]
              })
            }
          } else {
            this.list.push({
              material: item.material_name,
              total_number: Number(item.weight),
              info: [{
                company: item.client_name,
                total_price: Number(item.total_price),
                create_time: item.order_time.split(' ')[0],
                remark: item.desc,
                info: [{
                  color: item.color_code,
                  value: Number(item.weight),
                  attr: item.attribute,
                  price: item.total_price / item.weight
                }]
              }]
            })
          }
        }
      })

      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
</style>
