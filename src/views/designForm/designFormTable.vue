<template>
  <!-- <div id="designFormTable">
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
        <div class="content">
          <div>fda </div>
          <div>fafda</div>
          <div class="warpWiseArrange">
            <div class="title">经向排列</div>
            <div class="contentBox">
              <div v-for="(item,index) in date2"
                   :key="index"
                   :style="{width: (100/15) * Object.keys(item).length + '%'}"
                   :class="{Bor: (Object.keys(date2).length <= 4) ? false : true}">
                <div>
                  <div v-for="(value,key) in item"
                       :key="key">
                    <span>{{key == 'main' ? '主' : '夹'}}</span>
                    <span>{{value}}</span>
                  </div>
                </div>
                <div>{{Object.keys(item).length * 1.5}}</div>
              </div>
            </div>
          </div>
        </div>
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
        <div class="content">
          <div>
            <span>组织法</span>
            <span></span>
            <span>机上坯幅</span>
            <span></span>
          </div>
          <div>
            <span>纬密</span>
            <span></span>
            <span>齿牙</span>
            <span></span>
          </div>
          <div>
            <span>让位要求</span>
            <span>内长</span>
            <span></span>
            <span>让位</span>
            <span></span>
            <span>总计</span>
            <span></span>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </li>
      <li>
        <div class="title">纱线系数</div>
        <div class="content"></div>
      </li>
    </ul>
  </div> -->
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
        <li></li>
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
  // name: 'designFormTable',
  // data () {
  //   return {
  //     date1: {
  //       productName: '围巾/梭织/宽巾',
  //       model: '豹纹',
  //       productId: 'KR19011101',
  //       specification: '80*190+2*1.5',
  //       weight: '100',
  //       designNum: 'KR-0001'
  //     },
  //     date2: {
  //       list1: {
  //         main: '11',
  //         jia1: '22'
  //       },
  //       list2: {
  //         main: '333',
  //         jia1: 'fajk',
  //         jia2: 'faf',
  //         jia3: 'gfd'
  //       },
  //       list3: {
  //         main: '333',
  //         jia1: '324',
  //         jia2: '524',
  //         jia3: '52'
  //       // }
  //       },
  //       list4: {
  //         main: '333',
  //         jia1: '52',
  //         jia2: '653',
  //         jia3: '74'
  //       },
  //       list5: {
  //         main: '333',
  //         jia1: '62',
  //         jia2: '725',
  //         jia3: '234'
  //       },
  //       list6: {
  //         main: '333',
  //         jia1: '52',
  //         jia2: '54',
  //         jia3: '65'
  //       },
  //       list7: {
  //         main: '333',
  //         jia1: '809',
  //         jia2: '86'
  //       }
  //     },
  //     // flag: null,
  //     num: 0

  //   }
  // },
  // created () {

  // },
  // methods: {
  //   flag: (item) => {
  //     // console.log(this)

  //     this.num += Object.keys(item).length
  //   }
  // }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormTable.less";
</style>
