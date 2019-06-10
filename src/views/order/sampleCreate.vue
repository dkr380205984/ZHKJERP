<template>
  <div id="sampleCreate">
    <div class="head">
      <h2>添加样品订单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content important">KR-0001</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品品类:</span>
          <span class="content">{{product|filterType}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">{{product.flower_id}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品成分:</span>
          <span class="content">{{product.materials|filterMaterials}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">克重:</span>
          <span class="content">还没有这个字段</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <span class="content">{{product.user_id}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建日期:</span>
          <span class="content">{{product.create_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品规格:</span>
          <span class="content contentLine"
            v-for="(item,key) in product.size"
            :key="key">
            <span class="size">{{key}}</span>
            <span class="sizeDetail">
              <span class="sizeOnce"
                v-for="itemChild in item"
                :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + 'cm'}}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品图片:</span>
          <span class="content">
            <img v-if="product.img.length === 0"
              class="img"
              src="@/assets/image/index/noPic.jpg" />
            <img v-for="(item,index) in product.img"
              :key="index"
              class="img"
              :src="item.image_url"
              :onerror="defaultImg" />
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品描述:</span>
          <span class="content">{{product.description}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料信息:</span>
          <span class="content">
            <span v-for="(item,index) in material_data.mainIngredient.ingredient"
              :key="index"
              style="margin-right:25px">{{item.join('')}}</span>
          </span>
        </div>
        <div class="inputCtn">
          <span class="label">辅料信息:</span>
          <span class="content">
            <span v-for="(item,index) in material_data.otherIngredient.ingredient"
              :key="index"
              style="margin-right:25px">{{item}}</span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">外道加工:</span>
          <span class="content">
            <span v-for="(item,index) in outside_data"
              :key="index"
              style="margin-right:25px">{{index+1}}.{{item}}</span>
          </span>
        </div>
      </div>
      <div class="border"></div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订单公司:</span>
          <el-select class="elSelect"
            v-model="client"
            placeholder="可输入名称精确搜索"
            filterable
            @change="getContacts">
            <el-option v-for="item in clientArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label">联系人:</span>
          <el-select class="elSelect"
            v-model="contacts"
            placeholder="请选择对接联系人">
            <el-option v-for="item in contactsArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn"
        style="margin-bottom:0">
        <div class="specialCtn">
          <span class="label">订单信息:</span>
          <div class="infoCtn"
            v-for="(item,index) in order_info.length"
            :key="item">
            <span class="index">{{item}}</span>
            <el-select style="width:150px"
              v-model="order_info[index].size"
              placeholder="请选择尺码">
              <el-option v-for="item in sizeArr"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="order_info[index].colour"
              placeholder="请选择配色"
              style="margin-left:15px;width:150px">
              <el-option v-for="item in colourArr"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input class="elInputAp"
              placeholder="请输入数字"
              v-model="order_info[index].number"
              @blur="computedTotal">
              <template slot="prepend">订单数:</template>
              <template slot="append">{{unit}}</template>
            </el-input>
            <el-icon class="el-icon-delete"
              @click.native="deleteOrder(index)"></el-icon>
          </div>
          <div class="addBtn"
            @click="addOrder">
            <span>添加分类</span>
            <span>+</span>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        style="margin-top:4px;margin-bottom:4px">
        <div class="specialCtn"
          style="width:300px">
          <span class="label">订单价格:</span>
          <div class="infoCtn"
            style="height:40px">
            <el-radio-group v-model="price_model"
              @change="getPrice">
              <el-radio :label="1">按单价计算</el-radio>
              <el-radio :label="2">按款数计算</el-radio>
            </el-radio-group>
          </div>
          <div class="infoCtn">
            <el-input style="margin-left:0px"
              class="elInputAp"
              placeholder="请输入数字"
              v-model="danjia"
              :disabled="price_model===2"
              @blur="computedTotal">
              <template slot="prepend">单价:</template>
              <template slot="append">元/{{unit}}</template>
            </el-input>
          </div>
          <div class="infoCtn">
            <el-input style="margin-left:0px"
              class="elInputAp"
              placeholder="请输入数字"
              v-model="price_total"
              :disabled="price_model===1">
              <template slot="prepend">总价:</template>
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        style="margin-top:0;margin-bottom:0px;">
        <div class="specialCtn"
          style="width:300px">
          <span class="label">承担方:</span>
          <div class="infoCtn"
            style="height:40px">
            <el-radio-group v-model="assume">
              <el-radio :label="1">工厂承担</el-radio>
              <el-radio :label="2">订单公司承担</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        style="margin-top:0">
        <div class="inputCtn">
          <span class="label">税率:</span>
          <el-input style="margin-left:15px;"
            placeholder="请输入数字"
            v-model="tax_rate">
            <template slot="append">%</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">下单日期:</span>
          <el-date-picker style="margin-left:15px;width:200px"
            v-model="order_time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputCtn">
          <span class="label">交货日期:</span>
          <el-date-picker value-format="yyyy-MM-dd"
            style="margin-left:15px;width:200px"
            v-model="consignment_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn">清空</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, clientList, sampleSave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      client: '',
      contacts: '',
      price_model: 1,
      assume: 1,
      tax_rate: '',
      order_time: '',
      consignment_time: '',
      danjia: '',
      price_total: '',
      value: '',
      unit: '',
      clientArr: [],
      contactsArr: [],
      sizeArr: [],
      colourArr: [],
      order_info: [{
        colour: '',
        size: '',
        number: ''
      }],
      product: {
        category_info: {
          name: '',
          product_category: ''
        },
        style_name: '',
        type_name: '',
        user_id: '',
        size: [],
        color: [],
        create_time: '',
        description: '',
        flower_id: '',
        materials: [],
        img: []
      },
      material_data: {
        mainIngredient: {
          ingredient: [['暂无信息']]
        },
        otherIngredient: {
          ingredient: ['暂无信息']
        }
      },
      outside_data: ['暂无信息']
    }
  },
  created () {
    Promise.all([
      porductOne({
        id: 3
      }), clientList({
        company_id: window.sessionStorage.getItem('company_id'),
        keyword: '',
        status: 1,
        limit: '',
        page: ''
      })
    ]).then((res) => {
      this.product = res[0].data.data
      this.sizeArr = Object.keys(res[0].data.data.size)
      this.colourArr = res[0].data.data.color
      this.unit = res[0].data.data.category_info.name
      if (res[0].data.data.product_plan) {
        this.material_data = res[0].data.data.product_plan.material_data
        this.outside_data = res[0].data.data.product_plan.outside_data
      }
      this.clientArr = res[1].data.data
    })
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    },
    filterMaterials (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.ingredient_name + item.ingredient_value + '%' + ' / '
      })
      return str.substring(0, str.length - 2)
    }
  },
  methods: {
    // 根据订单公司获取联系人
    getContacts () {
      this.contactsArr = this.clientArr.find((item) => {
        return item.id === this.client
      }).contacts
    },
    // 添加分类
    addOrder () {
      this.order_info.push({
        colour: '',
        size: '',
        number: ''
      })
    },
    // 删除分类
    deleteOrder (index) {
      if (this.order_info.length > 1) {
        this.order_info.splice(index, 1)
      } else {
        this.$message.error({
          message: '分类信息不能少于一条'
        })
      }
    },
    // 切换价格计算方式
    getPrice (info) {
      if (info === 2) {
        this.danjia = ''
      }
    },
    // 根据单价算总价
    computedTotal () {
      if (this.price_model === 1) {
        this.price_total = this.order_info.reduce((total, currentValue) => {
          return total + currentValue.number * this.danjia
        }, 0)
      }
    },
    // 保存
    saveAll () {
      sampleSave({
        company_id: window.sessionStorage.getItem('company_id'),
        product_id: this.product.id,
        client_id: this.client,
        order_info: this.order_info,
        contacts_id: this.contacts,
        price_model: this.price_model,
        price_total: this.price_total,
        assume: this.assume,
        tax_rate: this.tax_rate,
        order_time: this.order_time,
        consignment_time: this.consignment_time
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/sampleCreate.less";
</style>
<style lang="less">
#sampleCreate {
  .onceLine {
    .el-input__inner {
      background: #f8f8f8;
    }
  }
}
</style>
