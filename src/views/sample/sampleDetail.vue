<template>
  <div id="sampleDetail"
    v-loading="loading">
    <div class="head">
      <h2>样品详情</h2>
    </div>
    <div class="body">
      <div class="transFromProBtn"
        @click="showMessageBox = true">添加到产品</div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">样品编号:</span>
          <span class="content blue">{{productDetail.product_code}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">样品名称:</span>
          <span class="content">{{productDetail.sample_title}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建日期:</span>
          <span class="content">{{productDetail.create_time}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <span class="content">{{productDetail.user_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">样品品类:</span>
          <span class="content">{{productDetail|filterType}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">样品花型:</span>
          <span class="content">{{productDetail.flower_id}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <!-- <div class="inputCtn">
          <span class="label">样品克重:</span>
          <span class="content">{{productDetail.weight}}克</span>
        </div> -->
        <div class="inputCtn">
          <span class="label">样品成分:</span>
          <span class="content">{{productDetail.materials|filterMaterials}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">样品规格:</span>
          <span class="content contentLine"
            v-for="(item,key) in productDetail.size"
            :key="key">
            <span class="size">{{item.measurement}}</span>
            <span class="sizeDetail">
              <span class="sizeOnce">{{item.size_info}}cm</span>
              <span class="sizeOnce">{{ '克重' + '：'+item.weight + 'g'}}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">样品配色:</span>
          <span class="content contentFlex"
            v-for="(item,index) in productDetail.color"
            :key="index">
            <span class="sort">{{index+1}}.</span>
            <!-- <div class="colorBg"
              :style="{'background':item.color_code}"></div> -->
            <span class="color">{{item.color_name}}</span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">样品描述:</span>
          <span class="content">{{productDetail.description ? productDetail.description : '暂无样品描述'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">样品图片:</span>
          <span class="content">
            <img v-if="productDetail.img.length === 0"
              class="img"
              src="@/assets/image/index/noPic.jpg" />
            <img v-for="(item,index) in productDetail.img"
              :key="index"
              class="img"
              :src="item.image_url"
              :onerror="defaultImg" />
          </span>
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
              <template v-if="productDetail.craft_info && productDetail.craft_info.length > 0">
                <li class="material_info"
                  v-for="(item,key) in productDetail.craft_info"
                  :key="key">
                  <span>{{item.user_name}}</span>
                  <span>工艺图</span>
                  <span>{{item.create_time}}</span>
                  <span style="color:#1A95FF;cursor:pointer"
                    @click="open('/index/designFormDetail/' + item.id)">查看详情</span>
                </li>
              </template>
              <li v-else>暂无相关工艺单</li>
              <span class="addNewBtn"
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
              <template v-if="productDetail.has_plan">
                <li class="material_info"
                  v-for="(item,key) in productDetail.product_plan_info"
                  :key="key">
                  <span class="col"
                    style="flex:3">
                    <span v-for="(itemMat,indexMat) in item.material_data"
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
                      @click="open('/index/productPlanDetail/' + item.id)">查看详情</span>
                  </span>
                </li>

              </template>
              <li v-else>暂无配料单</li>
              <span class="addNewBtn"
                @click="$router.push('/index/productPlanCreate/' + $route.params.id)">新增配料单</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn paddingTB">
          <span class="label">关联样单:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>样单编号</span>
                <span>订单公司</span>
                <span>打样数量</span>
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
                      @click="open('/index/sampleOrderDetail/' + item.order_id)">查看详情</span>
                  </span>
                </span>
              </li>
              <li v-else>暂无相关样品订单</li>
              <span class="addNewBtn"
                @click="$router.push('/index/sampleOrderCreate?' + $route.params.id)">新增样单</span>
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
                <span>样品报价</span>
                <span>查看信息</span>
              </li>
              <li class="material_info"
                v-show="priceList.length>0"
                v-for="(item,index) in priceList"
                :key="index">
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
      <div class="lineCtn"
        v-show="false">
        <div class="inputCtn">
          <span class="label">关联库存:</span>
          <div class="content"
            style="width:100%">
            <ul class="tablesCtn"
              style="width:100%;padding-left:0;box-sizing:border-box;margin:0">
              <li class="material_info">
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
                <span>待计算</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          v-if="productDetail.has_craft===0&&productDetail.in_order===0&&productDetail.has_plan===0"
          @click="$router.push('/index/productUpdate/'+productDetail.id + '?type=2')">修改</div>
        <el-tooltip v-if="productDetail.has_craft===1||productDetail.in_order===1||productDetail.has_plan===1"
          class="item"
          effect="dark"
          :content="toolTips(productDetail)"
          placement="top-start">
          <div class="okBtn"
            style="background:#E6A23C"
            @click="$router.push('/index/productUpdate/'+productDetail.id + '?type=2')">修改</div>
        </el-tooltip>
      </div>
    </div>
    <div class="message"
      v-if="showMessageBox">
      <div class="messageBox">
        <div class="title">新建产品</div>
        <div class="inputBox">

          <div class="item"
            style="margin-top:27px;">
            <span class="label">产品编号:</span>
            <div class="content blue">{{productDetail.product_code|filterCode}}</div>
          </div>
          <div class="item">
            <span class="label">样品编号:</span>
            <div class="content">
              <el-input v-model="productDetail.product_code"
                class="input_item"
                placeholder="样品编号"
                disabled></el-input>
            </div>
          </div>
          <div class="item">
            <span class="label">选择工艺:</span>
            <div class="content">
              <el-select v-model="isCraft"
                class="input_item"
                placeholder="请选择工艺版本">
                <el-option v-for="item in productDetail.craft_info"
                  :key="item.id"
                  :label="item.craft_code + '('+ item.create_time +')'"
                  :value="item.id">
                  <div style="width:100%;height:100%">
                    <span style="float: left">{{ item.craft_code }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.create_time }}</span>
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item"
            style="margin-bottom:27px;">
            <span class="label">选择配料:</span>
            <div class="content">
              <el-select v-model="isPlan"
                class="input_item"
                placeholder="请选择配料单版本">
                <el-option v-for="item in productDetail.product_plan_info"
                  :key="item.id"
                  :label="item.plan_code + '('+ item.create_time +')'"
                  :value="item.id">
                  <div style="width:100%;height:100%">
                    <span style="float: left">{{ item.plan_code }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.create_time }}</span>
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="showMessageBox">取消</span>
          <span class="ok"
            @click="pushProduct">确定</span>
        </div>
        <span class="close el-icon-close"
          @click="showMessageBox = false"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, priceListDetail, isCheckedPlanAndCraft } from '@/assets/js/api.js'
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
      showMessageBox: false,
      loading: true,
      isCraft: '',
      isPlan: '',
      lock: true,
      id: ''// 转成产品后的id
    }
  },
  filters: {
    // 拟定编号
    filterCode (item) {
      return item.split('Y').join('')
    },
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
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
    pushProduct () {
      // let data = {

      //   company_id: window.sessionStorage.getItem('company_id'),
      //   category_id: this.productDetail.category_id,
      //   type_id: this.productDetail.type_id,
      //   style_id: this.productDetail.style_id,
      //   type: 1,
      //   flower_id: this.productDetail.flower_id_new,
      //   description: this.productDetail.description,
      //   user_id: window.sessionStorage.getItem('user_id'),
      //   img: this.productDetail.img.map(item => {
      //     return item.image_url
      //   }),
      //   color: this.productDetail.color.map(item => {
      //     return item.color_name
      //   }),
      //   size: this.productDetail.size.map(key => {
      //     return {
      //       size_info: key.size_info,
      //       weight: key.weight,
      //       measurement: key.measurement
      //     }
      //   }),
      //   sample_title: this.productDetail.sampleName,
      //   materials: this.productDetail.materials.map(item => {
      //     return {
      //       ingredient_name: item.ingredient_name,
      //       ingredient_value: item.ingredient_value
      //     }
      //   })
      // }
      if (this.lock) {
        this.lock = false
        // saveProduct(data).then(res => {
        //   this.id = res.data.data.id
        //   if (res.data.status) {
        isCheckedPlanAndCraft({
          data: [{
            product_id: this.$route.params.id,
            craft_id: this.isCraft,
            plan_id: this.isPlan,
            product_code: this.productDetail.product_code
          }]
        }).then(res => {
          this.lock = true
          if (res.data.status) {
            this.$message.success('添加成功,即将跳转至产品详情页')
            setTimeout(() => {
              this.$router.push('/index/productDetail/' + this.$route.params.id)
            }, 800)
          } else {
            this.$message.error(res.data.message)
          }
        })
        // }
        // })
      } else {
        this.$message.warning('请勿频繁点击')
      }
    },
    open (url) {
      window.open(url)
    },
    // 判断提示信息
    toolTips (product) {
      if (product.has_craft === 1) {
        return '该样品已有工艺单信息'
      }
      if (product.has_plan === 1) {
        return '该样品已有配料单信息'
      }
      if (product.in_order === 1) {
        return '该样品已有订单信息'
      }
    }
  },
  mounted () {
    this.loading = true
    porductOne({
      id: this.$route.params.id
    }).then((res) => {
      if (res.data.status) {
        console.log(res.data.data)
        this.productDetail = res.data.data
        this.productDetail.size = this.productDetail.size
        // 计算配料单原料
        if (this.productDetail.has_plan === 1) {
          this.productDetail.product_plan_info.forEach(itemPlan => {
            itemPlan.material_data.forEach((itemMat) => {
              itemMat.colour.forEach((itemColour) => {
                itemColour.color.forEach((itemColor) => {
                  itemColor.total = itemColor.size.reduce((total, current) => {
                    return total + Number(current.number)
                  }, 0)
                })
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
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/sampleDetail.less";
</style>
<style lang="less">
#sampleDetail {
  .el-input,
  .el-input__inner {
    width: 100%;
  }
}
</style>
