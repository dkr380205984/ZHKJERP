<template>
  <div id="rawMaterialOrderPage"
       v-loading="loading">
    <div class="head">
      <h2>原料订购</h2>
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
        <div class="lineCtn">
          <div class="table">
            <div class="tableTitle">
              <span>计划原料信息</span>
              <span>库存信息</span>
            </div>
            <div class="tableInfo"
                 v-for="(item,key) in rawMaterialPlanList"
                 :key="key">
              <span>
                <span>{{item.material}}</span>
                <span>{{item.need.name + ':' + item.need.value + item.need.unit}}</span>
              </span>
              <span>
                <span>{{item.have.name + ':' + item.have.value + item.have.unit}}</span>
                <span>{{'白胚:' + item.whiteHave}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料订购</div>
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
              <span>{{item.needNum}}kg</span>
              <span>{{item.selectNum}}kg</span>
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
                  <span>原料信息:</span>
                  <div>
                    <el-select v-model="value.color"
                               placeholder="颜色"
                               size="small">
                      <el-option v-for="color in item.needColors"
                                 :key="color.value"
                                 :value="color">
                      </el-option>
                    </el-select>
                    <strong>—</strong>
                    <el-input size="small"
                              placeholder="数量"
                              v-model="value.value"
                              @change="jisuan(key)">
                    </el-input>
                  </div>
                </div>
                <div>
                  <span></span>
                  <div>
                    <el-select v-model="value.attr"
                               placeholder="包装"
                               size="small">
                      <el-option v-for="color in options.attr"
                                 :key="color.value"
                                 :value="color.name">
                      </el-option>
                    </el-select>
                    <strong>—</strong>
                    <el-input size="small"
                              placeholder="单价"
                              v-model="value.price"
                              @change="jisuan(key)">
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
                <span>订购公司:</span>
                <el-select v-model="iten.company"
                           placeholder="请选择订购来源"
                           size="small">
                  <el-option v-for="value in options.companyList"
                             :key="value.id"
                             :label="value.name"
                             :value="value.id">
                  </el-option>
                </el-select>
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
                                align="right"
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
import { rawMaterialOrderInit, clientList, rawMaterialOrder } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      order_code: '',
      order_time: '',
      company_name: '',
      group_name: '',
      productList: [
      ],
      rawMaterialPlanList: [
        {
          material: '52支上光晴纶',
          need: {
            name: '深绿',
            value: 281.4,
            unit: 'kg'
          },
          have: {
            name: '深绿',
            value: 20,
            unit: 'kg'
          },
          whiteHave: '300kg'
        }, {
          material: '52支上光晴纶',
          need: {
            name: '蓝色',
            value: 281.4,
            unit: 'kg'
          },
          have: {
            name: '蓝色',
            value: 20,
            unit: 'kg'
          },
          whiteHave: '300kg'
        },
        {
          material: '36支上光晴纶',
          need: {
            name: '卡其色',
            value: 281.4,
            unit: 'kg'
          },
          have: {
            name: '卡其色',
            value: 20,
            unit: 'kg'
          },
          whiteHave: '300kg'
        }
      ],
      list: [
        {
          material: '',
          needColors: [],
          needNum: 0,
          selectNum: 0,
          buyInfo: [
          ]
        }
      ],
      options: {
        attr: [{ name: '足斤包装' }, { name: '98包装' }, { name: '95包装' }],
        companyList: []
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
  methods: {
    jisuan (key) {
      this.list.forEach((item, key) => {
        item.selectNum = 0
        item.buyInfo.forEach((value, index) => {
          value.money = 0
          value.buyMaterialInfo.forEach((val, ind) => {
            item.selectNum += Number(val.value)
            value.money += (val.price * val.value)
          })
        })
      })
    },
    appendBuyMaterialInfo (key, kay) {
      this.list[key].buyInfo[kay].buyMaterialInfo.push({
        color: '',
        price: '',
        value: '',
        attr: ''
      })
      console.log(this.list)
    },
    deleteBuyMaterialInfo (key, kay, index) {
      console.log(this.list[key].buyInfo[kay].buyMaterialInfo.splice(index, 1))
    },
    addBuyInfo (key) {
      this.list[key].buyInfo.push(
        {
          company: '',
          money: '',
          orderTime: '',
          remark: '',
          buyMaterialInfo: [
            {
              color: '',
              price: '',
              value: '',
              attr: ''
            }
          ]
        }
      )
    },
    deleteBuyInfo (key, kay) {
      this.list[key].buyInfo.splice(kay, 1)
    },
    saveAll () {
      let arr = []
      this.list.forEach((item, key) => {
        let obj = {}
        obj.company_id = sessionStorage.company_id
        obj.order_id = this.$route.params.id
        obj.user_id = sessionStorage.user_id
        obj.material_name = item.material
        item.buyInfo.forEach(value => {
          obj.client_id = value.company
          obj.total_price = value.money
          obj.desc = value.remark
          obj.order_time = value.orderTime
          value.buyMaterialInfo.forEach(val => {
            obj.color_code = val.color
            obj.price = Number(val.price)
            obj.total_weight = Math.ceil(Number(val.value))
            arr.push({ ...obj })
          })
        })
      })
      console.log(arr)
      rawMaterialOrder({
        data: arr
      }).then(res => {
        console.log(res)
      })
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
      rawMaterialOrderInit({
        order_id: this.$route.params.id
      }),
      clientList({
        company_id: sessionStorage.company_id
      })
    ]).then(res => {
      this.order_code = res[0].data.data.order_info.order_code
      this.order_time = res[0].data.data.order_info.order_time
      this.group_name = res[0].data.data.order_info.group_name
      this.company_name = res[0].data.data.order_info.client_name
      res[1].data.data.forEach((item, key) => {
        if (item.type === 2) {
          this.options.companyList.push(item)
        }
      })
      res[0].data.data.order_info.order_batch.forEach((item, key) => {
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
    })
    this.rawMaterialPlanList.forEach((item, key) => {
      if (key === 0) {
        this.list[0].material = item.material
        this.list[0].needColors.push(item.need.name)
        this.list[0].needNum = Number(item.need.value)
      } else {
        let flag = true
        this.list.forEach((value, index) => {
          if (value.material === item.material) {
            flag = false
            value.needColors.push(item.need.name)
            value.needNum += Number(item.need.value)
          } else if (flag && index === this.list.length - 1 && value.material !== item.material) {
            let obj = {
              material: '',
              needColors: [],
              needNum: 0,
              selectNum: 0,
              buyInfo: [
              ]
            }
            obj.material = item.material
            obj.needColors.push(item.need.name)
            obj.needNum = Number(item.need.value)
            this.list.push(obj)
          }
        })
      }
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderPage.less";
</style>
