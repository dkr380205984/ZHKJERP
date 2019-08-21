<template>
  <div id="priceListDetail">
    <div class="head">
      <h2>报价单详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">报价单编号:</span>
          <span class="content blue">{{priceList.quotation_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">共计报价:</span>
          <span class="content">{{priceList.total_price}} 元</span>
        </div>
        <div class="inputCtn">
          <span class="label">审核状态:</span>
          <span class="content"
            :style="{'color':getColor(priceList.status)}">{{priceList.status|filterStatus}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">外贸公司:</span>
          <span class="content">{{priceList.client_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">联系人:</span>
          <span class="content">{{priceList.contact_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">结算单位:</span>
          <span class="content">{{priceList.account_unit}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">汇率:</span>
          <span class="content">{{priceList.exchange_rate}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">驳回理由:</span>
          <span class="content">
            <span v-for="(itemInfo,indexInfo) in JSON.parse(priceList.reason)"
              :key="itemInfo">{{indexInfo+1}}.{{itemInfo}} <br /></span>
          </span>
        </div>
        <div class="inputCtn">
          <span class="label">备注信息:</span>
          <span class="content">{{priceList.reason_text?priceList.reason_text:'暂无'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品信息:</span>
          <div class="productCtn"
            v-for="item in priceList.product_info"
            :key="item.id">
            <div class="infoCtn blue">
              <span class="titles">{{item.product_code}}</span>
              <div class="info">
                <span class="inline">{{item.product_info.category_info.product_category}} / {{item.product_info.type_name}} / {{item.product_info.style_name}}</span>
              </div>
            </div>
            <div class="infoCtn">
              <span class="titles">规格尺码</span>
              <div class="info">
                <div class="block"
                  v-for="(itemSize,indexSize) in item.size"
                  :key="indexSize">
                  <span class="inline">{{itemSize.size}}</span>
                  <span class="inline"
                    v-for="(itemGuige,indexGuige) in itemSize.guige"
                    :key="indexGuige">{{itemGuige.size_name}}：{{itemGuige.size_value}}cm</span>
                </div>
              </div>
            </div>
            <div class="infoCtn">
              <span class="titles">颜色色组</span>
              <div class="info">
                <span class="inline"
                  v-for="(itemColor,indexColor) in item.color"
                  :key="indexColor">{{itemColor}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品要求:</span>
          <span class="content">{{priceList.product_need?priceList.product_need:'暂无信息'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">报价单:</span>
          <div class="specialTable">
            <div class="tbox">
              <div class="box1"
                style="text-align:center;">
                <span class="content"
                  style="font-size:20px;">报价单</span>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.material_info)"
              :key="'material_info'+ index">
              <div class="box1">{{item.key?item.key:'原料费用'}}</div>
              <div class="box2">
                <div style="width:50%;display:inline-block;box-sizing:border-box;border-right:1px solid #ddd;position:relative">
                  {{item.weight?item.weight:0}}<em>克</em>
                </div>
                <div style="width:50%;display:inline-block;box-sizing:border-box;padding-left:15px;position:relative">
                  {{item.price?item.price:0}}<em>元</em>
                </div>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.assist_info)"
              :key="'assist_info'+ index">
              <div class="box1">{{item.key?item.key:'辅料费用'}}</div>
              <div class="box2">
                <div style="width:50%;display:inline-block;box-sizing:border-box;border-right:1px solid #ddd;position:relative">
                  {{item.weight?item.weight:0}}<em>数量</em>
                </div>
                <div style="width:50%;display:inline-block;box-sizing:border-box;padding-left:15px;position:relative">
                  {{item.price?item.price:0}}<em>元</em>
                </div>
              </div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.weave_info)"
              :key="'weave_info'+ index">
              <div class="box1">{{item.key?item.key:'制造明细'}}</div>
              <div class="box2">{{item.price?item.price:0}}<em>元</em></div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.semi_product_info)"
              :key="'semi_product_info'+ index">
              <div class="box1">{{item.key?item.key:'半成品加工'}}</div>
              <div class="box2">{{item.price?item.price:0}}<em>元</em></div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.pack_material_info)"
              :key="'pack_material_info'+ index">
              <div class="box1">{{item.key?item.key:'包装辅料'}}</div>
              <div class="box2">{{item.price?item.price:0}}<em>元</em></div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.user_info)"
              :key="'user_info'+ index">
              <div class="box1">{{item.key?item.key:'人工费用'}}</div>
              <div class="box2">{{item.price?item.price:0}}<em>元</em></div>
            </div>
            <div class="tbox"
              v-for="(item,index) in JSON.parse(priceList.desc_info)"
              :key="'desc_info'+ index">
              <div class="box1">{{item.key?item.key:'其他费用'}}</div>
              <div class="box2">{{item.price?item.price:0}}<em>元</em></div>
            </div>
            <div class="tbox">
            </div>
            <div class="tbox">
              <div class="box1">运输费用</div>
              <div class="box2">{{priceList.transport_cost}}<em>元</em></div>
            </div>
            <div class="tbox">
              <div class="box1">基本利润</div>
              <div class="box2">{{priceList.profit}}<em>元</em></div>
            </div>
            <div class="tbox">
              <div class="box1">基本佣金</div>
              <div class="box2">{{priceList.commission}}<em>元</em></div>
            </div>
            <div class="tbox">
              <div class="box1">基本税收</div>
              <div class="box2">{{priceList.tax}}<em>元</em></div>
            </div>
            <div class="tbox"
              style="height:100px">
              <div class="box1">备注：{{priceList.desc}}</div>
            </div>
            <div class="tbox">
              <div class="box1">
                <span>总计</span>
              </div>
              <div class="box2">
                <span style="color:#666;font-weight:500;font-size:22px;">{{priceList.total_price}}</span>
                <em class="unit">元</em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <span class="content">{{priceList.user_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建时间:</span>
          <span class="content">{{priceList.created_at}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新时间:</span>
          <span class="content">{{priceList.updated_at}}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="showBox = true">审核</div>
      </div>
    </div>
    <div class="messageBox"
      v-show="showBox">
      <div class="main">
        <div class="title">
          <span>审核报价单</span>
          <i class="el-icon-close"
            @click="showBox=false"></i>
        </div>
        <div class="contentCtn">
          <div class="box">
            <span class="label">是否通过：</span>
            <el-radio v-model="ifPass"
              :label="true">通过</el-radio>
            <el-radio v-model="ifPass"
              :label="false">驳回</el-radio>
          </div>
          <div class="box">
            <span class="label">驳回理由：</span>
            <el-checkbox-group v-model="checkList">
              <el-checkbox :disabled="ifPass"
                label="物料价格偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="织造费用偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="加工费用偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="包装费用偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="人工费用偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="运输费用偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="基本利润偏低"></el-checkbox>
              <el-checkbox :disabled="ifPass"
                label="整体报价偏低"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="box">
            <span class="label">备注信息：</span>
            <el-input type="textarea"
              placeholder="请输入备注信息（不超过30个字）"
              v-model="reasonText"
              :disabled="ifPass"
              maxlength="30"
              show-word-limit>
            </el-input>
          </div>
          <div class="oprBtn">
            <div class="btn cancle"
              @click="showBox=false">取消</div>
            <div class="btn submit"
              @click="check">确认</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { priceListDetail, priceListCheck } from '@/assets/js/api.js'
export default {
  data () {
    return {
      showBox: false,
      reasonText: '',
      ifPass: true,
      checkList: [],
      priceList: {
        account_unit: '',
        assist_info: '[]',
        client_name: '',
        commission: 0,
        contact_name: '',
        created_at: '',
        desc: '',
        desc_info: '[]',
        exchange_rate: '',
        material_info: '[]',
        pack_material_info: '[]',
        product_info: [],
        product_need: '',
        profit: 0,
        quotation_code: '',
        semi_product_info: '[]',
        tax: 0,
        transport_cost: 0,
        user_info: '[]',
        weave_info: '[]',
        updated_at: '',
        user_name: '',
        total_price: 0,
        reason_text: '',
        reason: '[]'
      }
    }
  },
  methods: {
    cmpPrice (val) {
      return (JSON.parse(val.material_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + JSON.parse(val.assist_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + JSON.parse(val.weave_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + JSON.parse(val.semi_product_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + JSON.parse(val.pack_material_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + JSON.parse(val.user_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + JSON.parse(val.desc_info).reduce((total, current) => {
        return total + Number(current.price)
      }, 0) + Number(val.transport_cost) + Number(val.profit) + Number(val.commission) + Number(val.tax)).toFixed(2)
    },
    getColor (val) {
      let arr = ['#ddd', '#1A95FF', '#67c23a', '#F56C6C']
      return arr[val]
    },
    check () {
      // 1初始 2通过 3驳回
      if (this.ifPass) {
        priceListCheck({
          id: this.$route.params.id
        }).then((res) => {
          this.$message.success({
            message: '审批通过'
          })
          this.showBox = false
        })
      } else {
        priceListCheck({
          id: this.$route.params.id,
          reason: JSON.stringify(this.checkList),
          reason_text: this.reasonText
        }).then((res) => {
          this.$message.success({
            message: '该报价单已驳回'
          })
        })
      }
    }
  },
  filters: {
    filterStatus (val) {
      let arr = ['暂无', '待审核', '已通过', '驳回']
      return arr[val]
    }
  },
  mounted () {
    priceListDetail({
      id: this.$route.params.id
    }).then((res) => {
      console.log(res)
      this.priceList = res.data.data
      this.priceList.total_price = this.cmpPrice(this.priceList)
      this.priceList.product_info = JSON.parse(this.priceList.product_info)
      console.log(this.priceList.product_info)
      this.priceList.product_info.forEach((itemPro) => {
        itemPro.color = []
        itemPro.size = []
        itemPro.colorSize.forEach((item) => {
          const arr = item.split('/')
          if (!itemPro.color.find((item) => item === arr[1])) { itemPro.color.push(arr[1]) }
          if (!itemPro.size.find((item) => item.size === arr[0])) { itemPro.size.push({ size: arr[0], guige: itemPro.product_info.size[arr[0]] }) }
        })
      })
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/priceListDetail.less";
.messageBox {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 600px;
    height: 430px;
    background: #fff;
    border-radius: 2px;
    .title {
      line-height: 54px;
      font-size: 20px;
      background: #1a95ff;
      color: #fff;
      padding-left: 15px;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }
    .el-icon-close {
      float: right;
      margin-right: 5px;
      margin-top: 5px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: #f56c6c;
      }
    }
    .contentCtn {
      padding: 20px;
      .box {
        position: relative;
        padding-left: 5em;
        line-height: 40px;
        margin-bottom: 20px;
        .label {
          position: absolute;
          left: 0;
          width: 5em;
          text-align: right;
        }
      }
      .oprBtn {
        display: flex;
        justify-content: center;
        .btn {
          padding: 6px 18px;
          border: 1px solid;
          margin: 0 20px;
          border-radius: 2px;
          cursor: pointer;
          box-sizing: border-box;
          &.cancle {
            color: #666666;
            border-color: #aaaaaa;
            &:hover {
              border-color: #48aaff;
              color: #48aaff;
            }
          }
          &.submit {
            color: #ffffff;
            background: @normalBlue;
            &:hover {
              background: @hoverBlue;
            }
          }
        }
      }
    }
  }
}
</style>
