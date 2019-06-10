<template>
  <div id="mainMaterialStockList">
    <div class="head">
      <h2>原料库存列表</h2>
      <el-input style="width:250px"
        placeholder="输入原料名称搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="color"
              placeholder="可输入颜色进行筛选"
              style="width:230px"
              clearable
              filterable
              @change="getList">
              <el-option v-for="item in colorList"
                :key="item.id + item.name"
                :label="item.name"
                :value="item.name">
                <div class="bgBlock"
                  :style="{'background':item.color_code}"></div>
                <div class="desc">{{item.name}}</div>
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
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn flex9">原料名称</div>
          <div class="tableColumn">原料颜色</div>
          <div class="tableColumn">原料属性</div>
          <div class="tableColumn">库存量(千克)</div>
          <div class="tableColumn">原料缸号</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="item in list"
          :key="item.id">
          <div class="tableColumn flex9">{{item.material_name}}</div>
          <div class="tableColumn">{{item.material_color}}</div>
          <div class="tableColumn">{{item.material_attribute?item.material_attribute:'无'}}</div>
          <div class="tableColumn">{{item.total_weight}}</div>
          <div class="tableColumn">{{item.vat_code?item.vat_code:'无'}}</div>
          <div class="tableColumn">{{item.updated_at}}</div>
          <div class="tableColumn flex9">
            <span class="btns success"
              @click="$router.push('./mainMaterialStockDetail/' + item.id)">详情</span>
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
import { materialStockList, YarnColorList, pantongList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      searchVal: '',
      color: '',
      colorList: [{
        color_code: '#fff',
        name: '白胚'
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
  watch: {
    searchVal (newVal) {
      this.pages = 1
      this.getProductList()
    }
  },
  methods: {
    // 删除条件
    clear (item) {

    },
    getList () {
      materialStockList({
        company_id: window.sessionStorage.getItem('company_id'),
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
  mounted () {
    Promise.all([pantongList({
      keyword: ''
    }), YarnColorList({
      company_id: window.sessionStorage.getItem('company_id')
    }), materialStockList({
      company_id: window.sessionStorage.getItem('company_id'),
      page: this.pages,
      limit: 5
    })]).then((resArr) => {
      this.colorList = this.colorList.concat(resArr[1].data.data).concat(resArr[0].data.data)
      this.total = resArr[2].data.data.total
      this.list = resArr[2].data.data.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/mainMaterialStockList.less";
</style>
