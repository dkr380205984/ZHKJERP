<template>
  <div id="priceListCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加产品报价单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">外贸公司：</span>
          <el-select class="elInput"
            v-model="company"
            @change="getContacts"
            placeholder="请选择外贸公司">
            <el-option v-for="item in companyArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label must">联系人：</span>
          <el-select class="elInput"
            v-model="contacts"
            placeholder="请选择联系人">
            <el-option v-for="item in contactsArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">结算单位：</span>
          <el-select class="elInput"
            v-model="money"
            placeholder="请选择结算单位">
            <el-option v-for="item in moneyArr"
              :key="item.name"
              :label="item.name"
              :value="item.name"
              style="display:flex;
              justify-content:space-between">
              <span style="">{{ item.name }}</span>
              <span style="color: #8492a6; font-size: 13px">{{item.short}}</span>
            </el-option>
          </el-select>
        </div>
        <div class="inputCtn">
          <span class="label must">汇率：</span>
          <el-input class="elInput"
            v-model="exchangeRate"
            placeholder="请输入汇率"
            @focus="showTips=true"
            @blur="showTips=false"></el-input>
          <div style="color:#b5b5b5!important"
            class="tips"
            @mousedown="goBaidu">如:结算单位美元,100美元=670人民币,填写数字670</div>
          <div style="top:63px"
            v-show="showTips"
            class="tips"
            @mousedown="goBaidu">点击查询实时汇率</div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">添加产品：</span>
          <div class="lineSearch"
            :class="{'show':showSeach}">
            <el-input class="elInput"
              placeholder="输产品编号按回车搜索"
              suffix-icon="el-icon-search"
              v-model="search"
              @keyup.enter.native="getSearch">
            </el-input>
            <span class="gjss"
              @click="showSeach=!showSeach">高级搜索
              <i class="el-icon"
                :class="{'el-icon-arrow-up':!showSeach,'el-icon-arrow-down':showSeach}"></i>
            </span>
            <div class="hideSearch">
              <div class="block">
                <div class="blockOnce">
                  <span class="name">产品类别：</span>
                  <el-cascader expand-trigger="hover"
                    class="elInput"
                    placeholder="请选择产品类别"
                    :options="typeArr"
                    v-model="type"
                    @change="getSearch"
                    clearable>
                  </el-cascader>
                </div>
                <div class="blockOnce">
                  <span class="name">创建日期：</span>
                  <el-date-picker @change="getSearch"
                    value-format="yyyy-MM-dd"
                    class="elInput"
                    v-model="dateSearch"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="block">
                <div class="blockOnce">
                  <span class="name">产品花型：</span>
                  <el-select class="elInput"
                    v-model="flower"
                    placeholder="请选择产品花型"
                    @change="getSearchList"
                    clearable>
                    <el-option @change="getSearch"
                      v-for="item in flowerArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="blockOnce">
                  <!-- <span class="name">创建人：</span>
                  <el-select class="elInput" v-model="people" placeholder="请选择联系人">
                    <el-option
                      @change="getSearchList"
                      v-for="item in peopleArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select> -->
                  <span class="name">配料单：</span>
                  <el-radio-group v-model="hasJHD"
                    @change="getSearch">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
          <div class="lineTitle">产品列表</div>
          <div class="lineTable">
            <div class="lineHead">
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
            </div>
            <div class="lineBody"
              ref="scrollBox">
              <div class="list"
                v-for="item in seachProduct"
                :key="item.id">
                <div class="flex"
                  style="color:#10AEF5;cursor:help"
                  @click="openUrl('/index/productDetail/'+item.product_code)">{{item.product_code}}</div>
                <div class="flex">{{item|filterType}}</div>
                <div class="flex">{{item.flower_id}}</div>
                <div class="flex">{{item.user_name}}</div>
                <div class="flex">{{item.create_time}}</div>
                <div class="flex">
                  <el-checkbox @change="getProduct($event,item.id)"></el-checkbox>
                </div>
              </div>
              <div class="list"
                v-if="nomore"
                style="text-align:center;display:block;color:rgb(181,181,181)">没有更多产品信息</div>
            </div>
          </div>
          <div class="lineTitle">已选产品</div>
          <div class="lineTable">
            <div class="lineHead">
              <div class="list">
                <div class="flex">产品编号</div>
                <div class="flex">产品类别</div>
                <div class="flex">产品花纹</div>
                <div class="flex">创建人</div>
                <div class="flex">创建日期</div>
                <div class="flex">操作</div>
              </div>
            </div>
            <div class="lineBody">
              <div class="list"
                v-for="item in productArr"
                :key="item.id">
                <div class="flex"
                  style="color:#10AEF5">{{item.product_code}}</div>
                <div class="flex">{{item|filterType}}</div>
                <div class="flex">{{item.flower_id}}</div>
                <div class="flex">{{item.user_name}}</div>
                <div class="flex">{{item.create_time}}</div>
                <div class="flex">
                  <span class="delete"
                    @click="deleteProduct(item.id)">删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn product oneLine">
          <span class="label must">尺码颜色：</span>
          <div class="twoCol"
            v-for="(itemPro,indexPro) in productArr"
            :key="indexPro">
            <div class="leftCol">
              <div class="box">{{itemPro.product_code}} ( {{itemPro.category_info.product_category}}/{{itemPro.type_name}}/{{itemPro.style_name}} )</div>
            </div>
            <div class="rightCol">
              <el-select class="elInput"
                v-model="itemPro.colorSize"
                multiple
                placeholder="请选择尺码颜色">
                <el-option v-for="item in itemPro.colorSizeArr"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="noInfo"
            v-show="productArr.length===0">产品待添加</div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品需求：</span>
          <el-input placeholder="请输入产品需求"
            v-model="product_need"
            style="width:668px"
            type="textarea"
            :rows="3"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">产品报价单：</span>
          <div style="width: 670px;">
            <!-- <div class="daoruBtn">导入报价单</div> -->
            <el-select style="margin-left: auto;display:block;margin-bottom: 15px;width:250px;"
              filterable
              remote
              reserve-keyword
              v-model="selectVal"
              :remote-method="remoteMethod"
              :loading="loadingS"
              clearable
              @change="getPriceList"
              placeholder="输入报价单编号导入报价单">
              <el-option v-for="item in priceListArr"
                :key="item.id"
                :label="item.quotation_code"
                :value="item.id">
                <span>{{item.quotation_code}}</span>
                <span style="margin:0 5px;color:#8492a6;font-size:13px"
                  v-for="itemPro in JSON.parse(item.product_info)"
                  :key="itemPro.product_code">({{itemPro.product_info.category_info.product_category +'/'+itemPro.product_info.type_name+'/'+itemPro.product_info.style_name}})</span>
              </el-option>
            </el-select>
          </div>
          <div class="specialTable">
            <div class="tbox">
              <div class="box1"
                style="text-align:center;">
                <span class="content"
                  style="font-size:20px;">报价表</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in yarnArr"
              :key="'yarnArr'+index">
              <div class="box1">
                <el-select style="width:100%"
                  v-model="item.key"
                  filterable
                  placeholder="请选择原料">
                  <el-option v-for="(item,index) in yarnList"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  :key="item.key+index"
                  :placeholder="item.number?'所需原料参考价：'+(item.number*item.minPrice/1000).toFixed(2)+'元 ~ '+(item.number*item.maxPrice/1000).toFixed(2)+'元':(item.minPrice&&item.maxPrice)?'原料参考价：'+item.minPrice+'元 ~ '+item.maxPrice+'元':'请输入金额'"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('yarnArr',index):adds('yarnArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in otherMaterialArr"
              :key="'otherMaterialArr'+index">
              <div class="box1">
                <el-select style="width:100%"
                  v-model="item.key"
                  filterable
                  placeholder="请选择辅料">
                  <el-option v-for="item in otherMaterialList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  :placeholder="item.number?'所需辅料参考价：'+item.number*item.minPrice+'元 ~ '+item.number*item.maxPrice+'元':(item.minPrice&&item.maxPrice)?'辅料参考价：'+item.minPrice+'元 ~ '+item.maxPrice+'元':'请输入金额'"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('otherMaterialArr',index):adds('otherMaterialArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in weaveArr"
              :key="'weaveArr'+index">
              <div class="box1">
                <el-select style="width:100%"
                  v-model="item.key"
                  filterable
                  placeholder="请选择织造明细">
                  <el-option v-for="item in weaveList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('weaveArr',index):adds('weaveArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in machiningArr"
              :key="'machiningArr'+index">
              <div class="box1">
                <el-select style="width:100%"
                  v-model="item.key"
                  filterable
                  placeholder="请选择半成品加工工序">
                  <el-option v-for="item in machiningList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('machiningArr',index):adds('machiningArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in packagMaterialArr"
              :key="'packagMaterialArr'+index">
              <div class="box1">
                <el-select style="width:100%"
                  v-model="item.key"
                  filterable
                  placeholder="请选择所需包装辅料">
                  <el-option v-for="item in packagMaterialList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('packagMaterialArr',index):adds('packagMaterialArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in manArr"
              :key="'manArr'+index">
              <div class="box1">
                <el-select style="width:100%"
                  v-model="item.key"
                  filterable
                  placeholder="请选择人工费用明细">
                  <el-option v-for="item in manList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('manArr',index):adds('manArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in otherArr"
              :key="'otherArr'+index">
              <div class="box1">
                <el-input v-model="item.key"
                  placeholder="请输入其他费用"></el-input>
              </div>
              <div class="box2">
                <el-input v-model="item.price"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
              <div class="box3">
                <span :class="index>0?'delete':'add'"
                  @click="index>0?deletes('otherArr',index):adds('otherArr')">{{index>0?'删除':'添加'}}</span>
              </div>
            </div>
            <div class="tbox">
            </div>
            <div class="tbox">
              <div class="box1">
                <span class="content">运输费用</span>
              </div>
              <div class="box2">
                <el-input v-model="yunshu"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
            </div>
            <div class="tbox">
              <div class="box1">
                <span class="content">基本利润</span>
              </div>
              <div class="box2">
                <el-input v-model="lirun"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
            </div>
            <div class="tbox">
              <div class="box1">
                <span class="content">基本佣金</span>
              </div>
              <div class="box2">
                <el-input v-model="yongjin"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
            </div>
            <div class="tbox">
              <div class="box1">
                <span class="content">财务税收</span>
              </div>
              <div class="box2">
                <el-input v-model="shuishou"
                  placeholder="请输入金额"></el-input>
                <em class="unit">元</em>
              </div>
            </div>
            <div class="tbox"
              style="height:auto">
              <div class="box1">
                <el-input v-model="desc"
                  type="textarea"
                  style="border:0;margin:15px 0;"
                  :rows="3"
                  placeholder="请输入备注信息"></el-input>
              </div>
            </div>
            <div class="tbox">
              <div class="box1">
                <span class="content">总计</span>
              </div>
              <div class="box2">
                <span class="content"
                  style="color:#666;font-weight:500;font-size:22px;">{{totalPrice}}</span>
                <em class="unit">元</em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
    <!-- 导入报价单暂时不做那么复杂 -->
    <div class="messageBox"
      style="z-index:99;"
      v-show="false">
      <div class="main">
        <div class="close">
          <span class="icon">x</span>
        </div>
        <div class="title">导入报价单</div>
        <div class="content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { machiningType, moneyArr } from '@/assets/js/dictionary.js'
import { clientList, productList, productTppeList, flowerList, getGroup, YarnList, materialList, packagMaterialList, priceListCreate, productPlanDetail, yarnDetail,
  materialDetail, priceListList, priceListDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      loadingS: false,
      selectVal: '',
      priceListArr: [],
      colorSize: [],
      showTips: false,
      page: 1,
      companyId: window.sessionStorage.getItem('company_id'),
      companyArr: [],
      company: '',
      contactsArr: [],
      contacts: '',
      moneyArr: moneyArr,
      money: '',
      exchangeRate: '',
      showSeach: false,
      typeArr: [],
      type: [],
      flowerArr: [],
      flower: '',
      peopleArr: [],
      people: '',
      hasJHD: null,
      date: '',
      search: '',
      dateSearch: '',
      seachProduct: [],
      timer: '', // 用于订单列表优化
      scrollTop: 0,
      nomore: false,
      product: [],
      productArr: [],
      yarnList: [],
      yarnArr: [{
        key: '',
        price: '',
        maxPrice: 0,
        minPrice: 0
      }],
      otherMaterialList: [],
      otherMaterialArr: [{
        key: '',
        price: '',
        maxPrice: 0,
        minPrice: 0
      }],
      weaveList: [{
        id: 1,
        name: '织造'
      }],
      weaveArr: [{
        key: '',
        price: ''
      }],
      machiningList: machiningType,
      machiningArr: [{
        key: '',
        price: ''
      }],
      packagMaterialList: [],
      packagMaterialArr: [{
        key: '',
        price: ''
      }],
      manList: [{
        id: 1,
        name: '管理费'
      }, {
        id: 2,
        name: '手工费'
      }],
      manArr: [{
        key: '',
        price: ''
      }],
      otherArr: [{
        key: '',
        price: ''
      }],
      yunshu: 0,
      lirun: 0,
      yongjin: 0,
      shuishou: 0,
      desc: '',
      product_need: ''
    }
  },
  methods: {
    // 查询汇率
    goBaidu () {
      window.open('http://forex.hexun.com/rmbhl/#zkRate')
    },
    // 打开新页面
    openUrl (url) {
      window.open(url)
    },
    // 根据选取的外贸公司获取联系人
    getContacts (id) {
      this.contactsArr = this.companyArr.find((item) => item.id === id).contacts
    },
    // 根据选中的产品信息，添加到产品列表里
    getProduct (ev, id) {
      if (ev) {
        if (!this.productArr.find((item, index) => item.id === id)) {
          this.productArr.push(this.seachProduct.find((item) => item.id === id))
          // 添加产品的时候获取配料单，关联上原料数据
          productPlanDetail({
            product_code: this.seachProduct.find((item) => item.id === id).product_code
          }).then((res) => {
            if (res.data.status) {
              res.data.data.material_data.forEach((item) => {
                const finded = this.yarnArr.find((itemFind) => itemFind.key === item.material)
                const finded2 = this.otherMaterialArr.find((itemFind) => itemFind.key === item.material)
                if (!finded && item.type === 0) {
                  let number = item.colour.reduce((totalColour, currentColour) => {
                    return totalColour + currentColour.color.reduce((totalColor, currentColor) => {
                      return totalColor + currentColor.size.reduce((totalSize, currentSize) => {
                        return totalSize + Number(currentSize.number)
                      }, 0)
                    }, 0)
                  }, 0)
                  if (this.yarnArr[0].key) {
                    this.yarnArr.push({
                      key: item.material,
                      price: '',
                      number: number,
                      maxPrice: 0,
                      minPrice: 0
                    })
                  } else {
                    this.yarnArr[0].key = item.material
                    this.yarnArr[0].number = number
                  }
                }
                if (!finded2 && item.type === 1) {
                  let number = item.colour.reduce((totalColour, currentColour) => {
                    return totalColour + currentColour.color.reduce((totalColor, currentColor) => {
                      return totalColor + currentColor.size.reduce((totalSize, currentSize) => {
                        return totalSize + Number(currentSize.number)
                      }, 0)
                    }, 0)
                  }, 0)
                  if (this.otherMaterialArr[0].key) {
                    this.otherMaterialArr.push({
                      key: item.material,
                      price: '',
                      number: number,
                      maxPrice: 0,
                      minPrice: 0
                    })
                  } else {
                    this.otherMaterialArr[0].key = item.material
                    this.otherMaterialArr[0].number = number
                  }
                }
              })
            }
          })
        }
      } else {
        let mark = -1
        this.productArr.forEach((item, index) => {
          if (item.id === id) {
            mark = index
          }
        })
        if (mark > -1) {
          this.productArr.splice(mark, 1)
        }
      }
      // 获取尺码颜色下拉框
      this.$nextTick(() => {
        this.productArr.forEach((product) => {
          let arr = []
          Object.keys(product.size).forEach((itemSize) => {
            product.color.forEach((itemColor) => {
              arr.push(itemSize + '/' + itemColor.name)
            })
          })
          product.colorSizeArr = arr
          product.colorSize = product.colorSize ? product.colorSize : []
        })
      })
    },
    // 使用删除操作删除产品列表里的信息
    deleteProduct (id) {
      let mark = -1
      this.productArr.forEach((item, index) => {
        if (item.id === id) {
          mark = index
        }
      })
      if (mark > -1) {
        this.productArr.splice(mark, 1)
      }
    },
    // 获取产品加入搜索条件后的列表
    getSearchList () {
      this.loading = true
      let date = new Date()
      let endTime = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      productList({
        company_id: this.companyId,
        limit: 5,
        page: this.page,
        category_id: this.type[0] || null,
        style_id: this.type[2] || null,
        type_id: this.type[1] || null,
        flower_id: this.flower || null,
        start_time: this.dateSearch || null,
        end_time: endTime,
        product_code: this.search || null,
        has_plan: this.hasJHD
      }).then((res) => {
        this.loading = false
        if (this.page === 1) {
          this.nomore = false
          this.seachProduct = res.data.data
        } else {
          this.seachProduct = this.seachProduct.concat(res.data.data)
          if (res.data.data.length < 5) {
            this.nomore = true
          }
        }
      })
    },
    // 如果是选筛选条件,需要page重置
    getSearch () {
      this.page = 1
      this.scrollTop = 0
      this.getSearchList()
    },
    // 报价单添加信息
    adds (key) {
      if (key === 'yarnArr' || key === 'otherMaterialArr') {
        this[key].push({
          key: '',
          price: '',
          minPrice: 0,
          maxPrice: 0
        })
      } else {
        this[key].push({
          key: '',
          price: ''
        })
      }
    },
    // 报价单信息删除
    deletes (key, index) {
      this[key].splice(index, 1)
    },
    // 触发下拉框搜索
    remoteMethod (query) {
      if (query !== '') {
        this.loadingS = true
        priceListList({
          company_id: window.sessionStorage.getItem('company_id'),
          limit: 20,
          page: 1,
          start_time: '',
          end_time: '',
          status: '',
          client_id: '',
          code: query
        }).then((res) => {
          console.log(res)
          this.priceListArr = res.data.data
          this.loadingS = false
        })
      } else {
        this.priceListArr = []
      }
    },
    // 导入报价单操作
    getPriceList (id) {
      if (id) {
        this.loading = true
        priceListDetail({
          id: id
        }).then((res) => {
          const detail = res.data.data
          this.company = detail.client_id.toString()
          this.contactsArr = this.companyArr.find((item) => parseInt(item.id) === detail.client_id).contacts
          this.contacts = detail.client_contact
          this.money = detail.account_unit
          this.exchangeRate = detail.exchange_rate
          this.yarnArr = JSON.parse(detail.material_info)
          this.otherMaterialArr = JSON.parse(detail.assist_info)
          this.weaveArr = JSON.parse(detail.weave_info)
          this.machiningArr = JSON.parse(detail.semi_product_info)
          this.packagMaterialArr = JSON.parse(detail.pack_material_info)
          this.packagMaterialArr = JSON.parse(detail.user_info)
          this.otherArr = JSON.parse(detail.desc_info)
          this.desc = detail.desc
          this.product_need = detail.product_need
          this.productArr = JSON.parse(detail.product_info)
          this.productArr.forEach((item) => {
            for (let key in item.product_info) {
              if (!item.hasOwnProperty[key]) {
                item[key] = item.product_info[key]
              }
            }
          })
          this.yunshu = detail.transport_cost
          this.lirun = detail.profit
          this.yongjin = detail.commission
          this.shuishou = detail.tax
          this.loading = false
        })
      }
    },
    saveAll () {
      let flag = true
      let errorMsg = ''
      if (!this.company) {
        flag = false
        errorMsg = '请选择外贸公司'
      }
      if (!this.contacts) {
        flag = false
        errorMsg = '请选择联系人'
      }
      if (!this.money) {
        flag = false
        errorMsg = '请选择结算单位'
      }
      if (!this.exchangeRate) {
        flag = false
        errorMsg = '请输入汇率'
      }
      if (this.productArr.length === 0) {
        flag = false
        errorMsg = '至少有一款产品'
      }
      this.productArr.forEach((item) => {
        if (item.colorSize.length === 0) {
          flag = false
          errorMsg = '请给所有产品选择尺码和颜色'
        }
      })
      if (flag) {
        // 生成产品报价单编号
        let quotationCode = ''
        this.productArr.forEach((item) => {
          quotationCode = quotationCode + item.product_code.slice(2, 5) + '-'
        })
        let json = {
          id: null,
          client_id: this.company,
          company_id: this.companyId,
          quotation_code: quotationCode,
          client_contact: this.contacts,
          exchange_rate: this.exchangeRate,
          account_unit: this.money,
          product_info: JSON.stringify(this.productArr.map((item) => {
            return {
              product_code: item.product_code,
              id: item.id,
              colorSize: item.colorSize,
              product_info: item
            }
          })),
          product_need: this.product_need,
          material_info: JSON.stringify(this.yarnArr),
          assist_info: JSON.stringify(this.otherMaterialArr),
          weave_info: JSON.stringify(this.weaveArr),
          semi_product_info: JSON.stringify(this.machiningArr),
          pack_material_info: JSON.stringify(this.packagMaterialArr),
          user_info: JSON.stringify(this.manArr),
          desc_info: JSON.stringify(this.otherArr),
          transport_cost: this.yunshu,
          profit: this.lirun,
          commission: this.yongjin,
          tax: this.shuishou,
          desc: this.desc
        }
        priceListCreate(json).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      } else {
        this.$message.error({
          message: errorMsg
        })
      }
    }
  },
  computed: {
    totalPrice () {
      this.yarnArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0)
      return (this.yarnArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + this.otherMaterialArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + this.weaveArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + this.machiningArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + this.packagMaterialArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + this.manArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + this.otherArr.reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + Number(this.yunshu) + Number(this.lirun) + Number(this.yongjin) + Number(this.shuishou)).toFixed(2)
    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    }
  },
  watch: {
    yarnArr: {
      immediate: true,
      handler: function (val) {
        yarnDetail({
          id: val.map((item) => item.key)
        }).then((res) => {
          if (res.data.status && res.data.data.length > 0) {
            let index = 0 // 返回的数据会跳过空数据,因此需要计数
            val.forEach((item) => {
              if (item.key) {
                item.maxPrice = res.data.data[index].max_price
                item.minPrice = res.data.data[index].min_price
                index++
              } else {
                item.maxPrice = 0
                item.minPrice = 0
              }
            })
          }
          console.log(val)
        })
      },
      deep: true
    },
    otherMaterialArr: {
      immediate: true,
      handler: function (val) {
        materialDetail({
          id: val.map((item) => item.key)
        }).then((res) => {
          if (res.data.status && res.data.data.length > 0) {
            let index = 0 // 返回的数据会跳过空数据,因此需要计数
            val.forEach((item) => {
              if (item.key) {
                item.maxPrice = res.data.data[index].max_price
                item.minPrice = res.data.data[index].min_price
                index++
              } else {
                item.maxPrice = 0
                item.minPrice = 0
              }
            })
          }
        })
      },
      deep: true
    }
  },
  mounted () {
    Promise.all([clientList({
      company_id: this.companyId,
      keyword: '',
      status: ''
    }), productList({
      company_id: this.companyId,
      category_id: null,
      style_id: null,
      type_id: null,
      flower_id: null,
      start_time: null,
      end_time: null,
      plan_code: null,
      has_plan: null,
      limit: 5,
      page: 1
    }), productTppeList({
      company_id: this.companyId
    }), flowerList({
      company_id: this.companyId
    }), getGroup({
      company_id: this.companyId
    }), YarnList({
      keyword: ''
    }), materialList({
      company_id: this.companyId
    }), packagMaterialList({
      company_id: this.companyId
    })]).then((res) => {
      this.companyArr = res[0].data.data.filter((item) => (item.type.indexOf(1) !== -1))
      this.seachProduct = res[1].data.data
      this.typeArr = res[2].data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          child_footage: item.child_footage,
          child_size: item.child_size,
          children: item.child.length === 0 ? null : item.child.map((item) => {
            return {
              value: item.id,
              label: item.name,
              children: item.child.length === 0 ? null : item.child.map((item) => {
                return {
                  value: item.id,
                  label: item.name
                }
              })
            }
          })
        }
      })
      this.flowerArr = res[3].data.data
      this.groupArr = res[4].data.data
      this.yarnList = res[5].data.data
      this.otherMaterialList = res[6].data.data
      this.packagMaterialList = res[7].data.data
      this.loading = false
    })
    // 给产品列表做优化
    this.$refs.scrollBox.addEventListener('scroll', (ev) => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (ev.target.scrollTop - this.scrollTop > 60) {
          this.scrollTop = ev.target.scrollTop
          this.page++
          this.getSearchList()
        }
      }, 300)
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/priceListCreate.less";
</style>
<style lang="less">
.tbox {
  display: flex;
  height: 50px;
  .el-input__inner {
    border: 0;
    height: 50px;
    line-height: 50px;
    width: 100%;
  }
  .el-textarea__inner {
    border: 0;
    outline: none;
    resize: none;
  }
}
</style>
