<template>
  <div id="designFormTable">
    <p class="company">{{companyName}}有限公司工艺单</p>
    <div class="table">
      <div class="page_header">
        <span>工艺单编号:{{designFromTable.craft_code}}</span>
        <span>创建时间：{{designFromTable.create_time}}</span>
      </div>
      <ul class="table-box">
        <li class="info">
          <div>产品名称</div>
          <div>围巾/梭织/宽巾/豹纹</div>
          <div>成分</div>
          <div>90%涤纶/10%晴纶</div>
          <div>产品编号</div>
          <div>{{designFromTable.product_info.product_code}}</div>
        </li>
        <li class="info">
          <div>规格</div>
          <div>80*190=2*15</div>
          <div>克重</div>
          <div>{{designFromTable.weight}}g</div>
          <div>备注</div>
          <div>{{designFromTable.product_info.description}}</div>
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
              <span class="unit">1270</span>
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
          <div class="content">
            <div class="drafting-info">
              <span>筘号</span>
              <span class="unit"></span>
              <span>穿筘法</span>
              <span class="unit"></span>
              <span>筘幅</span>
              <span class="unit"></span>
              <span>综页</span>
              <span class="unit"></span>
            </div>
            <div class="through-methods">
              <div class="through-title">穿综法</div>
              <div><span>咖啡机辣椒粉你</span></div>
            </div>
          </div>
        </li>
        <li class="contexture">
          <div class="title">织造工艺</div>
          <div class="content">
            <div class="contexture-info">
              <span>组织法</span>
              <span>平纹</span>
              <span>机上坯幅</span>
              <span class="unit"></span>
              <span>纬密</span>
              <span class="unit"></span>
              <span>齿牙</span>
              <span class="unit">
                <span>上:29</span>
                <span>下:29</span>
              </span>
            </div>
            <div class="contexture-info">
              <span>让位要求</span>
              <span>内长</span>
              <span class="unit"></span>
              <span>让位</span>
              <span class="unit"></span>
              <span>总计</span>
              <span class="unit"></span>
            </div>
            <div class="main-raw-material material">
              <span>主要原料(纬)</span>
              <span>36支单股晴纶：主</span>
            </div>
            <div class="lost-raw-material material">
              <span>次要原料(纬)</span>
              <span>
                <span>36支单股晴纶：主</span>
                <span>夹3/夹4：52支双股晴纶</span>
                <span>夹5：24支单股晴纶</span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">纬向排列</div>
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
                <div>倒序1遍</div>
              </div>
            </div>
          </div>
        </li>
        <li class="match-colors">
          <div class="title">配色工艺</div>
          <div class="content">
            <div class="table-head-row">
              <div class="table-head">
                <span>颜色组</span>
                <span>具体配色</span>
              </div>
              <div v-for="(item,index) in forArr(7)"
                   :key="index">
                <div>{{index == 0 ? "主" : "夹" + index}}</div>
                <div>
                  <span>经</span>
                  <span>纬</span>
                </div>
              </div>
            </div>
            <ul class="list">
              <li v-for="(value,index) in forArr(6)"
                  :key="index">
                <div class="table-head-col">颜色组</div>
                <div v-for="(value,index) in forArr(7)"
                     :key="index">
                  <span>颜色</span>
                  <span v-if="index == 3 || index == 4 || index == 6">颜色</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { craftOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      designFromTable: {},
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
      companyName: 'xx'
      // designNum: 'KR-001',
      // timer: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    }
  },
  methods: {
    forArr: (num) => {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  created () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      this.designFromTable = res.data.data
      console.log(this.designFromTable)
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormTable.less";
</style>
