<template>
  <div id="productDesignTable"
       v-loading="loading">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>桐庐凯瑞针纺有限公司{{type === '0' ? '原' : '辅'}}料计划单</h2>
        </div>
        <div class="info">
          <span>订单编号：<em class="bold12">{{order.order_code}}</em></span>
          <span>创建日期：{{order.order_time}}</span>
        </div>
      </li>
      <li class="information">
        <span>产品类别</span>
        <span>{{product_calss}}</span>
        <span>产品创建日期</span>
        <span>{{create_time}}</span>
      </li>
      <li class="information">
        <span>订单公司</span>
        <span>{{order.client_name}}</span>
        <span>损耗比例</span>
        <span>8%</span>
      </li>
      <li class="size-info">
        <div class="title"><span>产品详情</span></div>
        <div class="content">
          <div v-for="(item,key,n) in sizeInfo"
               :key="key">
            {{key}}
            <span v-for="(value,index) in item"
                  :key="index">{{value.size_name + ':' + value.size_value + 'cm'}}</span>
            <span>克重:{{weight_group[n] + 'g'}}</span>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <div class="size-table"
             v-for="(item,key) in product[type === '0' ? 'main_material' : 'main_ingredients']"
             :key="key">
          <div class="title">
            <span class="bold12">{{item.size}}</span>
            <span class="center"
                  v-for="(value,index) in colorInfo[item.size]"
                  :key="index">
              <span>{{index}}</span>
              <span>{{value}}条</span>
            </span>
          </div>
          <div class="content">
            <div v-for="(value,index) in item.materialList"
                 :key="index"
                 :style="{flex:value.colorInfo[0].colorList.length ? value.colorInfo[0].colorList.length : 1}">
              <span class='tit'><span>{{value.material}}</span></span>
              <span v-for="(c,n) in value.colorInfo"
                    :key="n">
                <span v-for="(x,y) in setSizeInfo(c,item.size)"
                      :key="y">{{x.name + ' ' + x.number + x.unit}}</span>
              </span>
            </div>
          </div>
        </div>
      </li>
      <li class="beizhu">备注：</li>
    </ul>
  </div>
</template>

<script>
import { productPlanDetail, productionDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      type: '',
      len: {},
      sizeInfo: {},
      weight_group: [],
      loading: true,
      order: {
        order_code: '',
        client_name: '',
        remark: '',
        account_unit: '',
        contacts: '',
        exchange_rate: '',
        order_time: '',
        order_batch: [],
        product_stock: '',
        tax_rate: '',
        total_price: '',
        user_name: '',
        id: ''
      },
      product_calss: '',
      create_time: '',
      product: {},
      colorData: [],
      colorInfo: {}
    }
  },
  methods: {
    setSizeInfo (item, size) {
      // if (this.colorInfo.indexOf(item.name) === -1) {
      //   this.colorInfo.push(item.name)
      // }
      // this.colorInfo.push({
      //   name: item.name,
      //   value: item.sum
      // })
      console.log(size)
      if (this.colorInfo[size]) {
        this.$set(this.colorInfo[size], item.name, item.sum)
      } else {
        this.$set(this.colorInfo, size, { [item.name]: item.sum })
      }
      console.log(this.colorInfo)
      return item.colorList
    }
  },
  created () {
    Promise.all([
      productPlanDetail({
        product_key: this.$route.params.productId
      }), productionDetail({
        order_id: this.$route.params.orderId
      })
    ]).then((res) => {
      this.create_time = res[0].data.data.create_time
      this.sizeInfo = res[0].data.data.product_info.size
      this.weight_group = res[0].data.data.weight_group
      let obj = res[0].data.data.product_info
      this.product_calss = (obj.category_info.product_category ? obj.category_info.product_category + '/' : '') + (obj.type_name ? obj.type_name + '/' : '') + (obj.style_name ? obj.style_name + '/' : '') + (obj.flower_id ? obj.flower_id : '')
      this.order = res[1].data.data.production_detail.order_info
      // 第一步，把符合product_code的产品筛选出来
      let productByCode = []
      res[1].data.data.production_detail.product_info.forEach((item) => {
        if (item.product_code === this.$route.params.productId) {
          productByCode.push(item)
        }
      })
      // 第二步，根据Size进行分类
      let productBySize = []
      productByCode.forEach((item) => {
        if (productBySize.find((itemSize) => itemSize.size === item.size)) {
          let mark = -1
          productBySize.forEach((itemSize, index) => {
            if (itemSize.size === item.size) {
              mark = index
            }
          })
          productBySize[mark].product.push({
            color: item.color,
            number: item.production_num
          })
        } else {
          productBySize.push({
            size: item.size,
            product: [{
              color: item.color,
              number: item.production_num
            }]
          })
        }
      })
      // 第三步，先把原料分成主要原料和次要原料
      let productByMaterial = {
        main_ingredients: [], // 主要辅料
        main_material: [] // 主要原料
      }
      res[0].data.data.material_data.forEach((item) => {
        if (item.type === 0) {
          productByMaterial.main_material.push({
            material: item.material,
            colour: item.colour
          })
        } else {
          productByMaterial.main_ingredients.push({
            material: item.material,
            colour: item.colour
          })
        }
      })
      // 第四步，把根据size分类得到数据 合入 原料数据
      let product = {
        main_ingredients: [], // 主要辅料
        main_material: [] // 主要原料
      }
      // 创建一个数组，保存未填写的配色方案信息
      let NOTHISCOLOUR = []
      // 主要原料数据转化
      productBySize.forEach((itemSize) => {
        product.main_material.push({
          size: itemSize.size,
          materialList: productByMaterial.main_material.map((itemMaterial) => {
            return {
              material: itemMaterial.material,
              colorInfo: itemSize.product.map((itemColour) => {
                let obj = itemMaterial.colour.find((item) => item.name === itemColour.color)
                // 查询该配色方案是否被填写，如果未填写，记录一下
                if (!obj) {
                  // 查重
                  if (!(NOTHISCOLOUR.find((item) => item.size === itemSize.size) && NOTHISCOLOUR.find((item) => item.colour === itemColour.color))) {
                    NOTHISCOLOUR.push({
                      size: itemSize.size,
                      colour: itemColour.color
                    })
                  }
                }
                return {
                  sum: itemColour.number,
                  name: itemColour.color,
                  colorList: obj ? obj.color.map((itemColor) => {
                    return {
                      name: itemColor.name,
                      number: (itemColor.size.find((item) => item.size === itemSize.size).number * itemColour.number / 1000).toFixed(2),
                      unit: '千克',
                      value: itemColor.value
                    }
                  }) : []
                }
              })
            }
          })
        })
      })
      // 主要辅料数据转化
      productBySize.forEach((itemSize) => {
        product.main_ingredients.push({
          size: itemSize.size,
          materialList: productByMaterial.main_ingredients.map((itemMaterial) => {
            return {
              material: itemMaterial.material,
              colorInfo: itemSize.product.map((itemColour) => {
                let obj = itemMaterial.colour.find((item) => item.name === itemColour.color)
                // 查询该配色方案是否被填写，如果未填写，记录一下
                if (!obj) {
                  // 查重
                  if (!(NOTHISCOLOUR.find((item) => item.size === itemSize.size) && NOTHISCOLOUR.find((item) => item.colour === itemColour.color))) {
                    NOTHISCOLOUR.push({
                      size: itemSize.size,
                      colour: itemColour.color
                    })
                  }
                }
                return {
                  sum: itemColour.number,
                  name: itemColour.color,
                  colorList: obj ? obj.color.map((itemColor) => {
                    return {
                      name: itemColor.name,
                      number: itemColor.size.find((item) => item.size === itemSize.size).number * itemColour.number,
                      unit: itemColor.size.find((item) => item.size === itemSize.size).unit
                    }
                  }) : []
                }
              })
            }
          })
        })
      })
      console.log(product)
      if (NOTHISCOLOUR.length > 0) {
        let str = `系统监测到你有如下产品计划单配色方案还未完善：`
        NOTHISCOLOUR.forEach((item, index) => {
          if (index === 0) {
            str = str + item.size + ' , ' + item.colour
          } else {
            str = str + ' / ' + item.size + ' ' + item.colour
          }
        })
        str = str + '。请及时填写。'
        // this.$confirm(str, '提示', {
        //   confirmButtonText: '现在去填',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        // }).catch(() => {
        // })
      }
      this.product = product
      this.colorData = NOTHISCOLOUR
    })
    this.type = document.location.href.split('type=')[1]
  },
  updated () {
    this.loading = false
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productDesignTable.less";
</style>
