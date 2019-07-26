<template>
  <div id="mainMaterialStockList"
    v-loading='loading'>
    <div class="head">
      <h2>物料库存列表</h2>
      <!-- <el-input style="width:250px"
        placeholder="输入工厂搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input> -->
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="stock_id"
              placeholder="可输入仓库进行筛选"
              style="width:230px"
              clearable
              filterable
              @change="getList">
              <el-option v-for="item in stockList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="rightFilter">
            <el-date-picker v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="pickTime"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <ul class="tablesCtn"
        v-scroll="{fun:getList,pageSize:5}"
        style="line-height:60px;width:100%;min-height:600px;margin:0;padding:0">
        <li class="title">
          <span>仓库名称</span>
          <span>物料颜色</span>
          <span>物料属性</span>
          <span>库存量(kg)</span>
          <span>物料缸号</span>
          <span>更新时间</span>
          <span>操作</span>
        </li>
        <li class="content">
          <span class="tableRow">本厂</span>
          <span class="tableRow col"
            style="flex:6">
            <span class="tableColumn">
              <span class="tableRow">红色</span>
              <span class="tableRow">无</span>
              <span class="tableRow">200</span>
              <span class="tableRow">vat_null</span>
              <span class="tableRow">2019-07-24 10:53</span>
              <span class="tableRow"
                @click="$router.push('/index/mainMaterialStockDetail/' + '0' + '/' + $route.params.id)">详情</span>
            </span>
            <span class="tableColumn">
              <span class="tableRow">白色</span>
              <span class="tableRow">无</span>
              <span class="tableRow">200</span>
              <span class="tableRow">vat_null</span>
              <span class="tableRow">2019-07-24 10:53</span>
              <span class="tableRow"
                @click="$router.push('/index/mainMaterialStockDetail/' + '0' + '/' + $route.params.id)">详情</span>
            </span>
            <span class="tableColumn">
              <span class="tableRow">黄色</span>
              <span class="tableRow">无</span>
              <span class="tableRow">200</span>
              <span class="tableRow">vat_null</span>
              <span class="tableRow">2019-07-24 10:53</span>
              <span class="tableRow"
                @click="$router.push('/index/mainMaterialStockDetail/' + '0' + '/' + $route.params.id)">详情</span>
            </span>
          </span>
        </li>
        <li class="content"></li>
      </ul>
    </div>
    <div class="pageCtn">
      <el-pagination background
        :page-size="5"
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="pages"
        @current-change="getList">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { materialStockDetail, clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      stock_name: '',
      searchVal: '',
      stock_id: '',
      stockList: [{
        id: 0,
        name: '本厂'
      }],
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
      list: [],
      total: 0,
      pages: 1,
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    // 删除条件
    clear (item) {

    },
    getList () {
      materialStockDetail({
        stock_id: this.$route.params.stockId,
        page: this.pages,
        limit: 5,
        material_color: this.color,
        start_time: this.start_time,
        end_time: this.end_time
      }).then((res) => {
        console.log(res)
        this.total = res.data.data.total
        this.list = res.data.data.data
      })
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
      this.getList()
    }
  },
  created () {
    Promise.all([
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      this.stockList.push(...res[0].data.data.filter(item => item.type.indexOf(9) !== -1))
      console.log(this.stockList)
    })
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/mainMaterialStockList.less";
</style>
