<template>
  <div id="foreignTradeList"
    v-loading="loading">
    <div class="head">
      <h2>客户列表</h2>
      <el-input placeholder="请输入客户名称或简称"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterMenu">
        <div class="selectLine">
          <div class="leftFilter">
            <el-select v-model="status"
              placeholder="请选择">
              <el-option v-for="item in statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
              :picker-options="pickerOptions"
              @change="pickTime">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="tableCtn"
        v-scroll="{fun:getList,pageSize:5}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">客户名称</div>
          <div class="tableColumn">客户简称</div>
          <div class="tableColumn">公司类型</div>
          <div class="tableColumn">人员数量</div>
          <div class="tableColumn">联系电话</div>
          <div class="tableColumn">公司地址</div>
          <div class="tableColumn">添加时间</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item,index) in list"
          :key="index">
          <div class="tableColumn">{{item.name}}</div>
          <div class="tableColumn">{{item.abbreviation}}</div>
          <div class="tableColumn"><template v-for="(val,ind) in item.type">{{(ind !== 0 ? ',' : '') + val}}</template></div>
          <div class="tableColumn">{{item.contacts.length}}</div>
          <div class="tableColumn">{{item.phone?item.phone:'暂无'}}</div>
          <div class="tableColumn">{{item.address?item.address:'暂无'}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn">{{item.update_time}}</div>
          <div class="tableColumn flex9">
            <div class="once">
              <span class="btns warning"
                @click="$router.push('/index/foreignTradeUpdate/'+item.id)">修改</span>
              <span class="btns success"
                @click="$router.push('/index/foreignTradeDetail/'+item.id)">详情</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          layout="prev, pager, next,total"
          @current-change="getList"
          :page-size="5"
          :current-page.sync="pages"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { companyType } from '@/assets/js/dictionary.js'
import { clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      groupVal: '',
      groupArr: [],
      date: '',
      searchVal: '',
      status: '',
      statusArr: [{
        label: '全部',
        value: ''
      }, {
        label: '合作中',
        value: '0'
      }, {
        label: '暂停合作',
        value: '1'
      }],
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
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    getList () {
      this.loading = true
      clientList({
        company_id: window.sessionStorage.getItem('company_id'),
        keyword: this.searchVal,
        status: this.status,
        limit: 5,
        page: this.pages,
        start_time: this.start_time,
        end_time: this.end_time
      }).then((res) => {
        console.log(res)
        this.total = res.data.meta.total
        this.list = res.data.data
        this.list.map(item => {
          let arr = []
          item.type.map(value => {
            arr.push(companyType.find(key => key.value === value).name)
          })
          item.type = arr
        })
        this.loading = false
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
  watch: {
    status (newVal) {
      this.pages = 1
      this.getList()
    },
    searchVal () {
      this.pages = 1
      this.getList()
    }
  },
  filters: {
    filterType (value) {
      let arr = []
      value.map(res => {
        arr.push(companyType.find((item) => item.value === res).name)
      })
      return arr
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeList.less";
</style>
