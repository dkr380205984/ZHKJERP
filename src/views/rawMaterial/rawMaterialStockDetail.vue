<template>
  <div id="rawMaterialStockDetail"
    v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原' : '辅'}}料出入库详情</h2>
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
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>计划{{type === '0' ? '原' : '辅'}}料</span>
                  <span class="flex2">
                    <span>{{type === '0' ? '颜色' : '属性'}}</span>
                    <span>计划数量</span>
                  </span>
                  <span>已订购</span>
                  <span>已加工</span>
                  <span>已入库</span>
                  <span>已出库</span>
                </li>
                <li v-if="materialList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in materialList"
                  :key="key">
                  <span class="tableRow">{{item.material}}</span>
                  <span class="flex2 col tableRow">
                    <span v-for="(val,ind) in item.need"
                      :key="ind"
                      class="tableColumn">
                      <span class="tableRow">{{val.name}}</span>
                      <span class="tableRow">{{val.value|fixedFilter}}{{item.unit}}</span>
                    </span>
                  </span>
                  <span class="tableRow">{{(item.order_number ? item.order_number : 0)|fixedFilter}}{{item.unit}}</span>
                  <span class="tableRow">{{(item.process_number ? item.process_number : 0)|fixedFilter}}{{item.unit}}</span>
                  <span class="tableRow">{{(item.goStock_number ? item.goStock_number : 0)|fixedFilter}}{{item.unit}}</span>
                  <span class="tableRow">{{(item.outStock_number ? item.outStock_number : 0)|fixedFilter}}{{item.unit}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料入库信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                  <span class="flex4">
                    <span>{{type === '0' ? '颜色' : '属性'}}</span>
                    <span class="flex3">
                      <span>批/缸号</span>
                      <span>数量</span>
                      <!-- <span>包装属性</span> -->
                    </span>
                  </span>
                  <span>已入库</span>
                  <span>待入库</span>
                </li>
                <li v-if="goStockList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in goStockList"
                  :key="key">
                  <span class="tableRow">{{item.material}}</span>
                  <span class="tableRow flex4 col">
                    <span v-for="(val,ind) in item.info"
                      :key="ind"
                      class="tableColumn">
                      <span class="tableRow">{{val.color}}</span>
                      <span class="tableRow flex3 col">
                        <span v-for="(value,index) in val.list"
                          :key="index"
                          class="tableColumn">
                          <span class="tableRow">{{value.dyelot_number === 'vat_null' ? '默认' : value.dyelot_number}}</span>
                          <span class="tableRow">{{value.value|fixedFilter}}{{item.unit}}</span>
                          <!-- <span class="tableRow">{{value.attr ? value.attr : '无'}}</span> -->
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="tableRow">{{item.goStock_number|fixedFilter}}{{item.unit}}</span>
                  <span class="tableRow">{{(item.order_number - item.goStock_number)|fixedFilter}}{{item.unit}}</span>
                </li>
                <div class="logList"
                  @click="goStockLogFlag = !goStockLogFlag">{{ goStockLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="goStockLogFlag">
                <div>
                  <li>
                    <span class="flexBig">入库日期</span>
                    <span class="flexBig">{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span>{{type === '0' ? '颜色' : '属性'}}</span>
                    <span>批/缸号</span>
                    <!-- <span>包装属性</span> -->
                    <span>入库数量</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                  </li>
                </div>
                <div>
                  <li v-if="goStockLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in goStockLog"
                    :key="item.time + key">
                    <span class="flexBig">{{item.time}}</span>
                    <span class="flexBig">{{item.material}}</span>
                    <span>{{item.color}}</span>
                    <span>{{item.dyelot_number === 'vat_null' ? '默认' : item.dyelot_number}}</span>
                    <!-- <span>{{item.attr ? item.attr : '无'}}</span> -->
                    <span>{{item.goStock_number|fixedFilter}}{{item.unit}}</span>
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
                <div :class="{'disabled':stockFlag === 0}"
                  @click="open('goStock',$route.params.id,stockFlag)">
                  <img class="icon"
                    v-if="stockFlag !== 0"
                    src="@/assets/image/icon/goStock.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/goStock_disabled.png">
                  <span>去入库</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料出库信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                  <span class="flex6">
                    <span class="flex16">出库单位</span>
                    <span class="flex44">
                      <span>颜色</span>
                      <span>
                        <span>批/缸号</span>
                      </span>
                      <span>已出库</span>
                      <span>待出库</span>
                    </span>
                  </span>
                </li>
                <li v-if="outStockInfo.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in outStockInfo"
                  :key="key">
                  <span class="tableRow">{{item.material}}</span>
                  <span class="tableRow flex6 col">
                    <span v-for="(val,ind) in item.client_list"
                      :key="ind"
                      class="tableColumn">
                      <span class="tableRow flex16">{{val.client_name}}</span>
                      <span class="tableRow flex44 col">
                        <span v-for="(value,index) in val.color_list"
                          :key='index'
                          class="tableColumn">
                          <span class="tableRow">{{value.color}}</span>
                          <span class="tableRow col">
                            <span v-for="(itemVat,keyVat) in value.vat_list"
                              :key="keyVat"
                              class="tableColumn">
                              <span class="tableRow">{{itemVat === 'vat_null' ? '默认' : itemVat}}</span>
                            </span>
                          </span>
                          <span class="tableRow">{{value.outStock_number|fixedFilter}}{{item.unit}}</span>
                          <span class="tableRow">{{(value.plan_number - value.outStock_number)|fixedFilter}}{{item.unit}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
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
                    <span>批/缸号</span>
                    <span>出库数量</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                  </li>
                </div>
                <div>
                  <li v-if="outStockLog.length === 0">暂无信息</li>
                  <li v-for="(item,key) in outStockLog"
                    :key="item.time + key">
                    <span class="flexBig">{{item.time}}</span>
                    <span class="flexBig">{{item.material}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.color}}</span>
                    <span>{{item.dyelot_number}}</span>
                    <span>{{item.outStock_number|fixedFilter}}{{item.unit}}</span>
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
                <div :class="{'disabled':stockFlag === 0}"
                  @click="open('outStock',$route.params.id,stockFlag)">
                  <img class="icon"
                    v-if="stockFlag !== 0"
                    src="@/assets/image/icon/outStock.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/outStock_disabled.png">
                  <span>去出库</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料结余</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="log">
                <div>
                  <li>
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span>{{type === '0' ? '颜色' : '属性'}}</span>
                    <span>缸号</span>
                    <span>结余</span>
                    <span>操作</span>
                  </li>
                </div>
                <div v-if="surplus.length === 0">
                  <li>暂无信息</li>
                </div>
                <div>
                  <li v-for="(val,ind) in surplus"
                    :key="ind">
                    <span>{{val.material_name}}</span>
                    <span>{{val.material_color}}</span>
                    <span>{{val.vat_code}}</span>
                    <span>{{val.total_weight|fixedFilter}}{{val.unit}}</span>
                    <span>
                      <span @click="(Number(val.total_weight) <= 0) ? '' : showShadeInfo(val)"
                        class="important"
                        :style="{'color':(Number(val.total_weight) <= 0) ? '#999' : false,'cursor':(Number(val.total_weight) <= 0) ? 'not-allowed' : false}">存入仓库</span>
                      <span class="important"
                        style="margin-left:20px;"
                        @click="surplusDelete(val)">清空</span>
                    </span>
                  </li>
                </div>
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
        <div class="title">结余存入</div>
        <div class="inputCtn">
          <span class="label"><em>*</em>{{type === '0' ? '原' : '辅'}}料名称:</span>
          <div class="elCtn">
            {{surplusGoStockInfo.material_name}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>原料颜色:</span>
          <div class="elCtn">
            {{surplusGoStockInfo.material_color}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">缸号:</span>
          <div class="elCtn">
            {{surplusGoStockInfo.vat_code ==='vat_null' ? '默认' : surplusGoStockInfo.vat_code}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">结余数量:</span>
          <div class="elCtn">
            {{surplusGoStockInfo.total_weight}}{{surplusGoStockInfo.unit}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>存入数量:</span>
          <div class="elCtn">
            <el-input v-model="surplusGoStockInfo.number"
              placeholder="请输入数量">
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">备注:</span>
          <div class="elCtn">
            <el-input v-model="surplusGoStockInfo.remark"
              placeholder="请输入其他信息"></el-input>
          </div>
        </div>
        <div class="btnCtn">
          <div class="okBtn"
            @click="goStock()">提交</div>
          <div class="cancleBtn"
            @click="showShade=false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, rawMaterialOrderInit, rawMaterialGoStockDetail, rawMaterialOutStockDetail, weaveDetail, productionDetail, materialSurplusPush, orderMaterialSotckDetail, surplusDelete } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      goStockLogFlag: false,
      goStockLog: [],
      outStockLogFlag: false,
      stockFlag: 0,
      outStockLog: [],
      materialList: [],
      goStockList: [],
      outStockInfo: [],
      productionList: [],
      surplus: [],
      showShade: false,
      updateInfo: {},
      surplusGoStockInfo: {}
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
    showShadeInfo (item) {
      this.surplusGoStockInfo = item
      console.log(this.surplusGoStockInfo)
      this.showShade = true
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
    open (where, id, flag) {
      if (where === 'goStock') {
        if (flag !== 0) {
          this.$router.push('/index/rawMaterialStock/' + id + '/' + this.type)
        } else {
          let str = this.type === '0' ? '原' : '辅'
          this.$message({
            message: '请先订购' + str + '料',
            type: 'error'
          })
        }
      } else if (where === 'outStock') {
        if (flag !== 0) {
          this.$router.push('/index/rawMaterialOutStock/' + id + '/' + this.type)
        } else {
          let str = this.type === '0' ? '原' : '辅'
          this.$message({
            message: '请先订购' + str + '料',
            type: 'error'
          })
        }
      }
    },
    goStock () {
      if (Number(this.surplusGoStockInfo.total_weight) < Number(this.surplusGoStockInfo.number)) {
        this.$message({
          type: 'error',
          message: '数量超出结余,请重新输入!'
        })
      } else if (Number(this.surplusGoStockInfo.total_weight) <= 0) {
        this.$message({
          type: 'error',
          message: '该物料无结余，无法操作'
        })
      } else {
        console.log(this.surplusGoStockInfo)
        let obj = {}
        obj.type = this.type === '0' ? 1 : 2
        obj.company_id = Number(window.sessionStorage.getItem('company_id'))
        obj.user_id = window.sessionStorage.getItem('user_id')
        obj.order_id = Number(this.$route.params.id)
        obj.material_name = this.surplusGoStockInfo.material_name
        obj.vat_code = this.surplusGoStockInfo.vat_code
        obj.color_code = this.surplusGoStockInfo.material_color
        obj.number = null
        obj.total_weight = Number(this.surplusGoStockInfo.number)
        obj.complete_time = null
        obj.desc = this.surplusGoStockInfo.remark
        obj.attribute = null
        obj.stock_id = this.surplusGoStockInfo.stock_id
        console.log(obj)
        materialSurplusPush({
          data: [obj]
        }).then(res => {
          if (res.data.status) {
            this.$message({
              message: '添加成功。',
              type: 'success'
            })
          } else if (!res.data.status) {
            let str = res.data.message
            this.$message({
              message: str,
              type: 'error'
            })
          }
          orderMaterialSotckDetail({
            order_id: this.$route.params.id
          }).then(data => {
            this.surplus = data.data.data.filter(key => (key.type === (this.type === '0' ? 1 : 2) || key.type === null))
          })
        })
        this.showShade = false
      }
    },
    surplusDelete (item) {
      this.$confirm('此操作将永久清空"' + item.material_name + '"，无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        surplusDelete({
          id: item.id
        }).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          orderMaterialSotckDetail({
            order_id: this.$route.params.id
          }).then(res => {
            this.surplus = res.data.data.filter(res => (res.type === (this.type === '0' ? 1 : 2) || res.type === null))
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.type = this.$route.params.type
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }),
      rawMaterialOrderInit({
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
      }),
      productionDetail({
        order_id: this.$route.params.id
      }),
      orderMaterialSotckDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      this.order_code = res[0].data.data.order_code
      this.client_name = res[0].data.data.client_name
      this.order_time = res[0].data.data.order_time
      this.group_name = res[0].data.data.group_name
      // 物料信息初始化
      let materialInfo = res[1].data.data
      for (let prop in materialInfo.material_info) {
        for (let value in materialInfo.material_info[prop]) {
          if (value !== 'total_number' && value !== 'type' && value !== 'unit') {
            if (materialInfo.material_info[prop].type === Number(this.type)) {
              let flag = this.materialList.find(val => val.material === prop)
              if (!flag) {
                this.materialList.push({
                  material: prop,
                  unit: (materialInfo.material_info[prop].unit === '克' || materialInfo.material_info[prop].unit === 'g') ? 'kg' : materialInfo.material_info[prop].unit === '千克' ? 'kg' : materialInfo.material_info[prop].unit,
                  need: [{
                    name: value,
                    value: (materialInfo.material_info[prop].unit === '克' || materialInfo.material_info[prop].unit === 'g') ? Math.ceil(materialInfo.material_info[prop][value]) / 1000 : materialInfo.material_info[prop][value]
                  }]
                })
              } else {
                let arr = flag.need.find(val => val.name === value)
                if (!arr) {
                  flag.need.push({
                    name: value,
                    value: (materialInfo.material_info[prop].unit === '克' || materialInfo.material_info[prop].unit === 'g') ? Math.ceil(materialInfo.material_info[prop][value]) / 1000 : materialInfo.material_info[prop][value]
                  })
                } else {
                  arr.value = Number(arr.value) + Number((materialInfo.material_info[prop].unit === '克' || materialInfo.material_info[prop].unit === 'g') ? Math.ceil(materialInfo.material_info[prop][value]) / 1000 : materialInfo.material_info[prop][value])
                }
              }
            }
          }
        }
      }
      console.log(this.materialList)
      // 入库信息初始化
      let goStockInfo = res[2].data.data
      goStockInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          let flag = this.goStockList.find(val => val.material === item.material_name)
          if (!flag) {
            this.goStockList.push({
              material: item.material_name,
              unit: (item.unit ? item.unit : 'kg'),
              goStock_number: item.total_weight,
              info: [{
                list: [{
                  dyelot_number: item.vat_code,
                  value: item.total_weight,
                  attr: item.attribute
                }],
                color: item.color_code
              }]
            })
          } else {
            flag.goStock_number = Number(flag.goStock_number) + Number(item.total_weight)
            let flag1 = flag.info.find(val => val.color === item.color_code)
            if (!flag1) {
              flag.info.push({
                list: [{
                  dyelot_number: item.vat_code,
                  value: item.total_weight,
                  attr: item.attribute
                }],
                color: item.color_code
              })
            } else {
              let flag2 = flag1.list.find(val => val.dyelot_number === item.vat_code)
              if (!flag2) {
                flag1.list.push({
                  dyelot_number: item.vat_code,
                  value: item.total_weight,
                  attr: item.attribute
                })
              } else {
                flag2.value = Number(flag2.value) + Number(item.total_weight)
              }
            }
          }
          // 统计已入库数量
          let fleg = this.materialList.find(val => val.material === item.material_name)
          if (fleg) {
            fleg.goStock_number = Number(fleg.goStock_number ? fleg.goStock_number : 0) + Number(item.total_weight)
          }
          // 初始化入库详情
          this.goStockLog.unshift({
            time: item.complete_time.split(' ')[0],
            material: item.material_name,
            color: item.color_code,
            dyelot_number: item.vat_code,
            goStock_number: item.total_weight,
            unit: item.unit ? item.unit : 'kg',
            attr: item.attribute,
            remark: item.desc,
            user: item.user_name
          })
          // 初始化结余信息
          // console.log(item)
          // let surplu = this.surplus.find(val => ((val.material === item.material_name) && (val.color === item.color_code) && (val.dyelot_number === item.vat_code)))
          // if (!surplu) {
          //   this.surplus.push({
          //     material: item.material_name,
          //     color: item.color_code,
          //     dyelot_number: item.vat_code,
          //     surplu: item.total_weight,
          //     stock_id: item.stock_id,
          //     unit: (item.unit === null ? 'kg' : item.unit)
          //   })
          // } else {
          //   surplu.number = Number(surplu.number) + Number(item.total_weight)
          // }
        }
      })
      this.materialList.forEach(item => {
        // 插入对应物料的订购值
        let flag = this.goStockList.find(val => val.material === item.material)
        console.log(flag)
        // 给原料信息添加订购值和加工值
        if (materialInfo.total_weight_order[item.material]) {
          item.order_number = materialInfo.total_weight_order[item.material]
          this.stockFlag += item.order_number
        }
        if (materialInfo.total_weight_process[item.material]) {
          item.process_number = materialInfo.total_weight_process[item.material]
        }
        if (flag) {
          flag.order_number = (item.order_number ? item.order_number : 0)
          this.stockFlag += (item.order_number ? item.order_number : 0)
        }
      })
      // 出库信息初始化
      let outStockInfo = res[3].data.data
      outStockInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          // 初始化出库信息
          let flag = this.outStockInfo.find(val => val.material === item.material_name)
          if (!flag) {
            this.outStockInfo.push({
              material: item.material_name,
              unit: (item.unit === null ? 'kg' : item.unit),
              client_list: [{
                client_name: item.client_name,
                color_list: [{
                  color: item.color_code,
                  outStock_number: item.weight,
                  plan_number: 0,
                  vat_list: [item.vat_code]
                }]
              }]
            })
          } else {
            let flag1 = flag.client_list.find(val => val.client_name === item.client_name)
            if (!flag1) {
              flag.client_list.push({
                client_name: item.client_name,
                color_list: [{
                  color: item.color_code,
                  outStock_number: item.weight,
                  plan_number: 0,
                  vat_list: [item.vat_code]
                }]
              })
            } else {
              let flag2 = flag1.color_list.find(val => val.color === item.color_code)
              if (!flag2) {
                flag1.color_list.push({
                  color: item.color_code,
                  outStock_number: item.weight,
                  plan_number: 0,
                  vat_list: [item.vat_code]
                })
              } else {
                flag2.outStock_number = Number(flag2.outStock_number) + Number(item.weight)
                let flag3 = flag2.vat_list.find(val => val === item.vat_code || (val === '默认' && (item.vat_code === '' || item.vat_code === 'vat_null')))
                if (!flag3) {
                  if (item.vat_code === '' || item.vat_code === 'vat_null') {
                    flag2.vat_list.push('默认')
                  } else {
                    flag2.vat_list.push(item.vat_code)
                  }
                }
              }
            }
          }
          // 统计已出库数量
          let data = this.materialList.find(val => val.material === item.material_name)
          if (data) {
            data.outStock_number = Number(data.outStock_number ? data.outStock_number : 0) + Number(item.weight)
          }
          // 初始化出库详情
          this.outStockLog.unshift({
            time: item.complete_time.split(' ')[0],
            material: item.material_name,
            client_name: item.client_name,
            color: item.color_code,
            dyelot_number: (item.vat_code === '' || item.vat_code === 'vat_null') ? '默认' : item.vat_code,
            outStock_number: item.weight,
            remark: item.desc,
            user: item.user_name
          })
          // 结余信息计算
          // let surplu = this.surplus.find(val => ((val.material === item.material_name) && (val.color === item.color_code) && (val.dyelot_number === item.vat_code)))
          // if (surplu) {
          //   surplu.surplu -= item.weight
          // }
        }
      })
      // 生产信息初始化
      let productionInfo = res[4].data.data
      let productsInfo = res[5].data.data
      // 分配信息初始化
      productionInfo.forEach(item => {
        let types = item.product_info.category_name + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_name ? ('/' + item.product_info.flower_name) : '')
        let flag = this.productionList.find(val => val.name === item.client_name)
        if (!flag) {
          this.productionList.push({
            name: item.client_name,
            client_id: item.client_id,
            production: [{
              product_code: item.product_info.product_code,
              product_class: types,
              product_detail: [{
                color: item.color,
                number: item.number,
                size: item.size
              }]
            }]
          })
        } else {
          let flag1 = flag.production.find(val => val.product_code === item.product_info.product_code)
          if (!flag1) {
            flag.production.push({
              product_code: item.product_info.product_code,
              product_class: types,
              product_detail: [{
                color: item.color,
                number: item.number,
                size: item.size
              }]
            })
          } else {
            let flag2 = flag1.product_detail.find(val => ((val.size === item.size) && (val.color === item.color)))
            if (!flag2) {
              flag1.product_detail.push({
                color: item.color,
                number: item.number,
                size: item.size
              })
            } else {
              flag2.number = Number(flag2.number) + Number(item.number)
            }
          }
        }
      })
      // 分配信息插入总计划生产数量与订单数量
      this.productionList.forEach(item => {
        item.production.forEach(val => {
          val.product_detail.forEach(valPro => {
            let flag = productsInfo.production_detail.product_info.find(key => (key.product_code === val.product_code && key.color === valPro.color && key.size === valPro.size))
            if (flag) {
              valPro.plan_number = flag.total_num
              valPro.order_number = flag.order_num
            }
          })
        })
      })
      // 所需原料初始化
      let materials = []
      for (let prop in productsInfo.product_plan) {
        materials.push(...productsInfo.product_plan[prop])
      }
      console.log(this.productionList)
      this.productionList.forEach(item => {
        item.production.forEach(value => {
          value.product_detail.forEach(val => {
            materials.forEach(vals => {
              if (vals.type === Number(this.type) && vals.product_code === value.product_code && vals.size === val.size && vals.color_match_name === val.color) {
                let fleg = productsInfo.production_detail.product_info.find(key => key.product_code === value.product_code)
                if (fleg) {
                  value.product_sunhao = fleg.production_sunhao
                }
                if (!item.materials) {
                  item.materials = []
                }
                let flag = item.materials.find(key => key.material === vals.material_name)
                if (!flag) {
                  item.materials.push({
                    material: vals.material_name,
                    colors: [{
                      color: vals.color_name,
                      number: (vals.unit === '克' || vals.unit === 'g') ? ((vals.number * val.order_number * (val.number / val.plan_number) * (1 + Number(value.product_sunhao) / 100)) / 1000) : (vals.number * val.order_number * (val.number / val.plan_number) * (1 + Number(value.product_sunhao) / 100)),
                      unit: (vals.unit === '克' || vals.unit === 'g') ? 'kg' : vals.unit
                    }]
                  })
                } else {
                  let flag1 = flag.colors.find(key => key.color === vals.color_name)
                  if (!flag1) {
                    flag.colors.push({
                      color: vals.color_name,
                      number: (vals.unit === '克' || vals.unit === 'g') ? ((vals.number * val.order_number * (val.number / val.plan_number) * (1 + Number(value.product_sunhao) / 100)) / 1000) : (vals.number * val.order_number * (val.number / val.plan_number) * (1 + Number(value.product_sunhao) / 100)),
                      unit: (vals.unit === '克' || vals.unit === 'g') ? 'kg' : vals.unit
                    })
                  } else {
                    flag1.number += (vals.unit === '克' || vals.unit === 'g') ? ((vals.number * val.order_number * (val.number / val.plan_number) * (1 + Number(value.product_sunhao) / 100)) / 1000) : (vals.number * val.order_number * (val.number / val.plan_number) * (1 + Number(value.product_sunhao) / 100))
                  }
                }
              }
            })
          })
        })
      })
      // 将该单位所需物料插入出库信息
      console.log(this.productionList)
      this.outStockInfo.forEach(item => {
        item.client_list.forEach(value => {
          value.color_list.forEach(color => {
            let flag = this.productionList.find(val => val.name === value.client_name)
            if (flag) {
              // console.log(flag)
              let flag1 = flag.materials.find(val => val.material === item.material)
              if (flag1) {
                let flag2 = flag1.colors.find(val => val.color === color.color)
                if (flag2) {
                  color.plan_number = flag2.number
                }
              }
            }
          })
        })
      })
      this.surplus = res[6].data.data.filter(res => (res.type === (this.type === '0' ? 1 : 2) || res.type === null))
      // console.log(this.surplus)
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialStockDetail.less";
</style>
<style lang="less" scoped>
#rawMaterialStockDetail {
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
      height: 580px;
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
