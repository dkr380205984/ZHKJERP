<template>
  <div id="productStockList"
    v-loading="loading">
    <div class="head">
      <h2>物料库存列表</h2>
      <!-- <el-input placeholder="输入产品编号精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input> -->
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
            v-show="typeValCmp"
            @close="clear('typeVal')">{{typeValCmp}}</el-tag>
          <el-tag closable
            v-show="stockValCmp"
            @close="clear('stockVal')">{{stockValCmp}}</el-tag>
          <el-tag closable
            v-show="nameValCmp"
            @close="clear('nameVal')">{{nameValCmp}}</el-tag>
          <el-tag closable
            v-show="colorValCmp"
            @close="clear('colorVal')">{{colorValCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="typeVal"
              filterable
              placeholder="筛选物料类型">
              <el-option v-for="item in typeList"
                :key="item.id"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select v-model="stockVal"
              filterable
              placeholder="筛选物料仓库">
              <el-option v-for="item in stockList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="nameVal"
              filterable
              placeholder="筛选物料名称">
              <el-option v-for="item in nameList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="colorVal"
              placeholder="筛选物料颜色">
              <el-option v-for="item in colorList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-select v-model="flowerVal"
              placeholder="筛选花型">
              <el-option v-for="item in flower"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select> -->
          </div>
          <div class="rightFilter">
            <el-date-picker v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="pickTime">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="tableCtn"
        v-scroll="{fun:getProductList,pageSize:5}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">仓库名称</div>
          <div class="tableColumn">物料名称</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">属性</div>
          <div class="tableColumn">库存量(kg)</div>
          <div class="tableColumn">物料缸号</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item) in list"
          :key="item.id">
          <div class="tableColumn">{{item.stock_name}}</div>
          <div class="tableColumn">{{item.material_name}}</div>
          <div class="tableColumn">{{item.color}}</div>
          <div class="tableColumn">{{item.material_attr}}</div>
          <div class="tableColumn">{{item.total_weight}}</div>
          <div class="tableColumn">{{item.vat_code}}</div>
          <div class="tableColumn">{{item.updated_at}}</div>
          <div class="tableColumn">
            <span class="btns success"
              @click="$router.push('/index/mainMaterialStockDetail/'+item.stock_id + '/' + item.id)">详情</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pageCtn">
      <el-pagination background
        :page-size="5"
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="pages"
        @current-change="getProductList">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { materialStockList, clientList, ingredientList, YarnList, YarnColorList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      value: '',
      date: '',
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
      total: 0,
      pages: 1,
      list: [],
      typeList: [], // 大类
      typeVal: '',
      stockList: [
        {
          name: '本厂',
          id: '0'
        }
      ], // 仓库分类
      stockVal: '',
      nameList: [], // 物料分类
      nameVal: '',
      colorList: [], // 颜色分类
      colorVal: '',
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    getProductList () {
      this.loading = true
      this.list = []
      materialStockList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 5,
        page: this.pages,
        stock_id: this.stockVal,
        material_name: this.nameVal,
        material_color: this.colorVal,
        start_time: this.start_time,
        end_time: this.end_time
      }).then(res => {
        let data = res.data.data
        console.log(res)
        this.total = res.data.data.total
        data.forEach(item => {
          this.list.push({
            stock_name: this.stockList.find(key => Number(key.id) === Number(item.stock_id)).name,
            stock_id: item.stock_id,
            material_name: item.material_name,
            id: item.id,
            color: item.material_color,
            material_attr: item.material_attribute,
            total_weight: item.total_weight,
            vat_code: item.vat_code,
            updated_at: item.updated_at
          })
        })
        this.loading = false
      })
    },
    // 删除条件
    clear (item) {
      if (item === 'typeVal') {
        this.typeVal = ''
      } else if (item === 'stockVal') {
        this.stockVal = ''
      } else if (item === 'nameVal') {
        this.nameVal = ''
      } else if (item === 'colorVal') {
        this.colorVal = ''
      }
    },
    pickTime (date) {
      if (date) {
        this.start_time = date[0]
        this.end_time = date[1]
      } else {
        this.start_time = ''
        this.end_time = ''
      }
      this.pages = 1
      this.getProductList()
    }
  },
  watch: {
    typeVal (newVal) {
      this.pages = 1
      this.getProductList()
    },
    stockVal (newVal) {
      this.pages = 1
      this.getProductList()
    },
    nameVal (newVal) {
      this.pages = 1
      this.getProductList()
    },
    colorVal (newVal) {
      this.pages = 1
      this.getProductList()
    },
    searchVal (newVal) {
      this.pages = 1
      this.getProductList()
    }
  },
  computed: {
    typeValCmp () {
      if (this.typeVal) {
        return this.typeList.find((item) => item.name === this.typeVal).name
      } else {
        return '所有分类'
      }
    },
    stockValCmp () {
      if (this.stockVal) {
        return this.stockList.find((item) => item.id === this.stockVal).name
      } else {
        return ''
      }
    },
    nameValCmp () {
      if (this.nameVal) {
        return this.nameList.find((item) => item.id === this.nameVal).name
      } else {
        return ''
      }
    },
    colorValCmp () {
      if (this.colorVal) {
        return this.colorList.find((item) => item.id === this.colorVal).name
      } else {
        return ''
      }
    }
  },
  created () {
    Promise.all([
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      ingredientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      YarnList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      YarnColorList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.stockList.push(...res[0].data.data.filter(key => (key.type.indexOf(9) !== -1)))
      this.typeList = res[1].data.data
      this.nameList = res[2].data.data
      this.colorList = res[3].data.data
      this.getProductList()
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productStockList.less";
</style>
<style lang="less">
#productStockList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
}
</style>
