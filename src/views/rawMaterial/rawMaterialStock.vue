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
            <span class="content important">{{order_code}}</span>
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
        <div class="lineCtn col">
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
                <li class="orderInfo"
                    v-for="(item,key) in materialList"
                    :key="key">
                  <span>{{item.company}}</span>
                  <span class="flex45 col">
                    <span v-for="(val,ind) in item.materials"
                          :key="ind">
                      <span>{{val.material}}</span>
                      <span class="flex17 col">
                        <span v-for="(value,index) in val.colors"
                              :key="index">
                          <span>{{value.color}}</span>
                          <span>{{value.value}}{{value.unit}}</span>
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
          <div class="table">
            <div class="tableTitle">
              <span>
                <span>加工类型</span>
              </span>
              <span class="flex45">
                <span class="flex17">加工单位</span>
                <span>{{type === '0' ? '原' : '辅'}}料名称</span>
                <span class="flex12">颜色-数量</span>
              </span>
            </div>
            <div class="tableInfo"
                 v-for="(item,key) in processList"
                 :key="key">
              <span>
                <span>{{item.process_type}}</span>
              </span>
              <span class="flex45">
                <span v-for="(value,index) in item.companys"
                      :key="index">
                  <span class="flex17">
                    <span>{{value.company}}</span>
                  </span>
                  <span class="flex22">
                    <span v-for="(val,ind) in value.materials"
                          :key="ind">
                      <span>
                        <span>{{val.material}}</span>
                      </span>
                      <span class="flex12">
                        <span v-for="(ite,ka) in val.colors"
                              :key="ka">
                          {{ite.color + '--' + ite.value + ite.unit}}
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
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
              <span>合计重量</span>
              <span>已入库重量</span>
              <span>待入库重量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material}}</span>
              <span>
                {{item.total_number}}{{item.unit}}
              </span>
              <span>{{item.goStock_number}}{{item.unit}}</span>
              <span>{{item.waitStock_number}}{{item.unit}}</span>
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
                             :key="value.value"
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
                            v-model="value.number"
                            @change="jisuan">
                    <template slot="append">件</template>
                  </el-input>
                  <el-input size="small"
                            placeholder="数量"
                            v-model="value.weight"
                            @change="jisuan">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
                <em v-if="index === 0"
                    class="el-icon-plus"
                    @click="appendStockWeightInfo(key,kay)"></em>
                <em v-else
                    class="el-icon-delete"
                    @click="deleteStockWeightInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>入库时间</span>:
                <el-date-picker v-model="iten.stock_time"
                                align="right"
                                type="date"
                                placeholder="选择入库时间"
                                size="small"
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
import { orderDetail, rawMaterialOrderList, rawMaterialProcessList, rawMaterialGoStock } from '@/assets/js/api.js'
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
      productList: [
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾/豹纹',
          size: 'S',
          color: '深绿',
          number: 2000
        },
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾/豹纹',
          size: 'S',
          color: '深绿',
          number: 2000
        },
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾/豹纹',
          size: 'S',
          color: '深绿',
          number: 2000
        }
      ],
      materialList: [],
      processList: [],
      list: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
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
  methods: {
    jisuan () {
      console.log(this.list)
      this.list.forEach((item, key) => {
        item.select_number = 0
        item.stockInfo.forEach((value, index) => {
          value.stockWeightInfo.forEach((val, ind) => {
            item.select_number += Number(val.value)
          })
        })
      })
    },
    appendStockWeightInfo (key, kay) {
      this.list[key].stockInfo[kay].stockWeightInfo.push({
        dyelot_number: '',
        number: '',
        weight: ''
      })
    },
    deleteStockWeightInfo (key, kay, index) {
      this.list[key].stockInfo[kay].stockWeightInfo.splice(index, 1)
      this.jisuan()
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
      console.log(this.list)
      let date = []
      this.list.forEach(item => {
        item.stockInfo.forEach(val => {
          val.stockWeightInfo.forEach(value => {
            let obj = {}
            obj.type = (this.type === '0' ? 1 : 2)
            obj.company_id = window.sessionStorage.getItem('company_id')
            obj.user_id = window.sessionStorage.getItem('user_id')
            obj.order_id = this.$route.params.id
            obj.material_name = item.material
            obj.vat_code = value.dyelot_number
            obj.color_code = val.materialColor
            obj.number = value.number
            obj.total_weight = value.total_weight
            obj.complete_time = val.stock_time
            obj.desc = val.remark
            obj.attribute = val.materialAtr
            date.push({ ...obj })
          })
        })
      })
      console.log(date)
      rawMaterialGoStock({
        data: date
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '添加成功,即将跳转至详情页',
            type: 'success'
          })
        }
      })
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
      })
    ]).then(res => {
      console.log(res)
      this.order_code = res[0].data.data.order_code
      this.client_name = res[0].data.data.client_name
      this.order_time = res[0].data.data.order_time
      this.group_name = res[0].data.data.group_name
      // 初始化订购信息
      let materialInfo = res[1].data.data
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
        }
      })
      console.log(this.materialList)
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
            // 初始化入库信息
          }
          let fleg = this.list.find(val => val.material === item.material_name)
          if (!fleg) {
            this.list.push({
              material: item.material_name,
              unit: (item.unit === null ? 'kg' : item.unit),
              colors: [value.color],
              total_number: value.value,
              goStock_number: 0,
              waitStock_number: 0,
              stockInfo: []
            })
          } else {
            if (!(fleg.colors.find(val => val === value.color))) {
              fleg.colors.push(value.color)
            }
            fleg.total_number = Number(fleg.total_number) + Number(value.value)
          }
        })
      })
      console.log(this.processList)
    })
    this.loading = false
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialStock.less";
</style>
