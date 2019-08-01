<template>
  <div id="foreignTradeFinancialDetail">
    <div class="head">
      <h2>外贸公司详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司名称:</span>
          <span class="content">{{'杭州飞泰'}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司简称:</span>
          <span class="content">{{'飞泰'}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司类型:</span>
          <span class="content">{{'染色'}}</span>
        </div>
        <div class="rightCtn">
          <span class="totalPrice">
            <span class="label">共计:</span>
            <span class="content">{{80000}}元</span>
          </span>
          <span class="settlement">
            <span>
              <span class="label">已结算:</span>
              <span class="content">{{6000}}元</span>
            </span>
            <span>
              <span class="label">待结算:</span>
              <span class="content">{{80000-6000}}元</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn"
        style="flex-direction:row;">
        <span :class="{cutList:true,active:flag}"
          @click="flag =true">转账列表</span>
        <span :class="{cutList:true,active:!flag}"
          @click="flag = false">扣款列表</span>
      </div>
      <div class="lineCtn"
        v-show="flag">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select v-model="selectVal"
              style="margin-left:20px;"
              placeholder="请选择">
              <el-option v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker v-model="data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="addBtn"
            @click="transfer.flag = true">+转账记录</div>
        </div>
        <div class="table">
          <div class="title">
            <span @click="filterOption.orderFilterFlag = !filterOption.orderFilterFlag"
              class="icon">
              转账日期
              <em class="el-icon-caret-top"
                :style="{color:filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
              <em class="el-icon-caret-bottom"
                :style="{color:!filterOption.orderFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            </span>
            <span>转账属性</span>
            <span @click="filterOption.timeFilterFlag = !filterOption.timeFilterFlag"
              class="icon">
              转账金额
              <em class="el-icon-caret-top"
                :style="{color:filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
              <em class="el-icon-caret-bottom"
                :style="{color:!filterOption.timeFilterFlag ? '#9A9A9A' : '#FFF'}"></em>
            </span>
            <span>转账说明</span>
            <span>转账凭证</span>
            <span>其他</span>
            <span>操作</span>
          </div>
          <ul class="infinite-list"
            @mousewheel="getPayData">
            <li v-for="(item,key) in payList"
              :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>{{item.pay_time}}</span>
                <span>{{item.pay_type}}</span>
                <span>{{item.pay_money}}{{item.price_unit}}</span>
                <span>{{item.desc ? item.desc : '无'}}</span>
                <span>img</span>
                <span>{{item.other ? item.other : '无'}}</span>
                <span>
                  <span class="btn"
                    @click="$router.push('/index/foreignTradeFinancialDetail/' + item.id)">详情</span>
                  <span class="btn change">修改</span>
                </span>
              </div>
            </li>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span>{{450021|filterNumber}}元</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        v-show="!flag">
        <div class="selectCtn">
          <div class="select">
            <span class="label">筛选条件:</span>
            <el-select v-model="selectVal"
              style="margin-left:20px;"
              placeholder="请选择">
              <el-option v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker v-model="data"
              type="daterange"
              align="right"
              style="margin-left:20px;"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="management"
            @click="cutPay.flag = true">
            <template v-if="cutPay.flag">
              <span class="handle">结算</span>
              <span class="handle">扣款</span>
            </template>
            <span class="handle handleMain">{{!cutPay.flag ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <el-checkbox-group v-model="checkAllFlag"
          class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                @change="checked('all')"
                v-if="cutPay.flag"></el-checkbox>
              订单号
            </span>
            <span>下单日期</span>
            <span>外贸公司</span>
            <span>合作项目</span>
            <span>具体金额</span>
            <span>扣款金额</span>
            <span>扣款原因</span>
            <span>合计金额</span>
            <span>已结算</span>
            <span>待结算</span>
            <span class="flex15">操作</span>
          </div>
          <ul class="infinite-list"
            @mousewheel="getCutPayData">
            <li v-for="(item,key) in cutPayList"
              :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>
                  <el-checkbox class="checkBox"
                    v-if="cutPay.flag"
                    :checked="checkAllFlag"></el-checkbox>
                  {{item.order_code}}
                </span>
                <span>{{item.order_time}}</span>
                <span>{{item.client_name}}</span>
                <span>{{item.cooperation_type}}</span>
                <span>{{item.total_price}}元</span>
                <span>{{item.cutPay_price}}元</span>
                <span>{{item.cutPay_why}}</span>
                <span>{{item.total_price - item.cutPay_price}}元</span>
                <span>{{item.compiled_pay}}元</span>
                <span>{{item.total_price - item.cutPay_price - item.compiled_pay}}元</span>
                <span class="flex15">
                  <span class="btn"
                    @click="$router.push('/index/foreignTradeFinancialDetail/' + item.id)">详情</span>
                  <span class="btn change">结算</span>
                  <span class="btn cutPay">扣款</span>
                </span>
              </div>
            </li>
          </ul>
          <div class="footer">
            <span>合计</span>
            <span></span>
            <span></span>
            <span></span>
            <span>{{450454512|filterNumber}}元</span>
            <span>{{(450454512.01)|filterNumber}}元</span>
            <span></span>
            <span>{{450454512|filterNumber}}元</span>
            <span>{{450454512|filterNumber}}元</span>
            <span>{{450454512|filterNumber}}元</span>
            <span class="flex15"></span>
          </div>
        </el-checkBox-group>
      </div>
    </div>
    <div class="window"
      v-show="transfer.flag">
      <div class="title">添加转账记录</div>
      <div class="content">
        <div class="lineCtn">
          <span class="label">转账日期:</span>
          <el-date-picker v-model="transfer.time"
            class="inputBox"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="lineCtn">
          <span class="label">转账类型:</span>
          <el-radio v-model="transfer.type"
            label="1">收款</el-radio>
          <el-radio v-model="transfer.type"
            label="2">付款</el-radio>
        </div>
        <div class="lineCtn">
          <span class="label">转账方式:</span>
          <el-select v-model="transfer.class"
            class="inputBox"
            placeholder="请选择转账方式">
            <el-option v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="lineCtn">
          <span class="label">转账金额:</span>
          <el-input v-model="transfer.total_price"
            class="inputBox"
            placeholder="请输入转账金额"></el-input>
        </div>
        <div class="lineCtn">
          <span class="label">上传图片:</span>
          <el-upload action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="changeImg"
            :on-progress="handleDownload"
            :on-error="handleError"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload">
            <i slot="default"
              class="el-icon-plus"></i>
            <div slot="file"
              slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled"
                  class="el-upload-list__item-delete">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled"
                  class="el-upload-list__item-delete">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="transfer.dialogVisible">
            <img width="100%"
              :src="transfer.dialogImageUrl"
              alt="">
          </el-dialog>
        </div>
        <div class="lineCtn">
          <span class="label">转账说明:</span>
          <el-input type="textarea"
            class="inputBox"
            :rows="3"
            placeholder="请输入转账说明"
            v-model="transfer.desc">
          </el-input>
        </div>
        <div class="btnCtn">
          <span class=""
            @click="$message.warning('已取消'),transfer.flag = false">取消</span>
          <span class="submit">提交</span>
        </div>
      </div>
      <span class="close el-icon-close"
        @click="$message.warning('已取消'),transfer.flag = false"></span>
    </div>
    <div class="window"
      v-show="cutPay.flag">
      <div class="title">添加转账记录</div>
      <div class="content">
        <div class="lineCtn">
          <span class="label">转账日期:</span>
          <el-date-picker v-model="transfer.time"
            class="inputBox"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="lineCtn">
          <span class="label">转账类型:</span>
          <el-radio v-model="transfer.type"
            label="1">收款</el-radio>
          <el-radio v-model="transfer.type"
            label="2">付款</el-radio>
        </div>
        <div class="lineCtn">
          <span class="label">转账方式:</span>
          <el-select v-model="transfer.class"
            class="inputBox"
            placeholder="请选择转账方式">
            <el-option v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="lineCtn">
          <span class="label">转账金额:</span>
          <el-input v-model="transfer.total_price"
            class="inputBox"
            placeholder="请输入转账金额"></el-input>
        </div>
        <div class="lineCtn">
          <span class="label">上传图片:</span>
          <el-upload action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="changeImg"
            :on-progress="handleDownload"
            :on-error="handleError"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload">
            <i slot="default"
              class="el-icon-plus"></i>
            <div slot="file"
              slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled"
                  class="el-upload-list__item-delete">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled"
                  class="el-upload-list__item-delete">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="transfer.dialogVisible">
            <img width="100%"
              :src="transfer.dialogImageUrl"
              alt="">
          </el-dialog>
        </div>
        <div class="lineCtn">
          <span class="label">转账说明:</span>
          <el-input type="textarea"
            class="inputBox"
            :rows="3"
            placeholder="请输入转账说明"
            v-model="transfer.desc">
          </el-input>
        </div>
        <div class="btnCtn">
          <span class=""
            @click="$message.warning('已取消'),cutPay.flag = false">取消</span>
          <span class="submit">提交</span>
        </div>
      </div>
      <span class="close el-icon-close"
        @click="$message.warning('已取消'),cutPay.flag = false"></span>
    </div>
  </div>
</template>

<script>
// import { companyType } from '@/assets/js/dictionary.js'
// import { clientDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      selectVal: '',
      checkAllFlag: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      data: '',
      filterOption: {
        orderFilterFlag: false,
        timeFilterFlag: false,
        totalFilterFlag: false,
        numberFilterFlag: false,
        outNumberFilterFlag: false,
        totalNumberFilterFlag: false,
        companyCostFilterFlag: false,
        cutPayFilterFlag: false,
        billFilterFlag: false
      },
      flag: false, // 切换列表
      payList: [],
      cutPayList: [],
      classList: [
        {
          id: 1,
          name: '电子汇款'
        }, {
          id: 2,
          name: '支票'
        }, {
          id: 3,
          name: '网银转账'
        }, {
          id: 4,
          name: '第三方支付'
        }
      ],
      transfer: {
        flag: false,
        time: '',
        type: '1',
        method: '',
        total_price: '',
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      },
      cutPay: {
        flag: false,
        checkAllFlag: false
      }
    }
  },
  methods: {
    getPayList () {
      console.log('add')
      for (let i = 0; i < 10; i++) {
        this.payList.push({
          id: 666,
          pay_time: '2019-07-06',
          pay_type: '电子汇款',
          pay_money: '9000',
          desc: '',
          pay_prove: [],
          other: ''
        })
      }
    },
    getPayData () {
      let el = document.getElementsByClassName('infinite-list')[0]
      if (Number(el.scrollTop) + 600 >= this.payList.length * 60) {
        this.getPayList()
      }
    },
    getCutPayList () {
      for (let i = 0; i < 10; i++) {
        this.cutPayList.push({
          id: 666,
          order_code: '666',
          order_time: '2019-06-05',
          client_name: '飞泰',
          cooperation_type: '染色',
          total_price: '3000',
          cutPay_price: '100',
          cutPay_why: '色差',
          compiled_pay: '2000'
        })
      }
    },
    getCutPayData () {
      let el = document.getElementsByClassName('infinite-list')[1]
      if (Number(el.scrollTop) + 600 >= this.cutPayList.length * 60) {
        this.getCutPayList()
      }
    },
    changeImg (file) {
      console.log('change', file)
    },
    handleRemove (file) {
      console.log('remove', file)
    },
    handleError (file) {
      console.log('error', file)
    },
    handleSuccess (file) {
      console.log('success', file)
    },
    // handlePictureCardPreview (file) {
    //   console.log(file)
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    handleDownload (file) {
      console.log('download', file)
    },
    beforeUpload: function (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 6
      // const isReapeat = this.fileArr.find((item) => {
      //   return item.key === file.name
      // })
      console.log(fileName, fileNameLength, fileFormat, this.postData.key)
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
      // if (isReapeat) {
      //   this.$message.error('不能重复上传图片')
      //   return false
      // }
    },
    checked (item) {
      if (item === 'all') {
        this.checkAllFlag = true
        console.log(this.checkAllFlag)
      }
    },
    con (item) {
      console.log(item, typeof item)
    }
  },
  created () {
    this.getPayList()
    this.getCutPayList()
  },
  filters: {
    filterNumber (val) {
      return val.toLocaleString()
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeFinancialDetail.less";
</style>
