<template>
  <div id="orderFinancialList"
    v-loading="loading">
    <div class="head">
      <h2>订单财务统计表</h2>
      <el-input style="width:250px"
        placeholder="输入物料名称搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
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
            <el-select v-model="moneyType"
              placeholder="切换币种">
              <el-option v-for="item in moneyTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-date-picker v-model="data"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span @click="filterOption.orderFilterFlag = !filterOption.orderFilterFlag"
            class="icon">
            订单号
            <em class="el-icon-caret-top"
              :style="{color:filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span>下单公司</span>
          <span @click="filterOption.timeFilterFlag = !filterOption.timeFilterFlag"
            class="icon">
            下单日期
            <em class="el-icon-caret-top"
              :style="{color:filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em></span>
          <span @click="filterOption.totalFilterFlag = !filterOption.totalFilterFlag"
            class="icon">
            订单总值
            <em class="el-icon-caret-top"
              :style="{color:filterOption.totalFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.totalFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.numberFilterFlag = !filterOption.numberFilterFlag"
            class="icon">
            下单数量
            <em class="el-icon-caret-top"
              :style="{color:filterOption.numberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.numberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.outNumberFilterFlag = !filterOption.outNumberFilterFlag"
            class="icon">
            出库数量
            <em class="el-icon-caret-top"
              :style="{color:filterOption.outNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.outNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.totalNumberFilterFlag = !filterOption.totalNumberFilterFlag"
            class="icon">
            实际总值
            <em class="el-icon-caret-top"
              :style="{color:filterOption.totalNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.totalNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.companyCostFilterFlag = !filterOption.companyCostFilterFlag"
            class="icon">
            工厂成本
            <em class="el-icon-caret-top"
              :style="{color:filterOption.companyCostFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.companyCostFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <!-- <span @click="filterOption.cutPayFilterFlag = !filterOption.cutPayFilterFlag"
            class="icon">
            扣款记录
            <em class="el-icon-caret-top"
              :style="{color:filterOption.cutPayFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.cutPayFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.billFilterFlag = !filterOption.billFilterFlag"
            class="icon">
            结算记录
            <em class="el-icon-caret-top"
              :style="{color:filterOption.billFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.billFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span> -->
          <span>负责小组</span>
          <span>操作</span>
        </div>
        <ul class="infinite-list"
          @mousewheel="getData">
          <template v-for="(item,key) in list">
            <li :key="key"
              class="infinite-list-item"
              @click.stop="getInfo(item)">
              <div class="list">
                <span>
                  <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                  {{item.order_code}}</span>
                <span>{{item.order_client}}</span>
                <span>{{item.order_time}}</span>
                <span>{{item.order_total_price}}{{item.account_unit}}</span>
                <span>{{item.order_number}}</span>
                <span>{{item.total_pop}}</span>
                <span>{{item.total_real/100}}元</span>
                <span>{{item.company_cost}}元</span>
                <!-- <span>{{item.order_cutPay}}</span>
                <span>{{item.bill}}</span> -->
                <span>{{item.group_name}}</span>
                <span>
                  <span class="btn">详情</span>
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
                    <span>{{valPro.order_total_price}}{{item.account_unit}}</span>
                    <span>{{valPro.total_real ? valPro.total_real : 0}}{{item.account_unit}}</span>
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
                        <span class="flex08">{{valSize.one_price}}{{item.account_unit}}/{{valPro.unit}}</span>
                        <span>{{valSize.order_number}}{{valPro.unit}}</span>
                        <span>{{valSize.pack_number ? valSize.pack_number : 0}}{{valPro.unit}}</span>
                      </span>
                    </span>
                    <span class="col">
                      <span>
                        <span>织造</span>
                        <span>{{valPro.weave_price ? valPro.weave_price : 0}}元</span>
                      </span>
                      <span>
                        <span>加工</span>
                        <span>{{valPro.process_price ? valPro.process_price : 0}}元</span>
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
                        <span>物料订购</span>
                        <span>{{item.material_order_price ? item.material_order_price : 0}}元</span>
                      </span>
                      <span>
                        <span>物料加工</span>
                        <span>{{item.material_process_price ? item.material_process_price : 0}}元</span>
                      </span>
                      <span>
                        <span>包装辅料订购</span>
                        <span>{{item.pack_price ? item.pack_price : 0}}元</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </li>
          </template>
        </ul>
        <div class="footer">
          <span>合计</span>
          <span></span>
          <span></span>
          <span>{{orderFinancialCount.total_order_price|filterNumber}}万元</span>
          <span>{{orderFinancialCount.total_order_number|filterNumber}}万件</span>
          <span>{{orderFinancialCount.total_order_pop|filterNumber}}万件</span>
          <span>{{orderFinancialCount.total_order_real_price|filterNumber}}万元</span>
          <span>{{orderFinancialCount.total_order_cost|filterNumber}}万元</span>
          <!-- <span>{{orderFinancialCount.total_order_deduct|filterNumber}}万元</span>
          <span></span> -->
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
        total_order_deduct: '',
        total_order_number: '',
        total_order_pop: '',
        total_order_price: '',
        total_order_real_price: ''
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
      filterOption: {
        orderFilterFlag: false,
        timeFilterFlag: false,
        totalFilterFlag: false,
        numberFilterFlag: false,
        outNumberFilterFlag: false,
        totalNumberFilterFlag: false,
        companyCostFilterFlag: false,
        cutPayFilterFlag: false,
        billFilterFlag: false
      },
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
    getList () {
      orderList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 10,
        client_id: this.clientVal,
        group_id: this.groupVal,
        page: this.pages
      }).then(res => {
        this.total = res.data.meta.total
        let data = res.data.data
        console.log(data)
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
          this.list.push(list)
          // 处理数据
        })
        console.log(this.list)
        this.loading = false
      })
    },
    getData () {
      this.pages++
      let el = document.getElementsByClassName('infinite-list')[0]
      if (Number(el.scrollTop) + 600 >= this.list.length * 60) {
        if (Math.ceil(this.total / 10) >= this.pages) {
          this.getList()
        }
      }
    },
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
          console.log(data)
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
          data.order_log.material_production.forEach(val => {
            item.material_process_price = Number(item.material_process_price ? item.material_process_price : 0) + Number(val.total_price)
          })
          // 插入订单物料订购费用
          data.order_log.material_order.forEach(val => {
            item.material_order_price = Number(item.material_order_price ? item.material_order_price : 0) + Number(val.weight * val.price)
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
      return val.toLocaleString()
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
</style>
