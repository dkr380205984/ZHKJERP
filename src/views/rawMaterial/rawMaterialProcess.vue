<template>
  <div id="rawMaterialProcess"
       v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原' : '辅'}}料加工</h2>
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
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品信息:</span>
            <span class="content">
              <ul class="productInfo">
                <li v-for="(item,key) in productList"
                    :key="key">
                  <span @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}({{item.type}})</span>
                  <span>{{item.product_size+'/'+item.product_color}}</span>
                  <span>{{item.number+'条'}}</span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料订购信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>计划原料</span>
                  <span class="flex2">
                    <span>颜色</span>
                    <span class="flex08">数量</span>
                  </span>
                  <span>总计划</span>
                  <span>已订购</span>
                </li>
                <li v-if="materialList.length === 0">暂无信息</li>
                <li v-for="(val,ind) in materialList"
                    :key="ind"
                    class="content">
                  <span class="tableRow">{{val.material}}</span>
                  <span class="flex2 tableRow col">
                    <span v-for="(va,inf) in val.need"
                          :key="inf"
                          class="tableColumn">
                      <span class="tableRow">{{va.name}}</span>
                      <span class="flex08 tableRow">{{va.value|fixedFilter}}{{val.unit}}</span>
                    </span>
                  </span>
                  <span class="tableRow">{{(val.total_weight ? val.total_weight : 0)|fixedFilter}}{{val.unit}}</span>
                  <span class="tableRow">{{(val.order_weight ? val.order_weight : 0)|fixedFilter}}{{val.unit}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料加工</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col"
             v-for="(item,key) in list"
             :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>{{type === '0' ? '原' : '辅'}}料名称</span>
              <span>{{type === '0' ? '原' : '辅'}}料颜色</span>
              <span>合计重量</span>
              <span>已选重量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material}}</span>
              <span>
                <template v-for="(value,index) in item.needColors">
                  {{(index === 0 ? '' : '/') + value}}
                </template>
              </span>
              <span>{{item.total_number|fixedFilter}}{{item.unit}}</span>
              <span>{{(Number(item.selectNums ? item.selectNums : 0) + Number(item.select_number))|fixedFilter}}{{item.unit}}</span>
            </div>
          </div>
          <div class="processInfo">
            <ul class="processFrom"
                v-for="(iten,kay) in item.processInfo"
                :key="kay">
              <li>
                <span>加工类型</span>:
                <el-select v-model="iten.process_type"
                           placeholder="请选择加工类型"
                           size="small">
                  <el-option v-for="value in options.processType"
                             :key="value.value"
                             :value="value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>加工单位</span>:
                <el-select v-model="iten.processCompany"
                           placeholder="请选择加工单位"
                           size="small">
                  <el-option v-for="value in options.companyList"
                             :key="value.value"
                             :label="value.name"
                             :value="value.id">
                  </el-option>
                </el-select>
              </li>
              <li v-for="(value,index) in iten.processMaterialInfo"
                  :key="index"
                  class="col">
                <div>
                  <span>{{type === '0' ? '原' : '辅'}}料信息</span>:
                  <el-select v-model="value.color"
                             placeholder="颜色"
                             size="small"
                             :change="watchAll(value.color,item.material,kay,key)">
                    <el-option v-for="color in options.colorList[item.material]"
                               :key="color.value"
                               :value="color">
                    </el-option>
                  </el-select>
                  <strong>—</strong>
                  <el-input size="small"
                            placeholder="数量"
                            v-model="value.value">
                  </el-input>
                </div>
                <em v-if="index === 0"
                    class="el-icon-plus"
                    @click="appendProcessMaterialInfo(key,kay)"></em>
                <em v-else
                    class="el-icon-delete"
                    @click="deleteProcessMaterialInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>总价</span>:
                <el-input size="small"
                          placeholder="总价"
                          v-model="iten.money">
                </el-input>
                <i>元</i>
              </li>
              <li>
                <span>订购日期</span>:
                <el-date-picker v-model="iten.orderTime"
                                align="right"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                size="small"
                                style="width:243px">
                </el-date-picker>
              </li>
              <li>
                <span>备注</span>:
                <el-input type="textarea"
                          placeholder="请输入内容"
                          style="width:243px;margin: 0 0 0 15px;height:45px;"
                          v-model="iten.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                    @click="deleteProcessInfo(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
               @click="addProcessInfo(key)">
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
import { orderDetail, rawMaterialProcessPage, clientList, rawMaterialOrderList, rawMaterialOrderInit } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      type: '',
      now_time: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: [],
      materialList: [],
      list: [],
      options: {
        processType: ['倒纱', '裁剪', '染色', '扦经', '拼线'],
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
      },
      save: true
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  watch: {
    list: {
      deep: true,
      handler: function () {
        this.list.forEach((item, key) => {
          let num = 0
          item.processInfo.forEach(value => {
            value.processMaterialInfo.forEach(val => {
              num += Number(val.value)
            })
          })
          item.select_number = num
        })
      }
    }
  },
  methods: {
    watchAll (value, item, kay, key) {
      if (value === '所有颜色') {
        let obj = this.materialList.find(val => val.material === item).need
        let arr = this.list.find(val => val.material === item)
        arr.processInfo[kay].processMaterialInfo = []
        obj.forEach(item => {
          arr.processInfo[kay].processMaterialInfo.push({
            color: item.name,
            value: Math.ceil(item.value)
          })
        })
      }
    },
    appendProcessMaterialInfo (key, kay) {
      this.list[key].processInfo[kay].processMaterialInfo.push({
        color: '',
        value: ''
      })
    },
    deleteProcessMaterialInfo (key, kay, index) {
      this.list[key].processInfo[kay].processMaterialInfo.splice(index, 1)
    },
    addProcessInfo (key) {
      this.list[key].processInfo.push(
        {
          processCompany: '',
          money: '',
          orderTime: this.now_time,
          remark: '',
          process_type: '',
          processMaterialInfo: [
            {
              color: '',
              value: ''
            }
          ]
        }
      )
    },
    deleteProcessInfo (key, kay) {
      this.list[key].processInfo.splice(kay, 1)
    },
    saveAll () {
      if (this.save) {
        this.save = false
        this.loading = true
        let arr = []
        let nums = 0
        let flag = true
        this.list.forEach((item, key) => {
          if (Number(item.total_number) < (Number(item.select_number) + Number(item.selectNums ? item.selectNums : 0))) {
            alert('已选数量超出订购数量，请重新输入。')
            flag = false
            return
          }
          let obj = {}
          obj.company_id = sessionStorage.company_id
          obj.order_id = this.$route.params.id
          obj.user_id = sessionStorage.user_id
          obj.type = (this.type === '0' ? 1 : 2)
          nums += item.processInfo.length
          obj.material_name = item.material
          item.processInfo.forEach((value, index) => {
            if (!value.process_type) {
              this.$message({
                message: '请选择加工类型',
                type: 'error'
              })
              flag = false
              return
            }
            obj.process_type = value.process_type
            if (!value.processCompany) {
              this.$message({
                message: '请选择加工单位',
                type: 'error'
              })
              flag = false
              return
            }
            obj.client_id = value.processCompany
            for (let prop in value.processMaterialInfo) {
              if (!value.processMaterialInfo[prop].color) {
                this.$message({
                  message: '请选择颜色',
                  type: 'error'
                })
                flag = false
                return
              }
              if (!value.processMaterialInfo[prop].value) {
                this.$message({
                  message: '请输入数量',
                  type: 'error'
                })
                flag = false
                return
              }
            }
            obj.material_info = JSON.stringify(value.processMaterialInfo)
            obj.total_price = value.money
            if (!value.orderTime) {
              this.$message({
                message: '请选择订购日期',
                type: 'error'
              })
              flag = false
              return
            }
            obj.order_time = value.orderTime
            obj.desc = value.remark
            arr.push({ ...obj })
          })
        })
        this.loading = false
        if (flag) {
          if (nums === 0) {
            this.$message({
              message: '无可提交的订购信息',
              type: 'warning'
            })
          } else {
            rawMaterialProcessPage({
              data: arr
            }).then(res => {
              if (res.data.status) {
                this.$message({
                  message: '添加成功,即将跳转至详情页',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type)
                }, 800)
              } else {
                this.$message({
                  message: '添加成功,即将跳转至详情页',
                  type: 'success'
                })
              }
            })
          }
        }
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
      rawMaterialOrderInit({
        order_id: this.$route.params.id
      }),
      rawMaterialOrderList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      }),
      orderDetail({
        id: this.$route.params.id
      }),
      clientList({
        company_id: sessionStorage.company_id
      })
    ]).then(res => {
      console.log(res)
      let materialInfo = res[0].data.data.material_info
      let orderInfo = res[2].data.data
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.order_time = orderInfo.order_time
      this.client_name = orderInfo.client_name
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      let arr = []
      orderInfo.order_batch.forEach((item, key) => {
        item.batch_info.forEach((value, index) => {
          let types = value.productInfo.category_info.product_category + (value.productInfo.type_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.style_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
          value.size.forEach((val, ind) => {
            arr.push({
              type: types,
              product_code: value.productCode,
              product_size: val.name[0],
              product_color: val.name[1],
              number: val.numbers
            })
          })
        })
      })
      arr.forEach(item => {
        let flag = this.productList.find(val => (val.product_code === item.product_code && val.product_size === item.product_size && val.product_color === item.product_color))
        if (!flag) {
          this.productList.push({ ...item })
        } else {
          flag.number = Number(flag.number) + Number(item.number)
        }
      })
      // 初始化物料订购信息
      materialInfo.forEach((item, key) => {
        for (let prop in item) {
          for (let value in item[prop]) {
            if (value !== 'total_number' && value !== 'type' && value !== 'unit') {
              if (item[prop].type === Number(this.type)) {
                let flag = this.materialList.find(val => val.material === prop)
                if (!flag) {
                  this.materialList.push({
                    material: prop,
                    total_weight: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value],
                    unit: (item[prop].unit === '克' || item[prop].unit === 'g') ? 'kg' : item[prop].unit === '千克' ? 'kg' : item[prop].unit,
                    need: [{
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value]
                    }]
                  })
                  this.options.colorList[prop] = ['所有颜色', value]
                } else {
                  flag.total_weight = Number(flag.total_weight) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value])
                  let arr = flag.need.find(val => val.name === value)
                  if (!arr) {
                    flag.need.push({
                      name: value,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value]
                    })
                    this.options.colorList[prop].push(value)
                  } else {
                    arr.value = Number(arr.value) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][value]) / 1000 : item[prop][value])
                  }
                }
              }
            }
          }
        }
      })
      res[1].data.data.forEach(item => {
        let flag = this.materialList.find(val => val.material === item.material_name)
        if (flag) {
          flag.order_weight = (flag.order_weight ? Number(flag.order_weight) : 0) + Number(item.weight)
        }
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          let arr = this.list.find(val => val.material === item.material_name)
          if (arr) {
            arr.total_number = Number(arr.total_number) + Number(item.weight)
          } else {
            this.list.push({
              material: item.material_name,
              needColors: [item.color_code],
              total_number: item.weight,
              select_number: 0,
              unit: (item.unit === null ? 'kg' : item.unit),
              processInfo: []
            })
          }
        }
      })
      // 加工公司列表初始化
      res[3].data.data.forEach((item, key) => {
        if (item.type === 3) {
          this.options.companyList.push(item)
        }
      })
      // 已加工数量初始化
      let selectWeight = res[0].data.data.total_weight_process
      for (let prop in selectWeight) {
        let flag = this.list.find(item => item.material === prop)
        if (flag) {
          flag.selectNums = selectWeight[prop] ? selectWeight[prop] : 0
        }
      }
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialProcess.less";
</style>
