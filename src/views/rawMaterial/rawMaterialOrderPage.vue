<template>
  <div id="rawMaterialOrderPage">
    <div class="head">
      <h2>原料订购</h2>
    </div>
    <div class="body">
      <div class="title">
        <div class="content">
          <span>订单信息</span>
          <span @click='close'><em class="el-icon-caret-top"
                :style="{transform: flag ? 'rotateZ(180deg)' : 'rotateZ(0deg)'}"></em>{{flag ? '展开' : '收起'}}</span>
        </div>
      </div>
      <div :class="{info:true,close:flag}">
        <div class="lineCtn">
          <div class="inputCtn twoLine">
            <span class="label">订单号:</span>
            <span class="content">{{product.orderCode}}</span>
          </div>
          <div class="inputCtn twoLine">
            <span class="label">外贸公司:</span>
            <span class="content">{{product.companyName}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn twoLine">
            <span class="label">下单日期:</span>
            <span class="content">{{product.createTime}}</span>
          </div>
          <div class="inputCtn twoLine">
            <span class="label">负责小组:</span>
            <span class="content">{{product.responsible}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品信息:</span>
            <span class="content">
              <ul class="table">
                <li class="title">
                  <span>计划原料信息</span>
                  <span>库存信息</span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                </li>
                <li>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div class="title">
        <div class="content">
          <span>原料订购信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      product: {
        orderCode: 'KR-0001',
        createTime: '2019-04-10',
        companyName: '飞泰',
        responsible: 'A组'
      }
    }
  },
  methods: {
    close (e) {
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderPage.less";
</style>
