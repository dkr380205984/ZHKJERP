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
                  <span class="tableRow blue">{{this.productList.product_code}}</span>
                  <span class="flex2 tableRow">{{this.productList.product_class}}</span>
                  <span class="tableRow flex4 col">
                    <span v-for="(value,index) in this.productList.size_info"
                          :key='index'
                          class="tableColumn">
                      <span class="tableRow flex12">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="flex3 tableRow col">
                        <span v-for="(item,key) in value.production_info"
                              :key="key"
                              class="tableColumn">
                          <span class="tableRow flex12">{{item.production_client}}</span>
                          <span class="tableRow">{{item.production_number}}{{'条'}}</span>
                          <span class="tableRow">{{item.goStock_number}}{{'条'}}</span>
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
                    <span>生产单位</span>
                    <span>生产数量</span>
                    <span>已入库数量</span>
                  </span>
                </li>
                <li class="content">
                  <span class="tableRow blue">{{list.product_code}}</span>
                  <span class="tableRow flex12">{{list.product_class}}</span>
                  <span class="tableRow col flex3">
                    <span v-for="(item,key) in list.size_info"
                          :key="key"
                          class="tableColumn">
                      <span class="tableRow">{{item.size}}{{'/'}}{{item.color}}</span>
                      <span class="tableRow">{{item.production_number}}{{'条'}}</span>
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
                  <el-option v-for="value in options.testType"
                             :key="value.value"
                             :value="value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>检验人员</span>:
                <el-select v-model="item.tester_name"
                           placeholder="请选择加工单位"
                           size="small">
                  <el-option v-for="value in options.companyList"
                             :key="value.value"
                             :label="value.name"
                             :value="value.id">
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
                    <el-option v-for="color in options.colorList"
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
            <span>添加公司</span>
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
import { } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      order_code: '11111',
      order_time: '111111',
      client_name: '111111',
      group_name: '111111',
      productList: {
        product_code: 'ESKLKF454',
        product_class: '围巾/长巾/针织/千格鸟',
        size_info: [
          {
            size: '儿童款',
            color: '深绿',
            production_info: [
              {
                production_client: '桐庐凯瑞',
                production_number: 1000,
                goStock_number: 200
              }, {
                production_client: '桐庐凯瑞',
                production_number: 1000,
                goStock_number: 200
              }
            ]
          }, {
            size: '成人款',
            color: '本白',
            production_info: [
              {
                production_client: '桐庐凯瑞',
                production_number: 1000,
                goStock_number: 200
              }, {
                production_client: '桐庐凯瑞',
                production_number: 1000,
                goStock_number: 200
              }
            ]
          }
        ]
      },
      list: {
        testInfo: []
      },
      options: {
        testType: ['倒纱', '裁剪', '染色'],
        companyList: [],
        colorList: {}
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
  // watch: {
  //   list: {
  //     deep: true,
  //     handler: function () {
  //       this.list.forEach((item, key) => {
  //         let num = 0
  //         item.testInfo.forEach(value => {
  //           value.testSizeInfo.forEach(val => {
  //             num += Number(val.value)
  //           })
  //         })
  //         item.select_number = num
  //       })
  //     }
  //   }
  // },
  methods: {
    // watchAll (value, item, kay, key) {
    //   if (value === '所有颜色') {
    //     let obj = this.materialList.find(val => val.material === item).need
    //     let arr = this.list.find(val => val.material === item)
    //     arr.testInfo[kay].testSizeInfo = []
    //     obj.forEach(item => {
    //       arr.testInfo[kay].testSizeInfo.push({
    //         color: item.name,
    //         value: Math.ceil(item.value)
    //       })
    //     })
    //   }
    // },
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
      } else {
        let self = this
        this.$alert('请求速度过于频繁', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请于1s后重新请求`
            })
          }
        })
        setTimeout(() => { self.save = true }, 1000)
      }
    }
  },
  created () {
    this.type = this.$route.params.type
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    // console.log(this.now_time)
    Promise.all([

    ]).then(res => {
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
              production_number: val.production_number,
              compiled_number: 0,
              defective_number: 0
            })
          } else {
            flag.production_number = Number(flag.production_number) + Number(val.production_number)
          }
        })
      })
      console.log(this.list)
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/semiExamination.less";
</style>
