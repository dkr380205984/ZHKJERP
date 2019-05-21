<template>
  <div id="rawMaterialProcess"
       v-loading="loading">
    <div class="head">
      <h2>原料加工</h2>
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
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品信息:</span>
            <span class="content">
              <ul class="productInfo">
                <li v-for="(item,key) in productList"
                    :key="key">
                  <span>{{item.product_code}}({{item.type}})</span>
                  <span>{{item.product_size+'/'+item.product_color}}</span>
                  <span>{{item.number+'条'}}</span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn maxWidth noPadding"
               v-for="(item,key) in materialList"
               :key="key">
            <span class="title">{{item.company ? item.company : '仓库' + ':'}}</span>
            <span class="processContent">
              <span v-for="(value,index) in item.processInfo"
                    :key="index">
                <span class="material">{{value.material}}</span>
                <span class="colorInfo">
                  <span v-for="(iten,kay) in value.colorInfo"
                        :key="kay">
                    <span class="tit">{{iten.color}}</span>
                    {{iten.value + 'kg'}}
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料加工</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col"
             v-for="(item,key) in list"
             :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>原料名称</span>
              <span>原料颜色</span>
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
              <span>{{item.total_number + 'kg'}}</span>
              <span>{{item.select_number + 'kg'}}</span>
            </div>
          </div>
          <div class="processInfo">
            <ul class="processFrom"
                v-for="(iten,kay) in item.processInfo"
                :key="kay">
              <li>
                <span>加工类型</span>:
                <el-select v-model="iten.processClass"
                           placeholder="请选择加工类型"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :label="value.label"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>加工单位</span>:
                <el-select v-model="iten.processCompany"
                           placeholder="请选择加工单位"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :label="value.label"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li v-for="(value,index) in iten.processMaterialInfo"
                  :key="index"
                  class="col">
                <div>
                  <span>原料信息</span>:
                  <el-select v-model="value.color"
                             placeholder="颜色"
                             size="small">
                    <el-option v-for="color in options"
                               :key="color.value"
                               :label="color.label"
                               :value="color.label">
                    </el-option>
                  </el-select>
                  <strong>—</strong>
                  <el-input size="small"
                            placeholder="数量"
                            v-model="value.value"
                            @change="jisuan(key)">
                  </el-input>
                </div>
                <em v-if="index === 0"
                    class="el-icon-plus"
                    @click="appendBuyMaterialInfo(key,kay)"></em>
                <em v-else
                    class="el-icon-delete"
                    @click="deleteBuyMaterialInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>总价</span>:
                <el-input size="small"
                          placeholder="总价"
                          :disabled="true"
                          v-model="iten.money">
                </el-input>
                <i>元</i>
              </li>
              <li>
                <span>订购日期</span>:
                <el-date-picker v-model="iten.orderTime"
                                align="right"
                                type="date"
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
                    @click="deleteBuyInfo(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
               @click="addBuyInfo(key)">
            <span>添加公司</span>
            <span>+</span>
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
import { orderDetail, rawMaterialProcessPage, clientList, rawMaterialOrderList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: [],
      materialList: [],
      list: [],
      options: {
        companyList: [],
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
        ]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
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
    jisuan (key) {
      this.list.forEach((item, key) => {
        item.selectNum = 0
        item.processInfo.forEach((value, index) => {
          value.money = 0
          value.processMaterialInfo.forEach((val, ind) => {
            item.selectNum += Number(val.value)
            value.money += (val.price * val.value)
          })
        })
      })
    },
    appendBuyMaterialInfo (key, kay) {
      this.list[key].processInfo[kay].processMaterialInfo.push({
        material: '',
        color: '',
        price: '',
        value: ''
      })
    },
    deleteBuyMaterialInfo (key, kay, index) {
      this.list[key].processInfo[kay].processMaterialInfo.splice(index, 1)
    },
    addBuyInfo (key) {
      this.list[key].processInfo.push(
        {
          company: '',
          money: '',
          orderTime: '',
          remark: '',
          processMaterialInfo: [
            {
              material: '',
              color: '',
              price: '',
              value: ''
            }
          ]
        }
      )
    },
    deleteBuyInfo (key, kay) {
      this.list[key].processInfo.splice(kay, 1)
    },
    saveAll () {
      this.$message(
        {
          message: '添加成功',
          type: 'success'
        }
      )
    }
  },
  created () {
    Promise.all([
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
      let materialInfo = res[0].data.data
      console.log(materialInfo)
      let orderInfo = res[1].data.data
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.order_time = orderInfo.order_time
      this.client_name = orderInfo.client_name
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      orderInfo.order_batch.forEach((item, key) => {
        item.batch_info.forEach((value, index) => {
          let types = value.productInfo.category_info.product_category + (value.productInfo.type_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.style_name ? '/' + value.productInfo.type_name : '') + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
          value.size.forEach((val, ind) => {
            this.productList.push({
              type: types,
              product_code: value.productCode,
              product_size: val.name[0],
              product_color: val.name[1],
              number: val.numbers
            })
          })
        })
      })
      // 初始化原料信息与订购信息
      materialInfo.forEach(item => {
        // 初始化原料信息
        if (this.materialList.length === 0) {
          this.materialList.push({
            company: item.client_name,
            processInfo: [
              {
                material: item.material_name,
                colorInfo: [
                  {
                    color: item.color_code,
                    value: item.weight
                  }
                ]
              }
            ]
          })
        } else {
          let arr = this.materialList.find(val => val.company === item.client_name)
          if (arr && arr !== null) {
            let obj = arr.processInfo.find(val => val.material === item.material_name)
            if (!obj) {
              arr.processInfo.push({
                material: item.material_name,
                colorInfo: [
                  {
                    color: item.color_code,
                    value: item.weight
                  }
                ]
              })
            } else {
              let ind = obj.colorInfo.find(val => val.color === item.color_code)
              if (!ind) {
                obj.colorInfo.push({
                  color: item.color_code,
                  value: item.weight
                })
              } else {
                ind.value = Number(ind.value) + Number(item.weight)
              }
            }
          } else {
            this.materialList.push({
              company: item.client_name,
              processInfo: [
                {
                  material: item.material_name,
                  colorInfo: [
                    {
                      color: item.color_code,
                      value: item.weight
                    }
                  ]
                }
              ]
            })
          }
        }
        // 初始化加工信息
        if (this.list.length === 0) {
          this.list.push({
            material: item.material_name,
            needColors: [item.color_code],
            total_number: Number(item.weight),
            select_number: 0,
            processInfo: []
          })
        } else {
          let arr = this.list.find(val => val.material === item.material_name)
          if (arr) {
            arr.total_number = Number(arr.total_number) + Number(item.weight)
          } else {
            this.list.push({
              material: item.material_name,
              needColors: [item.color_code],
              total_number: Number(item.weight),
              select_number: 0,
              processInfo: []
            })
          }
        }
      })
      console.log(this.list)
      // 订购公司列表初始化
      res[2].data.data.forEach((item, key) => {
        if (item.type === 2) {
          this.options.companyList.push(item)
        }
      })
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialProcess.less";
</style>
