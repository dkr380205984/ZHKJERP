<template>
  <div id="orderFinancialList">
    <div class="head">
      <h2>工厂成本统计</h2>
      <el-input style="width:250px"
        placeholder="输入物料名称搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div>
            <el-select v-model="companyType"
              placeholder="筛选公司类型">
              <el-option v-for="item in companyTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="company"
              placeholder="筛选订单公司">
              <el-option v-for="item in companyList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="group"
              placeholder="筛选小组">
              <el-option v-for="item in groupList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
          <span>公司类型</span>
          <span @click="filterOption.timeFilterFlag = !filterOption.timeFilterFlag"
            class="icon">
            公司名称
            <em class="el-icon-caret-top"
              :style="{color:filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em></span>
          <span @click="filterOption.totalFilterFlag = !filterOption.totalFilterFlag"
            class="icon">
            下单日期
            <em class="el-icon-caret-top"
              :style="{color:filterOption.totalFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.totalFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.numberFilterFlag = !filterOption.numberFilterFlag"
            class="icon">
            生产数量
            <em class="el-icon-caret-top"
              :style="{color:filterOption.numberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.numberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.outNumberFilterFlag = !filterOption.outNumberFilterFlag"
            class="icon">
            入库数量
            <em class="el-icon-caret-top"
              :style="{color:filterOption.outNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.outNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.totalNumberFilterFlag = !filterOption.totalNumberFilterFlag"
            class="icon">
            次品扣款
            <em class="el-icon-caret-top"
              :style="{color:filterOption.totalNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.totalNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.companyCostFilterFlag = !filterOption.companyCostFilterFlag"
            class="icon">
            成本报价
            <em class="el-icon-caret-top"
              :style="{color:filterOption.companyCostFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.companyCostFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.cutPayFilterFlag = !filterOption.cutPayFilterFlag"
            class="icon">
            实际总价
            <em class="el-icon-caret-top"
              :style="{color:filterOption.cutPayFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.cutPayFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.billFilterFlag = !filterOption.billFilterFlag"
            class="icon">
            差值
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
                <span>{{item.client_type}}</span>
                <span>{{item.client_name}}</span>
                <span>{{item.order_time}}</span>
                <span>{{item.production_number}}</span>
                <span>{{item.goStock_number}}</span>
                <span>{{item.defective_price}}{{item.price_unit}}</span>
                <span>{{item.cost_price}}{{item.price_unit}}</span>
                <span>{{item.bill_price}}{{item.price_unit}}</span>
                <span>{{Number(item.bill_price) - Number(item.cost_price)}}</span>
                <span>{{item.group_name}}</span>
                <span>
                  <span class="btn">详情</span>
                </span>
              </div>
              <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
                <span class="title">
                  <span class="flex15">产品类型</span>
                  <span>尺码</span>
                  <span>颜色</span>
                  <span>加工数量</span>
                  <span>加工单价</span>
                  <span>生产总价</span>
                  <span>入库数量</span>
                  <span>次品数量</span>
                  <span>次品扣款</span>
                  <span>成本报价</span>
                  <span>实际总价</span>
                  <span>差值</span>
                </span>
                <span class="content"
                  v-for="(valPro,indPro) in item.product_info"
                  :key="indPro">
                  <span class="flex15">
                    <span>{{valPro.product_code}}</span>
                    <span style="margin-left:10px;">{{valPro.product_type}}</span>
                  </span>
                  <span class="flex11 col">
                    <span v-for="(valSize,indSize) in valPro.size"
                      :key="indSize">
                      <span>{{valSize.size}}</span>
                      <span>{{valSize.color}}</span>
                      <span>{{valSize.process_number}}条</span>
                      <span>{{valSize.process_price}}元/条</span>
                      <span>{{valSize.production_total_price}}元</span>
                      <span>{{valSize.goStock_number}}条</span>
                      <span>{{valSize.defective_number}}条</span>
                      <span>{{valSize.defective_cutPay}}元</span>
                      <span>{{valSize.cost_price}}元</span>
                      <span>{{valSize.bill_price}}元</span>
                      <span>{{valSize.bill_price - valSize.cost_price}}元</span>
                    </span>
                  </span>
                </span>
              </div>
            </li>
          </template>

        </ul>
        <div class="footer">
          <span>合计</span>
          <span></span>
          <span></span>
          <span></span>
          <span>{{100000|filterNumber}}</span>
          <span>{{100000|filterNumber}}</span>
          <span>{{450454512|filterNumber}}元</span>
          <span>{{450454512|filterNumber}}元</span>
          <span>{{(450454512.01)|filterNumber}}元</span>
          <span>{{60000|filterNumber}}元</span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
      companyType: '',
      companyTypeList: [],
      company: '',
      companyList: [],
      group: '',
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
  methods: {
    getList () {
      for (let i = 0; i < 10; i++) {
        this.list.push({
          id: '666',
          order_code: 'dindan1',
          client_type: '染色',
          client_name: '飞泰',
          order_time: '2019-09-01',
          production_number: '3000',
          price_unit: '元',
          goStock_number: '2980',
          defective_price: '200',
          cost_price: '3000',
          bill_price: '5000',
          group_name: 'A组',
          flag: false,
          product_info: [
            {
              product_code: '1111',
              product_type: '尽快发就考虑/交罚款',
              size: [
                {
                  size: 'L',
                  color: '绿',
                  process_number: '2000',
                  process_price: '4',
                  production_total_price: '20000',
                  goStock_number: '1980',
                  defective_number: '10',
                  defective_cutPay: '100',
                  cost_price: '100000',
                  bill_price: '1000000'
                },
                {
                  size: 'L',
                  color: '绿',
                  process_number: '2000',
                  process_price: '4',
                  production_total_price: '20000',
                  goStock_number: '1980',
                  defective_number: '10',
                  defective_cutPay: '100',
                  cost_price: '100000',
                  bill_price: '1000000'
                }
              ]
            },
            {
              product_code: '1111',
              product_type: '尽快发就考虑/交罚款',
              order_total_price: '20000',
              reality_total_price: '19800',
              img: [],
              size: [
                {
                  size: 'L',
                  color: '绿',
                  process_number: '2000',
                  process_price: '4',
                  production_total_price: '20000',
                  goStock_number: '1980',
                  defective_number: '10',
                  defective_cutPay: '100',
                  cost_price: '100000',
                  bill_price: '1000000'
                },
                {
                  size: 'L',
                  color: '绿',
                  process_number: '2000',
                  process_price: '4',
                  production_total_price: '20000',
                  goStock_number: '1980',
                  defective_number: '10',
                  defective_cutPay: '100',
                  cost_price: '100000',
                  bill_price: '1000000'
                }
              ]
            }
          ]
        })
      }
    },
    getData () {
      let el = document.getElementsByClassName('infinite-list')[0]
      if (Number(el.scrollTop) + 600 >= this.list.length * 60) {
        this.getList()
      }
    }
  },
  created () {
    this.getList()
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
