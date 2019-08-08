<template>
  <div id="rawMaterialOrderDetail"
    v-loading="loading">
    <div class="head">
      <h2>原料预定购详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">预订购信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订购单位:</span>
            <span class="content">{{otherInfo.client_name}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">订购日期:</span>
            <span class="content">{{otherInfo.order_time.slice(0,10)}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订购总量:</span>
            <span class="content">{{otherInfo.total_weight}}千克</span>
          </div>
          <div class="inputCtn">
            <span class="label">预付款:</span>
            <span class="content">{{otherInfo.total_price}}元</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">剩余总量:</span>
            <span class="content">{{otherInfo.total_weight - otherInfo.leaveWeight}}千克</span>
          </div>
          <div class="inputCtn">
            <span class="label">入库原料总价:</span>
            <span class="content">{{parseInt(cost)}}元<span v-if="cost - otherInfo.total_price>0"
                style="color:#F56C6C">（还须支付{{parseInt(cost - otherInfo.total_price)}}元）</span></span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">备注信息:</span>
            <span class="content">{{otherInfo.desc?otherInfo.desc:'暂无备注'}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料入库信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col"
          v-for="(item,key) in list"
          :key="key">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn"
                style="width:900px">
                <li class="title">
                  <span style="flex:1.5">原料名称</span>
                  <span>颜色</span>
                  <span>包装</span>
                  <span>价格</span>
                  <span>入库仓库</span>
                  <span>入库数量</span>
                  <span>总重量</span>
                </li>
                <li class="material_info">
                  <span style="flex:1.5">{{item.material_name}}</span>
                  <span class="col"
                    style="flex:5">
                    <span v-for="(itemColor,indexColor) in item.info"
                      :key="indexColor">
                      <span>{{itemColor.color_code}}</span>
                      <span>{{itemColor.attribute}}</span>
                      <span>{{itemColor.price}}元/kg</span>
                      <span class="col"
                        style="flex:2">
                        <span v-for="(itemCompany,indexCompany) in itemColor.Arr"
                          :key="indexCompany">
                          <span>{{itemCompany.company?itemCompany.company:'本厂仓库'}}</span>
                          <span>{{itemCompany.number}}kg</span>
                        </span>
                        <span v-if="itemColor.Arr.length===0">暂无入库信息</span>
                      </span>
                    </span>
                  </span>
                  <span>{{item.allNumber}}kg</span>
                </li>
              </ul>
              <div class="buyInfo">
                <ul class="buyFrom"
                  v-for="(iten,kay) in item.stockInfo"
                  :key="kay">
                  <li>
                    <span>原料颜色</span>:
                    <el-select v-model="iten.materialColor"
                      placeholder="请选择原料颜色"
                      size="small">
                      <el-option v-for="value in item.colors"
                        :key="value"
                        :value="value">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>包装属性</span>:
                    <el-select v-model="iten.materialAtr"
                      placeholder="请选择包装属性"
                      size="small">
                      <el-option v-for="item in attr"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"></el-option>
                    </el-select>
                  </li>
                  <li v-for="(value,index) in iten.stockWeightInfo"
                    :key="index"
                    class="col">
                    <div>
                      <span>批号/缸号</span>:
                      <el-input size="small"
                        placeholder="请输入批号/缸号"
                        v-model="value.dyelot_number"
                        style="width:243px;">
                      </el-input>
                    </div>
                    <div>
                      <span>件数/数量</span>:
                      <el-input size="small"
                        placeholder="件数"
                        v-model="value.number">
                        <template slot="append">件</template>
                      </el-input>
                      <el-input size="small"
                        placeholder="数量"
                        v-model="value.weight">
                        <template slot="append">{{item.unit}}</template>
                      </el-input>
                    </div>
                    <em v-if="index === 0"
                      class="el-icon-plus"
                      @click="appendStockWeightInfo(key,kay)"></em>
                    <em v-else
                      class="el-icon-delete"
                      @click="deleteStockWeightInfo(key,kay,index)"></em>
                  </li>
                  <li>
                    <span>仓库</span>:
                    <el-select v-model="iten.company"
                      size="small"
                      placeholder="请选择仓库">
                      <el-option v-for="item in companyArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </li>
                  <li>
                    <span>入库时间</span>:
                    <el-date-picker v-model="iten.stock_time"
                      align="right"
                      type="date"
                      placeholder="选择入库时间"
                      size="small"
                      style="width:243px"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </li>
                  <li>
                    <span>备注</span>:
                    <el-input type="textarea"
                      placeholder="请输入内容"
                      style="width:243px;margin: 0 0 0 15px;height:45px;"
                      v-model="iten.remark">
                    </el-input>
                  </li>
                  <span class="el-icon-close"
                    @click="deleteStockInfo(key,kay)"></span>
                </ul>
              </div>
              <div class="addBtn"
                @click="addStockInfo(key)">
                <span>+</span>
                <span>添加原料</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料入库日志</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding maxWidth">
            <div class="content">
              <ul class="log"
                style="width:900px">
                <div>
                  <li>
                    <span>时间</span>
                    <span style="flex:2">原料名称</span>
                    <span>原料颜色</span>
                    <span>包装属性</span>
                    <span>原料价格</span>
                    <span>入库仓库</span>
                    <span>入库重量</span>
                    <span>备注</span>
                    <span>操作人</span>
                    <span>操作</span>
                  </li>
                </div>
                <div v-for="(item,index) in logList"
                  :key="index">
                  <li>
                    <span>{{item.complete_time.slice(0,10)}}</span>
                    <span style="flex:2">{{item.material_name}}</span>
                    <span>{{item.color_code}}</span>
                    <span>{{item.attribute}}</span>
                    <span>{{item.price}}元/kg</span>
                    <span>{{item.stock_name?item.stock_name:'本厂仓库'}}</span>
                    <span>{{item.weight}}kg</span>
                    <span>{{item.desc}}</span>
                    <span>{{item.user_name}}</span>
                    <span style="cursor:pointer;color:#F56C6C"
                      @click="updateLog(item)">删除</span>
                  </li>
                </div>
                <li v-if="logList.length===0">
                  <span>暂无日志信息</span>
                </li>
              </ul>
            </div>
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
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="close"
          @click="showShade=false">
          <span class="icon">x</span>
        </div>
        <div class="title">修改日志信息</div>
        <div class="inputCtn">
          <span class="label">原料信息:</span>
          <div class="elCtn">
            {{updateInfo.material_name}} （{{updateInfo.color_code}}）
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">入库仓库:</span>
          <div class="elCtn">
            {{updateInfo.stock_name?updateInfo.stock_name:'本厂仓库'}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">包装属性:</span>
          <div class="elCtn">
            {{updateInfo.attribute}}
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>入库数量:</span>
          <div class="elCtn">
            <el-input v-model="updateInfo.weight"
              placeholder="请输入入库数量">
              <template slot="append">kg</template>
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>备注信息:</span>
          <div class="elCtn">
            <el-input v-model="updateInfo.desc"
              placeholder="请输入备注信息（该项必填）">
            </el-input>
          </div>
        </div>
        <div class="btnCtn">
          <div class="okBtn"
            @click="updateLogFn">修改</div>
          <div class="cancleBtn"
            @click="showShade=false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rawMaterialPurchaseDetail, clientList, rawMaterialPurchaseIn } from '@/assets/js/api.js'
export default {
  data () {
    return {
      updateInfo: {
        stock_id: '',
        material_order_id: '',
        material_name: '',
        vat_code: '',
        color_code: '',
        attribute: '',
        price: '',
        desc: '',
        total_weight: '',
        complete_time: '',
        number: ''
      },
      showShade: false,
      loading: true,
      companyArr: [],
      cost: 0,
      attr: [{ name: '足斤包装' }, { name: '98包装' }, { name: '95包装' }],
      company: '',
      defaultStock: '桐庐凯瑞针纺有限公司',
      materialList: [],
      processList: [],
      list: [],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      otherInfo: {
        client_name: '',
        total_price: '',
        total_weight: '',
        desc: '',
        order_time: '',
        leaveWeight: ''
      },
      logList: []
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
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
    appendStockWeightInfo (key, kay) {
      this.list[key].stockInfo[kay].stockWeightInfo.push({
        dyelot_number: '',
        number: '',
        weight: ''
      })
    },
    deleteStockWeightInfo (key, kay, index) {
      this.list[key].stockInfo[kay].stockWeightInfo.splice(index, 1)
    },
    addStockInfo (key) {
      this.list[key].stockInfo.push(
        {
          company: '',
          materialColor: '',
          materialAtr: '',
          remark: '',
          stock_time: this.now_time,
          stockWeightInfo: [
            {
              dyelot_number: '',
              number: '',
              weight: ''
            }
          ]
        }
      )
    },
    deleteStockInfo (key, kay) {
      this.list[key].stockInfo.splice(kay, 1)
    },
    // 点击修改日志
    updateLog (item) {
      this.updateInfo = item
      this.updateInfo.company_id = window.sessionStorage.getItem('company_id')
      this.updateInfo.user_id = window.sessionStorage.getItem('user_id')
      // this.showShade = true
      this.updateLogFn()
    },
    // 预定购日志修改
    updateLogFn () {
      // delete this.updateInfo.user_name
      // delete this.updateInfo.stock_name
      // if (!this.updateInfo.desc) {
      //   this.$message.error({
      //     message: '请填写本次修改日志原因'
      //   })
      // }
      // this.updateInfo.material_order_id = this.updateInfo.id
      rawMaterialPurchaseIn({
        data: [this.updateInfo]
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          window.location.reload()
          // this.$router.go(-1)
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    saveAll () {
      let flag = true
      let formArray = []
      this.list.forEach(item => {
        item.stockInfo.forEach(val => {
          val.stockWeightInfo.forEach(value => {
            let obj = {}
            obj.price = item.info.find((itemFind) => itemFind.color_code === val.materialColor).price
            obj.company_id = window.sessionStorage.getItem('company_id')
            obj.user_id = window.sessionStorage.getItem('user_id')
            obj.material_name = item.material_name
            obj.vat_code = (value.dyelot_number ? value.dyelot_number : 'vat_null')
            if (!val.materialColor) {
              this.$message({
                message: '请选择颜色',
                type: 'error'
              })
              flag = false
              return
            }
            if (!value.number) {
              this.$message({
                message: '请输入件数',
                type: 'error'
              })
              flag = false
              return
            }
            if (value.weight === '0') {
              this.$message({
                message: '数量不可为0',
                type: 'error'
              })
              flag = false
              return
            } else if (!value.weight) {
              this.$message({
                message: '请输入数量',
                type: 'error'
              })
              flag = false
              return
            }
            if (val.company === '') {
              this.$message({
                message: '请选择入库仓库',
                type: 'error'
              })
              flag = false
              return
            }
            if (!val.stock_time) {
              this.$message({
                message: '请选择入库时间',
                type: 'error'
              })
              flag = false
              return
            }
            obj.material_order_id = this.$route.params.id
            obj.stock_id = val.company
            obj.company_id = window.sessionStorage.getItem('company_id')
            obj.color_code = val.materialColor
            obj.number = value.number
            obj.weight = value.weight
            obj.complete_time = val.stock_time
            obj.desc = val.remark
            obj.attribute = val.materialAtr
            obj.type = 1
            formArray.push({ ...obj })
          })
        })
      })
      const totalWeight = this.list.reduce((total1, current1) => {
        return total1 + Number(current1.stockInfo.reduce((total2, current2) => {
          return total2 + Number(current2.stockWeightInfo.reduce((total3, current3) => {
            return total3 + Number(current3.weight)
          }, 0))
        }, 0))
      }, 0)
      if (totalWeight > (this.otherInfo.total_weight - this.otherInfo.leaveWeight)) {
        flag = false
        this.$message.error({
          message: '入库总量已超过与订购数量，请重新输入'
        })
      }
      if (flag) {
        rawMaterialPurchaseIn({
          data: formArray
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            window.location.reload()
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      }
      console.log(formArray)
    }
  },
  watch: {

  },
  created () {
    this.loading = false
    // 数据模拟
    rawMaterialPurchaseDetail({
      id: this.$route.params.id
    }).then((res) => {
      this.otherInfo = res.data.data.data_one
      this.logList = res.data.data.data_stock
      let stock = res.data.data.data_stock
      let materialList = JSON.parse(res.data.data.data_one.material_info)
      // 对同种类型的纱线进行合并
      this.list = this.jsonMerge(materialList, ['material_name']).map((item) => {
        item.colors = item.info.map((itemColor) => {
          return itemColor.color_code
        })
        // 合并入库信息
        item.info.forEach((itemInfo) => {
          itemInfo.Arr = []
          stock.forEach((itemStock) => {
            if (itemStock.material_name === item.material_name && itemStock.color_code === itemInfo.color_code && itemStock.price === itemInfo.price) {
              let finded = itemInfo.Arr.find((itemFind) => itemFind.company === itemStock.stock_name)
              if (finded) { finded.number += itemStock.total_weight } else { itemInfo.Arr.push({ 'company': itemStock.stock_name, 'number': itemStock.weight }) }
            }
          })
        })
        item.allNumber = item.info.reduce((total, current) => {
          return total + current.Arr.reduce((total2, current2) => {
            return total2 + current2.number
          }, 0)
        }, 0)
        item.stockInfo = []
        item.unit = 'kg'
        return item
      })
      this.otherInfo.leaveWeight = this.list.reduce((total, current) => {
        return total + parseInt(current.allNumber)
      }, 0)
      // 算总价
      this.cost = stock.reduce((total, current) => {
        return total + current.price * current.total_weight
      }, 0)
      console.log(this.cost)
    })
    clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      this.companyArr = res.data.data.filter((item) => { return (item.type.find((finded) => finded === 3)) })
      this.companyArr.unshift({
        id: 0,
        name: '本厂仓库'
      })
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
.buyInfo {
  width: 900px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  & > .buyFrom {
    position: relative;
    margin-top: 30px;
    background-color: #f6f6f6;
    width: 417px;
    height: 480px;
    overflow-y: scroll;
    padding: 35px 35px 35px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // transition: height 1s ease-in-out;
    &:nth-child(2n) {
      margin-left: 66px;
    }
    & > .el-icon-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      border-radius: 50%;
      &:hover {
        background-color: @normalBlue;
        color: #fff;
      }
    }
    & > li {
      position: relative;
      height: auto;
      width: 100%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      &.col {
        flex-direction: column;
        align-items: flex-start;
      }
      &:first-child {
        margin: 0;
      }
      & > span {
        display: inline-block;
        width: 5em;
        text-align: right;
        font-size: 14px;
      }
      & > .el-select {
        margin: 0 0 0 15px;
        width: 243px;
      }
      & > .el-input {
        width: 243px;
        margin: 0 0 0 15px;
      }
      & > div {
        margin-top: 20px;
        display: flex;
        align-items: center;
        &:first-child {
          margin: 0;
        }
        & > span {
          width: 5em;
          text-align: right;
          font-size: 14px;
        }
        & > .el-select {
          width: 243px;
          margin: 0 0 0 15px;
        }
        & > .el-input {
          width: 115px;
          margin: 0 0 0 13px;
        }
      }
      & > em {
        position: absolute;
        right: -10px;
        top: 5px;
        cursor: pointer;
        &:hover {
          background-color: @normalBlue;
          color: #fff;
          border-radius: 50%;
        }
      }
    }
  }
}
.addBtn {
  width: 6em;
  padding: 0 18px;
  height: 38px;
  line-height: 38px;
  border-radius: 2px;
  background: #fff;
  margin-top: 15px;
  cursor: pointer;
  color: #909399;
  border: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  &:hover {
    color: #10aef5;
    border-color: #10aef5;
  }
  span {
    font-size: 20px;
    vertical-align: text-top;
    &:nth-child(2) {
      margin-left: 5px;
      font-size: 16px;
    }
  }
}
#rawMaterialOrderDetail {
  .shade {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .main {
      position: absolute;
      width: 640px;
      height: 560px;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #ffffff;
      overflow: hidden;
      border-radius: 4px;
      .close {
        position: absolute;
        right: -30px;
        top: -30px;
        width: 60px;
        height: 60px;
        background: #1a95ff;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: #48aaff;
        }
        .icon {
          position: absolute;
          left: 15px;
          bottom: 7px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .title {
        line-height: 66px;
        font-size: 22px;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 20px;
        position: relative;
        font-size: 16px;
        padding-left: 5em;
        height: 40px;
        line-height: 40px;
        color: #666;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 5em;
          color: #666;
          em {
            color: #f56c6c;
            line-height: 40px;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          margin-left: 15px;
          width: 400px;
        }
      }
      .btnCtn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
    }
  }
}
</style>
