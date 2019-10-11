<template>
  <div id="priceListDetail"
    v-loading='loading'>
    <div class="head">
      <h2>报价单详情
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
    </div>
    <div class="body">
      <div class="card">
        <div class="lineCtn">
          <div class="inputCtn strong">
            <span class="label">报价单编号:</span>
            <div class="content">{{priceTableDetail.code}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">创建人:</span>
            <div class="content">{{priceTableDetail.userName}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">共计报价:</span>
            <div class="content blue">{{Number(priceTableDetail.totalPrice).toFixed(2)}}元</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <div class="content">{{priceTableDetail.clientName}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">联系人:</span>
            <div class="content">{{priceTableDetail.linkMan}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">结算单位:</span>
            <div class="content">{{priceTableDetail.unit}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">汇率:</span>
            <div class="content">{{priceTableDetail.exchangeRate}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">驳回理由:</span>
            <div class="content">{{priceTableDetail.reasonText ? priceTableDetail.reasonText : '无'}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">更新时间:</span>
            <div class="content">{{priceTableDetail.updateTime}}</div>
          </div>
        </div>
        <div class="watermark"
          v-if="priceTableDetail.status === 3"
          :style="{'background-image':'url('+require('@/assets/image/icon/pass.png')+ ')'}"></div>
        <div class="watermark"
          v-else-if="priceTableDetail.status === 2"
          :style="{'background-image':'url('+require('@/assets/image/icon/tongguo.png')+ ')'}"></div>
        <div class="watermark"
          v-else
          :style="{'background-image':'url('+require('@/assets/image/icon/reasoning.png')+ ')'}"></div>
      </div>
      <div class="card"
        style="margin-top:16px;padding-bottom:40px;">
        <div class="headCtn">
          <span>产品信息</span>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品需求:</span>
            <div class="content">
              {{priceTableDetail.need ? priceTableDetail.need : '暂无需求内容'}}
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">起订数量:</span>
            <div class="content">
              {{priceTableDetail.number ? priceTableDetail.number + '件' : '暂无起订数量'}}
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn auto">
            <span class="label">产品信息:</span>
            <div class="content"
              style="width:972px">
              <div class="proBox"
                style="transform: translateX(0);"
                ref="proBox">
                <div class="proCtn active"
                  v-for="(item,key) in product_info"
                  :key="key">
                  <div class="
                  left">
                    <img :src="item.product_info.img.length > 0 ? item.product_info.img[0].image_url : require('@/assets/image/index/noPic.png')"
                      :alt="item.product_info.category_info.product_category + '图片'"
                      :title="item.product_info.category_info.product_category"
                      class="imgItem">
                    <span class="blue">{{item.product_code}}</span>
                    <span>{{item.product_info|filterType}}</span>
                  </div>
                  <ul class="right">
                    <li>
                      <span class="title">产品编号:</span>
                      <span class="info blue">{{item.product_code}}</span>
                    </li>
                    <li>
                      <span class="title">产品品类:</span>
                      <span class="info">{{item.product_info|filterType}}</span>
                    </li>
                    <li>
                      <span class="title">颜色色组:</span>
                      <span class="info">{{item.product_info|filterColor}}</span>
                    </li>
                    <li>
                      <span class="title">尺码规格:</span>
                      <span class="info">
                        <div class="sizeCtn"
                          v-for="(value,index) in item.product_info.size"
                          :key="index">
                          <span>{{value.measurement}}</span>
                          (
                          <span>规格：{{value.size_info}}，</span>
                          <span>克重：{{value.weight}}g</span>
                          <!-- <template v-for="(val,ind) in value">
                            <span :key="ind">{{val.size_name}}:</span>
                            <span :key="val.id">{{val.size_value}}cm</span>
                            <span v-if="ind === value.length - 1"
                              :key="ind+'x'">
                              克重:
                            </span>
                            <span v-if="ind === value.length - 1"
                              :key="ind+'y'">
                              {{val.weight}}g
                            </span>
                          </template> -->
                          )
                        </div>
                      </span>
                    </li>
                    <li>
                      <span class="title">产品描述:</span>
                      <span class="info">{{item.product_info.description ? item.product_info.description : '暂无描述信息'}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="pagesCtn left el-icon-arrow-left"
                @click="scroll('left')"></div>
              <div class="pagesCtn right el-icon-arrow-right"
                @click="scroll('right')"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card"
        style="margin-top:16px;padding-bottom:60px;">
        <div class="headCtn">
          <span>报价详情</span>
        </div>
        <div class="lineCtn">
          <!-- <div class="rightCtn">费用合计:<span>{{priceTableDetail.totalPrice}}</span>元</div> -->
        </div>
        <div class="lineCtn"
          style="margin-top:20px;">
          <div class="tabCtn">
            <div class="otherCtn">
              <span>产品费用</span>
            </div>
            <ul class="conCtn">
              <li class="title">
                <span>名称</span>
                <span>克重/数量</span>
                <span>单价</span>
                <span>损耗</span>
                <span>其他</span>
                <span>总价</span>
              </li>
              <li v-for="(item,key) in priceTableDetail.info"
                :key="key">
                <span>{{item.name ? item.name : '/'}}</span>
                <span>{{item.number ? item.number : '/'}}{{(item.unit && item.number) ? item.unit : ''}}</span>
                <span>{{item.price ? item.price : '/'}}{{item.price && item.unit ? '元/' + (item.unit === 'g' ? 'kg' : item.unit) : '' }}</span>
                <span>{{item.sunhao ? item.sunhao : '/'}}{{item.sunhao ? '%' : ''}}</span>
                <span>{{item.other ? item.other : '/'}}</span>
                <span>{{item.totalPrice ? item.totalPrice : 0}}元</span>
              </li>
            </ul>
            <div class="otherCtn bigFont">
              <span>合计</span>
              <span>{{priceTableDetail.product_total_price ? priceTableDetail.product_total_price : 0}}<em>元</em></span>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="tabCtn">
            <div class="otherCtn">
              <span>订单费用</span>
            </div>
            <ul class="conCtn">
              <li class="title">
                <span>名称</span>
                <span>费用比例</span>
                <span>总价</span>
              </li>
              <li>
                <span>基本佣金</span>
                <span>{{priceTableDetail.yongjin.prop}}%</span>
                <span>{{priceTableDetail.yongjin.price}}元</span>
              </li>
              <li>
                <span>基本税费</span>
                <span>{{priceTableDetail.shuifei.prop}}%</span>
                <span>{{priceTableDetail.shuifei.price}}元</span>
              </li>
              <li>
                <span>基本利润</span>
                <span>{{priceTableDetail.lirun.prop}}%</span>
                <span>{{priceTableDetail.lirun.price}}元</span>
              </li>
            </ul>
            <div class="otherCtn bigFont">
              <span>合计</span>
              <span>{{priceTableDetail|filterPrice}}<em>元</em></span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <span class="total">费用合计:<span style="font-size:24px;color:#1A94FF;margin:0 8px;font-weight:500">{{Number(priceTableDetail.totalPrice).toFixed(2)}}</span>元</span>
        <div class="btnCtn">
          <span class="change"
            @click="$router.push('/priceListTable/' + $route.params.id)">打印</span>
          <span class="change"
            @click="$router.push('/index/priceListUpdate/' + $route.params.id)">修改</span>
          <span class="clear"
            @click="$router.push('/index/priceListList')">返回</span>
          <span class="submit"
            @click="showBox = true">审核</span>
        </div>
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
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>

<script>
import { priceListDetail, priceListCheck, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'priceListDetail',
      showMsg: false,
      msgFlag: window.localStorage.getItem('priceListDetail') ? JSON.parse(window.localStorage.getItem('priceListDetail')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      showBox: false,
      ifPass: true,
      reasonText: '',
      checkList: [],
      priceTableDetail: {
        code: '',
        userName: '',
        totalPrice: '',
        clientName: '',
        linkMan: '',
        unit: '',
        exchangeRate: '',
        reasonText: '',
        updateTime: '',
        need: '',
        info: [],
        yongjin: {
          prop: '',
          price: ''
        },
        shuifei: {
          prop: '',
          price: ''
        },
        lirun: {
          prop: '',
          price: ''
        }
      },
      product_info: []
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
          if (this.ifPass) {
            this.$message.success('审核通过')
          } else {
            this.$message.success('该报价单已驳回')
          }
          this.$router.push(this.msgUrl)
        }
      })
    },
    check () {
      // 1初始 2通过 3驳回
      if (this.ifPass) {
        priceListCheck({
          id: this.$route.params.id
        }).then((res) => {
          if (this.msgFlag) {
            this.msgUrl = '/index/priceListDetail/' + this.$route.params.id
            this.content = '<span style="color:#1A95FF">审核通过</span>报价单' + '<span style="color:#1A95FF">' + this.priceTableDetail.code + '</span>'
            this.sendMsg()
          } else {
            this.$message.success('审核通过')
            this.$router.push('/index/priceListDetail/' + this.$route.params.id)
          }
          this.showBox = false
        })
      } else {
        priceListCheck({
          id: this.$route.params.id,
          reason: JSON.stringify(this.checkList),
          reason_text: this.reasonText
        }).then((res) => {
          if (this.msgFlag) {
            this.msgUrl = '/index/priceListDetail/' + this.$route.params.id
            this.content = '<span style="color:#FF4D4D">驳回</span>报价单' + '<span style="color:#1A95FF">' + this.priceTableDetail.code + '</span>'
            this.sendMsg()
          } else {
            this.$message.success('该报价单已驳回')
            this.$router.push('/index/priceListDetail/' + this.$route.params.id)
          }
        })
      }
    },
    scroll (direction) {
      let dom = this.$refs.proBox
      let maxWidth = dom.offsetWidth - 972
      if (maxWidth < 0) {
        return
      }
      let nowPosition = Number(dom.style.transform.split('(')[1].split('px')[0])
      if (direction === 'left') {
        nowPosition += 100
      } else if (direction === 'right') {
        nowPosition -= 100
      }
      if (nowPosition > 0) {
        nowPosition = 0
      } else if (nowPosition < (0 - maxWidth)) {
        nowPosition = -maxWidth
      }
      dom.style.transform = 'translateX(' + nowPosition + 'px)'
    }
  },
  filters: {
    // filterStatus (val) {
    //   let arr = ['暂无', '待审核', '已通过', '驳回']
    //   return arr[val]
    // },
    filterColor (item) {
      console.log(item)
      return item.color.map(val => {
        return val.color_name
      }).join('/')
    },
    filterType (item) {
      return item.category_info.product_category + '/' + item.type_name + '/' + item.style_name
    },
    filterPrice (item) {
      return (Number(item.yongjin.price ? item.yongjin.price : 0) + Number(item.lirun.price ? item.lirun.price : 0) + Number(item.shuifei.price ? item.shuifei.price : 0)).toFixed(2)
    }
  },
  created () {
    priceListDetail({
      id: this.$route.params.id
    }).then((res) => {
      let data = res.data.data
      this.priceTableDetail.code = data.quotation_code
      this.priceTableDetail.userName = data.user_name
      this.priceTableDetail.totalPrice = data.total_price
      this.priceTableDetail.clientName = data.client_name
      this.priceTableDetail.linkMan = data.contact_name
      this.priceTableDetail.unit = data.account_unit
      this.priceTableDetail.exchangeRate = data.exchange_rate
      this.priceTableDetail.number = data.number
      this.priceTableDetail.updateTime = data.updated_at
      this.priceTableDetail.info.push(
        ...JSON.parse(data.material_info).map(item => {
          return {
            name: item.key ? item.key : '原料',
            number: item.weight,
            price: item.price,
            sunhao: item.sunhao,
            totalPrice: item.total_price,
            unit: 'g'
          }
        }),
        ...JSON.parse(data.assist_info).map(item => {
          return {
            name: item.key ? item.key : '辅料',
            number: item.weight,
            price: item.price,
            sunhao: item.sunhao,
            totalPrice: item.total_price,
            unit: item.unit
          }
        }),
        ...JSON.parse(data.weave_info).map(item => {
          return {
            name: item.key ? item.key : '织造',
            number: item.number,
            totalPrice: item.price
          }
        }),
        ...JSON.parse(data.semi_product_info).map(item => {
          return {
            name: item.key && item.key.length !== 0 ? item.key.join('/') : '半成品加工',
            totalPrice: item.price
          }
        }),
        ...JSON.parse(data.production_info).map(item => {
          return {
            name: item.key && item.key.length !== 0 ? item.key.join('/') : '成品加工',
            totalPrice: item.price
          }
        }),
        ...JSON.parse(data.pack_material_info).map(item => {
          return {
            name: item.key ? item.key : '包装',
            totalPrice: item.price
          }
        }),
        ...JSON.parse(data.desc_info).map(item => {
          return {
            name: item.key ? item.key : '其他',
            totalPrice: item.price
          }
        }),
        { name: '非生产费用', totalPrice: data.no_product_cost },
        { name: '运输', totalPrice: data.transport_cost }
      )
      this.priceTableDetail.product_total_price = (this.priceTableDetail.info.reduce((total, item) => {
        return Number(total.totalPrice ? total.totalPrice : total) + Number(item.totalPrice ? item.totalPrice : 0)
      })).toFixed(2)
      this.priceTableDetail.yongjin = JSON.parse(data.commission)
      this.priceTableDetail.shuifei = JSON.parse(data.tax)
      this.priceTableDetail.lirun = JSON.parse(data.profit)
      this.priceTableDetail.reasonText = data.reason ? JSON.parse(data.reason).join(',') : ''
      this.priceTableDetail.need = data.product_need
      this.priceTableDetail.status = data.status
      this.product_info = JSON.parse(data.product_info).map(item => {
        return {
          show: false,
          ...item
        }
      })
      console.log(this.product_info)
      this.loading = false
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
