<template>
  <div id="mainMaterialStockList"
    v-loading='loading'>
    <div class="head">
      <h2>物料库存列表</h2>
      <el-input style="width:250px"
        placeholder="输入物料名称搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="material_name"
              placeholder="可输入颜色进行筛选"
              style="width:230px"
              clearable
              filterable
              @change="getList">
              <el-option v-for="item in list"
                :key="item.id + item.material_name"
                :label="item.material_name"
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
      <div class="tableCtn"
        v-scroll="{fun:getList,pageSize:5}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn flex9">物料名称</div>
          <div class="tableColumn">库存量(千克)</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow">
          <div class="tableColumn flex9">{{1111}}</div>
          <div class="tableColumn">{{111}}</div>
          <div class="tableColumn">{{111}}</div>
          <div class="tableColumn flex9">
            <span class="btns success"
              @click="$router.push('/index/otherMaterialStockDetail/' + 0)">详情</span>
          </div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="item in list"
          :key="item.id">
          <div class="tableColumn flex9">{{item.material_name}}</div>
          <div class="tableColumn">{{item.total_weight}}</div>
          <div class="tableColumn">{{item.updated_at}}</div>
          <div class="tableColumn flex9">
            <span class="btns success"
              @click="$router.push('/index/otherMaterialStockDetail/' + item.id)">详情</span>
          </div>
        </div>
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
  </div>
</template>

<script>
import { materialStockListNew } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      material_name: '',
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
  watch: {
    searchVal (newVal) {
      this.pages = 1
      this.getList()
    }
  },
  methods: {
    getList () {
      // materialStockListNew({
      //   company_id: window.sessionStorage.getItem('company_id'),
      //   limit: 5,
      //   page: this.pages
      // }).then((res) => {
      //   console.log(res.data.data)
      //   let data = res.data.data.data
      //   // this.list = res.data.data.data
      //   // this.total = res.data.data.total
      this.loading = false
      // })
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
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/mainMaterialStockList.less";
</style>
