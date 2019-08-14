<template>
  <div id="orderFinancialList"
    v-loading="loading">
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
          <el-tag closable
            v-show="categoryValCmp"
            @close="clear('categoryVal')">{{categoryValCmp}}</el-tag>
          <el-tag closable
            v-show="typesValCmp"
            @close="clear('typesVal')">{{typesValCmp}}</el-tag>
          <el-tag closable
            v-show="styleValCmp"
            @close="clear('styleVal')">{{styleValCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="categoryVal"
              placeholder="筛选品类">
              <el-option v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="typesVal"
              placeholder="筛选类型">
              <el-option v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="styleVal"
              placeholder="筛选款型">
              <el-option v-for="item in style"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
        <ul class="infinite-list">
          <div class="liBox">
            <li v-for="(item,key) in list"
              :key="key"
              class="infinite-list-item"
              @click="item.flag = !item.flag">
              <div class="list">
                <span style="line-height:59px;">
                  {{item.product_code}}</span>
                <span>{{item.category_name+'/'+item.type_name+'/'+item.style_name}}</span>
                <span>{{item.order_number}}{{item.unit}}</span>
                <span>{{(item.price_avg ? item.price_avg : 0)|filterNumber}}元/{{item.unit}}</span>
                <span>{{item.total_production}}{{item.unit}}</span>
                <span>{{item.ciping ? item.ciping : '暂无'}}</span>
                <span>{{item.total_stock ? item.total_stock: 0}}{{item.unit}}</span>
                <span>
                  <span class="btn"
                    @click="$router.push('/index/productDetail/' + item.id)">详情</span>
                </span>
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
          <span>{{total_order_number|filterNumber}}件</span>
          <span></span>
          <span>{{total_production_number|filterNumber}}件</span>
          <span></span>
          <span>{{total_stock_number|filterNumber}}件</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productFinancialTotal, productTppeList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      category: [], // 大类
      categoryVal: '',
      types: [], // 二级分类
      typesVal: '',
      style: [], // 三级分类
      styleVal: '',
      pages: 1,
      total: '',
      isOk: true,
      total_order_number: 0,
      total_production_number: 0,
      total_stock_number: 0,
      list: []
    }
  },
  methods: {
    getList () {
      this.isOk = false
      productFinancialTotal({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 10,
        page: this.pages,
        category_id: this.categoryVal,
        style_id: this.styleVal,
        type_id: this.typesVal
      }).then(res => {
        console.log(res)
        this.total = res.data.meta.total
        res.data.data.forEach(item => {
          this.total_order_number += Number(item.order_number)
          this.total_production_number += Number(item.total_production)
          this.total_stock_number += Number(item.total_stock)
        })
        this.list.push(...res.data.data)
        if (Math.ceil(this.total / 10) > this.pages) {
          this.pages++
          this.getList()
        } else {
          this.isOk = true
        }
        if (this.list.length >= 10 || Math.ceil(this.total / 10) <= this.pages) {
          this.loading = false
        }
      })
    },
    clear (item) {
      if (item === 'categoryVal') {
        this.categoryVal = ''
        this.typesVal = ''
        this.types = []
        this.styleVal = ''
        this.style = []
      } else if (item === 'typesVal') {
        this.typesVal = ''
        this.styleVal = ''
        this.style = []
      } else if (item === 'styleVal') {
        this.styleVal = ''
      }
    }
  },
  watch: {
    categoryVal (newVal) {
      this.total_order_number = 0
      this.total_production_number = 0
      this.total_stock_number = 0
      this.list = []
      if (this.first) {
        const finded = this.category.find((item) => item.id === newVal)
        this.types = finded ? finded.child : []
      } else {
        if (newVal) {
          this.types = this.category.find((item) => item.id === newVal).child
          this.typesVal = ''
          this.styleVal = ''
          this.style = []
          this.pages = 1
        }
        this.getList()
      }
    },
    typesVal (newVal) {
      this.total_order_number = 0
      this.total_production_number = 0
      this.total_stock_number = 0
      this.list = []
      if (this.first) {
        const finded = this.types.find((item) => item.id === newVal)
        this.style = finded ? finded.child : []
      } else {
        if (newVal) {
          this.style = this.types.find((item) => item.id === newVal).child
          this.styleVal = ''
          this.pages = 1
        }
        this.getList()
      }
    },
    styleVal (newVal) {
      this.total_order_number = 0
      this.total_production_number = 0
      this.total_stock_number = 0
      this.list = []
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getList()
      }
    }
  },
  computed: {
    categoryValCmp () {
      if (this.categoryVal) {
        return this.category.find((item) => item.id === this.categoryVal).name
      } else {
        return '所有分类'
      }
    },
    typesValCmp () {
      if (this.typesVal) {
        return this.types.find((item) => item.id === this.typesVal).name
      } else {
        return ''
      }
    },
    styleValCmp () {
      if (this.styleVal) {
        return this.style.find((item) => item.id === this.styleVal).name
      } else {
        return ''
      }
    }
  },
  created () {
    productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.category = res.data.data
    })
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
