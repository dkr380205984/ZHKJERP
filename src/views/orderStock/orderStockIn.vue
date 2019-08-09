<template>
  <div id="rawMaterialProcess"
    v-loading="loading">
    <div class="head">
      <h2>产品入库
        <div class="headBtn"
          @click="completion">
          <span>一键入库</span>
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
        <div class="stepTitle">产品入库</div>
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
                  <span style="flex:6;">
                    <span>配色/尺码</span>
                    <span>生产计划数</span>
                    <span>工序</span>
                    <span>分配工厂</span>
                    <span>分配数量</span>
                    <span>入库数量</span>
                  </span>
                </li>
                <li class="material_info">
                  <span style="color:#1A95FF">{{productList[0]?productList[0].product_code:''}}</span>
                  <span>{{productList[0]?productList[0].category_name:''}}/{{productList[0]?productList[0].type_name:''}}/{{productList[0]?productList[0].style_name:''}}</span>
                  <span style="flex:6;"
                    class="col">
                    <span v-for="(item,index) in productList"
                      :key="index">
                      <span>{{item.color}}/{{item.size}}</span>
                      <span>{{item.production_num}}{{item.unit_name}}</span>
                      <span style="flex:4;"
                        class="col">
                        <span v-for="(itemType,indexType) in item.machiningType"
                          :key="indexType">
                          <span>{{itemType.name}}</span>
                          <span style="flex:3;"
                            class="col">
                            <span v-for="(itemCmp,indexCmp) in itemType.companyArr"
                              :key="indexCmp">
                              <span style="border-right:1px solid #ddd">{{itemCmp.name}}</span>
                              <span style="border-right:1px solid #ddd">{{itemCmp.num}}{{item.unit_name}}</span>
                              <span>{{itemCmp.inNum}}{{item.unit_name}}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span v-if="productList.length===0">暂无信息</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="processInfo">
            <ul class="processFrom"
              v-for="(item,index) in formList"
              :key="index">
              <span class="el-icon-close"
                @click="deleteCompany(index)"></span>
              <li class="col">
                <div v-for="(itemCompany,indexCompany) in item.typeCompany"
                  :key="indexCompany">
                  <span>{{indexCompany===0?'入库工序:':''}}</span>
                  <el-select filterable
                    v-model="itemCompany.type"
                    placeholder="工序"
                    size="small"
                    style="width:114px"
                    @change="getCompanyArr(index,indexCompany)">
                    <el-option v-for="item in productList[0].machiningType"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                  <strong>—</strong>
                  <el-select filterable
                    v-model="itemCompany.company"
                    placeholder="加工单位"
                    size="small"
                    style="width:114px;margin-left:0">
                    <el-option v-for="item in itemCompany.companyArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <em v-if="indexCompany===0"
                    style="margin-left:5px"
                    class="el-icon-plus"
                    @click="addTypeCompany(index)"></em>
                  <em v-else
                    style="margin-left:5px"
                    class="el-icon-delete"
                    @click="deleteTypeCompany(index,indexCompany)"></em>
                </div>
              </li>
              <li class="col"
                v-for="(itemPack,indexPack) in item.packNumber"
                :key="indexPack">
                <div>
                  <span>{{indexPack===0?'件数/数量:':''}}</span>
                  <el-cascader placeholder="选择尺码/颜色"
                    style="margin-left:15px;width:243px;"
                    :options="colorSizeArr"
                    v-model="itemPack.colorSize">
                  </el-cascader>
                </div>
                <div>
                  <span></span>
                  <el-input style="margin-left:15px"
                    size="small"
                    placeholder="件数"
                    v-model="itemPack.pack"></el-input>
                  <strong>—</strong>
                  <el-input size="small"
                    placeholder="数量"
                    v-model="itemPack.number"></el-input>
                </div>
                <em v-if="indexPack === 0"
                  class="el-icon-plus"
                  style="margin-left:5px"
                  @click="addSizeColor(index)"></em>
                <em v-else
                  class="el-icon-delete"
                  style="margin-top:5px;right:-3px"
                  @click="deleteSizeColor(index,indexPack)"></em>
              </li>
              <li>
                <span>入库时间:</span>
                <el-date-picker v-model="item.complete_time"
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
                  v-model="item.desc"></el-input>
              </li>
            </ul>
          </div>
          <div class="addBtn"
            @click="addCompany">
            <span>+</span>
            <span>入库工序</span>
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
  </div>
</template>

<script>
import { machiningType } from '@/assets/js/dictionary.js'
import { clientList, productionDetail, storeIn, storeInList, weaveDetail, halfProductDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      companyArr: [],
      machiningType: JSON.parse(JSON.stringify(machiningType)), // 洗白对象
      colorSizeArr: [],
      formList: []
    }
  },
  mounted () {
    Promise.all([clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }), productionDetail({
      order_id: this.$route.params.orderId
    }), storeInList({
      order_id: this.$route.params.orderId
    }), weaveDetail({
      order_id: this.$route.params.orderId
    }), halfProductDetail({
      order_id: this.$route.params.orderId
    })]).then((res) => {
      let companyArr = res[0].data.data
      this.order = res[1].data.data.production_detail.order_info
      let productList = res[1].data.data.production_detail.product_info.filter((item) => item.product_code === this.$route.params.productId)
      const logListIn = res[2].data.data
      const logListWeave = res[3].data.data
      const logListHalf = res[4].data.data
      console.log(logListIn)
      // 产品尺码和颜色筛选框数据整合
      productList.forEach((itemInfo) => {
        let mark = -1
        let finded = this.colorSizeArr.find((itemFind, indexFind) => {
          if (itemFind.value === itemInfo.size) {
            mark = indexFind
            return itemFind.value === itemInfo.size
          }
        })
        if (!finded) {
          this.colorSizeArr.push({
            label: itemInfo.size,
            value: itemInfo.size,
            children: [{
              label: itemInfo.color,
              value: itemInfo.color
            }]
          })
        } else {
          this.colorSizeArr[mark].children.push({
            label: itemInfo.color,
            value: itemInfo.color
          })
        }
      })
      // 织造分配信息统计
      productList.forEach((item) => {
        item.machiningType = []
        logListWeave.forEach((itemFind) => {
          if (itemFind.color === item.color && itemFind.size === item.size && itemFind.product_info.product_code === item.product_code) {
            if (item.machiningType.length === 0) {
              item.machiningType.push({
                name: '织造',
                id: null,
                companyArr: [{
                  name: itemFind.client_name,
                  id: companyArr.find((itemCmp) => itemCmp.name === itemFind.client_name).id,
                  num: itemFind.number
                }]
              })
            } else {
              let finded = item.machiningType[0].companyArr.find((itemCmp) => itemCmp.name === itemFind.client_name)
              if (!finded) {
                item.machiningType[0].companyArr.push({
                  name: itemFind.client_name,
                  id: companyArr.find((itemCmp) => itemCmp.name === itemFind.client_name).id,
                  num: itemFind.number
                })
              } else {
                finded.num += itemFind.number
              }
            }
          }
        })
      })
      // 半成品加工分配信息统计
      productList.forEach((item) => {
        logListHalf.forEach((itemFind) => {
          if (itemFind.color === item.color && itemFind.size === item.size && itemFind.product_info.product_code === item.product_code) {
            let finded = item.machiningType.find((itemName) => itemName.name === itemFind.type)
            if (!finded) {
              item.machiningType.push({
                name: itemFind.type,
                id: itemFind.type,
                companyArr: [{
                  name: itemFind.client_name,
                  id: companyArr.find((itemCmp) => itemCmp.name === itemFind.client_name).id,
                  num: itemFind.number
                }]
              })
            } else {
              finded.companyArr.push({
                name: itemFind.client_name,
                id: companyArr.find((itemCmp) => itemCmp.name === itemFind.client_name).id,
                num: itemFind.number
              })
            }
          }
        })
      })
      productList.forEach((itemPro) => {
        itemPro.machiningType.forEach((item) => {
          item.companyArr.forEach((itemCmp) => {
            itemCmp.inNum = 0
            logListIn.forEach((itemFind) => {
              if (itemFind.product_info.product_code === itemPro.product_code && itemFind.color === itemPro.color && itemFind.size === itemPro.size && itemFind.type === item.name && itemFind.client_name === itemCmp.name) {
                console.log(itemFind)
                itemCmp.inNum += itemFind.number
              }
            })
          })
        })
      })
      // 过滤出加工单位
      productList.forEach((itemPro) => {
        console.log(itemPro)
        itemPro.machiningType.forEach((itemType) => {
          itemType.companyArr.forEach((itemCompany) => {
            const finded = this.companyArr.find((itemFind) => itemFind.name === itemCompany.name)
            if (!finded) {
              this.companyArr.push(companyArr.find((findCmp) => findCmp.name === itemCompany.name))
            }
          })
        })
      })
      // 入库数量统计
      this.productList = productList
      this.loading = false
    })
  },
  methods: {
    // 工序改变的时候，填写相应的单位
    getCompanyArr (index, indexCompany) {
      let companyArr = []
      this.productList.forEach((itemPro) => {
        let finded = itemPro.machiningType.find((item) => item.name === this.formList[index].typeCompany[indexCompany].type).companyArr
        finded.forEach((itemCmp) => {
          if (!companyArr.find((itemFind) => itemCmp.name === itemFind.name)) {
            companyArr.push(itemCmp)
          }
        })
      })
      this.formList[index].typeCompany[indexCompany].companyArr = companyArr
    },
    // 添加工序
    addTypeCompany (index) {
      this.formList[index].typeCompany.push({
        type: '',
        company: ''
      })
    },
    // 删除工序
    deleteTypeCompany (index, indexType) {
      this.formList[index].typeCompany.splice(indexType, 1)
    },
    // 添加公司
    addCompany () {
      this.formList.push({
        typeCompany: [{
          type: '',
          company: '',
          companyArr: []
        }],
        packNumber: [{
          colorSize: [],
          pack: '',
          number: ''
        }],
        complete_time: '',
        desc: ''
      })
    },
    // 删除公司
    deleteCompany (index) {
      this.formList.splice(index, 1)
    },
    // 添加颜色/尺码
    addSizeColor (index) {
      this.formList[index].packNumber.push({
        pack: '',
        number: '',
        colorSize: []
      })
    },
    // 删除颜色/尺码
    deleteSizeColor (index, indexColorSize) {
      this.formList[index].packNumber.splice(indexColorSize, 1)
    },
    saveAll () {
      let state = false
      let msg = ''
      this.formList.forEach((item) => {
        item.typeCompany.forEach((itemCompany) => {
          if (!itemCompany.company || itemCompany.type === '') {
            state = true
            msg = '检测到入库工序信息缺失'
          }
        })
        if (state) { return }
        item.packNumber.forEach((itemPack) => {
          if (!itemPack.pack || !itemPack.number) {
            state = true
            msg = '检测到件数/数量信息缺失'
          }
          if (!itemPack.colorSize[0]) {
            state = true
            msg = '检测到尺码颜色信息缺失'
          }
        })
        if (state) { return }
        if (!item.complete_time) {
          state = true
          msg = '检测到入库时间信息缺失'
        }
      })
      if (state) {
        this.$message.error({
          message: msg
        })
      } else {
        // 将入库工序 和 件数数量 数据展平
        let json = []
        // 先展开入库工序
        this.formList.forEach((item) => {
          item.typeCompany.forEach((itemCompany) => {
            item.packNumber.forEach((itemPackNumber) => {
              let completeTime = item.complete_time
              if (typeof (completeTime) === 'object') {
                completeTime = completeTime.getFullYear() + '-' + (completeTime.getMonth() > 9 ? completeTime.getMonth() + 1 : '0' + (completeTime.getMonth() + 1)) + '-' + (completeTime.getDate() > 10 ? completeTime.getDate() : '0' + completeTime.getDate())
              }
              json.push({
                order_id: this.$route.params.orderId,
                user_id: window.sessionStorage.getItem('user_id'),
                product_code: this.$route.params.productId,
                type: itemCompany.type,
                client_id: itemCompany.company,
                size: itemPackNumber.colorSize[0],
                color: itemPackNumber.colorSize[1],
                count: itemPackNumber.pack,
                number: itemPackNumber.number,
                complete_time: completeTime,
                desc: item.desc
              })
            })
          })
        })
        this.loading = true
        console.log(json)
        storeIn({ 'data': json }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '保存成功'
            })
            this.loading = false
            window.location.reload()
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      }
    },
    // 一件入库
    completion () {
      this.productList.forEach((itemPro) => {
        itemPro.machiningType.forEach((itemMach) => {
          itemMach.companyArr.forEach((itemCompany) => {
            if (itemCompany.inNum - itemCompany.num < 0) {
              this.formList.push({
                complete_time: new Date(),
                desc: '',
                packNumber: [{
                  colorSize: [itemPro.size, itemPro.color],
                  number: itemCompany.num - itemCompany.inNum,
                  pack: 1
                }],
                typeCompany: [{
                  company: itemCompany.id,
                  companyArr: [itemCompany],
                  type: itemMach.name
                }]
              })
            }
          })
        })
      })
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
.el-icon-plus {
  right: -3px !important;
  top: 11px !important;
}
em {
  &:hover {
    background-color: #1a95ff;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
