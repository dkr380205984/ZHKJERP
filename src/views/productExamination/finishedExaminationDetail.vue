<template>
  <div id="finishedExaminationDetail"
    v-loading="loading">
    <div class="head">
      <h2>成品检验详情</h2>
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
        <div class="stepTitle">产品信息</div>
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
                      <span>尺码/颜色</span>
                      <span class="flex3">
                        <span>发货批次</span>
                        <span>发货数量</span>
                        <span>发货日期</span>
                      </span>
                      <span>已入库数量</span>
                    </span>
                    <span class="flex17">操作</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in productList"
                    :key="key">
                    <span class="tableRow blue"
                      @click="$router.push('/index/productDetail/' + item.product_id)">{{item.product_code}}</span>
                    <span class="tableRow flex17">{{item.type}}</span>
                    <span class="tableRow col flex45">
                      <span v-for="(val,ind) in item.size_info"
                        :key="ind"
                        class="tableColumn">
                        <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                        <span class="tableRow col flex3">
                          <span v-for="(value,index) in val.batch_info"
                            :key='index'
                            class="tableColumn">
                            <span class="tableRow">{{'第'}}{{chinaNumber(value.batch_id)}}{{'批'}}</span>
                            <span class="tableRow">{{value.number ? value.number : '0'}}{{'条'}}</span>
                            <span class="tableRow">{{value.delivery_time}}</span>
                          </span>
                        </span>
                        <span class="tableRow">{{val.goStock_number ? val.goStock_number : 0}}{{'条'}}</span>
                      </span>
                    </span>
                    <span class="tableRow flex17">
                      <span class="blue"
                        @click="go(item.product_code)">显示详情</span>
                      <span class="blue"
                        @click="$router.push('/index/finishedExamination/' + $route.params.id + '/' +item.product_code)">成品检验</span>
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
            v-if="key !== productList.length - 1"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex55">
                    <span>尺码颜色</span>
                    <span>已检验数量</span>
                    <span>次品数量</span>
                    <span class="flex45">
                      <span>发货批次</span>
                      <span>发货日期</span>
                      <span>发货数量</span>
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
                        @click="$router.push('/index/productDetail/' + item.product_id)">{{item.product_code}}</span>
                      <span>{{item.type}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex55">
                    <span v-for="(value,index) in item.size_info"
                      :key="index"
                      class="tableColumn">
                      <span class="tableRow">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="tableRow">{{value.test_number ? value.test_number : 0}}{{'条'}}</span>
                      <span class="tableRow">{{value.defective_number ? value.defective_number : 0}}{{'条'}}</span>
                      <span class="tableRow flex45 col">
                        <span v-for="(val,ind) in value.batch_info"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow">{{'第'}}{{chinaNumber(val.batch_id)}}{{'批'}}</span>
                          <span class="tableRow">{{val.delivery_time}}</span>
                          <span class="tableRow">{{val.number ? val.number : 0}}{{'条'}}</span>
                          <span :class="{'tableRow':true,'compiled':testStatus(key,index,val.number) >= 0,'unCompiled': (0 > testStatus(key,index,val.number))}"
                            v-once>{{testStatus(key,index,val.number) >= 0 ? '完成' : '未完成'}}</span>
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
                    <!-- <span class="flexMid">检验人员</span> -->
                    <span class="flexMid">尺码颜色</span>
                    <span class="flexMid">检验数量</span>
                    <span class="flexMid">次品数量</span>
                    <span class="flexBig">次品原因</span>
                    <span class="flexBig">次品承担单位</span>
                    <span class="flexBig">备注信息</span>
                    <span class="flexMid">操作人</span>
                    <span class="flexMid">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="item.log.length === 0">暂无信息</li>
                  <li v-for="(value,index) in item.log"
                    :key="index">
                    <span class="flexBig">{{value.time}}</span>
                    <!-- <span class="flexMid">{{value.tester}}</span> -->
                    <span class="flexMid">{{value.sizeColor}}</span>
                    <span class="flexMid">{{value.number}}{{'条'}}</span>
                    <span class="flexMid">{{value.defective_number}}{{'条'}}</span>
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
                        {{value.assume_client ? value.assume_client : '无'}}
                        <el-popover placement="top-end"
                          title="次品承担信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(value.assume_client) > 15"
                          :content="value.assume_client">
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
                    <span class="flexMid">{{value.user}}</span>
                    <span class="flexMid">
                      <span class="blue"
                        @click="changeData(item,index)">修改</span>
                      <span style="color:#F56C6C;cursor:pointer;margin-left:8px"
                        @click="deleteData(value)">删除</span>
                    </span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/finishedExamination/' + $route.params.id + '/' +item.product_code)">
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
        <div class="title">修改成品检验日志</div>
        <div class="content">
          <div class="inputCtn">
            <span class="label">产品名称:</span>
            <div class="elCtn">{{changeDataInfo.product_code}}({{changeDataInfo.product_type}})</div>
          </div>
          <div class="inputCtn">
            <span class="label">尺码/颜色:</span>
            <div class="elCtn">{{changeDataInfo.sizeColor}}</div>
          </div>

          <!-- <div class="inputCtn">
            <span class="label"><em>*</em>件数:</span>
            <div class="elCtn">
              <el-input placeholder="请输入件数"
                v-model="changeDataInfo.count"
                style="width:300px">
              </el-input>
            </div>
          </div> -->
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
              <template v-for="(val,ind) in changeDataInfo.rejects_info">
                <div :key="ind"
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
                <div :key="ind + 'x'"
                  style="margin-top:20px;">
                  <!-- <el-input placeholder="请输入检验数量"
                    v-model="val.assume_client"
                    style="width:300px">
                  </el-input> -->
                  <el-select v-model="val.assume_client"
                    placeholder="请选择次品承担单位"
                    style="width:300px;">
                    <el-option v-for="color in clientList"
                      :key="color.value"
                      :value="color">
                    </el-option>
                  </el-select>
                </div>
              </template>
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
import { orderDetail, finishedExaminationDetail, storeInList, storeOutList, halfProductDetail, finishedExamination, deleteFinishedExaminationLog } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      showShade: false,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      productList: [],
      flag: true,
      defectiveType: defectiveType,
      changeDataInfo: {},
      clientList: []
    }
  },
  methods: {
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
    testStatus (key, index, number) {
      return (this.productList[key].size_info[index].number ? this.productList[key].size_info[index].number : 0) - number
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
    appendDefectiveInfo () {
      this.changeDataInfo.rejects_info.push({
        assume_client: '',
        defective_why: '',
        number: ''
      })
    },
    deleteDefectiveInfo (index) {
      this.changeDataInfo.rejects_info.splice(index, 1)
    },
    changeData (item, index) {
      this.showShade = true
      this.changeDataInfo = JSON.parse(JSON.stringify(item.log[index]))
      this.changeDataInfo.product_code = item.product_code
      this.changeDataInfo.product_type = item.type
    },
    // 删除日志
    deleteData (item) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFinishedExaminationLog({
          id: item.id
        }).then(res => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            window.location.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submit () {
      let data = []
      let flag = true
      if (!this.changeDataInfo.number) {
        this.$message.error('请输入检验数量')
      }
      this.changeDataInfo.rejects_info.forEach(item => {
        if (item.number && !item.defective_why) {
          this.$message.error('请选择次品原因')
          flag = false
        } else if (item.number && !item.assume_client) {
          this.$message.error('请选择次品承担单位')
          flag = false
        }
      })
      data.push({
        order_id: this.$route.params.id,
        user_id: window.sessionStorage.getItem('user_id'),
        product_code: this.changeDataInfo.product_code,
        size: this.changeDataInfo.sizeColor.split('/')[0],
        color: this.changeDataInfo.sizeColor.split(this.changeDataInfo.sizeColor.split('/')[0] + '/')[1],
        // client_id: this.changeDataInfo.client_id,
        // user_inspection: this.changeDataInfo.tester,
        // count: this.changeDataInfo.count,
        number: this.changeDataInfo.number,
        rejects_info: JSON.stringify(this.changeDataInfo.rejects_info.filter(item => item.number !== null)),
        desc: this.changeDataInfo.remark
      })
      if (flag) {
        finishedExamination({
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
        finishedExaminationDetail({
          order_id: this.$route.params.id
        }),
        storeInList({
          order_id: this.$route.params.id
        }),
        storeOutList({
          order_id: this.$route.params.id
        }),
        halfProductDetail({
          order_id: this.$route.params.id
        })
      ]).then(res => {
        let orderInfo = res[0].data.data
        let finishedInfo = res[1].data.data
        let goStockInfo = res[2].data.data
        let outStockInfo = res[3].data.data
        let clientInfo = res[4].data.data
        // 初始化订单信息
        this.order_code = orderInfo.order_code
        this.client_name = orderInfo.client_name
        this.order_time = orderInfo.order_time
        this.group_name = orderInfo.group_name
        // 初始化产品信息
        for (let prop in orderInfo.order_batch) {
          let item = orderInfo.order_batch[prop]
          item.forEach(valPro => {
            let flag = this.productList.find(key => key.product_code === valPro.product_code)
            if (!flag) {
              let type = valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + (valPro.category_info.flower_name ? '/' + valPro.category_info.flower_name : '')
              this.productList.push({
                product_id: valPro.product_id,
                product_code: valPro.product_code,
                type: type,
                flag: false,
                log: [],
                size_info: [{
                  size: valPro.size,
                  color: valPro.color,
                  batch_info: [{
                    batch_id: valPro.batch_id,
                    delivery_time: valPro.delivery_time,
                    number: valPro.numbers
                  }]
                }]
              })
            } else {
              let flag1 = flag.size_info.find(key => (key.size === valPro.size && key.color === valPro.color))
              if (!flag1) {
                flag.size_info.push({
                  size: valPro.size,
                  color: valPro.color,
                  batch_info: [{
                    batch_id: valPro.batch_id,
                    delivery_time: valPro.delivery_time,
                    number: valPro.numbers
                  }]
                })
              } else {
                let flag2 = flag1.batch_info.find(key => key.batch_id === valPro.batch_id)
                if (!flag2) {
                  flag1.batch_info.push({
                    batch_id: valPro.batch_id,
                    delivery_time: valPro.delivery_time,
                    number: valPro.numbers
                  })
                } else {
                  flag2.number = Number(flag2.number) + Number(valPro.numbers)
                }
              }
            }
          })
        }
        // 初始化检验数量
        finishedInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (flag) {
            let log = {}
            log.id = item.id
            log.time = item.created_at
            // log.tester = item.user_inspection
            log.sizeColor = item.size + '/' + item.color
            log.number = item.number
            log.remark = item.desc
            log.user = item.user_name
            log.rejects_info = JSON.parse(item.rejects_info)
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (flag1) {
              flag1.test_number = Number(flag1.test_number ? flag1.test_number : 0) + Number(item.number)
              flag1.number = Number(flag1.number ? flag1.number : 0) + Number(item.number)
              JSON.parse(item.rejects_info).forEach((value, index) => {
                log.defective_number = Number(log.defective_number ? log.defective_number : 0) + Number(value.number)
                if (!log.defective_why) {
                  log.defective_why = ''
                }
                log.defective_why += (value.number ? ((index !== 0 ? '，' : '') + value.number + '条' + value.defective_why) : '')
                if (!log.assume_client) {
                  log.assume_client = ''
                }
                log.assume_client += (value.number ? ((index !== 0 ? '，' : '') + value.number + '条' + value.defective_why + '-' + value.assume_client) : '')
                flag1.defective_number = Number(flag1.defective_number ? flag1.defective_number : 0) + Number(value.number)
                flag1.number -= value.number
              })
            }
            flag.log.push(log)
          }
        })
        // 初始化入库数量
        goStockInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (flag) {
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (flag1) {
              flag1.goStock_number = Number(flag1.goStock_number ? flag1.goStock_number : 0) + Number(item.number)
            }
          }
        })
        outStockInfo.forEach(item => {
          let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
          if (flag) {
            let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
            if (flag1) {
              flag1.goStock_number = Number(flag1.goStock_number ? flag1.goStock_number : 0) - item.number
            }
          }
        })
        // 初始化次品承担单位数组
        clientInfo.forEach(item => {
          //   if (item.product_info.product_code === this.list.product_code) {
          let flag = this.clientList.find(key => key === item.client_name)
          if (!flag) {
            this.clientList.push(item.client_name)
          }
          //   }
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
@import "~@/assets/css/finishedExaminationDetail.less";
</style>
<style lang="less" scoped>
#finishedExaminationDetail {
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
