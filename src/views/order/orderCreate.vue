<template>
  <div id = "orderCreate">
    <div class="head">
      <h2>添加订单</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      value1: 'KB12345678',
      value2: '围脖 / 针织 / 长巾 / 条纹',
      value3: '涤纶:10% / 毛线:90%',
      value4: '长(40cm) * 宽(40cm) * 须头(40cm)',
      value5: '100克',
      value6: '2018-03-21',
      value7: '夏东海',
      value8: '长(40cm) * 宽(40cm) * 须头(40cm)长(40cm) * 宽(40cm) * 须头(40cm)长(40cm) * 宽(40cm) * 须头(40cm)长(40cm) * 宽(40cm) * 须头(40cm)',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      num: 1,
      num2: 1,
      num3: 1,
      radio2: 3,
      date: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/orderCreate.less';
</style>
<style lang="less">
#sampleCreate{
  .onceLine{
    .el-input__inner{
      background: #F8F8F8;
    }
  }
}
</style>
