<template>
  <div id="foreignTradeFinancialDetail">
    <div class="head">
      <h2>外贸公司详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司名称:</span>
          <span class="content">{{'杭州飞泰'}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司简称:</span>
          <span class="content">{{'飞泰'}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司类型:</span>
          <span class="content">{{'染色'}}</span>
        </div>
        <div class="rightCtn">
          <span class="totalPrice">
            <span class="label">共计:</span>
            <span class="content">{{80000}}元</span>
          </span>
          <span class="settlement">
            <span>
              <span class="label">已结算:</span>
              <span class="content">{{6000}}元</span>
            </span>
            <span>
              <span class="label">待结算:</span>
              <span class="content">{{80000-6000}}元</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn"
        style="flex-direction:row;">
        <span :class="{cutList:true,active:flag}"
          @click="flag =true">转账列表</span>
        <span :class="{cutList:true,active:!flag}"
          @click="flag = false">扣款列表</span>
      </div>
      <div class="lineCtn"
        v-show="flag">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select v-model="selectVal"
              style="margin-left:20px;"
              placeholder="请选择">
              <el-option v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker v-model="data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="addBtn">+转账记录</div>
        </div>
        <div class="table">
          <div class="title">
            <span @click="filterOption.orderFilterFlag = !filterOption.orderFilterFlag"
              class="icon">
              转账日期
              <em class="el-icon-caret-top"
                :style="{color:filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
              <em class="el-icon-caret-bottom"
                :style="{color:!filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            </span>
            <span>转账属性</span>
            <span @click="filterOption.timeFilterFlag = !filterOption.timeFilterFlag"
              class="icon">
              转账金额
              <em class="el-icon-caret-top"
                :style="{color:filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
              <em class="el-icon-caret-bottom"
                :style="{color:!filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            </span>
            <span>转账说明</span>
            <span>转账凭证</span>
            <span>其他</span>
            <span>操作</span>
          </div>
          <ul class="infinite-list"
            @mousewheel="getPayData">
            <li v-for="(item,key) in payList"
              :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>{{item.pay_time}}</span>
                <span>{{item.pay_type}}</span>
                <span>{{item.pay_money}}{{item.price_unit}}</span>
                <span>{{item.desc ? item.desc : '无'}}</span>
                <span>img</span>
                <span>{{item.other ? item.other : '无'}}</span>
                <span>
                  <span class="btn"
                    @click="$router.push('/index/foreignTradeFinancialDetail/' + item.id)">详情</span>
                  <span class="btn change">修改</span>
                </span>
              </div>
            </li>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span>{{450021|filterNumber}}元</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        v-show="!flag">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select v-model="selectVal"
              style="margin-left:20px;"
              placeholder="请选择">
              <el-option v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker v-model="data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="addBtn">+直接扣款</div>
        </div>
        <div class="table">
          <div class="title">
            <span @click="filterOption.orderFilterFlag = !filterOption.orderFilterFlag"
              class="icon">
              订单号
              <em class="el-icon-caret-top"
                :style="{color:filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
              <em class="el-icon-caret-bottom"
                :style="{color:!filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            </span>
            <span>下单日期</span>
            <span>外贸公司</span>
            <span>合作项目</span>
            <span>具体金额</span>
            <span>扣款金额</span>
            <span>扣款原因</span>
            <span>合计金额</span>
            <span>已结算</span>
            <span>待结算</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list"
            @mousewheel="getCutPayData">
            <li v-for="(item,key) in cutPayList"
              :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>{{item.order_code}}</span>
                <span>{{item.order_time}}</span>
                <span>{{item.client_name}}</span>
                <span>{{item.cooperation_type}}</span>
                <span>{{item.total_price}}元</span>
                <span>{{item.cutPay_price}}元</span>
                <span>{{item.cutPay_why}}</span>
                <span>{{item.total_price - item.cutPay_price}}元</span>
                <span>{{item.compiled_pay}}元</span>
                <span>{{item.total_price - item.cutPay_price - item.compiled_pay}}元</span>
                <span class="flex15">
                  <span class="btn"
                    @click="$router.push('/index/foreignTradeFinancialDetail/' + item.id)">详情</span>
                  <span class="btn change">结算</span>
                  <span class="btn cutPay">扣款</span>
                </span>
              </div>
            </li>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{450454512|filterNumber}}元</span>
            <span>{{(450454512.01)|filterNumber}}元</span>
            <span></span>
            <span>{{450454512|filterNumber}}元</span>
            <span>{{450454512|filterNumber}}元</span>
            <span>{{450454512|filterNumber}}元</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
      <!-- <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.push('/index/foreignTradeUpdate/' + $route.params.id)">修改</div>
      </div> -->
    </div>

  </div>
</template>

<script>
// import { companyType } from '@/assets/js/dictionary.js'
// import { clientDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      selectVal: '',
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
      data: '',
      filterOption: {
        orderFilterFlag: false,
        timeFilterFlag: false,
        totalFilterFlag: false,
        numberFilterFlag: false,
        outNumberFilterFlag: false,
        totalNumberFilterFlag: false,
        companyCostFilterFlag: false,
        cutPayFilterFlag: false,
        billFilterFlag: false
      },
      flag: true, // 切换列表
      payList: [],
      cutPayList: []
    }
  },
  methods: {
    getPayList () {
      console.log('add')
      for (let i = 0; i < 10; i++) {
        this.payList.push({
          id: 666,
          pay_time: '2019-07-06',
          pay_type: '电子汇款',
          pay_money: '9000',
          desc: '',
          pay_prove: [],
          other: ''
        })
      }
    },
    getPayData () {
      let el = document.getElementsByClassName('infinite-list')[0]
      if (Number(el.scrollTop) + 600 >= this.payList.length * 60) {
        this.getPayList()
      }
    },
    getCutPayList () {
      for (let i = 0; i < 10; i++) {
        this.cutPayList.push({
          id: 666,
          order_code: '666',
          order_time: '2019-06-05',
          client_name: '飞泰',
          cooperation_type: '染色',
          total_price: '3000',
          cutPay_price: '100',
          cutPay_why: '色差',
          compiled_pay: '2000'
        })
      }
    },
    getCutPayData () {
      let el = document.getElementsByClassName('infinite-list')[1]
      if (Number(el.scrollTop) + 600 >= this.cutPayList.length * 60) {
        this.getCutPayList()
      }
    }
  },
  created () {
    this.getPayList()
    this.getCutPayList()
  },
  filters: {
    filterNumber (val) {
      return val.toLocaleString()
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeFinancialDetail.less";
</style>
