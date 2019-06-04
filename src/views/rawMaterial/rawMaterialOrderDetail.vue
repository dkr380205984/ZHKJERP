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
                  <span v-if="!item.flag"
                        @click="$router.push('/index/productPlanCreate/' + item.id)">缺少配料单信息(添加)</span>
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
        <div class="lineCtn">
          <template v-if="materialList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn">
                  <li class="title">
                    <span>计划原料</span>
                    <span class="flex2">
                      <span>颜色</span>
                      <span class="flex08">数量</span>
                    </span>
                    <span>总计划</span>
                    <span>已订购</span>
                    <span>已加工</span>
                  </li>
                  <li class="content"
                      v-for="(item,key) in materialList"
                      :key="key">
                    <span class="tableRow">{{item.material}}</span>
                    <span class="flex2 col tableRow">
                      <span v-for="(val,ind) in item.need"
                            :key="ind"
                            class="tableColumn">
                        <span class="tableRow">{{val.name}}</span>
                        <span class="tableRow flex08">{{val.value|fixedFilter}}{{item.unit}}</span>
                      </span>
                    </span>
                    <span class="tableRow">{{(item.total_weight ? item.total_weight : 0)|fixedFilter}}{{item.unit}}</span>
                    <span class="tableRow">{{(item.order_weight ? item.order_weight : 0)|fixedFilter}}{{item.unit}}</span>
                    <span class="tableRow">{{(item.process_weight ? item.process_weight : 0)|fixedFilter}}{{item.unit}}</span>
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
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span class="flex104 tableRow">
                    <span class="tableColumn">
                      <span class="flex17">订购公司</span>
                      <span class="flex43">
                        <span class="flex17">原料名称</span>
                        <span class="flex26">
                          <span>颜色</span>
                          <span>单价</span>
                          <span>数量</span>
                        </span>
                      </span>
                      <span>总价</span>
                      <span>下单日期</span>
                      <span>操作</span></span>
                  </span>
                </li>
                <li v-if="list.orderList.length === 0">暂无信息</li>
                <li v-for="(value,index) in list.orderList"
                    :key="index"
                    class="content">
                  <span class="flex17 tableRow">{{value.company === null ? '仓库' : value.company}}</span>
                  <span class="flex43 tableRow col">
                    <span v-for="(iten,kay) in value.materials"
                          :key="kay"
                          class="tableColumn">
                      <span class="flex17 tableRow">{{iten.material}}</span>
                      <span class="flex26 col">
                        <span v-for="(content,number) in iten.colors"
                              :key="number"
                              class="tableColumn">
                          <span class="tableRow">{{content.color}}</span>
                          <span class="tableRow">{{content.price|fixedFilter}}{{'元/' + content.unit}}</span>
                          <span class="tableRow">{{content.value|fixedFilter}}{{content.unit}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="tableRow">{{value.total_price|fixedFilter}}{{'元'}}</span>
                  <span class="tableRow">{{value.create_time}}</span>
                  <span class="blue tableRow"
                        @click="open('table',$route.params.id,'',value.company)">打印</span>
                </li>
                <div class="logList"
                     @click="orderLogFlag = !orderLogFlag">{{ orderLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                  v-if="orderLogFlag">
                <div>
                  <li>
                    <span class="flexBig">下单日期</span>
                    <span class="flexBig">订购公司</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexMid">颜色</span>
                    <span class="flexMid">单价</span>
                    <span class="flexMid">重量</span>
                    <span class="flexMid">总价</span>
                    <span class="flexBig">备注</span>
                    <span class="flexMid">操作人</span>
                  </li>
                </div>
                <div>
                  <li v-if="orderLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in orderLog"
                      :key="item.time + key">
                    <span class="flexBig">{{item.order_time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.price|fixedFilter}}{{'元/' + item.unit}}</span>
                    <span class="flexMid">{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span class="flexMid">{{item.total_price|fixedFilter}}{{'元'}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                                    title="备注信息"
                                    width="200"
                                    trigger="click"
                                    v-if="charCodeLength(item.remark) > 15"
                                    :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexMid">{{item.user}}</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                     @click="open('order',$route.params.id,flag)">
                  <img class="icon"
                       v-if="flag"
                       src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                       v-else
                       src="@/assets/image/icon/order_disabled.png">
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
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>加工类型</span>
                  <span class="flex104">
                    <span class="flex17">加工单位</span>
                    <span class="flex37">
                      <span class="flex17">原料名称</span>
                      <span class="flex2">
                        <span>颜色</span>
                        <span>数量</span>
                      </span>
                    </span>
                    <span>下单日期</span>
                    <span>操作</span>
                  </span>
                </li>
                <li v-if="list.processList.length === 0">暂无信息</li>
                <li v-for="(value,index) in list.processList"
                    :key="index"
                    class="content">
                  <span class="tableRow">{{value.process_type}}</span>
                  <span class="flex104 col tableRow">
                    <span v-for="(item,key) in value.companys"
                          :key="key"
                          class="tableColumn">
                      <span class="flex17 tableRow">{{item.company}}</span>
                      <span class="flex37 tableRow col">
                        <span v-for="(iten,kay) in item.materials"
                              :key="kay"
                              class="tableColumn">
                          <span class="flex17 tableRow">{{iten.material}}</span>
                          <span class="tableRow col flex2">
                            <span v-for="(content,number) in iten.colors"
                                  :key="number"
                                  class="tableColumn">
                              <span class="tableRow">{{content.color}}</span>
                              <span class="tableRow">{{content.value|fixedFilter}}{{content.unit}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span class="tableRow">{{item.create_time}}</span>
                      <span class="blue tableRow"
                            @click="open('table',$route.params.id,'',item.company,value.process_type)">打印</span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                     @click="processLogFlag = !processLogFlag">{{ processLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                  v-if="processLogFlag">
                <div>
                  <li>
                    <span class="flexBig">下单日期</span>
                    <span class="flexBig">加工单位</span>
                    <span>加工类型</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexMid">颜色</span>
                    <span class="flexMid">重量</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                  </li>
                </div>
                <div>
                  <li v-if="processLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in processLog"
                      :key="item.time + key">
                    <span class="flexBig">{{item.order_time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.process_type}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                                    title="备注信息"
                                    width="200"
                                    trigger="click"
                                    v-if="charCodeLength(item.remark) > 15"
                                    :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span>{{item.user}}</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                     @click="open('process',$route.params.id,flag)">
                  <img class="icon"
                       v-if="flag"
                       src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                       v-else
                       src="@/assets/image/icon/order_disabled.png">
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
import { rawMaterialOrderList, orderDetail, rawMaterialOrderInit, rawMaterialProcessList, productionDetail } from '@/assets/js/api.js'
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
      orderLog: [],
      flag: true
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
    charCodeLength (item) {
      if (!item) {
        return 0
      }
      let len = item.length
      let lengths = 0
      for (let i = 0; i < len; i++) {
        if (item.charCodeAt(i) > 255) {
          lengths += 2
        } else {
          lengths++
        }
      }
      return lengths
    },
    open (where, id, flag, companyId, type) {
      if (where === 'table') {
        let str = '/rawMaterialProcessTable/' + id + '/' + companyId + '/' + type
        window.open(str)
      } else if (where === 'order') {
        if (flag) {
          this.$router.push('/index/rawMaterialOrderPage/' + id + '/' + this.type)
        } else {
          this.$message(
            {
              message: '请将产品的配料单信息填写完整',
              type: 'error'
            }
          )
        }
      } else if (where === 'process') {
        if (flag) {
          this.$router.push('/index/rawMaterialProcess/' + id + '/' + this.type)
        } else {
          this.$message({
            message: '请将产品的配料单信息填写完整',
            type: 'error'
          })
        }
      }
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
    this.type = this.$route.params.type
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
      }),
      productionDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      let info = res[0].data.data.material_info
      let materialInfo = res[1].data.data
      let orderInfo = res[2].data.data
      let processInfo = res[3].data.data
      let productInfo = res[4].data.data
      let orderProductInfo = productInfo.product_plan
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.order_time = orderInfo.order_time
      this.client_name = orderInfo.client_name
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      // console.log(productInfo)
      let arr = []
      orderInfo.order_batch.forEach((item, key) => {
        item.batch_info.forEach((value, index) => {
          let types = value.productInfo.category_info.product_category + (value.productInfo.type_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.style_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
          value.size.forEach((val, ind) => {
            // 判断产品是否有配料单
            let flag = true
            if (orderProductInfo[value.productCode]) {
              let keys = orderProductInfo[value.productCode].find(a => ((a.size === val.name[0]) && (a.color_match_name === val.name[1])))
              if (!keys) {
                flag = false
                this.flag = false
              }
            } else {
              flag = false
              this.flag = false
            }
            //
            arr.push({
              type: types,
              flag: flag,
              id: value.productInfo.id,
              product_code: value.productCode,
              product_size: val.name[0],
              product_color: val.name[1],
              number: Math.ceil(val.numbers),
              has_craft: value.productInfo.has_craft,
              craft_id: value.productInfo.category_info.id
            })
          })
        })
      })
      arr.forEach(item => {
        let flag = this.productList.find(val => (val.product_code === item.product_code && val.product_size === item.product_size && val.product_color === item.product_color))
        if (!flag) {
          this.productList.push({ ...item })
        } else {
          flag.number = Math.ceil(Number(flag.number) + Number(item.number))
        }
      })
      // console.log(this.productList)
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
                    total_weight: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value],
                    unit: (item[prop].unit === '克' || item[prop].unit === 'g') ? 'kg' : item[prop].unit === '千克' ? 'kg' : item[prop].unit,
                    need: [{
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value]
                    }]
                  })
                } else {
                  flag.total_weight = Number(flag.total_weight) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value])
                  let arr = flag.need.find(val => val.name === value)
                  if (!arr) {
                    flag.need.push({
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value]
                    })
                  } else {
                    arr.value = Number(arr.value) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value])
                  }
                }
              }
            }
          }
        }
      })
      // 初始化订购信息
      // console.log(materialInfo)
      materialInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          // 初始化订购信息
          let flag = this.list.orderList.find(val => val.company === item.client_name)
          if (!flag) {
            this.list.orderList.push({
              company: item.client_name,
              total_price: Math.ceil(item.price * item.weight),
              create_time: item.order_time.split(' ')[0],
              remark: item.desc,
              materials: [{
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  price: item.price,
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
                  price: item.price,
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              })
            } else {
              flag.total_price = Number(flag.total_price) + Number(item.price * item.weight)
              flag1.colors.push({
                color: item.color_code,
                price: item.price,
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
          // 初始化日志
          this.orderLog.unshift({
            time: item.create_time,
            client_name: (item.client_name ? item.client_name : '仓库'),
            material: item.material_name,
            color: item.color_code,
            price: item.price,
            weight: item.weight,
            total_price: item.price * item.weight,
            order_time: item.order_time.split(' ')[0],
            remark: item.desc,
            user: item.user_name,
            unit: (item.unit ? item.unit : 'kg')
          })
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
            // 日志初始化
            item.material_info.forEach(val => {
              this.processLog.unshift({
                time: item.create_time,
                client_name: item.client_name,
                process_type: item.process_type,
                material: item.material_name,
                color: val.color,
                weight: val.value,
                order_time: item.order_time.split(' ')[0],
                remark: item.desc,
                user: item.user_name,
                unit: item.unit ? item.unit : 'kg'
              })
            })
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
