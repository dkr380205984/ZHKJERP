<template>
  <div id="productStockList">
    <div class="head">
      <h2>产品库存列表</h2>
      <el-input placeholder="输入产品编号精确搜索" suffix-icon="el-icon-search" v-model="searchVal"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productStockList.less';
</style>
