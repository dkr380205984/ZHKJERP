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
          <span class="content">{{product_info|filterType}} / {{product_info.flower_id}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品成分：</span>
          <span class="content">{{product_info.materials|filterMaterials}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品配色：</span>
          <span class="content">{{color}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品尺码：</span>
          <span class="content">{{size}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">库存总量：</span>
          <span class="content">{{total}}</span>
        </div>
      </div>
      <div class="tableCtn"
        style="min-height:0">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">时间</div>
          <div class="tableColumn">订单号</div>
          <div class="tableColumn">操作人</div>
          <div class="tableColumn">操作</div>
          <div class="tableColumn">存放数量</div>
          <div class="tableColumn">次品数量</div>
          <div class="tableColumn">备注信息</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item) in list"
          :key="item.id">
          <div class="tableColumn"
            style="color:#1A95FF">{{item.update_time}}</div>
          <div class="tableColumn">{{item.order_code}}</div>
          <div class="tableColumn">{{item.user_name}}</div>
          <div class="tableColumn">{{item.type===1?'入库':'出库'}}</div>
          <div class="tableColumn">{{item.stock_number}}</div>
          <div class="tableColumn">{{item.rejects_product|filterReject}}
            <!-- <span style="cursor:pointer;color:#1A95FF">(详情)</span> -->
          </div>
          <div class="tableColumn">{{item.remark?item.remark:'暂无信息'}}</div>
        </div>
      </div>
      <!-- <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn">修改</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { productStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      product_code: '',
      product_info: {
        category_info: {
          name: '',
          product_category: ''
        },
        style_name: '',
        type_name: '',
        materials: [],
        flower_id: ''
      },
      color: '',
      size: '',
      list: [],
      total: 0
    }
  },
  methods: {

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
    },
    filterReject (item) {
      console.log(item)
      if (!item) {
        return 0
      }
      let arr = JSON.parse(item)
      return (arr && arr.reduce((total, current) => {
        return Number(total) + Number(current.num)
      }, 0)) || '0'
    }
  },
  mounted () {
    productStockDetail({
      product_id: this.$route.params.productId,
      size: this.$route.params.size,
      color: this.$route.params.color
    }).then((res) => {
      console.log(res)
      let data = res.data.data
      this.product_info = data[0].product_info
      this.color = data[0].color
      this.size = data[0].size
      this.list = data
      this.total = this.list.reduce((total, current) => {
        return total + current.stock_number
      }, 0)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStockDetail.less";
</style>
