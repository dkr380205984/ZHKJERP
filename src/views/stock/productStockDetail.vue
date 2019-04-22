<template>
  <div id="productStockDetail">
    <div class="head">
      <h2>产品库存详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品类别：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品成分：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品规格：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">成本价：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">总价：</span>
          <span class="content">(含次品)</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">总价：</span>
          <span class="content">(不含次品)</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">存放仓库：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">存放时间：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新时间：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">备注：</span>
          <span class="content"></span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号：</span>
          <span class="content"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  created () {
    productStockDetail({
      id: 1
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStockDetail.less";
</style>
