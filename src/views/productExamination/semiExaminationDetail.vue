<template>
  <div id="semiExaminationDetail"
    v-loading="loading">
    <div class="head">
      <h2>半成品检验详情</h2>
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
        <div class="stepTitle">产品织造信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <template v-if="productList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn">
                  <li class="title">
                    <span>产品编号</span>
                    <span class="flex17">产品类别</span>
                    <span class="flex45">
                      <span>尺码颜色</span>
                      <span class="flex4">
                        <span class="flex13">生产单位</span>
                        <span>计划生产数量</span>
                        <span>已入库数量</span>
                        <span>计划完成时间</span>
                      </span>
                    </span>
                    <span class="flex17">操作</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in productList"
                    :key="key">
                    <span class="tableRow blue"
                      @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                    <span class="tableRow flex17">{{item.product_class}}</span>
                    <span class="tableRow col flex45">
                      <span v-for="(val,ind) in item.size_info"
                        :key="ind"
                        class="tableColumn">
                        <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                        <span class="tableRow col flex4">
                          <span v-for="(value,index) in val.production_info"
                            :key='index'
                            class="tableColumn">
                            <span class="tableRow flex13">{{value.production_client}}</span>
                            <span class="tableRow">{{value.plan_number}}{{'条'}}</span>
                            <span class="tableRow">{{value.goStock_number ? value.goStock_number : '0'}}{{'条'}}</span>
                            <span class="tableRow">{{value.compiled_time}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow flex17">
                      <span class="blue"
                        @click="go(item.product_code)">显示详情</span>
                      <span class="blue"
                        @click="$router.push('/index/semiExamination/' + $route.params.id + '/' +item.product_code)">半成品检验</span>
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
      <div class="stepCtn"
        v-for="(item,key) in productList"
        :key="key"
        :id="item.product_code">
        <div class="stepTitle"
          id="product1">产品{{chinaNumber(key + 1) }}</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"
            v-if="key !== productList.length -1"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex55">
                    <span>尺码颜色</span>
                    <span class="flex45">
                      <span class="flex13">生产单位</span>
                      <span class="flex13">计划生产数量</span>
                      <span>已检验数量</span>
                      <span>次品数量</span>
                      <span>次品率</span>
                      <span>检验状态</span>
                    </span>
                  </span>
                </li>
                <!-- <li v-if="list.orderList.length === 0">暂无信息</li> -->
                <li class="content">
                  <span class="tableRow"
                    style="line-height:1.5em;">
                    <div>
                      <span class="blue"
                        @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                      <span>{{item.product_class}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex55">
                    <span v-for="(value,index) in item.size_info"
                      :key="index"
                      class="tableColumn">
                      <span class="tableRow">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="tableRow flex45 col">
                        <span v-for="(val,ind) in value.production_info"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow flex13">{{val.production_client}}</span>
                          <span class="tableRow flex13">{{val.plan_number}}{{'条'}}</span>
                          <span class="tableRow">{{val.test_number ? val.test_number : 0}}{{'条'}}</span>
                          <span class="tableRow">{{val.defective_number ? val.defective_number : 0}}{{'条'}}</span>
                          <span class="tableRow">{{((val.defective_number ? val.defective_number : 0)/(val.test_number ? val.test_number : 0)) ? (((val.defective_number ? val.defective_number : 0)/(val.test_number ? val.test_number : 0)*100)).toFixed(2) : 0}}{{'%'}}</span>
                          <span :class="{'tableRow':true,'compiled':(val.test_number ? val.test_number : 0) >= val.plan_number,'unCompiled':val.plan_number > (val.test_number ? val.test_number : 0)}">{{(val.test_number ? val.test_number : 0) >= val.plan_number ? '完成' : '未完成'}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                  @click="item.flag = !item.flag">{{ item.flag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="item.flag">
                <div>
                  <li>
                    <span class="flexBig">检验日期</span>
                    <span>生产单位</span>
                    <span>尺码颜色</span>
                    <span class="flexMid">检验件数</span>
                    <span class="flexMid">检验数量</span>
                    <span class="flexMid">次品数量</span>
                    <span class="flexBig">次品原因</span>
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
                    <span class="flexMid blue"
                      @click="changeData(item,index)">修改</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/semiExamination/' + $route.params.id + '/' +item.product_code)">
                  <img class="icon"
                    v-if="flag"
                    src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/order_disabled.png">
                  <span>去检验</span>
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
    <div class="shade"
      v-show='showShade'>
      <div class="main">
        <div class="close"
          @click="showShade=false">
          <span class="icon">x</span>
        </div>
        <div class="title">{{showShade === 'add' ? '添加新' : '修改'}}角色权限</div>
        <div class="content">
          <div class="inputCtn">
            <span class="label">产品名称:</span>
            <div class="elCtn">{{changeDataInfo.product_code}}({{changeDataInfo.product_type}})</div>
          </div>
          <div class="inputCtn">
            <span class="label">尺码/颜色:</span>
            <div class="elCtn">{{changeDataInfo.sizeColor}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">生产单位:</span>
            <div class="elCtn">{{changeDataInfo.client_name}}</div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>件数:</span>
            <div class="elCtn">
              <el-input placeholder="请输入件数"
                v-model="changeDataInfo.count"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>检验数量:</span>
            <div class="elCtn">
              <el-input placeholder="请输入检验数量"
                v-model="changeDataInfo.number"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label"><em>*</em>次品信息:</span>
            <div class="elCtn">
              <div v-for="(val,ind) in changeDataInfo.rejects_info"
                :key="ind"
                :style="{'margin-top':(ind !== 0) ? '20px' : false}">
                <el-input placeholder="数量"
                  v-model="val.number"
                  style="width:100px;">
                </el-input>
                <span>—</span>
                <el-select v-model="val.defective_why"
                  placeholder="次品原因"
                  style="width:186px;">
                  <el-option v-for="color in defectiveType"
                    :key="color.value"
                    :value="color">
                  </el-option>
                </el-select>
                <em v-if="ind === 0"
                  class="el-icon-plus"
                  @click="appendDefectiveInfo"></em>
                <em v-else
                  class="el-icon-delete"
                  @click="deleteDefectiveInfo(ind)"></em>
              </div>
            </div>
          </div>
          <div class="inputCtn">
            <span class="label">备注信息:</span>
            <div class="elCtn">
              <el-input placeholder="请输入备注信息"
                v-model="changeDataInfo.remark"
                style="width:300px">
              </el-input>
            </div>
          </div>
          <div class="btnCtn">
            <div class="okBtn"
              @click="submit">修改</div>
            <div class="cancleBtn"
              @click="showShade=false">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defectiveType } from '@/assets/js/dictionary.js'
import { orderDetail, weaveDetail, semiExaminationDetail, storeInList, storeOutList, semiExamination } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      flag: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      productList: [],
      changeDataInfo: {},
      showShade: false,
      defectiveType: defectiveType
    }
  },
  methods: {
    appendDefectiveInfo () {
      this.changeDataInfo.rejects_info.push({
        number: null,
        defective_why: ''
      })
    },
    deleteDefectiveInfo (ind) {
      this.changeDataInfo.rejects_info.splice(ind, 1)
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
    },
    changeData (item, index) {
      this.showShade = true
      this.changeDataInfo = JSON.parse(JSON.stringify(item.log[index]))
      this.changeDataInfo.product_code = item.product_code
      this.changeDataInfo.product_type = item.product_class
    },
    submit () {
      let data = []
      let flag = true
      if (!this.changeDataInfo.count) {
        this.$message.error('请输入件数')
      }
      if (!this.changeDataInfo.number) {
        this.$message.error('请输入检验数量')
      }
      this.changeDataInfo.rejects_info.forEach(item => {
        if (item.number && !item.defective_why) {
          this.$message.error('请选择次品原因')
          flag = false
        }
      })
      data.push({
        order_id: this.$route.params.id,
        user_id: window.sessionStorage.getItem('user_id'),
        product_code: this.changeDataInfo.product_code,
        size: this.changeDataInfo.sizeColor.split('/')[0],
        color: this.changeDataInfo.sizeColor.split(this.changeDataInfo.sizeColor.split('/')[0] + '/')[1],
        client_id: this.changeDataInfo.client_id,
        user_inspection: window.sessionStorage.getItem('user_id'),
        count: this.changeDataInfo.count,
        number: this.changeDataInfo.number,
        rejects_info: JSON.stringify(this.changeDataInfo.rejects_info.filter(item => item.number !== null)),
        desc: this.changeDataInfo.remark
      })
      if (flag) {
        semiExamination({
          data: data,
          id: this.changeDataInfo.id
        }).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: `修改成功!`
            })
            this.showShade = false
            this.getData()
          }
        })
      }
    },
    getData () {
      this.loading = true
      this.productList = []
      Promise.all([
        orderDetail({
          id: this.$route.params.id
        }),
        weaveDetail({
          order_id: this.$route.params.id
        }),
        semiExaminationDetail({
          order_id: this.$route.params.id
        }),
        storeInList({
          order_id: this.$route.params.id
        }),
        storeOutList({
          order_id: this.$route.params.id
        })
      ]).then(res => {
        let orderInfo = res[0].data.data
        let weaveInfo = res[1].data.data
        let semiInfo = res[2].data.data
        let goStockInfo = res[3].data.data
        let outStockInfo = res[4].data.data
        // 初始化订单信息
        this.order_code = orderInfo.order_code
        this.client_name = orderInfo.client_name
        this.order_time = orderInfo.order_time
        this.group_name = orderInfo.group_name
        // 匹配产品织造信息
        weaveInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (!flag) {
            let type = item.product_info.category_name + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_name ? '/' + item.product_info.flower_name : '')
            this.productList.push({
              product_code: item.product_info.product_code,
              product_class: type,
              flag: false,
              log: [],
              size_info: [{
                size: item.size,
                color: item.color,
                production_info: [{
                  plan_number: item.number,
                  client_id: item.client_id,
                  production_client: item.client_name,
                  compiled_time: item.complete_time.split(' ')[0]
                }]
              }]
            })
          } else {
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (!flag1) {
              flag.size_info.push({
                size: item.size,
                color: item.color,
                production_info: [{
                  plan_number: item.number,
                  client_id: item.client_id,
                  production_client: item.client_name,
                  compiled_time: item.complete_time.split(' ')[0]
                }]
              })
            } else {
              let flag2 = flag1.production_info.find(key => key.production_client === item.client_name)
              if (!flag2) {
                flag1.production_info.push({
                  plan_number: item.number,
                  client_id: item.client_id,
                  production_client: item.client_name,
                  compiled_time: item.complete_time.split(' ')[0]
                })
              } else {
                flag2.plan_number = Number(flag2.plan_number) + Number(item.number)
              }
            }
          }
        })
        // 初始化已检验数量与次品数量
        semiInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (flag) {
            let log = {}
            log.time = item.created_at
            log.client_name = item.client_name
            log.client_id = item.client_id
            log.sizeColor = item.size + '/' + item.color
            log.count = item.count
            log.number = item.number
            log.remark = item.desc
            log.tester = item.user_inspection
            log.id = item.id
            log.rejects_info = JSON.parse(item.rejects_info)
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (flag1) {
              let flag2 = flag1.production_info.find(key => key.production_client === item.client_name)
              if (flag2) {
                flag2.test_number = Number(flag2.test_number ? flag2.test_number : 0) + Number(item.number)
                item.rejects_info = JSON.parse(item.rejects_info)
                item.rejects_info.forEach((value, index) => {
                  log.defective_number = Number(log.defective_number ? log.defective_number : 0) + Number(value.number)
                  if (!log.defective_why) {
                    log.defective_why = ''
                  }
                  log.defective_why += (value.number ? ((index !== 0 ? '，' : '') + value.number + '条' + value.defective_why) : '')
                  flag2.defective_number = Number(flag2.defective_number ? flag2.defective_number : 0) + Number(value.number)
                })
              }
            }
            flag.log.push(log)
          }
        })
        // 统计入库数量
        goStockInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (flag) {
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (flag1) {
              let flag2 = flag1.production_info.find(key => key.production_client === item.client_name)
              if (flag2) {
                flag2.goStock_number = Number(flag2.goStock_number ? flag2.goStock_number : 0) + Number(item.number)
              }
            }
          }
        })
        outStockInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (flag) {
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (flag1) {
              let flag2 = flag1.production_info.find(key => key.production_client === item.client_name)
              if (flag2) {
                flag2.goStock_number = Number(flag2.goStock_number ? flag2.goStock_number : 0) - item.number
              }
            }
          }
        })
        this.loading = false
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/semiExaminationDetail.less";
</style>
<style lang="less" scoped>
#semiExaminationDetail {
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
      }
      .content {
        height: 514px;
        overflow-y: scroll;
        .inputCtn {
          margin: 20px;
          position: relative;
          font-size: 16px;
          padding-left: 5em;
          height: auto;
          line-height: 40px;
          color: #666;
          .label {
            position: absolute;
            left: 0;
            text-align: right;
            width: 5em;
            color: #666;
            & > em {
              color: #f56c6c;
              line-height: 40px;
              margin-right: 2px;
              vertical-align: -4px;
            }
          }
          .elCtn {
            margin-left: 15px;
            width: 400px;
            height: auto;
            em {
              padding: 5px;
              margin-left: 20px;
              cursor: pointer;
              &:hover {
                background-color: #1a95ff;
                color: #fff;
                border-radius: 50%;
              }
            }
          }
        }
        .btnCtn {
          margin: 40px 0;
          display: flex;
          justify-content: center;
          .okBtn {
            margin: 0 30px;
          }
        }
      }
    }
  }
}
</style>
