<template>
  <div></div>
</template>

<script>
import { orderDetailNew, productionDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      order_log: {},
      productRate: []
    }
  },
  mounted () {
    Promise.all([orderDetailNew({
      id: 20
    }), productionDetail({
      order_id: 20
    })]).then((res) => {
      console.log(res[0])
      this.order_log = res[0].data.data.order_log
      // 生产计划单产品详情
      const productPlan = res[1].data.data.production_detail.product_info
      // 合并下产品编号相同的产品
      const productPlanMerge = this.jsonMerge(productPlan, ['product_code'])
      console.log(productPlanMerge)
      productPlanMerge.forEach((itemProduct, indexPorduct) => {
        // 统计织造
        let weaveNum = 0 // 织造分配数量
        let weavePushNum = 0 // 织造入库数量
        this.order_log.product_weave.forEach((itemWeave, indexWeave) => {
          if (itemWeave.product_info.product_code === itemProduct.product_code) {
            weaveNum += itemWeave.number
          }
        })
        this.order_log.product_push.forEach((itemProPush, indexProPush) => {
          if (itemProPush.product_info.product_code === itemProduct.product_code && itemProPush.type === '织造') {
            weavePushNum += itemProPush.number
          }
        })
        // 统计半成品加工
        let semiNum = 0 // 半成品加工分配数量
        let semiPushNum = 0 // 半成品加工入库数量
        this.order_log.semi_finished_production.forEach((itemSemi, indexSemi) => {
          if (itemSemi.product_info.product_code === itemProduct.product_code) {
            semiNum += itemSemi.number
          }
        })
        this.order_log.product_push.forEach((itemProPush, indexProPush) => {
          if (itemProPush.product_info.product_code === itemProduct.product_code && itemProPush.type !== '织造') {
            semiPushNum += itemProPush.number
          }
        })
        // 统计检验
        let inspSemiNum = 0 // 半成品检验
        let inspProNum = 0 // 成品检验
        this.order_log.semi_product_inspection.forEach((itemInspSemi, indexInspSemi) => {
          if (itemInspSemi.product_code === itemProduct.product_code) {
            inspSemiNum += itemInspSemi.number
          }
        })
        this.order_log.product_inspection.forEach((itemInspPro, indexInspPro) => {
          if (itemInspPro.product_code === itemProduct.product_code) {
            inspProNum += itemInspPro.number
          }
        })
        // 装箱统计
        let packNum = 0
        let proOutNum = 0
        this.order_log.pack_info.forEach((itemPack, indexPack) => {
          JSON.parse(itemPack.product_info).forEach((itemNum, indexNum) => {
            if (itemNum.product_code === itemProduct.product_code) {
              packNum += itemNum.size_info.reduce((total, current) => {
                return total + Number(current.pack_number)
              }, 0)
            }
          })
        })
        // 出库数值统计不了,根据订单状态来确定
        if (res[0].data.data.order_info.status || res[0].data.data.order_info.status_stock_out) {
          proOutNum = itemProduct.info.reduce((total, current) => {
            return total + Number(current.production_num)
          }, 0)
        }
        this.productRate.push({
          product_code: itemProduct.product_code,
          production_num: itemProduct.info.reduce((total, current) => {
            return total + Number(current.production_num)
          }, 0),
          weaveInfo: {
            weaveNum: weaveNum,
            weavePushNum: weavePushNum
          },
          semiInfo: {
            semiNum: semiNum,
            semiPushNum: semiPushNum
          },
          inspInfo: {
            inspSemiNum: inspSemiNum,
            inspProNum: inspProNum
          },
          packInfo: {
            packNum: packNum,
            proOutNum: proOutNum
          }
        })
      })
      console.log(this.productRate)
    })
  },
  methods: {
    jsonMerge (jsonArr, keyArr) {
      let newJson = [] // 合并好的数据都放在这个数组里
      jsonArr.forEach((itemJson, indexJson) => {
        let mark = -1
        let finded = newJson.find((itemFind, indexFind) => {
          if (itemFind[keyArr[0]] === itemJson[keyArr[0]]) {
            mark = indexFind
            return itemFind[keyArr[0]] === itemJson[keyArr[0]]
          }
        })
        if (!finded) {
          let value = {}
          value[keyArr[0]] = itemJson[keyArr[0]]
          value['info'] = []
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          value['info'].push(info)
          newJson.push(value)
        } else {
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          newJson[mark]['info'].push(info)
        }
      })
      // 递归的条件是不断的缩减keyArr的length，每次都去除第零个，直到为0
      if (keyArr.length === 1) {
        return newJson
      } else {
        return newJson.map((itemInfo) => {
          let newKeyArr = []
          keyArr.forEach((item, index) => {
            if (index > 0) {
              newKeyArr.push(item)
            }
          })
          return {
            [keyArr[0]]: itemInfo[keyArr[0]],
            'info': this.jsonMerge(itemInfo['info'], newKeyArr)
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
