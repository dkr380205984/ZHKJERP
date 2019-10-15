<template>
  <div id="productDesignTable"
    v-loading='loading'
    @click.right="goTop">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>{{company_name}}{{type === '0' ? '原' : '辅'}}料配色单</h2>
        </div>
        <div class="info">
          <span>订单编号：<em class="bold12">KR{{year + (type === '0' ? 'YL' : 'FL' ) + order.order_code}}</em></span>
          <span>创建日期：{{order.order_time}}</span>
        </div>
      </li>
      <li class="information">
        <span>订单号</span>
        <span>{{order.order_code}}</span>
        <span>下单日期</span>
        <span>{{order.order_time}}</span>
      </li>
      <li class="information">
        <span>订单公司</span>
        <span>{{order.client_name}}</span>
        <span>负责组</span>
        <span>{{order.group_name}}</span>
      </li>
      <li class="size-info">
        <div class="title"><span>产品详情</span></div>
        <div class="content">
          <div v-for="(item,key) in order.order_batch"
            :key="key">
            <div>
              <span>{{item.product_code}}</span>
              <span>{{item.type}}</span>
              <span>{{item.number}}条</span>
            </div>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <template v-for="(item,key) in materialInfo">
          <ul class="size-table"
            v-if='(item.type).toString()===type'
            :key="key">
            <li>
              <span>原料名称</span>
              <span>{{key}}</span>
              <span>合计</span>
              <span v-if="item.type===0">{{(item.total_number/1000).toFixed(1) + 'kg'}}</span>
              <span v-if="item.type===1">{{parseInt(item.total_number) + item.unit}}</span>
            </li>
            <template v-for="(value,index,ind) in pushChildren(item).children">
              <li :key="index">
                <span>{{item.type===1 ? '数量':'颜色重量' + (ind + 1)}}</span>
                <span v-if="item.type===0">
                  <span>{{index}}</span>
                  <span>{{(value/1000).toFixed(1) +  'kg'}}</span>
                </span>
                <span v-if="item.type===1">
                  <span>{{index}}</span>
                  <span>{{parseInt(value) + item.unit}}</span>
                </span>
              </li>
            </template>
          </ul>
        </template>
      </li>
      <li class="beizhu">备注：</li>
    </ul>
  </div>
</template>

<script>
import { productionStat, orderDetail, productionDetail, companyInfoDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order: {
        order_code: '',
        client_name: '',
        order_time: '',
        order_batch: [],
        group_name: ''
      },
      year: '',
      type: '',
      materialInfo: {},
      proId: '',
      productInfo: [],
      company_name: ''
    }
  },
  filters: {
    filterType (item) {
      return (item.category_info.product_category ? item.category_info.product_category + '/' : '') + (item.type_name ? item.type_name + '/' : '') + (item.style_name ? item.style_name + '/' : '') + (item.flower_id ? item.flower_id : '')
    },
    filterNumber (item) {
      let num = 0
      item.forEach((value, index) => {
        num += Number(value.numbers)
      })
      return num
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    },
    pushChildren (item) {
      for (let prop in item) {
        if (prop !== 'total_number' && prop !== 'type' && prop !== 'unit' && prop !== 'children') {
          if (!item.children) {
            item.children = {}
          }
          item.children[prop] = item[prop]
        }
      }
      return item
    }
  },
  created () {
    this.type = window.location.href.split('?')[1].split('&')[0].split('=')[1]
    this.proId = window.location.href.split('?')[1].split('&')[1] ? window.location.href.split('?')[1].split('&')[1].split('=')[1] : null
    if (this.proId) {
      Promise.all([
        orderDetail({
          id: this.$route.params.id
        }), productionDetail({
          order_id: this.$route.params.id
        })
      ]).then(res => {
        this.order.order_code = res[0].data.data.order_code
        this.order.client_name = res[0].data.data.client_name
        let arr = []
        for (let prop in res[0].data.data.order_batch) {
          let item = res[0].data.data.order_batch[prop]
          item.forEach(valPro => {
            let types = valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + '/' + valPro.category_info.flower_name
            arr.push({
              type: types,
              product_code: valPro.product_code,
              product_id: valPro.product_id,
              number: valPro.numbers
            })
          })
        }
        arr.forEach(item => {
          if (Number(item.product_id) === Number(this.proId)) {
            let flag = this.order.order_batch.find(val => val.product_code === item.product_code)
            if (!flag) {
              this.order.order_batch.push({
                type: item.type,
                product_code: item.product_code,
                number: item.number
              })
            } else {
              flag.number = Number(flag.number) + Number(item.number)
            }
          }
        })
        this.order.order_time = res[0].data.data.order_time
        this.order.group_name = res[0].data.data.group_name
        this.productInfo = res[1].data.data.production_detail.product_info
        let productPlan = res[1].data.data.product_plan
        // 统计该订单所有产品所需物料
        let productionNumber = []
        this.productInfo.forEach(item => {
          let flag = productionNumber.find(key => key.product_code === item.product_code)
          if (!flag) {
            productionNumber.push({
              product_code: item.product_code,
              type: item.category_name + '/' + item.type_name + '/' + item.style_name,
              proId: item.product_id,
              material: {
                main: [],
                other: []
              },
              sizeColor: [{
                size: item.size,
                color: item.color,
                order_num: item.order_num,
                stock_pick: item.stock_pick,
                production_num: item.production_num,
                productiong_sunhao: item.production_sunhao,
                unit_name: item.unit_name,
                sizeColor: {
                  main: {},
                  other: {}
                }
              }]
            })
          } else {
            let flag1 = flag.sizeColor.find(key => (key.size === item.size && key.color === item.color))
            if (!flag1) {
              flag.sizeColor.push({
                size: item.size,
                color: item.color,
                order_num: item.order_num,
                stock_pick: item.stock_pick,
                production_num: item.production_num,
                productiong_sunhao: item.production_sunhao,
                unit_name: item.unit_name,
                sizeColor: {
                  main: {},
                  other: {}
                }
              })
            } else {
              flag1.production_num = Number(flag1.production_num) + Number(item.production_num)
            }
          }
        })
        productionNumber.forEach(value => {
          value.sizeColor.forEach(val => {
            if (productPlan[value.product_code]) {
              let filtersArr = productPlan[value.product_code].filter(key => (key.size === val.size && key.color_match_name === val.color))
              filtersArr.forEach(valNum => {
                let material = null
                let sizeColorInfo = null
                if (valNum.type === 0) {
                  material = value.material.main
                  sizeColorInfo = val.sizeColor.main
                } else if (valNum.type === 1) {
                  material = value.material.other
                  sizeColorInfo = val.sizeColor.other
                }
                if (material.indexOf(valNum.material_name) === -1) {
                  material.push(valNum.material_name)
                }
                if (!sizeColorInfo[valNum.material_name]) {
                  sizeColorInfo[valNum.material_name] = {}
                }
                if (sizeColorInfo[valNum.material_name][valNum.color_name]) {
                  sizeColorInfo[valNum.material_name][valNum.color_name].number += Number(((val.order_num ? val.order_num : 0) - (val.stock_pick ? val.stock_pick : 0)) * ((val.productiong_sunhao ? val.productiong_sunhao : 0) / 100 + 1) * valNum.number)
                } else {
                  sizeColorInfo[valNum.material_name][valNum.color_name] = { number: ((val.order_num ? val.order_num : 0) - (val.stock_pick ? val.stock_pick : 0)) * ((val.productiong_sunhao ? val.productiong_sunhao : 0) / 100 + 1) * valNum.number, unit: valNum.unit }
                }
              })
            }
          })
        })
        let type = (this.type === '0' ? 'main' : 'other')
        productionNumber.find(item => Number(item.proId) === Number(this.proId)).sizeColor.forEach(valSizeColor => {
          for (let prop in valSizeColor.sizeColor[type]) {
            let valMat = valSizeColor.sizeColor[type][prop]
            for (let indColor in valMat) {
              let valColor = valMat[indColor]
              if (!this.materialInfo[prop]) {
                this.materialInfo[prop] = {}
                this.materialInfo[prop].type = Number(this.type)
                this.materialInfo[prop][indColor] = valColor.number
                this.materialInfo[prop].unit = valColor.unit
              } else if (!this.materialInfo[prop][indColor]) {
                this.materialInfo[prop].type = Number(this.type)
                this.materialInfo[prop][indColor] = valColor.number
                this.materialInfo[prop].unit = valColor.unit
              } else {
                this.materialInfo[prop][indColor] = Number(this.materialInfo[prop][indColor]) + Number(valColor.number)
              }
              this.materialInfo[prop].total_number = Number(this.materialInfo[prop].total_number ? this.materialInfo[prop].total_number : 0) + Number(valColor.number)
            }
          }
        })
      })
    } else {
      Promise.all([productionStat({
        order_id: this.$route.params.id
      }), orderDetail({
        id: this.$route.params.id
      })]).then((res) => {
        this.order.order_code = res[1].data.data.order_code
        this.order.client_name = res[1].data.data.client_name
        let arr = []
        for (let prop in res[1].data.data.order_batch) {
          let item = res[1].data.data.order_batch[prop]
          item.forEach(valPro => {
            let types = valPro.category_info.category_name + '/' + valPro.category_info.type_name + '/' + valPro.category_info.style_name + '/' + valPro.category_info.flower_name
            arr.push({
              type: types,
              product_code: valPro.product_code,
              number: valPro.numbers
            })
          })
        }
        arr.forEach(item => {
          let flag = this.order.order_batch.find(val => val.product_code === item.product_code)
          if (!flag) {
            this.order.order_batch.push({
              type: item.type,
              product_code: item.product_code,
              number: item.number
            })
          } else {
            flag.number = Number(flag.number) + Number(item.number)
          }
        })
        this.order.order_time = res[1].data.data.order_time
        this.order.group_name = res[1].data.data.group_name
        this.materialInfo = res[0].data.data
      })
    }
    companyInfoDetail({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.company_name = res.data.data.company_name
    })
    this.year = new Date().getFullYear().toString().split('20')[1]
  },
  updated () {
    this.loading = false
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStatisticsTable.less";
</style>
<style lang="less">
html,
body {
  overflow: visible !important;
}
</style>
