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
            <span class="content important">{{order_code}}</span>
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
                    <span>颜色</span>
                    <span>数量</span>
                  </span>
                  <span>已计划</span>
                  <span>已入库</span>
                  <span>已出库</span>
                </li>
                <li class="material_info"
                    v-for="(item,key) in materialList"
                    :key="key">
                  <span>{{item.material}}</span>
                  <span class="flex2 col">
                    <span v-for="(val,ind) in item.need"
                          :key="ind">
                      <span>{{val.name}}</span>
                      <span>{{val.value|fixedFilter}}{{item.unit}}</span>
                    </span>
                  </span>
                  <span>{{(item.plan_number ? item.plan_number : 0)|fixedFilter}}{{item.unit}}</span>
                  <span>{{(item.goStock_number ? item.goStock_number : 0)|fixedFilter}}{{item.unit}}</span>
                  <span>{{(item.outStock_number ? item.outStock_number : 0)|fixedFilter}}{{item.unit}}</span>
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
                  <span class="flex6">
                    <span>颜色</span>
                    <span class="flex3">
                      <span>批/缸号</span>
                      <span>数量</span>
                      <span>包装属性</span>
                    </span>
                    <span>已入库</span>
                    <span>待入库</span>
                  </span>
                </li>
                <li class="material_info"
                    v-for="(item,key) in goStockList"
                    :key="key">
                  <span>{{item.material}}</span>
                  <span class="flex6 col">
                    <span v-for="(val,ind) in item.info"
                          :key="ind">
                      <span>{{val.color}}</span>
                      <span class="flex3 col">
                        <span v-for="(value,index) in val.list"
                              :key="index">
                          <span>{{value.dyelot_number}}</span>
                          <span>{{value.value|fixedFilter}}{{item.unit}}</span>
                          <span>{{value.attr}}</span>
                        </span>
                      </span>
                      <span>{{val.goStock_number|fixedFilter}}{{item.unit}}</span>
                      <span>{{(val.plan_number-val.goStock_number)|fixedFilter}}{{item.unit}}</span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                     @click="goStockLogFlag = !goStockLogFlag">{{ goStockLogFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                  v-if="goStockLogFlag">
                <div>
                  <li>
                    <span class="flexBig">时间</span>
                    <span class="flexBig">{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span>颜色</span>
                    <span>批/缸号</span>
                    <span>包装属性</span>
                    <span>入库数量</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                  </li>
                </div>
                <div>
                  <li v-for="(item,key) in goStockLog"
                      :key="item.time + key">
                    <span class="flexBig">{{item.time}}</span>
                    <span class="flexBig">{{item.material}}</span>
                    <span>{{item.color}}</span>
                    <span>{{item.dyelot_number}}</span>
                    <span>{{item.attr}}</span>
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
                <div class="order"
                     @click="$router.push('/index/rawMaterialStock/' + $route.params.id + '/' + type)">
                  <img class="icon"
                       src="@/assets/image/icon/goStock.png">
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
                      <span>批/缸号</span>
                      <span>包装属性</span>
                      <span>已出库</span>
                      <span>待入库</span>
                    </span>
                  </span>
                </li>
                <li class="material_info"
                    v-for="(item,key) in outStockInfo"
                    :key="key">
                  <span>{{item.material}}</span>
                  <span class="flex6 col">
                    <span v-for="(val,ind) in item.info"
                          :key="ind">
                      <span class="flex16">{{val.company}}</span>
                      <span class="flex44 col">
                        <span v-for="(value,index) in val.list"
                              :key='index'>
                          <span>{{value.color}}</span>
                          <span>{{value.dyelot_number}}</span>
                          <span>{{value.attr}}</span>
                          <span>{{value.outStock_number + item.unit}}</span>
                          <span>{{value.waitStock_number + item.unit}}</span>
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
                    <span class="flexBig">时间</span>
                    <span class="flexBig">{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flexBig">出库单位</span>
                    <span>颜色</span>
                    <span>批/缸号</span>
                    <span>包装属性</span>
                    <span>出库数量</span>
                    <span class="flexBig">备注</span>
                    <span>操作人</span>
                  </li>
                </div>
                <div>
                  <li v-for="(item,key) in outStockLog"
                      :key="item.time + key">
                    <span class="flexBig">{{item.time}}</span>
                    <span class="flexBig">{{item.material}}</span>
                    <span class="flexBig">{{item.company}}</span>
                    <span>{{item.color}}</span>
                    <span>{{item.dyelot_number}}</span>
                    <span>{{item.attr}}</span>
                    <span>{{item.outStock_number + item.unit}}</span>
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
                <div class="order"
                     @click="$router.push('/index/rawMaterialOutStock/' + $route.params.id + '/' + type)">
                  <img class="icon"
                       src="@/assets/image/icon/goStock.png">
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
                    <span>颜色</span>
                    <span>缸号</span>
                    <span>结余</span>
                    <span>操作</span>
                  </li>
                </div>
                <div>
                  <li v-for="(val,ind) in surplus"
                      :key="ind">
                    <span>{{val.material}}</span>
                    <span>{{val.color}}</span>
                    <span>{{val.dyelot_number}}</span>
                    <span>{{val.surplu + val.unit}}</span>
                    <span @click="goStock(val)"
                          class="important">存入仓库</span>
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
  </div>
</template>

<script>
import { orderDetail, rawMaterialOrderInit, rawMaterialGoStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      goStockLogFlag: false,
      goStockLog: [],
      outStockLogFlag: false,
      outStockLog: [
        {
          time: 1,
          material: 1,
          company: 1,
          color: 1,
          dyelot_number: 1,
          attr: 1,
          outStock_number: 100,
          unit: 'kg',
          remark: '备注信hfjkah息11',
          user: '汪汪'
        }
      ],
      materialList: [],
      goStockList: [],
      outStockInfo: [
        {
          material: '52',
          unit: 'kg',
          info: [
            {
              company: '52',
              list: [
                {
                  color: '绿',
                  dyelot_number: 1,
                  attr: 222,
                  outStock_number: 200,
                  waitStock_number: 100,
                  unit: 'kg'
                }
              ]
            }
          ]
        }, {
          material: '52',
          unit: 'kg',
          info: [
            {
              company: '52',
              list: [
                {
                  color: '绿',
                  dyelot_number: 1,
                  attr: 222,
                  outStock_number: 200,
                  waitStock_number: 100
                }
              ]
            }, {
              company: '52',
              list: [
                {
                  color: '绿',
                  dyelot_number: 1,
                  attr: 222,
                  outStock_number: 200,
                  waitStock_number: 100
                }, {
                  color: '绿',
                  dyelot_number: 1,
                  attr: 222,
                  outStock_number: 200,
                  waitStock_number: 100
                }
              ]
            }
          ]
        }
      ],
      surplus: [
        {
          material: '52',
          color: '20',
          surplu: 10,
          dyelot_number: '1',
          unit: 'kg'
        }
      ]
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
      console.log(lengths)
      return lengths
    },
    goStock (item) {
      console.log(item)
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
      })
    ]).then(res => {
      console.log(res)
      this.order_code = res[0].data.data.order_code
      this.client_name = res[0].data.data.client_name
      this.order_time = res[0].data.data.order_time
      this.group_name = res[0].data.data.group_name
      // 物料信息初始化
      let materialInfo = res[1].data.data
      // console.log(materialInfo)
      materialInfo.material_info.forEach((item, key) => {
        for (let prop in item) {
          for (let value in item[prop]) {
            if (value !== 'total_number' && value !== 'type' && value !== 'unit') {
              if (item[prop].type === Number(this.type)) {
                let flag = this.materialList.find(val => val.material === prop)
                if (!flag) {
                  this.materialList.push({
                    material: prop,
                    plan_number: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value],
                    unit: (item[prop].unit === '克' || item[prop].unit === 'g') ? 'kg' : item[prop].unit === '千克' ? 'kg' : item[prop].unit,
                    need: [{
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value]
                    }]
                  })
                } else {
                  flag.plan_number = Number(flag.plan_number) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value])
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
      // console.log(this.materialList)
      // 入库信息初始化
      let goStockInfo = res[2].data.data
      console.log(goStockInfo)
      goStockInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          let flag = this.goStockList.find(val => val.material === item.material_name)
          if (!flag) {
            this.goStockList.push({
              material: item.material_name,
              unit: (item.unit ? item.unit : 'kg'),
              info: [{
                list: [{
                  dyelot_number: item.vat_code,
                  value: item.total_weight,
                  attr: item.attribute
                }],
                color: item.color_code,
                goStock_number: item.total_weight
              }]
            })
          } else {
            let flag1 = flag.info.find(val => val.color === item.color_code)
            if (!flag1) {
              flag.info.push({
                list: [{
                  dyelot_number: item.vat_code,
                  value: item.total_weight,
                  attr: item.attribute
                }],
                color: item.color_code,
                goStock_number: item.total_weight
              })
            } else {
              flag1.goStock_number = Number(flag1.goStock_number) + Number(item.total_weight)
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
          this.goStockLog.push({
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
        }
      })
      // 将物料与颜色相对应的计划值插入入库信息
      this.materialList.forEach(item => {
        item.need.forEach(value => {
          let flag = this.goStockList.find(val => val.material === item.material)
          if (flag) {
            let flag1 = flag.info.find(val => val.color === value.name)
            if (flag1) {
              flag1.plan_number = value.value
            }
          }
        })
      })
      console.log(this.goStockList)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialStockDetail.less";
</style>
