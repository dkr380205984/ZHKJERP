<template>
  <div id="mainMaterialStockList">
    <div class="head">
      <h2>原料库存列表</h2>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
          </div>
          <div class="rightFilter">
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn flex9">原料名称</div>
          <div class="tableColumn">原料颜色</div>
          <div class="tableColumn">原料属性</div>
          <div class="tableColumn">库存量(千克)</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow" v-for="item in list" :key="item.id">
          <div class="tableColumn flex9">{{item.material_name}}</div>
          <div class="tableColumn">{{item.material_color}}</div>
          <div class="tableColumn">{{item.material_attribute?item.material_attribute:'无'}}</div>
          <div class="tableColumn">{{item.total_weight}}</div>
          <div class="tableColumn">{{item.updated_at}}</div>
          <div class="tableColumn flex9">
            <span class="btns success" @click="$router.push('./mainMaterialStockDetail/' + item.id)">详情</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination
          background
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
import { materialStockList } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      pages: 1
    }
  },
  computed: {
  },
  methods: {
    // 删除条件
    clear (item) {

    },
    getList () {
      materialStockList({
        company_id: window.sessionStorage.getItem('company_id'),
        page: this.pages,
        limit: 5
      }).then((res) => {
        console.log(res)
        this.total = res.data.data.total
        this.list = res.data.data.data
      })
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
