<template>
  <div id="rawMaterialOrderDetail"
    v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原' : '辅'}}料出入库</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号：</span>
            <span class="content important"
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{orderInfo.order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司：</span>
            <span class="content">{{orderInfo.client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期：</span>
            <span class="content">{{orderInfo.order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组：</span>
            <span class="content">{{orderInfo.group_name}}</span>
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
                  <span v-if="item.state===0"
                    @click="$router.push('/index/productPlanCreate/' + item.product_id)">配料单信息缺失(点击添加)</span>
                  <span v-if="item.state===1"
                    @click="$router.push('/index/productPlanUpdate/' + item.product_plan_id)">配料单配色缺失(点击补充)</span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料信息统计</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding"
            v-if="materialList.length > 0">
            <div class="content">
              <div class="tabCtn">
                <div class="tab"
                  :class="{'active':tabInfo==='default'}"
                  @click="tabInfo='default'">计划</div>
                <div class="tab"
                  :class="{'active':tabInfo==='DG'}"
                  @click="tabInfo='DG'">调取/订购</div>
                <div class="tab"
                  :class="{'active':tabInfo==='JG'}"
                  @click="tabInfo='JG'">加工</div>
                <div class="tab"
                  v-if="bushaList.length>0"
                  :class="{'active':tabInfo==='BS'}"
                  @click="tabInfo='BS'">补纱</div>
              </div>
              <ul class="tablesCtn"
                v-show="tabInfo==='default'">
                <li class="title">
                  <span>计划原料</span>
                  <span class="flex2">
                    <span>{{type==='0'?'颜色':'属性'}}</span>
                    <span class="flex08">计划数量</span>
                  </span>
                  <span>总数量</span>
                  <!-- <span>已订购</span> -->
                  <!-- <span>已调取</span> -->
                  <!-- <span>已加工</span> -->
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
                  <!-- <span class="tableRow">{{(item.order_weight ? item.order_weight : 0)|fixedFilter}}{{item.unit}}</span> -->
                  <!-- <span class="tableRow">{{(item.stock_weight ? item.stock_weight : 0)|fixedFilter}}{{item.unit}}</span> -->
                  <!-- <span class="tableRow">{{(item.process_weight ? item.process_weight : 0)|fixedFilter}}{{item.unit}}</span> -->
                </li>
              </ul>
              <ul class="tablesCtn"
                v-show="tabInfo==='DG'">
                <li class="title">
                  <span class="flex104 tableRow">
                    <span class="tableColumn">
                      <span class="flex17">调拨来源</span>
                      <span class="flex17">原料名称</span>
                      <span class="flex17">{{type==='0'?'颜色':'属性'}}</span>
                      <span class="flex17">数量</span>
                    </span>
                  </span>
                </li>
                <li v-for="(value,index) in orderList"
                  :key="index"
                  class="content">
                  <span class="tableRow"
                    style="flex-direction:column;flex:1">
                    <span style="height:25px;"
                      :style="{'color':value.where==='调取'?'#E6A23C':'#67C23A'}">{{value.where}}</span>
                    <span style="line-height:25px">{{value.company}}</span>
                  </span>
                  <span class="tableRow col"
                    style="flex:3">
                    <span v-for="(iten,kay) in value.materials"
                      :key="kay"
                      class="tableColumn">
                      <span class="tableRow"
                        style="flex:1">{{iten.material}}</span>
                      <span class="col"
                        style="flex:2">
                        <span v-for="(content,number) in iten.colors"
                          :key="number"
                          class="tableColumn">
                          <span class="tableRow">{{content.color}}</span>
                          <span class="tableRow">{{content.value|fixedFilter}}{{content.unit}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
              <ul class="tablesCtn"
                v-show="tabInfo==='JG'">
                <li class="title">
                  <span class="flex17">加工类型</span>
                  <span class="flex17">加工单位</span>
                  <span class="flex17">原料名称</span>
                  <span class="flex17">{{type==='0'?'颜色':'属性'}}</span>
                  <span class="flex17">数量</span>
                </li>
                <li v-if="processList.length === 0">暂无信息</li>
                <li v-for="(value,index) in processList"
                  :key="index"
                  class="content">
                  <span class="tableRow"
                    style="flex:1">{{value.process_type}}</span>
                  <span class="col tableRow"
                    style="flex:4">
                    <span v-for="(item,key) in value.companys"
                      :key="key"
                      class="tableColumn">
                      <span class=" tableRow"
                        style="flex:1">{{item.company}}</span>
                      <span class=" tableRow col"
                        style="flex:3">
                        <span v-for="(iten,kay) in item.materials"
                          :key="kay"
                          class="tableColumn">
                          <span class="tableRow"
                            style="flex:1">{{iten.material}}</span>
                          <span class="tableRow col"
                            style="flex:2">
                            <span v-for="(content,number) in iten.colors"
                              :key="number"
                              class="tableColumn">
                              <span class="tableRow">{{content.color}}</span>
                              <span class="tableRow">{{content.value|fixedFilter}}{{content.unit}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
              <ul class="tablesCtn"
                v-show="tabInfo==='BS'">
                <li class="title">
                  <span class="flex17">补纱次数</span>
                  <span class="flex17">原料名称</span>
                  <span class="flex17">原料颜色</span>
                  <span class="flex17">重量</span>
                  <span class="flex17">补纱原因</span>
                </li>
                <li v-for="(value,index) in bushaList"
                  :key="index"
                  class="content">
                  <span class="tableRow"
                    style="flex:1">第{{index+1}}次</span>
                  <span class="col tableRow"
                    style="flex:3">
                    <span v-for="(item,key) in value.yarn_info"
                      :key="key"
                      class="tableColumn">
                      <span class=" tableRow"
                        style="flex:1">{{item.name}}</span>
                      <span class=" tableRow col"
                        style="flex:2">
                        <span v-for="(iten,kay) in item.info"
                          :key="kay"
                          class="tableColumn">
                          <span class="tableRow"
                            style="flex:1;">{{iten.color}}</span>
                          <span class="tableRow"
                            style="flex:1;color:#1A95FF">{{iten.weight}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="tableRow"
                    style="flex:1">{{value.desc}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else
            class="inputCtn noPadding"
            style="margin-left: 40px;color:#E6A23C">该订单不需要{{type === '0' ? '原': '辅'}}料，请检查配料单是否填写正确！</div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料入库
          <i class="el-icon-message-solid"
            :class="{'active':msgFlag.inStock}"
            @click="showMsg.inStock = true"></i>
        </div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <div class="tabCtn">
                <div class="tabCtn">
                  <div class="tab"
                    v-for="(item,index) in materialList"
                    :key="index"
                    @click="materialActive=index"
                    :class="{'active':index===materialActive}">{{item.material}}</div>
                </div>
              </div>
              <ul class="tablesCtn">
                <li class="title">
                  <span>颜色/属性</span>
                  <span>计划数量</span>
                  <span>已入库数量</span>
                  <span>待入库数量</span>
                  <span>操作</span>
                </li>
                <li class="content"
                  v-for="(item,index) in (materialList[materialActive]?materialList[materialActive].need:[])"
                  :key="index">
                  <span class="tableRow">{{item.name}}</span>
                  <span class="tableRow">{{item.value|fixedFilter}}{{materialList[materialActive].unit}}</span>
                  <span class="tableRow"
                    style="color:#1A95FF;">{{item.inNum|fixedFilter}}{{materialList[materialActive].unit}}</span>
                  <span class="tableRow">{{(item.value-(item.inNum?item.inNum:0))|fixedFilter}}{{materialList[materialActive].unit}}</span>
                  <span class="tableRow">
                    <span style="color:#1A95FF;cursor:pointer"
                      v-show="!item.stockFlag"
                      @click="item.stockFlag = true">入库</span>
                    <el-input style="width:200px"
                      v-show="item.stockFlag"
                      placeholder="入库值"
                      v-model="item.stock">
                      <template slot="append">
                        <span class="submitBtn"
                          @click="stockIn(item.stock,index)">确认入库</span>
                      </template>
                    </el-input>
                  </span>
                </li>
                <li class="addLine">
                  <span class="add"
                    v-show="inFlag"
                    @click="addOperation('in')"><i class="el-icon el-icon-plus"></i>全部入库</span>
                  <span class="save"
                    v-show="!inFlag"
                    @click="saveOperation('in')"><i class="el-icon el-icon-s-home"></i>确认入库</span>
                  <span class="cancle"
                    v-show="!inFlag"
                    @click="cancleOperation('in')"><i class="el-icon el-icon-close"></i>取消</span>
                </li>
                <div class="logList"
                  @click="goStockLogFlag = !goStockLogFlag">{{ goStockLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="goStockLogFlag">
                <div>
                  <li>
                    <span>入库日期</span>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span>{{type === '0' ? '颜色' : '属性'}}</span>
                    <span>入库数量</span>
                    <span>操作人</span>
                    <span>操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="goStockLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in goStockLog"
                    :key="key">
                    <span>{{item.complete_time.slice(0,10)}}</span>
                    <span>{{item.material_name}}</span>
                    <span>{{item.color_code}}</span>
                    <span style="color:rgb(26, 149, 255)">{{item.total_weight}}</span>
                    <span>{{item.user_name}}</span>
                    <span style="color:#F56C6C;cursor:pointer"
                      @click="deleteStock(item.id,'in')">删除</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料出库
          <i class="el-icon-message-solid"
            :class="{'active':msgFlag.outStock}"
            @click="showMsg.outStock = true"></i>
        </div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding"
            v-if="outStockInfo.length > 0">
            <div class="content">
              <div class="tabCtn">
                <div class="tabCtn">
                  <div class="tab"
                    v-for="(item,index) in outStockInfo"
                    :key="index"
                    @click="outStockActive=index"
                    :class="{'active':index===outStockActive}">{{item.client_name}}</div>
                </div>
              </div>
              <ul class="tablesCtn"
                v-show="tabInfo==='default'">
                <li class="title">
                  <span>原料名称</span>
                  <span>原料颜色</span>
                  <span>所需数量</span>
                  <span>已出库数量</span>
                  <span>待出库数量</span>
                  <span>操作</span>
                </li>
                <li class="content"
                  v-for="(item,index) in (outStockInfo[outStockActive]?outStockInfo[outStockActive].info:[])"
                  :key="index">
                  <span class="tableRow"
                    style="flex:1">{{item.material_name}}</span>
                  <span class="tableRow col"
                    style="flex:5">
                    <span class="tableColumn"
                      v-for="(itemColor,indexColor) in item.info"
                      :key="indexColor">
                      <span class="tableRow">{{itemColor.color_name}}</span>
                      <span class="tableRow">{{itemColor.total_weight|fixedFilter}}{{itemColor.unit}}</span>
                      <span class="tableRow"
                        style="color:rgb(26, 149, 255)">{{itemColor.out_weight|fixedFilter}}{{itemColor.unit}}</span>
                      <span class="tableRow">{{(itemColor.total_weight - itemColor.out_weight)|fixedFilter}}{{itemColor.unit}}</span>
                      <span class="tableRow">
                        <span style="color:#1A95FF;cursor:pointer"
                          v-show="!itemColor.stockFlag"
                          @click="itemColor.stockFlag = true">出库</span>
                        <el-input style="width:180px"
                          v-show="itemColor.stockFlag"
                          placeholder="出库值"
                          v-model="itemColor.stock">
                          <template slot="append">
                            <span class="submitBtn"
                              @click="stockOut(itemColor.stock,index,indexColor)">确认出库</span>
                          </template>
                        </el-input>
                      </span>
                    </span>
                  </span>
                </li>
                <li class="addLine">
                  <span class="add"
                    v-show="outFlag"
                    @click="addOperation('out')"><i class="el-icon el-icon-plus"></i>全部出库</span>
                  <span class="save"
                    v-show="!outFlag"
                    @click="saveOperation('out')"><i class="el-icon el-icon-house"></i>确认出库</span>
                  <span class="cancle"
                    v-show="!outFlag"
                    @click="cancleOperation('out')"><i class="el-icon el-icon-close"></i>取消</span>
                </li>
                <div class="logList"
                  @click="outStockLogFlag = !outStockLogFlag">{{ outStockLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="outStockLogFlag">
                <div>
                  <li>
                    <span class="flexBig">出库日期</span>
                    <span class="flexBig">{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexBig">出库单位</span>
                    <span>{{type === '0' ? '颜色' : '属性'}}</span>
                    <span>出库数量</span>
                    <span>操作人</span>
                    <span>操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="outStockLog.length === 0">暂无信息</li>
                  <li v-for="(item,index) in outStockLog"
                    :key="index">
                    <span class="flexBig">{{item.complete_time.slice(0,10)}}</span>
                    <span class="flexBig">{{item.material_name}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.color_code}}</span>
                    <span>{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span>{{item.user_name}}</span>
                    <span style="color:#F56C6C;cursor:pointer"
                      @click="deleteStock(item.id,'out')">删除</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div v-else
            class="inputCtn noPadding"
            style="margin-left: 40px;color:#E6A23C">暂无出库信息，这可能是因为该订单还未进行织造分配</div>
        </div>
      </div>
      <div class="stepCtn"
        v-if="surplus.length>0">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料结余</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="borderCtn">
            <div class="cicle"></div>
            <div class="border"></div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>{{type==='0'?'原料':'辅料'}}名称</span>
                  <span>颜色/属性</span>
                  <span>剩余数量</span>
                  <span>操作</span>
                </li>
                <li class="content"
                  v-for="(item,index) in surplus"
                  :key="index">
                  <span class="tableRow">{{item.material_name}}</span>
                  <span class="tableRow">{{item.material_color}}</span>
                  <span class="tableRow"
                    style="color:#1A95FF;">{{item.total_weight|fixedFilter}}</span>
                  <span class="tableRow">
                    <span v-show="!item.stockFlag"
                      @click="item.stockFlag = true"
                      style="color:#1A95FF;cursor:pointer">结余入库</span>
                    <!-- <span v-show="!item.stockFlag"
                      style="color:#E6A23C;cursor:pointer"
                      @click="surplusDelete(item)">数量清空</span> -->
                    <el-input style="width:220px"
                      v-show="item.stockFlag"
                      placeholder="入库值"
                      v-model="item.stock">
                      <template slot="append">
                        <span class="submitBtn"
                          @click="stockSurplus(item)">确认结余</span>
                      </template>
                    </el-input>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-message :visible.sync="showMsg.inStock"
      :url="localName.inStock"
      :afterSave="saveInStock"></my-message>
    <my-message :visible.sync="showMsg.outStock"
      :url="localName.outStock"
      :afterSave="saveOutStock"></my-message>
  </div>
</template>
<script>
import {
  rawMaterialOrderInit,
  rawMaterialOrderList,
  orderDetail,
  rawMaterialProcessList,
  productionDetail,
  replenishYarnList,
  orderMaterialSotckDetail,
  rawMaterialGoStockDetail,
  rawMaterialOutStockDetail,
  weaveDetail,
  rawMaterialGoStock,
  rawMaterialOutStock,
  materialSurplusPush,
  surplusDelete,
  notifySave,
  rawMaterialGoStockDelete,
  rawMaterialOutStockDelete
} from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: {
        inStock: 'inStock',
        outStock: 'outStock'
      },
      showMsg: {
        inStock: false,
        outStock: false
      },
      msgUrl: {
        inStock: '',
        outStock: ''
      },
      msgFlag: {
        inStock: window.localStorage.getItem('inStock') ? JSON.parse(window.localStorage.getItem('inStock')).msgFlag : false,
        outStock: window.localStorage.getItem('outStock') ? JSON.parse(window.localStorage.getItem('outStock')).msgFlag : false
      },
      content: {
        inStock: '',
        outStock: ''
      },
      loading: true,
      type: 0,
      orderInfo: {
        order_code: '',
        order_time: '',
        client_name: '',
        group_name: ''
      },
      tabInfo: 'default',
      productList: [],
      materialList: [],
      orderList: [],
      processList: [],
      bushaList: [],
      goStockInfo: [],
      outStockInfo: [],
      goStockLog: [],
      goStockLogFlag: false,
      outStockLog: [],
      outStockLogFlag: false,
      materialActive: 0,
      outStockActive: 0,
      inFlag: true,
      outFlag: true,
      surplus: [] // 原料结余
    }
  },
  filters: {
    fixedFilter (item) {
      if (item) {
        return Number(item).toFixed(1)
      } else {
        return 0
      }
    }
  },
  watch: {
    materialActive (val, oldVal) {
      if (oldVal !== val) {
        this.inFlag = true
        this.materialList[oldVal].need.forEach((item) => {
          item.stockFlag = false
          item.stock = ''
        })
      }
    },
    outStockActive (val, oldVal) {
      if (oldVal !== val) {
        this.outFlag = true
        this.outStockInfo[oldVal].info.forEach((item) => {
          item.info.forEach((item) => {
            item.stockFlag = false
            item.stock = ''
          })
        })
      }
    }
  },
  methods: {
    saveInStock (data) {
      this.msgFlag.inStock = data.msgFlag
    },
    saveOutStock (data) {
      this.msgFlag.outStock = data.msgFlag
    },
    sendMsg (which) {
      let data = JSON.parse(window.localStorage.getItem(this.localName[which]))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: '订单' + this.orderInfo.order_code + '有一条<span style="color:#1A95FF">物料' + (which === 'inStock' ? '入库' : '出库') + '</span>信息',
        router_url: this.$route.fullPath,
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {

        } else {
          this.$message.error(res.data.message)
        }
      })
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
    reload () {
      setTimeout(() => {
        window.location.reload()
      }, 800)
    },
    charCodeLength (item) {
      if (!item) {
        return 0
      }
      item = String(item)
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
    // 入库操作
    stockIn (stockNum, index) {
      this.loading = true
      let material = this.materialList[this.materialActive]
      let today = new Date()
      if (!Number(stockNum) || Number(stockNum) < 0) {
        this.$message.error('请输入正确数值')
      } else {
        if (stockNum > (material.need[index].value - material.need[index].inNum)) {
          this.$confirm('入库数量大于待入库数量，是否确认入库?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rawMaterialGoStock({
              data: [{
                company_id: window.sessionStorage.getItem('company_id'),
                user_id: window.sessionStorage.getItem('user_id'),
                order_id: this.$route.params.id,
                material_name: material.material,
                vat_code: 'vat-null',
                color_code: material.need[index].name,
                number: 0,
                weight: Number(stockNum),
                complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
                desc: '',
                attribute: '',
                type: (this.type === '0' ? 1 : 2),
                stock_id: 0
              }]
            }).then((res) => {
              if (res.data.status) {
                material.need[index].inNum += Number(stockNum)
                material.need[index].stockFlag = false
                material.need[index].stock = ''
                this.$message.success('入库成功')
                if (this.msgFlag.inStock) {
                  this.sendMsg('inStock')
                }
              } else {
                this.$message.error(res.data.message)
              }
              this.loading = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消入库'
            })
            this.loading = false
          })
        } else {
          rawMaterialGoStock({
            data: [{
              company_id: window.sessionStorage.getItem('company_id'),
              user_id: window.sessionStorage.getItem('user_id'),
              order_id: this.$route.params.id,
              material_name: material.material,
              vat_code: 'vat-null',
              color_code: material.need[index].name,
              number: 0,
              weight: Number(stockNum),
              complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
              desc: '',
              attribute: '',
              type: (this.type === '0' ? 1 : 2),
              stock_id: 0
            }]
          }).then((res) => {
            if (res.data.status) {
              material.need[index].inNum += Number(stockNum)
              material.need[index].stockFlag = false
              material.need[index].stock = ''
              this.$message.success('入库成功')
              if (this.msgFlag.inStock) {
                this.sendMsg('inStock')
              }
            } else {
              this.$message.error(res.data.message)
            }
            this.loading = false
          })
        }
      }
    },
    stockOut (stockNum, indexMaterial, indexColor) {
      this.loading = true
      if (!Number(stockNum) || Number(stockNum) < 0) {
        this.$message.error('请输入正确数值')
      } else {
        let company = this.outStockInfo[this.outStockActive]
        let material = company.info[indexMaterial]
        let color = material.info[indexColor]
        let today = new Date()
        if (stockNum > (color.total_weight - color.out_weight)) {
          this.$confirm('出库数量大于待出库数量，是否确认出库?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rawMaterialOutStock({
              data: [{
                company_id: window.sessionStorage.getItem('company_id'),
                order_id: this.$route.params.id,
                material_name: material.material_name,
                user_id: window.sessionStorage.getItem('user_id'),
                vat_code: 'vat-null',
                color_code: color.color_name,
                number: 0,
                client_id: color.info[0].client_id,
                weight: stockNum,
                complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
                desc: '',
                stock_id: 0,
                type: (this.type === '0' ? 1 : 2)
              }]
            }).then((res) => {
              if (res.data.status) {
                color.out_weight += Number(stockNum)
                color.stockFlag = false
                color.stock = ''
                this.$message.success('出库成功')
                if (this.msgFlag.outStock) {
                  this.sendMsg('outStock')
                }
              } else {
                this.$message.error(res.data.message)
              }
              this.loading = false
            })
          }).catch(() => {
            this.loading = true
            this.$message({
              type: 'info',
              message: '已取消出库'
            })
            this.loading = false
          })
        } else {
          rawMaterialOutStock({
            data: [{
              company_id: window.sessionStorage.getItem('company_id'),
              order_id: this.$route.params.id,
              material_name: material.material_name,
              user_id: window.sessionStorage.getItem('user_id'),
              vat_code: 'vat-null',
              color_code: color.color_name,
              number: 0,
              client_id: color.info[0].client_id,
              weight: stockNum,
              complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
              desc: '',
              stock_id: 0,
              type: (this.type === '0' ? 1 : 2)
            }]
          }).then((res) => {
            if (res.data.status) {
              color.out_weight += Number(stockNum)
              color.stockFlag = false
              color.stock = ''
              this.$message.success('出库成功')
              if (this.msgFlag.outStock) {
                this.sendMsg('outStock')
              }
            } else {
              this.$message.error(res.data.message)
            }
            this.loading = false
          })
        }
      }
    },
    // 结余入库操作
    stockSurplus (item) {
      let today = new Date()
      materialSurplusPush({
        data: [{
          type: this.type === '0' ? 1 : 2,
          company_id: Number(window.sessionStorage.getItem('company_id')),
          user_id: window.sessionStorage.getItem('user_id'),
          order_id: Number(this.$route.params.id),
          material_name: item.material_name,
          vat_code: 'vat-null',
          color_code: item.material_color,
          number: null,
          weight: Number(item.stock),
          complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
          desc: '',
          attribute: null,
          stock_id: 1
        }]
      }).then((res) => {
        if (res.data.status) {
          this.$message.success('入库成功')
          item.total_weight -= Number(item.stock)
          item.stock = ''
          item.stockFlag = false
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 原料结余清空操作
    surplusDelete (item) {
      this.$confirm('此操作将导致该物料的结余数值清零"，无法继续入库, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        surplusDelete({
          id: item.id
        }).then(res => {
          if (res.data.status) {
            item.total_weight = 0
            this.$message({
              type: 'success',
              message: '清空成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清空'
        })
      })
    },
    addOperation (which) {
      if (which === 'in') {
        this.inFlag = false
        this.materialList[this.materialActive].need.forEach((item) => {
          item.stockFlag = true
          item.stock = (Number(item.value) - Number(item.inNum)).toFixed(1)
        })
      } else {
        this.outFlag = false
        this.outStockInfo[this.outStockActive].info.forEach((item) => {
          item.info.forEach((item) => {
            item.stockFlag = true
            item.stock = (Number(item.total_weight) - Number(item.out_weight)).toFixed(1)
          })
        })
      }
    },
    saveOperation (which) {
      this.loading = true
      let today = new Date()
      if (which === 'in') {
        let material = this.materialList[this.materialActive]
        let need = material.need.filter(item => item.stockFlag)
        let data = need.map((item) => {
          return {
            company_id: window.sessionStorage.getItem('company_id'),
            user_id: window.sessionStorage.getItem('user_id'),
            order_id: this.$route.params.id,
            material_name: material.material,
            vat_code: 'vat-null',
            color_code: item.name,
            number: 0,
            weight: item.stock,
            complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
            desc: '',
            attribute: '',
            type: (this.type === '0' ? 1 : 2),
            stock_id: 0
          }
        })
        rawMaterialGoStock({
          data: data
        }).then((res) => {
          this.inFlag = true
          if (res.data.status) {
            material.need.forEach((item) => {
              item.inNum += Number(item.stock)
              item.stockFlag = false
              item.stock = ''
            })
            this.$message.success('入库成功')
            if (this.msgFlag.inStock) {
              this.sendMsg('inStock')
            }
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      } else {
        let company = this.outStockInfo[this.outStockActive]
        let data = []
        company.info.forEach((itemMat) => {
          itemMat.info.forEach((itemColor) => {
            if (itemColor.stockFlag) {
              data.push({
                company_id: window.sessionStorage.getItem('company_id'),
                order_id: this.$route.params.id,
                material_name: itemMat.material_name,
                user_id: window.sessionStorage.getItem('user_id'),
                vat_code: 'vat-null',
                color_code: itemColor.color_name,
                number: 0,
                client_id: itemColor.info[0].client_id,
                weight: itemColor.stock,
                complete_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
                desc: '',
                stock_id: 0,
                type: (this.type === '0' ? 1 : 2)
              })
            }
          })
        })
        rawMaterialOutStock({
          data: data
        }).then((res) => {
          if (res.data.status) {
            this.outFlag = true
            company.info.forEach((itemMat) => {
              itemMat.info.forEach((itemColor) => {
                itemColor.stockFlag = false
                itemColor.out_weight += Number(itemColor.stock)
                itemColor.stock = ''
              })
            })
            this.$message.success('出库成功')
            if (this.msgFlag.outStock) {
              this.sendMsg('outStock')
            }
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      }
    },
    cancleOperation (which) {
      if (which === 'in') {
        this.inFlag = true
        this.materialList[this.materialActive].need.forEach((item) => {
          item.stockFlag = false
          item.stock = ''
        })
      } else {
        this.outFlag = true
        this.outStockInfo[this.outStockActive].info.forEach((item) => {
          item.info.forEach((item) => {
            item.stockFlag = false
            item.stock = ''
          })
        })
      }
    },
    // 删除日志
    deleteStock (id, which) {
      if (which === 'in') {
        this.$confirm('此操作将永久删除该入库信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rawMaterialGoStockDelete({
            id: id
          }).then((res) => {
            if (res.data.status) {
              this.$message.success('删除成功')
              this.reload()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$confirm('此操作将永久删除该出库信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rawMaterialOutStockDelete({
            id: id
          }).then((res) => {
            if (res.data.status) {
              this.$message.success('删除成功')
              this.reload()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  },
  mounted () {
    this.type = this.$route.params.type
    Promise.all([
      rawMaterialOrderInit({
        order_id: this.$route.params.id
      }),
      rawMaterialOrderList({
        order_id: this.$route.params.id
      }),
      orderDetail({
        id: this.$route.params.id
      }),
      rawMaterialProcessList({
        order_id: this.$route.params.id
      }),
      productionDetail({
        order_id: this.$route.params.id
      }),
      replenishYarnList({
        order_id: this.$route.params.id,
        type: parseInt(this.type) + 1
      }),
      orderMaterialSotckDetail({
        order_id: this.$route.params.id
      }),
      rawMaterialGoStockDetail({
        order_id: this.$route.params.id
      }),
      rawMaterialOutStockDetail({
        order_id: this.$route.params.id
      }),
      weaveDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      let info = res[0].data.data.material_info || {}
      let stock = res[0].data.data.stock_info || []
      let materialInfo = res[1].data || []
      this.orderInfo = res[2].data.data || []
      let processInfo = res[3].data.data || []
      let productPlan = res[4].data.data.product_plan // 获取生产计划单所有产品的配料单
      Object.keys(this.orderInfo.order_batch).forEach((key) => {
        this.orderInfo.order_batch[key].forEach((itemPro) => {
          // 0代表没有计划单,1代表不完整,2代表完整
          let json = {
            product_code: itemPro.product_code,
            type: itemPro.category_info.category_name + (itemPro.category_info.type_name ? '/' + itemPro.category_info.type_name : '') + (itemPro.category_info.style_name ? '/' + itemPro.category_info.type_name : '') + (itemPro.category_info.flower_name ? '/' + itemPro.category_info.flower_name : ''),
            product_size: itemPro.size,
            product_color: itemPro.color,
            number: itemPro.numbers,
            product_id: itemPro.product_id
          }
          if (productPlan[itemPro.product_code]) {
            if (productPlan[itemPro.product_code].find(a => ((a.size === itemPro.size) && (a.color_match_name === itemPro.color)))) {
              json.state = 2
            } else {
              json.state = 1
              json.product_plan_id = productPlan[itemPro.product_code][0].product_plan_id
            }
          } else {
            json.state = 0
          }
          this.productList.push(json)
        })
      })
      for (let prop in info) {
        for (let value in info[prop]) {
          if (value !== 'total_number' && value !== 'type' && value !== 'unit') {
            if (info[prop].type === Number(this.type)) {
              let flag = this.materialList.find(val => val.material === prop)
              if (!flag) {
                this.materialList.push({
                  material: prop,
                  total_weight: (info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value],
                  unit: (info[prop].unit === '克' || info[prop].unit === 'g') ? 'kg' : info[prop].unit === '千克' ? 'kg' : info[prop].unit,
                  need: [{
                    name: value,
                    value: (info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value],
                    stock: '', // 初始化入库值
                    inNum: 0,
                    stockFlag: false
                  }]
                })
              } else {
                flag.total_weight = Number(flag.total_weight) + Number((info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value])
                let arr = flag.need.find(val => val.name === value)
                if (!arr) {
                  flag.need.push({
                    name: value,
                    value: (info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value],
                    stock: '',
                    inNum: 0,
                    stockFlag: false
                  })
                } else {
                  arr.value = Number(arr.value) + Number((info[prop].unit === '克' || info[prop].unit === 'g') ? Math.ceil(info[prop][value]) / 1000 : info[prop][value])
                }
              }
            }
          }
        }
      }
      materialInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          // 初始化订购信息
          let flag = this.orderList.find(val => val.company === item.client_name)
          if (!flag) {
            this.orderList.push({
              company: (item.client_name ? item.client_name : '仓库'),
              where: (item.type_source === 1 ? '调取' : '订购'),
              total_price: Math.ceil(item.price * item.weight),
              create_time: item.complete_time.split(' ')[0],
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
          // 已订购/调取数量累加
          let finded = this.materialList.find(val => val.material === item.material_name)
          if (item.type_source === 1) {
            // 已调取数量累加
            finded.stock_weight = finded.stock_weight ? (finded.stock_weight + item.weight) : item.weight
          } else {
            // 已订购数量累加
            finded.order_weight = finded.order_weight ? (finded.order_weight + item.weight) : item.weight
          }
        }
      })
      // 物料库存数据整理
      this.stockList = this.jsonMerge(stock.filter(item => item.type === parseInt(this.type) + 1), ['material_name'])
      // 初始化加工信息
      processInfo.forEach(item => {
        item.material_info = JSON.parse(item.material_info)
        item.material_info.forEach(value => {
          if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
            // 初始化加工信息
            let flag = this.processList.find(val => val.process_type === item.process_type)
            if (!flag) {
              this.processList.push({
                process_type: item.process_type,
                companys: [{
                  company: item.client_name,
                  price: item.price,
                  create_time: item.complete_time.split(' ')[0],
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
                  price: item.price,
                  create_time: item.complete_time.split(' ')[0],
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
          }
        })
      })
      this.processList.forEach(item => {
        item.companys.forEach(itemCom => {
          let weight = 0
          itemCom.materials.forEach(itemMater => {
            itemMater.colors.forEach(itemColor => {
              weight += Number(itemColor.value)
            })
          })
          itemCom.total_price = weight * itemCom.price
        })
      })
      // 入库信息处理
      let goStockInfo = res[7].data.data
      goStockInfo.forEach((item) => {
        let finded = this.materialList.find((itemFind) => itemFind.material === item.material_name)
        if (finded) {
          finded.need.forEach((need) => {
            if (need.name === item.color_code) {
              need.inNum += Number(item.total_weight)
            }
          })
        }
        this.goStockLog.unshift(item)
      })
      // 出库信息初始化 配料单信息 织造分配信息 生产计划单三张单子信息整合
      let ZZFP = res[9].data.data.map((item) => {
        return {
          client_id: item.client_id,
          client_name: item.client_name,
          product_code: item.product_info.product_code,
          color: item.color,
          size: item.size,
          number: item.number,
          yarn: []
        }
      })// 织造分配信息
      // productPlan = res[4].data.data.productPlan // 所有产品配料单(可能不全)
      let productSunhao = res[4].data.data.production_detail.product_info // 所有产品的损耗
      // 根据织造分配和配料单和损耗值统计出库信息
      ZZFP.forEach((itemZZFP) => {
        const sunhao = (productSunhao.find((itemFind) => itemFind.product_code === itemZZFP.product_code).production_sunhao / 100 + 1)
        if (productPlan[itemZZFP.product_code]) {
          productPlan[itemZZFP.product_code].forEach((itemFind) => {
            if (itemFind.color_match_name === itemZZFP.color && itemFind.size === itemZZFP.size && itemFind.type === Number(this.type)) {
              if (this.type === '0') {
                itemZZFP.yarn.push({
                  unit: 'kg',
                  material_name: itemFind.material_name,
                  color_name: itemFind.color_name,
                  number: itemFind.number * sunhao * itemZZFP.number / 1000 // 配料单纱线质量*损耗*分配产品数量除以1000得到千克值
                })
              } else {
                itemZZFP.yarn.push({
                  unit: itemFind.unit,
                  material_name: itemFind.material_name,
                  color_name: itemFind.color_name,
                  number: itemFind.number * sunhao * itemZZFP.number // 配料单辅料(个数)*损耗*分配产品数量
                })
              }
            }
          })
        }
      })
      // console.log(ZZFP) 建议看到这一步的数据
      // 先展开，后合并信息
      let flatZZFP = []
      ZZFP.forEach((itemZZFP) => {
        itemZZFP.yarn.forEach((itemYarn) => {
          flatZZFP.push({
            client_name: itemZZFP.client_name,
            material_name: itemYarn.material_name,
            color_name: itemYarn.color_name,
            number: itemYarn.number,
            unit: itemYarn.unit,
            client_id: itemZZFP.client_id
          })
        })
      })
      let mergeZZFP = this.jsonMerge(flatZZFP, ['client_name', 'material_name', 'color_name'])
      // console.log(flatZZFP)
      // console.log(mergeZZFP)
      // 配料单信息 织造分配信息 生产计划单三张单子信息整合完毕
      // 计算下每种颜色的纱线
      mergeZZFP.forEach((item) => {
        item.info.forEach((item) => {
          item.info.forEach((item) => {
            item.total_weight = item.info.reduce((total, current) => {
              return total + Number(current.number)
            }, 0)
            item.unit = item.info[0].unit // 初始化单位
            item.out_weight = 0 // 初始化出库数量
            item.stock = ''
            item.stockFlag = false
          })
        })
      })
      // 已出库信息合并
      this.outStockLog = res[8].data.data
      this.outStockLog.forEach((item) => {
        let finded = mergeZZFP.find((itemFind) => itemFind.client_name === item.client_name).info.find((itemFind) => itemFind.material_name === item.material_name).info.find((itemFind) => itemFind.color_name === item.color_code)
        finded.out_weight += item.weight
      })
      this.outStockInfo = mergeZZFP
      // 补纱信息
      this.bushaList = res[5].data.data.filter(item => ((item.type - 1) === Number(this.type))).map((item) => {
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
      // 原料结余
      // let surplus = res[6].data.data.filter(res => (res.type === (this.type === '0' ? 1 : 2) || res.type === null))
      // surplus.forEach((item) => {
      //   item.stock = ''
      //   item.stockFlag = false
      // })
      // this.surplus = surplus
      this.loading = false
    })
  }
}
</script>
<style lang="less">
#rawMaterialOrderDetail {
  .el-input--suffix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .shadeSelf {
    .el-input__icon {
      line-height: 32px;
    }
    .el-select {
      width: 100%;
    }
  }
  .el-input__inner {
    height: 32px !important;
    line-height: 32px;
  }
  .el-switch__label {
    color: #666;
  }
  .submitBtn {
    cursor: pointer;
    color: #666;
    &:hover {
      color: #1a95ff;
    }
  }
}
</style>
<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
#rawMaterialOrderDetail {
  .tabCtn {
    width: 100%;
    .tab {
      display: inline-block;
      line-height: 40px;
      border: 1px solid #e9e9e9;
      padding: 0 12px;
      border-right: 0;
      cursor: pointer;
      margin-bottom: 12px;
      &:nth-last-child(1) {
        border-right: 1px solid #e9e9e9;
      }
      &.active {
        border-bottom: 0;
        color: #1a95ff;
      }
      &:hover {
        color: #1a95ff;
      }
    }
  }
  .tablesCtn {
    .addLine {
      line-height: 40px;
      color: #1a95ff;
      span {
        cursor: pointer;
        &.save {
          &:hover {
            background: #67c23a;
            color: #fff;
          }
        }
        &.add {
          &:hover {
            outline: 2px dotted #1a95ff;
          }
        }
        &.cancle {
          &:hover {
            background: #e9e9e9;
            color: #666;
          }
        }
        &.set {
          &:hover {
            background: #1a95ff;
            color: #fff;
          }
        }
      }
      .el-icon {
        line-height: 40px;
        margin-right: 5px;
      }
    }
  }
  .buyInfo {
    width: 1202px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    & > .buyFrom {
      position: relative;
      margin-top: 30px;
      background-color: #fafafa;
      width: 392px;
      height: 416px;
      overflow-y: scroll;
      padding: 25px 25px 25px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin-left: 13px;
      &:nth-child(1) {
        margin-left: 0px;
      }
      & > .el-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          background-color: @normalBlue;
          color: #fff;
        }
      }
      & > li {
        position: relative;
        height: auto;
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        &.col {
          flex-direction: column;
          align-items: flex-start;
        }
        &:first-child {
          margin: 0;
        }
        & > span {
          display: inline-block;
          width: 5em;
          text-align: right;
          font-size: 14px;
        }
        & > .el-select {
          margin: 0 0 0 15px;
          width: 243px;
        }
        & > .el-input {
          width: 193px;
          margin: 0 0 0 15px;
        }
        & > div {
          margin-top: 20px;
          display: flex;
          align-items: center;
          &:first-child {
            margin: 0;
          }
          & > span {
            width: 5em;
            text-align: right;
            font-size: 14px;
          }
          & > div {
            display: flex;
            width: 243px;
            margin: 0 0 0 15px;
            & > strong {
              color: #ddd;
              font-weight: 300 !important;
            }
            & > .el-select {
              flex: 1;
            }
            & > .el-input {
              flex: 1;
            }
          }
        }
        & > i {
          display: inline-block;
          width: 50px;
          text-align: center;
          font-style: normal;
          border-top: 1px solid rgb(230, 230, 230);
          border-bottom: 1px solid rgb(230, 230, 230);
          border-right: 1px solid rgb(230, 230, 230);
          height: 32px;
          box-sizing: border-box;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: 14px;
          line-height: 30px;
          background-color: rgb(245, 247, 250);
        }
        em {
          position: absolute;
          right: -10px;
          line-height: 40px;
          cursor: pointer;
          &:hover {
            color: @normalBlue;
          }
        }
      }
    }
    .addBtn {
      background: #fff;
      outline: 1px dotted #1a95ff;
      background: #f7fbff;
      color: #1a95ff;
      text-align: center;
      line-height: 416px;
      padding: 0;
      cursor: pointer;
    }
  }
  .shadeSelf {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .main {
      position: absolute;
      width: 520px;
      min-height: 420px;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
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
        background: @normalBlue;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: @hoverBlue;
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
        font-size: @fontSubhead;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 10px 20px 10px 20px;
        position: relative;
        font-size: 14px;
        padding-left: 5em;
        height: 32px;
        line-height: 32px;
        color: @fontNormal;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 5em;
          height: 32px;
          color: #666;
          em {
            line-height: 32px;
            color: @error;
            vertical-align: text-top;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          height: 32px;
          line-height: 32px;
          margin-left: 15px;
          position: relative;
          padding-right: 20px;
          .deleteIcon {
            position: absolute;
            line-height: 32px;
            top: 0;
            bottom: 0;
            right: 0;
            color: #666;
            cursor: pointer;
            font-size: 14px;
            &:hover {
              color: #1a95ff;
              font-weight: 500;
            }
          }
        }
      }
      .btnCtn {
        margin-bottom: 40px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
      .warning {
        font-size: 12px;
        color: #f56c6c;
      }
    }
  }
}
</style>
