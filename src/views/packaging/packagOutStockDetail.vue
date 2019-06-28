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
      <!-- <div class="stepCtn">
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
                    <span style="line-height:1.5em"
                      class="tableRow">
                      <div>
                        <span>{{'第' + chinaNumber(item.id) + '批'}}</span>
                        <span>{{item.delivery_time}}</span>
                      </div>
                    </span>
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
      </div> -->
      <div class="stepCtn"
        v-for="(item,key) in batchList"
        :key="key">
        <div class="stepTitle"
          :id="'batch' + item.id">第{{chinaNumber(item.id) }}批</div>
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
                  <span>订单批次</span>
                  <span class="flex13">装箱资料</span>
                  <span class="flex55">
                    <span class="flex17">产品信息</span>
                    <span class="flex4">
                      <span>尺码/颜色</span>
                      <span>预计装箱</span>
                      <span>实际装箱</span>
                      <span>数量差值</span>
                    </span>
                  </span>
                  <span>发货状态</span>
                </li>
                <li class="handle"
                  @click="appendPack(key)">添加实际装箱</li>
                <li class="content">
                  <span style="line-height:1.5em;"
                    class="tableRow">
                    <div>
                      <span>第{{item.id}}批</span>
                      <span>{{item.delivery_time}}</span>
                    </div>
                  </span>
                  <span class="tableRow blue flex13"
                    @click="item.logFlag = !item.logFlag">{{ item.logFlag ? '隐藏' : '显示'}}装箱资料</span>
                  <span class="tableRow col flex55">
                    <span v-for="(valPro,indPro) in item.product_info"
                      :key="indPro"
                      class="tableColumn">
                      <span class="tableRow flex17"
                        style="line-height:1.5em">
                        <div>
                          <span>{{valPro.product_code}}</span>
                          <span>{{valPro.product_type}}</span>
                        </div>
                      </span>
                      <span class="tableRow flex4 col">
                        <span class="tableColumn"
                          v-for="(valSize,indSize) in valPro.size_info"
                          :key="indSize">
                          <span class="tableRow">{{valSize.size}}/{{valSize.color}}</span>
                          <span class="tableRow">{{valSize.number}}条</span>
                          <span :class="{tableRow:true,noDate:!valSize.pack_number}">{{valSize.pack_number ? valSize.pack_number + '条' : '暂无数据'}}</span>
                          <span :class="{tableRow:true,noDate:!valSize.pack_number,compiled:(valSize.number - valSize.pack_number) === 0,unCompiled:valSize.pack_number ? (valSize.number - valSize.pack_number) !== 0 : false}">{{chazhi(valSize.number,valSize.pack_number)}}</span>
                          <!-- <span class="tableRow">{{(valPro.plan_number - valPro.packag_number) !== 0 ? (((valPro.plan_number - valPro.packag_number) > 0) ? ('少装:' + (valPro.plan_number - valPro.packag_number) + valPro.unit) : ('多装:' + ((valPro.plan_number - valPro.packag_number)*-1) + valPro.unit)) : '正常装箱'}}</span> -->
                        </span>
                      </span>
                    </span>
                  </span>
                  <span :class="{tableRow:true,unCompiled:timeGet(item.delivery_time,item.packag_time) !== '正常出库',compiled:timeGet(item.delivery_time,item.packag_time) === '正常出库'}">{{timeGet(item.delivery_time,item.packag_time)}}</span>
                </li>
              </ul>
              <ul class="tablesCtn"
                style="margin-top:30px;"
                v-if="item.logFlag">
                <li class="title">
                  <span>包装序号</span>
                  <span>包装类型</span>
                  <span>毛重</span>
                  <span>净重</span>
                  <span class='flex4'>
                    <span class="flex17">产品类型</span>
                    <span>尺码颜色</span>
                    <span>装箱数量</span>
                  </span>
                  <span>备注信息</span>
                </li>
                <li class="handle"
                  @click="$router.push('/index/packagInfoCreate/' + $route.params.id + '/' + item.id )">添加装箱资料</li>
                <li class="handle"
                  style="right:7em">打印</li>
                <li v-if="item.packagInfoList.length === 0">暂无信息</li>
                <li v-for="(value,index) in item.packagInfoList"
                  :key="index"
                  class="content">
                  <span class="tableRow">{{value.pack_code}}</span>
                  <span class="tableRow">{{value.pack_material}}</span>
                  <span class="tableRow">{{value.weight}}kg</span>
                  <span class="tableRow">{{value.net_weight}}kg</span>
                  <span class="tableRow col flex4">
                    <span class="tableColumn"
                      v-for="(valPro,indPro) in value.product_info"
                      :key="indPro">
                      <span class="tableRow flex17">{{valPro.product[0]}}</span>
                      <span class="tableRow">{{valPro.product[1] + '/' + valPro.product[2]}}</span>
                      <span class="tableRow">{{valPro.all_number}}</span>
                    </span>
                  </span>
                  <span :class="{tableRow:true,noDate:!value.desc}">{{value.desc ? value.desc : '暂无备注'}}</span>
                </li>
              </ul>
              <ul class="tablesCtn"
                style="margin-top:30px;">
                <li class="title">
                  <span>出库时间</span>
                  <span>运输单位</span>
                  <span>
                    <span>出库箱数</span>
                  </span>
                  <span>出库立方数/m³</span>
                  <span>出库国家</span>
                  <span>运输地址</span>
                  <span>到达港口</span>
                  <span>备注</span>
                </li>
                <li class="handle"
                  @click="$router.push('/index/packagOutStock/' + $route.params.id + '/' +item.id)">添加出库</li>
                <li v-if="item.outStockInfoList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(val,ind) in item.outStockInfoList"
                  :key="ind">
                  <span class="tableRow">{{val.created_at.split(' ')[0]}}</span>
                  <span class="tableRow">{{val.client_name}}</span>
                  <span class="tableRow">{{val.number}}</span>
                  <span class="tableRow">{{val.cubic_number}}</span>
                  <span :class="{tableRow:true,noDate:!val.country}">{{val.country ? val.country : '暂无数据'}}</span>
                  <span :class="{tableRow:true,noDate:!val.address}">{{val.address ? val.address : '暂无数据'}}</span>
                  <span :class="{tableRow:true,noDate:!val.port}">{{val.port ? val.port : '暂无数据'}}</span>
                  <span :class="{tableRow:true,noDate:!val.desc}">{{val.desc ? val.desc : '暂无备注'}}</span>
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
    <div class="confirm"
      v-if="show">
      <div class="box"
        v-loading='confirmLoading'
        element-loading-text="数据提交中"
        element-loading-background="rgba(0, 0, 0, 0.3)">
        <div class="content">
          <span class="tishi">请输入以下产品实际装箱数量</span>
          <ul>
            <template v-for="(item,key) in batchList[id].product_info">
              <li v-for="(val,ind) in item.size_info"
                :key="ind+ '' +key"
                style="flex-direction:column">
                <span>
                  <span class="flex4">{{item.product_code + ' ' + item.product_type}}</span>
                  <span class="flex17">{{val.size + '/' + val.color}}</span>
                </span>
                <el-input v-model="val.pack_number"
                  placeholder="请输入实际装箱数量"
                  style="display:block;margin-top:10px;"></el-input>
              </li>
            </template>
          </ul>
          <div class="btn">
            <span @click="closeConfirm(false)">取消</span>
            <span class="yes"
              @click="closeConfirm(true,batchList[id].product_info,batchList[id].id)">确认</span>
          </div>
        </div>
        <em class="el-icon-close close"
          @click="closeConfirm(false)"></em>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, packagDetail, outStockDetail, packagNumberAdd, packagNumberDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      batchList: [],
      show: false,
      flag: true,
      id: 1,
      confirmLoading: false
    }
  },
  methods: {
    closeConfirm (key, item, batchId) {
      if (!key) {
        this.show = false
      } else {
        this.confirmLoading = true
        console.log(item)
        let flag = true
        item.forEach((valPro, indPro) => {
          valPro.size_info.forEach((valSize, indSize) => {
            if (!valSize.pack_number) {
              this.confirmLoading = false
              this.$message({
                type: 'error',
                message: '请填写实际装箱数量'
              })
              flag = false
            }
          })
        })
        if (flag) {
          packagNumberAdd({
            company_id: window.sessionStorage.getItem('company_id'),
            order_id: this.$route.params.id,
            user_id: window.sessionStorage.getItem('user_id'),
            batch_id: batchId,
            product_info: JSON.stringify(item)
          }).then(res => {
            this.confirmLoading = false
            this.show = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          })
        }
      }
      this.getDate()
    },
    getDate () {
      Promise.all([
        orderDetail({
          id: this.$route.params.id
        }),
        packagNumberDetail({
          order_id: this.$route.params.id
        })
      ]).then(res => {
        let orderInfo = res[0].data.data
        let packagNumberInfo = res[1].data.data
        this.batchList.map(res => {
          res.product_info = []
        })
        orderInfo.order_batch.forEach(valBatch => {
          valBatch.batch_info.forEach(valPro => {
            valPro.size.forEach(valSize => {
              let flag = this.batchList.find(key => key.id === valBatch.batch_id)
              if (flag) {
                //   this.batchList.push({
                //     id: valBatch.batch_id,
                //     delivery_time: valBatch.delivery_time,
                //     logFlag: false,
                //     log: [],
                //     packagInfoList: [],
                //     outStockInfoList: [],
                //     product_info: [{
                //       product_code: valPro.productCode,
                //       product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : ''),
                //       size_info: [{
                //         size: valSize.name[0],
                //         color: valSize.name[1],
                //         number: valSize.numbers
                //       }]
                //     }]
                //   })
                // } else {
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
        // 初始化实际装箱数量
        packagNumberInfo.forEach(item => {
          let flag = this.batchList.find(key => key.id === item.batch_id)
          if (flag) {
            flag.product_info = JSON.parse(item.product_info)
            flag.packag_time = item.updated_at.split(' ')[0]
          }
        })
      })
    },
    chazhi (planNumber, packNumber) {
      if (!packNumber) {
        return '暂无数据'
      } else {
        if (Number(planNumber) > Number(packNumber)) {
          let num = planNumber - packNumber
          return '短装' + num + '条'
        } else if (Number(planNumber) < Number(packNumber)) {
          let num = (planNumber - packNumber) * -1
          return '多装' + num + '条'
        } else {
          return '正常装箱'
        }
      }
    },
    appendPack (id) {
      this.id = id
      this.show = true
    },
    timeGet (time, packTime) {
      let nowTime = packTime ? new Date(packTime).getTime() : new Date().getTime()
      console.log(nowTime, packTime)
      let times = (nowTime - (new Date(time).getTime())) / 1000 / 60 / 60 / 24
      if (times > 0) {
        if (packTime) {
          return '超时' + Math.floor(times) + '天'
        } else {
          return '延期' + Math.floor(times) + '天'
        }
      } else {
        if (packTime) {
          return '正常出库'
        } else {
          return '剩余' + Math.floor(times) * -1 + '天'
        }
      }
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
      console.log(idName)
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
      }),
      packagDetail({
        order_id: this.$route.params.id
      }),
      outStockDetail({
        order_id: this.$route.params.id
      }),
      packagNumberDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      this.loading = true
      let orderInfo = res[0].data.data
      let packagInfo = res[1].data.data
      let outStockInfo = res[2].data.data
      let packagNumberInfo = res[3].data.data
      // console.log('orderInfo', orderInfo)
      console.log('packagInfo', packagInfo)
      console.log('outStockInfo', outStockInfo)
      console.log('packagNumberInfo', packagNumberInfo)
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
                packagInfoList: [],
                outStockInfoList: [],
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
      // 初始化实际装箱数量
      packagNumberInfo.forEach(item => {
        let flag = this.batchList.find(key => key.id === item.batch_id)
        if (flag) {
          flag.product_info = JSON.parse(item.product_info)
          flag.packag_time = item.updated_at.split(' ')[0]
        }
      })
      // 初始化包装信息
      packagInfo.forEach(item => {
        let flag = this.batchList.find(key => key.id === item.bacth_id)
        if (flag) {
          item.product_info = JSON.parse(item.product_info)
          console.log(item)
          flag.packagInfoList.push(item)
        }
      })
      // 初始化出库信息
      outStockInfo.forEach(item => {
        let flag = this.batchList.find(key => key.id === item.batch_id)
        if (flag) {
          flag.outStockInfoList.push(item)
        }
      })
      console.log('batchList', this.batchList)
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/semiExaminationDetail.less";
</style>
