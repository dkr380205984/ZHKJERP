<template>
  <div id="rawMaterialProcessDetail"
       v-loading="loading">
    <div class="head">
      <h2>原料加工详情</h2>
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
        <div class="stepTitle">加工信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="table">
                <li>
                  <span>加工类型</span>
                  <span class="flex104"
                        style="flex-direction:row">
                    <span>
                      <span class="flex17">加工单位</span>
                      <span class="flex37"
                            style="flex-direction:row;">
                        <span class="flex17"
                              style="borderBottom: none;">原料名称</span>
                        <span style="border-left:1px solid #DDD;flex:2;">
                          <span style="border-right:1px solid #DDD">颜色</span>
                          <span>数量</span>
                        </span>
                      </span>
                      <span>下单日期</span>
                      <!-- <span>交货日期</span> -->
                      <span>备注</span>
                      <span>加工状态</span>
                      <span>操作</span></span>
                  </span>
                </li>
                <li v-for="(value,index) in list"
                    :key="index">
                  <span>
                    <span>{{value.process_type}}</span>
                  </span>
                  <span class="flex104">
                    <span v-for="(item,key) in value.companys"
                          :key="key">
                      <span class="flex17">
                        {{item.company}}
                      </span>
                      <span class="flex37">
                        <span v-for="(iten,kay) in item.materials"
                              :key="kay">
                          <span class="flex17">{{iten.material}}</span>
                          <span style="border-left:1px solid #DDD;flex:2;">
                            <span v-for="(content,number) in iten.colors"
                                  :key="number">
                              <span>{{content.color}}</span>
                              <span>{{content.value + 'kg'}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span>{{item.create_time}}</span>
                      <!-- <span>{{item.compiled_time}}</span> -->
                      <span>
                        <span>{{item.remark ? item.remark : '暂无备注'}}</span>
                      </span>
                      <span :class="{'warning': item.process_state === 0,'success': item.process_state === 1}">{{item.process_state === 0 ? '未完成' : '已完成'}}</span>
                      <span class="blue"
                            @click="open(1)">打印</span>
                    </span>
                  </span>
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
import { rawMaterialProcessList, orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
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
    open (id) {
      window.open('/rawMaterialProcessTable/' + 1)
    },
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
      rawMaterialProcessList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      }),
      orderDetail({
        id: this.$route.params.id
      })
    ]).then(res => {
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
      // 初始化原料信息与加工信息
      materialInfo.forEach(item => {
        item.material_info = JSON.parse(item.material_info)
        item.material_info.forEach(value => {
          // 初始化原料信息
          let data = this.materialList.find(val => val.material === item.material_name)
          if (!data) {
            this.materialList.push({
              material: item.material_name,
              need: [{
                name: value.color,
                value: value.value
              }]
            })
          } else {
            let data2 = data.need.find(val => val.name === value.color)
            if (!data2) {
              data.need.push({
                name: value.color,
                value: value.value
              })
            } else {
              data2.value = Number(data2.value) + Number(value.value)
            }
          }
          // 初始化加工信息
          let flag = this.list.find(val => val.process_type === item.process_type)
          if (!flag) {
            this.list.push({
              process_type: item.process_type,
              companys: [{
                company: item.client_name,
                total_price: item.total_price,
                create_time: item.order_time.split(' ')[0],
                remark: '',
                process_state: 0,
                materials: [{
                  material: item.material_name,
                  colors: [{
                    color: value.color,
                    value: value.value
                  }]
                }]
              }]
            })
          } else {
            let flag1 = flag.companys.find(val => val.company === item.client_name)
            if (!flag1) {
              flag.companys.push({
                company: item.client_name,
                total_price: item.total_price,
                create_time: item.order_time.split(' ')[0],
                remark: '',
                process_state: 0,
                materials: [{
                  material: item.material_name,
                  colors: [{
                    color: value.color,
                    value: value.value
                  }]
                }]
              })
            } else {
              let flag2 = flag1.materials.find(val => val.material === item.material_name)
              if (!flag2) {
                flag1.materials.push({
                  material: item.material_name,
                  colors: [{
                    color: value.color,
                    value: value.value
                  }]
                })
              } else {
                let flag3 = flag2.colors.find(val => val.color === value.color)
                if (!flag3) {
                  flag2.colors.push({
                    color: value.color,
                    value: value.value
                  })
                } else {
                  flag3.value = Number(flag3.value) + Number(value.value)
                }
              }
            }
          }
        })
      })
      console.log(this.list)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialProcessDetail.less";
</style>
