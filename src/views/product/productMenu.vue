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
      <div class="about"
        ref="divBox">
        <div class="about-top">
          <el-carousel indicator-position="inside"
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
                <span class="content">
                  {{about}}
                </span>
                <span class="tooltip">{{about}}</span>
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
            :key="item.product_id"
            @click="getProductDetail(item.product_id)">
            <div class="box-top">
              <img :src="(item.thumb && item.thumb.length !== 0) ? item.thumb[0] : require('@/assets/image/index/noPic.jpg')"
                alt="">
              <!-- <div class="bgBox thumb"
                @load="showImage"
                :style="{'background-image':getBg((item.thumb && item.thumb.length !== 0) ? item.thumb[0] : require('@/assets/image/index/noPic.jpg'))}"></div> -->
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
    <div class="message"
      v-show="showMessageBox">
      <div class="messageBox"
        style="flex-direction:row"
        v-loading="showMessageBoxLoading">
        <div class="left-img">
          <el-carousel indicator-position="inside"
            :autoplay='false'
            arrow="always">
            <el-carousel-item v-for="(item,key) in showMessageProInfo.img"
              :key="key"
              class="img-inner">
              <div class="imgBox">
                <img :src="item.image_url"
                  v-if="item.image_url"
                  alt="">
              </div>
            </el-carousel-item>
            <div v-if="!showMessageProInfo.img || showMessageProInfo.img.length === 0"
              class="tip">暂无图片信息</div>
          </el-carousel>
        </div>
        <div class="right-info">
          <span class="type noPadding">{{showMessageProInfo|filterType}}{{showMessageProInfo.flower_id ? '/' + showMessageProInfo.flower_id : ''}}</span>
          <span class="code noPadding">{{showMessageProInfo.product_code}}</span>
          <span class="color">
            <span class="label">产品配色:</span>
            <span class="color-item"
              v-for="(item,key) in showMessageProInfo.color"
              :key="key">
              <span class="circle"
                :style="{'background':item.color_code}"></span>
              {{item.name}}
            </span>
          </span>
          <span>
            <span class="label">产品成分:</span>
            <template v-for="(item,key) in showMessageProInfo.materials">
              {{key !== 0 ? ',' : ''}}
              {{item.ingredient_value + '%' + item.ingredient_name}}
            </template>
          </span>
          <span>
            <span class="label">产品尺码:</span>
            <span class="item"
              v-for="(item,key) in showMessageProInfo.size"
              :key="key">
              <span class="title">{{item.measurement}}:</span>
              <span class="info">{{item.size_info}}</span>
            </span>
          </span>
          <span>
            <span class="label">创建年份:</span>
            {{showMessageProInfo.create_time ? showMessageProInfo.create_time.split('-')[0] + '年' : '暂无信息'}}
          </span>
          <span class="install-info noPadding"
            @click="saveImg(showMessageProInfo)">下载产品信息</span>
        </div>
        <span class="close el-icon-close"
          @click="showMessageBox = false"></span>
      </div>
      <div class="createInstall">
        <div class="imgBox">
          <img :src='activeImg'
            alt="">
        </div>
        <div class="footer">
          <div class="left">
            <div class="typeBox">{{showMessageProInfo|filterType}}{{(showMessageProInfo.flower_id ? '/' + showMessageProInfo.flower_id : '')}}</div>
            <div class="code">{{showMessageProInfo.product_code}}</div>
          </div>
          <div class="logoBox">
            <img :src="qrCodeUrl"
              alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas'
import { productList, companyInfoDetail, productMenuList, productTppeList, porductOne } from '@/assets/js/api.js'
const QRCode = require('qrcode')
export default {
  data () {
    return {
      svgImg: '',
      qrcodeImg: '',
      loading: true,
      showMessageBox: false,
      showMessageBoxLoading: false,
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
      qrLogoSize: 20,
      showMessageProInfo: {},
      activeImg: '',
      qrCodeUrl: ''
    }
  },
  methods: {
    // load (item, e) {
    //   let events = e || event
    //   let newImg = new Image()
    //   newImg.src = item.image[0]
    //   newImg.onload = function () {
    //     events.path[0].src = this.src
    //   }
    // },
    getBg (item) {
      return 'url("' + item + '")'
    },
    showImage (e) {
      console.log(e)
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
        'page': this.pages
      }).then((res) => {
        this.total = res.data.meta.total
        this.productList = res.data.data
        this.loading = false
      })
    },
    getProductDetail (id) {
      this.showMessageBox = true
      this.showMessageBoxLoading = true
      porductOne({
        id: id
      }).then(res => {
        this.showMessageProInfo = res.data.data
        this.showMessageBoxLoading = false
      })
    },
    saveImg (item) {
      // 获取弹窗当前展示的图片
      let active = document.getElementsByClassName('is-active img-inner')[0]
      if (active) {
        this.activeImg = active.children[0].children[0].src
      } else {
        this.activeImg = require('@/assets/image/index/noPic.jpg')
      }
      QRCode.toDataURL(window.location.origin + '/index/productDetail/' + 6, { errorCorrectionLevel: 'H' }, (err, url) => {
        console.log(err)
        this.qrCodeUrl = url
        setTimeout(() => {
          html2Canvas(document.getElementsByClassName('createInstall')[0], { useCORS: true, dpi: window.devicePixelRatio, scale: 2 }).then(function (res) {
            // document.body.appendChild(res)
            let a = document.createElement('a')
            a.href = res.toDataURL('image/png')
            a.download = new Date().getTime()
            a.click()
          })
        }, 2000)
      })
    }
  },
  created () {
    window.saveImg = this.saveImg
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
    this.urlVal = window.location.href
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
      }, 700)
    })
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.category_info) {
        return ''
      }
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + '/' + item.type_name
      } else {
        return item.category_info.product_category + '/' + item.type_name + '/' + item.style_name
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
  .el-carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-carousel__container {
      // height: 100%;
      flex: 1;
      z-index: 0;
    }
  }
  .left-img {
    .el-carousel__item {
      padding: 45px 34px 39px;
      box-sizing: border-box;
    }
    .el-carousel__arrow {
      font-size: 36px;
      color: rgba(0, 0, 0, 0.15);
      background: transparent;
      transform: scaleY(1.5) scaleX(0.8);
      &.el-carousel__arrow--left {
        left: 0;
      }
      &.el-carousel__arrow--right {
        right: 0;
      }
    }
  }
}
.canvasBox {
  display: inline-block;
  width: auto;
  height: auto;
}
.createInstall {
  width: 337px;
  height: 478px;
  background: #fff;
  border-radius: 4px;
  padding: 30px 34px 37px 34px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -100%;
  left: 50%;
  .imgBox {
    width: 100%;
    height: 324px;
    background: rgba(245, 245, 245, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .footer {
    flex: 1;
    display: flex;
    justify-content: space-between;
    // align-items: center;
  }
  .typeBox {
    margin-top: 24px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 1em;
  }
  .code {
    margin-top: 16px;
    color: rgba(26, 148, 255, 1);
    line-height: 1em;
  }
  .logoBox {
    width: 68px;
    height: 68px;
    margin-top: 24px;
    img {
      width: inherit;
      height: inherit;
    }
  }
}
</style>
