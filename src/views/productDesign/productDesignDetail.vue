<template>
  <div id="productDesignDetail"
    v-loading="loading">
    <div class="head">
      <h2>生产计划单详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <span class="stepTitle">订单信息</span>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
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
          <div class="inputCtn">
            <span class="label">发货信息：</span>
          </div>
        </div>
        <div class="lineCtn">
          <ul class="tablesCtn"
            style="width:830px;line-height:40px;">
            <li class="title">
              <span>发货日期</span>
              <span class="flex3">
                <span>产品品类</span>
                <span class="flex08">产品图片</span>
                <span class="flex12">
                  <span>尺码颜色</span>
                  <span>发货数量</span>
                </span>
              </span>
            </li>
            <li class="content"
              v-for="(item,key) in order.order_batch"
              :key="key">
              <span class="tableRow">
                <div class="twoLine">
                  <span>第{{key}}批</span>
                  <span>{{item[0].delivery_time}}</span>
                </div>
              </span>
              <span class="tableRow col flex3">
                <span class="tableColumn"
                  v-for="(value,index) in item"
                  :key="index">
                  <span class="tableRow">
                    <div class="twoLine">
                      <span>{{value.product_code}}</span>
                      <span>{{value.category_info.category_name + '/' + value.category_info.type_name + '/' + value.category_info.style_name + '/' + value.category_info.flower_name}}</span>
                    </div>
                  </span>
                  <span class="tableRow flex08">
                    <div class="imgCtn small">
                      <img class="img"
                        :src="value.category_info.images.length>0?value.category_info.images[0].thumb:require('@/assets/image/index/noPic.jpg')"
                        :onerror="defaultImg" />
                      <div class="toolTips"
                        v-if="value.category_info.images.length>0"><span @click="showImg(value.category_info.images)">点击查看大图</span></div>
                      <div class="toolTips"
                        v-if="value.category_info.images.length===0"><span>没有预览图</span></div>
                    </div>
                  </span>
                  <span class="tableRow col flex12">
                    <span class="tableColumn">
                      <span class="tableRow">{{value.size + '/' + value.color}}</span>
                      <span class="tableRow">{{value.numbers + value.category_info.unit}}</span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="stepCtn">
        <span class="stepTitle">生产数量计划</span>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="max-width:1200px">
          <div class="specialTable">
            <div class="left">
              <div class="firstLine">产品品类</div>
              <div class="mergeLine"
                v-for="(item,index) in product"
                :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}"
                :key="item.product_code">
                <span @click="$router.push('/index/productDetail/'+item.id)"
                  style="color:#1A95FF;cursor:pointer">{{item.product_code}}</span>
                <span @click="$router.push('/index/productDetail/'+item.id)"
                  style="color:#1A95FF;cursor:pointer">{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
              </div>
            </div>
            <div class="right">
              <div class="tableRow titleTableRow">
                <div class="tableColumn">尺寸/颜色</div>
                <div class="tableColumn ">下单数</div>
                <div class="tableColumn">库存数量</div>
                <div class="tableColumn">库存调取</div>
                <div class="tableColumn">工厂生产</div>
                <div class="tableColumn">总计</div>
                <div class="tableColumn">生产损耗</div>
              </div>
              <div class="tableRow bodyTableRow"
                v-for="(item) in productInfo"
                :key="item.id">
                <div class="tableColumn">{{item.size}}/{{item.color}}</div>
                <div class="tableColumn">{{item.order_num}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_number}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  {{item.stock_pick}}{{item.unit_name}}
                </div>
                <div class="tableColumn">
                  {{item.production_num}}{{item.unit_name}}
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick) + parseInt(item.production_num))?(parseInt(item.stock_pick) + parseInt(item.production_num)):'待计算'}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  {{item.production_sunhao}}%
                </div>
              </div>
            </div>
            <div class="left"
              style="border-left:1px solid #b5b5b5;width:120px">
              <div class="firstLine">操作</div>
              <div class="mergeLine"
                v-for="(item,index) in product"
                :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}"
                :key="item.product_code">
                <div class="btnCtns">
                  <span class="btns normal"
                    v-if="item.state===2"
                    @click="go(item.product_code)">查看计划单</span>
                  <span class="btns normal"
                    v-if="item.state===1"
                    @click="$router.push('/index/productPlanUpdate/'+item.product_code)">配料单(修改)</span>
                  <span class="btns normal"
                    v-if="item.state===0"
                    @click="$router.push('/index/productPlanCreate/'+item.product_id)">配料单(添加)</span>
                </div>
              </div>
            </div>
            <!-- <div class="left"
              style="border-left:1px solid #b5b5b5;width:120px">
              <div class="firstLine">操作</div>
              <div class="mergeLine"
                style="height:calc(100% - 61px)">
                <div class="btnCtns">
                  <span class="btns normal"
                    v-if="state"
                    @click="$router.push('/index/rawMaterialStat/'+$route.params.id)">查看统计单</span>
                  <span class="btns ban"
                    style="color:#b5b5b5!important;cursor:not-allowed;"
                    v-if="!state">查看统计单</span>
                </div>
              </div>
            </div> -->
          </div>
          <div class="rightTop btn"
            @click="go('totalPlan')">查看物料统计单</div>
        </div>
      </div>
      <div class="stepCtn">
        <span class="stepTitle">产品物料</span>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="max-width:1200px;display: flex;flex-direction: column">
          <div class="planTable"
            v-for="(item,key) in materials"
            :key="key"
            :id="item.product_code">
            <div class="planLeft">
              <span class="blue">
                <span>{{item.product_code}}</span>
                <span>{{item.type}}</span>
              </span>
              <span v-for="(value,index) in item.sizeColor"
                :key="index"
                :style="{'flex':retFlex(value,item)}">{{value.size + '/' + value.color}}</span>
            </div>
            <div class="planRight"
              :style="{'flex':4}">
              <span class="titles">
                <span v-for="(value,index) in item.material[item.nowType]"
                  :key="index">{{value}}</span>
                <template v-if="item.material[item.nowType].length < 4">
                  <span v-for="item in (4-item.material[item.nowType].length)"
                    :key="item + 'null'"></span>
                </template>
              </span>
              <span v-for="(value,index) in item.sizeColor"
                :key="index">
                <span v-for="(val,ind) in item.material[item.nowType]"
                  :key="ind"
                  class="planCol">
                  <span v-for="(valSize,indSize) in value.sizeColor[item.nowType][val]"
                    :key="indSize"
                    class="planRow">
                    <span>{{indSize}}</span>
                    <span>{{filterWeights(valSize,item.nowType)}}</span>
                  </span>
                </span>
                <template v-if="item.material[item.nowType].length < 4">
                  <span v-for="item in (4-item.material[item.nowType].length)"
                    :key="item + 'null'"
                    class="planCol"></span>
                </template>
              </span>
            </div>
            <div class="print rightTop btn"
              @click="openWin('/productStatisticsTable/' + $route.params.id + '?type=' + (totalPlanMaterial.nowType ==='main' ? 0 : 1) + '&proId=' + item.proId)">打印配色单</div>
            <div class="catBtn">
              <span :class="{'active': item.nowType === 'main'}"
                @click="item.nowType = 'main'">纱线原料</span>
              <span :class="{'active': item.nowType === 'other'}"
                @click="item.nowType = 'other'">装饰辅料</span>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn"
        id="totalPlan">
        <span class="stepTitle">订单物料统计</span>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn"
          style="max-width:1200px">
          <div class="totalTable">
            <div class="item"
              v-for="(item,key) in totalPlanMaterial[totalPlanMaterial.nowType]"
              :key="key">
              <span class="title">{{item.material}}</span>
              <span v-for="(value,index) in item.attrInfo"
                :key="index"
                class="info">
                <span>{{value.name}}</span>
                <span>{{filterWeights(value,totalPlanMaterial.nowType)}}</span>
              </span>
              <span class="info"
                v-for="itemNumber in MaxTotalMaterialAttr[totalPlanMaterial.nowType] - item.attrInfo.length"
                :key="itemNumber+'null'"></span>
              <span class="total">合计:{{filterTotal(item.attrInfo,totalPlanMaterial.nowType)}}</span>
            </div>
            <template v-if="totalPlanMaterial[totalPlanMaterial.nowType].length % 5 !== 0">
              <div class="item"
                v-for="item in 5-(totalPlanMaterial[totalPlanMaterial.nowType].length % 5)"
                :key="item+'null'">
                <span class="title"></span>
                <span class="info"
                  v-for="item in MaxTotalMaterialAttr[totalPlanMaterial.nowType]"
                  :key="item"></span>
                <span class="total"></span>
              </div>
            </template>
            <div class="print rightTop btn"
              @click="openWin('/productStatisticsTable/' + $route.params.id + '?type=' + (totalPlanMaterial.nowType ==='main' ? 0 : 1))">打印配色单</div>
            <div class="catBtn">
              <span :class="{'active': totalPlanMaterial.nowType === 'main'}"
                @click="totalPlanMaterial.nowType = 'main'">纱线原料</span>
              <span :class="{'active': totalPlanMaterial.nowType === 'other'}"
                @click="totalPlanMaterial.nowType = 'other'">装饰辅料</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.push('/index/productDesignUpdate/'+$route.params.id +'/'+$route.params.id)">修改</div>
      </div>
    </div>
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="closeBtn"
          @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside"
          height="550px"
          arrow="always">
          <el-carousel-item v-for="item in imgList"
            :key="item.image_url">
            <img :src="item.image_url"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { productionDetail, orderStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      showShade: false,
      imgList: [],
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
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
      productInfo: [],
      product: [],
      state: true,
      materials: [],
      totalPlanMaterial: {
        main: [],
        other: [],
        nowType: 'main'
      },
      MaxTotalMaterialAttr: {
        'main': 1,
        'other': 1
      }
    }
  },
  methods: {
    openWin (url) {
      window.open(url)
    },
    go (idName) {
      document.getElementById(idName).scrollIntoView(true)
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    retFlex (values, items) {
      let max = 1
      for (let prop in values.sizeColor[items.nowType]) {
        let arr = values.sizeColor[items.nowType][prop]
        if (Object.keys(arr).length >= max) {
          max = Object.keys(arr).length
        }
      }
      return max
    },
    filterWeights (item, type) {
      if (type === 'main') {
        if (item.unit === 'g' || item.unit === '克') {
          return (item.number / 1000).toFixed(1) + 'kg'
        } else if (item.unit === '千克') {
          return item.number.toFixed(1) + 'kg'
        } else {
          return item.number.toFixed(1) + item.unit
        }
      } else {
        if (item.unit === 'g' || item.unit === '克') {
          return parseInt(item.number / 1000) + 'kg'
        } else if (item.unit === '千克') {
          return parseInt(item.number) + 'kg'
        } else {
          return parseInt(item.number) + item.unit
        }
      }
    },
    filterTotal (items, type) {
      let total = 0
      items.forEach((item, key) => {
        total += Number((item.unit === '克' || item.unit === 'g') ? item.number / 1000 : item.number)
        if (key === items.length - 1) {
          console.log(total)
          total = type === 'main' ? total.toFixed(1) : Math.ceil(total)
          total += ((item.unit === '克' || item.unit === 'g' || item.unit === '千克') ? 'kg' : item.unit)
        }
      })
      return total
    }
  },
  mounted () {
    Promise.all([productionDetail({
      order_id: this.$route.params.id
    }), orderStockDetail({
      order_id: this.$route.params.id,
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      this.order = res[0].data.data.production_detail.order_info
      this.productInfo = res[0].data.data.production_detail.product_info
      let productPlan = res[0].data.data.product_plan
      // 订单更新后把订单数据更新到生产计划单里
      // for (let key in res[1].data.data.stock_data) {
      //   res[1].data.data.stock_data[key].forEach((item) => {
      //     let finded = this.productInfo.find((itemFind) => { return itemFind.product_code === key && itemFind.size === item.size && itemFind.color === item.color })
      //     if (finded) {
      //       finded.order_num = item.numbers
      //     } else {
      //       this.productInfo.push({
      //         category_name: item.category_name,
      //         color: item.color,
      //         size: item.size,
      //         production_num: 0,
      //         production_sunhao: 10,
      //         stock_number: 0,
      //         stock_pick: 0,
      //         stock_pick_change: 0,
      //         stock_pick_now: 0,
      //         stock_pick_real: 0,
      //         total_num: item.numbers,
      //         order_num: item.numbers,
      //         unit_name: item.unit_name,
      //         type_name: item.type_name,
      //         style_name: item.style_name,
      //         product_code: key
      //       })
      //     }
      //   })
      // }
      // 合并相同编号的产品数据
      console.log(JSON.parse(JSON.stringify(this.productInfo)))
      this.productInfo.forEach((item) => {
        let finded = this.product.find((itemFind, index) => itemFind.product_code === item.product_code)
        if (!finded) {
          let state = 0 // 0代表没有计划单,1代表不完整,2代表完整
          if (productPlan[item.product_code]) {
            productPlan[item.product_code].forEach((itemPlan) => {
              if (itemPlan.color_match_name === item.color && itemPlan.size === item.size) {
                state = 2
              } else {
                if (state !== 2) {
                  state = 1
                }
              }
            })
          } else {
            state = 0
          }
          this.product.push({
            product_code: item.product_code,
            product_id: item.product_id,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            num: 1,
            id: item.product_id,
            state: state
          })
        } else {
          this.product = this.product.map((itemPro) => {
            if (itemPro.product_code === finded.product_code) {
              let state = itemPro.state
              if (state === 2) {
                productPlan[item.product_code].forEach((itemPlan) => {
                  if (itemPlan.color_match_name === item.color && itemPlan.size === item.size) {
                    state = 3
                  } else {
                    if (state !== 3) {
                      state = 1
                    }
                  }
                })
              }
              if (state === 3) {
                state = 2
              }
              return {
                product_code: itemPro.product_code,
                category_name: itemPro.category_name,
                type_name: itemPro.type_name,
                style_name: itemPro.style_name,
                id: item.id,
                num: (itemPro.num + 1),
                state: state
              }
            } else {
              return itemPro
            }
          })
        }
      })
      // 将整理出来的数据统计一下是否全部有计划单
      this.product.forEach((item) => {
        if (item.state !== 2) {
          this.state = false
        }
      })
      // 统计产品计划物料
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
            nowType: 'main',
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
      this.materials = productionNumber
      // 统计订单总共物料
      this.materials.forEach(item => {
        item.sizeColor.forEach(value => {
          for (let type in value.sizeColor) {
            let val = value.sizeColor[type]
            for (let prop in val) {
              for (let color in val[prop]) {
                let flag = this.totalPlanMaterial[type].find(key => key.material === prop)
                if (!flag) {
                  this.totalPlanMaterial[type].push({
                    material: prop,
                    attrInfo: [{
                      name: color,
                      number: val[prop][color].number,
                      unit: val[prop][color].unit
                    }]
                  })
                } else {
                  let flag1 = flag.attrInfo.find(key => key.name === color)
                  if (!flag1) {
                    flag.attrInfo.push({
                      name: color,
                      number: val[prop][color].number,
                      unit: val[prop][color].unit
                    })
                  } else {
                    flag1.number = Number(flag1.number ? flag1.number : 0) + Number(val[prop][color].number)
                  }
                }
              }
            }
          }
        })
      })
      this.MaxTotalMaterialAttr.main = this.totalPlanMaterial.main.map(item => {
        return item.attrInfo.length
      }).sort((a, b) => {
        return b - a
      })[0]
      this.MaxTotalMaterialAttr.other = this.totalPlanMaterial.other.map(item => {
        return item.attrInfo.length
      }).sort((a, b) => {
        return b - a
      })[0]
      console.log(this.MaxTotalMaterialAttr)
      this.loading = false
    })
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + '/' + item.type_name
      } else {
        return item.category_info.product_category + '/' + item.type_name + '/' + item.style_name
      }
    },
    filterWeight (item) {
      if (item.unit === 'g' || item.unit === '克') {
        return (item.number / 1000) + 'kg'
      } else if (item.unit === '千克') {
        return item.number + 'kg'
      } else {
        return item.number + item.unit
      }
    },
    filterTotal (items) {
      let total = 0
      items.forEach((item, key) => {
        total += Number((item.unit === '克' || item.unit === 'g') ? item.number / 1000 : item.number)
        if (key === items.length - 1) {
          total += ((item.unit === '克' || item.unit === 'g' || item.unit === '千克') ? 'kg' : item.unit)
        }
      })
      return total
    }
  }
}
</script>

<style lang="less" scoped>
#productDesignDetail {
  .imgCtn {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      .toolTips {
        display: block;
      }
    }
    .img {
      width: 48px;
      padding: 6px;
      height: 48px;
      margin: auto;
    }
    .toolTips {
      display: none;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      line-height: 60px;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
      cursor: pointer;
      span {
        color: #fff;
        &:hover {
          color: #1a95ff;
        }
      }
    }
  }
}
@import "~@/assets/css/productDesignDetail.less";
</style>
