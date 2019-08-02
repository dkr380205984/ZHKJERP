<template>
  <div id="foreignTradeFinancialDetail">
    <div class="head">
      <h2>外贸公司详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司名称:</span>
          <span class="content">{{client_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司简称:</span>
          <span class="content">{{abbreviation}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">公司类型:</span>
          <span class="content">{{client_type}}</span>
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
            <span>
              <span class="label">已扣款:</span>
              <span class="content">{{6000}}元</span>
            </span>
          </span>
        </div>
      </div>
      <!-- 切换表格按钮 -->
      <div class="lineCtn"
        style="flex-direction:row;">
        <span :class="{cutList:true,active:flag}"
          @click="flag =true">转账列表</span>
        <span :class="{cutList:true,active:!flag}"
          @click="flag = false">订单列表</span>
      </div>
      <!-- 转账记录表 -->
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
            @click="transfer.flag = true,transfer.time = now_time">+转账记录</div>
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
            <span>转账类型</span>
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
            <span>转账方式</span>
            <span>操作</span>
          </div>
          <ul class="infinite-list">
            <!-- @mousewheel="getPayData" -->
            <li v-for="(item,key) in payList"
              :key="key"
              class="infinite-list-item">
              <div class="list"
                style="line-height:59px;">
                <span>{{item.complete_time}}</span>
                <span>{{item.type === 1 ? '收款' : '付款'}}</span>
                <span>{{item.transfer_price ? item.transfer_price : 0}}</span>
                <span>{{item.desc ? item.desc : '无'}}</span>
                <span>
                  <div class="imgCtn">
                    <img class="img"
                      :src="item.file_url.length>0?item.file_url[0]:require('@/assets/image/index/noPic.jpg')"
                      :onerror="defaultImg" />
                    <div class="toolTips"
                      v-if="item.file_url.length>0"><span @click="showImg(item.file_url)">点击查看大图</span></div>
                    <div class="toolTips"
                      v-if="item.file_url.length===0"><span>没有预览图</span></div>
                  </div>
                </span>
                <span>{{classList.find(key=>key.id === item.transfer_way).name}}</span>
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
            <span>{{transfer_total_price|filterNumber}}元</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <!-- 订单列表 -->
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
          <div class="management">
            <span class="handle blue"
              @click="record.recordFlag = true">操作记录</span>
            <template v-if="cutPay.flag">
              <span class="handle"
                @click="payMoneys">结算</span>
              <span class="handle"
                @click="cutPayMoney">扣款</span>
            </template>
            <span class="handle handleMain"
              @click="cutPay.flag = !cutPay.flag">{{!cutPay.flag ? '批量管理':'取消管理'}}</span>
          </div>
        </div>
        <div class="table">
          <div class="title">
            <span>
              <el-checkbox class="checkBox"
                v-model="cutPay.checkAllFlag"
                @change="checked('all')"
                v-if="cutPay.flag"></el-checkbox>
              订单号
            </span>
            <span>下单日期</span>
            <span>外贸公司</span>
            <span>合作项目</span>
            <span>具体金额</span>
            <span>扣款记录</span>
            <span>结算记录</span>
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
                    v-model="item.flag"
                    @change="checked(item)"></el-checkbox>
                  {{item.order_code}}
                </span>
                <span>{{item.order_time}}</span>
                <span>{{item.client_name}}</span>
                <span>{{item.cooperation_type}}</span>
                <span>{{item.total_price}}元</span>
                <span>{{item.cutPay_price}}</span>
                <span>{{item.total_price - item.cutPay_price}}</span>
                <span class="flex15">
                  <span class="btn"
                    @click="$router.push('/index/foreignTradeFinancialDetail/' + item.id)">详情</span>
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
            <span>{{450454512|filterNumber}}元</span>
            <span class="flex15"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 转账弹窗 -->
    <div class="shade"
      v-show="transfer.flag">
      <div class="window">
        <div class="title">添加转账记录</div>
        <div class="content">
          <div class="lineCtn">
            <span class="label">转账日期:</span>
            <el-date-picker v-model="transfer.time"
              class="inputBox"
              type="date"
              value-format="yyyy-MM-dd"
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
            <el-select v-model="transfer.method"
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
            <el-upload class="upload-demo"
              action="http://upload.qiniup.com/"
              accept="image/jpeg,image/gif,image/png,image/bmp"
              :before-upload="beforeUpload"
              :data="postData"
              ref="uploada"
              list-type="picture-card">
              <i slot="default"
                class="el-icon-plus"></i>
              <div slot="tip"
                class="el-upload__tip">只能上传jpg/png图片文件，且不超过10M</div>
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
            <span class="submit"
              @click="submit('transfer')">提交</span>
          </div>
        </div>
        <span class="close el-icon-close"
          @click="$message.warning('已取消'),transfer.flag = false"></span>
      </div>
    </div>
    <!-- 扣款弹窗 -->
    <div class="shade"
      v-show="cutPay.cutPayFlag">
      <div class="window">
        <div class="title">订单扣款</div>
        <div class="content">
          <div class="lineCtn">
            <span class="label">订单号:</span>
            <el-select v-model="cutPay.order_code_list"
              class="inputBox"
              disabled
              placeholder="请选择转账方式">
            </el-select>
          </div>
          <div class="lineCtn">
            <span class="label">扣款日期:</span>
            <el-date-picker v-model="cutPay.cutPay_time"
              class="inputBox"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="lineCtn">
            <span class="label">扣款金额:</span>
            <el-input v-model="cutPay.cutPay_price"
              class="inputBox"
              placeholder="请输入转账金额"></el-input>
          </div>
          <div class="lineCtn">
            <span class="label">扣款原因:</span>
            <el-input type="textarea"
              class="inputBox"
              :rows="3"
              placeholder="请输入扣款原因"
              v-model="cutPay.desc">
            </el-input>
          </div>
          <div class="btnCtn">
            <span class=""
              @click="$message.warning('已取消'),cutPay.cutPayFlag = false">取消</span>
            <span class="submit"
              @click="submit('cutPay')">提交</span>
          </div>
        </div>
        <span class="close el-icon-close"
          @click="$message.warning('已取消'),cutPay.cutPayFlag = false"></span>
      </div>
    </div>
    <!-- 结算弹窗 -->
    <div class="shade"
      v-show="payMoney.payFlag">
      <div class="window">
        <div class="title">订单结算</div>
        <div class="content">
          <div class="lineCtn">
            <span class="label">订单号:</span>
            <el-select v-model="payMoney.order_code_list"
              class="inputBox"
              disabled
              placeholder="请选择转账方式">
              <!-- <el-option v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option> -->
            </el-select>
          </div>
          <div class="lineCtn">
            <span class="label">结算日期:</span>
            <el-date-picker v-model="payMoney.pay_time"
              class="inputBox"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="lineCtn">
            <span class="label">结算金额:</span>
            <el-input v-model="payMoney.pay_price"
              class="inputBox"
              placeholder="请输入转账金额"></el-input>
          </div>
          <div class="lineCtn">
            <span class="label">是否开票:</span>
            <el-radio v-model="payMoney.type"
              label=true>是</el-radio>
            <el-radio v-model="payMoney.type"
              label=false>否</el-radio>
          </div>
          <template v-if="payMoney.type === 'true'">
            <template v-for="(item,key) in payMoney.info">
              <div class="lineCtn"
                :key="key">
                <span class="label">开票号码:</span>
                <el-input v-model="item.pay_code"
                  class="inputBox"
                  placeholder="请输入开票号码"></el-input>
                <span class="el-icon-plus icon"
                  @click="appendPayMoneyInfo"
                  v-if="key===0"></span>
                <span class="el-icon-delete icon"
                  @click="deletePayMoneyInfo(key)"
                  v-if="key !== 0"></span>
              </div>
              <div class="lineCtn"
                :key="key+'y'">
                <span class="label">开票金额:</span>
                <el-input v-model="item.pay_price"
                  class="inputBox"
                  placeholder="请输入开票金额"></el-input>
              </div>
            </template>
          </template>
          <div class="lineCtn">
            <span class="label">备注信息:</span>
            <el-input type="textarea"
              class="inputBox"
              :rows="3"
              placeholder="请输入备注信息"
              v-model="cutPay.desc">
            </el-input>
          </div>
          <div class="btnCtn">
            <span class=""
              @click="$message.warning('已取消'),payMoney.payFlag = false">取消</span>
            <span class="submit"
              @click="submit('settle')">提交</span>
          </div>
        </div>
        <span class="close el-icon-close"
          @click="$message.warning('已取消'),payMoney.payFlag = false"></span>
      </div>
    </div>
    <!-- 操作记录弹窗 -->
    <div class="shade"
      v-show="record.recordFlag">
      <div class="window">
        <div class="title">操作记录</div>
        <div class="content">
          <div class="lineCtn filterCtn">
            <div class="filterBox">
              <el-date-picker v-model="record.time"
                type="date"
                class="inputBox"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              {{record.time}}
              <el-input placeholder="请输入订单号"
                class="inputBox"
                prefix-icon="el-icon-search"
                v-model="record.searchVal">
              </el-input>
            </div>
            <div class="btn">
              <span :class='{"active":record.type === "all"}'
                @click="record.type = 'all'">全部</span>
              <span :class='{"active":record.type === "pay"}'
                @click="record.type = 'pay'">结算</span>
              <span :class='{"active":record.type === "cut"}'
                @click="record.type = 'cut'">扣款</span>
            </div>
          </div>
          <el-collapse accordion
            v-model="record.activeName"
            class="timeLine">
            <div class="borderCtn">
              <span class="border"></span>
            </div>
            <el-collapse-item v-for="(item,key) in record.infos"
              :key="key">
              <div slot="title"
                class="title">
                <div class="borderCtn">
                  <span class="circle"></span>
                </div>
                <span class="time">{{item.time}}</span>
                <span class="type">{{item.type === '1' ? '结算' : '扣款'}}</span>
                <span>金额：<strong>{{item.money}}</strong></span>
              </div>
              <div class="line"
                v-if="item.type === '1'">
                <span class="label">是否开票:</span>
                <span class="info">{{item.isKp ? '已开票' : '未开票'}}</span>
              </div>
              <template v-if="item.type === '1'">
                <template v-for="(val,ind) in item.payInfo">
                  <div class="line"
                    :key="ind">
                    <span class="label">开票号码:</span>
                    <span class="info">{{val.pay_code}}</span>
                  </div>
                  <div class="line"
                    :key="ind+'money'">
                    <span class="label">开票金额:</span>
                    <span class="info">{{val.pay_price}}</span>
                  </div>
                </template>
              </template>
              <div class="line">
                <span class="label">包含订单:</span>
                <span class="info">
                  <span class="code"
                    v-for="(val,ind) in item.order_code_list"
                    :key="ind">{{val}}</span>
                </span>
              </div>
              <div class="line">
                <span class="label">备注信息:</span>
                <span class="info">{{item.desc ? item.desc : '暂无'}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <span class="close el-icon-close"
          @click="record.recordFlag = false"></span>
      </div>
    </div>
    <!-- 图片弹窗 -->
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="closeBtn"
          @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside"
          height="550px"
          arrow="always">
          <el-carousel-item v-for="item in imgList"
            :key="item.image_url">
            <img :src="item"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { companyType } from '@/assets/js/dictionary.js'
import { getToken, clientDetail, transferAdd, transferList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      count: 0,
      client_name: '',
      abbreviation: '',
      client_type: '',
      now_time: '',
      transfer_total_price: 0, // 总转账金额
      // fileArr: [],
      imgList: [],
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      selectVal: '',
      postData: { token: '' },
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
      flag: true, // 切换列表
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
        flag: false, // 是否处于批量管理状态
        checkAllFlag: false, // 是否处于全选状态
        checkedList: [], // 批量选择的数据
        cutPayFlag: false, // 扣款弹窗flag
        order_code_list: '',
        order_id_list: [],
        cutPay_time: '',
        cutPay_price: '',
        desc: ''
      },
      payMoney: {
        payFlag: false, // 结算弹窗flag
        order_code_list: '',
        order_id_list: [],
        pay_time: '',
        pay_price: '',
        type: 'true',
        info: [
          {
            pay_code: '',
            pay_price: ''
          }
        ],
        desc: ''
      },
      record: {
        activeName: '',
        recordFlag: false,
        time: '',
        searchVal: '',
        type: 'all',
        info: [
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h'],
            desc: '备注信息'
          },
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h'],
            desc: '备注信息'
          },
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h'],
            desc: '备注信息'
          },
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h', '4h'],
            desc: '备注信息'
          }, {
            time: '2019-06-03 12:40',
            type: '2',
            money: 6000,
            desc: '色差原因',
            order_code_list: ['1k', '2j', '3h', '4h']

          }
        ],
        infos: [
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h'],
            desc: '备注信息'
          },
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h'],
            desc: '备注信息'
          },
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h'],
            desc: '备注信息'
          },
          {
            time: '2019-06-04 12:42',
            type: '1',
            money: 60000,
            isKP: true,
            payInfo: [{
              pay_code: '5456131312',
              pay_price: 50000
            }, {
              pay_code: '45641132153',
              pay_price: 10000
            }],
            order_code_list: ['1k', '2j', '3h', '4h'],
            desc: '备注信息'
          }, {
            time: '2019-06-03 12:40',
            type: '2',
            money: 6000,
            desc: '色差原因',
            order_code_list: ['1k', '2j', '3h', '4h']

          }
        ]
      }
    }
  },
  methods: {
    submit (item) {
      if (item === 'transfer') {
        if (!this.transfer.time) {
          this.$message.error('请选择转账日期')
          return
        }
        if (!this.transfer.method) {
          this.$message.error('请选择转账方式')
          return
        }
        if (!this.transfer.total_price) {
          this.$message.error('请输入转账金额')
          return
        }
        const imgArr = this.$refs.uploada.uploadFiles.map((items) => { return 'http://zhihui.tlkrzf.com/' + items.response.key })
        transferAdd({
          company_id: window.sessionStorage.getItem('company_id'),
          user_id: window.sessionStorage.getItem('user_id'),
          client_id: this.$route.params.id,
          complete_time: this.transfer.time,
          type: this.transfer.type,
          transfer_way: this.transfer.method,
          transfer_price: this.transfer.total_price,
          file_url: JSON.stringify(imgArr),
          desc: this.transfer.desc,
          id: null
        }).then(res => {
          console.log(res)
          this.transfer.flag = false
          this.getPayList()
        })
      } else if (item === 'cutPay') {

      } else if (item === 'settle') {

      } else {
        this.$message.error('出错了！请刷新页面')
      }
    },
    // 获取转账记录
    getPayList () {
      transferList({
        client_id: this.$route.params.id
      }).then(res => {
        this.transfer_total_price = 0
        console.log(res.data.data)
        this.payList = res.data.data
        this.payList.forEach(item => {
          this.transfer_total_price += Number(item.transfer_price)
          if (item.file_url) {
            item.file_url = JSON.parse(item.file_url)
          }
        })
      })
    },
    // getPayData () {
    //   let el = document.getElementsByClassName('infinite-list')[0]
    //   if (Number(el.scrollTop) + 600 >= this.payList.length * 60) {
    //     this.getPayList()
    //   }
    // },
    getCutPayList () {
      for (let i = 0; i < 10; i++) {
        this.count++
        this.cutPayList.push({
          flag: false,
          id: this.count,
          order_code: this.count,
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
    // 上传图片前验证
    beforeUpload: function (file) {
      console.log(this.postData)
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
    // 操作记录切换结算方式
    checked (item) {
      if (item === 'all') {
        if (this.cutPay.checkAllFlag) {
          this.cutPayList.forEach(item => {
            item.flag = true
            this.cutPay.checkedList.push(item)
          })
        } else {
          this.cutPayList.forEach(item => { item.flag = false })
          this.cutPay.checkedList = []
        }
      } else {
        if (item.flag === true) {
          this.cutPay.checkedList.push(item)
        } else {
          this.cutPay.checkedList.forEach((val, ind) => {
            if (item.id === val.id) {
              this.cutPay.checkedList.splice(ind, 1)
            }
          })
        }
      }
      console.log(this.cutPay.checkedList)
    },
    // 扣款弹窗前
    cutPayMoney () {
      if (this.cutPay.checkedList.length === 0) {
        this.$message.warning('请选择需要扣款的订单！')
        return
      }
      this.cutPay.cutPayFlag = true
      this.cutPay.cutPay_time = this.now_time
      this.cutPay.order_code_list = ''
      this.cutPay.checkedList.forEach(item => {
        if (this.cutPay.order_code_list.indexOf(item.order_code) === -1) {
          this.cutPay.order_code_list += (item.order_code + ';')
        }
        this.cutPay.order_id_list.push(item.id)
      })
    },
    // 结算弹窗前
    payMoneys () {
      if (this.cutPay.checkedList.length === 0) {
        this.$message.warning('请选择需要结算的订单！')
        return
      }
      this.payMoney.payFlag = true
      this.payMoney.pay_time = this.now_time
      this.cutPay.checkedList.forEach(item => {
        if (this.payMoney.order_code_list.indexOf(item.order_code) === -1) {
          this.payMoney.order_code_list += (item.order_code + ';')
        }
        this.payMoney.order_id_list.push(item.id)
      })
    },
    // 添加发票信息
    appendPayMoneyInfo () {
      this.payMoney.info.push({
        pay_code: '',
        pay_price: ''
      })
    },
    // 删除发票信息
    deletePayMoneyInfo (index) {
      this.payMoney.info.splice(index, 1)
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    }
  },
  created () {
    getToken().then(res => {
      this.postData.token = res.data.data
    })
    clientDetail({
      id: this.$route.params.id
    }).then(res => {
      this.client_name = res.data.data.name
      this.abbreviation = res.data.data.abbreviation
      res.data.data.type.forEach((item, index) => {
        this.client_type += ((index !== 0 ? ',' : '') + companyType.find(key => key.value === item).name)
      })
    })
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    this.getPayList()
    this.getCutPayList()
  },
  filters: {
    filterNumber (val) {
      return val.toLocaleString()
    }
  },
  watch: {
    'record.time': {
      deep: true,
      handler (newVal) {
        if (newVal) {

        } else {

        }
      }
    },
    'record.searchVal': {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.record.infos = this.record.info.filter(item => (item.order_code_list.indexOf(newVal) !== -1))
        } else {
          this.record.infos = this.record.info
        }
      }
    },
    'record.type': {
      deep: true,
      handler (newVal) {
        if (newVal === 'all') {
          this.record.infos = this.record.info
        } else if (newVal === 'pay') {
          this.record.infos = this.record.info.filter(item => item.type === '1')
        } else if (newVal === 'cut') {
          this.record.infos = this.record.info.filter(item => item.type === '2')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/foreignTradeFinancialDetail.less";
</style>
<style lang="less" scoped>
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
