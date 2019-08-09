<template>
  <div id="orderFinancialList"
    v-loading="loading">
    <div class="head">
      <h2>合作公司财务统计表</h2>
      <el-input style="width:250px"
        placeholder="输入公司名称搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="totalCtn">
        <span>
          <span>已结算</span>
          <span class="moneyTag">{{totalList.settle|filterNumber}}<span class="unit">万元</span></span>
        </span>
        <span>
          <span>已扣款</span>
          <span class="moneyTag">{{totalList.deduct|filterNumber}}<span class="unit">万</span></span>
        </span>
        <span>
          <span>已转账</span>
          <span class="moneyTag">{{totalList.transfer|filterNumber}}<span class="unit">万</span></span>
        </span>
      </div>
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
            v-show="typeValCmp"
            @close="clear('typeVal')">{{typeValCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div>
            <el-select v-model="typeVal"
              placeholder="筛选公司类型">
              <el-option v-for="item in companyList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>公司类型</span>
          <span>公司名称</span>
          <span>已结算</span>
          <span>已扣款</span>
          <span>已转账</span>
          <span>操作</span>
        </div>
        <ul class="infinite-list"
          @mousewheel="getData">
          <template v-for="(item,key) in list">
            <li :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>
                  <div class="over">{{item.type|filterType}}</div>
                </span>
                <span>{{item.name}}</span>
                <span>{{item.settle_total}}</span>
                <span>{{item.deduct_total}}</span>
                <span>{{item.transfer_total}}</span>
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
          <span>{{nowCount.settle|filterNumber}}万元</span>
          <span>{{nowCount.deduct|filterNumber}}万元</span>
          <span>{{nowCount.transfer|filterNumber}}万元</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { companyType } from '@/assets/js/dictionary.js'
import { clientFinancialList, clientFinancialTotal } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      typeVal: '',
      companyList: companyType,
      isOk: true,
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
      list: [],
      totalList: {
        settle: '',
        deduct: '',
        transfer: ''
      },
      nowCount: {
        settle: 0,
        deduct: 0,
        transfer: 0
      },
      total: '',
      pages: 1
    }
  },
  watch: {
    typeVal () {
      this.list = []
      this.pages = 1
      this.getList()
    },
    searchVal () {
      this.list = []
      this.pages = 1
      this.getList(0)
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.isOk = false
      for (const prop in this.nowCount) {
        this.nowCount[prop] = 0
      }
      Promise.all([
        clientFinancialTotal({
          company_id: window.sessionStorage.getItem('company_id')
        }),
        clientFinancialList({
          company_id: window.sessionStorage.getItem('company_id'),
          limit: 10,
          page: this.pages,
          type: this.typeVal,
          client_name: this.searchVal
        })
      ]).then(res => {
        this.totalList = res[0].data.data
        this.total = res[1].data.meta.total
        this.list.push(...res[1].data.data)
        this.list.forEach(item => {
          this.nowCount.settle += Number(item.settle_total)
          this.nowCount.transfer += Number(item.transfer_total)
          this.nowCount.deduct += Number(item.deduct_total)
        })
        this.isOk = true
        this.loading = false
      })
    },
    getData () {
      if (this.isOk) {
        let el = document.getElementsByClassName('infinite-list')[0]
        if (Number(el.scrollTop) + 600 >= this.list.length * 60) {
          if (Math.ceil(this.total / 10) > this.pages) {
            this.pages++
            this.getList()
          }
        }
      } else {
        return false
      }
    },
    clear (item) {
      if (item === 'typeVal') {
        this.typeVal = ''
      }
    }
  },
  created () {
    this.getList()
  },
  filters: {
    filterNumber (val) {
      return (val / 10000).toLocaleString()
    },
    filterType (val) {
      let type = ''
      JSON.parse(val).forEach((item, key) => {
        type += ((key !== 0 ? ';' : '') + companyType.find(key => key.value === item).name)
      })
      return type
    }
  },
  computed: {
    typeValCmp () {
      if (this.typeVal) {
        return this.companyList.find(key => key.value === this.typeVal).name
      } else {
        return '所有分类'
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/orderFinancialList.less";
</style>
