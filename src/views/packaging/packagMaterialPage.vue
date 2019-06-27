<template>
  <div id="packagInfoCreate"
    v-loading="loading">
    <div class="head">
      <h2>包装辅料订购(未启用)</h2>
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
          <template v-if="productList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn"
                  style="width:900px;">
                  <li class="title">
                    <span>产品编号</span>
                    <span class="flex17">产品类别</span>
                    <span class="flex17">
                      <span>尺码颜色</span>
                      <span>发货数量</span>
                    </span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in productList"
                    :key="key">
                    <span class="tableRow blue"
                      @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                    <span class="tableRow flex17">{{item.type}}</span>
                    <span class="tableRow col flex17">
                      <span v-for="(val,ind) in item.size_info"
                        :key="ind"
                        class="tableColumn">
                        <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                        <span class="tableRow">{{val.plan_number ? val.plan_number : 0}}{{'条'}}</span>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else
            class="inputCtn">暂无信息</div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">订购包装辅料</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list"
              :key="key"
              style="height:470px">
              <li>
                <span>订购单位:</span>
                <el-select v-model="item.order_client"
                  placeholder="请选择订购来源"
                  size="small">
                  <el-option v-for="value in options.companyList"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id">
                  </el-option>
                </el-select>
              </li>
              <template v-for="(val,ind) in item.pack_info">
                <li :key="ind + 'name'">
                  <span>包装辅料:</span>
                  <el-select v-model="val.pack_name"
                    placeholder="请选择辅料"
                    size="small">
                    <el-option v-for="value in options.packList"
                      :key="value.id"
                      :label="value.name"
                      :value="value.id">
                    </el-option>
                  </el-select>
                  <em class="el-icon-plus"
                    style="top:15px;"
                    v-if="ind === 0"
                    @click="addPackInfo(key)"></em>
                  <em class="el-icon-minus"
                    v-else
                    style="top:15px"
                    @click="deletePackInfo(key,ind)"></em>
                </li>
                <li :key="ind + 'attr'">
                  <span>辅料属性:</span>
                  <div style="margin-left:15px;padding-left:15px;width:228px;position: relative;height:32px;line-height:32px;">
                    <span>{{val.pack_attr ? val.pack_attr.name : ''}}</span>
                    <el-popover placement="top"
                      width="200"
                      trigger="click"
                      class="clickWatch">
                      <ul>
                        <template v-if="val.pack_attr">
                          <li>编号:{{val.pack_attr.id}}</li>
                          <li>名称:{{val.pack_attr.name}}</li>
                          <li>规格:{{val.pack_attr.size ? val.pack_attr.size : '暂无'}}</li>
                          <li>属性:
                            <!-- {{val.pack_attr}} -->
                            <template v-for="(valAttr,indAttr) in val.pack_attr.attribute">{{((indAttr !== 0) ? ',' : '') + valAttr.pack_attr }}</template>
                          </li>
                          <li>备注:{{val.pack_attr.desc ? val.pack_attr.desc : '暂无'}}</li>
                        </template>
                        <li v-else>暂无</li>
                      </ul>
                      <span slot="reference">点击查看</span>
                    </el-popover>
                  </div>
                </li>
                <li :key="ind + 'price'">
                  <span>数量单价:</span>
                  <el-input size="small"
                    placeholder="数量"
                    v-model="val.number"
                    style="width:108px;">
                  </el-input>
                  <strong style="color:#BBB;font-weight:400;">——</strong>
                  <el-input size="small"
                    placeholder="单价"
                    v-model="val.price"
                    style="width:108px;margin-left:0;">
                  </el-input>
                </li>
              </template>
              <li>
                <span>总价:</span>
                <el-input size="small"
                  placeholder="总价"
                  :disabled="true"
                  v-model="item.total_price"
                  style="width:243px;">
                  <template slot="append">元</template>
                </el-input>
              </li>
              <li>
                <span>订购日期:</span>
                <el-date-picker v-model="item.order_time"
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
                  v-model="item.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                @click="deleteOrderPage(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addOrderPage()">
            <span>+</span>
            <span>添加订购</span>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-top:40px;">
          <div class="inputCtn noPadding">
            <div class="content">
              <el-input placeholder="总计"
                v-model="total_price"
                :disabled="true"
                style="width:300px;">
                <template slot="prepend">共计</template>
                <template slot="append">元</template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="stepCtn">
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
              v-for="(iten,key) in item.orderClientInfo"
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
      </div> -->
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
import { orderDetail, clientList, packagMaterialList, packagMaterialPage } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      save: true,
      // now_time: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: [],
      total_price: 0,
      list: [{
        order_client: '',
        pack_info: [{
          number: '',
          pack_name: '',
          price: ''
        }],
        total_price: '',
        order_time: this.now_time,
        remark: ''
      }],
      options: {
        companyList: [],
        packList: []
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
        console.log(newVal)
        this.total_price = 0
        newVal.forEach(item => {
          let price = 0
          item.pack_info.forEach(value => {
            if (value.pack_name) {
              value.pack_attr = this.options.packList.find(key => key.id === value.pack_name)
            }
            this.total_price += (value.number ? value.number : 0) * (value.price ? value.price : 0)
            price += (value.number ? value.number : 0) * (value.price ? value.price : 0)
          })
          item.total_price = price
        })
      }
    }
  },
  methods: {
    addPackInfo (key) {
      this.list[key].pack_info.push({
        number: '',
        pack_name: '',
        price: ''
      })
    },
    deletePackInfo (key, ind) {
      this.list[key].pack_info.splice(ind, 1)
    },
    addOrderPage () {
      this.list.push({
        order_client: '',
        pack_info: [{
          number: '',
          pack_name: '',
          price: ''
        }],
        total_price: '',
        order_time: this.now_time,
        remark: ''
      })
    },
    deleteOrderPage (key) {
      this.list.splice(key, 1)
    },
    saveAll () {
      if (this.save) {
        this.save = false
        let data = []
        let flag = true
        this.list.forEach(item => {
          if (!item.order_client) {
            this.$message({
              type: 'error',
              message: `请选择订购单位`
            })
            flag = false
            return
          }
          if (!item.order_time) {
            this.$message({
              type: 'error',
              message: `请选择订购日期`
            })
            flag = false
            return
          }
          item.pack_info.forEach(valPack => {
            if (!valPack.pack_name) {
              this.$message({
                type: 'error',
                message: `请选择包装辅料`
              })
              flag = false
              return
            }
            if (!valPack.number) {
              this.$message({
                type: 'error',
                message: `请输入订购数量`
              })
              flag = false
              return
            }
            if (!valPack.price) {
              this.$message({
                type: 'error',
                message: `请输入订购单价`
              })
              flag = false
              return
            }
            data.push({
              user_id: window.sessionStorage.getItem('user_id'),
              order_id: this.$route.params.id,
              material_id: valPack.pack_name,
              client_id: item.order_client,
              number: valPack.number,
              price: valPack.price,
              order_time: item.order_time,
              desc: item.remark,
              attribute: JSON.stringify(valPack.pack_attr.attribute)
            })
          })
        })
        if (flag) {
          if (this.list.length !== 0) {
            packagMaterialPage({
              data: data
            }).then(res => {
              this.$message({
                type: 'success',
                message: `添加成功`
              })
            })
          } else {
            this.$message({
              type: 'warning',
              message: `无可提交的数据`
            })
          }
        }
        setTimeout(() => { this.save = true }, 1000)
        console.log(data)
      } else {
        this.$alert('请求速度过于频繁', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请于1s后重新请求`
            })
          }
        })
      }
    }
  },
  beforeCreate () {
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    // console.log(this.now_time)
  },
  created () {
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }),
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      packagMaterialList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      let clientInfo = res[1].data.data
      let packagMaterialInfo = res[2].data.data
      // console.log('orderInfo', orderInfo)
      // console.log('clientInfo', clientInfo)
      // 初始化包装辅料数组
      this.options.packList = packagMaterialInfo
      this.options.packList.map(res => {
        res.attribute = JSON.parse(res.attribute)
      })
      // console.log(this.options.packList)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          value.size.forEach(val => {
            let flag = this.productList.find(key => key.product_code === value.productCode)
            if (!flag) {
              let type = value.productInfo.category_info.product_category + '/' + value.productInfo.type_name + '/' + value.productInfo.style_name + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
              this.productList.push({
                product_code: value.productCode,
                type: type,
                size_info: [{
                  size: val.name[0],
                  color: val.name[1],
                  plan_number: val.numbers
                }]
              })
            } else {
              let flag1 = flag.size_info.find(key => (key.size === val.name[0] && key.color === val.name[1]))
              if (!flag1) {
                flag.size_info.push({
                  size: val.name[0],
                  color: val.name[1],
                  plan_number: val.numbers
                })
              } else {
                flag1.plan_number = Number(flag1.plan_number) + Number(val.numbers)
              }
            }
          })
        })
      })
      // 初始化包装辅料订购单位
      let arr = clientInfo.filter(key => key.type === 7)
      this.options.companyList = arr
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagInfoCreate.less";
</style>
