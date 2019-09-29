<template>
  <div id="productDesignCreate"
    v-loading="loading">
    <div class="head">
      <h2>修改生产计划单
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
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
            <span class="contents important">{{order.order_code}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">外贸公司：</span>
            <span class="contents">{{order.client_name}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">联系人：</span>
            <span class="contents">{{order.contacts}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">创建人：</span>
            <span class="contents">{{order.user_name}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">下单日期：</span>
            <span class="contents">{{order.order_time}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">备注：</span>
            <span class="contents">{{order.remark?order.remark:'暂无信息'}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
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
                      <span>{{value.category_info.category_name + '/' + value.category_info.type_name + '/' + value.category_info.style_name}}</span>
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
          style="max-width:1200px;position: relative;">
          <div class="specialTable">
            <div class="left"
              style="width:150px">
              <div class="firstLine"
                style="font-size:14px;">产品品类</div>
              <div class="mergeLine"
                v-for="(item,index) in product"
                :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}"
                :key="item.product_code">
                <span>{{item.product_code}}</span>
                <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
              </div>
            </div>
            <div class="right">
              <div class="tableRow titleTableRow">
                <div class="tableColumn"
                  style="font-size:14px;">尺寸/颜色</div>
                <div class="tableColumn"
                  style="font-size:14px;">下单数</div>
                <div class="tableColumn"
                  style="font-size:14px;">库存数量</div>
                <div class="tableColumn"
                  style="font-size:14px;">原库存调取</div>
                <div class="tableColumn"
                  style="font-size:14px;">现库存调取</div>
                <div class="tableColumn"
                  style="font-size:14px;">库存变动</div>
                <div class="tableColumn"
                  style="font-size:14px;">工厂生产</div>
                <div class="tableColumn"
                  style="font-size:14px;">总计</div>
                <div class="tableColumn"
                  style="font-size:14px;">生产损耗(%)</div>
              </div>
              <div class="tableRow bodyTableRow"
                v-for="(item) in productInfo"
                :key="item.id">
                <div class="tableColumn">{{item.size}}/{{item.color}}</div>
                <div class="tableColumn">{{item.order_num}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_number}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_pick}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.stock_pick_now" />
                </div>
                <div class="tableColumn">{{item|stockFilter}}</div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.production_num" />
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick_now) + parseInt(item.production_num))?(parseInt(item.stock_pick_now) + parseInt(item.production_num)):'待计算'}}</div>
                <div class="tableColumn"><input class="inputs"
                    placeholder="损耗比"
                    v-model="item.production_sunhao" /></div>
              </div>
            </div>
          </div>
          <div class="preview">
            <div class="previewBtn"
              @click="computedMaterial(0)">预览原料数量</div>
            <div class="previewBtn"
              style="margin-left: 8px;"
              @click="computedMaterial(1)">预览辅料数量</div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">修改</div>
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
    <div class="shade"
      v-show="showPreview">
      <div class="showPreview">
        <div class="top">物料数量预览</div>
        <div class="showBox">
          <div class="proTable"
            v-for="(item,key) in material_plan"
            :key="key">
            <div class="titles">
              <span class="blue">
                <span>{{item.product_code}}</span>
                <span>{{item.type}}</span>
              </span>
              <span v-for="(value,index) in item.material"
                :key="index">{{value}}</span>
              <template v-if="item.material.length < 3">
                <span v-for="zz in (3 - item.material.length)"
                  :key="zz"></span>
              </template>
            </div>
            <div class="contents"
              v-for="(value,index) in item.sizeColor"
              :key="index">
              <span>{{value.name}}</span>
              <span class="col"
                v-for="(val,ind) in item.material"
                :key="ind">
                <span v-for="(valColor,indColor) in value.sizeColorInfo[val]"
                  :key="indColor">
                  <span>{{indColor}}</span>
                  <span>{{valColor|filterFixed}}</span>
                </span>
              </span>
              <template v-if="item.material.length < 3">
                <span v-for="zz in (3 - item.material.length)"
                  :key="zz"></span>
              </template>
            </div>
          </div>
        </div>
        <div class="colse el-icon-close"
          @click="showPreview = false"></div>
      </div>
    </div>
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>

<script>
import { productionDetail, productionSave, orderStockDetail, productPlanDetail, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'productDesignUpdate',
      showMsg: false,
      msgFlag: window.localStorage.getItem('productDesignUpdate') ? JSON.parse(window.localStorage.getItem('productDesignUpdate')).msgFlag : false,
      msgUrl: '',
      content: '',
      lock: false,
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
      product_plan: {},
      showPreview: false,
      material_plan: [],
      noPlan: false
    }
  },
  methods: {
    afterSave (data) {
      this.msgFlag = data.msgFlag
    },
    sendMsg () {
      let data = JSON.parse(window.localStorage.getItem(this.localName))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: this.content,
        router_url: this.msgUrl,
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          this.$message.success('修改成功')
          this.$router.push(this.msgUrl)
        }
      })
    },
    clearAll () {

    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    saveAll () {
      if (!this.lock) {
        let stockState = true
        let numberState = true
        this.productInfo.forEach((item) => {
          if ((parseInt(item.stock_pick_now) - parseInt(item.stock_pick)) > parseInt(item.stock_number)) {
            stockState = false
          }
          if (!item.production_num) {
            numberState = false
          }
        })
        if (!stockState) {
          this.$message.error({
            message: '检测到库存调取数量大于库存数量,请修改后提交'
          })
          return
        }
        if (!numberState) {
          this.$message.error({
            message: '检测到有未填写的工厂生产数量,请输入后提交'
          })
          return
        }
        let json = {
          id: this.$route.params.planId,
          is_update: true,
          company_id: window.sessionStorage.getItem('company_id'),
          order_id: this.$route.params.id,
          detail_info: this.productInfo.map((item) => {
            return {
              category_name: item.category_name,
              style_name: item.style_name,
              type_name: item.type_name,
              unit_name: item.unit_name,
              product_code: item.product_code,
              size: item.size,
              color: item.color,
              order_num: item.order_num,
              stock_pick: parseInt(item.stock_pick_now),
              stock_pick_change: parseInt(item.stock_pick_now) - parseInt(item.stock_pick),
              production_num: item.production_num,
              total_num: parseInt(item.stock_pick_now) + parseInt(item.production_num),
              production_sunhao: item.production_sunhao
            }
          })
        }
        this.loading = true
        this.lock = true
        productionSave(json).then((res) => {
          if (res.data.status) {
            if (this.msgFlag) {
              this.msgUrl = '/index/productDesignDetail/' + res.data.data.order_info.id
              this.content = '订单<span style="color:#1A95FF">' + res.data.data.order_info.order_code + '</span><span style="color:#1A95FF;margin-left:"5px>修改</span>了生产计划单'
              this.sendMsg()
            } else {
              this.$message.success('修改成功')
              this.$router.push('/index/productDesignDetail/' + res.data.data.order_info.id)
            }
          } else {
            this.$message.error({
              message: '库存变动,请刷新页面后重试'
            })
          }
          this.loading = false
          this.lock = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    },
    getProductPlanInfo (code) {
      productPlanDetail({
        product_key: code
      }).then(res => {
        if (res.data.code === 404) {
          this.noPlan = true
        } else {
          let data = res.data.data
          let arr = []
          data.material_data.forEach(item => {
            item.colour.forEach(value => {
              value.color.forEach(val => {
                val.size.forEach(size => {
                  arr.push({
                    size: size.size,
                    unit: size.unit,
                    number: size.number,
                    material_color: val.name,
                    material_color_code: val.value,
                    product_color: value.name,
                    material_name: item.material,
                    type: item.type
                  })
                })
              })
            })
          })
          this.product_plan[code] = arr
          console.log(this.product_plan)
        }
      })
    },
    computedMaterial (type) {
      if (this.noPlan) {
        this.$message.error('配料单信息缺失，无法预览')
        return
      }
      this.showPreview = true
      this.material_plan = []
      this.productInfo.forEach(item => {
        let filters = this.product_plan[item.product_code].filter(value => (value.size === item.size && value.product_color === item.color && value.type === type))
        // 获取所需材料的数据
        let material = []
        // 获取尺码颜色所需物料详情数据
        let sizeColorInfo = {}
        filters.forEach(value => {
          if (material.indexOf(value.material_name) === -1) {
            material.push(value.material_name)
          }
          if (!sizeColorInfo[value.material_name]) {
            sizeColorInfo[value.material_name] = {}
          }
          console.log(item)
          if (sizeColorInfo[value.material_name][value.material_color]) {
            sizeColorInfo[value.material_name][value.material_color].number += Number(((item.order_num ? item.order_num : 0) - (item.stock_pick ? item.stock_pick : 0)) * ((item.production_sunhao ? item.production_sunhao : 0) / 100 + 1) * value.number)
          } else {
            sizeColorInfo[value.material_name][value.material_color] = { number: ((item.order_num ? item.order_num : 0) - (item.stock_pick ? item.stock_pick : 0)) * ((item.production_sunhao ? item.production_sunhao : 0) / 100 + 1) * value.number, unit: value.unit }
          }
        })
        let pro = this.material_plan.find(key => (key.product_code === item.product_code))
        if (!pro) {
          this.material_plan.push({
            product_code: item.product_code,
            type: item.category_name + '/' + item.type_name + '/' + item.style_name,
            material: material,
            sizeColor: [{
              name: item.size + '/' + item.color,
              sizeColorInfo: sizeColorInfo
            }]
          })
        } else {
          material.forEach(key => {
            if (pro.material.indexOf(key) === -1) {
              pro.material.push(key)
            }
          })
          let sizeColor = pro.sizeColor.find(key => key.name === (item.size + '/' + item.color))
          if (!sizeColor) {
            pro.sizeColor.push({
              name: item.size + '/' + item.color,
              sizeColorInfo: sizeColorInfo
            })
          } else {
            for (let prop in sizeColorInfo) {
              if (!sizeColor.sizeColorInfo[prop]) {
                sizeColor.sizeColorInfo[prop] = sizeColorInfo[prop]
              } else {
                for (let index in sizeColorInfo[prop]) {
                  if (!sizeColor.sizeColorInfo[prop][index]) {
                    sizeColor.sizeColorInfo[prop][index] = sizeColorInfo[prop][index]
                  } else {
                    sizeColor.sizeColorInfo[prop][index].number = Number(sizeColor.sizeColorInfo[prop][index].number ? sizeColor.sizeColorInfo[prop][index].number : 0) + Number(sizeColorInfo[prop][index].number ? sizeColorInfo[prop][index].number : 0)
                  }
                }
              }
            }
          }
        }
      })
      console.log(this.material_plan)
    }
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
    stockFilter (item) {
      if (parseInt(item.stock_pick) >= parseInt(item.stock_pick_now)) {
        return '入库' + (item.stock_pick - item.stock_pick_now) + item.unit_name
      } else {
        return '出库' + (item.stock_pick_now - item.stock_pick) + item.unit_name
      }
    },
    filterFixed (item) {
      if (item) {
        return item.unit === 'g' || item.unit === '克' ? ((item.number / 1000).toFixed(1) + 'kg') : (item.unit === '千克' ? (Number(item.number).toFixed(1) + 'kg') : (Number(item.number).toFixed(1) + item.unit))
      } else {
        return 0
      }
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
      let productCodeArr = []
      for (let prop in this.order.order_batch) {
        let item = this.order.order_batch[prop]
        item.forEach(value => {
          if (productCodeArr.indexOf(value.product_code) === -1) {
            productCodeArr.push(value.product_code)
          }
        })
      }
      productCodeArr.forEach(code => {
        this.getProductPlanInfo(code)
      })
      this.productInfo = res[0].data.data.production_detail.product_info.map((item) => {
        item.stock_pick_now = item.stock_pick
        item.stock_pick_real = 0
        return item
      })
      // 订单更新后把订单数据更新到生产计划单里
      for (let key in res[1].data.data.stock_data) {
        res[1].data.data.stock_data[key].forEach((item) => {
          let finded = this.productInfo.find((itemFind) => { return itemFind.product_code === key && itemFind.size === item.size && itemFind.color === item.color })
          if (finded) {
            finded.order_num = item.numbers
          } else {
            this.productInfo.push({
              category_name: item.category_name,
              color: item.color,
              size: item.size,
              production_num: 0,
              production_sunhao: 10,
              stock_number: 0,
              stock_pick: 0,
              stock_pick_change: 0,
              stock_pick_now: 0,
              stock_pick_real: 0,
              total_num: item.numbers,
              order_num: item.numbers,
              unit_name: item.unit_name,
              type_name: item.type_name,
              style_name: item.style_name,
              product_code: key
            })
          }
        })
      }
      // 合并相同编号的产品数据
      this.productInfo.forEach((item) => {
        let finded = this.product.find((itemFind, index) => itemFind.product_code === item.product_code)
        if (!finded) {
          this.product.push({
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            num: 1
          })
        } else {
          this.product = this.product.map((item) => {
            if (item.product_code === finded.product_code) {
              return {
                product_code: item.product_code,
                category_name: item.category_name,
                type_name: item.type_name,
                style_name: item.style_name,
                num: (item.num + 1)
              }
            } else {
              return item
            }
          })
        }
      })
      console.log(res[1])
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
#productDesignCreate {
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
@import "~@/assets/css/productDesignCreate.less";
</style>
