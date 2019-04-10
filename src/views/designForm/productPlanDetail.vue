<template>
  <div id="productPlanDetail">
    <div class="head">
      <h2>产品计划单详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">工艺单编号:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content">KR19011101</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品名称:</span>
          <span class="content">围巾/针织/长巾</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">条纹</span>
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
                    :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + (itemChild.size_name == '克重' ? 'g' : 'cm')}}</span>
              <!-- <span class="sizeOnce">{{ item[0].weight + 'g' + '(克重)'}}</span> -->
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">损耗比例:</span>
          <span class="content">8%</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要原料:</span>
          <!-- <span class="content">8%</span> -->
          <div class="content">
            <yl-table />
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要辅料:</span>
          <span class="content">8%</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label change">外道加工流程:</span>
          <div class="content">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ylTable from '@/components/table/table.vue'
// import { porductOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      // defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      productDetail: {
        size: {
          S: [
            {
              size_name: '长',
              size_value: '20'
            },
            {
              size_name: '宽',
              size_value: '10'
            },
            {
              size_name: '克重',
              size_value: '100'
            }
          ],
          M: [
            {
              size_name: '长',
              size_value: '20'
            },
            {
              size_name: '宽',
              size_value: '10'
            },
            {
              size_name: '克重',
              size_value: '100'
            }
          ]
        }
        // {
        //   [], [], [],
        //   S: [{
        //     name: '52支单股上光晴纶',
        //     black: 460,
        //     while: 460,
        //     blue: 460,
        //     purple: 460,
        //     gray: 460,
        //     green: 460
        //   }, {
        //     name: '36支上光晴纶',
        //     black: 460,
        //     while: 460,
        //     blue: 460,
        //     purple: 460,
        //     gray: 460,
        //     green: 460
        //   }]

        // },
      }
      // loading: true
    }
  },
  components: {
    ylTable
  }
  // filters: {
  //   // 类型合并
  //   filterType (item) {
  //     if (!item.type_name) {
  //       return item.category_info.product_category
  //     } else if (!item.style_name) {
  //       return item.category_info.product_category + ' / ' + item.type_name
  //     } else {
  //       return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
  //     }
  //   },
  //   filterMaterials (arr) {
  //     let str = ''
  //     arr.forEach((item) => {
  //       str += item.ingredient_name + item.ingredient_value + '%' + ' / '
  //     })
  //     return str.substring(0, str.length - 2)
  //   }
  // },
  // created () {
  //   this.loading = true
  //   porductOne({
  //     id: this.$route.params.id
  //   }).then((res) => {
  //     if (res.data.status) {
  //       this.productDetail = res.data.data
  //       console.log(this.productDetail.size)
  //       this.$nextTick(() => {
  //         this.loading = false
  //       })
  //     }
  //   })
  // }
}
// import { productPlanDetail } from '@/assets/js/api.js'
// export default {
//   data () {
//     return {

//     }
//   },
//   methods: {

//   },
//   created () {
//     // productPlanDetail({
//     //   company_id: window.sessionStorage.getItem('company_id')
//     // }).then((res) => {
//     //   console.log(res)
//     // })
//   }
// }
</script>

<style scoped lang='less'>
@import "~@/assets/css/productPlanDetail.less";
</style>
