<template>
  <div id="productStockDetail">
    <div class="head">
      <h2>产品库存详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号：</span>
          <span class="content blue">{{product_info.product_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品类别：</span>
          <span class="content">{{product_info.product_class}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品成分：</span>
          <span class="content">{{product_info.product_item}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品规格：</span>
          <span class="content">
            <div v-for="(item,key) in product_info.product_size"
                 :key="key">

              <span v-for="(value,index) in item"
                    :key="index">
                <span v-if="index !== 'worn'">{{index === 'value' ? value + '条' : value}}</span>
                <span v-else>
                  次品：
                  （<template v-for="(content,number) in value">
                    {{number === 0 ? '' : "/"}}{{content.value+content.why}}
                  </template>）
                </span>
              </span>
            </div>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">成本价：</span>
          <span class="content">{{product_info.price + '元/条'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">总价：</span>
          <span class="content">{{0}}元(含次品)</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">总价：</span>
          <span class="content">{{0}}元(不含次品)</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">存放仓库：</span>
          <span class="content">{{product_info.wareHouse}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">存放时间：</span>
          <span class="content">{{product_info.store_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新时间：</span>
          <span class="content">{{product_info.updated_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人：</span>
          <span class="content">{{product_info.create_people}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">备注：</span>
          <span class="content">{{product_info.note}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="goBack"
                  @click="$router.go(-1)">返回</span>
            <span class="change"
                  @click="$router.push('/index/null')">修改</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { productStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      product_info: {
        product_code: 'ES5623134',
        product_class: '围巾/针织/长巾/条纹',
        product_item: '90%晴纶 / 10%涤纶',
        product_size: [
          {
            size: 'S',
            color: '黑白',
            value: 300,
            worn: [
              {
                value: 10,
                why: '破损'
              },
              {
                value: 50,
                why: '污渍'
              },
              {
                value: 40,
                why: '色差'
              }
            ]
          },
          {
            size: 'M',
            color: '黑白',
            value: 300,
            worn: [
              {
                value: 10,
                why: '破损'
              },
              {
                value: 50,
                why: '污渍'
              },
              {
                value: 40,
                why: '色差'
              }
            ]
          }
        ],
        price: 20,
        wareHouse: '桐庐凯瑞针纺有限公司',
        store_time: '3年',
        updated_time: '2019-03-30',
        create_people: '王锦鲤',
        note: '备注备注备注备注备注备注备注备注'
      }
    }
  },
  methods: {

  }
  // created () {
  //   productStockDetail({
  //     id: this.$route.params.id
  //   }).then((res) => {
  //     console.log(res)
  //   })
  // }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStockDetail.less";
</style>
