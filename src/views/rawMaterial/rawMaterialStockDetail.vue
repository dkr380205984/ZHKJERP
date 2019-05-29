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
            <span class="content important">KR-0001</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <span class="content">杭州飞泰服饰有限公司</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">2019-04-10</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">A组</span>
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
                    v-for="(item,key) in materialInfo"
                    :key="key">
                  <span>{{item.material}}</span>
                  <span class="flex2 col">
                    <span v-for="(val,ind) in item.color"
                          :key="ind">
                      <span>{{val.color}}</span>
                      <span>{{val.value + item.unit}}</span>
                    </span>
                  </span>
                  <span>{{item.plan_number + item.unit}}</span>
                  <span>{{item.goStock_number + item.unit}}</span>
                  <span>{{item.outStock_number + item.unit}}</span>
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
                    <span>数量</span>
                    <span>批/缸号</span>
                    <span>包装属性</span>
                    <span>已入库</span>
                    <span>待入库</span>
                  </span>
                  <!-- <span>备注</span> -->
                </li>
                <li class="material_info"
                    v-for="(item,key) in goStockInfo"
                    :key="key">
                  <span>{{item.material}}</span>
                  <span class="flex6 col">
                    <span v-for="(val,ind) in item.info"
                          :key="ind">
                      <span>{{val.color}}</span>
                      <span>{{val.value + item.unit}}</span>
                      <span>{{val.dyelot_number}}</span>
                      <span>{{val.attr}}</span>
                      <span>{{val.goStock_number + item.unit}}</span>
                      <span>{{val.waitStock_number + item.unit}}</span>
                    </span>
                  </span>
                  <!-- <span class="col remark">
                    <template v-for="(val,ind) in item.remark">
                      <i :key="ind"
                         v-if="ind<3">{{(ind+1) + '、' + val.value}}
                        <el-popover placement="right"
                                    width="400"
                                    trigger="click"
                                    v-if="(ind === 2 || ind === item.remark.length - 1)">
                          <el-table :data="item.remark">
                            <el-table-column property='value'
                                             label="备注信息"></el-table-column>
                          </el-table>
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </template>
                  </span> -->
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
                    <span>{{item.goStock_number + item.unit}}</span>
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
                    <!-- <span>备注</span> -->
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
                      <!-- <span class="col remark">
                        <template v-for="(it,k) in val.remark">
                          <i :key="k"
                             v-if="k<3">{{(k+1) + '、' + it.value}}
                            <el-popover placement="right"
                                        width="400"
                                        trigger="click"
                                        v-if="(k === 2 || k === val.remark.length - 1)">
                              <el-table :data="val.remark">
                                <el-table-column property='value'
                                                 label="备注信息"></el-table-column>
                              </el-table>
                              <span slot="reference">展开</span>
                            </el-popover>
                          </i>
                        </template>
                      </span> -->
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
export default {
  data () {
    return {
      loading: false,
      goStockLogFlag: false,
      goStockLog: [
        {
          time: 1,
          material: 1,
          color: 1,
          dyelot_number: 1,
          goStock_number: 1,
          unit: 'kg',
          attr: 1,
          remark: '',
          user: 1

        }
      ],
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
      materialInfo: [
        {
          material: '52支上光晴纶',
          unit: 'kg',
          plan_number: 0,
          goStock_number: 0,
          outStock_number: 0,
          color: [
            {
              color: '深绿',
              value: 1220
            }, {
              color: '卡其色',
              value: 1000
            }
          ]
        },
        {
          material: '36支上光晴纶',
          unit: 'kg',
          plan_number: 0,
          goStock_number: 0,
          outStock_number: 0,
          color: [
            {
              color: '本白',
              value: 1220
            }
          ]
        }
      ],
      goStockInfo: [
        {
          material: '52',
          unit: 'kg',
          info: [
            {
              color: '绿',
              value: 400,
              dyelot_number: 1,
              attr: '常规纱',
              goStock_number: 200,
              waitStock_number: 100
            }, {
              color: '黄',
              value: 456,
              dyelot_number: 3,
              attr: '常规纱',
              goStock_number: 240,
              waitStock_number: 130
            }
          ]
        }, {
          material: '36',
          unit: '个',
          info: [
            {
              color: '绿',
              value: 400,
              dyelot_number: 1,
              attr: '常规纱',
              goStock_number: 200,
              waitStock_number: 100
            }
          ]
        }
      ],
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
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialStockDetail.less";
</style>
