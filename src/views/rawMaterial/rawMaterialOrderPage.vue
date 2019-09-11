<template>
  <div id="rawMaterialOrderPage"
    v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原': '辅'}}料订购</h2>
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
            <span class="content">{{company_name}}</span>
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
                <template v-if="productList.length !== 0">
                  <li v-for="(item,key) in productList"
                    :key="key">
                    <span @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}({{item.type}})</span>
                    <span>{{item.product_size+'/'+item.product_color}}</span>
                    <span>{{item.number+'条'}}</span>
                  </li>
                </template>
                <li v-else>暂无信息</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <ul class="tablesCtn"
            v-for="(item,key) in rawMaterialPlanList"
            :key='key'
            :style="{'line-height':'40px','margin-left':'40px','width':'898px','margin-top':key !== 0 ? '20px' : false}">
            <li class="title">
              <span style='align-items:center'>{{item.material}}</span>
              <span class="materialInfoBox">
                <em v-for="(value,index) in item.need"
                  :key="index"
                  style="width:25%">
                  <span class="label">{{value.name}}:</span>
                  {{value.value+value.unit}}
                </em>
              </span>
            </li>
            <li class="content"
              v-for="(value,index) in item.stock"
              :key="index">
              <span class="tableRow">{{value.stock_name}}</span>
              <span class="tableRow materialInfoBox">
                <em v-for="(val,ind) in value.materialInfo"
                  :key="ind"
                  style="width:25%">
                  <span class="label">{{val.name}}:</span>
                  {{val.value}}{{val.unit ? val.unit : (type === '0' ? 'kg' : '个')}}
                </em>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">{{type === '0' ? '原': '辅'}}料订购</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col"
          v-for="(item,key) in list"
          :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>{{type === '0' ? '原': '辅'}}料名称</span>
              <span>{{type === '0' ? '原料颜色': '辅料属性'}}</span>
              <span>合计数量</span>
              <span>已选数量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material ? item.material : '暂无信息'}}</span>
              <span>
                <template v-if="item.needColors.length !== 0">
                  <template v-for="(value,index) in item.needColors">
                    {{(index === 0 ? '' : '/') + value}}
                  </template>
                </template>
                <template v-else>暂无信息</template>
              </span>
              <span>{{item.needNum|fixedFilter}}{{item.unit}}</span>
              <span>{{(Number(item.selectNum) + Number(item.selectNums ? item.selectNums : 0))|fixedFilter}}{{item.unit}}</span>
            </div>
          </div>
          <div class="buyInfo">
            <ul class="buyFrom"
              v-for="(iten,kay) in item.buyInfo"
              :key="kay">
              <li v-for="(value,index) in iten.buyMaterialInfo"
                :key="index"
                class="col">
                <div>
                  <span>{{type === '0' ? '原': '辅'}}料信息:</span>
                  <div>
                    <el-select v-model="value.color"
                      :placeholder="type==='0'?'颜色':'属性'"
                      size="small">
                      <el-option v-for="color in colorListVal(item.needColors)"
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
                </div>
                <div>
                  <span></span>
                  <div>
                    <el-select v-model="value.attr"
                      multiple
                      placeholder="包装"
                      size="small">
                      <el-option v-for="attr in ['筒纱','绞纱','足斤','98']"
                        :key="attr.value"
                        :value="attr">
                      </el-option>
                    </el-select>
                    <strong>—</strong>
                    <el-input size="small"
                      placeholder="单价"
                      v-model="value.price">
                    </el-input>
                  </div>
                </div>
                <em v-if="index === 0"
                  class="el-icon-plus"
                  @click="appendBuyMaterialInfo(key,kay)"></em>
                <em v-else
                  class="el-icon-delete"
                  @click="deleteBuyMaterialInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>订购来源:</span>
                <!-- <el-select v-model="iten.company"
                  placeholder="请选择订购来源"
                  size="small">
                  <el-option v-for="value in options.companyList"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id">
                  </el-option>
                </el-select> -->
                <el-cascader v-model="iten.company"
                  :options="companyList"
                  style="width:243px;margin-left:15px;"></el-cascader>
              </li>
              <li>
                <span>总价:</span>
                <el-input size="small"
                  placeholder="总价"
                  :disabled="true"
                  v-model="iten.money">
                </el-input>
                <i>元</i>
              </li>
              <li>
                <span>订购日期:</span>
                <el-date-picker v-model="iten.orderTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  size="small"
                  style="width:243px"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </li>
              <li>
                <span>备注:</span>
                <el-input type="textarea"
                  placeholder="请输入内容"
                  style="width:243px;margin: 0 0 0 15px;height:45px;"
                  v-model="iten.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                @click="deleteBuyInfo(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addBuyInfo(key)">
            <span>+</span>
            <span>添加{{type === '0' ? '原' : '辅'}}料</span>
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
import { rawMaterialOrderInit, clientList, rawMaterialOrder } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      type: '',
      order_code: '',
      order_time: '',
      company_name: '',
      group_name: '',
      productList: [],
      rawMaterialPlanList: [],
      list: [],
      companyList: [
        {
          value: 1,
          label: '库存调取',
          children: [{
            value: 0,
            label: '仓库'
          }]
        },
        {
          value: 2,
          label: '工厂订购',
          children: []
        }],
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
        }]
      }
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
      handler: function (newVal) {
        // console.log(newVal)
        this.list.forEach((item, key) => {
          let num = 0
          item.buyInfo.forEach(value => {
            let money = 0
            value.buyMaterialInfo.forEach(val => {
              money += (val.price * val.value)
              num += Number(val.value)
            })
            value.money = money
          })
          item.selectNum = num
        })
      }
    }
  },
  methods: {
    appendBuyMaterialInfo (key, kay) {
      this.list[key].buyInfo[kay].buyMaterialInfo.push({
        color: '',
        price: '',
        value: '',
        attr: '',
        vat_code: 'vat_null'
      })
    },
    deleteBuyMaterialInfo (key, kay, index) {
      this.list[key].buyInfo[kay].buyMaterialInfo.splice(index, 1)
    },
    addBuyInfo (key) {
      // console.log(this.list)
      if (!this.list[key].material) {
        this.$message({
          message: '无' + (this.type === '0' ? '原' : '辅') + '料信息，不可添加订购',
          type: 'error'
        })
        return
      }
      this.list[key].buyInfo.push(
        {
          company: [1, 0],
          money: '',
          orderTime: this.now_time,
          remark: '',
          buyMaterialInfo: [
            {
              color: '',
              price: '',
              value: '',
              attr: '',
              vat_code: 'vat_null'
            }
          ]
        }
      )
    },
    deleteBuyInfo (key, kay) {
      this.list[key].buyInfo.splice(kay, 1)
    },
    colorListVal (list) {
      let index = list.indexOf('白胚')
      let arr = (index !== -1) ? list : ['白胚', ...list]
      return this.type === '0' ? arr : [...list]
    },
    saveAll () {
      this.loading = true
      let arr = []
      let nums = 0
      let flag = true
      let stockArr = []
      this.list.forEach((item, key) => {
        let obj = {}
        let stockObj = {}
        if ((Number(item.selectNum) + Number(item.selectNums ? item.selectNums : 0)) > Number(item.needNum)) {
          let num = Number(item.selectNum) + Number(item.selectNums ? item.selectNums : 0) - Number(item.needNum)
          let keys = window.confirm('已选数量超出计划值' + num.toFixed(2) + '，是否继续？')
          if (!keys) {
            this.$message({
              type: 'info',
              message: '请调整已选数量。'
            })
            flag = false
            return
          }
        }
        obj.company_id = sessionStorage.company_id
        obj.order_id = this.$route.params.id
        obj.user_id = sessionStorage.user_id
        obj.material_name = item.material
        obj.type = (this.type === '0' ? 1 : 2)
        nums += item.buyInfo.length
        item.buyInfo.forEach(value => {
          if (value.company.length === 0) {
            this.$message({
              message: '请选择订购公司',
              type: 'error'
            })
            flag = false
            return
          }
          if (!value.orderTime) {
            this.$message({
              message: '请选择订购时间',
              type: 'error'
            })
            flag = false
            return
          }
          value.buyMaterialInfo.forEach(val => {
            if (!val.color) {
              this.$message({
                message: '请选择颜色',
                type: 'error'
              })
              flag = false
              return
            }
            if (val.price === '') {
              this.$message({
                message: '请输入单价',
                type: 'error'
              })
              flag = false
              return
              // } else if (val.price === '0') {
              //   this.$message({
              //     message: '单价不可为0',
              //     type: 'error'
              //   })
              //   flag = false
              //   return
            } else if (!Number(val.price)) {
              this.$message({
                message: '请检查单价格式是否正确',
                type: 'error'
              })
              flag = false
              return
            }
            if (val.value === '') {
              this.$message({
                message: '请输入数量',
                type: 'error'
              })
              flag = false
              return
            } else if (val.value === '0') {
              this.$message({
                message: '数量不可为0',
                type: 'error'
              })
              flag = false
              return
            } else if (!Number(val.value)) {
              this.$message({
                message: '请检查数量格式是否正确',
                type: 'error'
              })
              flag = false
              return
              // } else if (Number(val.value % 1 !== 0) || Number(val.value) < 0) {
              //   this.$message({
              //     message: '请输入正整数',
              //     type: 'error'
              //   })
              //   flag = false
              //   return
            }
            obj.complete_time = value.orderTime
            obj.type_source = value.company[0]
            obj.client_id = value.company[1]
            obj.desc = value.remark
            obj.color_code = val.color
            obj.price = Number(val.price)
            obj.total_weight = Number(val.value)
            obj.attribute = val.attr.join('/')
            obj.vat_code = val.vat_code
            arr.push({ ...obj })
            if (value.company[0] === 1) {
              stockObj.material_name = item.material
              stockObj.order_id = this.$route.params.id
              stockObj.stock_id = value.company[1]
              stockObj.color_code = val.color
              stockObj.user_id = sessionStorage.user_id
              stockObj.weight = Number(val.value)
              stockObj.vat_code = val.vat_code
              stockObj.company_id = sessionStorage.company_id
              stockObj.type = (this.type === '0' ? 1 : 2)
              stockArr.push({ ...stockObj })
            }
          })
        })
      })
      // console.log(arr)
      this.loading = false
      if (flag) {
        if (nums === 0) {
          this.$message({
            message: '无可提交的订购信息',
            type: 'warning'
          })
        } else {
          rawMaterialOrder({
            data: {
              order_data: arr,
              stock_data: stockArr
            }
          }).then(res => {
            if (res.data.data === true) {
              this.$message({
                message: '添加成功,即将跳转至详情页',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/index/rawMaterialOrderDetail/' + this.$route.params.id + '/' + this.type)
              }, 800)
            } else if (res.data.data.status === false) {
              let message = res.data.data.msg
              this.$message({
                message: message,
                type: 'error'
              })
            }
          })
        }
      }
    }
  },
  created () {
    this.type = this.$route.params.type
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    Promise.all([
      rawMaterialOrderInit({
        order_id: this.$route.params.id
      }),
      clientList({
        company_id: sessionStorage.company_id
      })
    ]).then(res => {
      // console.log(res)
      // 计划物料信息初始化
      res[0].data.data.material_info.forEach((item, key) => {
        for (let prop in item) {
          for (let val in item[prop]) {
            if (val !== 'total_number' && val !== 'type' && val !== 'unit') {
              if (item[prop].type === Number(this.type)) {
                let flag = this.rawMaterialPlanList.find(items => items.material === prop)
                if (!flag) {
                  this.rawMaterialPlanList.push({
                    material: prop,
                    need: [
                      {
                        name: val,
                        value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][val]) / 1000 : item[prop][val],
                        unit: (item[prop].unit === '克' || item[prop].unit === 'g') ? 'kg' : item[prop].unit === '千克' ? 'kg' : item[prop].unit
                      }
                    ]
                  })
                } else {
                  let flag1 = flag.need.find(items => items.name === val)
                  if (!flag1) {
                    flag.need.push({
                      name: val,
                      value: (item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][val]) / 1000 : item[prop][val],
                      unit: (item[prop].unit === '克' || item[prop].unit === 'g') ? 'kg' : item[prop].unit === '千克' ? 'kg' : item[prop].unit
                    })
                  } else {
                    flag1.value = Number(flag1.value) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? Math.ceil(item[prop][val]) / 1000 : item[prop][val])
                  }
                }
              }
            }
          }
        }
      })
      this.rawMaterialPlanList.forEach((item, key) => {
        item.need.forEach((value, index) => {
          let flag = this.list.find(val => val.material === item.material)
          if (!flag) {
            this.list.push({
              material: item.material,
              needColors: [value.name],
              needNum: value.value,
              selectNum: 0,
              unit: value.unit,
              buyInfo: [
              ]
            })
          } else {
            if (flag.needColors.indexOf(value.name) === -1) {
              flag.needColors.push(value.name)
            }
            flag.needNum = Number(flag.needNum) + Number(value.value)
          }
        })
      })
      this.order_code = res[0].data.data.order_info.order_code
      this.order_time = res[0].data.data.order_info.order_time
      this.group_name = res[0].data.data.order_info.group_name
      this.company_name = res[0].data.data.order_info.client_name
      // console.log(this.rawMaterialPlanList)
      // this.options.companyList.push(...res[1].data.data.filter((item) => (item.type.indexOf(2) !== -1 || item.type.indexOf(3) !== -1)))
      // 产品信息初始化
      let arr = []
      res[0].data.data.order_info.order_batch.forEach((item, key) => {
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
      // 订购公司列表初始化
      let clientList = res[1].data.data
      // console.log(clientList)
      clientList.forEach(item => {
        if (item.type.indexOf(9) !== -1) {
          this.companyList[0].children.push({
            value: item.id,
            label: item.name
          })
        }
        if (item.type.indexOf(2) !== -1) {
          this.companyList[1].children.push({
            value: item.id,
            label: item.name
          })
        }
      })
      // console.log(this.companyList)
      // 库存信息初始化
      let stockInfo = res[0].data.data.stock_info
      stockInfo.forEach(item => {
        let flag = this.rawMaterialPlanList.find(key => key.material === item.material_name)
        if (flag) {
          let isNeed = flag.need.find(key => key.name === item.material_color) // 判断是否需要该颜色
          if (isNeed || item.material_color === '白胚') {
            if (!flag.stock) {
              flag.stock = []
            }
            let flag1 = flag.stock.find(key => key.stock_id === item.stock_id)
            if (!flag1) {
              let stockName = clientList.find(key => Number(key.id) === item.stock_id)
              flag.stock.push({
                stock_name: (item.stock_id === 0 ? '本厂仓库' : stockName.name),
                stock_id: item.stock_id,
                materialInfo: [
                  {
                    name: item.material_color,
                    value: item.total_weight
                  }
                ]
              })
            } else {
              let flag2 = flag1.materialInfo.find(key => key.name === item.material_color)
              if (!flag2) {
                flag1.materialInfo.push({
                  name: item.material_color,
                  value: item.total_weight
                })
              } else {
                flag2.value = Number(flag2.value) + Number(item.total_weight)
              }
            }
          }
        }
      })
      // 已选重量初始化
      let selectWeight = res[0].data.data.total_weight_order
      for (let prop in selectWeight) {
        let flag = this.list.find(item => item.material === prop)
        if (flag) {
          flag.selectNums = selectWeight[prop] ? selectWeight[prop] : 0
        }
      }
    })
  },
  updated () {
    this.loading = false
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderPage.less";
</style>
