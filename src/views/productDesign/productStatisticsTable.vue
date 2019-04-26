<template>
  <div id="productDesignTable">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>{{order.client_name}}{{type === '0' ? '原' : '辅'}}料统计单</h2>
        </div>
        <div class="info">
          <span>订单编号：<em class="bold12">{{order.order_code}}</em></span>
          <span>创建日期：{{create_time}}</span>
        </div>
      </li>
      <li class="information">
        <span>订单号</span>
        <span>{{$route.params.productId}}</span>
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
        <div class="title">产品详情</div>
        <div class="content">
          <div v-for="(item,key) in InfoList"
               :key="key">
            {{key}}
            <template v-for='value in item'>
              <span :key='value.name'>{{value.name}}</span>
              <span :key='value.value+value.unit'>{{value.value + value.unit}}</span>
            </template>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <ul class="size-table"
            v-for="(item,key) in list"
            :key="key">
          <li>
            <span>原料名称</span>
            <span>{{item.material}}</span>
            <span>合计</span>
            <span>{{item.total + 'kg'}}</span>
          </li>
          <li v-for="(value,index) in item.colors"
              :key="index">
            <span>颜色重量</span>
            <span>{{value.name + " "+value.value+value.unit}}</span>
          </li>
        </ul>
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
      InfoList: {
        '19ABC001': [
          {
            name: '围巾/针织/长巾/豹纹',
            value: 5000,
            unit: '条'
          }
        ],
        '19BBB002': [
          {
            name: '手套/针织/半指/卡通',
            value: 5000,
            unit: '个'
          }
        ],
        '19CCC003': [
          {
            name: '帽子/针织/吊球/卡通',
            value: 5000,
            unit: '顶'
          }
        ]
      },
      list: [
        {
          material: '52支上光晴纶',
          total: 562.8,
          colors: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            }
          ]
        }, {
          material: '36支上光晴纶',
          total: 562.8,
          colors: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            }
          ]
        }, {
          material: '48支上光晴纶',
          total: 562.8,
          colors: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            }
          ]
        }
      ],
      type: '',
      create_time: '',
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
      product: {},
      colorData: [],
      sizeTable: 1
    }
  },
  methods: {

  },
  created () {
    Promise.all([
      productPlanDetail({
        product_key: this.$route.params.productId
      }), productionDetail({
        order_id: this.$route.params.orderId
      })
    ]).then((res) => {
      console.log(res)
      this.order = res[1].data.data.production_detail.order_info
      // 第一步，把符合product_code的产品筛选出来
      let productByCode = []
      res[1].data.data.production_detail.product_info.forEach((item) => {
        if (item.product_code === this.$route.params.productId) {
          productByCode.push(item)
        }
      })
      // console.log(productByCode)
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
      // console.log(productBySize)
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
      // console.log(productByMaterial)
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
      this.loading = false
      this.create_time = res[0].data.data.create_time
      console.log(this.product)
      console.log(this.order)
    })
    this.type = document.location.href.split('type=')[1]
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStatisticsTable.less";
</style>
