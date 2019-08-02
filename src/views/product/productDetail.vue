<template>
  <div id="productDetail"
    v-loading="loading">
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
          <span class="content gray">{{productDetail.user_name}}</span>
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
          <span class="content contentLine"
            v-for="(item,key) in productDetail.size"
            :key="key">
            <span class="size">{{key}}</span>
            <span class="sizeDetail">
              <span class="sizeOnce"
                v-for="itemChild in item"
                :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + 'cm'}}</span>
              <span class="sizeOnce">{{ '克重' + '：'+item[0].weight + 'g'}}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品配色:</span>
          <span class="content contentFlex"
            v-for="(item,index) in productDetail.color"
            :key="index">
            <span class="sort">{{index+1}}.</span>
            <div class="colorBg"
              :style="{'background':item.color_code}"></div>
            <span class="color">{{item.name}}</span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品图片:</span>
          <span class="content">
            <img v-if="productDetail.img.length === 0"
              class="img"
              src="@/assets/image/index/noPic.jpg" />
            <img v-for="(item,index) in productDetail.img"
              :key="index"
              class="img"
              :src="item.image_url"
              :onerror="defaultImg" />
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品描述:</span>
          <span class="content">{{productDetail.description}}</span>
        </div>
      </div>
      <div class="lineCtn"
        v-if="productDetail.craft_info">
        <div class="inputCtn">
          <span class="label">关联工艺单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>{{productDetail.craft_info.user_name}}</span>
                <span>工艺图</span>
                <span>{{productDetail.craft_info.create_time}}</span>
                <span style="color:#1A95FF">查看详情</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">关联配料单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span class="col"
                  style="flex:3">
                  <span v-for="(itemMat,indexMat) in productDetail.product_plan_info.material_data"
                    :key="indexMat">
                    <span>{{itemMat.material}}</span>
                    <span class="col"
                      style="flex:2">
                      <span v-for="(itemColour,indexColour) in itemMat.colour"
                        :key="indexColour">
                        <span class="col"
                          style="flex:1">
                          <span v-for="(itemColor,indexColor) in itemColour.color"
                            :key="indexColor">
                            <span>{{itemColor.name}}</span>
                            <span>{{itemColor.total}}{{itemColor.size[0].unit}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span style="flex:1">
                  <span style="color:#1A95FF">查看详情</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">关联订单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span class="col">
                  <span v-for="(item,index) in productDetail.order_list"
                    :key="index">
                    <span>{{item.order_code}}</span>
                    <span>{{item.client_name}}</span>
                    <span>{{item.total_number}}{{productDetail.category_info.name}}</span>
                    <span style="color:#1A95FF">查看详情</span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        v-show="false">
        <div class="inputCtn">
          <span class="label">关联报价单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        v-show="false">
        <div class="inputCtn">
          <span class="label">关联库存:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          v-if="productDetail.has_craft===0&&productDetail.in_order===0&&productDetail.has_plan===0"
          @click="$router.push('/index/productUpdate/'+productDetail.id)">修改</div>
        <el-tooltip v-if="productDetail.has_craft===1||productDetail.in_order===1||productDetail.has_plan===1"
          class="item"
          effect="dark"
          :content="toolTips(productDetail)"
          placement="top-start">
          <div class="okBtn"
            style="background:#E6A23C"
            @click="$router.push('/index/productUpdate/'+productDetail.id)">修改</div>
        </el-tooltip>
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
        product_plan_info: {
          material_data: []
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
        weight: '',
        has_craft: 0,
        has_plan: 0,
        in_order: 0
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
  methods: {
    // 判断提示信息
    toolTips (product) {
      if (product.has_craft === 1) {
        return '该产品已有工艺单信息'
      }
      if (product.has_plan === 1) {
        return '该产品已有配料单信息'
      }
      if (product.in_order === 1) {
        return '该产品已有订单信息'
      }
    }
  },
  mounted () {
    this.loading = true
    porductOne({
      id: this.$route.params.id
    }).then((res) => {
      if (res.data.status) {
        console.log(res.data.data)
        this.productDetail = res.data.data
        // 计算配料单原料
        if (this.productDetail.has_plan === 1) {
          this.productDetail.product_plan_info.material_data.forEach((itemMat) => {
            itemMat.colour.forEach((itemColour) => {
              itemColour.color.forEach((itemColor) => {
                itemColor.total = itemColor.size.reduce((total, current) => {
                  return total + Number(current.number)
                }, 0)
              })
            })
          })
        }
        this.loading = false
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productDetail.less";
</style>
