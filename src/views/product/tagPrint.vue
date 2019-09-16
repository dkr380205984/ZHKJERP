<template>
  <div id="tagPrint"
    v-loading='loading'>
    <div class="printInfo">
      <div class="items">
        <span class="labels">编号:</span>
        <div class="contents">{{product_code}}</div>
      </div>
      <div class="items">
        <span class="labels">品类:</span>
        <div class="contents">{{type}}</div>
      </div>
      <div class="items">
        <span class="labels">成分:</span>
        <div class="contents">{{materials|filterMaterial}}</div>
      </div>
      <div class="items">
        <span class="labels">规格:</span>
        <div class="contents col"
          style="align-items:flex-start">
          <span style="white-space:nowrap;">{{$route.params.size}}</span>
          <span style="word-break: break-word;">{{size[$route.params.size]|filterSize}}cm</span>
        </div>
      </div>
      <div class="items">
        <span class="labels">克重:</span>
        <div class="contents">{{size[$route.params.size] ? size[$route.params.size][0].weight : ''}}g</div>
      </div>
      <div class="items">
        <span class="labels">颜色:</span>
        <div class="contents">{{$route.params.color}}</div>
      </div>
      <div class="items">
        <span class="labels">描述:</span>
        <div class="contents">
          <span>{{description ? description : '暂无'}}</span>
        </div>
      </div>
      <div class="items"
        style="margin-top:30px;">
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
      size: {},
      description: '',
      type: '',
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
        this.size = detail.size
        this.description = detail.description
        this.materials = detail.materials
        this.type = detail.category_info.product_category + '/' + detail.type_name + '/' + detail.style_name + (detail.flower_id ? '/' + detail.flower_id : '')
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
    },
    filterSize (sizeArr) {
      if (sizeArr) {
        return sizeArr.map(item => {
          return item.size_value
        }).join('*')
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
#tagPrint {
  .printInfo {
    width: 226px;
    height: 340px;
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
      margin-bottom: 16px;
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
