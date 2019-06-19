<template>
  <div id="semiExaminationDetail"
    v-loading="loading">
    <div class="head">
      <h2>装箱出库详情</h2>
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
        <div class="stepTitle">发货批次信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <template v-if="batchList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn">
                  <li class="title">
                    <span>发货日期</span>
                    <span class="flex3">
                      <span>产品品类</span>
                      <span>
                        <span>尺码/颜色</span>
                        <span>发货数量</span>
                      </span>
                    </span>
                    <span class="flex17">操作</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in batchList"
                    :key="key">
                    <span style="line-height:1.5em"
                      class="tableRow">
                      <div>
                        <span>{{'第' + chinaNumber(item.id) + '批'}}</span>
                        <span>{{item.delivery_time}}</span>
                      </div>
                    </span>
                    <span class="tableRow col flex3">
                      <span v-for="(val,ind) in item.product_info"
                        :key="ind"
                        class="tableColumn">
                        <span style="line-height:1.5em"
                          class="tableRow">
                          <div>
                            <span>{{val.product_type}}</span>
                            <span class="blue"
                              @click="$router.push('/index/productDetail/' + val.product_code)">{{val.product_code}}</span>
                          </div>
                        </span>
                        <span class="tableRow col">
                          <span class="tableColumn"
                            v-for="(valSize,indSize) in val.size_info"
                            :key="indSize">
                            <span class="tableRow">{{valSize.size}}/{{valSize.color}}</span>
                            <span class="tableRow">{{valSize.number}}条</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow flex17">
                      <span class="blue"
                        @click="go('batch' + item.id)">显示详情</span>
                    </span>
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
        <div class="stepTitle">包装信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <template v-if="packag_info.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn">
                  <li class="title">
                    <span>包装编号</span>
                    <span>包装分类</span>
                    <span class="flex13">规格</span>
                    <span>属性</span>
                    <span class="flex55">
                      <span class="flex17">产品/包装</span>
                      <span>尺码/颜色</span>
                      <span>产品数量</span>
                      <span>每包数量</span>
                    </span>
                    <span class="flex17">包装数量</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in packag_info"
                    :key="key">
                    <!-- <span style="line-height:1.5em"
                      class="tableRow">
                      <div>
                        <span>{{'第' + chinaNumber(item.id) + '批'}}</span>
                        <span>{{item.delivery_time}}</span>
                      </div>
                    </span> -->
                    <span class="tableRow">{{item.packag_code}}</span>
                    <span class="tableRow">{{item.packag_type}}</span>
                    <span class="tableRow flex13">{{item.packag_size}}</span>
                    <span class="tableRow">{{item.packag_attr}}</span>
                    <span class="tableRow col flex55">
                      <span v-for="(val,ind) in item.packag_in_info"
                        :key="ind"
                        class="tableColumn">
                        <span style="line-height:1.5em"
                          class="tableRow flex17">
                          <div>
                            <span>{{val.code}}</span>
                            <span>{{val.type}}</span>
                          </div>
                        </span>
                        <span class="tableRow">{{val.size}}/{{val.color}}</span>
                        <span class="tableRow">{{val.number}}{{val.unit}}</span>
                        <span class="tableRow">{{val.one_number}}{{val.unit}}</span>
                      </span>
                    </span>
                    <span class="tableRow flex17">{{item.packag_number}}{{item.unit}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else
            class="inputCtn">暂无信息</div>
        </div>
      </div>
      <div class="stepCtn"
        v-for="(item,key) in batchList"
        :key="key"
        :id="item.product_code">
        <div class="stepTitle"
          id="product1">第{{chinaNumber(item.id) }}批</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"
            v-if="key !== batchList.length -1"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span class="flex13">订单批次</span>
                  <span class="flex55">
                    <span>包装编号</span>
                    <span class="flex4">
                      <span>包装箱数</span>
                      <span class="flex4">
                        <span class="flex17">产品信息</span>
                        <span>尺码颜色</span>
                        <span>已装箱数量</span>
                        <span>产品状态</span>
                      </span>
                    </span>
                  </span>
                  <span>发货状态</span>
                </li>
                <li v-if="item.packagInfoList.length === 0">暂无信息</li>
                <li class="content">
                  <span class="tableRow flex13"
                    style="line-height:1.5em;">
                    <div>
                      <span>第{{chinaNumber(item.id)}}批</span>
                      <span>{{item.delivery_time}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex55">
                    <span v-for="(valBatch,indBatch) in item.packagInfoList"
                      :key="indBatch"
                      class="tableColumn">
                      <span class="tableRow">{{valBatch.code}}</span>
                      <span class="tableRow flex4 col">
                        <span class="tableColumn"
                          v-for="(valPack,indPack) in valBatch.packag_info"
                          :key="indPack">
                          <span class="tableRow">{{valPack.number}}{{valPack.unit}}</span>
                          <span class="tableRow flex4 col">
                            <span class="tableColumn"
                              v-for="(valPro,indPro) in valPack.product_info"
                              :key="indPro">
                              <span class="tableRow flex17"
                                style="line-height:1.5em">
                                <div>
                                  <span>{{valPro.product_code}}</span>
                                  <span>{{valPro.product_type}}</span>
                                </div>
                              </span>
                              <span class="tableRow">{{valPro.size}}/{{valPro.color}}</span>
                              <span class="tableRow">{{valPro.packag_number}}{{valPro.unit}}</span>
                              <span class="tableRow">{{(valPro.plan_number - valPro.packag_number) !== 0 ? (((valPro.plan_number - valPro.packag_number) > 0) ? ('少装:' + (valPro.plan_number - valPro.packag_number) + valPro.unit) : ('多装:' + ((valPro.plan_number - valPro.packag_number)*-1) + valPro.unit)) : '正常装箱'}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="tableRow">{{(timeGet(item.delivery_time) > 0) ? '延期' + timeGet(item.delivery_time) + '天' : '正常出库' }}</span>
                </li>
                <div class="logList"
                  @click="item.logFlag = !item.logFlag">{{ item.logFlag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="item.logFlag">
                <div>
                  <li>
                    <span class="flexBig">时间</span>
                    <span class="flexMid">包装编号</span>
                    <span class="flexMid">包装数量</span>
                    <span class="flexMid">产品包装信息</span>
                    <span class="flexBig">备注信息</span>
                    <span class="flexMid">检验人</span>
                    <span class="flexMid">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="item.log.length === 0">暂无信息</li>
                  <li v-for="(value,index) in item.log"
                    :key="index">
                    <span class="flexBig">{{value.time}}</span>
                    <span>{{value.client_name}}</span>
                    <span>{{value.sizeColor}}</span>
                    <span class="flexMid">{{value.count}}</span>
                    <span class="flexMid">{{value.number}}</span>
                    <span class="flexMid">{{value.defective_number ? value.defective_number : 0}}{{'条'}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{value.defective_why ? value.defective_why : '暂无次品'}}
                        <el-popover placement="top-end"
                          title="次品信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(value.defective_why) > 15"
                          :content="value.defective_why">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexBig remark">
                      <i>
                        {{value.remark ? value.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                          title="备注信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(value.remark) > 15"
                          :content="value.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexMid">{{value.tester}}</span>
                    <span class="flexMid blue">修改</span>
                  </li>
                </div>
              </ul>
              <ul class="tablesCtn"
                style="margin-top:30px;">
                <li class="title">
                  <span>出库时间</span>
                  <span class="flex55">
                    <span>出库国家</span>
                    <span class="flex4">
                      <span>包装编号</span>
                      <span>出库箱数</span>
                      <span>毛重</span>
                      <span>净重</span>
                    </span>
                    <span class="flex13">运输单位</span>
                    <span>体积/m³</span>
                    <span class="flex17">地址</span>
                  </span>
                </li>
                <li v-if="item.outStockInfoList.country_info.length === 0">暂无信息</li>
                <li class="content">
                  <span class="tableRow">{{item.outStockInfoList.outStock_time}}</span>
                  <span class="tableRow col flex55">
                    <span v-for="(value,index) in item.outStockInfoList.country_info"
                      :key="index"
                      class="tableColumn">
                      <span class="tableRow">{{value.name}}</span>
                      <span class="tableRow flex4 col">
                        <span v-for="(val,ind) in value.packag_info"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow">{{val.code}}</span>
                          <span class="tableRow">{{val.number}}{{val.unit}}</span>
                          <span class="tableRow">{{val.weight}}kg</span>
                          <span class="tableRow">{{val.only_weight}}kg</span>
                        </span>
                      </span>
                      <span class="tableRow flex13">{{value.transportation_client}}</span>
                      <span class="tableRow">{{value.bulk}}</span>
                      <span class="tableRow flex17">{{value.address}}</span>
                    </span>
                  </span>
                </li>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/packagOutStock/' + $route.params.id + '/' +item.id)">
                  <img class="icon"
                    v-if="flag"
                    src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/order_disabled.png">
                  <span>装箱出库</span>
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
import { orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      batchList: [],
      packag_info: [
        {
          packag_code: '111',
          packag_type: '袋子',
          packag_size: '60*50*40cm',
          packag_attr: '印字',
          packag_number: 2000,
          unit: '袋',
          packag_in_info: [
            {
              code: '11111',
              type: '围巾/针织/长巾',
              size: '儿童款',
              color: '深绿',
              number: 2000,
              unit: '条',
              one_number: 2
            }, {
              code: '22222',
              type: '围巾/针织/长巾',
              size: '成人款',
              color: '深绿',
              number: 2000,
              unit: '条',
              one_number: 1
            }
          ]
        }, {
          packag_code: '111',
          packag_type: '箱子',
          packag_size: '60*50*40cm',
          packag_attr: '印字',
          packag_number: 2000,
          unit: '箱',
          packag_in_info: [
            {
              code: '11111',
              type: '围巾/针织/长巾',
              size: '儿童款',
              color: '深绿',
              number: 2000,
              unit: '条',
              one_number: 2
            }, {
              code: '22222',
              type: '围巾/针织/长巾',
              size: '成人款',
              color: '深绿',
              number: 2000,
              unit: '条',
              one_number: 1
            }
          ]
        }
      ],
      flag: true
    }
  },
  methods: {
    timeGet (time) {
      let nowTime = new Date().getTime()
      let times = (nowTime - (new Date(time).getTime())) / 1000 / 60 / 60 / 24
      return Math.floor(times)
    },
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
    go (idName) {
      document.getElementById(idName).scrollIntoView(true)
    },
    chinaNumber (key) {
      let obj = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      }
      if (key / 10 > 1) {
        let str = ''
        str = obj[Math.floor(key / 10)] + '十' + obj[key % 10]
        return str
      } else {
        return obj[key]
      }
    }
  },
  created () {
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      // let weaveInfo = res[1].data.data
      // let semiInfo = res[2].data.data
      // let goStockInfo = res[3].data.data
      // let outStockInfo = res[4].data.data
      console.log('orderInfo', orderInfo)
      // console.log('weaveInfo', weaveInfo)
      // console.log('semiInfo', semiInfo)
      // console.log('goStockInfo', goStockInfo)
      // console.log('outStockInfo', outStockInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化发货批次信息
      orderInfo.order_batch.forEach(valBatch => {
        valBatch.batch_info.forEach(valPro => {
          valPro.size.forEach(valSize => {
            let flag = this.batchList.find(key => key.id === valBatch.batch_id)
            if (!flag) {
              this.batchList.push({
                id: valBatch.batch_id,
                delivery_time: valBatch.delivery_time,
                logFlag: false,
                log: [],
                packagInfoList: [
                  {
                    code: '2a1',
                    packag_info: [
                      {
                        number: 20,
                        unit: '箱',
                        product_info: [
                          {
                            product_code: '1111',
                            product_type: '围巾/针织/长巾',
                            size: '儿童款',
                            color: '深绿',
                            packag_number: 2000,
                            plan_number: 1960,
                            unit: '条'
                          }
                        ]
                      }, {
                        number: 20,
                        unit: '箱',
                        product_info: [
                          {
                            product_code: '1111',
                            product_type: '围巾/针织/长巾',
                            size: '儿童款',
                            color: '深绿',
                            packag_number: 2000,
                            plan_number: 2010,
                            unit: '条'
                          }, {
                            product_code: '1111',
                            product_type: '围巾/针织/长巾',
                            size: '儿童款',
                            color: '深绿',
                            packag_number: 2000,
                            plan_number: 2000,
                            unit: '条'
                          }
                        ]
                      }
                    ]
                  }
                ],
                outStockInfoList: {
                  outStock_time: '2019-03-24',
                  country_info: [
                    {
                      name: '奥地利',
                      transportation_client: '单位1',
                      bulk: 200,
                      address: '地址1',
                      packag_info: [
                        {
                          code: '2a1',
                          number: 20,
                          unit: '箱',
                          weight: 20,
                          only_weight: 10
                        }, {
                          code: '2B1',
                          number: 10,
                          unit: '袋',
                          weight: 13,
                          only_weight: 10
                        }
                      ]
                    }, {
                      name: '奥地利',
                      transportation_client: '单位1',
                      bulk: 200,
                      address: '地址1',
                      packag_info: [
                        {
                          code: '2a1',
                          number: 20,
                          unit: '箱',
                          weight: 20,
                          only_weight: 10
                        }, {
                          code: '2B1',
                          number: 10,
                          unit: '袋',
                          weight: 13,
                          only_weight: 10
                        }
                      ]
                    }
                  ]
                },
                product_info: [{
                  product_code: valPro.productCode,
                  product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : ''),
                  size_info: [{
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  }]
                }]
              })
            } else {
              let flag1 = flag.product_info.find(key => key.product_code === valPro.productCode)
              if (!flag1) {
                flag.product_info.push({
                  product_code: valPro.productCode,
                  product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : ''),
                  size_info: [{
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  }]
                })
              } else {
                let flag2 = flag1.size_info.find(key => (key.size === valSize.name[0] && key.color === valSize.name[1]))
                if (!flag2) {
                  flag1.size_info.push({
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  })
                } else {
                  flag2.number = Number(flag2.number) + Number(valSize.numbers)
                }
              }
            }
          })
        })
      })
      console.log(this.batchList)
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/semiExaminationDetail.less";
</style>
