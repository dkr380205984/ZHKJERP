<template>
  <div id="rawMaterialProcess">
    <div class="head">
      <h2>产品入库</h2>
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
                  <span style="flex:7;">
                    <span>配色/尺码</span>
                    <span>下单数</span>
                    <span>库存调取数</span>
                    <span>生产计划数</span>
                    <span>入库工序</span>
                    <span>入库数量</span>
                  </span>
                </li>
                <li class="material_info">
                  <span style="color:#1A95FF">{{productList[0]?productList[0].product_code:''}}</span>
                  <span>{{productList[0]?productList[0].category_name:''}}/{{productList[0]?productList[0].type_name:''}}/{{productList[0]?productList[0].style_name:''}}</span>
                  <span style="flex:7;"
                    class="col">
                    <span v-for="(item,index) in productList"
                      :key="index">
                      <span>{{item.color}}/{{item.size}}</span>
                      <span>{{item.order_num}}{{item.unit_name}}</span>
                      <span>{{item.stock_pick}}{{item.unit_name}}</span>
                      <span>{{item.production_num}}{{item.unit_name}}</span>
                      <span class="col"
                        style="flex:2">
                        <span v-for="(itemIn,indexIn) in item.in"
                          :key="indexIn">
                          <span>{{itemIn.type}}</span>
                          <span>{{itemIn.number}}{{item.unit_name}}</span>
                        </span>
                        <span style="align-items:center"
                          v-if="item.in.length===0">暂无入库信息</span>
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
                    multiple
                    size="small"
                    style="width:114px">
                    <el-option v-for="item in machiningType"
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
                    <el-option v-for="item in companyArr"
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
import { clientList, productionDetail, storeIn, storeInList } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      machiningType: machiningType,
      colorSizeArr: [],
      formList: [{
        typeCompany: [{
          type: '',
          company: ''
        }],
        packNumber: [{
          colorSize: [],
          pack: '',
          number: ''
        }],
        complete_time: '',
        desc: ''
      }]
    }
  },
  mounted () {
    Promise.all([clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }), productionDetail({
      order_id: this.$route.params.orderId
    }), storeInList({
      order_id: this.$route.params.orderId
    })]).then((res) => {
      this.companyArr = res[0].data.data.filter((item) => { return (item.type.indexOf(4) !== -1 || item.type.indexOf(5) !== -1 || item.type.indexOf(6) !== -1) })
      this.order = res[1].data.data.production_detail.order_info
      let productList = res[1].data.data.production_detail.product_info.filter((item) => item.product_code === this.$route.params.productId)
      let logListIn = res[2].data.data
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
      // 入库入库数量统计
      productList.map((item) => {
        let json = item
        json.in = []
        logListIn.forEach((itemLog) => {
          if (itemLog.product_info.product_code === item.product_code && itemLog.color === item.color && itemLog.size === item.size) {
            let mark = -1
            let finded = json.in.find((itemFind, indexFind) => {
              if (itemFind.type === itemLog.type) {
                mark = indexFind
                return itemFind.type === itemLog.type
              }
            })
            if (!finded) {
              json.in.push({
                'type': itemLog.type,
                'number': itemLog.number
              })
            } else {
              json.in[mark].number += itemLog.number
            }
          }
        })
        return json
      })
      this.productList = productList
      console.log(this.productList)
    })
  },
  methods: {
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
          company: ''
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
          if (!itemCompany.company || !itemCompany.type) {
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
              json.push({
                order_id: this.$route.params.orderId,
                user_id: window.sessionStorage.getItem('user_id'),
                product_code: this.$route.params.productId,
                type: JSON.stringify(itemCompany.type),
                client_id: itemCompany.company,
                size: itemPackNumber.colorSize[0],
                color: itemPackNumber.colorSize[1],
                count: itemPackNumber.pack,
                number: itemPackNumber.number,
                complete_time: item.complete_time,
                desc: item.desc
              })
            })
          })
        })
        console.log(json)
        storeIn({ 'data': json }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '保存成功'
            })
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      }
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
