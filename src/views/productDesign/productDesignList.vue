<template>
  <div id="productDesignList">
    <div class="head">
      <h2>生产计划单列表</h2>
      <el-input placeholder="输入订单号精确搜索" suffix-icon="el-icon-search" v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable v-show="companyCmp" @close="clear('company')">{{companyCmp}}</el-tag>
          <el-tag closable v-show="contactsCmp" @close="clear('contacts')">{{contactsCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="company" placeholder="外贸公司">
              <el-option
                v-for="item in companyArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="contacts" placeholder="联系人">
              <el-option
                v-for="item in contactsArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
          <div class="tableColumn">订单号</div>
          <div class="tableColumn flex9">外贸公司</div>
          <div class="tableColumn">联系人</div>
          <div class="tableColumn">交货批次(批)</div>
          <div class="tableColumn">结算单位</div>
          <div class="tableColumn">订单价</div>
          <div class="tableColumn">下单日期</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow" v-for="(item) in list" :key="item.id">
          <div class="tableColumn" style="color:#1A95FF">{{item.order_code}}</div>
          <div class="tableColumn flex9">{{item.client_name}}</div>
          <div class="tableColumn">{{item.contacts}}</div>
          <div class="tableColumn">{{item.order_batch.length}}</div>
          <div class="tableColumn">{{item.account_unit}}</div>
          <div class="tableColumn">{{item.total_price}}</div>
          <div class="tableColumn">{{item.order_time}}</div>
          <div class="tableColumn flex9">
            <span class="btns normal">修改</span>
            <span class="btns success" @click="$router.push('/index/productDesignCreate/'+item.id)">查看</span>
            <span class="btns warning">打印</span>
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
          @current-change="getOrderList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { orderList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      searchVal: '',
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
      company: '',
      companyArr: [],
      contacts: '',
      contactsArr: [],
      list: [],
      total: 0,
      pages: 1
    }
  },
  computed: {
    companyCmp () {
      return false
    },
    contactsCmp () {
      return false
    }
  },
  methods: {
    // 删除条件
    clear (item) {

    },
    getOrderList () {

    }
  },
  mounted () {
    orderList({
      company_id: window.sessionStorage.getItem('company_id'),
      page: this.pages,
      limit: 5,
      has_plan: 1
    }).then((res) => {
      console.log(res)
      this.total = res.data.meta.total
      this.list = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productDesignList.less';
</style>
