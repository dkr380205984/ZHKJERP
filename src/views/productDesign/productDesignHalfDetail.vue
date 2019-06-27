<template>
  <div id="rawMaterialOrderDetail"
    v-loading="loading">
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
        <div class="stepTitle">所需辅料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex:4">
                    <span>配色/尺码</span>
                    <span>生产计划数</span>
                    <span>辅料</span>
                    <span>颜色</span>
                    <span>数量</span>
                  </span>
                </li>
                <li class="material_info"
                  v-for="(item,index) in product"
                  :key="index">
                  <span style="color:#1A95FF"
                    @click="$router.push('/index/productDetail/'+item.product_code)">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:4">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.color}}/{{itemColour.size}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span class="col"
                        v-if="itemColour.colorArr&&itemColour.colorArr.length>0"
                        style="flex:3;">
                        <span v-for="(val,ind) in itemColour.colorArr"
                          :key="ind">
                          <span>{{val.material}}</span>
                          <span class="col">
                            <span v-for="(val2,ind2) in val.colorWeight"
                              :key="ind2">{{val2.color}}</span>
                          </span>
                          <span class="col">
                            <span v-for="(val2,ind2) in val.colorWeight"
                              :key="ind2">{{val2.weight}}{{val2.unit}}</span>
                          </span>
                        </span>
                      </span>
                      <span style="flex:3"
                        v-if="!itemColour.colorArr">
                        <span style="color:#F56C6C">配料单信息缺失</span>
                      </span>
                      <span style="flex:3"
                        v-if="itemColour.colorArr&&itemColour.colorArr.length === 0">
                        <span style="color:#F56C6C">没有辅料信息</span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">半成品加工分配信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding maxWidth">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>加工单位</span>
                  <span>加工类型</span>
                  <span>产品编号</span>
                  <span style="flex:6">
                    <span style="flex:1.5">产品品类</span>
                    <span>颜色尺码</span>
                    <span style="flex:0.7">单价</span>
                    <span style="flex:0.8">数量</span>
                    <span>创建时间</span>
                    <span>完成时间</span>
                  </span>
                  <span>总价</span>
                  <span>操作</span>
                </li>
                <li class="material_info"
                  v-for="(itemCompany,indexCompany) in mergeLogList"
                  :key="indexCompany">
                  <span>{{itemCompany.client_name}}</span>
                  <span style="flex:8"
                    class="col">
                    <span v-for="(itemType,indexType) in itemCompany.info"
                      :key="indexType">
                      <span>{{itemType.type}}</span>
                      <span class="col"
                        style="flex:7">
                        <span v-for="(itemPro,indexPro) in itemType.info"
                          :key="indexPro">
                          <span>{{itemPro.product_code}}</span>
                          <span class="col"
                            style="flex:6">
                            <span v-for="(itemLast,indexLast) in itemPro.info"
                              :key="indexLast">
                              <span style="border-right:1px solid #ddd;flex:1.5">{{itemLast.product_info.category_info.product_category}}/{{itemLast.product_info.type_name}}/{{itemLast.product_info.style_name}}</span>
                              <span style="border-right:1px solid #ddd">{{itemLast.color}}/{{itemLast.size}}</span>
                              <span style="border-right:1px solid #ddd;flex:0.7">{{itemLast.price}}元</span>
                              <span style="border-right:1px solid #ddd;flex:0.8">{{itemLast.number}}{{itemLast.product_info.category_info.name}}</span>
                              <span style="border-right:1px solid #ddd">{{itemLast.created_at.slice(0,10)}}</span>
                              <span>{{itemLast.complete.slice(0,10)}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span>{{itemCompany.sum}}元</span>
                  <span class="col">
                    <span v-for="(itemType,indexType) in itemCompany.info"
                      :key="indexType">
                      <span class="col">
                        <span v-for="(itemPro,indexPro) in itemType.info"
                          :key="indexPro">
                          <span style="color:#1A95FF"
                            @click="open($route.params.id,itemCompany.client_name,itemPro.product_code,1)">打印</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li class="material_info"
                  v-if="mergeLogList.length===0">
                  <span>还未进行任何分配</span>
                </li>
              </ul>
              <ul class="log">
                <div>
                  <li>
                    <span>完成时间</span>
                    <span>加工单位</span>
                    <span>加工类型</span>
                    <span>产品编号</span>
                    <span>产品品类</span>
                    <span>配色/尺码</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>所需辅料</span>
                    <span>总价</span>
                    <span>操作人</span>
                    <span>备注</span>
                    <span>操作</span>
                  </li>
                </div>
                <div v-for="(item,index) in logList"
                  :key="index">
                  <li>
                    <span>{{item.complete.slice(0,10)}}</span>
                    <span>{{item.client_name}}</span>
                    <span>{{item.type}}</span>
                    <span>{{item.product_info.product_code}}</span>
                    <span>{{item.product_info.category_info.product_category}}/{{item.product_info.type_name}}/{{item.product_info.style_name}}</span>
                    <span>{{item.color}}/{{item.size}}</span>
                    <span>{{item.price}}元</span>
                    <span>{{item.number}}{{item.product_info.category_info.name}}</span>
                    <span>
                      <span v-if="item.ingredients.length===0">无辅料</span>
                      <span v-for="(item2,index2) in item.ingredients"
                        :key="item2">
                        <span>{{item2}}</span>
                        <span v-if="index2<item.ingredients.length-1">/</span>
                      </span>
                    </span>
                    <span>{{item.price*item.number}}元</span>
                    <span>{{item.user_name}}</span>
                    <span>{{item.desc?item.desc:'暂无信息'}}</span>
                    <span style="color:#1A95FF;cursor:pointer"
                      @click="updateLog(item)">修改</span>
                  </li>
                </div>
                <div>
                  <li v-if="logList.length===0">
                    <span>暂无日志信息</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div v-if="state"
                  class="order"
                  @click="$router.push('/index/productDesignHalfCreate/' + $route.params.id)">
                  <img class="icon"
                    src="@/assets/image/icon/orderIcon.png">
                  <span>去加工</span>
                </div>
                <div class="order"
                  v-if="!state"
                  style="cursor:not-allowed">
                  <img class="icon"
                    src="@/assets/image/icon/orderIcon.png">
                  <el-tooltip class="item"
                    effect="dark"
                    content="配料单信息不完善"
                    placement="top">
                    <span>去加工</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">辅料分配信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>生产单位</span>
                  <span>加工类型</span>
                  <span>所需辅料</span>
                  <span>颜色</span>
                  <span>数量</span>
                  <span>操作</span>
                </li>
                <li class="material_info"
                  v-for="(itemCompany,indexCompany) in materialList"
                  :key="indexCompany">
                  <span>{{itemCompany.client_name}}</span>
                  <span style="flex:4"
                    class="col">
                    <span v-for="(itemType,indexType) in itemCompany.info"
                      :key="indexType">
                      <span>{{itemType.type}}</span>
                      <span style="flex:3"
                        class="col">
                        <span v-for="(itemIng,indexIng) in itemType.info"
                          :key="indexIng">
                          <span>{{itemIng.name}}</span>
                          <span style="flex:2"
                            class="col">
                            <span v-for="(itemColor,indexColor) in itemIng.number"
                              :key="indexColor">
                              <span style="border-right:1px solid #ddd">{{itemColor.color}}</span>
                              <span>{{itemColor.number}}{{itemColor.unit}}</span>
                            </span>
                          </span>
                        </span>
                        <span v-if="itemType.info.length===0">
                          <span style="color:#ddd">无辅料</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span style="color:#1A95FF;cursor:pointer;"
                    @click="$router.push('/index/otherMaterialSupply/'+$route.params.id+'/'+itemCompany.client_name + '/' +itemCompany.client_id)">补充辅料</span>
                </li>
                <li class="material_info"
                  v-if="materialList.length===0">
                  <span>还未进行任何分配</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-if="bushaList.length>0">
        <div class="stepTitle">辅料补充信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>补充次数</span>
                  <span>纱线</span>
                  <span>颜色</span>
                  <span>补充数量</span>
                  <span>总数量</span>
                  <span>承担单位/比例</span>
                  <span>补纱原因</span>
                  <span>操作时间</span>
                </li>
                <li class="material_info"
                  v-for="(item,index) in bushaList"
                  :key="index">
                  <span>第 {{index+1}} 次</span>
                  <span class="col"
                    style="flex:4">
                    <span v-for="(itemYarn,indexYarn) in item.yarn_info"
                      :key="indexYarn">
                      <span>{{itemYarn.name}}</span>
                      <span class="col"
                        style="flex:2">
                        <span v-for="(itemColor,indexColor) in itemYarn.info"
                          :key="indexColor">
                          <span>{{itemColor.color}}</span>
                          <span>{{itemColor.weight}}</span>
                        </span>
                      </span>
                      <span>{{itemYarn.total}}</span>
                    </span>
                  </span>
                  <span style="display:flex;flex-direction:column;justify-content: space-around;">
                    <span style="border:0;align-items:center"
                      v-for="(itemClient,indexClient) in item.client_info"
                      :key="indexClient">{{itemClient.client_name}}({{itemClient.percent}}%)</span>
                  </span>
                  <span>{{item.desc}}</span>
                  <span>{{item.created_at.slice(0,10)}}</span>
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
          @click="$router.go(-1)">确认</div>
      </div>
    </div>
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="close"
          @click="showShade=false">
          <span class="icon">x</span>
        </div>
        <div class="title">修改日志信息</div>
        <div class="inputCtn">
          <span class="label"><em>*</em>加工单位:</span>
          <div class="elCtn">
            {{updateInfo.client_name}}/{{updateInfo.type}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>加工类型:</span>
          <div class="elCtn">
            {{updateInfo.type}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">产品信息:</span>
          <div class="elCtn">
            {{updateInfo.product_info.category_info.product_category}}/{{updateInfo.product_info.type_name}}/{{updateInfo.product_info.style_name}} &nbsp;&nbsp; {{updateInfo.color}}/{{updateInfo.size}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>单价:</span>
          <div class="elCtn">
            <el-input v-model="updateInfo.price"
              placeholder="请输入单价">
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>分配数量:</span>
          <div class="elCtn">
            <el-input v-model="updateInfo.number"
              placeholder="请输入分配数量">
              <template slot="append">{{updateInfo.product_info.category_info.name}}</template>
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>完成时间:</span>
          <div class="elCtn">
            <el-date-picker v-model="updateInfo.complete"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">备注:</span>
          <div class="elCtn">
            <el-input v-model="updateInfo.desc"
              placeholder="请输入其他信息"></el-input>
          </div>
        </div>
        <div class="btnCtn">
          <div class="okBtn"
            @click="updateLogFn">修改</div>
          <div class="cancleBtn"
            @click="showShade=false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productionDetail, halfProductDetail, halfProductUpadate, replenishYarnList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      showShade: false,
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
      product: [],
      state: true,
      materialList: [],
      logList: [],
      mergeLogList: [],
      updateInfo: {
        id: '',
        client_name: '',
        product_info: {
          category_info: {
            product_category: '',
            name: ''
          },
          type_name: '',
          style_name: ''
        },
        desc: '',
        color: '',
        size: '',
        number: '',
        price: '',
        complete: '',
        type: ''
      },
      bushaList: []
    }
  },
  mounted () {
    Promise.all([
      productionDetail({
        order_id: this.$route.params.id
      }), halfProductDetail({
        order_id: this.$route.params.id
      }), replenishYarnList({
        order_id: this.$route.params.id,
        type: 2
      })
    ]).then(res => {
      this.order = res[0].data.data.production_detail.order_info
      let productInfo = res[0].data.data.production_detail.product_info
      let productPlan = res[0].data.data.product_plan
      let logList = res[1].data.data
      // 合并第一张表信息 根据生产计划单统计所需辅料的总量
      // 第一步 合并相同编号的产品数据
      productInfo.forEach((item) => {
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
            unit_name: item.unit_name,
            info: [{
              color: item.color,
              order_num: item.order_num,
              size: item.size,
              total_num: item.total_num,
              production_num: item.production_num,
              production_sunhao: item.production_sunhao,
              stock_pick: item.stock_pick
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
                unit_name: item.unit_name,
                info: itemPro.info.concat([{
                  color: item.color,
                  order_num: item.order_num,
                  size: item.size,
                  total_num: item.total_num,
                  production_num: item.production_num,
                  production_sunhao: item.production_sunhao,
                  stock_pick: item.stock_pick
                }])
              }
            } else {
              return itemPro
            }
          })
        }
      })
      // 第二步 将整理出来的数据统计一下是否全部有计划单
      this.product.forEach((item) => {
        if (item.state !== 2) {
          this.state = false
        }
      })
      // 第三步，对配料单完整的数据进行辅料计算
      this.product = this.product.map((item) => {
        if (item.state === 2) {
          return {
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            state: item.state,
            unit_name: item.unit_name,
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
                // 第一层筛选产品品类相同的，配色尺码相同的,再把原料过滤掉
                if (itemPlan.color_match_name === itemInfo.color && itemPlan.size === itemInfo.size && itemPlan.type === 1) {
                  let mark = -1
                  let finded = json.colorArr.find((itemFind, indexFind) => {
                    if (itemFind.material === itemPlan.material_name) {
                      mark = indexFind
                      return itemFind.material === itemPlan.material_name
                    }
                  })
                  if (!finded) {
                    json.colorArr.push({
                      material: itemPlan.material_name,
                      colorWeight: [{
                        color: itemPlan.color_name,
                        weight: parseInt((itemPlan.number * itemInfo.production_num * (1 + itemInfo.production_sunhao / 100))),
                        unit: itemPlan.unit
                      }]
                    })
                  } else {
                    json.colorArr[mark].colorWeight.push({
                      color: itemPlan.color_name,
                      weight: parseInt(itemPlan.number * itemInfo.production_num * (1 + itemInfo.production_sunhao / 100)),
                      unit: itemPlan.unit
                    })
                  }
                }
              })
              return json
            })
          }
        } else {
          return item
        }
      })
      // 所需辅料信息统计至此完成，开始统计半成品分配信息
      // 日志表格可以直接使用
      this.logList = logList
      // 合并日志表，先按加工单位合并，再按加工类型合并，再按产品编号合并
      let mergeLogList = logList.map((item) => {
        let json = item
        json.product_code = item.product_info.product_code
        return json
      })
      mergeLogList = this.jsonMerge(logList, ['client_name', 'type', 'product_code'])
      // 合并完成后根据分配信息计算每个公司的总价
      mergeLogList = mergeLogList.map((itemCompany) => {
        return {
          info: itemCompany.info,
          client_name: itemCompany.client_name,
          sum: itemCompany.info.reduce((totalType, currentType) => {
            return totalType + currentType.info.reduce((totalPro, currentPro) => {
              return totalPro + currentPro.info.reduce((totalLast, currentLast) => {
                return totalLast + currentLast.price * currentLast.number
              }, 0)
            }, 0)
          }, 0)
        }
      })
      this.mergeLogList = mergeLogList
      // 半成品分配价格统计完成，开始统计半成品分配辅料信息
      // 第一步，先按加工单位合并，再按加工类型合并
      let materialList = this.jsonMerge(logList, ['client_name', 'type'])
      // 对于加工类型里的辅料需要合并一些数值
      materialList = materialList.map((itemCompany) => {
        return {
          client_name: itemCompany.client_name,
          client_id: itemCompany.info[0].info[0].client_id,
          info: itemCompany.info.map((itemType) => {
            let arr = []
            // 先按辅料相同的进行合并
            itemType.info.forEach((itemPro) => {
              itemPro.ingredients.forEach((itemIng) => {
                let mark = -1
                let finded = arr.find((itemFind, indexFind) => {
                  if (itemFind.name === itemIng) {
                    mark = indexFind
                    return itemFind.name === itemIng
                  }
                })
                if (!finded) {
                  // 编号/尺码/颜色主要是用来匹配配料单的
                  arr.push({
                    product_code: itemPro.product_code,
                    size: itemPro.size,
                    color: itemPro.color,
                    name: itemIng,
                    sum: itemPro.number
                  })
                } else {
                  arr[mark].sum += itemPro.number
                }
              })
            })
            // 将数据和配料单的数据合并
            arr.map((itemInfo) => {
              let json = itemInfo
              json.number = []
              productPlan[itemInfo.product_code].forEach((itemPlan) => {
                // 第一层筛选产品品类相同的，配色尺码相同的,再把原料过滤掉
                if (itemPlan.color_match_name === itemInfo.color && itemPlan.size === itemInfo.size && itemPlan.type === 1 && itemPlan.material_name === itemInfo.name) {
                  let sunhao = this.product.find((item) => item.product_code === itemInfo.product_code).info[0].production_sunhao
                  json.number.push({
                    unit: itemPlan.unit,
                    color: itemPlan.color_name,
                    number: parseInt(itemPlan.number * itemInfo.sum * (1 + sunhao / 100))
                  })
                }
                return json
              })
            })
            return {
              type: itemType.type,
              info: arr
            }
          })
        }
      })
      this.materialList = materialList
      // 补辅料信息合并
      this.bushaList = res[2].data.data.map((item) => {
        let json = item
        json.yarn_info = this.jsonMerge(json.yarn_info, ['name'])
        json.yarn_info.map((itemYarn) => {
          itemYarn.total = itemYarn.info.reduce((total, current) => {
            return total + parseInt(current.weight)
          }, 0)
          return itemYarn
        })
        return json
      })
      console.log(this.bushaList)
      this.loading = false
    })
  },
  methods: {
    open (id, client, code, type) {
      window.open('/productDesignWeavingTable/' + id + '/' + client + '/' + code + '/' + type)
    },
    jsonMerge (jsonArr, keyArr) {
      let newJson = [] // 合并好的数据都放在这个数组里
      jsonArr.forEach((itemJson, indexJson) => {
        let mark = -1
        let finded = newJson.find((itemFind, indexFind) => {
          if (itemFind[keyArr[0]] === itemJson[keyArr[0]]) {
            mark = indexFind
            return itemFind[keyArr[0]] === itemJson[keyArr[0]]
          }
        })
        if (!finded) {
          let value = {}
          value[keyArr[0]] = itemJson[keyArr[0]]
          value['info'] = []
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          value['info'].push(info)
          newJson.push(value)
        } else {
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          newJson[mark]['info'].push(info)
        }
      })
      // 递归的条件是不断的缩减keyArr的length，每次都去除第零个，直到为0
      if (keyArr.length === 1) {
        return newJson
      } else {
        return newJson.map((itemInfo) => {
          let newKeyArr = []
          keyArr.forEach((item, index) => {
            if (index > 0) {
              newKeyArr.push(item)
            }
          })
          return {
            [keyArr[0]]: itemInfo[keyArr[0]],
            'info': this.jsonMerge(itemInfo['info'], newKeyArr)
          }
        })
      }
    },
    // 点击修改
    updateLog (item) {
      this.updateInfo = item
      this.showShade = true
    },
    // 修改日志
    updateLogFn () {
      halfProductUpadate({
        id: this.updateInfo.id,
        price: this.updateInfo.price,
        number: this.updateInfo.number,
        complete_time: this.updateInfo.complete,
        desc: this.updateInfo.desc,
        type: this.updateInfo.type,
        user_id: window.sessionStorage.getItem('user_id')
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '修改成功'
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
        this.showShade = false
      })
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
</style>
<style lang="less" scoped>
#rawMaterialOrderDetail {
  .shade {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .main {
      position: absolute;
      width: 640px;
      height: 620px;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #ffffff;
      overflow: hidden;
      border-radius: 4px;
      .close {
        position: absolute;
        right: -30px;
        top: -30px;
        width: 60px;
        height: 60px;
        background: #1a95ff;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: #48aaff;
        }
        .icon {
          position: absolute;
          left: 15px;
          bottom: 7px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .title {
        line-height: 66px;
        font-size: 22px;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 20px;
        position: relative;
        font-size: 16px;
        padding-left: 5em;
        height: 40px;
        line-height: 40px;
        color: #666;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 5em;
          color: #666;
          em {
            color: #f56c6c;
            line-height: 40px;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          margin-left: 15px;
          width: 400px;
        }
      }
      .btnCtn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
    }
  }
}
</style>
