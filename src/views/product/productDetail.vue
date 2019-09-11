<template>
  <div id="productDetail"
    v-loading="loading">
    <div class="head">
      <h2>产品详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content blue">{{productDetail.product_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建日期:</span>
          <span class="content gray">{{productDetail.create_time}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <span class="content gray">{{productDetail.user_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品品类:</span>
          <span class="content">{{productDetail|filterType}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">{{productDetail.flower_id}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品克重:</span>
          <span class="content">{{productDetail.weight}}克</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品成分:</span>
          <span class="content">{{productDetail.materials|filterMaterials}}</span>
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
                :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + 'cm'}}</span>
              <span class="sizeOnce">{{ '克重' + '：'+item[0].weight + 'g'}}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品配色:</span>
          <span class="content contentFlex"
            v-for="(item,index) in productDetail.color"
            :key="index">
            <span class="sort">{{index+1}}.</span>
            <div class="colorBg"
              :style="{'background':item.color_code}"></div>
            <span class="color">{{item.name}}</span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品图片:</span>
          <span class="content">
            <img v-if="productDetail.img.length === 0"
              class="img"
              src="@/assets/image/index/noPic.jpg" />
            <img v-for="(item,index) in productDetail.img"
              :key="index"
              class="img"
              :src="item.img_url"
              :onerror="defaultImg" />
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品标签:</span>
          <span class="content row">
            <span class="printBtn"
              @click="showMessageBox = true">打印</span>
            <span class="printBtn hover">
              预览
              <div class="printInfo">
                <div class="items">
                  <span class="labels">编号:</span>
                  <div class="contents">{{productDetail.product_code}}</div>
                </div>
                <div class="items">
                  <span class="labels">品类:</span>
                  <div class="contents">{{productDetail|filterType}}{{productDetail.flower_id ? '/' + productDetail.flower_id : ''}}</div>
                </div>
                <div class="items">
                  <span class="labels">规格:</span>
                  <div class="contents col"
                    style="align-items:flex-start">
                    <span style="white-space:nowrap;">{{selectSize}}</span>
                    <span style="word-break: break-word;">({{productDetail.size[selectSize]|filterSize}})cm</span>
                  </div>
                </div>
                <div class="items">
                  <span class="labels">克重:</span>
                  <div class="contents">{{productDetail.size[selectSize] ?  productDetail.size[selectSize][0].weight : ''}}g</div>
                </div>
                <div class="items">
                  <span class="labels">颜色:</span>
                  <div class="contents">{{selectColor}}</div>
                </div>
                <div class="items">
                  <span class="labels">描述:</span>
                  <div class="contents">
                    <span>{{productDetail.description ? productDetail.description : '暂无'}}</span>
                  </div>
                </div>
                <div class="items"
                  style="margin-top:30px;">
                  <div class="contents col">
                    <img :src="qrCodeUrl"
                      class="qrCode"
                      alt="">
                    <span class="littleBlack">扫码查看更多</span>
                  </div>
                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品描述:</span>
          <span class="content">{{productDetail.description ? productDetail.description : '暂无产品描述'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn paddingTB">
          <span class="label">关联工艺单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>工艺单编号</span>
                <span>图片</span>
                <span>创建时间</span>
                <span>查看信息</span>
              </li>
              <li class="material_info"
                v-if="productDetail.craft_info">
                <span>{{productDetail.craft_info.user_name}}</span>
                <span>工艺图</span>
                <span>{{productDetail.craft_info.create_time}}</span>
                <span style="color:#1A95FF;cursor:pointer"
                  @click="open('/index/designFormDetail/' + productDetail.craft_info.id)">查看详情</span>
              </li>
              <li v-else>暂无相关工艺单</li>
              <span class="addNewBtn"
                v-show="!productDetail.craft_info"
                @click="$router.push('/index/designFormCreate/' + $route.params.id)">新增工艺单</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn paddingTB">
          <span class="label">关联配料单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>物料名称</span>
                <span>颜色</span>
                <span>克重</span>
                <span>查看信息</span>
              </li>
              <li class="material_info"
                v-if="productDetail.has_plan">
                <span class="col"
                  style="flex:3">
                  <span v-for="(itemMat,indexMat) in productDetail.product_plan_info.material_data"
                    :key="indexMat">
                    <span>{{itemMat.material}}</span>
                    <span class="col"
                      style="flex:2">
                      <span v-for="(itemColour,indexColour) in itemMat.colour"
                        :key="indexColour">
                        <span class="col"
                          style="flex:1">
                          <span v-for="(itemColor,indexColor) in itemColour.color"
                            :key="indexColor">
                            <span>{{itemColor.name}}</span>
                            <span>{{itemColor.total}}{{itemColor.size[0].unit}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span style="flex:1">
                  <span style="color:#1A95FF;cursor:pointer"
                    @click="open('/index/productPlanDetail/' + productDetail.product_plan_info.id)">查看详情</span>
                </span>
              </li>
              <li v-else>暂无相关配料单</li>
              <span class="addNewBtn"
                v-show="!productDetail.has_plan"
                @click="$router.push('/index/productPlanCreate/' + $route.params.id)">新增配料单</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn paddingTB">
          <span class="label">关联订单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>订单编号</span>
                <span>订单公司</span>
                <span>下单数量</span>
                <span>查看信息</span>
              </li>
              <li class="material_info"
                v-if="productDetail.order_list.length>0">
                <span class="col">
                  <span v-for="(item,index) in productDetail.order_list"
                    :key="index">
                    <span>{{item.order_code}}</span>
                    <span>{{item.client_name}}</span>
                    <span>{{item.total_number}}{{productDetail.category_info.name}}</span>
                    <span style="color:#1A95FF;cursor:pointer"
                      @click="open('/index/orderDetailNew/' + item.id)">查看详情</span>
                  </span>
                </span>
              </li>
              <li v-else>暂无相关订单</li>
              <span class="addNewBtn"
                @click="$router.push('/index/orderCreate?' + $route.params.id)">新增订单</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn paddingTB">
          <span class="label">关联报价单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>报价单编号</span>
                <span>外贸公司</span>
                <span>产品报价</span>
                <span>查看信息</span>
              </li>
              <li class="material_info"
                v-for="(item,index) in priceList"
                :key="index"
                v-show="priceList.length>0">
                <span>{{item.quotation_code}}</span>
                <span>{{item.client_name}}</span>
                <span>总价:{{item.total_price}}{{item.account_unit}}</span>
                <span style="color:#1A95FF;cursor:pointer"
                  @click="open('/index/priceListDetail/' + item.id)">查看详情</span>
              </li>
              <li v-show="priceList.length === 0">暂无相关报价单</li>
              <span class="addNewBtn"
                @click="$router.push('/index/priceListCreate?' + $route.params.id)">新增报价单</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn paddingTB">
          <span class="label">关联库存:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>尺码/颜色</span>
                <span>库存数量</span>
                <span>查看信息</span>
              </li>
              <li class="material_info"
                v-if="false">
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
              </li>
              <li v-else>暂无库存信息</li>
              <span class="addNewBtn"
                v-if="!false">新增库存</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          v-if="productDetail.has_craft===0&&productDetail.in_order===0&&productDetail.has_plan===0"
          @click="$router.push('/index/productUpdate/'+productDetail.id)">修改</div>
        <el-tooltip v-if="productDetail.has_craft===1||productDetail.in_order===1||productDetail.has_plan===1"
          class="item"
          effect="dark"
          :content="toolTips(productDetail)"
          placement="top-start">
          <div class="okBtn"
            style="background:#E6A23C"
            @click="$router.push('/index/productUpdate/'+productDetail.id)">修改</div>
        </el-tooltip>
      </div>
    </div>
    <div class="message"
      v-if="showMessageBox">
      <div class="messageBox">
        <div class="title">打印标签</div>
        <div class="item"
          style="margin-top:27px;">
          <span class="label">产品编号:</span>
          <div class="content blue">{{productDetail.product_code}}</div>
        </div>
        <div class="item">
          <span class="label">产品规格:</span>
          <div class="content">
            <el-radio-group v-model="selectSize">
              <el-radio v-for="(item,key) in productDetail.size"
                :label="key"
                :key="key">{{key}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <span class="label">产品配色:</span>
          <div class="content">
            <el-radio-group v-model="selectColor">
              <el-radio v-for="(item,key) in productDetail.color"
                :key="key"
                :label="item.name">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="showMessageBox = false">取消</span>
          <span class="ok"
            @click="print(selectSize,selectColor)">去打印</span>
        </div>
        <span class="close el-icon-close"
          @click="showMessageBox = false"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, priceListDetail, productStockOne } from '@/assets/js/api.js'
const QRCode = require('qrcode')
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      priceList: [], // 报价单列表
      productDetail: {
        category_info: {
          product_category: '',
          name: ''
        },
        product_plan_info: {
          material_data: []
        },
        type_name: '',
        style_name: '',
        color: [],
        create_time: '',
        description: '',
        flower_id: '',
        img: [],
        materials: [],
        product_code: '',
        size: {},
        user_id: '',
        weight: '',
        has_craft: 0,
        has_plan: 0,
        in_order: 0,
        order_list: []

      },
      qrCodeUrl: '',
      showMessageBox: false,
      selectSize: '',
      selectColor: '',
      loading: true
    }
  },
  filters: {
    filterSize (sizeArr) {
      if (sizeArr) {
        return sizeArr.map(item => {
          return item.size_value
        }).join('*')
      } else {
        return ''
      }
      // return sizeArr[this.selectSize].map((item) => {
      //   return item.size_value + 'cm'
      // }).join('*')
    },
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
    filterMaterials (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.ingredient_name + item.ingredient_value + '%' + ' / '
      })
      return str.substring(0, str.length - 2)
    }
  },
  methods: {
    // 打印产品标签
    print (size, color) {
      window.open('/tagPrint/' + this.$route.params.id + '/' + size + '/' + color)
    },
    open (url) {
      window.open(url)
    },
    // 判断提示信息
    toolTips (product) {
      if (product.has_craft === 1) {
        return '该产品已有工艺单信息'
      }
      if (product.has_plan === 1) {
        return '该产品已有配料单信息'
      }
      if (product.in_order === 1) {
        return '该产品已有订单信息'
      }
    }
  },
  created () {
    this.loading = true
    porductOne({
      id: this.$route.params.id
    }).then((res) => {
      if (res.data.status) {
        console.log(res.data.data)
        this.productDetail = res.data.data
        this.selectSize = Object.keys(res.data.data.size)[0]
        this.selectColor = res.data.data.color[0].name
        // 计算配料单原料
        if (this.productDetail.has_plan === 1) {
          this.productDetail.product_plan_info.material_data.forEach((itemMat) => {
            itemMat.colour.forEach((itemColour) => {
              itemColour.color.forEach((itemColor) => {
                itemColor.total = itemColor.size.reduce((total, current) => {
                  return total + Number(current.number)
                }, 0)
              })
            })
          })
        }
        // 循环拿报价单
        if (res.data.data.quotation_id) {
          res.data.data.quotation_id.forEach((item) => {
            priceListDetail({
              id: item
            }).then((res) => {
              this.priceList.push(res.data.data)
            })
          })
        }
        this.loading = false
      }
    })
    // productStockOne({
    //   id: this.$route.params.id
    // }).then(res => {

    // })
  },
  mounted () {
    QRCode.toDataURL(window.location.href, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      this.qrCodeUrl = url
    })
  }
}
</script>

<style lang="less" scoped>
#productDetail {
  .row {
    display: flex;
    .printBtn {
      width: 52px;
      height: 26px;
      border: 1px solid rgba(26, 148, 255, 1);
      opacity: 1;
      border-radius: 4px;
      color: rgba(26, 148, 255, 1);
      text-align: center;
      line-height: 26px;
      cursor: pointer;
      margin-left: 10px;
      margin: 7px;
    }
  }
  .hover {
    &:hover {
      .printInfo {
        display: flex;
      }
    }
  }
  .printInfo {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(100%, -30%);
    width: 226px;
    height: 340px;
    background: #fff;
    z-index: 99;
    border-radius: 4px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px;
    box-sizing: border-box;
    color: #666;
    display: none;
    .items {
      width: 100%;
      margin-bottom: 16px;
      line-height: 1em;
      min-height: 0;
      display: flex;
      justify-content: flex-start;
      .labels {
        margin-right: 1em;
        position: static;
        width: auto;
        white-space: nowrap;
      }
      .contents {
        text-align: left;
        &.col {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .qrCode {
            width: 58px;
            height: 58px;
          }
          .littleBlack {
            margin-top: 8px;
            color: #c4c4c4;
          }
        }
      }
    }
  }
}
@import "~@/assets/css/productDetail.less";
</style>
