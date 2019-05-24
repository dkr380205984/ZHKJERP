<template>
  <div id="rawMaterialOrderDetail"
       v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原' : '辅'}}料详情</h2>
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
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <template v-if="materialList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="table">
                  <li class="material">
                    <span>计划原料</span>
                    <span class="flex2 row">
                      <span>颜色</span>
                      <span class="flex08">数量</span>
                    </span>
                    <span>总计划</span>
                    <span>已订购</span>
                    <span>已加工</span>
                  </li>
                  <li v-for="(val,ind) in materialList"
                      :key="ind">
                    <span>{{val.material}}</span>
                    <span class="flex2">
                      <span v-for="(va,inf) in val.need"
                            :key="inf">
                        <span>{{va.name}}</span>
                        <span class="flex08">{{va.value + val.unit}}</span>
                      </span>
                    </span>
                    <span>{{(val.total_weight ? val.total_weight : 0) + val.unit}}</span>
                    <span>{{(val.order_weight ? val.order_weight : 0) + val.unit}}</span>
                    <span>{{(val.process_weight ? val.process_weight : 0) + val.unit}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else
               class="inputCtn">暂无信息</div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料订购信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="table">
                <li>
                  <span class="flex104"
                        style="flex-direction:row">
                    <span>
                      <span class="flex17">订购公司</span>
                      <span class="flex43"
                            style="flex-direction:row;">
                        <span class="flex17"
                              style="borderBottom: none;">原料名称</span>
                        <span style="border-left:1px solid #DDD;"
                              class="flex26">
                          <span style="border-right:1px solid #DDD">颜色</span>
                          <span style="border-right:1px solid #DDD">单价</span>
                          <span>数量</span>
                        </span>
                      </span>
                      <span>总价</span>
                      <span>下单日期</span>
                      <span>备注</span>
                      <span>操作</span></span>
                  </span>
                </li>
                <li v-if="list.orderList.length === 0">暂无订购信息</li>
                <li v-for="(value,index) in list.orderList"
                    :key="index">
                  <span class="flex104">
                    <span>
                      <span class="flex17">{{value.company === null ? '仓库' : value.company}}</span>
                      <span class="flex43">
                        <span v-for="(iten,kay) in value.materials"
                              :key="kay">
                          <span class="flex17">{{iten.material}}</span>
                          <span style="border-left:1px solid #DDD;"
                                class="flex26">
                            <span v-for="(content,number) in iten.colors"
                                  :key="number">
                              <span>{{content.color}}</span>
                              <span>{{content.price + '元/' + content.unit}}</span>
                              <span>{{content.value + content.unit}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span>{{value.total_price + '元'}}</span>
                      <span>{{value.create_time}}</span>
                      <span>
                        <span>{{value.remark ? value.remark : '暂无备注'}}</span>
                      </span>
                      <span class="blue"
                            @click="open(1)">打印</span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                     @click="showLog('order')">{{ orderLogFlag ? '收起' : '展开'}}日志</div>
              </ul>
              <ul class="log"
                  v-if="orderLogFlag">
                <div>
                  <li>
                    <span class="flexBig">时间</span>
                    <span class="flexBig">订购公司</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexMid">颜色</span>
                    <span class="flexMid">单价</span>
                    <span class="flexMid">重量</span>
                    <span class="flexMid">总价</span>
                    <span>下单日期</span>
                    <span class="flexBig">备注</span>
                    <span class="flexMid">操作人</span>
                  </li>
                </div>
                <div v-loading="orderLoading">
                  <li v-for="(item,key) in orderLog"
                      :key="item.time + key">
                    <span class="flexBig">{{item.time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.price + '元/' + item.unit}}</span>
                    <span class="flexMid">{{item.weight + item.unit}}</span>
                    <span class="flexMid">{{item.total_price + '元'}}</span>
                    <span>{{item.order_time}}</span>
                    <span class="flexBig">{{item.remark ? item.remark : '暂无备注'}}</span>
                    <span class="flexMid">{{item.user}}</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div class="order"
                     @click="$router.push('/index/rawMaterialOrderPage/' + $route.params.id + '?type=' + type)">
                  <img class="icon"
                       src="@/assets/image/icon/orderIcon.png">
                  <span>去订购</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料加工信息</div>
        <div class="borderCtn">
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
                      <span>备注</span>
                      <span>操作</span></span>
                  </span>
                </li>
                <li v-if="list.processList.length === 0">暂无加工信息</li>
                <li v-for="(value,index) in list.processList"
                    :key="index"
                    class="process">
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
                              <span>{{content.value + content.unit}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span>{{item.create_time}}</span>
                      <span>
                        <span>{{item.remark ? item.remark : '暂无备注'}}</span>
                      </span>
                      <span class="blue"
                            @click="open(1)">打印</span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                     @click="showLog('process')">{{ processLogFlag ? '收起' : '展开'}}日志</div>
              </ul>
              <ul class="log"
                  v-if="processLogFlag">
                <div>
                  <li>
                    <span class="flexBig">时间</span>
                    <span class="flexBig">订购公司</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexMid">颜色</span>
                    <span class="flexMid">重量</span>
                    <span class="flexMid">总价</span>
                    <span>下单日期</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                  </li>
                </div>
                <div v-loading="processLoading">
                  <li v-for="(item,key) in processLog"
                      :key="item.time + key">
                    <span class="flexBig">{{item.time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.weight + item.unit}}</span>
                    <span class="flexMid">{{item.total_price + '元'}}</span>
                    <span>{{item.order_time}}</span>
                    <span class="flexBig">{{item.remark ? item.remark : '暂无备注'}}</span>
                    <span>{{item.user}}</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div class="order"
                     @click="$router.push('/index/rawMaterialProcess/' + $route.params.id + '?type=' + type)">
                  <img class="icon"
                       src="@/assets/image/icon/orderIcon.png">
                  <span>去加工</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
             @click="$router.go(-1)">返回</div>
        <div class="okBtn"
             @click="$router.go(-1)">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import { rawMaterialOrderList, orderDetail, rawMaterialOrderInit, rawMaterialProcessList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      type: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      list: {
        orderList: [],
        processList: []
      },
      productList: [],
      materialList: [],
      processLogFlag: false,
      processLoading: false,
      processLog: [],
      orderLogFlag: false,
      orderLoading: false,
      orderLog: []
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
    },
    showLog (item) {
      if (item === 'process') {
        this.processLoading = true
        this.processLogFlag = !this.processLogFlag
        if (this.processLogFlag) {
          rawMaterialProcessList({
            company_id: window.sessionStorage.getItem('company_id'),
            order_id: this.$route.params.id
          }).then(res => {
            let data = res.data.data
            data.forEach(item => {
              if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
                item.material_info = JSON.parse(item.material_info)
                item.material_info.forEach(val => {
                  this.processLog.push({
                    time: item.create_time,
                    client_name: item.client_name,
                    material: item.material_name,
                    color: val.color,
                    weight: val.value,
                    total_price: item.total_price,
                    order_time: item.order_time.split(' ')[0],
                    remark: item.desc,
                    user: item.user_name,
                    unit: item.unit ? item.unit : 'kg'
                  })
                })
              }
            })
            this.processLoading = false
          })
        } else {
          this.processLog = []
        }
      } else if (item === 'order') {
        this.orderLoading = true
        this.orderLogFlag = !this.orderLogFlag
        if (this.orderLogFlag) {
          rawMaterialOrderList({
            company_id: sessionStorage.company_id,
            order_id: this.$route.params.id
          }).then(res => {
            let data = res.data.data
            data.forEach(item => {
              if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
                this.orderLog.push({
                  time: item.create_time,
                  client_name: (item.client_name ? item.client_name : '仓库'),
                  material: item.material_name,
                  color: item.color_code,
                  price: (item.total_price / item.weight).toFixed(2),
                  weight: item.weight,
                  total_price: item.total_price,
                  order_time: item.order_time.split(' ')[0],
                  remark: item.desc,
                  user: item.user_name,
                  unit: (item.unit ? item.unit : 'kg')
                })
              }
            })
            this.orderLoading = false
          })
        } else {
          this.orderLog = []
        }
      }
    }
  },
  created () {
    this.type = document.location.href.split('type=')[1]
    Promise.all([
      rawMaterialOrderInit({
        order_id: this.$route.params.id
      }),
      rawMaterialOrderList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      }),
      orderDetail({
        id: this.$route.params.id
      }),
      rawMaterialProcessList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      })
    ]).then(res => {
      // console.log(res)
      let info = res[0].data.data.material_info
      // console.log(info)
      let materialInfo = res[1].data.data
      // console.log(materialInfo)
      let orderInfo = res[2].data.data
      // console.log(orderInfo)
      let processInfo = res[3].data.data
      // 初始化物料信息
      info.forEach((item, key) => {
        for (let prop in item) {
          for (let value in item[prop]) {
            if (value !== 'total_number' && value !== 'type' && value !== 'unit') {
              if (item[prop].type === Number(this.type)) {
                let flag = this.materialList.find(val => val.material === prop)
                if (!flag) {
                  this.materialList.push({
                    material: prop,
                    total_weight: (item[prop].unit === '克' || item[prop].unit === 'g') ? (Math.ceil(item[prop][value]) / 1000).toFixed(2) : item[prop][value],
                    unit: (item[prop].unit === '克' || item[prop].unit === 'g') ? 'kg' : item[prop].unit === '千克' ? 'kg' : item[prop].unit,
                    need: [{
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? (Math.ceil(item[prop][value]) / 1000).toFixed(2) : item[prop][value]
                    }]
                  })
                } else {
                  flag.total_weight = Number(flag.total_weight) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? (Math.ceil(item[prop][value]) / 1000).toFixed(2) : item[prop][value])
                  let arr = flag.need.find(val => val.name === value)
                  if (!arr) {
                    flag.need.push({
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? (Math.ceil(item[prop][value]) / 1000).toFixed(2) : item[prop][value]
                    })
                  } else {
                    arr.value = Number(arr.value) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? (Math.ceil(item[prop][value]) / 1000).toFixed(2) : item[prop][value])
                  }
                }
              }
            }
          }
        }
      })
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
      // 初始化订购信息
      materialInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          // 初始化订购信息
          let flag = this.list.orderList.find(val => val.company === item.client_name)
          if (!flag) {
            this.list.orderList.push({
              company: item.client_name,
              total_price: item.total_price,
              create_time: item.order_time.split(' ')[0],
              remark: item.desc,
              materials: [{
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  price: (item.total_price / item.weight).toFixed(2),
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              }]
            })
          } else {
            let flag1 = flag.materials.find(val => val.material === item.material_name)
            if (!flag1) {
              flag.materials.push({
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  price: item.total_price / item.weight,
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              })
            } else {
              flag.total_price = Number(flag.total_price) + Number(item.total_price)
              flag1.colors.push({
                color: item.color_code,
                price: (item.total_price / item.weight).toFixed(2),
                value: item.weight,
                unit: item.unit === null ? 'kg' : item.unit
              })
            }
          }
          // 统计已订购总量
          let arr = this.materialList.find(val => val.material === item.material_name)
          if (arr) {
            arr.order_weight = arr.order_weight ? (arr.order_weight + item.weight) : item.weight
          }
        }
      })
      // 初始化加工信息
      processInfo.forEach(item => {
        item.material_info = JSON.parse(item.material_info)
        item.material_info.forEach(value => {
          if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
            // 初始化加工信息
            let flag = this.list.processList.find(val => val.process_type === item.process_type)
            if (!flag) {
              this.list.processList.push({
                process_type: item.process_type,
                companys: [{
                  company: item.client_name,
                  total_price: item.total_price,
                  create_time: item.order_time.split(' ')[0],
                  remark: item.desc,
                  process_state: 0,
                  materials: [{
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
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
                  remark: item.desc,
                  process_state: 0,
                  materials: [{
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
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
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  })
                } else {
                  let flag3 = flag2.colors.find(val => val.color === value.color)
                  if (!flag3) {
                    flag2.colors.push({
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    })
                  } else {
                    flag3.value = Number(flag3.value) + Number(value.value)
                  }
                }
              }
            }
            // 统计已加工总价
            let arr = this.materialList.find(val => val.material === item.material_name)
            if (arr) {
              arr.process_weight = arr.process_weight ? (Number(arr.process_weight) + Number(value.value)) : value.value
            }
          }
        })
      })
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
</style>
