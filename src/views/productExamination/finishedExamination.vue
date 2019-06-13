<template>
  <div id="finishedExamination"
    v-loading="loading">
    <div class="head">
      <h2>成品检验</h2>
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
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex2">产品品类</span>
                  <span class="flex4">
                    <span>发货批次</span>
                    <span>发货日期</span>
                    <span class="flex2">
                      <span>尺码/颜色</span>
                      <span>发货数量</span>
                    </span>
                  </span>
                </li>
                <li v-if="productList.length === 0">暂无信息</li>
                <li class="content">
                  <span class="tableRow blue"
                    @click="$router.push('/index/productDetail/' + productList.product_code)">{{productList.product_code}}</span>
                  <span class="flex2 tableRow">{{productList.type}}</span>
                  <span class="tableRow flex4 col">
                    <span v-for="(value,index) in productList.batch_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow">{{'第'}}{{chinaNumber[value.batch_id]}}{{'批'}}</span>
                      <span class="tableRow">{{value.delivery_time}}</span>
                      <span class="flex2 tableRow col">
                        <span v-for="(item,key) in value.size_info"
                          :key="key"
                          class="tableColumn">
                          <span class="tableRow">{{item.size}}{{'/'}}{{item.color}}</span>
                          <span class="tableRow">{{item.number ? item.number : 0}}{{'条'}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品检验</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex12">产品品类</span>
                  <span class="flex3">
                    <span>尺码颜色</span>
                    <span>下单数量</span>
                    <span>已检验数量</span>
                    <span>次品数量</span>
                  </span>
                </li>
                <li class="content">
                  <span class="tableRow blue"
                    @click="$router.push('/index/productDetail/' + list.product_code)">{{list.product_code}}</span>
                  <span class="tableRow flex12">{{list.product_class}}</span>
                  <span class="tableRow col flex3">
                    <span v-for="(item,key) in list.size_info"
                      :key="key"
                      class="tableColumn">
                      <span class="tableRow">{{item.size}}{{'/'}}{{item.color}}</span>
                      <span class="tableRow">{{item.number ? item.number : 0 }}{{'条'}}</span>
                      <span class="tableRow">{{item.test_number ? item.test_number : 0}}{{'条'}}</span>
                      <span class="tableRow">{{item.defective_number ? item.defective_number : 0}}{{'条'}}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="testInfo">
            <ul class="testFrom"
              v-for="(item,kay) in this.list.testInfo"
              :key="kay">
              <li>
                <span>检验人员</span>:
                <el-select v-model="item.tester_name"
                  placeholder="请选择检验人员"
                  size="small">
                  <el-option v-for="tester in options.testerList"
                    :key="tester.value"
                    :value="tester">
                  </el-option>
                </el-select>
              </li>
              <li v-for="(value,index) in item.testSizeInfo"
                :key="index"
                class="col"
                style="border-top:1px solid #DDD">
                <div>
                  <span>颜色尺码</span>:
                  <el-select v-model="value.color"
                    placeholder="颜色/尺码"
                    size="small"
                    style="margin-left:15px;width:243px;">
                    <el-option v-for="color in options.colorList"
                      :key="color.value"
                      :value="color">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>检验数量</span>:
                  <el-input size="small"
                    style="margin-left:15px;width:243px;"
                    placeholder="请输入检验数量"
                    v-model="value.value">
                  </el-input>
                </div>
                <template v-for="(val,ind) in value.defective_info">
                  <div :key="ind">
                    <span>次品</span>:
                    <el-input size="small"
                      placeholder="数量"
                      v-model="val.number"
                      style="margin-left:15px;">
                    </el-input>
                    <strong>—</strong>
                    <el-select v-model="val.defective_why"
                      placeholder="次品原因"
                      size="small">
                      <el-option v-for="defective in options.defectiveList"
                        :key="defective.value"
                        :value="defective">
                      </el-option>
                    </el-select>
                    <em v-if="ind === 0"
                      class="el-icon-plus"
                      style="right:-35px;top:5px;"
                      @click="appendDefectiveInfo(kay,index)"></em>
                    <em v-else
                      class="el-icon-delete"
                      style="right:-35px;top:5px;"
                      @click="deleteDefectiveInfo(kay,index,ind)"></em>
                  </div>
                  <div :key="ind + 'x'">
                    <span>次品承担</span>:
                    <el-select v-model="val.assume_client"
                      placeholder="请选择次品承担单位"
                      size="small"
                      style="margin-left:15px;width:243px;">
                      <el-option v-for="client in options.clientList"
                        :key="client.value"
                        :value="client">
                      </el-option>
                    </el-select>
                  </div>
                </template>
                <span class="tag">颜色/尺码{{index + 1}}</span>
                <em v-if="index === 0"
                  class="el-icon-plus"
                  @click="appendTestSizeInfo(kay)"></em>
                <em v-else
                  class="el-icon-delete"
                  @click="deleteTestSizeInfo(kay,index)"></em>
              </li>
              <li>
                <span>备注</span>:
                <el-input type="textarea"
                  placeholder="请输入内容"
                  style="width:243px;margin: 0 0 0 15px;height:45px;"
                  v-model="item.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                @click="deleteTestInfo(kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addTestInfo">
            <span>+</span>
            <span>检验人员</span>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, halfProductDetail, finishedExamination, finishedExaminationDetail, authList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: {},
      save: true,
      list: {
        testInfo: []
      },
      chinaNumber: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      },
      options: {
        testerList: [],
        clientList: [],
        colorList: [],
        defectiveList: ['破损', '色差', '质量问题', '有污渍']
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
    appendDefectiveInfo (kay, key) {
      this.list.testInfo[kay].testSizeInfo[key].defective_info.push({
        number: '',
        defective_why: '',
        assume_client: ''
      })
    },
    deleteDefectiveInfo (kay, key, index) {
      this.list.testInfo[kay].testSizeInfo[key].defective_info.splice(index, 1)
    },
    appendTestSizeInfo (kay) {
      this.list.testInfo[kay].testSizeInfo.push({
        color: '',
        value: '',
        defective_info: [{
          number: '',
          defective_why: '',
          assume_client: ''
        }]
      })
    },
    deleteTestSizeInfo (kay, index) {
      this.list.testInfo[kay].testSizeInfo.splice(index, 1)
    },
    addTestInfo () {
      this.list.testInfo.push(
        {
          remark: '',
          tester_name: '',
          testSizeInfo: [
            {
              color: '',
              value: '',
              defective_info: [{
                number: '',
                defective_why: '',
                assume_client: ''
              }]
            }
          ]
        }
      )
    },
    deleteTestInfo (kay) {
      this.list.testInfo.splice(kay, 1)
    },
    saveAll () {
      if (this.save) {
        this.save = false
        let flag = true
        let data = []
        console.log(this.list)
        this.list.testInfo.forEach(item => {
          item.testSizeInfo.forEach(value => {
            // value.defective_info.forEach(val => {
            let arr = {}
            arr.order_id = this.$route.params.id
            arr.user_id = window.sessionStorage.getItem('user_id')
            arr.product_code = this.$route.params.product_code
            if (!item.tester_name) {
              this.$message({
                type: 'error',
                message: `请选择检验人员`
              })
              flag = false
              return
            }
            if (!value.color) {
              this.$message({
                type: 'error',
                message: `请选择尺码颜色`
              })
              flag = false
              return
            }
            if (!value.value) {
              this.$message({
                type: 'error',
                message: `请输入检验数量`
              })
              flag = false
              return
            }
            arr.size = value.color.split('/')[0]
            arr.color = value.color.split('/')[1]
            arr.user_inspection = item.tester_name
            arr.number = value.value
            arr.rejects_info = JSON.stringify(value.defective_info)
            arr.desc = item.remark
            data.push(arr)
            // })
          })
        })
        if (flag) {
          if (this.list.testInfo.length === 0) {
            this.$message({
              type: 'warning',
              message: `无可提交数据！`
            })
          } else {
            finishedExamination({
              data: data
            }).then(res => {
              console.log(res)
              if (res.data.status) {
                this.$message({
                  type: 'success',
                  message: `添加成功，即将跳转至详情页。`
                })
                setTimeout(() => {
                  this.$router.push('/index/finishedExaminationDetail/' + this.$route.params.id)
                }, 800)
              }
            })
          }
        }
        console.log(data)
        setTimeout(() => { this.save = true }, 1000)
      } else {
        this.$alert('请求速度过于频繁', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请于1s后重新请求`
            })
          }
        })
      }
    }
  },
  created () {
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }),
      halfProductDetail({
        order_id: this.$route.params.id
      }),
      finishedExaminationDetail({
        order_id: this.$route.params.id
      }),
      authList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      let clientInfo = res[1].data.data
      let finishedInfo = res[2].data.data
      // console.log('orderInfo', orderInfo)
      console.log('clientInfo', clientInfo)
      console.log('finishedInfo', finishedInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化检验人员数据
      res[3].data.data.forEach(item => {
        if (item.station_id === 4) {
          this.options.testerList.push(item.name)
        }
      })
      // 初始化产品信息
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          value.size.forEach(val => {
            if (this.$route.params.product_code === value.productCode) {
              this.productList.product_code = value.productCode
              this.productList.type = value.productInfo.category_info.product_category + '/' + value.productInfo.type_name + '/' + value.productInfo.style_name + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
              if (!this.productList.batch_info) {
                this.productList.batch_info = []
              }
              let flag = this.productList.batch_info.find(key => key.batch_id === item.batch_id)
              if (!flag) {
                this.productList.batch_info.push({
                  batch_id: item.batch_id,
                  delivery_time: item.delivery_time,
                  size_info: [{
                    size: val.name[0],
                    color: val.name[1],
                    number: val.numbers
                  }]
                })
              } else {
                let flag1 = flag.size_info.find(key => (key.size === val.name[0] && key.color === val.name[1]))
                if (!flag1) {
                  flag.size_info.push({
                    size: val.name[0],
                    color: val.name[1],
                    number: val.numbers
                  })
                } else {
                  flag1.number = Number(flag1.number) + Number(val.numbers)
                }
              }
              // 初始化颜色尺码数组
              let sizeColor = this.options.colorList.find(key => key === (val.name[0] + '/' + val.name[1]))
              if (!sizeColor) {
                this.options.colorList.push((val.name[0] + '/' + val.name[1]))
              }
            }
          })
        })
      })
      this.list.product_code = this.productList.product_code
      this.list.product_class = this.productList.type
      this.productList.batch_info.forEach(item => {
        item.size_info.forEach(value => {
          if (!this.list.size_info) {
            this.list.size_info = []
          }
          let flag = this.list.size_info.find(key => (key.size === value.size && key.color === value.color))
          if (!flag) {
            this.list.size_info.push({
              size: value.size,
              color: value.color,
              number: value.number
            })
          } else {
            flag.number = Number(flag.number) + Number(value.number)
          }
        })
      })
      // 初始化次品承担单位数组
      clientInfo.forEach(item => {
        if (item.product_info.product_code === this.list.product_code) {
          let flag = this.options.clientList.find(key => key === item.client_name)
          if (!flag) {
            this.options.clientList.push(item.client_name)
          }
        }
      })
      console.log(this.list)
      // 初始化检验数量与次品数量
      finishedInfo.forEach(item => {
        if (item.product_info.product_code === this.list.product_code) {
          let flag = this.list.size_info.find(key => (key.size === item.size && key.color === item.color))
          if (flag) {
            flag.test_number = Number(flag.test_number ? flag.test_number : 0) + Number(item.number)
            JSON.parse(item.rejects_info).forEach(value => {
              flag.defective_number = Number(flag.defective_number ? flag.defective_number : 0) + Number(value.number)
            })
          }
        }
      })
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/finishedExamination.less";
</style>
