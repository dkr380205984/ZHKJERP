<template>
  <div id="rawMaterialStock"
    v-loading="loading">
    <div class="head">
      <h2>{{type === '0' ? '原' : '辅'}}料入库</h2>
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
                  <span>订购单位</span>
                  <span class="flex45">
                    <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                    <span class="flex17">
                      <span>颜色</span>
                      <span>数量</span>
                    </span>
                  </span>
                </li>
                <li v-if="materialList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in materialList"
                  :key="key">
                  <span class="tableRow">{{item.company ? item.company : '仓库'}}</span>
                  <span class="tableRow flex45 col">
                    <span v-for="(val,ind) in item.materials"
                      :key="ind"
                      class="tableColumn">
                      <span class="tableRow">{{val.material}}</span>
                      <span class="tableRow flex17 col">
                        <span v-for="(value,index) in val.colors"
                          :key="index"
                          class="tableColumn">
                          <span class="tableRow">{{value.color}}</span>
                          <span class="tableRow">{{value.value|fixedFilter}}{{value.unit}}</span>
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
        <div class="stepTitle">加工信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>加工类型</span>
                  <span class="flex45">
                    <span class="flex17">加工单位</span>
                    <span class="flex22">
                      <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                      <span class="flex12">
                        <span>颜色</span>
                        <span>数量</span>
                      </span>
                    </span>
                  </span>
                </li>
                <li v-if="processList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in processList"
                  :key="key">
                  <span class="tableRow">{{item.process_type}}</span>
                  <span class="tableRow flex45 col">
                    <span v-for="(value,index) in item.companys"
                      :key="index"
                      class="tableColumn">
                      <span class="flex17 tableRow">{{value.company}}</span>
                      <span class="flex22 col tableRow">
                        <span v-for="(val,ind) in value.materials"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow">{{val.material}}</span>
                          <span class="tableRow flex12 col">
                            <span v-for="(itam,kay) in val.colors"
                              :key="kay"
                              class="tableColumn">
                              <span class="tableRow">{{itam.color}}</span>
                              <span class="tableRow">{{itam.value|fixedFilter}}{{itam.unit}}</span>
                            </span>
                          </span>
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
        <div class="stepTitle">{{type === '0' ? '原' : '辅'}}料入库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col"
          v-for="(item,key) in list"
          :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>{{type === '0' ? '原' : '辅'}}料名称</span>
              <span>合计数量</span>
              <span>已入库数量</span>
              <span>待入库数量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material}}</span>
              <span>
                {{item.total_number|fixedFilter}}{{item.unit}}
              </span>
              <span>{{(item.goStock_number + item.goStocks_number)|fixedFilter}}{{item.unit}}</span>
              <span>{{(item.total_number - item.goStocks_number - item.goStock_number)|fixedFilter}}{{item.unit}}</span>
            </div>
          </div>
          <div class="buyInfo">
            <ul class="buyFrom"
              v-for="(iten,kay) in item.stockInfo"
              :key="kay">
              <li>
                <span>{{type === '0' ? '原' : '辅'}}料颜色</span>:
                <el-select v-model="iten.materialColor"
                  :placeholder="'请选择'+(type === '0' ? '原' : '辅')+'料颜色'"
                  size="small">
                  <el-option v-for="value in item.colors"
                    :key="value"
                    :value="value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>包装属性</span>:
                <el-input v-model="iten.materialAtr"
                  :placeholder="'请输入包装属性'"
                  size="small">
                </el-input>
              </li>
              <li v-for="(value,index) in iten.stockWeightInfo"
                :key="index"
                class="col">
                <div>
                  <span>批号/缸号</span>:
                  <el-input size="small"
                    placeholder="请输入批号/缸号"
                    v-model="value.dyelot_number"
                    style="width:243px;">
                  </el-input>
                </div>
                <div>
                  <span>件数/数量</span>:
                  <el-input size="small"
                    placeholder="件数"
                    v-model="value.number">
                    <template slot="append">件</template>
                  </el-input>
                  <el-input size="small"
                    placeholder="数量"
                    v-model="value.weight">
                    <template slot="append">{{item.unit}}</template>
                  </el-input>
                </div>
                <em v-if="index === 0"
                  class="el-icon-plus"
                  @click="appendStockWeightInfo(key,kay)"></em>
                <em v-else
                  class="el-icon-delete"
                  @click="deleteStockWeightInfo(key,kay,index)"></em>
              </li>
              <!-- <li>
                <span>仓库</span>:
                <el-select v-model="iten.stock_name"
                  :placeholder="'请选择入库仓库'"
                  size="small">
                  <el-option v-for="value in companyArr"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id">
                  </el-option>
                </el-select>
              </li> -->
              <li>
                <span>入库时间</span>:
                <el-date-picker v-model="iten.stock_time"
                  align="right"
                  type="date"
                  placeholder="选择入库时间"
                  size="small"
                  value-format="yyyy-MM-dd"
                  style="width:243px"
                  :picker-options="pickerOptions">
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
                @click="deleteStockInfo(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addStockInfo(key)">
            <span>+</span>
            <span>添加原料</span>
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
import { orderDetail, rawMaterialOrderList, rawMaterialProcessList, rawMaterialGoStock, rawMaterialGoStockDetail, clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      now_time: '',
      type: '',
      defaultStock: '桐庐凯瑞针纺有限公司',
      materialList: [],
      processList: [],
      list: [],
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
      companyArr: []
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
    appendStockWeightInfo (key, kay) {
      this.list[key].stockInfo[kay].stockWeightInfo.push({
        dyelot_number: '',
        number: '',
        weight: ''
      })
    },
    deleteStockWeightInfo (key, kay, index) {
      this.list[key].stockInfo[kay].stockWeightInfo.splice(index, 1)
    },
    addStockInfo (key) {
      this.list[key].stockInfo.push(
        {
          materialColor: '',
          materialAtr: '',
          remark: '',
          stock_time: this.now_time,
          stockWeightInfo: [
            {
              dyelot_number: '',
              number: '',
              weight: ''
            }
          ]
        }
      )
    },
    deleteStockInfo (key, kay) {
      this.list[key].stockInfo.splice(kay, 1)
    },
    saveAll () {
      let date = []
      let flag = true
      let nums = 0
      this.list.forEach(item => {
        nums += item.stockInfo.length
        if (Number(item.goStock_number) + Number(item.goStocks_number) > Number(item.total_number)) {
          this.$message({
            message: '已入库数量超出合计数量，不被允许的操作，请重新输入',
            type: 'error'
          })
          flag = false
          return
        }
        item.stockInfo.forEach(val => {
          val.stockWeightInfo.forEach(value => {
            let obj = {}
            obj.type = (this.type === '0' ? 1 : 2)
            obj.company_id = window.sessionStorage.getItem('company_id')
            obj.user_id = window.sessionStorage.getItem('user_id')
            obj.order_id = this.$route.params.id
            obj.material_name = item.material
            obj.vat_code = (value.dyelot_number ? value.dyelot_number : 'vat_null')
            if (!val.materialColor) {
              this.$message({
                message: '请选择颜色',
                type: 'error'
              })
              flag = false
              return
            }
            if (!value.number) {
              this.$message({
                message: '请输入件数',
                type: 'error'
              })
              flag = false
              return
            }
            if (value.weight === '0') {
              this.$message({
                message: '数量不可为0',
                type: 'error'
              })
              flag = false
              return
            } else if (!value.weight) {
              this.$message({
                message: '请输入数量',
                type: 'error'
              })
              flag = false
              return
            }
            if (!val.stock_time) {
              this.$message({
                message: '请选择入库时间',
                type: 'error'
              })
              flag = false
              return
            }
            obj.color_code = val.materialColor
            obj.number = value.number
            obj.total_weight = value.weight
            obj.complete_time = val.stock_time
            obj.desc = val.remark
            obj.attribute = val.materialAtr
            obj.stock_id = 0
            date.push({ ...obj })
          })
        })
      })
      console.log('update:', date)
      if (flag) {
        if (nums === 0) {
          this.$message({
            message: '无可提交的订购信息',
            type: 'warning'
          })
        } else {
          rawMaterialGoStock({
            data: date
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                message: '添加成功,即将跳转至详情页',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/index/rawMaterialStockDetail/' + this.$route.params.id + '/' + this.$route.params.type)
              }, 800)
            }
          })
        }
      }
    }
  },
  watch: {
    list: {
      deep: true,
      handler: function (newVal) {
        this.list.forEach((item, key) => {
          let json = 0
          item.stockInfo.forEach(value => {
            value.stockWeightInfo.forEach(val => {
              json = json + Number(val.weight)
            })
          })
          this.list[key].goStock_number = json
        })
      }
    }
  },
  created () {
    this.type = this.$route.params.type
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }),
      rawMaterialOrderList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      }),
      rawMaterialProcessList({
        company_id: sessionStorage.company_id,
        order_id: this.$route.params.id
      }),
      rawMaterialGoStockDetail({
        order_id: this.$route.params.id
      }),
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      console.log('init:', res)
      this.order_code = res[0].data.data.order_code
      this.client_name = res[0].data.data.client_name
      this.order_time = res[0].data.data.order_time
      this.group_name = res[0].data.data.group_name
      // 初始化订购信息
      let materialInfo = res[1].data
      // console.log(materialInfo)
      materialInfo.forEach(item => {
        if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
          let flag = this.materialList.find(val => val.company === item.client_name)
          if (!flag) {
            this.materialList.push({
              company: item.client_name,
              materials: [{
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              }]
            })
          } else {
            let flag1 = flag.materials.find(val => val.material === item.material_name)
            if (!flag1) {
              flag.materials.push({
                material: item.material_name,
                colors: [{
                  color: item.color_code,
                  value: item.weight,
                  unit: item.unit === null ? 'kg' : item.unit
                }]
              })
            } else {
              flag1.colors.push({
                color: item.color_code,
                value: item.weight,
                unit: item.unit === null ? 'kg' : item.unit
              })
            }
          }
          // 初始化入库信息
          let fleg = this.list.find(val => val.material === item.material_name)
          if (!fleg) {
            this.list.push({
              material: item.material_name,
              unit: (item.unit === null ? 'kg' : item.unit),
              colors: [item.color_code],
              total_number: item.weight,
              goStock_number: 0,
              goStocks_number: 0,
              stockInfo: []
            })
          } else {
            if (!(fleg.colors.find(val => val === item.color_code))) {
              fleg.colors.push(item.color_code)
            }
            fleg.total_number = Number(fleg.total_number) + Number(item.weight)
          }
        }
      })
      // 初始化加工信息
      let processInfo = res[2].data.data
      processInfo.forEach(item => {
        item.material_info = JSON.parse(item.material_info)
        item.material_info.forEach(value => {
          if ((this.type === '0' && item.type === 1) || (this.type === '1' && item.type === 2)) {
            // 初始化加工信息
            let flag = this.processList.find(val => val.process_type === item.process_type)
            if (!flag) {
              this.processList.push({
                process_type: item.process_type,
                companys: [{
                  company: item.client_name,
                  total_price: item.total_price,
                  create_time: item.order_time.split(' ')[0],
                  remark: item.desc,
                  materials: [{
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  }]
                }]
              })
            } else {
              let flag1 = flag.companys.find(val => val.company === item.client_name)
              if (!flag1) {
                flag.companys.push({
                  company: item.client_name,
                  total_price: item.total_price,
                  create_time: item.order_time.split(' ')[0],
                  remark: item.desc,
                  materials: [{
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  }]
                })
              } else {
                let flag2 = flag1.materials.find(val => val.material === item.material_name)
                if (!flag2) {
                  flag1.materials.push({
                    material: item.material_name,
                    colors: [{
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    }]
                  })
                } else {
                  let flag3 = flag2.colors.find(val => val.color === value.color)
                  if (!flag3) {
                    flag2.colors.push({
                      color: value.color,
                      value: value.value,
                      unit: (item.unit === null ? 'kg' : item.unit)
                    })
                  } else {
                    flag3.value = Number(flag3.value) + Number(value.value)
                  }
                }
              }
            }
            // 初始化入库颜色列表
            let color = this.list.find(val => val.material === item.material_name)
            if (color) {
              if (!(color.colors.find(val => val === value.color))) {
                color.colors.push(value.color)
              }
            }
          }
        })
      })
      // console.log(this.processList)
      // 初始化已入库数量
      let stockNumber = res[3].data.data
      console.log(stockNumber)
      stockNumber.forEach(item => {
        let flag = this.list.find(val => val.material === item.material_name)
        if (flag) {
          flag.goStocks_number = Number(flag.goStocks_number ? flag.goStocks_number : 0) + Number(item.total_weight)
        }
      })
      this.companyArr = res[4].data.data.filter((item) => { return (item.type.find((finded) => finded === 3)) })
      this.companyArr.unshift({
        id: null,
        name: '本厂仓库'
      })
      this.loading = false
      console.log(this.list)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialStock.less";
</style>
