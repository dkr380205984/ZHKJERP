<template>
  <div id="productMenu"
    v-loading='loading'>
    <div class="head">
      <div class="head-left">
        <div class="logoBox">
          <img :src="logoUrl"
            alt="">
        </div>
        <div class="clientBox">
          <h1>{{client_name}}</h1>
          <h3>产品手册</h3>
        </div>
      </div>
      <div class="head-right">
        <div class="btn"
          @click="share"><span class="icon el-icon-share"></span>分享
          <div class="share-box"
            v-show="shareBoxStatu">
            <div class="qrCode-box">
              <!-- <img src="../../../../productMenu.png"
                alt=""> -->
              <img class="qrcode_canvas"
                id="qrcode_canvas"
                ref="qrcodeCanvas"
                alt="二维码图片">
              <img class="qrcode_logo"
                ref="qrcodeLogo"
                :src="logoUrl"
                alt="二维码logo">
              <canvas :width="qrSize"
                :height="qrSize"
                class="canvas"
                ref="canvas"></canvas>
            </div>
            <div class="url-box">
              <el-input v-model="urlVal"
                style="width:280px;"
                id="copyDom"></el-input>
              <el-button type="primary"
                style="margin-left:10px"
                @click="copyUrl">点击复制</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="about">
        <div class="about-top">
          <el-carousel indicator-position="none"
            class="img">
            <el-carousel-item v-for="(item,key) in image"
              class="img"
              :key="key">
              <!-- <img :src="item"
                alt=""
                class="img"> -->
              <div class="bgBox"
                :style="{'background-image':getBg(item)}"></div>
            </el-carousel-item>
          </el-carousel>
          <div class="about-box">
            <span class="title">公司简介</span>
            <div class="box">
              <div class="info">
                <span class="content">{{about}}</span>
              </div>
              <div class="contact">
                <ul>
                  <li><span class="label"><em class="icon el-icon-mobile-phone"></em>电话:</span><span class="data">{{tel}}</span></li>
                  <li><span class="label"><em class="icon el-icon-message"></em>邮箱:</span><span class="data">{{email}}</span></li>
                  <li><span class="label"><em class="icon el-icon-location-outline"></em>地址:</span><span class="data">{{address}}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="about-bottom">
          <div class="imgBox">
            <img :src="image[1]"
              alt="">
            <img :src="image[2]"
              alt="">
            <img :src="image[3]"
              alt="">
            <img :src="image[4]"
              alt="">
          </div>
        </div> -->
      </div>
      <div class="production-box">
        <div class="filterCtn">
          筛选条件:
          <el-select v-model="filterList.typeVal"
            class="serach"
            clearable
            placeholder="筛选产品品类">
            <el-option v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-input placeholder="输入产品编号精确搜索"
            class="serach"
            suffix-icon="el-icon-search"
            v-model="filterList.serachVal">
          </el-input>
        </div>
        <div class="listCtn">
          <div class="productBox"
            v-for="item in filterProList"
            :key="item.product_id">
            <div class="box-top">
              <!-- <img :src="(item.image && item.image.length !== 0) ? item.image[0] : require('@/assets/image/index/noPic.jpg')"
                alt=""> -->
              <div class="bgBox"
                :style="{'background-image':getBg((item.image && item.image.length !== 0) ? item.image[0] : require('@/assets/image/index/noPic.jpg'))}"></div>
              <!-- <div class="info">
                <span>产品描述:</span>
                <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</span>
              </div> -->
            </div>
            <div class="box-bottom">
              <span>{{item.product_code}}</span>
              <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
            </div>
          </div>
          <div class="tip"
            v-if="filterProList.length === 0">暂无该分类产品</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { productList, companyInfoDetail, productMenuList, productTppeList } from '@/assets/js/api.js'
const QRCode = require('qrcode')
export default {
  data () {
    return {
      loading: true,
      logoUrl: '',
      client_name: '',
      typeList: [],
      filterList: {
        typeVal: '',
        serachVal: ''
      },
      urlVal: '',
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      shareBoxStatu: false,
      about: '',
      tel: '',
      email: '',
      address: '',
      image: [],
      productList: [],
      filterProList: [],
      qrLogo: '',
      qrSize: 100,
      qrLogoSize: 20
    }
  },
  methods: {
    getBg (item) {
      return 'url("' + item + '")'
    },
    share () {
      this.shareBoxStatu = !this.shareBoxStatu
    },
    copyUrl () {
      let copy = document.getElementById('copyDom')
      copy.select()
      document.execCommand('Copy')
      this.$message.success('复制成功')
    },
    getProductList () {
      this.loading = true
      productList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 20,
        // 'category_id': this.categoryVal,
        // 'flower_id': this.flowerVal,
        // 'start_time': this.start_time,
        // 'end_time': this.end_time,
        // 'product_code': this.searchVal,
        'page': this.pages
      }).then((res) => {
        this.total = res.data.meta.total
        this.productList = res.data.data
        this.loading = false
      })
    }
  },
  created () {
    this.urlVal = window.location.href
    Promise.all([
      companyInfoDetail({
        id: window.sessionStorage.getItem('company_id')
      }),
      productMenuList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      productTppeList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      let data = res[0].data.data
      this.logoUrl = data.logo
      this.client_name = data.company_name
      this.about = data.introduce
      this.image = data.image
      this.tel = data.phone
      this.email = data.email
      this.address = data.address
      this.productList = res[1].data.data
      this.filterProList = this.productList
      this.typeList = res[2].data.data
      this.loading = false
    })
  },
  mounted () {
    let qrcodeCanvas = this.$refs.qrcodeCanvas
    let qrcodeLogo = this.$refs.qrcodeLogo
    let canvas = this.$refs.canvas
    // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
    QRCode.toDataURL(this.urlVal, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      qrcodeCanvas.src = url
      // 画二维码里的logo// 在canvas里进行拼接
      let ctx = canvas.getContext('2d')
      setTimeout(() => {
        // 获取图片
        ctx.drawImage(qrcodeCanvas, 0, 0, this.qrSize, this.qrSize)
        // 设置logo大小
        // 设置获取的logo将其变为圆角以及添加白色背景
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        let logoPosition = (this.qrSize - this.qrLogoSize) / 2 // logo相对于canvas居中定位
        let h = this.qrLogoSize + 10 // 圆角高 10为基数(logo四周白色背景为10/2)
        let w = this.qrLogoSize + 10 // 圆角宽
        let x = logoPosition - 5
        let y = logoPosition - 5
        let r = 5 // 圆角半径
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r)
        ctx.arcTo(x + w, y + h, x, y + h, r)
        ctx.arcTo(x, y + h, x, y, r)
        ctx.arcTo(x, y, x + w, y, r)
        ctx.closePath()
        ctx.fill()
        ctx.drawImage(
          qrcodeLogo,
          logoPosition,
          logoPosition,
          this.qrLogoSize,
          this.qrLogoSize
        )
        // canvas.style.display = 'none'
        // qrcodeCanvas.src = canvas.toDataURL()
        // qrcodeCanvas.style.display = 'inline-block'
      }, 700)
    })
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    }
  },
  watch: {
    'filterList': {
      deep: true,
      handler (newVal) {
        this.filterProList = newVal.typeVal ? this.productList.filter(key => key.category_name === newVal.typeVal) : this.productList
        this.filterProList = newVal.serachVal ? this.filterProList.filter(key => key.product_code.indexOf(newVal.serachVal) !== -1) : this.filterProList
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "~@/assets/css/productMenu.less";
</style>
<style lang="less">
#productMenu {
  .el-carousel__container {
    height: 100%;
    z-index: 0;
  }
}
</style>
