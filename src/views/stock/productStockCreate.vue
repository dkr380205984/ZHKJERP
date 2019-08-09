<template>
  <div id="productStockCreate"
    v-loading="loading">
    <div class="head">
      <h2>产品库存录入</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content important">{{product.product_code}}</span>
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
          <span class="label">创建人:</span>
          <span class="content">{{product.user_name}}</span>
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
            <span class="size">{{item[0].weight}}g(克重)</span>
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
          <span class="content">{{product.description?product.description:'暂无信息'}}</span>
        </div>
      </div>
      <div class="border"></div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">订单号:</span>
          <el-input class="elSelect"
            placeholder="请输入库存来源订单号"
            v-model="orderId"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">选择尺码:</span>
          <el-select class="elSelect"
            v-model="size"
            placeholder="请选择尺码">
            <el-option v-for="item in sizeArr"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">选择配色:</span>
          <el-select class="elSelect"
            v-model="colour"
            placeholder="请选择配色">
            <el-option v-for="item in colourArr"
              :key="item.name"
              :label="item.name"
              :value="item.name">
              <div class="bgBlock"
                :style="{'background':item.color_code}"></div>
              <div class="desc">{{item.name}}</div>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">录入库存数:</span>
          <el-input class="elSelect"
            placeholder="请输入录入数量"
            v-model="numbers">
            <template slot="append">{{unit}}</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine"
          style="display:block">
          <span class="label">是否有次品:</span>
          <div class="radioCtn">
            <el-radio v-model="ifBad"
              :label="true">有次品</el-radio>
            <el-radio v-model="ifBad"
              :label="false">无次品</el-radio>
          </div>
          <div class="block"
            v-for="(item,index) in inferior"
            :key="index">
            <el-input class="elSelect"
              placeholder="请输入数量"
              v-model="inferior[index].num">
              <template slot="append">{{unit}}</template>
            </el-input>
            <el-input class="elSelect"
              placeholder="请输入次品原因"
              v-model="inferior[index].reason"></el-input>
            <i class="el-icon-delete"
              @click="deleteInferior(index)"></i>
          </div>
          <div class="block"
            v-if="ifBad">
            <div class="addBtn"
              style="margin-left:15px"
              @click="inferior.push({num:'',reason:''})">
              <span>添加次品</span>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">成本价:</span>
          <el-input class="elSelect"
            placeholder="请输入成本价"
            v-model="cost">
            <template slot="append">元/{{unit}}</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">总价:</span>
          <el-input class="elSelect"
            placeholder="总价"
            disabled
            v-model="totalPrice">
            <template slot="append">元</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">存放时间:</span>
          <el-date-picker v-model="date"
            type="date"
            class="elSelect"
            value-format="yyyy-MM-dd"
            placeholder="选择存放日期">
          </el-date-picker>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">备注:</span>
          <el-input style="width:670px;margin-left:15px"
            type="textarea"
            :rows="6"
            v-model="otherInfo"
            placeholder="其他信息填写"></el-input>
        </div>
      </div>
      <div class="bottom">
        <div class="cancleBtn"
          @click="clearAll">清空</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, productStockSave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      lock: false,
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
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
      sizeArr: [],
      colourArr: [],
      unit: '',
      size: '',
      colour: '',
      date: '',
      otherInfo: '',
      ifBad: false,
      numbers: '',
      cost: '',
      inferior: [],
      orderId: ''
    }
  },
  mounted () {
    Promise.all([
      porductOne({
        id: this.$route.params.id
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
      this.loading = false
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
  watch: {
    ifBad (newVal) {
      if (newVal) {
        this.inferior.push({
          num: '',
          reason: ''
        })
      } else {
        this.inferior = []
      }
    }
  },
  computed: {
    totalPrice () {
      let danjia = this.cost ? this.cost : 1
      let number = this.numbers
      this.inferior.forEach((item) => {
        number -= item.num
      })
      return number * danjia
    }
  },
  methods: {
    // 删除次品
    deleteInferior (index) {
      if (this.inferior.length > 1) {
        this.inferior.splice(index, 1)
      } else {
        this.inferior = []
        this.ifBad = false
      }
    },
    clearAll () {

    },
    saveAll () {
      if (!this.lock) {
        if (!this.size) {
          this.$message.error({
            message: '检测到未选择产品尺码,请选择后提交'
          })
          return
        }
        if (!this.colour) {
          this.$message.error({
            message: '检测到未选择产品颜色,请选择后提交'
          })
          return
        }
        if (!this.date) {
          this.$message.error({
            message: '检测到未选择存放日期,请选择后提交'
          })
          return
        }
        if (!this.cost) {
          this.$message.error({
            message: '检测到未填写成本价,请填写后提交'
          })
          return
        }
        console.log(this.inferior)

        this.lock = true
        this.loading = true
        let json = {
          user_id: window.sessionStorage.getItem('user_id'),
          order_code: this.orderId,
          company_id: window.sessionStorage.getItem('company_id'),
          product_id: this.$route.params.id,
          size: this.size,
          color: this.colour,
          stock_number: this.numbers,
          rejects_product: JSON.stringify(this.inferior),
          cost_price: this.cost,
          total_price: this.totalPrice,
          storage_time: this.date,
          remark: this.otherInfo,
          store_id: null
        }
        productStockSave({ data: [json] }).then((res) => {
          console.log(res)
          if (res.data.status) {
            this.$message.success({
              message: '保存成功'
            })
            this.$router.push('/index/productStockList')
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
          this.lock = false
          this.loading = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productStockCreate.less";
</style>
<style lang="less">
#productStockCreate {
  .onceLine {
    .el-input__inner {
      background: #f8f8f8;
    }
  }
}
</style>
