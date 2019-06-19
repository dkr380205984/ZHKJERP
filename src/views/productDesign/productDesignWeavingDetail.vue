<template>
  <div id="rawMaterialOrderDetail">
    <div class="head">
      <h2>产品织造详情</h2>
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
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex:4">
                    <span>配色/尺码</span>
                    <span>生产计划数</span>
                    <span style="flex:1.5">纱线</span>
                    <span>颜色</span>
                    <span>重量</span>
                  </span>
                  <span>工艺单信息</span>
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
                        v-if="itemColour.colorArr"
                        style="flex:3.5">
                        <span v-for="(val,ind) in itemColour.colorArr"
                          :key="ind">
                          <span style="flex:1.5">{{val.material}}</span>
                          <span class="col">
                            <span v-for="(val2,ind2) in val.colorWeight"
                              :key="ind2">{{val2.color}}</span>
                          </span>
                          <span class="col">
                            <span v-for="(val2,ind2) in val.colorWeight"
                              :key="ind2">{{val2.weight}}千克</span>
                          </span>
                        </span>
                      </span>
                      <span style="flex:3.5"
                        v-if="!itemColour.colorArr">
                        <span style="color:#F56C6C">配料单信息缺失</span>
                      </span>
                    </span>
                  </span>
                  <span v-if="item.has_craft===1"
                    style="color:#1A95FF;"
                    @click="$router.push('/index/designFormDetail/'+item.craft_list_id)">点击查看</span>
                  <span v-if="item.has_craft===0"
                    style="color:#ccc;">暂无工艺单</span>
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
          <div class="inputCtn noPadding maxWidth">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex:5;">
                    <span>配色/尺码</span>
                    <span>下单数</span>
                    <span>库存调取数</span>
                    <span>生产计划数</span>
                    <span>已分配数量</span>
                  </span>
                </li>
                <li v-for="(item,index) in StatisticsList"
                  :key="index"
                  class="material_info">
                  <span>{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:5;">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.color}}/{{itemColour.size}}</span>
                      <span>{{itemColour.order_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.stock_pick}}{{item.unit_name}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.fenpei}}{{item.unit_name}}</span>
                    </span>
                  </span>
                </li>
                <!-- <div class="logList">展开日志</div> -->
              </ul>
              <ul class="log">
                <div>
                  <li>
                    <span>完成时间</span>
                    <span>加工单位</span>
                    <span>产品编号</span>
                    <span>产品品类</span>
                    <span>配色/尺码</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>总价</span>
                    <span>操作人</span>
                    <span>备注</span>
                    <span>操作</span>
                  </li>
                </div>
                <div v-for="(item,index) in logList"
                  :key="index">
                  <li>
                    <span>{{item.complete_time.slice(0,10)}}</span>
                    <span>{{item.client_name}}</span>
                    <span>{{item.product_info.product_code}}</span>
                    <span>{{item.product_info.category_info.product_category}}/{{item.product_info.type_name}}/{{item.product_info.style_name}}</span>
                    <span>{{item.color}}/{{item.size}}</span>
                    <span>{{item.price}}</span>
                    <span>{{item.number}}{{item.product_info.category_info.name}}</span>
                    <span>{{parseInt(item.price*item.number)}}</span>
                    <span>{{item.user_name}}</span>
                    <span>{{item.desc}}</span>
                    <span style="color:#1A95FF;cursor:pointer"
                      @click="updateLog(item)">修改</span>
                  </li>
                </div>
                <li v-if="logList.length===0">
                  <span>暂无日志信息</span>
                </li>
              </ul>
              <div class="handle">
                <div class="order"
                  @click="$router.push('/index/productDesignWeavingCreate/' + $route.params.id)">
                  <img class="icon"
                    src="@/assets/image/icon/orderIcon.png">
                  <span>去织造</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">生产分配信息</div>
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
                  <span style="flex:8">
                    <span style="flex:2">产品信息</span>
                    <span>颜色/尺码</span>
                    <span>单价</span>
                    <span>数量</span>
                    <span>创建时间</span>
                    <span>完成时间</span>
                    <span>备注</span>
                  </span>
                  <span>总价</span>
                  <span>操作</span>
                </li>
                <li class="material_info"
                  v-for="(item,index) in fenpeiList"
                  :key="index">
                  <span>{{item.client_name}}</span>
                  <span class="col"
                    style="flex:8">
                    <span v-for="(itemPro,indexPro) in item.info"
                      :key="indexPro">
                      <span style="flex:2">{{itemPro.product_code}}({{itemPro.info[0].product_info.category_info.product_category}}/{{itemPro.info[0].product_info.type_name}}/{{itemPro.info[0].product_info.style_name}})</span>
                      <span class="col"
                        style="flex:6">
                        <span v-for="(itemPrice,indexPrice) in itemPro.info"
                          :key="indexPrice">
                          <span>{{itemPrice.color}}/{{itemPrice.size}}</span>
                          <span>{{itemPrice.price}}</span>
                          <span>{{itemPrice.number}}{{itemPrice.product_info.category_info.name}}</span>
                          <span>{{itemPrice.created_at.slice(0,10)}}</span>
                          <span>{{itemPrice.complete_time.slice(0,10)}}</span>
                          <span>{{itemPrice.desc}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span>{{item.sum}}元</span>
                  <span class="col">
                    <span v-for="(itemPro,indexPro) in item.info"
                      :key="indexPro">
                      <span style="color:#1A95FF;cursor:pointer"
                        @click="open($route.params.id,item.client_name,itemPro.product_code,0)">打印</span>
                    </span>
                  </span>
                </li>
                <li class="material_info"
                  v-if="fenpeiList.length===0">
                  <span>暂无分配信息</span>
                </li>
              </ul>
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
              <ul class="tablesCtn">
                <li class="title">
                  <span>生产单位</span>
                  <span style="flex:1.5">产品信息</span>
                  <span style="flex:5">
                    <span>配色/尺码</span>
                    <span>分配数量</span>
                    <span style="flex:1.5">纱线</span>
                    <span>颜色</span>
                    <span>重量</span>
                  </span>
                  <span>操作</span>
                </li>
                <li class="material_info"
                  v-for="(item,index) in materialList"
                  :key="index">
                  <span>{{item.client_name}}</span>
                  <span class="col"
                    style="flex:6.5">
                    <span v-for="(itemPro,indexPro) in item.info"
                      :key="indexPro">
                      <span style="flex:1.5">{{itemPro.product_code}}({{itemPro.info[0].product_info.category_info.product_category}}/{{itemPro.info[0].product_info.type_name}}/{{itemPro.info[0].product_info.style_name}})</span>
                      <span class="col"
                        style="flex:5">
                        <span v-for="(itemColour,indexColour) in itemPro.info"
                          :key="indexColour">
                          <span>{{itemColour.color}}/{{itemColour.size}}</span>
                          <span>{{itemColour.number}}{{itemColour.product_info.category_info.name}}</span>
                          <span class="col"
                            style="flex:3.5">
                            <span v-for="(itemColor,indexColor) in itemColour.colorArr"
                              :key="indexColor">
                              <span style="flex:1.5;border-right:1px solid #ddd;align-items: center;">{{itemColor.material}}</span>
                              <span class="col"
                                style="flex:2">
                                <span v-for="(itemWeight,indexWeight) in itemColor.colorWeight"
                                  :key="indexWeight">
                                  <span style="border-right:1px solid #ddd;"
                                    :style="{'border-bottom':indexWeight<( itemColor.colorWeight.length-1)?'1px solid #ddd':'none'}">{{itemWeight.color}}</span>
                                  <span :style="{'border-bottom':indexWeight<( itemColor.colorWeight.length-1)?'1px solid #ddd':'none'}">{{itemWeight.weight}}千克</span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span style="color:#1A95FF"
                    @click="$router.push('/index/rawMaterialSupply/'+$route.params.id+'/'+item.client_name + '/' +item.info[0].info[0].client_id )">补纱</span>
                </li>
                <li class="material_info"
                  v-if="materialList.length===0">
                  <span>暂无分配信息</span>
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
            {{updateInfo.client_name}}
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
            <el-date-picker v-model="updateInfo.complete_time"
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
import { productionDetail, weaveDetail, weaveUpadate } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      lock: false,
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
      productInfo: [],
      product: [],
      state: true,
      materialList: [],
      logList: [],
      StatisticsList: [],
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
        complete_time: ''
      },
      fenpeiList: []
    }
  },
  mounted () {
    Promise.all([
      productionDetail({
        order_id: this.$route.params.id
      }), weaveDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      this.order = res[0].data.data.production_detail.order_info
      this.productInfo = res[0].data.data.production_detail.product_info.map((item) => {
        let json = item
        json.fenpei = 0
        return json
      })
      let productPlan = res[0].data.data.product_plan
      this.logList = res[1].data.data
      // 将织造分配的数据整合到原来的数据中
      res[1].data.data.forEach((item) => {
        this.productInfo.forEach((itemPro, indexPro) => {
          if (itemPro.product_code === item.product_info.product_code && itemPro.size === item.size && itemPro.color === item.color) {
            this.productInfo[indexPro].fenpei = this.productInfo[indexPro].fenpei ? this.productInfo[indexPro].fenpei + item.number : item.number
          }
        })
      })
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
            unit_name: item.unit_name,
            craft_list_id: item.craft_list_id,
            has_craft: item.has_craft,
            info: [{
              color: item.color,
              order_num: item.order_num,
              size: item.size,
              total_num: item.total_num,
              production_num: item.production_num,
              production_sunhao: item.production_sunhao,
              fenpei: item.fenpei,
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
                craft_list_id: itemPro.craft_list_id,
                has_craft: itemPro.has_craft,
                info: itemPro.info.concat([{
                  color: item.color,
                  order_num: item.order_num,
                  size: item.size,
                  total_num: item.total_num,
                  production_num: item.production_num,
                  production_sunhao: item.production_sunhao,
                  fenpei: item.fenpei,
                  stock_pick: item.stock_pick
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
      // product第一轮整理完毕后，在计算配料单之前，先把统计表做好
      this.StatisticsList = this.product
      // product第一轮整理完毕后，对配料单完整的数据进行原料计算
      this.product = this.product.map((item) => {
        if (item.state === 2) {
          return {
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            state: item.state,
            unit_name: item.unit_name,
            craft_list_id: item.craft_list_id,
            has_craft: item.has_craft,
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
                // 第一层筛选产品品类相同的，配色尺码相同的,再把辅料过滤掉
                if (itemPlan.color_match_name === itemInfo.color && itemPlan.size === itemInfo.size && itemPlan.type === 0) {
                  // 再筛选纱线相同的
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
                        weight: (itemPlan.number * itemInfo.production_num * (1 + itemInfo.production_sunhao / 100) / 1000).toFixed(2)
                      }]
                    })
                  } else {
                    json.colorArr[mark].colorWeight.push({
                      color: itemPlan.color_name,
                      weight: (itemPlan.number * itemInfo.production_num * (1 + itemInfo.production_sunhao / 100) / 1000).toFixed(2)
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
      // 所需原料信息和织造信息全部都放在product中，整理完毕之后，开始整理原料分配信息
      // 第一步，把纱线和颜色信息取出来
      let materialList = this.logList.map((itemLog, indexLog) => {
        let newItem = itemLog
        let finded = this.product.find((itemPro, indexPro) => itemPro.product_code === itemLog.product_info.product_code)
        let colorArr = finded.state === 2 ? finded.info.find((itemInfo, indexInfo) => itemInfo.color === itemLog.color && itemInfo.size === itemLog.size).colorArr : []
        newItem.colorArr = colorArr
        newItem.production_num = finded.info.find((itemInfo, indexInfo) => itemInfo.color === itemLog.color && itemInfo.size === itemLog.size).production_num
        newItem.production_sunhao = finded.info.find((itemInfo, indexInfo) => itemInfo.color === itemLog.color && itemInfo.size === itemLog.size).production_sunhao
        newItem.product_code = itemLog.product_info.product_code
        return newItem
      })
      // 第二步，合并加工单位
      this.materialList = this.jsonMerge(materialList, ['client_name', 'product_code'])
      console.log(this.materialList)
      // 统计生产分配信息
      // 先按生产单位合并，再按产品编号合并
      let fenpeiList = this.jsonMerge(this.logList.map((item) => {
        let json = item
        json.product_code = item.product_info.product_code
        return json
      }), ['client_name', 'product_code'])
      // 合并完成之后计算每个公司的money
      this.fenpeiList = fenpeiList.map((itemCompany) => {
        return {
          info: itemCompany.info,
          client_name: itemCompany.client_name,
          sum: itemCompany.info.reduce((totalType, currentType) => {
            return totalType + currentType.info.reduce((totalLast, currentLast) => {
              return totalLast + currentLast.price * currentLast.number
            }, 0)
          }, 0)
        }
      })
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
      weaveUpadate({
        id: this.updateInfo.id,
        price: this.updateInfo.price,
        number: this.updateInfo.number,
        complete_time: this.updateInfo.complete_time,
        desc: this.updateInfo.desc,
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
      height: 560px;
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
