<template>
  <div id="designFormTable">
    <p class="company">{{companyName}}有限公司工艺单</p>
    <div class="table">
      <div class="page_header">
        <span>工艺单编号:{{designNum}}</span>
        <span>创建时间：{{timer}}</span>
      </div>
      <ul class="table-box">
        <li class="info">
          <div>产品名称</div>
          <div>围巾/梭织/宽巾/豹纹</div>
          <div>成分</div>
          <div>90%涤纶/10%晴纶</div>
          <div>产品编号</div>
          <div>KR19011101</div>
        </li>
        <li class="info">
          <div>规格</div>
          <div>80*190=2*15</div>
          <div>克重</div>
          <div>100g</div>
          <div>备注</div>
          <div></div>
        </li>
        <li class="main-arrange">
          <div class="title">主要原料及配色排列</div>
          <div class="content">
            <div class="main-raw-material material">
              <span>主要原料(经)</span>
              <span>36支单股晴纶：主</span>
            </div>
            <div class="lost-raw-material material">
              <span>次要原料(经)</span>
              <span>
                <span>36支单股晴纶：主</span>
                <span>夹3/夹4：52支双股晴纶</span>
                <span>夹5：24支单股晴纶</span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">经向排列</div>
              <div class="content">
                <div class="particulars">
                  <div class="list-box"
                       v-for="(value,key) in date2"
                       :key="key"
                       :style="{width: (100/12) * Object.keys(value).length + '%'}">
                    <div class="list">
                      <div v-for="(item,index) in value"
                           :key="index">
                        <span>{{index == 'main' ? "主" : "夹" }}</span>
                        <span>{{item}}</span>
                      </div>
                    </div>
                    <div>{{Object.keys(value).length * 1.5}}</div>
                  </div>
                </div>
                <div>正序6遍</div>
              </div>
            </div>
          </div>
        </li>
        <li class="warping">
          <div class="title">整经工艺</div>
          <div class="content">
            <div>
              <span>整经总头纹</span>
              <span>1270</span>
              <span>边型</span>
              <span>毛边</span>
            </div>
            <div>
              <span>整经门幅</span>
              <span></span>
              <span>机型</span>
              <span>剑杆机</span>
            </div>
          </div>
        </li>
        <li class="drafting">
          <div class="title">穿综筘工艺</div>
          <div class="content"></div>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date2: {
        list1: {
          main: '11',
          jia1: '22',
          jia2: '653',
          jia3: '74'
        },
        list2: {
          main: '333',
          jia1: 'fajk',
          jia2: 'faf',
          jia3: 'gfd'
        },
        list3: {
          main: '333',
          jia1: '324',
          jia2: '524',
          jia3: '52'
        }
      },
      companyName: 'xx',
      designNum: 'KR-001',
      timer: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormTable.less";
</style>
