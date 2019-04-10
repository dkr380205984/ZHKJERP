<template>
  <div id="orderCreate">
    <div class="head">
      <h2>添加订单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">订单号：</span>
          <el-input class="elInput" v-model="orderId" placeholder="请输入订单号"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">外贸公司：</span>
           <el-select class="elInput" v-model="company" placeholder="请选择外贸公司">
            <el-option
              v-for="item in companyArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label must">联系人：</span>
          <el-select class="elInput" v-model="contacts" placeholder="请选择联系人">
            <el-option
              v-for="item in contactsArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">结算单位：</span>
          <el-select class="elInput" v-model="money" placeholder="请选择联系人">
            <el-option
              v-for="item in moneyArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label must">汇率：</span>
          <el-input class="elInput" v-model="exchangeRate" placeholder="请输入汇率">
            <template slot="append">人民币</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">税率：</span>
          <el-input class="elInput" v-model="taxRate" placeholder="请选择货币">
            <template slot="append">%</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">下单日期：</span>
          <el-date-picker
            class="elInput"
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">添加产品：</span>
          <div class="lineSearch show">
            <el-input
              class="elInput"
              placeholder="请输入产品编号搜索"
              suffix-icon="el-icon-search"
              v-model="search">
            </el-input>
            <span class="gjss">高级搜索
              <i class="el-icon el-icon-arrow-up"></i>
            </span>
            <div class="hideSearch">
              <div class="block">
                <div class="blockOnce">
                  <span class="name">产品类别：</span>
                </div>
                <div class="blockOnce">
                  <span class="name">产品类别：</span>
                </div>
              </div>
              <div class="block">
                <div class="blockOnce">
                  <span class="name">产品类别：</span>
                </div>
                <div class="blockOnce">
                  <span class="name">产品类别：</span>
                </div>
              </div>
            </div>
          </div>
          <div class="lineTable"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      orderId: '',
      companyId: window.sessionStorage.getItem('company_id'),
      companyArr: [],
      company: '',
      contactsArr: [],
      contacts: '',
      moneyArr: [],
      money: '',
      exchangeRate: '',
      taxRate: '14',
      date: '',
      search: ''
    }
  },
  mounted () {
    clientList({
      company_id: this.companyId,
      keyword: '',
      status: ''
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/orderCreate.less';
</style>
