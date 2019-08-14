<template>
  <div id="orderFinancialList"
    v-loading="loading">
    <div class="head">
      <h2>订单财务统计表</h2>
      <el-input style="width:250px"
        placeholder="输入订单号搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="totalCtn">
        <span>
          <span>订单总额</span>
          <span class="moneyTag">{{orderFinancialCount.total_order_price|filterNumber}}<span class="unit">万元</span></span>
        </span>
        <span>
          <span>下单数量</span>
          <span class="moneyTag">{{orderFinancialCount.total_order_number|filterNumber}}<span class="unit">万</span></span>
        </span>
        <span>
          <span>出库数量</span>
          <span class="moneyTag">{{orderFinancialCount.total_order_pop|filterNumber}}<span class="unit">万</span></span>
        </span>
        <span>
          <span>实际总值</span>
          <span class="moneyTag">{{orderFinancialCount.total_order_real_price|filterNumber}}<span class="unit">万元</span></span>
        </span>
        <span>
          <span>工厂成本</span>
          <span class="moneyTag">{{orderFinancialCount.total_order_cost|filterNumber}}<span class="unit">万元</span></span>
        </span>
      </div>
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
            v-show="clientValCmp"
            @close="clear('clientVal')">{{clientValCmp}}</el-tag>
          <el-tag closable
            v-show="groupValCmp"
            @close="clear('groupVal')">{{groupValCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div>
            <el-select v-model="clientVal"
              placeholder="筛选订单公司">
              <el-option v-for="item in clientList"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="groupVal"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-select v-model="moneyType"
              placeholder="切换币种">
              <el-option v-for="item in moneyTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select> -->
          </div>
          <div>
            <el-date-picker v-model="data"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="pickTime(data)">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span class="icon">
            订单号
          </span>
          <span>下单公司</span>
          <span class="icon">
            下单日期
          </span>
          <span class="icon">
            订单总值
          </span>
          <span class="icon">
            下单数量
          </span>
          <span class="icon">
            出库数量
          </span>
          <span class="icon">
            实际总值
          </span>
          <span class="icon">
            工厂成本
          </span>
          <span>负责小组</span>
          <span>操作</span>
        </div>
        <ul class="infinite-list">
          <div class="liBox">
            <li v-for="(item,key) in list"
              :key="key"
              class="infinite-list-item">
              <div class="list"
                @click="getInfo(item)">
                <span>
                  <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                  {{item.order_code}}</span>
                <span>{{item.order_client}}</span>
                <span>{{item.order_time}}</span>
                <span>{{item.order_total_price|filterToFixed}}{{item.account_unit}}</span>
                <span>{{item.order_number}}</span>
                <span>{{item.total_pop}}</span>
                <span>{{item.total_real|filterToFixed}}元</span>
                <span>{{item.company_cost|filterToFixed}}元</span>
                <span>{{item.group_name}}</span>
                <span>
                  <span class="btn"
                    @click.stop="$router.push('/index/orderDetailNew/' + item.order_id)">详情</span>
                </span>
              </div>
              <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                <div v-loading='item.loading'>
                  <span class="title">
                    <span>产品类型</span>
                    <span>订单总值</span>
                    <span>实际总值</span>
                    <span>产品图片</span>
                    <span class="flex05">尺码</span>
                    <span class="flex05">颜色</span>
                    <span class="flex08">单价</span>
                    <span>订单数量</span>
                    <span>发货数量</span>
                    <span>产品成本</span>
                  </span>
                  <span class="content"
                    v-for="(valPro,indPro) in item.product_info"
                    :key="indPro">
                    <span class=" col">
                      <span>{{valPro.product_code}}</span>
                      <span>{{valPro.product_type}}</span>
                    </span>
                    <span>{{valPro.order_total_price|filterToFixed}}{{item.account_unit}}</span>
                    <span>{{(valPro.total_real ? valPro.total_real : 0)|filterToFixed}}{{item.account_unit}}</span>
                    <span>
                      <div class="imgCtn">
                        <img class="img"
                          :src="valPro.img.length>0?valPro.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                          :onerror="defaultImg" />
                        <div class="toolTips"
                          v-if="valPro.img.length>0"><span @click="showImg(valPro.img)">点击查看大图</span></div>
                        <div class="toolTips"
                          v-if="valPro.img.length===0"><span>没有预览图</span></div>
                      </div>
                    </span>
                    <span class="flex38 col">
                      <span v-for="(valSize,indSize) in valPro.size_info"
                        :key="indSize">
                        <span class="flex05">{{valSize.size}}</span>
                        <span class="flex05">{{valSize.color}}</span>
                        <span class="flex08">{{valSize.one_price|filterToFixed}}{{item.account_unit}}/{{valPro.unit}}</span>
                        <span>{{valSize.order_number}}{{valPro.unit}}</span>
                        <span>{{valSize.pack_number ? valSize.pack_number : 0}}{{valPro.unit}}</span>
                      </span>
                    </span>
                    <span class="col">
                      <span>
                        <span>织造</span>
                        <span>{{(valPro.weave_price ? valPro.weave_price : 0)|filterToFixed}}元</span>
                      </span>
                      <span>
                        <span>加工</span>
                        <span>{{(valPro.process_price ? valPro.process_price : 0)|filterToFixed}}元</span>
                      </span>
                    </span>
                  </span>
                  <span class="title">
                    <span>其它成本</span>
                  </span>
                  <span class="content"
                    style="width:300px;">
                    <span class="col">
                      <span>
                        <span class="blue"
                          @click="open('rawMaterialOrderDetail',item.order_id,0)">原料订购</span>
                        <span>{{(item.main_material_order_price ? item.main_material_order_price : 0)|filterToFixed}}元</span>
                      </span>
                      <span>
                        <span class="blue"
                          @click="open('rawMaterialOrderDetail',item.order_id,1)">辅料订购</span>
                        <span>{{(item.other_material_order_price ? item.other_material_order_price : 0)|filterToFixed}}元</span>
                      </span>
                      <span>
                        <span class="blue"
                          @click="open('rawMaterialOrderDetail',item.order_id,0)">原料加工</span>
                        <span>{{(item.main_material_process_price ? item.main_material_process_price : 0)|filterToFixed}}元</span>
                      </span>
                      <span>
                        <span class="blue"
                          @click="open('rawMaterialOrderDetail',item.order_id,1)">辅料加工</span>
                        <span>{{(item.other_material_process_price ? item.other_material_process_price : 0)|filterToFixed}}元</span>
                      </span>
                      <span>
                        <span class="blue"
                          @click="open('packagDetail',item.order_id)">包装辅料订购</span>
                        <span>{{(item.pack_price ? item.pack_price : 0)|filterToFixed}}元</span>
                      </span>
                      <span>
                        <span class="blue"
                          @click="open('packagOutStockDetail',item.order_id)">运输</span>
                        <span>{{(item.transport_price ? item.transport_price : 0)|filterToFixed}}元</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </li>
            <li class="infinite-list-item"
              v-loading='!isOk'
              element-loading-text="数据加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
              <div class="list"
                style="justify-content:center;color:#DDD;"><span>没有更多了</span></div>
            </li>
          </div>
        </ul>
        <div class="footer">
          <span>合计</span>
          <span></span>
          <span></span>
          <span>{{nowCount.order_total_price/10000|filterNumber}}万元</span>
          <span>{{nowCount.order_total_number/10000|filterNumber}}万</span>
          <span>{{nowCount.outStock_total_number/10000|filterNumber}}万</span>
          <span>{{nowCount.order_total_real_price/10000|filterNumber}}万元</span>
          <span>{{nowCount.order_total_cost/10000|filterNumber}}万元</span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 图片弹窗 -->
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="closeBtn"
          @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside"
          height="550px"
          arrow="always">
          <el-carousel-item v-for="item in imgList"
            :key="item.image_url">
            <img :src="item.thumb"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { orderList, orderDetailNew, clientList, getGroup, orderFinancialCount } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      isOk: true, // 判断上一次请求是否完成
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      imgList: [],
      showShade: false,
      pages: 1,
      total: '',
      searchVal: '',
      clientVal: '',
      clientList: [],
      groupVal: '',
      groupList: [],
      moneyType: 'RMB',
      orderFinancialCount: {
        total_order_cost: '',
        total_order_number: '',
        total_order_pop: '',
        total_order_price: '',
        total_order_real_price: ''
      },
      nowCount: {
        order_total_price: 0,
        order_total_number: 0,
        outStock_total_number: 0,
        order_total_real_price: 0,
        order_total_cost: 0
      },
      moneyTypeList: [
        {
          label: '￥',
          id: 'RMB'
        }, {
          label: 'all',
          id: 'All'
        }
      ],
      data: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      list: []
    }
  },
  watch: {
    clientVal (newVal) {
      this.loading = true
      this.list = []
      this.pages = 1
      for (const prop in this.nowCount) {
        this.nowCount[prop] = 0
      }
      this.getList()
    },
    groupVal () {
      this.loading = true
      this.list = []
      this.pages = 1
      for (const prop in this.nowCount) {
        this.nowCount[prop] = 0
      }
      this.getList()
    }
  },
  computed: {
    clientValCmp () {
      if (this.clientVal) {
        return this.clientList.find((item) => item.id === this.clientVal).name
      } else {
        return '所有分类'
      }
    },
    groupValCmp () {
      if (this.groupVal) {
        return this.groupList.find((item) => item.id === this.groupVal).name
      } else {
        return ''
      }
    }
  },
  methods: {
    open (url, id, type) {
      window.open('/index/' + url + '/' + id + (type !== undefined ? '/' + type : ''))
    },
    getList (item) {
      this.isOk = false
      orderList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 10,
        client_id: this.clientVal,
        group_id: this.groupVal,
        page: this.pages,
        start_time: this.start_time,
        end_time: this.end_time
      }).then(res => {
        this.total = res.data.meta.total
        let data = res.data.data
        data.forEach(item => {
          let list = {}
          // 订单初步信息
          list.flag = false
          list.loading = true
          list.isGetInfo = false
          list.order_total_price = item.total_price
          list.order_code = item.order_code
          list.order_id = item.id
          list.order_client = item.client_name
          list.order_time = item.order_time
          list.group_name = item.group_name
          list.account_unit = item.account_unit
          list.company_cost = item.cost
          list.total_real = item.total_real
          list.total_pop = item.total_pop
          list.exchange_rate = item.exchange_rate / 100
          // 订单产品信息
          item.order_batch.forEach(item => {
            item.batch_info.forEach(valBat => {
              if (!list.product_info) {
                list.product_info = []
              }
              valBat.size.forEach(valSize => {
                list.order_number = Number(list.order_number ? list.order_number : 0) + Number(valSize.numbers)
                let pro = list.product_info.find(key => key.product_code === valBat.productCode)
                if (!pro) {
                  list.product_info.push({
                    product_code: valBat.productCode,
                    product_type: valBat.productInfo.category_info.product_category + '/' + valBat.productInfo.type_name + '/' + valBat.productInfo.style_name + (valBat.productInfo.flower_id ? '/' + valBat.productInfo.flower_id : ''),
                    order_total_price: valSize.unitPrice * valSize.numbers,
                    img: valBat.productInfo.img,
                    unit: valBat.productInfo.category_info.name,
                    size_info: [{
                      size: valSize.name[0],
                      color: valSize.name[1],
                      batch_id: item.batch_id,
                      one_price: valSize.unitPrice,
                      order_number: valSize.numbers
                    }]
                  })
                } else {
                  pro.order_total_price = Number(pro.order_total_price ? pro.order_total_price : 0) + Number(valSize.unitPrice * valSize.numbers)
                  let size = pro.size_info.find(key => (key.size === valSize.name[0] && key.color === valSize.name[1] && key.one_price === valSize.unitPrice))
                  if (!size) {
                    pro.size_info.push({
                      size: valSize.name[0],
                      color: valSize.name[1],
                      batch_id: item.batch_id,
                      one_price: valSize.unitPrice,
                      order_number: valSize.numbers
                    })
                  } else {
                    size.order_number = Number(size.order_number ? size.order_number : 0) + Number(valSize.numbers)
                  }
                }
              })
            })
          })
          this.nowCount.order_total_price += (list.order_total_price * list.exchange_rate)
          this.nowCount.order_total_number += Number(list.order_number)
          this.nowCount.order_total_real_price += Number(list.total_real)
          this.nowCount.outStock_total_number += Number(list.total_pop)
          this.nowCount.order_total_cost += Number(list.company_cost)
          this.list.push(list)
        })
        if (Math.ceil(this.total / 10) > this.pages) {
          this.pages++
          this.getList(true)
        } else {
          this.isOk = true
        }
        if (this.list.length >= 10 || this.isOk) { this.loading = false }
      })
    },
    // getData () {
    //   if (this.isOk) {
    //     let el = document.getElementsByClassName('infinite-list')[0]
    //     if (Number(el.scrollTop) + 600 >= this.list.length * 60) {

    //     }
    //   } else {
    //     return false
    //   }
    // },
    clear (item) {
      if (item === 'clientVal') {
        this.clientVal = ''
      } else if (item === 'groupVal') {
        this.groupVal = ''
      }
    },
    getInfo (item) {
      item.flag = !item.flag
      if (item.flag && !item.isGetInfo) {
        item.loading = true
        item.isGetInfo = true
        orderDetailNew({
          id: item.order_id
        }).then(res => {
          let data = res.data.data
          // 插入出库数量
          data.order_log.pack_info.forEach(valPack => {
            valPack.product_info = JSON.parse(valPack.product_info)
            valPack.product_info.forEach(valPro => {
              valPro.size_info.forEach(valSize => {
                let code = item.product_info.find(key => key.product_code === valPro.product_code)
                if (code) {
                  let size = code.size_info.find(key => (key.size === valSize.size && key.color === valSize.color && key.batch_id === valPack.batch_id))
                  if (size) {
                    size.pack_number = Number(size.pack_number ? size.pack_number : 0) + Number(valSize.pack_number)
                    code.total_real = Number(code.total_real ? code.total_real : 0) + Number(valSize.pack_number * size.one_price)
                  }
                }
              })
            })
          })
          // 插入织造费用
          data.order_log.product_weave.forEach(valPro => {
            let code = item.product_info.find(key => key.product_code === valPro.product_info.product_code)
            if (code) {
              code.weave_price = Number(code.weave_price ? code.weave_price : 0) + Number(valPro.price * valPro.number)
            }
          })
          // 插入加工费用
          data.order_log.semi_finished_production.forEach(valPro => {
            let code = item.product_info.find(key => key.product_code === valPro.product_info.product_code)
            if (code) {
              code.process_price = Number(code.process_price ? code.process_price : 0) + Number(valPro.price * valPro.number)
            }
          })
          // 插入订单物料加工费用
          console.log(data.order_log.material_production)
          data.order_log.material_production.forEach(val => {
            if (Number(val.type) === 1) {
              item.main_material_process_price = Number(item.main_material_process_price ? item.main_material_process_price : 0) + Number(val.total_price)
            } else if (Number(val.type) === 2) {
              item.other_material_process_price = Number(item.other_material_process_price ? item.other_material_process_price : 0) + Number(val.total_price)
            }
          })
          // 插入订单物料订购费用
          data.order_log.material_order.forEach(val => {
            if (Number(val.type) === 1) {
              item.main_material_order_price = Number(item.main_material_order_price ? item.main_material_order_price : 0) + Number(val.weight * val.price)
            } else if (Number(val.type) === 2) {
              item.other_material_order_price = Number(item.other_material_order_price ? item.other_material_order_price : 0) + Number(val.weight * val.price)
            }
          })
          // 插入包装订购费用
          data.order_log.pack_order.forEach(val => {
            item.pack_price = Number(item.pack_price ? item.pack_price : 0) + Number(val.price * val.number)
          })
          item.loading = false
        })
      } else if (!item.flag) {
        item.loading = false
      } else if (item.flag) {
        item.loading = true
        item.loading = false
      }
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    pickTime (date) {
      if (date) {
        this.start_time = date[0]
        this.end_time = date[1]
      } else {
        this.start_time = ''
        this.end_time = ''
      }
      this.list = []
      this.pages = 1
      this.getList()
    }
  },
  created () {
    Promise.all([
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      getGroup({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      orderFinancialCount({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.clientList = res[0].data.data.filter(key => key.type.indexOf(1) !== -1)
      this.groupList = res[1].data.data
      this.orderFinancialCount = res[2].data.data
      this.getList()
    })
  },
  filters: {
    filterNumber (val) {
      return Number(Number(val).toFixed(2)).toLocaleString()
    },
    filterToFixed (val) {
      return Number(val).toFixed(2)
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/orderFinancialList.less";
</style>
<style lang="less" scoped>
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.blue {
  color: #1a95ff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
