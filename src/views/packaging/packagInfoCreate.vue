<template>
  <div id="packagOutStock"
    v-loading="loading">
    <div class="head">
      <h2>添加装箱资料</h2>
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
        <div class="stepTitle">发货批次信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>发货日期</span>
                  <span class="flex3">
                    <span>产品品类</span>
                    <span>
                      <span>尺码/颜色</span>
                      <span>发货数量</span>
                    </span>
                  </span>
                </li>
                <li class="content">
                  <span style="line-height:1.5em"
                    class="tableRow">
                    <div>
                      <span>{{'第' + chinaNumber(batchList.id) + '批'}}</span>
                      <span>{{batchList.delivery_time}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex3">
                    <template v-if="batchList.product_info.length !== 0">
                      <span v-for="(val,ind) in batchList.product_info"
                        :key="ind"
                        class="tableColumn">
                        <span style="line-height:1.5em"
                          class="tableRow">
                          <div>
                            <span>{{val.product_type}}</span>
                            <span class="blue"
                              @click="$router.push('/index/productDetail/' + val.product_code)">{{val.product_code}}</span>
                          </div>
                        </span>
                        <span class="tableRow col">
                          <span class="tableColumn"
                            v-for="(valSize,indSize) in val.size_info"
                            :key="indSize">
                            <span class="tableRow">{{valSize.size}}/{{valSize.color}}</span>
                            <span class="tableRow">{{valSize.number}}条</span>
                          </span>
                        </span>
                      </span>
                    </template>
                    <span class="tableColumn"
                      v-else>暂无该批次信息</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">添加装箱信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn"
                style="width:900px;">
                <li class="title">
                  <span>订单批次</span>
                  <span class="flex4">
                    <span>包装序号</span>
                    <span class="flex3">
                      <span class="flex17">产品信息</span>
                      <span>尺码/颜色</span>
                      <span>产品数量</span>
                    </span>
                  </span>
                </li>
                <li class="content">
                  <span class="tableRow"
                    style="line-height:1.5em">
                    <div>
                      <span>第{{chinaNumber(list.packagInfo.id)}}批</span>
                      <span>{{list.packagInfo.delivery_time}}</span>
                    </div>
                  </span>
                  <template v-if="list.packagList.length !== 0">
                    <span class="tableRow flex4 col">
                      <span class="tableColumn"
                        v-for="(item,key) in list.packagList"
                        :key="key">
                        <span class="tableRow">{{item.packag_code}}</span>
                        <span class="tableRow col flex3">
                          <span class="tableColumn"
                            v-for="(valPro,indPro) in item.product_info"
                            :key="indPro">
                            <span class="tableRow flex17"
                              style="line-height:1.5em">
                              <div>
                                <span>{{valPro.product_code}}</span>
                                <span>{{valPro.product_type}}</span>
                              </div>
                            </span>
                            <span class="tableRow">{{valPro.product_size}}/{{valPro.product_color}}</span>
                            <span class="tableRow">{{valPro.number}}条</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </template>
                  <span v-else
                    class="tableRow flex4">暂无装箱信息</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list.packagInfo.packagPageInfo"
              :key="key"
              style="height:400px;">
              <li>
                <div class="divInp">
                  <span>包装序号:</span>
                  <el-input size="small"
                    style="width:108px"
                    placeholder="起始箱号"
                    v-model="item.pack_start"
                    :disabled="key !== 0"
                    @input="changeCounts(key,item.pack_start)">
                  </el-input>
                  <strong>——</strong>
                  <el-input size="small"
                    style="width:108px;margin-left:0;"
                    placeholder="末尾箱号"
                    v-model="item.pack_end">
                  </el-input>
                </div>
              </li>
              <li>
                <span>包装类型:</span>
                <el-select v-model="item.pack_material"
                  placeholder="请选择辅料"
                  filterable
                  size="small">
                  <el-option v-for="value in packList"
                    :key="value.id"
                    :label="value.name + '(' + value.size + ')'"
                    :value="value.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="divInp">
                  <span>包装重量:</span>
                  <el-input size="small"
                    style="width:108px"
                    placeholder="毛重(kg)"
                    v-model="item.weight">
                  </el-input>
                  <strong>——</strong>
                  <el-input size="small"
                    style="width:108px;margin-left:0;"
                    placeholder="净重(kg)"
                    v-model="item.only_weight">
                  </el-input>
                </div>
              </li>
              <li class="col"
                v-for="(valPro,indPro) in item.product_info"
                :key="indPro">
                <div class="divInp">
                  <span>{{indPro === 0 ? '产品数量:' : ''}}</span>
                  <el-cascader v-model="valPro.product"
                    :options="productList"
                    placeholder="请选择产品"
                    style="width:243px;height:32px;"></el-cascader>
                </div>
                <div class="divInp">
                  <span></span>
                  <el-input size="small"
                    style="width:108px;"
                    placeholder="单箱数量"
                    v-model="valPro.one_number">
                  </el-input>
                  <strong>——</strong>
                  <el-input size="small"
                    style="width:108px;"
                    disabled
                    placeholder="合计数量"
                    v-model="valPro.all_number">
                  </el-input>
                </div>
                <em class="el-icon-plus"
                  v-if="indPro === 0"
                  style="top:13px;"
                  @click="addProduct(key)"></em>
                <em class="el-icon-minus"
                  style="top:13px;"
                  v-else
                  @click="deleteProduct(key,indPro)"></em>
              </li>
              <li>
                <span>备注:</span>
                <el-input type="textarea"
                  placeholder="请输入内容"
                  style="width:243px;height:45px;"
                  v-model="item.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                @click="deletePackagInfo(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addPackagInfo">
            <span>+</span>
            <span>添加包装</span>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll()">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, clientList, packagMaterialList, packagCreate } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      save: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      count: 0,
      counts: 0,
      batchList: {
        product_info: []
      },
      list: {
        packagInfo: {
          packagPageInfo: []
        },
        packagList: []
      },
      productList: [],
      packList: []
    }
  },
  watch: {
    'list.packagInfo.packagPageInfo': {
      deep: true,
      handler: function (newVal) {
        this.list.packagList = []
        this.count = this.counts ? this.counts : 0
        newVal.forEach((item, key) => {
          item.pack_start = Number(this.count) + 1
          this.count = (item.pack_end ? item.pack_end : item.pack_start)
          let obj = {
            packag_code: item.pack_start + '-' + (item.pack_end ? item.pack_end : item.pack_start),
            product_info: []
          }
          item.product_info.forEach(valPro => {
            obj.product_info.push({
              product_code: valPro.product[0] ? valPro.product[0].split(' ')[0] : '',
              product_type: valPro.product[0] ? valPro.product[0].split(' ')[1] : '',
              product_size: valPro.product[1] ? valPro.product[1] : '',
              product_color: valPro.product[2] ? valPro.product[2] : '',
              number: valPro.all_number ? valPro.all_number : 0
            })
            console.log(valPro)
            if (item.pack_end || valPro.one_number) {
              valPro.all_number = valPro.one_number * ((item.pack_end > item.pack_start ? item.pack_end : item.pack_start) - item.pack_start + 1)
            }
          })
          this.list.packagList.push(JSON.parse(JSON.stringify(obj)))
        })
      }
    }
  },
  methods: {
    changeCounts (key, value) {
      console.log(this.counts)
      if (key === 0 && value !== this.counts + 1) {
        this.counts = value - 1
      }
    },
    chinaNumber (key) {
      let obj = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      }
      if (key / 10 > 1) {
        let str = ''
        str = obj[Math.floor(key / 10)] + '十' + obj[key % 10]
        return str
      } else {
        return obj[key]
      }
    },
    addProduct (key) {
      this.list.packagInfo.packagPageInfo[key].product_info.push({
        product: [],
        one_number: '',
        all_number: ''
      })
    },
    deleteProduct (key, indPro) {
      this.list.packagInfo.packagPageInfo[key].product_info.splice(indPro, 1)
    },
    addPackagInfo () {
      console.log(this.count)
      this.list.packagInfo.packagPageInfo.push({
        pack_start: this.count + 1,
        pack_end: '',
        pack_material: '',
        weight: '',
        only_weight: '',
        remark: '',
        product_info: [{
          product: [],
          one_number: '',
          all_number: ''
        }]
      })
    },
    deletePackagInfo (key) {
      this.list.packagInfo.packagPageInfo.splice(key, 1)
    },
    saveAll () {
      if (this.save) {
        this.save = false
        let data = []
        let flag = true
        this.list.packagInfo.packagPageInfo.forEach(item => {
          if (!item.pack_material) {
            this.$message({
              type: 'error',
              message: `请选择包装类型`
            })
            flag = false
            return
          }
          if (!item.weight) {
            this.$message({
              type: 'error',
              message: `请输入毛重`
            })
            flag = false
            return
          }
          if (!item.only_weight) {
            this.$message({
              type: 'error',
              message: `请输入净重`
            })
            flag = false
            return
          }
          item.product_info.forEach(valPro => {
            if (valPro.product.length === 0) {
              this.$message({
                type: 'error',
                message: `请选择产品`
              })
              flag = false
              return
            }
            if (!valPro.one_number) {
              this.$message({
                type: 'error',
                message: `请输入单箱产品数量`
              })
              flag = false
              return
            }
            if (!valPro.all_number) {
              this.$message({
                type: 'error',
                message: `请输入合计产品数量`
              })
              flag = false
            }
          })
          data.push({
            order_id: this.$route.params.id,
            user_id: window.sessionStorage.getItem('user_id'),
            pack_code: item.pack_start + '-' + (item.pack_end ? item.pack_end : item.pack_start),
            pack_material: item.pack_material,
            weight: item.weight,
            net_weight: item.only_weight,
            product_info: JSON.stringify(item.product_info),
            desc: item.remark,
            batch_id: this.$route.params.batchId
          })
        })
        if (flag) {
          if (data.length !== 0) {
            packagCreate({
              data: data
            }).then(res => {
              console.log(res)
              this.$message({
                type: 'success',
                message: `添加成功,即将跳转至详情页！`
              })
              setTimeout(() => { this.$router.push('/index/packagOutStockDetail/' + this.$route.params.id) }, 1000)
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
      let shipClientInfo = res[1].data.data
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化发货批次信息
      orderInfo.order_batch.forEach(valBatch => {
        valBatch.batch_info.forEach(valPro => {
          valPro.size.forEach(valSize => {
            if (valBatch.batch_id === Number(this.$route.params.batchId)) {
              this.batchList.id = valBatch.batch_id
              this.batchList.delivery_time = valBatch.delivery_time
              if (!this.batchList.product_info) {
                this.batchList.product_info = []
              }
              let flag = this.batchList.product_info.find(key => key.product_code === valPro.productCode)
              if (!flag) {
                this.batchList.product_info.push({
                  product_code: valPro.productCode,
                  product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : ''),
                  size_info: [{
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  }]
                })
              } else {
                let flag1 = flag.size_info.find(key => (key.size === valSize.name[0] && key.color === valSize.name[1]))
                if (!flag1) {
                  flag.size_info.push({
                    size: valSize.name[0],
                    color: valSize.name[1],
                    number: valSize.numbers
                  })
                } else {
                  flag1.number = Number(flag1.number) + Number(valSize.numbers)
                }
              }
              // 初始化装箱信息的批次信息
              this.list.packagInfo.id = valBatch.batch_id
              this.list.packagInfo.delivery_time = valBatch.delivery_time
              // 初始化装箱信息产品
              let str = valPro.productCode + ' ' + valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? '/' + valPro.productInfo.flower_id : '')
              let fleg = this.productList.find(key => key.value === str)
              if (!fleg) {
                this.productList.push({
                  value: str,
                  label: str,
                  children: [
                    {
                      label: valSize.name[0],
                      value: valSize.name[0],
                      children: [{
                        label: valSize.name[1],
                        value: valSize.name[1]
                      }]
                    }
                  ]
                })
              } else {
                let fleg1 = fleg.children.find(key => key.value === valSize.name[0])
                if (!fleg1) {
                  fleg.children.push({
                    value: valSize.name[0],
                    label: valSize.name[0],
                    children: [{
                      value: valSize.name[1],
                      label: valSize.name[1]
                    }]
                  })
                } else {
                  let fleg2 = fleg1.children.find(key => key.value === valSize.name[1])
                  if (!fleg2) {
                    fleg1.children.push({
                      value: valSize.name[1],
                      label: valSize.name[1]
                    })
                  }
                }
              }
            }
          })
        })
      })
      this.ship_client = shipClientInfo.filter(res => res.type === 7)
      this.packList = res[2].data.data
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagOutStock.less";
</style>
<style scope>
.el-input__inner {
  height: 32px;
  display: block !important;
}
.el-input {
  height: 32px;
  display: block !important;
}
.el-input__icon {
  line-height: 32px;
}
.el-cascader {
  line-height: 32px;
}
</style>
