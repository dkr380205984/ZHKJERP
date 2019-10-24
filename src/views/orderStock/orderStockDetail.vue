<template>
  <div id="rawMaterialOrderDetail"
    style="overflow:auto"
    v-loading="loading">
    <div class="head"
      id="top">
      <h2>出入库详情</h2>
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
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{order.order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
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
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span>尺码/配色</span>
                  <span>下单数量</span>
                  <span>库存调取数</span>
                  <span>计划生产数</span>
                  <span>操作</span>
                </li>
                <li class="material_info"
                  v-for="(item,index) in productInfo"
                  :key="index">
                  <span style="color:#1A94FF"
                    @click="$router.push('/index/productDetail/' + item.product_id)">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:4">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.order_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.stock_pick}}{{item.unit_name}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                    </span>
                  </span>
                  <span>
                    <a class="caozuo"
                      :href="'#'+item.product_code"
                      style="text-decoration:none">详情</a>
                    <!-- <div class="caozuo"
                      @click="$router.push('/index/orderStockOut/' + $route.params.id + '/' + item.product_code)">出库</div>
                    <div class="caozuo"
                      @click="$router.push('/index/orderStockIn/' + $route.params.id + '/' + item.product_code)">入库</div> -->
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-for="(item,index) in productInfo"
        :key="index">
        <div class="stepTitle"
          :id="item.product_code">产品 {{index+1}}</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <div class="handle">
                <div @click="item.canIn?$router.push('/index/orderStockIn/' + $route.params.id + '/' + item.product_code):''">
                  <img class="icon"
                    :src="item.canIn?require('@/assets/image/icon/goStock.png'):require('@/assets/image/icon/goStock_disabled.png')">
                  <span :style="{'color':item.canIn?'#1A95FF':'#ddd','cursor':item.canIn?'pointer':'not-allowed'}">去入库</span>
                </div>
              </div>
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span>尺码/配色</span>
                  <span>计划生产数</span>
                  <span>入库工序</span>
                  <span>入库单位</span>
                  <span>捆(包)数</span>
                  <span>总数</span>
                  <span>操作人</span>
                  <span>入库时间</span>
                  <span>合计入库数量</span>
                </li>
                <li class="material_info">
                  <span style="color:#1A94FF">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:9">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span class="col"
                        style="flex:7">
                        <span v-for="(itemType,indexType) in itemColour.in"
                          :key="indexType">
                          <span>
                            {{itemType.type}}
                          </span>
                          <span class="col"
                            style="flex:5">
                            <span v-for="(itemCompany,indexCompany) in itemType.info"
                              :key="indexCompany">
                              <span style="border-right:1px solid #ddd;align-items:center">{{itemCompany.company}}</span>
                              <span class="col"
                                style="flex:4">
                                <span v-for="(itemNumber,indexNumber) in itemCompany.info"
                                  :key="indexNumber">
                                  <span class="col"
                                    :style="{'border-bottom':indexNumber<itemCompany.info.length-1?'1px solid #ddd':'none'}"
                                    style="flex:2">
                                    <span v-for="(itemPack,indexPack) in itemNumber.numberPack"
                                      :key="indexPack">
                                      <span style="border-right:1px solid #ddd;"
                                        :style="{'border-bottom':indexPack<itemNumber.numberPack.length-1?'1px solid #ddd':'none'}">{{itemPack.pack}}</span>
                                      <span style="border-right:1px solid #ddd;"
                                        :style="{'border-bottom':indexPack<itemNumber.numberPack.length-1?'1px solid #ddd':'none'}">{{itemPack.number}}{{item.unit_name}}</span>
                                    </span>
                                  </span>
                                  <span style="align-items:center;border-right:1px solid #ddd"
                                    :style="{'border-bottom':indexNumber<itemCompany.info.length-1?'1px solid #ddd':'none'}">{{itemNumber.user_name}}</span>
                                  <span style="align-items:center;"
                                    :style="{'border-bottom':indexNumber<itemCompany.info.length-1?'1px solid #ddd':'none'}">{{itemNumber.complete_time.slice(0,10)}}</span>
                                </span>
                              </span>
                            </span>
                          </span>
                          <span>{{itemType.total}}{{item.unit_name}}</span>
                        </span>
                        <span style="flex:7;"
                          v-if="itemColour.in.length === 0">暂无入库信息</span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
              <div class="logList"
                @click="showDetail(index,'inLogFlag')">{{ item.inLogFlag ? '收起' : '展开'}}详情</div>
              <ul class="log"
                style="margin-top:0"
                v-show="item.inLogFlag">
                <div>
                  <li>
                    <span>完成时间</span>
                    <span>出库单位</span>
                    <span>产品编号</span>
                    <span>产品品类</span>
                    <span>尺码/配色</span>
                    <span>出库捆(包)数</span>
                    <span>出库数量</span>
                    <span>操作人</span>
                    <span>备注</span>
                    <span>操作</span>
                  </li>
                </div>
                <div>
                  <li v-for="(itemLog,indexLog) in item.inLog"
                    :key="indexLog">
                    <span>{{itemLog.complete_time.slice(0,10)}}</span>
                    <span>{{itemLog.client_name}}</span>
                    <span>{{itemLog.product_info.product_code}}</span>
                    <span>{{itemLog.product_info.category_info.product_category}}/{{itemLog.product_info.type_name}}/{{itemLog.product_info.style_name}}</span>
                    <span>{{itemLog.size}}/{{itemLog.color}}</span>
                    <span>{{itemLog.count}}捆(包)</span>
                    <span>{{itemLog.number}}{{itemLog.product_info.category_info.name}}</span>
                    <span>{{itemLog.user_name}}</span>
                    <span>{{itemLog.desc}}</span>
                    <span style="color:#1A95FF;cursor:pointer"
                      @click="updateLog(itemLog,'in')">修改</span>
                  </li>
                </div>
                <li v-if="item.inLog.length===0">
                  <span>暂无日志信息</span>
                </li>
              </ul>
              <div class="handle">
                <div @click="item.canOut?$router.push('/index/orderStockOut/' + $route.params.id + '/' + item.product_code):''">
                  <img class="icon"
                    :src="item.canOut?require('@/assets/image/icon/outStock.png'):require('@/assets/image/icon/outStock_disabled.png')">
                  <span :style="{'color':item.canOut?'#1A95FF':'#ddd','cursor':item.canOut?'pointer':'not-allowed'}">去出库</span>
                </div>
              </div>
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span>尺码/配色</span>
                  <span>计划生产数</span>
                  <span>出库工序</span>
                  <span>出库单位</span>
                  <span>捆(包)数</span>
                  <span>总数</span>
                  <span>操作人</span>
                  <span>出库时间</span>
                  <span>合计出库数量</span>
                </li>
                <li class="material_info">
                  <span style="color:#1A94FF">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:9">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span class="col"
                        style="flex:7">
                        <span v-for="(itemType,indexType) in itemColour.out"
                          :key="indexType">
                          <span>
                            {{itemType.type}}
                          </span>
                          <span class="col"
                            style="flex:5">
                            <span v-for="(itemCompany,indexCompany) in itemType.info"
                              :key="indexCompany">
                              <span style="border-right:1px solid #ddd;align-items:center">{{itemCompany.company}}</span>
                              <span class="col"
                                style="flex:4">
                                <span v-for="(itemNumber,indexNumber) in itemCompany.info"
                                  :key="indexNumber">
                                  <span class="col"
                                    :style="{'border-bottom':indexNumber<itemCompany.info.length-1?'1px solid #ddd':'none'}"
                                    style="flex:2">
                                    <span v-for="(itemPack,indexPack) in itemNumber.numberPack"
                                      :key="indexPack">
                                      <span style="border-right:1px solid #ddd;"
                                        :style="{'border-bottom':indexPack<itemNumber.numberPack.length-1?'1px solid #ddd':'none'}">{{itemPack.pack}}</span>
                                      <span style="border-right:1px solid #ddd;"
                                        :style="{'border-bottom':indexPack<itemNumber.numberPack.length-1?'1px solid #ddd':'none'}">{{itemPack.number}}{{item.unit_name}}</span>
                                    </span>
                                  </span>
                                  <span style="align-items:center;border-right:1px solid #ddd"
                                    :style="{'border-bottom':indexNumber<itemCompany.info.length-1?'1px solid #ddd':'none'}">{{itemNumber.user_name}}</span>
                                  <span style="align-items:center;"
                                    :style="{'border-bottom':indexNumber<itemCompany.info.length-1?'1px solid #ddd':'none'}">{{itemNumber.complete_time.slice(0,10)}}</span>
                                </span>
                              </span>
                            </span>
                          </span>
                          <span>{{itemType.total}}{{item.unit_name}}</span>
                        </span>
                        <span style="flex:7;"
                          v-if="itemColour.out.length === 0">暂无出库信息</span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
              <div class="logList"
                @click="showDetail(index,'outLogFlag')">{{ item.outLogFlag ? '收起' : '展开'}}详情</div>
              <ul class="log"
                style="margin-top:0"
                v-show="item.outLogFlag">
                <div>
                  <li>
                    <span>完成时间</span>
                    <span>出库单位</span>
                    <span>产品编号</span>
                    <span>产品品类</span>
                    <span>尺码/配色</span>
                    <span>出库捆(包)数</span>
                    <span>出库数量</span>
                    <span>操作人</span>
                    <span>备注</span>
                    <span>操作</span>
                  </li>
                </div>
                <div>
                  <li v-for="(itemLog,indexLog) in item.outLog"
                    :key="indexLog">
                    <span>{{itemLog.complete_time.slice(0,10)}}</span>
                    <span>{{itemLog.client_name}}</span>
                    <span>{{itemLog.product_info.product_code}}</span>
                    <span>{{itemLog.product_info.category_info.product_category}}/{{itemLog.product_info.type_name}}/{{itemLog.product_info.style_name}}</span>
                    <span>{{itemLog.size}}/{{itemLog.color}}</span>
                    <span>{{itemLog.count}}捆(包)</span>
                    <span>{{itemLog.number}}{{itemLog.product_info.category_info.name}}</span>
                    <span>{{itemLog.user_name}}</span>
                    <span>{{itemLog.desc}}</span>
                    <span style="color:#1A95FF;cursor:pointer"
                      @click="updateLog(itemLog,'out')">修改</span>
                  </li>
                </div>
                <li v-if="item.outLog.length===0">
                  <span>暂无日志信息</span>
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
          @click="$router.go(-1)">确定</div>
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
          <span class="label">单位名称:</span>
          <div class="elCtn">
            {{updateInfo.client_name}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">加工类型:</span>
          <div class="elCtn">
            {{updateInfo.type}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">产品信息:</span>
          <div class="elCtn">
            {{updateInfo.product_info.product_code}}（{{updateInfo.product_info.category_info.product_category}}/{{updateInfo.product_info.type_name}}/{{updateInfo.product_info.style_name}} -- {{updateInfo.color}}/{{updateInfo.size}}）
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>捆数:</span>
          <div class="elCtn">
            <el-input v-model="updateInfo.count"
              placeholder="请输入单价">
              <template slot="append">捆/包</template>
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>数量:</span>
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
    <div class="suspend">
      <span style="border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;"
        class="blue"><a href="#top"
          style="color: #fff;text-decoration: none;">回到顶部</a></span>
    </div>
  </div>
</template>

<script>
import { productionDetail, storeInList, storeOutList, storeInUpdate, storeOutUpdate, weaveDetail, halfProductDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      showShade: false,
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
      logList: [],
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
        count: '',
        complete_time: '',
        type: ''
      }
    }
  },
  mounted () {
    Promise.all([productionDetail({
      order_id: this.$route.params.id
    }), storeInList({
      order_id: this.$route.params.id
    }), storeOutList({
      order_id: this.$route.params.id
    }), weaveDetail({
      order_id: this.$route.params.id
    }), halfProductDetail({
      order_id: this.$route.params.id
    })]).then((res) => {
      this.order = res[0].data.data.production_detail.order_info
      let productInfo = res[0].data.data.production_detail.product_info
      // 根据产品编号进行合并
      productInfo.forEach((item) => {
        let mark = -1
        let finded = this.productInfo.find((itemFind, index) => {
          if (itemFind.product_code === item.product_code) {
            mark = index
            return itemFind.product_code === item.product_code
          }
        })
        if (!finded) {
          this.productInfo.push({
            product_id: item.product_id,
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
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
          this.productInfo[mark].info.push({
            color: item.color,
            order_num: item.order_num,
            size: item.size,
            total_num: item.total_num,
            production_num: item.production_num,
            production_sunhao: item.production_sunhao,
            stock_pick: item.stock_pick
          })
        }
      })
      let logListIn = res[1].data.data
      let logListOut = res[2].data.data
      let logListWeave = res[3].data.data
      let logListHalf = res[4].data.data
      // 把日志信息整合到产品信息里去
      this.productInfo = this.productInfo.map((item) => {
        let json = item
        json.inLog = []
        json.outLog = []
        json.inLogFlag = false // 用于日志展开收起管理
        json.outLogFlag = false
        json.canOut = !!logListHalf.find((itemFind) => itemFind.product_info.product_code === item.product_code) // 必须要有半成品分配信息才能出库
        json.canIn = !!logListWeave.find((itemFind) => itemFind.product_info.product_code === item.product_code) || logListHalf.find((itemFind) => itemFind.product_info.product_code === item.product_code) // 用于判断是否可以执行出入库操作
        // 先根据是否有制造分配信息或者半成品分配信息判断该产品能否进行出入库操作
        // 第一步把日志信息记录到inLog 和 outLog数组里
        logListIn.forEach((itemLog) => {
          if (itemLog.product_info.product_code === item.product_code) {
            json.inLog.push(itemLog)
          }
        })
        logListOut.forEach((itemLog) => {
          if (itemLog.product_info.product_code === item.product_code) {
            json.outLog.push(itemLog)
          }
        })
        // 第二步把日志信息根据尺码和颜色进行整合
        json.info = json.info.map((itemSize) => {
          let jsonSize = itemSize
          jsonSize.in = []
          jsonSize.out = []

          logListIn.forEach((itemLog) => {
            if (itemLog.product_info.product_code === item.product_code && itemLog.color === itemSize.color && itemLog.size === itemSize.size) {
              let mark = -1
              let finded = jsonSize.in.find((itemFind, indexFind) => {
                if (itemFind.type === itemLog.type && itemFind.company === itemLog.client_name && itemFind.complete_time === itemLog.complete_time && itemFind.user_name === itemLog.user_name) {
                  mark = indexFind
                  return itemFind.type === itemLog.type && itemFind.company === itemLog.client_name && itemFind.complete_time === itemLog.complete_time && itemFind.user_name === itemLog.user_name
                }
              })
              if (!finded) {
                jsonSize.in.push({
                  'type': itemLog.type,
                  'company': itemLog.client_name,
                  'complete_time': itemLog.complete_time,
                  'user_name': itemLog.user_name,
                  'numberPack': [{
                    'number': itemLog.number,
                    'pack': itemLog.count
                  }],
                  'total': itemLog.number
                })
              } else {
                jsonSize.in[mark].numberPack.push({
                  'number': itemLog.number,
                  'pack': itemLog.count
                })
                jsonSize.in[mark].total += itemLog.number
              }
            }
          })
          logListOut.forEach((itemLog) => {
            if (itemLog.product_info.product_code === item.product_code && itemLog.color === itemSize.color && itemLog.size === itemSize.size) {
              let mark = -1
              let finded = jsonSize.out.find((itemFind, indexFind) => {
                if (itemFind.type === itemLog.type && itemFind.company === itemLog.client_name && itemFind.complete_time === itemLog.complete_time && itemFind.user_name === itemLog.user_name) {
                  mark = indexFind
                  return itemFind.type === itemLog.type && itemFind.company === itemLog.client_name && itemFind.complete_time === itemLog.complete_time && itemFind.user_name === itemLog.user_name
                }
              })
              if (!finded) {
                jsonSize.out.push({
                  'type': itemLog.type,
                  'company': itemLog.client_name,
                  'complete_time': itemLog.complete_time,
                  'user_name': itemLog.user_name,
                  'numberPack': [{
                    'number': itemLog.number,
                    'pack': itemLog.count
                  }],
                  'total': itemLog.number
                })
              } else {
                jsonSize.out[mark].numberPack.push({
                  'number': itemLog.number,
                  'pack': itemLog.count
                })
                jsonSize.out[mark].total += itemLog.number
              }
            }
          })
          // 把in 和 out的信息先按加工类型合并再按加工单位合并一下
          jsonSize.in = this.jsonMerge(jsonSize.in, ['type', 'company'])
          jsonSize.out = this.jsonMerge(jsonSize.out, ['type', 'company'])
          // 统计下每个工序的总数量
          jsonSize.out = jsonSize.out.map((item) => {
            return {
              type: item.type,
              info: item.info,
              total: item.info.reduce((total, current) => {
                return total + current.info.reduce((total2, current2) => {
                  return total2 + current2.total
                }, 0)
              }, 0)
            }
          })
          jsonSize.in = jsonSize.in.map((item) => {
            return {
              type: item.type,
              info: item.info,
              total: item.info.reduce((total, current) => {
                return total + current.info.reduce((total2, current2) => {
                  return total2 + current2.total
                }, 0)
              }, 0)
            }
          })
          return jsonSize
        })
        return json
      })
      this.loading = false
    })
  },
  methods: {
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
    // 展开详情
    showDetail (index, flag) {
      let json = this.productInfo[index]
      json[flag] = !json[flag]
      this.$set(this.productInfo, index, json)
    },
    // 点击修改
    updateLog (item, flag) {
      let json = item
      json.flag = flag
      this.updateInfo = item
      this.showShade = true
    },
    // 修改日志
    updateLogFn () {
      if (this.updateInfo.flag === 'out') {
        storeOutUpdate({
          id: this.updateInfo.id,
          count: this.updateInfo.count,
          number: this.updateInfo.number,
          complete_time: this.updateInfo.complete_time,
          desc: this.updateInfo.desc,
          type: this.updateInfo.type,
          client_id: null,
          color: null,
          size: null,
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
      } else {
        storeInUpdate({
          id: this.updateInfo.id,
          count: this.updateInfo.count,
          number: this.updateInfo.number,
          complete_time: this.updateInfo.complete_time,
          desc: this.updateInfo.desc,
          type: this.updateInfo.type,
          client_id: null,
          color: null,
          size: null,
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

}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
</style>
<style lang="less" scoped>
.handle {
  position: static !important;
  overflow: hidden;
  transform: none !important;
  margin: 15px 0 5px 0;
  div {
    float: right;
  }
}
.logList {
  margin-left: auto;
  width: 4em;
  position: relative !important;
  transform: translateY(0) !important;
  display: block !important;
  opacity: 0.8;
}
.caozuo {
  color: #1a95ff;
  margin: 0 5px;
  cursor: pointer;
}
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
      height: 640px;
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
