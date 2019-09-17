<template>
  <div id="productDesignCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加生产计划单</h2>
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
                  <span>第{{item.batch_id}}批</span>
                  <span>{{item.delivery_time}}</span>
                </div>
              </span>
              <span class="tableRow col flex3">
                <span class="tableColumn"
                  v-for="(value,index) in item.batch_info"
                  :key="index">
                  <span class="tableRow">
                    <div class="twoLine">
                      <span>{{value.productCode}}</span>
                      <span>{{value.productInfo|filterType}}</span>
                    </div>
                  </span>
                  <span class="tableRow flex08">
                    <div class="imgCtn small">
                      <img class="img"
                        :src="value.productInfo.img.length>0?value.productInfo.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                        :onerror="defaultImg" />
                      <div class="toolTips"
                        v-if="value.productInfo.img.length>0"><span @click="showImg(value.productInfo.img)">点击查看大图</span></div>
                      <div class="toolTips"
                        v-if="value.productInfo.img.length===0"><span>没有预览图</span></div>
                    </div>
                  </span>
                  <span class="tableRow col flex12">
                    <span class="tableColumn"
                      v-for="(val,ind) in value.size"
                      :key="ind">
                      <span class="tableRow">{{val.name.join('/')}}</span>
                      <span class="tableRow">{{val.numbers + value.productInfo.category_info.name}}</span>
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
          style="position: relative;">
          <div class="specialTable">
            <div class="left"
              style="width:180px">
              <div class="firstLine">产品品类</div>
              <div style="color:#1a95ff;"
                class="mergeLine"
                v-for="(item,index) in product"
                :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}"
                :key="item.product_code">
                <span @click="$router.push('/index/productDetail/'+item.product_code)"
                  style="cursor:help">{{item.product_code}}</span>
                <span @click="$router.push('/index/productDetail/'+item.product_code)"
                  style="cursor:help">{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
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
                <div class="tableColumn"
                  style="flex:1.3">生产损耗(%)</div>
              </div>
              <div class="tableRow bodyTableRow"
                v-for="(item) in productInfo"
                :key="item.id">
                <div class="tableColumn">{{item.size}}/{{item.color}}</div>
                <div class="tableColumn">{{item.numbers}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_num}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.stock_pick"
                    v-if="item.stock_num" />
                  <template v-else>暂无库存</template>
                </div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.production_num" />
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick) + parseInt(item.production_num))?(parseInt(item.stock_pick) + parseInt(item.production_num)):'待计算'}}</div>
                <div class="tableColumn"
                  style="flex:1.3">
                  <input class="inputs"
                    placeholder="百分比"
                    v-model="item.production_sunhao" />
                </div>
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
          @click="saveAll">添加</div>
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
                  <span>{{valColor.number + valColor.unit}}</span>
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
  </div>
</template>

<script>
import { orderStockDetail, productionSave, productPlanDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
        let sunhaoState = true
        this.productInfo.forEach((item) => {
          if (item.stock_pick > item.stock_num) {
            stockState = false
          }
          if (!item.production_num) {
            numberState = false
          }
          if (!item.production_sunhao) {
            sunhaoState = false
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
        if (!sunhaoState) {
          this.$message.error({
            message: '检测到有未填写的损耗比,请输入后提交'
          })
          return
        }
        let json = {
          is_update: false,
          company_id: window.sessionStorage.getItem('company_id'),
          order_id: this.order.id,
          id: null,
          detail_info: this.productInfo.map((item) => {
            return {
              category_name: item.category_name,
              style_name: item.style_name,
              type_name: item.type_name,
              unit_name: item.unit_name,
              product_code: item.product_code,
              size: item.size,
              color: item.color,
              order_num: item.numbers,
              stock_pick_change: item.stock_pick,
              // stock_num: item.stock_num, //库存总量不存储,让后台自己算
              stock_pick: item.stock_pick,
              production_num: item.production_num,
              production_sunhao: item.production_sunhao,
              total_num: parseInt(item.stock_pick) + parseInt(item.production_num)
            }
          })
        }
        console.log(json)
        this.lock = true
        this.loading = true
        productionSave(json).then((res) => {
          console.log(res)
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.$router.push('/index/productDesignList')
          } else {
            this.$message.error({
              message: '库存变动,请刷新页面后重试'
            })
            this.lock = false
            this.loading = false
          }
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
          if (sizeColorInfo[value.material_name][value.material_color]) {
            sizeColorInfo[value.material_name][value.material_color].number += Number((item.production_num ? item.production_num : 0) * ((item.production_sunhao ? item.production_sunhao : 0) / 100 + 1) * value.number)
          } else {
            sizeColorInfo[value.material_name][value.material_color] = { number: (item.production_num ? item.production_num : 0) * ((item.production_sunhao ? item.production_sunhao : 0) / 100 + 1) * value.number, unit: value.unit }
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
    }
  },
  mounted () {
    orderStockDetail({
      order_id: this.$route.params.id,
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      console.log(res)
      this.order = res.data.data.order
      this.order.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          this.getProductPlanInfo(value.productInfo.product_code)
        })
      })
      let obj = res.data.data.stock_data
      Object.keys(obj).forEach((key) => {
        obj[key].forEach((item) => {
          this.productInfo.push({
            product_code: key,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            stock_num: item.stock_num,
            size: item.size,
            color: item.color,
            numbers: item.numbers,
            unit_name: item.unit_name,
            stock_pick: 0,
            production_num: '',
            production_sunhao: ''
          })
        })
      })
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
