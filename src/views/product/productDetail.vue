<template>
  <div id = "productDetail" v-loading="loading">
    <div class="head">
      <h2>产品详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content blue">{{productDetail.product_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建日期:</span>
          <span class="content gray">{{productDetail.create_time}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <span class="content gray">{{productDetail.user_id}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品品类:</span>
          <span class="content">{{productDetail|filterType}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">{{productDetail.flower_id}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品克重:</span>
          <span class="content">{{productDetail.weight}}克</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品成分:</span>
          <span class="content">{{productDetail.materials|filterMaterials}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品规格:</span>
          <span class="content contentLine" v-for="(item,key) in productDetail.size" :key="key">
            <span class="size">{{key}}</span>
            <span class="sizeDetail">
              <span class="sizeOnce" v-for="itemChild in item" :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + 'cm'}}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品颜色:</span>
          <span class="content contentFlex" v-for="(item,index) in productDetail.color" :key="index">
            <span class="sort">{{index+1}}.</span>
            <div class="colorBg" :style="{'background':item.color_code}"></div>
            <span class="color">{{item.name}}</span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品图片:</span>
          <span class="content">
            <img v-if="productDetail.img.length === 0" class="img" src="@/assets/image/index/noPic.jpg"/>
            <img v-for="(item,index) in productDetail.img" :key="index" class="img" :src="item.image_url" :onerror="defaultImg" />
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品描述:</span>
          <span class="content">{{productDetail.description}}</span>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      productDetail: {
        category_info: {
          product_category: '',
          name: ''
        },
        type_name: '',
        style_name: '',
        color: [],
        create_time: '',
        description: '',
        flower_id: '',
        img: [],
        materials: [],
        product_code: '',
        size: {},
        user_id: '',
        weight: ''
      },
      loading: true
    }
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
    },
    filterMaterials (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.ingredient_name + item.ingredient_value + '%' + ' / '
      })
      return str.substring(0, str.length - 2)
    }
  },
  created () {
    this.loading = true
    porductOne({
      id: this.$route.params.id
    }).then((res) => {
      if (res.data.status) {
        this.productDetail = res.data.data
        this.$nextTick(() => {
          this.loading = false
        })
      }
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productDetail.less';
</style>
