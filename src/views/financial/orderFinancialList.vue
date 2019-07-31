<template>
  <div id="orderFinancialList">
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
          <span @click="filterOption.cutPayFilterFlag = !filterOption.cutPayFilterFlag"
            class="icon">
            订单扣款
            <em class="el-icon-caret-top"
              :style="{color:filterOption.cutPayFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.cutPayFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.billFilterFlag = !filterOption.billFilterFlag"
            class="icon">
            已开发票
            <em class="el-icon-caret-top"
              :style="{color:filterOption.billFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.billFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span>负责小组</span>
          <span>操作</span>
        </div>
        <ul class="infinite-list"
          @mousewheel="getData">
          <template v-for="(item,key) in list">
            <li :key="key"
              class="infinite-list-item"
              @click="item.flag = !item.flag">
              <div class="list">
                <span>
                  <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em>
                  {{item.order_code}}</span>
                <span>{{item.client_name}}</span>
                <span>{{item.order_time}}</span>
                <span>{{item.order_total_price}}{{item.price_unit}}</span>
                <span>{{item.order_number}}</span>
                <span>{{item.outStock_number}}</span>
                <span>{{item.total_number}}</span>
                <span>{{item.companyCost}}</span>
                <span>{{item.order_cutPay}}</span>
                <span>{{item.bill}}</span>
                <span>{{item.group_name}}</span>
                <span>
                  <span class="btn">详情</span>
                </span>
              </div>
              <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                <span class="title">
                  <span class="flex15">产品类型</span>
                  <span>订单总值</span>
                  <span>实际总值</span>
                  <span>产品图片</span>
                  <span class="flex05">尺码</span>
                  <span class="flex05">颜色</span>
                  <span class="flex05">单价</span>
                  <span>订单数量</span>
                  <span>出库数量</span>
                  <span>工厂成本</span>
                </span>
                <span class="content"
                  v-for="(valPro,indPro) in item.product_info"
                  :key="indPro">
                  <span class="flex15">
                    <span>{{valPro.product_code}}</span>
                    <span style="margin-left:10px;">{{valPro.product_type}}</span>
                  </span>
                  <span>{{valPro.order_total_price}}</span>
                  <span>{{valPro.reality_total_price}}</span>
                  <span>{{'图片'}}</span>
                  <span class="flex35 col">
                    <span v-for="(valSize,indSize) in valPro.size"
                      :key="indSize">
                      <span class="flex05">{{valSize.size}}</span>
                      <span class="flex05">{{valSize.color}}</span>
                      <span class="flex05">{{valSize.price}}元/条</span>
                      <span>{{valSize.order_number}}条</span>
                      <span>{{valSize.outStock_number}}条</span>
                    </span>
                  </span>
                  <span class="col">
                    <span>
                      <span>织造</span>
                      <span>{{valPro.companyCost.weave}}</span>
                    </span>
                    <span>
                      <span>加工</span>
                      <span>{{valPro.companyCost.process}}</span>
                    </span>
                    <span>
                      <span>染色</span>
                      <span>{{valPro.companyCost.dye}}</span>
                    </span>
                  </span>
                </span>
              </div>
            </li>
            <!-- <li :key="key + item.id">
              <span class="title">
                <span class="flex15">产品类型</span>
                <span>订单总值</span>
                <span>实际总值</span>
                <span>产品图片</span>
                <span class="flex05">尺码</span>
                <span class="flex05">颜色</span>
                <span class="flex05">单价</span>
                <span>订单数量</span>
                <span>出库数量</span>
                <span>工厂成本</span>
              </span>
              <span class="content"
                v-for="(valPro,indPro) in item.product_info"
                :key="indPro">
                <span class="flex15">
                  <span>{{valPro.product_code}}</span>
                  <span style="margin-left:10px;">{{valPro.product_type}}</span>
                </span>
                <span>{{valPro.order_total_price}}</span>
                <span>{{valPro.reality_total_price}}</span>
                <span>{{'图片'}}</span>
                <span class="flex35 col">
                  <span v-for="(valSize,indSize) in valPro.size"
                    :key="indSize">
                    <span class="flex05">{{valSize.size}}</span>
                    <span class="flex05">{{valSize.color}}</span>
                    <span class="flex05">{{valSize.price}}元/条</span>
                    <span>{{valSize.order_number}}条</span>
                    <span>{{valSize.outStock_number}}条</span>
                  </span>
                </span>
                <span class="col">
                  <span>
                    <span>织造</span>
                    <span>{{valPro.companyCost.weave}}</span>
                  </span>
                  <span>
                    <span>加工</span>
                    <span>{{valPro.companyCost.process}}</span>
                  </span>
                  <span>
                    <span>染色</span>
                    <span>{{valPro.companyCost.dye}}</span>
                  </span>
                </span>
              </span>
            </li> -->
          </template>

        </ul>
        <div class="footer">
          <span>合计</span>
          <span></span>
          <span></span>
          <span>{{60000|filterNumber}}元</span>
          <span>{{100000|filterNumber}}</span>
          <span>{{100000|filterNumber}}</span>
          <span>{{450454512|filterNumber}}元</span>
          <span>{{450454512|filterNumber}}元</span>
          <span>{{(450454512.01)|filterNumber}}元</span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderList, orderDetailNew, clientList, getGroup } from '@/assets/js/api.js'
export default {
  data () {
    return {
      searchVal: '',
      clientVal: '',
      clientList: [],
      groupVal: '',
      groupList: [],
      moneyType: 'RMB',
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
      // console.log('add')
      // for (let i = 0; i < 10; i++) {
      //   this.list.push({
      //     id: '666',
      //     order_code: 'dindan1',
      //     client_name: '飞泰',
      //     order_time: '2019-09-01',
      //     order_total_price: '40000',
      //     price_unit: '元',
      //     order_number: '3000',
      //     outStock_number: '2980',
      //     total_number: '2980',
      //     companyCost: '300000',
      //     order_cutPay: '3000',
      //     bill: '5000',
      //     group_name: 'A组',
      //     flag: false,
      //     product_info: [
      //       {
      //         product_code: '1111',
      //         product_type: '尽快发就考虑/交罚款',
      //         order_total_price: '20000',
      //         reality_total_price: '19800',
      //         img: [],
      //         size: [
      //           {
      //             size: 'L',
      //             color: '绿',
      //             price: '4',
      //             order_number: '2000',
      //             outStock_number: '1980'
      //           },
      //           {
      //             size: 'L',
      //             color: '绿',
      //             price: '4',
      //             order_number: '2000',
      //             outStock_number: '1980'
      //           }
      //         ],
      //         companyCost: {
      //           weave: '3000',
      //           process: '2000',
      //           dye: '1000'
      //         }
      //       },
      //       {
      //         product_code: '1111',
      //         product_type: '尽快发就考虑/交罚款',
      //         order_total_price: '20000',
      //         reality_total_price: '19800',
      //         img: [],
      //         size: [
      //           {
      //             size: 'L',
      //             color: '绿',
      //             price: '4',
      //             order_number: '2000',
      //             outStock_number: '1980'
      //           },
      //           {
      //             size: 'L',
      //             color: '绿',
      //             price: '4',
      //             order_number: '2000',
      //             outStock_number: '1980'
      //           }
      //         ],
      //         companyCost: {
      //           weave: '3000',
      //           process: '2000',
      //           dye: '1000'
      //         }
      //       }
      //     ]
      //   })
      // }
      orderList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 10,
        client_id: this.clientVal,
        group_id: this.groupVal,
        page: this.pages
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          // 获取该订单的详细信息和日志
          orderDetailNew({
            id: item.id
          }).then(res => {
            item.detail = res.data.data
          })
          let list = {}
          // 订单初步信息
          list.order_total_price = item.total_price
          list.order_code = item.order_code
          list.order_id = item.id
          list.order_client = item.client_name
          list.order_time = item.order_time
          list.group_name = item.group_name
          // 处理数据
          // item.detail.order_log.stock_out_info
          this.list.push(list)
        })
        console.log(data)
      })
    },
    getData () {
      this.pages++
      let el = document.getElementsByClassName('infinite-list')[0]
      if (Number(el.scrollTop) + 600 >= this.list.length * 60) {
        this.getList()
      }
    },
    clear (item) {
      if (item === 'clientVal') {
        this.clientVal = ''
      } else if (item === 'groupVal') {
        this.groupVal = ''
      }
    }
  },
  created () {
    Promise.all([
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      getGroup({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.clientList = res[0].data.data.filter(key => key.type.indexOf(1) !== -1)
      this.groupList = res[1].data.data
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
