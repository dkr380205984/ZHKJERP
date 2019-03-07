<template>
  <div id = "sampleCreate">
    <div class="head">
      <h2>添加新产品</h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label">产品分类:</span>
        <el-input class="elInput"  placeholder="请输入产品成分"  v-model="value1" clearable></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/sampleCreate.less';
</style>
