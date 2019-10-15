<template>
  <div id="rawMaterialProcess"
    v-loading="loading">
    <div class="head">
      <h2>产品织造分配
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
                  <span style="flex:5;">
                    <span>尺码/配色</span>
                    <span>下单数</span>
                    <span>库存调取数</span>
                    <span>生产计划数</span>
                    <span>已分配数量</span>
                  </span>
                </li>
                <li v-for="(item,index) in productList"
                  :key="index"
                  class="material_info">
                  <span style="color:#1A95FF"
                    @click="open(item.product_code)">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:5;">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.order_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.stock_pick}}{{item.unit_name}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.fenpei}}{{item.unit_name}}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品织造</div>
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
                  <span style="flex:5;">
                    <span>尺码/配色</span>
                    <span>下单数</span>
                    <span>库存调取数</span>
                    <span>生产计划数</span>
                    <span>已分配数量</span>
                  </span>
                </li>
                <li class="material_info">
                  <span style="color:#1A95FF"
                    @click="open(item.product_code)">{{item.product_code}}</span>
                  <span>{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
                  <span class="col"
                    style="flex:5;">
                    <span v-for="(itemColour,indexColour) in item.info"
                      :key="indexColour">
                      <span>{{itemColour.size}}/{{itemColour.color}}</span>
                      <span>{{itemColour.order_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.stock_pick}}{{item.unit_name}}</span>
                      <span>{{itemColour.production_num}}{{item.unit_name}}</span>
                      <span>{{itemColour.fenpei}}{{item.unit_name}}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="processInfo">
            <ul class="processFrom"
              v-for="(itemCompany,indexCompany) in item.company"
              :key="indexCompany">
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
                  </el-option>
                </el-select>
              </li>
              <li class="col"
                v-for="(itemcolorSize,indexColorSize) in itemCompany.price_number"
                :key="indexColorSize">
                <div>
                  <span>价格数量:</span>
                  <el-cascader placeholder="选择尺码/颜色"
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
import { productionDetail, clientList, weaveSave, weaveDetail, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'productDesignWeavingCreate',
      showMsg: false,
      msgFlag: window.localStorage.getItem('productDesignWeavingCreate') ? JSON.parse(window.localStorage.getItem('productDesignWeavingCreate')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      lock: false,
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
      companyArr: []
    }
  },
  mounted () {
    Promise.all([
      productionDetail({
        order_id: this.$route.params.id
      }), clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }), weaveDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      this.order = res[0].data.data.production_detail.order_info
      let productInfo = res[0].data.data.production_detail.product_info.map((item) => {
        let json = item
        json.fenpei = 0
        return json
      })
      this.companyArr = res[1].data.data.filter((item) => (item.type.indexOf(4) !== -1))
      // 将织造分配的数据整合到原来的数据中
      res[2].data.data.forEach((item) => {
        productInfo.forEach((itemPro, indexPro) => {
          if (itemPro.product_code === item.product_info.product_code && itemPro.size === item.size && itemPro.color === item.color) {
            productInfo[indexPro].fenpei = productInfo[indexPro].fenpei ? productInfo[indexPro].fenpei + item.number : item.number
          }
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
        // 给每个产品添加独立尺寸/颜色级联选择数据
        let json = {
          product_code: item.product_code,
          category_name: item.category_name,
          type_name: item.type_name,
          style_name: item.style_name,
          unit_name: item.unit_name,
          info: item.info,
          colorSizeArr: colorSizeArr,
          company: []
        }
        this.formList.push(json)
        this.loading = false
      })
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
    // 添加公司
    addCompany (index) {
      this.formList[index].company.push({
        company_id: '',
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
                  user_id: window.sessionStorage.getItem('user_id')
                })
              })
            })
          })
          this.lock = true
          this.loading = true
          weaveSave({ data: formData }).then((res) => {
            if (res.data.status) {
              if (this.msgFlag) {
                this.msgUrl = '/index/productDesignWeavingDetail/' + this.$route.params.id
                this.content = '订单' + this.order.order_code + '<span style="color:#1A95FF">分配</span>了织造信息'
                this.sendMsg()
              } else {
                this.$message.success('分配成功')
                this.$router.push('/index/productDesignWeavingDetail/' + this.$route.params.id)
              }
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
            this.lock = false
            this.loading = false
          })
        }
      }
    },
    // 一键分配 待优化报价单
    completion () {
      // 数据初始化
      this.formList.forEach((item) => {
        item.company = []
      })
      this.productList.forEach((itemPro, indexPro) => {
        this.formList[indexPro].company.push({
          company_id: '',
          complete_time: new Date(),
          desc: '',
          price_number: [],
          total_price: 0
        })
        itemPro.info.forEach((itemColor, indexColor) => {
          this.formList[indexPro].company[0].price_number.push({
            colorSize: [itemColor.size, itemColor.color],
            number: itemColor.production_num - itemColor.fenpei,
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
