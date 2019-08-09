<template>
  <div id="orderFinancialList">
    <div class="head">
      <h2>产品产量统计表</h2>
      <el-input style="width:250px"
        placeholder="输入产品编号搜索"
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
          <span>产品编号</span>
          <span>产品品类</span>
          <span>下单数量</span>
          <span>平均价格</span>
          <span>合计产值</span>
          <span>次品率</span>
          <span>库存数量</span>
          <span>操作</span>
        </div>
        <ul class="infinite-list"
          @mousewheel="getData">
          <template v-for="(item,key) in list">
            <li :key="key"
              class="infinite-list-item"
              @click="item.flag = !item.flag">
              <div class="list">
                <span style="line-height:59px;">
                  <!-- <em :class="{'el-icon-caret-bottom':true,'open':true,'close':!item.flag}"></em> -->
                  {{item.product_code}}</span>
                <span>{{item.product_type}}</span>
                <span>{{item.order_number}}</span>
                <span>{{item.total_price/item.order_number}}</span>
                <span>{{item.total_price}}</span>
                <span>{{item.ciping}}</span>
                <span>{{item.stock_number}}</span>
                <span>
                  <span class="btn">详情</span>
                </span>
              </div>
              <!-- <div :class="{'detail':true,'detailNone':!item.flag,'detailShow':item.flag}">
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
              </div> -->
            </li>
          </template>

        </ul>
        <div class="footer">
          <span>合计</span>
          <span></span>
          <span>{{100000|filterNumber}}</span>
          <span></span>
          <span>{{100000|filterNumber}}</span>
          <span></span>
          <span>{{450454512|filterNumber}}元</span>
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
          product_code: '19ABC125',
          product_type: '围巾/针织/长巾/豹纹',
          order_number: 20000,
          total_price: 100000,
          ciping: 10,
          stock_number: 2000
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
    console.log(__dirname)
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
