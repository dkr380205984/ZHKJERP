<template>
  <div id="orderCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加订单
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">订单号：</span>
          <div>
            <template v-for="(item,key) in orderId">
              <el-input class="elInput"
                :key="key"
                v-model="item.code"
                style="margin: 0;"
                :placeholder="'请输入订单号' + (key+1)"></el-input>
              <span :key="key+'C'"
                style="margin:0 8px;font-size:14px;color:#1A95FF;cursor: pointer;"
                v-if="key === 0"
                @click="orderId.push({code:''})">添加</span>
              <span :key="key+'D'"
                v-else
                style="margin:0 8px;font-size:14px;color:#F56C6C;cursor: pointer;"
                @click="orderId.splice(key,1)">删除</span>
            </template>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">外贸公司：</span>
          <el-select class="elInput"
            v-model="company"
            filterable
            placeholder="请选择外贸公司"
            @change="getContacts">
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
            @change="getRMB"
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
            :disabled="!money"
            placeholder="请输入汇率"
            @focus="showTips=true"
            @blur="showTips=false"></el-input>
          <div class="tips"
            style="color:#b5b5b5">{{!money?'请选择结算单位':'100'+money+' = '+(exchangeRate?exchangeRate:0) +'人民币'}}</div>
          <div style="top:63px;color:#b5b5b5!important"
            class="tips"
            @mousedown="goBaidu">例:结算单位美元,100美元=670人民币,填写数字670</div>
          <div style="top:85px"
            v-show="showTips"
            class="tips"
            @mousedown="goBaidu">点击查询实时汇率</div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">税率：</span>
          <el-input class="elInput"
            v-model="taxRate"
            placeholder="请选择货币">
            <template slot="append">%</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">下单日期：</span>
          <el-date-picker value-format="yyyy-MM-dd"
            class="elInput"
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputCtn">
          <span class="label must">负责小组：</span>
          <el-select class="elInput"
            v-model="group"
            placeholder="请选择小组">
            <el-option v-for="item in groupArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
                  @click="openUrl('/index/productDetail/'+item.id)">{{item.product_code}}</div>
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
          <div class="specialCtn"
            v-for="(itemOrder,indexOrder) in orderArr"
            :key="indexOrder">
            <div class="lineTitle">第 {{indexOrder+1}} 批
              <div class="deleteIcon"
                @click="deleteBatch(indexOrder)"><i class="el-icon-close"></i></div>
            </div>
            <div class="mainCtn">
              <div class="mainOnce">
                <span class="label">交货日期：</span>
                <el-date-picker value-format="yyyy-MM-dd"
                  class="elInput"
                  v-model="orderArr[indexOrder].date"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="mainOnce">
                <span class="label">产品信息：</span>
                <div class="btnCtn">
                  <div class="addBtn"
                    @click="addProductOne(indexOrder)">
                    <span>添加产品</span>
                    <span>+</span>
                  </div>
                </div>
                <div class="productCtn"
                  v-for="(itemProduct,indexProduct) in orderArr[indexOrder].product"
                  :key="indexProduct">
                  <div class="product">
                    <div class="index">产品 {{indexProduct+1}}：</div>
                    <el-select class="elInput"
                      v-model="orderArr[indexOrder].product[indexProduct].name"
                      placeholder="请选择产品编号"
                      style="margin-top:24px;"
                      @change="getColorSize($event,indexOrder,indexProduct)">
                      <el-option v-for="item in productArr"
                        :key="item.product_code"
                        :label="item.product_code"
                        :value="item.product_code">
                        <span style="font-size:12px">{{item.product_code}}({{item.category_info.product_category}}/{{item.type_name}}/{{item.style_name}})</span>
                      </el-option>
                    </el-select>
                    <span class="showImg">预览
                      <div class="showImgBox">
                        <img :src="getImgUrl(orderArr[indexOrder].product[indexProduct].name)"
                          alt="">
                      </div>
                    </span>
                    <i class="el-icon-delete"
                      @click="deleteProductOne (indexOrder, indexProduct)"></i>
                  </div>
                  <div class="typeCtn"
                    v-for="(itemType,indexType) in orderArr[indexOrder].product[indexProduct].size"
                    :key="indexType">
                    <div class="index">{{indexType+1}}</div>
                    <el-cascader style="width:160px;margin-right:10px"
                      class="elInput"
                      placeholder="请选择尺码和颜色"
                      :options="orderArr[indexOrder].product[indexProduct].colorSizeArr"
                      v-model="orderArr[indexOrder].product[indexProduct].size[indexType].name">
                    </el-cascader>
                    <el-input class="elInput"
                      v-model="orderArr[indexOrder].product[indexProduct].size[indexType].unitPrice"
                      placeholder="单价"
                      style="width:145px;margin-right:10px">
                      <template slot="append">{{money}}</template>
                    </el-input>
                    <el-input class="elInput"
                      v-model="orderArr[indexOrder].product[indexProduct].size[indexType].numbers"
                      placeholder="数量"
                      style="width:145px;">
                      <template slot="append">{{orderArr[indexOrder].product[indexProduct].product_info.category_info?orderArr[indexOrder].product[indexProduct].product_info.category_info.name:''}}</template>
                    </el-input>
                    <i class="el-icon-delete"
                      @click="deleteSize(indexOrder,indexProduct,indexType)"></i>
                  </div>
                  <div style="margin-top:24px;">
                    <div class="addBtn"
                      @click="addSize(indexOrder,indexProduct)">
                      <span>添加尺码/颜色</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btnCtn"
            style="margin-top:24px;">
            <div class="addBtn"
              @click="addBatch">
              <span>添加批次</span>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label must">总价：</span>
          <el-input class="elInput"
            v-model="totalMoney"
            placeholder="总价"
            disabled></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订单资料：</span>
          <div class="content">
            <ul class="tablesCtn"
              style="list-style:none;margin:0;padding:0;width:670px;">
              <li class="content">
                <span class="tableRow">订单合同</span>
                <span class="tableRow">包装资料</span>
                <span class="tableRow">装箱资料</span>
                <span class="tableRow">其他文件</span>
              </li>
              <li class="content"
                style="min-height:60px;">
                <span class="tableRow noCenter">
                  <el-upload class="upload-demo"
                    action="https://upload.qiniup.com/"
                    accept=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileArr"
                    :data="postData"
                    ref="uploada1">
                    <el-button size="small"
                      type="primary">点击上传</el-button>
                  </el-upload>
                </span>
                <span class="tableRow noCenter">
                  <el-upload class="upload-demo"
                    action="https://upload.qiniup.com/"
                    accept=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileArr"
                    :data="postData"
                    ref="uploada2">
                    <el-button size="small"
                      type="primary">点击上传</el-button>
                  </el-upload>
                </span>
                <span class="tableRow noCenter">
                  <el-upload class="upload-demo"
                    action="https://upload.qiniup.com/"
                    accept=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileArr"
                    :data="postData"
                    ref="uploada3">
                    <el-button size="small"
                      type="primary">点击上传</el-button>
                  </el-upload>
                </span>
                <span class="tableRow noCenter">
                  <el-upload class="upload-demo"
                    action="https://upload.qiniup.com/"
                    accept=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileArr"
                    :data="postData"
                    ref="uploada4">
                    <el-button size="small"
                      type="primary">点击上传</el-button>
                  </el-upload>
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine product">
          <span class="label">备注：</span>
          <el-input style="width:670px"
            type="textarea"
            :rows="6"
            class="elInput"
            v-model="otherInfo"
            placeholder="其他信息填写"></el-input>
        </div>
      </div>
      <div class="bottom">
        <div class="cancleBtn"
          @click="$router.push('/index/orderList')">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>

<script>
import { moneyArr } from '@/assets/js/dictionary.js'
import { clientList, productList, productTppeList, flowerList, orderSave, getGroup, getToken, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'orderCreate',
      showMsg: false,
      msgFlag: window.localStorage.getItem('orderCreate') ? JSON.parse(window.localStorage.getItem('orderCreate')).msgFlag : false,
      msgUrl: '',
      content: '',
      fileArr: [],
      postData: { token: '' },
      lock: false,
      nomore: false,
      page: 1,
      timer: '', // 用于订单列表优化
      scrollTop: 0,
      loading: true,
      showTips: false,
      hasJHD: null,
      orderId: [{ code: '' }],
      companyId: window.sessionStorage.getItem('company_id'),
      companyArr: [],
      company: '',
      contactsArr: [],
      contacts: '',
      moneyArr: moneyArr,
      money: '',
      exchangeRate: '',
      taxRate: '13',
      date: '',
      search: '',
      typeArr: [],
      type: [],
      flowerArr: [],
      flower: '',
      dateSearch: '',
      peopleArr: [],
      people: '',
      showSeach: false,
      otherInfo: '',
      addDate: [''],
      seachProduct: [],
      product: [],
      productArr: [],
      orderArr: [{
        date: '',
        product: [{
          product_info: {},
          name: '',
          colorSizeArr: [],
          size: [{
            name: [],
            unitPrice: '',
            numbers: ''
          }]
        }]
      }],
      group: '',
      groupArr: []
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
          this.$message.success('添加成功')
          this.$router.push(this.msgUrl)
        }
      })
    },
    getImgUrl (code) {
      let isHave = this.productArr.find(item => item.product_code === code)
      return (isHave ? (isHave.img[0] ? isHave.img[0].image_url : require('@/assets/image/index/noPic.png')) : require('@/assets/image/index/noPic.png'))
    },
    // 获取到人名币后自动填汇率
    getRMB (ev) {
      if (ev === '元') {
        this.exchangeRate = 100
      }
    },
    // 查询汇率
    goBaidu () {
      window.open('http://forex.hexun.com/rmbhl/#zkRate')
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
        has_plan: this.hasJHD,
        type: 1
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
    // 删除批次
    deleteBatch (index) {
      this.$confirm('是否删除该批次?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.orderArr.length > 1) {
          this.orderArr.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '至少有一个批次!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加批次
    addBatch () {
      this.orderArr.push({
        date: '',
        product: [{
          product_info: {},
          name: '',
          colorSizeArr: [],
          size: [{
            name: [],
            unitPrice: '',
            numbers: ''
          }]
        }]
      })
    },
    // 添加产品
    addProductOne (indexOrder) {
      this.orderArr[indexOrder].product.push({
        product_info: {},
        name: '',
        colorSizeArr: [],
        size: [{
          name: [],
          unitPrice: '',
          numbers: ''
        }]
      })
    },
    // 删除产品
    deleteProductOne (indexOrder, indexProduct) {
      if (this.orderArr[indexOrder].product.length > 1) {
        this.orderArr[indexOrder].product.splice(indexProduct, 1)
      } else {
        this.$message({
          type: 'error',
          message: '每个批次至少包含一个产品!'
        })
      }
    },
    // 添加尺码
    addSize (indexOrder, indexProduct) {
      this.orderArr[indexOrder].product[indexProduct].size.push({
        name: [],
        unitPrice: '',
        numbers: ''
      })
    },
    // 删除尺码
    deleteSize (indexOrder, indexProduct, indexType) {
      if (this.orderArr[indexOrder].product[indexProduct].size.length > 1) {
        this.orderArr[indexOrder].product[indexProduct].size.splice(indexType, 1)
      } else {
        this.$message({
          type: 'error',
          message: '每个产品至少包含一个尺码!'
        })
      }
    },
    // 选取产品后,把相应的尺码和颜色信息更新到级联选择器里
    getColorSize (id, indexOrder, indexProduct) {
      let arr = []
      let obj = this.productArr.find((item) => item.product_code === id)
      arr = obj.size.map(item => {
        return {
          value: item.measurement,
          label: item.measurement,
          children: obj.color.map(item => {
            return {
              value: item.color_name,
              label: item.color_name
            }
          })
        }
      })
      this.orderArr[indexOrder].product[indexProduct].colorSizeArr = arr
      this.orderArr[indexOrder].product[indexProduct].product_info = obj
    },
    // 文件上传相关操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeAvatarUpload: function (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isLt2M = file.size / 1024 / 1024 < 20
      // const isReapeat = this.fileArr.find((item) => {
      //   return item.key === file.name
      // })
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 20MB!')
        return false
      }
      // if (isReapeat) {
      //   this.$message.error('不能重复上传图片')
      //   return false
      // }
    },
    handleSuccess (res, file) {
      console.log(res)
    },
    // 清空
    clearAll () {
    },
    // 保存
    saveAll () {
      if (!this.lock) {
        if (!this.orderId) {
          this.$message.error({
            message: '订单号未填写，请输入订单号'
          })
          return
        }
        if (!this.company) {
          this.$message.error({
            message: '外贸公司未选择，请选择外贸公司'
          })
          return
        }
        if (!this.contacts) {
          this.$message.error({
            message: '联系人未选择，请选择联系人'
          })
          return
        }
        if (!this.money) {
          this.$message.error({
            message: '结算单位未选择，请选择结算单位'
          })
          return
        }
        if (!this.exchangeRate) {
          this.$message.error({
            message: '汇率未填写，请填写汇率'
          })
          return
        }
        if (!this.taxRate) {
          this.$message.error({
            message: '税率未填写，请填写税率'
          })
          return
        }
        if (!this.date) {
          this.$message.error({
            message: '下单日期未选择，请选择下单日期'
          })
          return
        }
        if (!this.group) {
          this.$message.error({
            message: '负责小组未选择，请选择负责小组'
          })
          return
        }
        let timeState = true
        let productState = true
        let sizeState = true
        this.orderArr.forEach((itemOrder) => {
          if (!itemOrder.date) {
            timeState = false
          }
          itemOrder.product.forEach((itemProduct) => {
            if (!itemProduct.name) {
              productState = false
            }
            itemProduct.size.forEach((itemSize, indexSize) => {
              itemProduct.size.forEach((item, index) => {
                if (itemSize.name.length > 0 && indexSize !== index) {
                  if (itemSize.name[0] === item.name[0] && itemSize.name[1] === item.name[1]) {
                    sizeState = false
                  }
                }
              })
              if (!itemSize.numbers) {
                productState = false
              }
              if (!itemSize.unitPrice) {
                productState = false
              }
              if (itemSize.name.length === 0) {
                productState = false
              }
            })
          })
        })
        if (!timeState) {
          this.$message.error({
            message: '交货日期填写不完整，请检查'
          })
          return
        }
        if (!productState) {
          this.$message.error({
            message: '产品信息填写不完整，请检查'
          })
          return
        }
        if (!sizeState) {
          this.$message.error({
            message: '检测到同一批次中有相同的产品颜色和尺寸,请合并后提交'
          })
          return
        }
        const orderContract = this.$refs.uploada1.uploadFiles.map((item) => { return 'https://zhihui.tlkrzf.com/' + item.response.key })
        const packMeans = this.$refs.uploada2.uploadFiles.map((item) => { return 'https://zhihui.tlkrzf.com/' + item.response.key })
        const storeMeans = this.$refs.uploada3.uploadFiles.map((item) => { return 'https://zhihui.tlkrzf.com/' + item.response.key })
        const otherInfo = this.$refs.uploada4.uploadFiles.map((item) => { return 'https://zhihui.tlkrzf.com/' + item.response.key })
        let obj = {
          company_id: this.companyId,
          user_id: window.sessionStorage.getItem('user_id'),
          order_code: this.orderId.map(key => {
            return key.code
          }).join(';'),
          client_id: this.company,
          contacts: this.contacts,
          account_unit: this.money,
          exchange_rate: this.exchangeRate,
          tax_rate: this.taxRate,
          order_time: this.date,
          group_id: this.group,
          order_info: this.orderArr.map((item, index) => {
            return {
              batch_info: item.product.map((item) => {
                return {
                  productCode: item.name,
                  size: item.size
                }
              }),
              delivery_time: item.date,
              batch_id: parseInt(index + 1)
            }
          }),
          total_price: this.totalMoney,
          remark: this.otherInfo,
          total_price_RMB: this.totalMoney * this.exchangeRate / 100,
          order_contract: JSON.stringify(orderContract),
          pack_means: JSON.stringify(packMeans),
          store_means: JSON.stringify(storeMeans),
          others_info: JSON.stringify(otherInfo),
          type: 1
        }
        this.lock = true
        this.loading = true
        orderSave(obj).then((res) => {
          if (res.data.status) {
            if (this.msgFlag) {
              this.msgUrl = '/index/orderDetailNew/' + res.data.data.id
              this.content = '<span style="color:#1A95FF">添加</span>了一张新订单<span style="color:#1A95FF">' + res.data.data.order_code + '</span>'
              this.sendMsg()
            } else {
              this.$message.success('添加成功')
              this.$router.push('/index/orderDetailNew/' + res.data.data.id)
            }
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
          this.lock = false
          this.loading = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    },
    // 打开新页面
    openUrl (url) {
      window.open(url)
    }
  },
  computed: {
    totalMoney () {
      return this.orderArr.reduce((totalOrder, itemOrder) => {
        return totalOrder + itemOrder.product.reduce((totalProduct, itemProduct) => {
          return totalProduct + itemProduct.size.reduce((totalSize, itemSize) => {
            return totalSize + itemSize.numbers * itemSize.unitPrice
          }, 0)
        }, 0)
      }, 0).toFixed(2)
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
  mounted () {
    let firstInput = document.getElementsByTagName('input')[0]
    firstInput.focus()
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
      page: 1,
      type: 1
    }), productTppeList({
      company_id: this.companyId
    }), flowerList({
      company_id: this.companyId
    }), getGroup({
      company_id: this.companyId
    }), getToken()]).then((res) => {
      this.companyArr = res[0].data.data.filter((item) => (item.type.indexOf(1) !== -1))
      this.seachProduct = res[1].data.data
      if (this.$route.fullPath.split('?')[1]) {
        this.getProduct(true, this.$route.fullPath.split('?')[1])
      }
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
      this.postData.token = res[5].data.data
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
  },
  watch: {
    'orderId': {
      deep: true,
      handler (newVal) {
        newVal.forEach(item => {
          if (item.code.indexOf(';') !== -1) {
            item.code = item.code.split(';').join('')
            this.$message.error('订单号内不可含有";"')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#orderCreate {
  .showImg {
    margin: 0 1em;
    font-size: 14px;
    cursor: pointer;
    color: #409eff;
    position: relative;
    & > .showImgBox {
      width: 300px;
      height: 200px;
      padding: 0 30px;
      box-sizing: border-box;
      display: none;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
      position: absolute;
      bottom: 0;
      right: -10px;
      transform: translateX(100%);
      background: #fff;
      border-radius: 10px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &:hover > .showImgBox {
      display: flex;
    }
  }
  .tableRow {
    &.noCenter {
      justify-content: flex-start;
      align-items: flex-start;
      overflow: hidden;
    }
  }
  .upload-demo {
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 14px auto;
    .el-upload-list__item-name {
      max-width: 110px;
    }
  }
}

@import "~@/assets/css/orderCreate.less";
</style>
