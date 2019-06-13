<template>
  <div id="semiExamination"
    v-loading="loading">
    <div class="head">
      <h2>半成品检验</h2>
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
                    <span class="flex12">尺码颜色</span>
                    <span class="flex3">
                      <span class="flex12">生产单位</span>
                      <span>生产数量</span>
                      <span>已入库数量</span>
                    </span>
                  </span>
                </li>
                <li v-if="productList.length === 0">暂无信息</li>
                <li class="content">
                  <span class="tableRow blue"
                    @click="$router.push('/index/productDetail/' + productList.product_code)">{{productList.product_code}}</span>
                  <span class="flex2 tableRow">{{productList.product_class}}</span>
                  <span class="tableRow flex4 col">
                    <span v-for="(value,index) in productList.size_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow flex12">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="flex3 tableRow col">
                        <span v-for="(item,key) in value.production_info"
                          :key="key"
                          class="tableColumn">
                          <span class="tableRow flex12">{{item.production_client}}</span>
                          <span class="tableRow">{{item.plan_number ? item.plan_number : 0}}{{'条'}}</span>
                          <span class="tableRow">{{item.goStock_number ? item.goStock_number : 0}}{{'条'}}</span>
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
                    <span>生产数量</span>
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
                      <span class="tableRow">{{item.plan_number}}{{'条'}}</span>
                      <span class="tableRow">{{item.compiled_number}}{{'条'}}</span>
                      <span class="tableRow">{{item.defective_number}}{{'条'}}</span>
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
                <span>生产单位</span>:
                <el-select v-model="item.production_client"
                  placeholder="请选择生产单位"
                  size="small">
                  <el-option v-for="value in options.clientList"
                    :key="value.value"
                    :label="value.name"
                    :value="value.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>检验人员</span>:
                <el-select v-model="item.tester_name"
                  placeholder="请选择检验人员"
                  size="small">
                  <el-option v-for="value in options.testerList"
                    :key="value.value"
                    :value="value">
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
                    <el-option v-for="color in options.colorList[item.production_client]"
                      :key="color.value"
                      :value="color">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>件数/数量</span>:
                  <el-input size="small"
                    placeholder="件数"
                    v-model="value.value"
                    style="margin-left:15px;">
                  </el-input>
                  <strong>—</strong>
                  <el-input size="small"
                    placeholder="数量"
                    v-model="value.number">
                  </el-input>
                </div>
                <div v-for="(val,ind) in value.defective_info"
                  :key="ind">
                  <span>次品信息</span>:
                  <el-input size="small"
                    placeholder="数量"
                    v-model="val.number"
                    style="margin-left:15px;">
                  </el-input>
                  <strong>—</strong>
                  <el-select v-model="val.defective_why"
                    placeholder="次品原因"
                    size="small">
                    <el-option v-for="color in options.defectiveList"
                      :key="color.value"
                      :value="color">
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
            <span>添加单位</span>
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
import { orderDetail, weaveDetail, semiExamination, semiExaminationDetail, authList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      save: true,
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: {},
      list: {
        testInfo: []
      },
      options: {
        testerList: [],
        clientList: [],
        colorList: {},
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
        defective_why: ''
      })
    },
    deleteDefectiveInfo (kay, key, index) {
      this.list.testInfo[kay].testSizeInfo[key].defective_info.splice(index, 1)
    },
    appendTestSizeInfo (kay) {
      this.list.testInfo[kay].testSizeInfo.push({
        color: '',
        value: '',
        number: '',
        defective_info: [{
          number: '',
          defective_why: ''
        }]
      })
    },
    deleteTestSizeInfo (kay, index) {
      this.list.testInfo[kay].testSizeInfo.splice(index, 1)
    },
    addTestInfo () {
      this.list.testInfo.push(
        {
          production_client: '',
          remark: '',
          tester_name: '',
          testSizeInfo: [
            {
              color: '',
              value: '',
              number: '',
              defective_info: [{
                number: '',
                defective_why: ''
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
        console.log(this.list.testInfo)
        this.list.testInfo.forEach(item => {
          item.testSizeInfo.forEach(value => {
            let arr = {}
            arr.order_id = this.$route.params.id
            arr.user_id = window.sessionStorage.getItem('user_id')
            arr.product_code = this.$route.params.product_code
            if (!item.production_client) {
              this.$message({
                type: 'error',
                message: `请选择生产单位`
              })
              flag = false
              return
            }
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
                message: `请输入检验总件数`
              })
              flag = false
              return
            }
            if (!value.number) {
              this.$message({
                type: 'error',
                message: `请输入检验数量`
              })
              flag = false
              return
            }
            arr.size = value.color.split('/')[0]
            arr.color = value.color.split('/')[1]
            arr.client_id = item.production_client
            arr.user_inspection = item.tester_name
            arr.count = value.value
            arr.number = value.number
            arr.rejects_info = JSON.stringify(value.defective_info)
            arr.desc = item.remark
            data.push(arr)
          })
        })
        if (flag) {
          if (this.list.testInfo.length !== 0) {
            semiExamination({
              data: data
            }).then(res => {
              console.log(res)
              if (res.data.status) {
                this.$message({
                  type: 'success',
                  message: `添加成功，即将跳转至详情页。`
                })
                setTimeout(() => {
                  this.$router.push('/index/semiExaminationDetail/' + this.$route.params.id)
                }, 800)
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: `无可提交数据！`
            })
          }
        }
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
      weaveDetail({
        order_id: this.$route.params.id
      }),
      semiExaminationDetail({
        order_id: this.$route.params.id
      }),
      authList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      let weaveInfo = res[1].data.data
      let semiInfo = res[2].data.data
      // console.log('orderInfo', orderInfo)
      // console.log('weaveInfo', weaveInfo)
      console.log('semiInfo', semiInfo)
      // 初始化检验人员数据
      res[3].data.data.forEach(item => {
        if (item.station_id === 4) {
          this.options.testerList.push(item.name)
        }
      })
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 匹配产品织造信息
      weaveInfo.forEach(item => {
        if (this.$route.params.product_code === item.product_info.product_code) {
          this.productList.product_code = item.product_info.product_code
          this.productList.product_class = item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_id ? '/' + item.product_info.flower_id : '')
          if (!this.productList.size_info) {
            this.productList.size_info = []
          }
          let flag = this.productList.size_info.find(key => (key.size === item.size && key.color === item.color))
          if (!flag) {
            this.productList.size_info.push({
              size: item.size,
              color: item.color,
              production_info: [{
                plan_number: item.number,
                production_client: item.client_name
              }]
            })
          } else {
            let flag1 = flag.production_info.find(key => key.production_client === item.client_name)
            if (!flag1) {
              flag.production_info.push({
                plan_number: item.number,
                production_client: item.client_name
              })
            } else {
              flag1.plan_number = Number(flag1.plan_number) + Number(item.number)
            }
          }
          // 初始化生产单位数组
          let client = this.options.clientList.find(key => key.name === item.client_name)
          if (!client) {
            this.options.clientList.push({
              name: item.client_name,
              id: item.client_id
            })
          }
          // 初始化颜色尺码数组
          if (!this.options.colorList[item.client_id]) {
            let str = item.size + '/' + item.color
            this.options.colorList[item.client_id] = [str]
          } else {
            let str = item.size + '/' + item.color
            let sizeColor = this.options.colorList[item.client_id].find(key => key === str)
            if (!sizeColor) {
              this.options.colorList[item.client_id].push(str)
            }
          }
        }
      })
      this.list.product_code = this.productList.product_code
      this.list.product_class = this.productList.product_class
      this.productList.size_info.forEach(value => {
        value.production_info.forEach(val => {
          if (!this.list.size_info) {
            this.list.size_info = []
          }
          let flag = this.list.size_info.find(key => ((key.size === value.size) && (key.color === value.color)))
          if (!flag) {
            this.list.size_info.push({
              size: value.size,
              color: value.color,
              plan_number: val.plan_number,
              compiled_number: 0,
              defective_number: 0
            })
          } else {
            flag.plan_number = Number(flag.plan_number) + Number(val.plan_number)
          }
        })
      })
      console.log(this.list)
      semiInfo.forEach(item => {
        if (item.product_info.product_code === this.list.product_code) {
          let flag = this.list.size_info.find(key => (key.size === item.size && key.color === item.color))
          if (flag) {
            flag.compiled_number = Number(flag.compiled_number ? flag.compiled_number : 0) + Number(item.number)
            item.rejects_info = JSON.parse(item.rejects_info)
            item.rejects_info.forEach(value => {
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
@import "~@/assets/css/semiExamination.less";
</style>
