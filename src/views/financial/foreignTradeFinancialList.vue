<template>
  <div id="orderFinancialList">
    <div class="head">
      <h2>合作公司财务统计表</h2>
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
            <el-select v-model="company"
              placeholder="筛选公司类型">
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
            公司类型
            <em class="el-icon-caret-top"
              :style="{color:filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span>公司名称</span>
          <span @click="filterOption.timeFilterFlag = !filterOption.timeFilterFlag"
            class="icon">
            订单总额
            <em class="el-icon-caret-top"
              :style="{color:filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em></span>
          <span @click="filterOption.totalFilterFlag = !filterOption.totalFilterFlag"
            class="icon">
            实际总额
            <em class="el-icon-caret-top"
              :style="{color:filterOption.totalFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.totalFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.numberFilterFlag = !filterOption.numberFilterFlag"
            class="icon">
            已付款
            <em class="el-icon-caret-top"
              :style="{color:filterOption.numberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.numberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span @click="filterOption.outNumberFilterFlag = !filterOption.outNumberFilterFlag"
            class="icon">
            待付款
            <em class="el-icon-caret-top"
              :style="{color:filterOption.outNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            <em class="el-icon-caret-bottom"
              :style="{color:!filterOption.outNumberFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
          </span>
          <span>操作</span>
        </div>
        <ul class="infinite-list"
          @mousewheel="getData">
          <template v-for="(item,key) in list">
            <li :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>{{item.client_type}}</span>
                <span>{{item.client_name}}</span>
                <span>{{item.total_price}}{{item.price_unit}}</span>
                <span>{{item.bill_total_price}}{{item.price_unit}}</span>
                <span>{{item.compiled_pay}}{{item.price_unit}}</span>
                <span>{{item.bill_total_price - item.compiled_pay}}{{item.price_unit}}</span>
                <span>
                  <span class="btn"
                    @click="$router.push('/index/foreignTradeFinancialDetail/' + item.id)">详情</span>
                </span>
              </div>
            </li>
          </template>

        </ul>
        <div class="footer">
          <span>合计</span>
          <span></span>
          <span>{{514564516|filterNumber}}元</span>
          <span>{{450454512|filterNumber}}元</span>
          <span>{{450454512|filterNumber}}元</span>
          <span>{{(450454512.01)|filterNumber}}元</span>
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
      console.log('add')
      for (let i = 0; i < 10; i++) {
        this.list.push({
          id: 666,
          client_type: '染色',
          client_name: '飞泰',
          total_price: '30000',
          price_unit: '元',
          bill_total_price: '29000',
          compiled_pay: '20000'
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
