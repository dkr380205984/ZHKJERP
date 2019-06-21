<template>
  <div id="packagOutStock"
    v-loading="loading">
    <div class="head">
      <h2>装箱出库(未启用)</h2>
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
                </li>
                <li class="content">
                  <span style="line-height:1.5em"
                    class="tableRow">
                    <div>
                      <span>{{'第' + chinaNumber(batchList.id) + '批'}}</span>
                      <span>{{batchList.delivery_time}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex3">
                    <template v-if="batchList.product_info.length !== 0">
                      <span v-for="(val,ind) in batchList.product_info"
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
                    </template>
                    <span class="tableColumn"
                      v-else>暂无该批次信息</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
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
      <div class="stepCtn">
        <div class="stepTitle">添加装箱信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"
            v-if="flag"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn"
                style="width:900px;">
                <li class="title">
                  <span>订单批次</span>
                  <span class="flex4">
                    <span>包装编号</span>
                    <span class="flex3">
                      <span>包装数量</span>
                      <span class="flex3">
                        <span class="flex17">产品信息</span>
                        <span>尺码/颜色</span>
                        <span>产品数量</span>
                      </span>
                    </span>
                  </span>
                  <span>确认装箱</span>
                </li>
                <li class="content">
                  <span class="tableRow"
                    style="line-height:1.5em">
                    <div>
                      <span>第{{chinaNumber(list.packagInfo.id)}}批</span>
                      <span>{{list.packagInfo.delivery_time}}</span>
                    </div>
                  </span>
                  <template v-if="list.packagList.length !== 0">
                    <span class="tableRow flex4 col">
                      <span class="tableColumn"
                        v-for="(item,key) in list.packagList"
                        :key="key">
                        <span class="tableRow">{{item.code}}</span>
                        <span class="tableRow col flex3">
                          <span class="tableColumn"
                            v-for="(valPack,indPack) in item.packag_info"
                            :key="indPack">
                            <span class="tableRow">{{valPack.number}}{{valPack.unit}}</span>
                            <span class="tableRow col flex3">
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
                                <span class="tableRow">{{valPro.number}}条</span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow"
                      style="line-height:1.5em">
                      <div style="text-align:center">
                        <span>该批次是否全部装箱?</span>
                        <el-radio-group v-model="flag"
                          style="flex:1;margin-top:20px;">
                          <el-radio :label="true">是</el-radio>
                          <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                      </div>
                    </span>
                  </template>
                  <span v-else
                    class="tableRow flex5">暂无装箱信息</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list.packagInfo.packagPageInfo"
              :key="key">
              <li>
                <span>包装编号:</span>
                <el-select v-model="item.packag_code"
                  placeholder="请选择包装编号"
                  size="small"
                  style="width:243px;">
                  <el-option v-for="type in arrGeter()"
                    :key="type.id"
                    :value="type">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>包装箱数:</span>
                <el-input size="small"
                  placeholder="装箱数量"
                  v-model="item.number">
                </el-input>
              </li>
              <li>
                <div class="divInp">
                  <span>包装重量:</span>
                  <el-input size="small"
                    style="width:108px"
                    placeholder="毛重"
                    v-model="item.weight">
                  </el-input>
                  <strong>——</strong>
                  <el-input size="small"
                    style="width:108px;margin-left:0;"
                    placeholder="净重"
                    v-model="item.only_weight">
                  </el-input>
                </div>
              </li>
              <li class="col"
                v-for="(valPro,indPro) in item.product_info"
                :key="indPro">
                <div class="divInp">
                  <span>{{indPro === 0 ? '产品数量:' : ''}}</span>
                  <el-input size="small"
                    style="width:243px;"
                    :placeholder="'产品' + (indPro + 1)"
                    :disabled="true"
                    v-model="valPro.product_code">
                  </el-input>
                </div>
                <div class="divInp"
                  v-for="(valSize,indSize) in valPro.size_info"
                  :key="indSize">
                  <span></span>
                  <el-input size="small"
                    style="width:100px;"
                    :disabled="true"
                    placeholder="尺码/颜色"
                    v-model="valSize.sizeColor">
                  </el-input>
                  <el-input size="small"
                    style="width:143px;"
                    placeholder="请输入产品数量"
                    v-model="valSize.number">
                  </el-input>
                </div>
              </li>
              <li>
                <span>备注:</span>
                <el-input type="textarea"
                  placeholder="请输入内容"
                  style="width:243px;height:45px;"
                  v-model="item.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                @click="deletePackagInfo(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addPackagInfo">
            <span>+</span>
            <span>添加包装</span>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        v-if="flag">
        <div class="stepTitle">出库信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list.outStockInfo"
              :key="key">
              <li>
                <span>包装编号:</span>
                <el-select v-model="item.packag_code"
                  placeholder="请选择包装编号"
                  size="small"
                  style="width:243px;">
                  <el-option v-for="type in arrGeter()"
                    :key="type.id"
                    :value="type">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>包装箱数:</span>
                <el-input size="small"
                  placeholder="装箱数量"
                  v-model="item.number">
                </el-input>
              </li>
              <li>
                <div class="divInp">
                  <span>包装重量:</span>
                  <el-input size="small"
                    style="width:108px"
                    placeholder="毛重"
                    v-model="item.weight">
                  </el-input>
                  <strong>——</strong>
                  <el-input size="small"
                    style="width:108px;margin-left:0;"
                    placeholder="净重"
                    v-model="item.only_weight">
                  </el-input>
                </div>
              </li>
              <li class="col"
                v-for="(valPro,indPro) in item.product_info"
                :key="indPro">
                <div class="divInp">
                  <span>{{indPro === 0 ? '产品数量:' : ''}}</span>
                  <el-input size="small"
                    style="width:243px;"
                    :placeholder="'产品' + (indPro + 1)"
                    :disabled="true"
                    v-model="valPro.product_code">
                  </el-input>
                </div>
                <div class="divInp"
                  v-for="(valSize,indSize) in valPro.size_info"
                  :key="indSize">
                  <span></span>
                  <el-input size="small"
                    style="width:100px;"
                    :disabled="true"
                    placeholder="尺码/颜色"
                    v-model="valSize.sizeColor">
                  </el-input>
                  <el-input size="small"
                    style="width:143px;"
                    placeholder="请输入产品数量"
                    v-model="valSize.number">
                  </el-input>
                </div>
              </li>
              <li>
                <span>备注:</span>
                <el-input type="textarea"
                  placeholder="请输入内容"
                  style="width:243px;height:45px;"
                  v-model="item.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                @click="deletePackagInfo(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addPackagInfo">
            <span>+</span>
            <span>添加国家</span>
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
      batchList: {
        product_info: []
      },
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
      list: {
        packagInfo: {
          packagPageInfo: []
        },
        outStockInfo: [{}],
        packagList: []
      },
      productList: [],
      flag: true
    }
  },
  watch: {
    flag () {
      console.log(this.flag)
    },
    'list.packagInfo.packagPageInfo': {
      deep: true,
      handler: function (newVal) {
        this.list.packagList = []
        newVal.forEach((valCode, indCode) => {
          let str = ''
          valCode.product_info.forEach(valPro => {
            valPro.size_info.forEach(valSize => {
              if (valSize.number !== 0 && valSize.number !== '') {
                str += (valPro.product_code + ' ' + valSize.sizeColor)
              }
            })
          })
          valCode.product_info.forEach(valPro => {
            valPro.size_info.forEach(valSize => {
              if (valSize.number !== '0' && valSize.number !== '') {
                let flag = this.list.packagList.find(key => key.code === valCode.packag_code)
                if (!flag) {
                  this.list.packagList.push({
                    code: valCode.packag_code ? valCode.packag_code : '',
                    packag_info: [{
                      number: valCode.number ? valCode.number : 0,
                      proIn: str,
                      unit: '箱',
                      indCode: indCode,
                      product_info: [{
                        product_code: valPro.product_code.split(' ')[0],
                        product_type: valPro.product_code.split(' ')[1],
                        size: valSize.sizeColor.split('/')[0],
                        color: valSize.sizeColor.split('/')[1],
                        number: valSize.number ? valSize.number : 0
                      }]
                    }]
                  })
                } else {
                  let flag1 = flag.packag_info.find(key => key.indCode === indCode)
                  if (flag1) {
                    flag1.product_info.push({
                      product_code: valPro.product_code.split(' ')[0],
                      product_type: valPro.product_code.split(' ')[1],
                      size: valSize.sizeColor.split('/')[0],
                      color: valSize.sizeColor.split('/')[1],
                      number: valSize.number ? valSize.number : 0
                    })
                  } else {
                    flag.packag_info.push({
                      number: valCode.number ? valCode.number : 0,
                      proIn: str,
                      unit: '箱',
                      indCode: indCode,
                      product_info: [{
                        product_code: valPro.product_code.split(' ')[0],
                        product_type: valPro.product_code.split(' ')[1],
                        size: valSize.sizeColor.split('/')[0],
                        color: valSize.sizeColor.split('/')[1],
                        number: valSize.number ? valSize.number : 0
                      }]
                    })
                  }
                }
              }
            })
          })
        })
      }
    }
  },
  methods: {
    timeGet (time) {
      let nowTime = new Date().getTime()
      let times = (nowTime - (new Date(time).getTime())) / 1000 / 60 / 60 / 24
      return Math.floor(times)
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
    },
    addPackagInfo () {
      this.list.packagInfo.packagPageInfo.push({
        packag_code: '',
        number: '',
        weight: '',
        only_weight: '',
        remark: '',
        product_info: JSON.parse(JSON.stringify(this.productList))
      })
    },
    deletePackagInfo (key) {
      this.list.packagInfo.packagPageInfo.splice(key, 1)
    },
    arrGeter () {
      return ['1a1', '1a2']
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
      // console.log('orderInfo', orderInfo)
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
            if (valBatch.batch_id === Number(this.$route.params.batchId)) {
              this.batchList.id = valBatch.batch_id
              this.batchList.delivery_time = valBatch.delivery_time
              if (!this.batchList.product_info) {
                this.batchList.product_info = []
              }
              let flag = this.batchList.product_info.find(key => key.product_code === valPro.productCode)
              if (!flag) {
                this.batchList.product_info.push({
                  product_code: valPro.productCode,
                  product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : ''),
                  size_info: [{
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  }]
                })
              } else {
                let flag1 = flag.size_info.find(key => (key.size === valSize.name[0] && key.color === valSize.name[1]))
                if (!flag1) {
                  flag.size_info.push({
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  })
                } else {
                  flag1.number = Number(flag1.number) + Number(valSize.numbers)
                }
              }
              // 初始化装箱信息的批次信息
              this.list.packagInfo.id = valBatch.batch_id
              this.list.packagInfo.delivery_time = valBatch.delivery_time
              // 初始化装箱信息产品
              let str = valPro.productCode + ' ' + valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : '')
              let sizeColor = valSize.name[0] + '/' + valSize.name[1]
              let fleg = this.productList.find(key => key.product_code === str)
              if (!fleg) {
                this.productList.push({
                  product_code: str,
                  size_info: [
                    {
                      sizeColor: sizeColor,
                      number: ''
                    }
                  ]
                })
              } else {
                let fleg1 = fleg.size_info.find(key => key.sizeColor === sizeColor)
                if (!fleg1) {
                  fleg.size_info.push({
                    sizeColor: sizeColor,
                    number: ''
                  })
                }
              }
            }
          })
        })
      })
      // console.log(this.productList)
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagOutStock.less";
</style>
