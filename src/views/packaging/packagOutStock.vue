<template>
  <div id="packagOutStock"
    v-loading="loading">
    <div class="head">
      <h2>装箱出库
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
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
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">包装资料:</span>
            <span class="content">
              <template v-if="pack_means.length === 0">暂无文件</template>
              <a target="view_window"
                v-for="(item,key) in pack_means"
                :key="key"
                :href="item"
                style="color:#1A95FF"
                :download="item">
                <i class="el-icon-document"
                  style="margin-right:5px"></i>{{item.replace('https://zhihui.tlkrzf.com/', '')}}
              </a>
            </span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">装箱资料:</span>
            <span class="content">
              <template v-if="store_means.length === 0">暂无文件</template>
              <a target="view_window"
                v-for="(item,key) in store_means"
                :key="key"
                :href="item"
                style="color:#1A95FF"
                :download="item">
                <i class="el-icon-document"
                  style="margin-right:5px"></i>{{item.replace('https://zhihui.tlkrzf.com/', '')}}
              </a>
            </span>
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
                              @click="$router.push('/index/productDetail/' + val.product_id)">{{val.product_code}}</span>
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
        <div class="stepTitle">出库信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list.outStockInfo"
              :key="key"
              style="height:460px">
              <li>
                <span>运输单位:</span>
                <el-select v-model="item.ship_client"
                  placeholder="请选择运输单位"
                  size="small"
                  style="width:243px;">
                  <el-option v-for="type in ship_client"
                    :key="type.id"
                    :label="type.name"
                    :value="type.id">
                  </el-option>
                </el-select>
              </li>
              <li class="col">
                <div class="divInp">
                  <span>出库箱数:</span>
                  <el-input size="small"
                    style="width:243px;"
                    placeholder="请输入出库箱数"
                    v-model="item.pack_number">
                  </el-input>
                </div>
              </li>
              <li>
                <span style="width:6em;transform: translateX(-1em);margin-right:0">出库立方数:</span>
                <el-input size="small"
                  style="width:243px;"
                  placeholder="请输入出库立方数(m³)"
                  v-model="item.outStock_bluk">
                </el-input>
              </li>
              <li>
                <span>出库国家:</span>
                <el-select v-model="item.outStock_countries"
                  placeholder="请选择出库国家"
                  size="small"
                  filterable
                  style="width:243px;">
                  <el-option v-for="type in countries"
                    :key="type.id"
                    :value="type">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>运输地址:</span>
                <el-input size="small"
                  style="width:243px;"
                  placeholder="请输入运输地址"
                  v-model="item.address">
                </el-input>
              </li>
              <li>
                <span>到达港口:</span>
                <el-input size="small"
                  style="width:243px;"
                  placeholder="请输入到达港口"
                  v-model="item.port">
                </el-input>
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
                @click="deleteCountries(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addCountries">
            <span>+</span>
            <span>添加国家</span>
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
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>

<script>
import { countries } from '@/assets/js/dictionary.js'
import { orderDetail, clientList, outStockAdd, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'packagOutStock',
      showMsg: false,
      msgFlag: window.localStorage.getItem('packagOutStock') ? JSON.parse(window.localStorage.getItem('packagOutStock')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      save: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      pack_means: [],
      store_means: [],
      batchList: {
        product_info: []
      },
      list: {
        outStockInfo: [{
          outStock_countries: '',
          outStock_bluk: '',
          ship_client: '',
          address: '',
          port: '',
          remark: '',
          pack_number: ''
        }]
      },
      ship_client: [],
      countries: countries.split('、')
    }
  },
  methods: {
    afterSave (data) {
      this.msgFlag = data.msgFlag
    },
    sendMsg () {
      let data = JSON.parse(window.localStorage.getItem(this.localName))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: this.content,
        router_url: this.msgUrl,
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          this.$message.success('出库成功')
          this.$router.push(this.msgUrl)
        }
      })
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
    addCountries () {
      this.list.outStockInfo.push({
        outStock_countries: '',
        outStock_bluk: '',
        ship_client: '',
        address: '',
        port: '',
        remark: '',
        pack_number: ''
      })
    },
    deleteCountries (key) {
      this.list.outStockInfo.splice(key, 1)
    },
    saveAll () {
      if (this.save) {
        this.save = false
        let data = []
        let flag = true
        this.list.outStockInfo.forEach(item => {
          if (!item.ship_client) {
            this.$message({
              type: 'error',
              message: `请选择运输单位`
            })
            flag = false
            return
          }
          if (!item.pack_number) {
            this.$message({
              type: 'error',
              message: `请输入出库箱数`
            })
            flag = false
            return
          }
          if (!item.outStock_bluk) {
            this.$message({
              type: 'error',
              message: `请输入出库立方数`
            })
            flag = false
            return
          }
          data.push({
            company_id: window.sessionStorage.getItem('company_id'),
            order_id: this.$route.params.id,
            batch_id: this.$route.params.batchId,
            user_id: window.sessionStorage.getItem('user_id'),
            client_id: item.ship_client,
            number: item.pack_number,
            cubic_number: item.outStock_bluk,
            country: item.outStock_countries,
            address: item.address,
            port: item.port,
            cost: null,
            desc: item.remark
          })
        })
        if (flag) {
          if (data.length !== 0) {
            outStockAdd({
              data: data
            }).then(res => {
              if (res.data.status) {
                if (this.msgFlag) {
                  this.msgUrl = '/index/packagOutStockDetail/' + this.$route.params.id
                  this.content = '订单' + this.order_code + '<span style="color:#1A95FF">装箱出库</span>'
                  this.sendMsg()
                } else {
                  this.$message.success('添加成功')
                  this.$router.push('/index/packagOutStockDetail/' + this.$route.params.id)
                }
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: `无可提交的数据`
            })
          }
        }
        setTimeout(() => { this.save = true }, 1000)
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
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      let shipClientInfo = res[1].data.data
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      this.pack_means = orderInfo.pack_means ? JSON.parse(orderInfo.pack_means) : []
      this.store_means = orderInfo.store_means ? JSON.parse(orderInfo.store_means) : []
      // 初始化发货批次信息
      for (let prop in orderInfo.order_batch) {
        let valBatch = orderInfo.order_batch[prop]
        valBatch.forEach(valPro => {
          if (valPro.batch_id === Number(this.$route.params.batchId)) {
            this.batchList.id = valPro.batch_id
            this.batchList.delivery_time = valPro.delivery_time
            if (!this.batchList.product_info) {
              this.batchList.product_info = []
            }
            let flag = this.batchList.product_info.find(key => key.product_code === valPro.product_code)
            if (!flag) {
              this.batchList.product_info.push({
                product_id: valPro.product_id,
                product_code: valPro.product_code,
                product_type: valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + (valPro.category_info.flower_name ? '/' + valPro.category_info.flower_name : ''),
                size_info: [{
                  size: valPro.size,
                  color: valPro.color,
                  number: valPro.numbers
                }]
              })
            } else {
              let flag1 = flag.size_info.find(key => (key.size === valPro.size && key.color === valPro.color))
              if (!flag1) {
                flag.size_info.push({
                  size: valPro.size,
                  color: valPro.color,
                  number: valPro.numbers
                })
              } else {
                flag1.number = Number(flag1.number) + Number(valPro.numbers)
              }
            }
          }
        })
      }
      this.ship_client = shipClientInfo.filter(res => (res.type.indexOf(8) !== -1))
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
