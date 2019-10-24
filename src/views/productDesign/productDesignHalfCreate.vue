<template>
  <div id="rawMaterialProcess"
    v-loading="loading">
    <div class="head">
      <h2>半成品加工分配
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
        <div class="headBtn"
          @click="completion">
          <span>一键分配</span>
        </div>
      </h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号:</span>
            <span class="content important">{{order.order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">订单公司:</span>
            <span class="content">{{order.client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">{{order.order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">{{order.group_name}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding maxWidth">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex:8;">
                    <span>尺码/配色</span>
                    <span>下单数</span>
                    <span>库存调取数</span>
                    <span>生产计划数</span>
                    <span>加工类型</span>
                    <span>分配单位</span>
                    <span>分配数量</span>
                    <span>辅料分配信息</span>
                  </span>
                </li>
                <li v-for="(item,index) in productList"
                  :key="index"
                  class="material_info">
                  <span style="color:#1A95FF"
                    @click="open(item.product_id)">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span style="flex:8;"
                    class="col">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.order_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.stock_pick}}{{item.unit_name}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span v-if="itemColour.fenpei.length>0"
                        class="col"
                        style="flex:4;">
                        <span v-for="itemType in itemColour.fenpei"
                          :key="itemType.name">
                          <span style="max-height:40px;white-space:nowrap;overflow:hidden;text-overflow: ellipsis; ">{{itemType.name}}</span>
                          <span class="col"
                            style="flex:3">
                            <span v-for="itemCompany in itemType.info"
                              :key="itemCompany.name">
                              <span style="border-right: 1px solid #DDD;">{{itemCompany.name}}</span>
                              <span style="border-right: 1px solid #DDD;">{{itemCompany.total}}{{itemCompany.info[0].product_info.category_info.name}}</span>
                              <span class="col">
                                <span style="color:#1A95FF;cursor:pointer"
                                  v-if="itemCompany.info[0].ingredients.length>0"
                                  @click="getDetail(itemCompany.name,itemCompany.info)">查看详情</span>
                                <span style="color:#ddd;"
                                  v-else>无辅料</span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span v-else
                        style="flex:4;color:#ccc">没有分配信息</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="lineCtn col"
          v-if="ingredientInfo.name">
          <div class="inputCtn noPadding maxWidth">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">辅料详情</li>
                <li class="title">
                  <span>分配单位</span>
                  <span>创建日期</span>
                  <span>交货日期</span>
                  <span>产品分配数量</span>
                  <span>辅料名称</span>
                  <span>辅料属性</span>
                  <span>辅料所需数量</span>
                </li>
                <li class="material_info"
                  v-if="ingredientInfo.name">
                  <span>{{ingredientInfo.name}}</span>
                  <span style="flex:6"
                    class="col">
                    <span v-for="(item,index) in ingredientInfo.info"
                      :key="index">
                      <span>{{item.created_at.slice(0,10)}}</span>
                      <span>{{item.complete.slice(0,10)}}</span>
                      <span style="flex:4"
                        class="col">
                        <span v-for="(itemIng,indexIng) in item.ingredients"
                          :key="itemIng">
                          <span>{{item.ingredientsArr[indexIng][0].fenpei}}</span>
                          <span>{{itemIng}}</span>
                          <span class="col">
                            <span v-for="(itemDetail,indexDetail) in item.ingredientsArr[indexIng]"
                              :key="indexDetail">
                              <span>{{itemDetail.color}}</span>
                            </span>
                          </span>
                          <span class="col">
                            <span v-for="(itemDetail,indexDetail) in item.ingredientsArr[indexIng]"
                              :key="indexDetail">
                              <span>{{itemDetail.number}}{{itemDetail.unit}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li class="material_info"
                  v-else>
                  <span>暂无详情信息</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">半成品加工</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col"
          v-for="(item,index) in formList"
          :key="index">
          <div class="inputCtn noPadding maxWidth">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span>产品品类</span>
                  <span style="flex:7;">
                    <span>尺码/配色</span>
                    <span>下单数</span>
                    <span>库存调取数</span>
                    <span>生产计划数</span>
                    <span>加工类型</span>
                    <span>分配单位</span>
                    <span>已分配</span>
                  </span>
                </li>
                <li class="material_info">
                  <span style="color:#1A95FF">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:7;">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.order_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.stock_pick}}{{item.unit_name}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span v-if="itemColour.fenpei.length>0"
                        class="col"
                        style="flex:3;">
                        <span v-for="itemType in itemColour.fenpei"
                          :key="itemType.name">
                          <span>{{itemType.name}}</span>
                          <span class="col"
                            style="flex:2">
                            <span v-for="itemCompany in itemType.info"
                              :key="itemCompany.name">
                              <span style="border-right: 1px solid #DDD;">{{itemCompany.name}}</span>
                              <span>{{itemCompany.total}}{{itemCompany.info[0].product_info.category_info.name}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span v-else
                        style="flex:3;color:#ccc">没有分配信息</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="processInfo">
            <ul class="processFrom"
              v-for="(itemCompany,indexCompany) in item.company"
              :key="indexCompany"
              style="height:530px">
              <span class="el-icon-close"
                @click="deleteCompany(index,indexCompany)"></span>
              <li>
                <span>加工单位:</span>
                <el-select filterable
                  v-model="itemCompany.company_id"
                  placeholder="请选择加工单位"
                  size="small">
                  <el-option v-for="item in companyArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    <div style="width:100%;height:100%">
                      <span style="float: left">{{ item.name }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
                    </div>
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>加工类型:</span>
                <el-select v-model="itemCompany.machining"
                  filterable
                  multiple
                  placeholder="请选择加工类型"
                  size="small">
                  <el-option v-for="item in machiningType"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </li>
              <li class="col"
                v-for="(itemcolorSize,indexColorSize) in itemCompany.price_number"
                :key="indexColorSize">
                <div>
                  <span>价格数量:</span>
                  <el-cascader placeholder="选择尺码/配色"
                    style="margin-left:15px;width:243px;"
                    :options="item.colorSizeArr"
                    v-model="itemcolorSize.colorSize">
                  </el-cascader>
                </div>
                <div>
                  <span></span>
                  <el-input style="margin-left:15px"
                    size="small"
                    placeholder="价格"
                    v-model="itemcolorSize.price"></el-input>
                  <strong>—</strong>
                  <el-input size="small"
                    placeholder="数量"
                    v-model="itemcolorSize.number"></el-input>
                </div>
                <em v-if="indexColorSize === 0"
                  class="el-icon-plus"
                  @click="addSizeColor(index,indexCompany)"></em>
                <em v-else
                  class="el-icon-delete"
                  @click="deleteSizeColor(index,indexCompany,indexColorSize)"></em>
              </li>
              <li>
                <span>产品总价:</span>
                <el-input style="width:243px"
                  disabled
                  size="small"
                  placeholder="总价"
                  v-model="itemCompany.total_price">
                  <template slot="append"><span style="line-height:30px">元</span></template>
                </el-input>
              </li>
              <li>
                <span>选择辅料:</span>
                <el-select multiple
                  v-model="itemCompany.otherMat"
                  placeholder="请选择所需辅料"
                  size="small">
                  <el-option v-for="itemMat in item.otherMatArr"
                    :key="itemMat"
                    :label="itemMat"
                    :value="itemMat">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>完成时间:</span>
                <el-date-picker v-model="itemCompany.complete_time"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  size="small"
                  style="width:243px">
                </el-date-picker>
              </li>
              <li>
                <span>备注信息:</span>
                <el-input type="textarea"
                  placeholder="请输入内容"
                  style="width:243px;margin: 0 0 0 15px;height:45px;"
                  v-model="itemCompany.desc"></el-input>
              </li>
            </ul>
          </div>
          <div class="addBtn"
            @click="addCompany(index)">
            <span>+</span>
            <span>添加公司</span>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
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
import { productionDetail, clientList, halfProductSave, halfProductDetail, notifySave, courseList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'productDesignHalfCreate',
      showMsg: false,
      msgFlag: window.localStorage.getItem('productDesignHalfCreate') ? JSON.parse(window.localStorage.getItem('productDesignHalfCreate')).msgFlag : false,
      msgUrl: '',
      content: '',
      lock: false,
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
      productList: [],
      productListFlat: [],
      formList: [],
      companyArr: [],
      machiningType: [],
      ingredientInfo: {
        name: '',
        info: []
      }
    }
  },
  mounted () {
    Promise.all([
      productionDetail({
        order_id: this.$route.params.id
      }), clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }), halfProductDetail({
        order_id: this.$route.params.id
      }), courseList({
        company_id: this.companyId,
        type: 2
      })
    ]).then(res => {
      this.machiningType = res[3].data.data
      this.order = res[0].data.data.production_detail.order_info
      let productInfo = res[0].data.data.production_detail.product_info.map((item) => {
        let json = item
        json.fenpei = []
        return json
      })
      let productPlan = res[0].data.data.product_plan
      // res[1].data.data.forEach(item => {
      //   if (item.type === 5) {
      //     this.companyArr.push(item)
      //   }
      // })
      this.companyArr = res[1].data.data.filter((item) => (item.type.indexOf(5) !== -1))
      // 将半成品分配的数据 初步 整合到原来的数据中
      res[2].data.data.forEach((item) => {
        productInfo.forEach((itemPro, indexPro) => {
          if (itemPro.product_code === item.product_info.product_code && itemPro.size === item.size && itemPro.color === item.color) {
            productInfo[indexPro].fenpei.push(item)
          }
        })
      })
      // 对分配信息进行整合,先合并加工类型相同的，再合并工厂
      productInfo.map((item) => {
        let json = item
        item.fenpei = this.jsonMerge(item.fenpei, ['type', 'client_name'])
        return json
      })
      // 分配信息得到后，和配料单信息进行整合，得到所需辅料
      productInfo = productInfo.map((item) => {
        let jsons = item
        jsons.fenpei = item.fenpei.map((item1) => {
          return {
            name: item1.type,
            info: item1.info.map((item2) => {
              return {
                name: item2.client_name,
                info: item2.info.map((item3) => {
                  let json = item3
                  item3.ingredientsArr = item3.ingredients.map((itemIng) => {
                    let arr = []
                    productPlan[item3.product_info.product_code].forEach((itemPlan) => {
                      if (itemPlan.color_match_name === item3.color && itemPlan.size === item3.size && itemPlan.type === 1 && itemIng === itemPlan.material_name) {
                        arr.push({
                          number: itemPlan.number * item3.number,
                          unit: itemPlan.unit,
                          name: itemPlan.material_name,
                          color: itemPlan.color_name,
                          fenpei: item3.number + item.unit_name
                        })
                      }
                    })
                    return arr
                  })
                  return json
                })
              }
            })
          }
        })
        return jsons
      })
      // 获取同一加工单位同一工序的总分配数
      productInfo.forEach((item1) => {
        item1.fenpei.forEach((item2) => {
          item2.info.forEach((item3) => {
            item3.total = item3.info.reduce((total, item4) => {
              return total + Number(item4.number)
            }, 0)
          })
        })
      })
      // 合并产品编号相同的数据
      productInfo.forEach((item) => {
        let mark = -1
        let finded = this.productList.find((itemFind, indexFind) => {
          if (itemFind.product_code === item.product_code) {
            mark = indexFind
            return itemFind.product_code === item.product_code
          }
        })
        if (!finded) {
          this.productList.push({
            product_id: item.product_id,
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            unit_name: item.unit_name,
            info: [{
              color: item.color,
              order_num: item.order_num,
              size: item.size,
              total_num: item.total_num,
              production_num: item.production_num,
              production_sunhao: item.production_sunhao,
              stock_pick: item.stock_pick,
              fenpei: item.fenpei
            }]
          })
        } else {
          this.productList[mark].info.push({
            color: item.color,
            order_num: item.order_num,
            size: item.size,
            total_num: item.total_num,
            production_num: item.production_num,
            production_sunhao: item.production_sunhao,
            stock_pick: item.stock_pick,
            fenpei: item.fenpei
          })
        }
      })
      // 初始化表单数据
      this.productList.forEach((item) => {
        // 给每个产品添加独立尺寸/颜色级联选择数据
        let colorSizeArr = []
        item.info.forEach((itemInfo) => {
          let mark = -1
          let finded = colorSizeArr.find((itemFind, indexFind) => {
            if (itemFind.value === itemInfo.size) {
              mark = indexFind
              return itemFind.value === itemInfo.size
            }
          })
          if (!finded) {
            colorSizeArr.push({
              label: itemInfo.size,
              value: itemInfo.size,
              children: [{
                label: itemInfo.color,
                value: itemInfo.color
              }]
            })
          } else {
            colorSizeArr[mark].children.push({
              label: itemInfo.color,
              value: itemInfo.color
            })
          }
        })
        // 给每个产品添加独立辅料选择
        let otherMatArr = []
        if (productPlan[item.product_code]) {
          productPlan[item.product_code].forEach((item) => {
            if (item.type === 1) {
              otherMatArr.push(item.material_name)
            }
          })
        }
        let json = {
          product_code: item.product_code,
          category_name: item.category_name,
          type_name: item.type_name,
          style_name: item.style_name,
          unit_name: item.unit_name,
          info: item.info,
          colorSizeArr: colorSizeArr,
          otherMatArr: Array.from(new Set(otherMatArr)), // ES6数组去重
          company: []
        }
        this.formList.push(json)
      })
      this.loading = false
    })
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
          this.$message.success('分配成功')
          this.$router.push(this.msgUrl)
        }
      })
    },
    // 打开产品详情
    open (code) {
      window.open('/index/productDetail/' + code)
    },
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
    },
    // 添加公司
    addCompany (index) {
      this.formList[index].company.push({
        company_id: '',
        otherMat: [],
        machining: [],
        price_number: [{
          price: '',
          number: '',
          colorSize: []
        }],
        total_price: 0,
        complete_time: '',
        desc: ''
      })
    },
    // 删除公司
    deleteCompany (index, indexCompany) {
      this.formList[index].company.splice(indexCompany, 1)
    },
    // 添加颜色/尺码
    addSizeColor (index, indexCompany) {
      this.formList[index].company[indexCompany].price_number.push({
        price: '',
        number: '',
        colorSize: []
      })
    },
    // 删除颜色/尺码
    deleteSizeColor (index, indexCompany, indexColorSize) {
      this.formList[index].company[indexCompany].price_number.splice(indexColorSize, 1)
    },
    // 查看辅料详情
    getDetail (name, arr) {
      this.ingredientInfo.name = name
      this.ingredientInfo.info = arr
    },
    saveAll () {
      if (!this.lock) {
        let state = false
        let msg = ''
        this.formList.forEach((item) => {
          item.company.forEach((itemCompany) => {
            if (!itemCompany.company_id) {
              state = true
              msg = '检测到加工单位信息缺失'
              return
            }
            if (itemCompany.machining.length === 0) {
              state = true
              msg = '检测到加工类型信息缺失'
              return
            }
            let priceState = false
            itemCompany.price_number.forEach((item) => {
              if (!item.number || !item.price || item.colorSize.length === 0) {
                priceState = true
              }
            })
            if (priceState) {
              state = true
              msg = '检测到价格数量信息缺失'
              return
            }
            if (!itemCompany.complete_time) {
              state = true
              msg = '检测到完成时间信息缺失'
            }
          })
        })
        if (state) {
          this.$message.error({
            message: msg
          })
        } else {
          let flag = false
          this.formList.forEach((item) => {
            item.info.forEach((itemFenpei) => {
              let total = item.company.reduce((totalCmp, itemCmp) => {
                return totalCmp + itemCmp.price_number.reduce((totalColor, itemColor) => {
                  if (itemColor.colorSize[0] === itemFenpei.size && itemColor.colorSize[1] === itemFenpei.color) {
                    return Number(itemColor.number) + totalColor
                  } else {
                    return totalColor
                  }
                }, 0)
              }, 0)
              if (total > (itemFenpei.order_num - itemFenpei.stock_pick - itemFenpei.fenpei)) {
                flag = true
              }
            })
          })
          if (flag) {
            this.$message.error('半成品分配总数不能超过下单值，请重新填写分配数量')
            return
          }
          let formData = []
          // 将数据处理成要提交的数据
          this.formList.forEach((item, index) => {
            item.company.forEach((itemCompany, indexCompany) => {
              itemCompany.price_number.forEach((itemPrice, indexPrice) => {
                // 如果日期是对象格式，手动处理下
                let completeTime = itemCompany.complete_time
                if (typeof (completeTime) === 'object') {
                  completeTime = completeTime.getFullYear() + '-' + (completeTime.getMonth() > 9 ? completeTime.getMonth() + 1 : '0' + (completeTime.getMonth() + 1)) + '-' + (completeTime.getDate() > 10 ? completeTime.getDate() : '0' + completeTime.getDate())
                }
                formData.push({
                  company_id: window.sessionStorage.getItem('company_id'),
                  order_id: this.order.id,
                  product_code: item.product_code,
                  client_id: itemCompany.company_id,
                  // total_price: itemCompany.total_price,
                  complete_time: completeTime,
                  desc: itemCompany.desc,
                  price: itemPrice.price,
                  number: itemPrice.number,
                  size: itemPrice.colorSize[0],
                  color: itemPrice.colorSize[1],
                  user_id: window.sessionStorage.getItem('user_id'),
                  type: itemCompany.machining.join('/'),
                  ingredients: JSON.stringify(itemCompany.otherMat)
                })
              })
            })
          })
          this.loading = true
          this.lock = true
          halfProductSave({ data: formData }).then((res) => {
            if (res.data.status) {
              if (this.msgFlag) {
                this.msgUrl = '/index/productDesignHalfDetail/' + this.$route.params.id
                this.content = '订单' + this.order.order_code + '<span style="color:#1A95FF">分配</span>了半成品加工信息'
                this.sendMsg()
              } else {
                this.$message.success('分配成功')
                this.$router.push('/index/productDesignHalfDetail/' + this.$route.params.id)
              }
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
            this.loading = false
            this.lock = false
          })
        }
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    },
    // 一键分配
    completion () {
      this.formList.forEach((item) => {
        item.company = []
      })
      this.productList.forEach((itemPro, indexPro) => {
        this.formList[indexPro].company.push({
          company_id: '',
          complete_time: new Date(),
          desc: '',
          machining: [],
          otherMat: [],
          price_number: [],
          total_price: 0
        })
        itemPro.info.forEach((itemSize, indexSize) => {
          this.formList[indexPro].company[0].price_number.push({
            colorSize: [itemSize.size, itemSize.color],
            number: itemSize.production_num,
            price: ''
          })
        })
      })
      this.$message.success({
        message: '已为您导入产品信息，请输入加工单位和价格信息'
      })
    }
  },
  watch: {
    formList: {
      handler: function (newVal) {
        // 监听表单信息，计算总价
        this.formList.forEach((item, index) => {
          item.company.forEach((itemCompany, indexCompany) => {
            let flag = true
            itemCompany.price_number.forEach((itemPrice, indexPrice) => {
              if (!Number(itemPrice.price) || !Number(itemPrice.number)) {
                flag = false
              }
            })
            if (flag) {
              this.formList[index].company[indexCompany].total_price = this.formList[index].company[indexCompany].price_number.reduce((total, current) => {
                return total + current.price * current.number
              }, 0)
            }
          })
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialProcess.less";
</style>
<style lang="less">
#rawMaterialProcess {
  .el-cascader__label {
    height: 34px;
  }
  .el-input--suffix {
    height: 34px;
    .el-input__inner {
      height: 34px;
    }
  }
}
</style>
