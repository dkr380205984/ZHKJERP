<template>
  <div id="productMenu">
    <div class="head">
      <div class="head-left">
        <div class="logoBox">
          logo
        </div>
        <div class="clientBox">
          <h2>桐庐凯瑞针纺有限公司</h2>
          <h4>公司简介</h4>
        </div>
      </div>
      <div class="head-right">
        <div class="btn delete"
          v-show="changeStatu">删除</div>
        <div class="btn"
          @click="changeStatu = !changeStatu"><span class="icon el-icon-edit"
            v-show="!changeStatu"></span>{{changeStatu ? '完成':'编辑'}}</div>
        <div class="btn"><span class="icon el-icon-share"></span>分享</div>
      </div>
    </div>
    <div class="body">
      <div class="about">
        <div class="about-top"
          v-if="!changeStatu">
          <!-- :style="{'background-image':'url(' + require('@/assets/image/login/rotation4.png') + ')'}" -->
          <img :src="require('@/assets/image/login/rotation4.png')"
            alt=""
            class="img">
          <div class="about-box">
            <span class="title">公司简介</span>
            <div class="box">
              <div class="info">
                <span class="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</span>
              </div>
              <div class="contact">
                <ul>
                  <li><span class="label"><em class="icon el-icon-mobile-phone"></em>电话:</span>18888888888</li>
                  <li><span class="label"><em class="icon el-icon-message"></em>邮箱:</span>18888888888@163.com</li>
                  <li><span class="label"><em class="icon el-icon-location-outline"></em>地址:</span>浙江省杭州市桐庐县富春江路376号</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="about-top"
          v-else>
          <el-upload drag
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl"
              :src="imageUrl"
              class="avatar">
            <template v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br />只能上传jpg/png文件，且不超过500kb</div>
            </template>
          </el-upload>
        </div>
        <div class="about-bottom">
          <div class="imgBox">
            <img :src="require('@/assets/image/login/rotation1.jpg')"
              alt="">
            <img :src="require('@/assets/image/login/rotation2.jpg')"
              alt="">
            <img :src="require('@/assets/image/login/rotation3.jpg')"
              alt="">
            <img :src="require('@/assets/image/login/rotation4.png')"
              alt="">
          </div>
        </div>
      </div>
      <div class="production-box">
        <div class="filterCtn">
          筛选条件:
          <el-select v-model="typeVal"
            class="serach"
            placeholder="筛选产品品类">
            <el-option v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="输入产品编号精确搜索"
            class="serach"
            suffix-icon="el-icon-search"
            v-model="serachVal">
          </el-input>
        </div>
        <div class="listCtn">
          <div class="productBox addNewPro"
            v-show="changeStatu">
            <span class="el-icon-plus"></span>
            <span>添加新产品</span>
          </div>
          <div class="productBox"
            v-for="item in 30"
            :key="item">
            <div class="box-top">
              <img :src="require('@/assets/image/login/rotation4.png')"
                alt="">
              <div class="info">
                <span>产品描述:</span>
                <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</span>
              </div>
            </div>
            <div class="box-bottom">
              <span>19AAA001</span>
              <span>围巾/针织/长巾/千鸟格</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      loading: true,
      typeVal: '',
      serachVal: '',
      changeStatu: true,
      imageUrl: ''
    }
  },
  methods: {
    share () {
      // console.log(QRcode)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>
<style scoped lang="less">
@import "~@/assets/css/productMenu.less";
</style>
<style lang="less">
.el-upload {
  width: 100%;
}
.el-upload-dragger {
  width: 100% !important;
  height: 310px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
