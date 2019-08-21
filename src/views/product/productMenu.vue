<template>
  <div id="productMenu">
    <div class="head">
      <div class="head-left">
        <div class="logoBox">
          logo
        </div>
        <div class="clientBox">
          <h1>桐庐凯瑞针纺有限公司</h1>
          <h3>公司简介</h3>
        </div>
      </div>
      <div class="head-right">
        <div class="btn delete"
          v-show="changeStatu && !addProductStatu">删除</div>
        <div class="btn"
          @click="edit"><span class="icon el-icon-edit"
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
                  <li><span class="label"><em class="icon el-icon-mobile-phone"></em>电话:</span><span class="data">18888888888</span></li>
                  <li><span class="label"><em class="icon el-icon-message"></em>邮箱:</span><span class="data">18888888888@163.com</span></li>
                  <li><span class="label"><em class="icon el-icon-location-outline"></em>地址:</span><span class="data">浙江省杭州市桐庐县富春江路376号</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="about-top"
          v-else>
          <el-upload drag
            class="uploadOne"
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
          <div class="about-box">
            <span class="title">公司简介:</span>
            <div class="box">
              <div class="info">
                <el-input type="textarea"
                  class="noBack"
                  :rows="5"
                  placeholder="请在此处输入您的公司简介~~~"
                  v-model="clientAboutVal">
                </el-input>
              </div>
              <div class="contact">
                <ul>
                  <li><span class="label"><em class="icon el-icon-mobile-phone"></em>电话:</span>
                    <el-input v-model="telVal"
                      class="inpCtn noBack"
                      placeholder="请输入您的电话号码"></el-input>
                  </li>
                  <li><span class="label"><em class="icon el-icon-message"></em>邮箱:</span>
                    <el-input v-model="emailVal"
                      class="inpCtn noBack"
                      placeholder="请输入您的联系方式"></el-input>
                  </li>
                  <li><span class="label"><em class="icon el-icon-location-outline"></em>地址:</span>
                    <el-input v-model="addressVal"
                      class="inpCtn noBack"
                      placeholder="请输入您的公司地址"></el-input>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="about-bottom">
          <div class="imgBox"
            v-if="!changeStatu">
            <img :src="require('@/assets/image/login/rotation1.jpg')"
              alt="">
            <img :src="require('@/assets/image/login/rotation2.jpg')"
              alt="">
            <img :src="require('@/assets/image/login/rotation3.jpg')"
              alt="">
            <img :src="require('@/assets/image/login/rotation4.png')"
              alt="">
          </div>
          <div class="imgBox"
            v-else>
            <el-upload drag
              class="uploadTwo"
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
            <el-upload drag
              class="uploadThree"
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
            <el-upload drag
              class="uploadFour"
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
            <el-upload drag
              class="uploadfive"
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
        </div>
      </div>
      <div class="production-box"
        v-if="!addProductStatu">
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
            @click="addProductStatu = true"
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
      <div class="production-box"
        v-else-if="addProductStatu && changeStatu">
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
          <el-select v-model="typeVal"
            class="serach"
            placeholder="筛选创建人">
            <el-option v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="typeVal"
            class="serach"
            placeholder="筛选花纹">
            <el-option v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="data"
            style="margin-left:10px;"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-input placeholder="输入产品编号精确搜索"
            class="serach"
            suffix-icon="el-icon-search"
            v-model="serachVal">
          </el-input>
        </div>
        <ul class="product-list">
          <li class="product-list-title">
            <span>产品编号</span>
            <span>产品类别</span>
            <span class="flexSmall">产品花纹</span>
            <span class="center">产品图片</span>
            <span class="flexSmall">创建人</span>
            <span class="flexSmall">创建日期</span>
            <span class="flexSmall center">操作</span>
          </li>
          <div class="item-box">
            <li class="product-list-item"
              v-for="(item,key) in productList"
              :key="key">
              <span>{{item.product_code}}</span>
              <span>{{item|filterType}}</span>
              <span class="flexSmall">{{item.flower_id}}</span>
              <span class="center">
                <div class="imgCtn">
                  <img class="img"
                    :src="item.img.length>0?item.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                    :onerror="defaultImg" />
                  <div class="toolTips"
                    v-if="item.img.length>0"><span @click="showImg(item.img)">点击查看大图</span></div>
                  <div class="toolTips"
                    v-if="item.img.length===0"><span>没有预览图</span></div>
                </div>
              </span>
              <span class="flexSmall">{{item.user_name}}</span>
              <span class="flexSmall">{{item.create_time}}</span>
              <span class="flexSmall center">
                <el-checkbox v-model="item.checkedStatu"
                  @change="checked(item)"></el-checkbox>
              </span>
            </li>
          </div>
          <div class="outBox">
            <span>已选:{{productList.filter(key=>key.checkedStatu).length}}/{{total}}</span>
            <span class="btn">添加</span>
            <span class="btn"
              @click="addProductStatu = false">返回</span>
          </div>
        </ul>
      </div>
    </div>
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="closeBtn"
          @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside"
          height="550px"
          arrow="always">
          <el-carousel-item v-for="item in imgList"
            :key="item.img_url">
            <img :src="item.img_url"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { productList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      typeVal: '',
      serachVal: '',
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      changeStatu: false,
      addProductStatu: false,
      imageUrl: '',
      clientAboutVal: '',
      telVal: '',
      emailVal: '',
      addressVal: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      data: '',
      pages: 1,
      total: '',
      productList: [],
      showShade: false,
      imgList: []
    }
  },
  methods: {
    edit () { // click edit event
      this.changeStatu = !this.changeStatu
      if (this.addProductStatu) {
        this.addProductStatu = false
      }
    },
    share () {
      // console.log(QRcode)
    },
    pickTime (date) {
      if (date) {
        this.start_time = date[0]
        this.end_time = date[1]
      } else {
        this.start_time = ''
        this.end_time = ''
      }
      this.pages = 1
      this.getList()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
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
    },
    checked (item) {
      console.log(this.productList.filter(key => key.checkedStatu))
    }
  },
  created () {
    this.getProductList()
    // Promise.all([

    // ]).then(res => {

    // })
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
  }
}
</script>
<style scoped lang="less">
@import "~@/assets/css/productMenu.less";
</style>
<style lang="less">
#productMenu {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100% !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .about-top {
    .el-upload-dragger {
      height: 310px !important;
    }
    .el-input__inner {
      height: 30px;
    }
  }
  .about-bottom {
    .uploadTwo,
    .uploadThree,
    .uploadFour,
    .uploadfive {
      width: 24%;
      .el-upload-dragger {
        height: 213px;
      }
    }
  }
}
</style>
