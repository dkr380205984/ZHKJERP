<template>
  <div id="orderFinancialList"
    v-loading="loading">
    <div class="head">
      <h2>物料使用统计表</h2>
      <el-input style="width:250px"
        placeholder="输入物料名称搜索"
        suffix-icon="el-icon-search"
        v-model="filter.searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
            v-show="typeCmp"
            @close="clear('type')">{{typeCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div>
            <el-select v-model="filter.type"
              placeholder="筛选类型">
              <el-option v-for="item in filter.typeList"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span>物料名称</span>
          <span>合计使用</span>
          <span>预定购数量</span>
          <span>订购数量</span>
          <span>库存剩余</span>
          <span>平均价格</span>
          <span>合计价格</span>
          <!-- <span>操作</span> -->
        </div>
        <ul class="infinite-list">
          <div class="liBox">
            <li class="infinite-list-item"
              v-for="(item,key) in filterList"
              :key="key"
              @click="item.flag = !item.flag">
              <div class="list">
                <span style="line-height:59px;">{{item.material_name}}</span>
                <span>{{item.use_total}}{{item.type === 1 ? 'kg' : '个'}}</span>
                <span>{{item.reserve_number}}{{item.type === 1 ? 'kg' : '个'}}</span>
                <span>{{item.order_number}}{{item.type === 1 ? 'kg' : '个'}}</span>
                <span>{{item.stock_number}}{{item.type === 1 ? 'kg' : '个'}}</span>
                <span>{{(item.price_total/(Number(item.reserve_number) + Number(item.order_number))).toFixed(2)}}元/{{item.type === 1 ? 'kg' : '个'}}</span>
                <span>{{item.price_total}}元</span>
                <!-- <span>
                  <span class="btn">详情</span>
                </span> -->
              </div>
            </li>
          </div>
        </ul>
        <div class="footer">
          <span>合计</span>
          <span>{{total_use_number|filterNumber}}万</span>
          <span>{{total_reserve_number|filterNumber}}万</span>
          <span>{{total_order_number|filterNumber}}万</span>
          <span>{{total_stock_number|filterNumber}}万</span>
          <span></span>
          <span>{{total_price|filterNumber}}万元</span>
          <!-- <span></span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { materialFinancialTotal } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      filter: {
        searchVal: '',
        type: '',
        typeList: [{ name: '原料', type: 1 }, { name: '辅料', type: 2 }]
      },
      total_use_number: 0,
      total_reserve_number: 0,
      total_order_number: 0,
      total_stock_number: 0,
      total_price: 0,
      list: [],
      filterList: []
    }
  },
  methods: {
    getList () {
      materialFinancialTotal({
        company_id: window.sessionStorage.getItem('company_id')
      }).then(res => {
        console.log(res)
        res.data.data.forEach(item => {
          let flag = this.list.find(key => key.material_name === item.material_name)
          if (!flag) {
            this.list.push({
              type: item.type,
              material_name: item.material_name,
              use_total: item.use_total,
              stock_number: item.stock_number,
              reserve_number: item.reserve_number,
              price_total: item.price_total,
              order_number: item.order_number,
              number_total: item.number_total
            })
          } else {
            flag.use_total = Number(flag.use_total ? flag.use_total : 0) + Number(item.use_total)
            flag.stock_number = Number(flag.stock_number ? flag.stock_number : 0) + Number(item.stock_number)
            flag.reserve_number = Number(flag.reserve_number ? flag.reserve_number : 0) + Number(item.reserve_number)
            flag.price_total = Number(flag.price_total ? flag.price_total : 0) + Number(item.price_total)
            flag.order_number = Number(flag.order_number ? flag.order_number : 0) + Number(item.order_number)
            flag.number_total = Number(flag.number_total ? flag.number_total : 0) + Number(item.number_total)
          }
          this.total_use_number += Number(item.use_total)
          this.total_reserve_number += Number(item.reserve_number)
          this.total_order_number += Number(item.order_number)
          this.total_stock_number += Number(item.stock_number)
          this.total_price += Number(item.price_total)
        })
        this.filterList = this.list
        this.loading = false
      })
    },
    clear (item) {
      if (item === 'type') {
        this.filter.type = ''
      }
    }
  },
  watch: {
    'filter': {
      deep: true,
      handler (newVal) {
        this.total_use_number = 0
        this.total_reserve_number = 0
        this.total_order_number = 0
        this.total_stock_number = 0
        this.total_price = 0
        this.filterList = newVal.searchVal ? this.list.filter(item => item.material_name.indexOf(newVal.searchVal) !== -1) : this.list
        this.filterList = newVal.type ? this.filterList.filter(item => item.type === newVal.type) : this.filterList
        this.filterList.forEach(item => {
          this.total_use_number += Number(item.use_total)
          this.total_reserve_number += Number(item.reserve_number)
          this.total_order_number += Number(item.order_number)
          this.total_stock_number += Number(item.stock_number)
          this.total_price += Number(item.price_total)
        })
      }
    }
  },
  computed: {
    typeCmp () {
      if (this.filter.type) {
        return this.filter.typeList.find(item => item.type === this.filter.type).name
      } else {
        return '所有分类'
      }
    }
  },
  created () {
    this.getList()
  },
  filters: {
    filterNumber (val) {
      return Number((val / 10000).toFixed(2)).toLocaleString()
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/orderFinancialList.less";
</style>
