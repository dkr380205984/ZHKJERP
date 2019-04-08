<template>
  <div id="designFormTable">
    <ul class="table">
      <li class="company">xx有限公司工艺单</li>
      <li>
        <div>
          <span>产品名称</span>
          <span>{{date1.productName}}</span>
        </div>
        <div>
          <span>花型</span>
          <span>{{date1.model}}</span>
        </div>
        <div>
          <span>工艺单编号</span>
          <span>{{date1.productId}}</span>
        </div>
      </li>
      <li>
        <div>
          <span>规格</span>
          <span>{{date1.specification}}</span>
        </div>
        <div>
          <span>克重</span>
          <span class="posi">{{date1.weight}}</span>
        </div>
        <div>
          <span>产品编码</span>
          <span>{{date1.designNum}}</span>
        </div>
      </li>
      <li>
        <div class="title">主要原料及配色排列</div>
        <div class="content"></div>
      </li>
      <li>
        <div class="title">整经工艺</div>
        <div class="content">
          <div>
            <span>整经总头纹</span>
            <span class="posi"></span>
            <span>边型</span>
            <span></span>
          </div>
          <div>
            <span>整经门幅</span>
            <span></span>
            <span>机型</span>
            <span></span>
          </div>
        </div>
      </li>
      <li>
        <div class="title">穿综筘工艺</div>
        <div class="content">
          <div>
            <span>筘号</span>
            <div></div>
            <span>穿筘法</span>
            <div></div>
            <span>筘幅</span>
            <div></div>
            <span>综页</span>
            <div></div>
          </div>
          <div class="czfBox">
            <div>穿综法</div>
            <div></div>
          </div>
        </div>
      </li>
      <li>
        <div class="title">织造工艺</div>
        <div class="content"></div>
      </li>
      <li>
        <div class="title">纱线系数</div>
        <div class="content"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // name: 'designFormTable',
  data () {
    return {
      date1: {
        productName: '围巾/梭织/宽巾',
        model: '豹纹',
        productId: 'KR19011101',
        specification: '80*190+2*1.5',
        weight: '100',
        designNum: 'KR-0001'
      }
    }
  },
  created () {
    // console.log(this)
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormTable.less";
</style>
