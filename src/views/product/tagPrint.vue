<template>
  <div id="tagPrint"
    v-loading='loading'>
    <div class="printInfo"
      v-for="(item,key) in $route.params.color.split(',')"
      :key="key">
      <div class="items">
        <span class="labels">编号:</span>
        <div class="contents">{{product_code}}</div>
      </div>
      <div class="items">
        <span class="labels">品类:</span>
        <div class="contents">{{type}}</div>
      </div>
      <div class="items">
        <span class="labels">花型:</span>
        <div class="contents">{{flower}}</div>
      </div>
      <div class="items">
        <span class="labels">成分:</span>
        <div class="contents">{{materials|filterMaterial}}</div>
      </div>
      <div class="items">
        <span class="labels">规格:</span>
        <div class="contents col"
          style="align-items:flex-start">
          <span style="white-space:nowrap;">{{size.measurement}}</span>
          <span style="word-break: break-word;">{{size.size_info}}</span>
        </div>
      </div>
      <div class="items">
        <span class="labels">克重:</span>
        <div class="contents">{{size.weight ? size.weight : ''}}g</div>
      </div>
      <div class="items">
        <span class="labels">颜色:</span>
        <div class="contents">{{item}}</div>
      </div>
      <div class="items">
        <span class="labels">描述:</span>
        <div class="contents">
          <span>{{description ? description : '暂无'}}</span>
        </div>
      </div>
      <div class="items">
        <div class="contents col">
          <img :src="qrCodeUrl"
            class="qrCode"
            alt="">
          <span class="littleBlack">扫码查看更多</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne } from '@/assets/js/api.js'
const QRCode = require('qrcode')
export default {
  data () {
    return {
      loading: true,
      product_code: '',
      size: [],
      description: '',
      type: '',
      flower: '',
      qrCodeUrl: '',
      materials: []
    }
  },
  updated () {
    if (!this.loading && this.qrCodeUrl) {
      window.print()
    }
  },
  mounted () {
    porductOne({
      id: this.$route.params.id
    }).then((res) => {
      if (res.data.status) {
        let detail = res.data.data
        this.product_code = detail.product_code
        this.size = detail.size.find(key => key.measurement === this.$route.params.size)
        this.description = detail.description
        this.materials = detail.materials
        this.type = detail.category_info.product_category + '/' + detail.type_name + '/' + detail.style_name
        this.flower = detail.flower_id + (detail.needle_type ? '(' + detail.needle_type + ')' : '')
        this.loading = false
      }
    })
    QRCode.toDataURL(window.location.origin + '/index/productDetail/' + this.$route.params.id, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      this.qrCodeUrl = url
    })
  },
  filters: {
    filterMaterial (materials) {
      let arr = materials.map(item => {
        return item.ingredient_value + '%' + item.ingredient_name
      })
      return arr.join(',')
    }
  }
}
</script>

<style lang="less">
html,
body {
  overflow: visible !important;
}
#tagPrint {
  .printInfo {
    overflow: hidden;
    page-break-after: always;
    width: 226px;
    height: 330px;
    background: #fff;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px;
    box-sizing: border-box;
    color: #000;
    .items {
      width: 100%;
      margin-bottom: 14px;
      line-height: 1em;
      min-height: 0;
      display: flex;
      justify-content: flex-start;
      .labels {
        margin-right: 1em;
        position: static;
        width: auto;
        white-space: nowrap;
      }
      .contents {
        text-align: left;
        &.col {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .qrCode {
            width: 90px;
            height: 90px;
          }
          .littleBlack {
            margin-top: 8px;
            color: #444;
          }
        }
      }
    }
  }
}
</style>
