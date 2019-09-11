<template>
  <div id="rawMaterialPlan"
    v-loading="loading">
    <div class="head">
      <h2>生产计划详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">订单号：</span>
          <span class="content important">{{order.order_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">外贸公司：</span>
          <span class="content">{{order.client_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">联系人：</span>
          <span class="content">{{order.contacts}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人：</span>
          <span class="content">{{order.user_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">下单日期：</span>
          <span class="content">{{order.order_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">备注：</span>
          <span class="content">{{order.remark?order.remark:'暂无信息'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料计划：</span>
          <div class="content">
            <div class="btn">
              <span :class="{'active': sizeName.material === item.size }"
                v-for="(item,index) in product.main_material"
                :key="index"
                @click="changeSize(item.size,'material')">{{item.size}}</span>
            </div>
            <template v-for="(item,key) in product.main_material">
              <template v-if="item.size === sizeName.material">
                <yl-table :date='item'
                  :key="key" />
              </template>
            </template>
            <span @click="openWin('/productDesignTable/' + $route.params.orderId + '/' + $route.params.productId + '?type=0')"
              class="print">去打印</span>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">辅料计划：</span>
          <div class="content">
            <div class="btn">
              <span :class="{'active': sizeName.ingredients === item.size }"
                v-for="(item,index) in product.main_ingredients"
                :key="index"
                @click="changeSize(item.size,'ingredients')">{{item.size}}</span>
            </div>
            <template v-for="(item,key) in product.main_ingredients">
              <template v-if="item.size === sizeName.ingredients">
                <yl-table :date='item'
                  :key="key" />
              </template>
            </template>
            <span @click="openWin('/productDesignTable/' + $route.params.orderId + '/' + $route.params.productId + '?type=1')"
              class="print">去打印</span>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.push('/index/productDesignUpdate/'+$route.params.orderId)">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { productPlanDetail, productionDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      product: {},
      colorData: [],
      sizeName: {
        material: 'M',
        ingredients: 'S'
      },
      sizeTable: 1
    }
  },
  methods: {
    changeSize (item, name) {
      this.sizeName[name] = item
      this.sizeTable = item
    },
    openWin (url) {
      window.open(url)
    }
  },
  mounted () {
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
            production_sunhao: item.production_sunhao,
            color: item.color,
            number: (item.order_num - item.stock_pick) > 0 ? (item.order_num - item.stock_pick) : item.production_num
          })
        } else {
          productBySize.push({
            size: item.size,
            product: [{
              production_sunhao: item.production_sunhao,
              color: item.color,
              number: (item.order_num - item.stock_pick) > 0 ? (item.order_num - item.stock_pick) : item.production_num
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
                console.log(itemColour)
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
                  production_sunhao: itemColour.production_sunhao,
                  name: itemColour.color,
                  colorList: obj ? obj.color.map((itemColor) => {
                    return {
                      name: itemColor.name,
                      number: (itemColor.size.find((item) => item.size === itemSize.size).number * itemColour.number * (1 + itemColour.production_sunhao / 100) / 1000).toFixed(1),
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
                      number: parseInt(itemColor.size.find((item) => item.size === itemSize.size).number * itemColour.number * (1 + itemColour.production_sunhao / 100)),
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
      this.sizeName.material = product.main_material[0].size
      this.sizeName.ingredients = product.main_ingredients[0].size
      this.product = product
      this.colorData = NOTHISCOLOUR
      this.loading = false
      console.log(product)
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialPlan.less";
</style>
