<template>
  <div id="packagInfoCreate"
    v-loading="loading">
    <div class="head">
      <h2>包装辅料订购</h2>
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
        <div class="stepTitle">装箱预计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>包装编号</span>
                  <span>包装分类</span>
                  <span class="flex17">规格/属性</span>
                  <span class="flex5">
                    <span class="flex2">产品/包装</span>
                    <span>尺码颜色</span>
                    <span>产品数量</span>
                    <span>每包数量</span>
                  </span>
                  <span class="flex17">预计包装数量</span>
                </li>
                <li v-if="list.packagList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in list.packagList"
                  :key="key">
                  <span class="tableRow">{{item.code}}</span>
                  <span class="tableRow">{{item.type}}</span>
                  <span class="tableRow flex17"
                    style="line-height:1.5em;">
                    <div style="padding:5px 0;">
                      <span>{{item.size}}</span>
                      <span>{{item.attr}}</span>
                    </div>
                  </span>
                  <span class="tableRow flex5 col">
                    <span v-for="(value,index) in item.product_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow flex2"
                        style="line-height:1.5em;">
                        <div style="padding:5px 0;">
                          <span>{{value.code}}</span>
                          <span>{{value.type}}</span>
                        </div>
                      </span>
                      <span class="tableRow">{{value.size + '/' + value.color}}</span>
                      <span class="tableRow">{{value.plan_number ? value.plan_number : 0}}{{value.unit}}</span>
                      <span class="tableRow">{{value.one_number}}{{(value.unit ? value.unit : '条')+'/'+(item.unit ? item.unit : '包')}}</span>
                    </span>
                  </span>
                  <span class="tableRow flex17">{{item.packag_number}}{{item.unit}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">其他辅料统计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span class="flex17">产品/包装</span>
                  <span>尺码/颜色</span>
                  <span class="flex5">
                    <span>辅料名称</span>
                    <span>辅料属性</span>
                    <span>产品数量</span>
                    <span>包装要求</span>
                    <span>辅料数量</span>
                  </span>
                </li>
                <li v-if="list.packagMaterialList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in list.packagMaterialList"
                  :key="key">
                  <span class="tableRow flex17"
                    style="line-height:1.5em;">
                    <div>
                      <span>{{item.code}}</span>
                      <span>{{item.type}}</span>
                    </div>
                  </span>
                  <span class="tableRow">{{item.size}}{{'/'}}{{item.color}}</span>
                  <span class="tableRow flex5 col">
                    <span v-for="(value,index) in item.material_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow">{{value.name}}</span>
                      <span class="tableRow">{{value.attr ? value.attr : '无'}}</span>
                      <span class="tableRow">{{item.number ? item.number : 0}}{{item.unit}}</span>
                      <span class="tableRow">{{value.packag_number?value.packag_number:0}}{{(value.unit ? value.unit : '条') + '/' + (item.unit ? item.unit : '包')}}</span>
                      <span class="tableRow">{{(item.number ? item.number : 0) * value.packag_number}}{{value.unit}}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">订购包装辅料</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col"
          v-for="(item,key) in list.orderInfo"
          :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>辅料名称</span>
              <span>辅料规格</span>
              <span>辅料属性</span>
              <span>计划数量</span>
              <span>已订数量</span>
              <span>预计损耗</span>
            </div>
            <div class="tableInfo">
              <span>{{item.name ? item.name : '无'}}</span>
              <span>{{item.size ? item.size : '无'}}</span>
              <span>{{item.attr ? item.attr : '无'}}</span>
              <span>{{item.plan_number ? item.plan_number : 0}}{{item.unit}}</span>
              <span>{{Number(item.select_number ?item.select_number : 0) + Number(item.selects_number ? item.selects_number : 0)}}{{item.unit}}</span>
              <span>{{(((Number(item.select_number ?item.select_number : 0) + Number(item.selects_number ? item.selects_number : 0) - (item.plan_number ? item.plan_number : 0))/(item.plan_number ? item.plan_number : 0))*100).toFixed(2) > 0 ? (((Number(item.select_number ?item.select_number : 0) + Number(item.selects_number ? item.selects_number : 0) - (item.plan_number ? item.plan_number : 0))/(item.plan_number ? item.plan_number : 0))*100).toFixed(2) + '%' : '0%'}}</span>
            </div>
          </div>
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(iten,kay) in item.orderClientInfo"
              :key="kay"
              style="height:410px;">
              <li>
                <span>订购单位:</span>
                <el-select v-model="iten.order_client"
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
                <span>订购数量:</span>
                <el-input size="small"
                  placeholder="请输入订购数量"
                  v-model="iten.order_number"
                  style="width:243px;">
                </el-input>
              </li>
              <li>
                <span>单价:</span>
                <el-input size="small"
                  placeholder="请输入单价"
                  v-model="iten.price">
                </el-input>
                <i>元</i>
              </li>
              <li>
                <span>总价:</span>
                <el-input size="small"
                  placeholder="总价"
                  :disabled="true"
                  v-model="iten.total_price">
                </el-input>
                <i>元</i>
              </li>
              <li>
                <span>订购日期:</span>
                <el-date-picker v-model="iten.order_time"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  size="small"
                  style="width:243px">
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
                @click="deleteOrderClient(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addOrderClient(key)">
            <span>+</span>
            <span>订购单位</span>
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
import { orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      list: {
        packagList: [
          {
            code: '1A1',
            type: '袋子',
            size: '60*40*60cm',
            attr: '印字',
            unit: '袋',
            packag_number: '2000',
            product_info: [{
              code: 'ES5623134',
              type: '围巾/针织/长巾',
              size: '均码',
              color: '黄色',
              plan_number: '4000',
              one_number: '2',
              unit: '条'
            }, {
              code: 'ES5623144',
              type: '围巾/针织/长巾',
              size: '均码',
              color: '黑色',
              plan_number: '2000',
              one_number: '1',
              unit: '条'
            }]
          }, {
            code: '1A2',
            type: '袋子',
            size: '60*40*80cm',
            attr: '印字',
            unit: '袋',
            packag_number: '2000',
            product_info: [{
              code: 'ES5623134',
              type: '围巾/针织/长巾',
              size: '均码',
              color: '黄色',
              plan_number: '4000',
              one_number: '2',
              unit: '条'
            }, {
              code: 'ES5623144',
              type: '围巾/针织/长巾',
              size: '均码',
              color: '黑色',
              plan_number: '2000',
              one_number: '1',
              unit: '条'
            }]
          }
        ],
        packagMaterialList: [
          {
            code: '19abcde122',
            type: '围巾/针织/帽子/素色',
            size: '均码',
            color: '黄色',
            number: 2000,
            material_info: [
              {
                name: '吊牌',
                attr: '',
                packag_number: '2',
                unit: '个'
              }, {
                name: '衣架',
                attr: '',
                packag_number: '1',
                unit: '个'
              }
            ]

          }
        ],
        orderInfo: []
      },
      options: {
        productArr: []
      }
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  watch: {
    'list.orderInfo': {
      handler: function (newVal) {
        newVal.forEach(item => {
          let num = 0 // 已选数量统计
          item.orderClientInfo.forEach(val => {
            num += Number(val.order_number)
            val.total_price = val.price * val.order_number
          })
          item.select_number = num
        })
      },
      deep: true
    }
  },
  methods: {
    addOrderClient (key) {
      this.list.orderInfo[key].orderClientInfo.push({
        order_client: '',
        order_number: '',
        price: '',
        total_price: '',
        order_time: this.now_time,
        remark: ''
      })
      console.log(this.list.orderInfo)
    },
    deleteOrderClient (key, index) {
      this.list.orderInfo[key].orderClientInfo.splice(index, 1)
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
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      // console.log('orderInfo', orderInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化订购信息
      this.list.packagList.forEach(item => {
        let flag = this.list.orderInfo.find(key => (key.name === item.type && key.size === item.size && key.attr === item.attr))
        if (!flag) {
          this.list.orderInfo.push({
            name: item.type,
            size: item.size,
            attr: item.attr,
            unit: item.unit,
            plan_number: item.packag_number,
            orderClientInfo: []
          })
        } else {
          flag.plan_number = Number(flag.plan_number) + Number(item.packag_number)
        }
      })
      this.list.packagMaterialList.forEach(item => {
        item.material_info.forEach(val => {
          let flag = this.list.orderInfo.find(key => (key.name === val.name && key.attr === val.attr))
          if (!flag) {
            this.list.orderInfo.push({
              name: val.name,
              attr: val.attr,
              unit: val.unit,
              plan_number: val.packag_number * item.number,
              orderClientInfo: []
            })
          } else {
            flag.plan_number = Number(flag.plan_number) + (val.packag_number * item.number)
          }
        })
      })
      console.log(this.list.orderInfo)
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagInfoCreate.less";
</style>
