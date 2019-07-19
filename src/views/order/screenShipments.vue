<template>
  <div id="screenShipments">
    <!-- 头部 -->
    <div class="head">
      <h1>订单发货详情表</h1>
      <div class="info">
        <span>{{'桐庐凯瑞针纺有限公司'}}</span>
        <span style="margin-top:10px">当前时间：{{nowTime}}</span>
      </div>
    </div>
    <!-- 可视化图表区域 -->
    <div class="DVbox">
      <div class="explain">
        <div class="border">
          <span>进行中</span>
          <span>逾期</span>
        </div>
        <div class="title">
          <span>本周</span>
          <span>发货数量</span>
        </div>
      </div>
      <div class="ImgBox">
        <div class="DVImg"></div>
        <div class="DVImg"></div>
        <div class="DVImg"></div>
        <div class="DVImg"></div>
        <div class="DVImg"></div>
        <div class="DVImg"></div>
      </div>
    </div>
    <!-- 轮播区域 -->
    <div class="label"></div>
    <!-- 页脚控件及logo -->
    <div class="footed"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowTime: ''
    }
  },
  methods: {
    // 获取当前时间戳
    getTime () {
      requestAnimationFrame(() => {
        let data = new Date()
        this.nowTime = data.getFullYear() + '年' + (Number(data.getMonth()) + 1) + '月' + data.getDate() + '日' + ' ' + (data.getHours() / 12 > 0 ? '下午' + (data.getHours() - 12) : '上午' + data.getHours()) + '点' + data.getMinutes() + '分' + data.getSeconds() + '秒'
        this.getTime()
      })
    }
  },
  created () {
    this.getTime()
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/screenShipments.less";
</style>
