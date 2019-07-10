<template>
  <div id="orderDetail">
    <div class="head"
      style="overflow:auto"
      id="top">
      <h2>订单详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="keyBtn">
            <!-- <span class="btns">一键完成</span> -->
            <el-dropdown size="medium"
              split-button
              type="primary">
              一键完成
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="infoCtn">
            <div class="labelInfo">
              <span class="label">订单状态</span>
              <span class="info"
                :style="{'color':orderStateColor}">{{orderState}}</span>
            </div>
            <div class="labelInfo">
              <span class="label">订单金额</span>
              <span class="info">{{moneyCmp}}</span>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">订单号:</span>
            <span class="content">{{order_info.order_code}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">订单公司:</span>
            <span class="content">{{order_info.client_name}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">汇率:</span>
            <span class="content">100元={{order_info.exchange_rate}}{{order_info.account_unit}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">下单日期:</span>
            <span class="content">{{order_info.order_time}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">联系人:</span>
            <span class="content">{{order_info.contacts}}</span>
          </div>
          <div class="inputCtn small">
            <span class="label">税率:</span>
            <span class="content">{{order_info.tax_rate}}%</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn small">
            <span class="label">备注信息:</span>
            <span class="content">{{order_info.remark?order_info.remark:'暂无信息'}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">流程进度</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="processCtn">
          <div class="leaveTime">
            <span class="text">订单已经生产<em class="blue">{{useTime}}</em>天，还剩<em class="red">{{leaveTime}}</em>天</span>
          </div>
          <div class="processOuter">
            <div class="processInner"
              :style="{'width':process.product_ins_pre+'%'}"></div>
            <div class="processInfo">成品检验完成度：{{process.product_ins_pre+'%'}}</div>
            <div class="timeCtn"
              v-for="(item,index) in timeAxis"
              :key="index"
              :style="{left:item.rate}">
              <div class="time">{{item.time}}</div>
              <div class="line"></div>
              <div class="info">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="cardCtn">
          <div class="transformBtn leftBtn"
            @mousedown="translated('left')"
            @mouseup="clearTimer"><i class="el-icon-arrow-left"></i></div>
          <div class="cardTransform"
            ref="cardTransform">
            <div class="card">
              <div class="model1"></div>
              <i class="line"></i>
              <div class="model2"></div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </div>
          <div class="transformBtn rightBtn"
            @mousedown="translated('right')"
            @mouseup="clearTimer"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">流程详情</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="iconCtn">
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>已下单</span></div>
              <div style="height:0%"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单下单.png" />
              <div style="height:100%"
                class="backBottom complete"></div>
            </div>
            <div class="label">订单下单</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{'原料:'+process.main_material_pre + '%'}}<br />{{'辅料:'+process.assist_material_pre+ '%'}}</span></div>
              <div :style="{height:(100-process.main_material_pre) + '%'}"
                class="backTop halfL"></div>
              <div :style="{height:(100-process.assist_material_pre) + '%'}"
                class="backTop halfR"></div>
              <div class="lineMid"></div>
              <div :style="{height:process.main_material_pre + '%'}"
                :class="{'complete':process.main_material_pre>=100}"
                class="backBottom halfL"></div>
              <div :style="{height:process.assist_material_pre + '%'}"
                :class="{'complete':process.assist_material_pre>=100}"
                class="backBottom halfR"></div>
              <img class="icon"
                src="@/assets/image/icon/订单物料.png" />
            </div>
            <div class="label">物料订购</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{process.weave_pre + '%'}}</span></div>
              <div :style="{height:(100-process.weave_pre) + '%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单生产.png" />
              <div :style="{height:process.weave_pre + '%'}"
                :class="{'complete':process.weave_pre>=100}"
                class="backBottom"></div>
            </div>
            <div class="label">生产织造</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{process.product_pop_push + '%'}}</span></div>
              <div :style="{height:(100-process.product_pop_push) + '%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单收发.png" />
              <div :style="{height:process.product_pop_push + '%'}"
                :class="{'complete':process.product_pop_push>=100}"
                class="backBottom"></div>
            </div>
            <div class="label">产品收发</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{'成品:'+process.product_ins_pre + '%'}}<br />{{'半成品:'+process.semi_product_ins_pre+ '%'}}</span></div>
              <div :style="{height:(100-process.semi_product_ins_pre) + '%'}"
                class="backTop halfL"></div>
              <div :style="{height:(100-process.product_ins_pre) + '%'}"
                class="backTop halfR"></div>
              <div class="lineMid"></div>
              <div :style="{height:process.semi_product_ins_pre + '%'}"
                :class="{'complete':process.semi_product_ins_pre>=100}"
                class="backBottom halfL"></div>
              <div :style="{height:process.product_ins_pre + '%'}"
                :class="{'complete':process.product_ins_pre>=100}"
                class="backBottom halfR"></div>
              <img class="icon"
                src="@/assets/image/icon/订单检验.png" />
            </div>
            <div class="label">产品检验</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>{{process.pack_pre + '%'}}</span></div>
              <div :style="{height:(100-process.pack_pre) + '%'}"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/订单出库.png" />
              <div :style="{height:process.pack_pre + '%'}"
                :class="{'complete':process.pack_pre>=100}"
                class="backBottom"></div>
            </div>
            <div class="label">产品出库</div>
          </div>
          <div class="iconOnce">
            <div class="imgCtn">
              <div class="shadeInfo"><span>暂无</span></div>
              <div style="height:100%"
                class="backTop"></div>
              <img class="icon"
                src="@/assets/image/icon/财务结算.png" />
              <div style="height:0%"
                class="backBottom"></div>
            </div>
            <div class="label">财务结算</div>
          </div>
        </div>
        <div class="hrefCtn"
          id="href1">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">物料概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">物料详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">物料名称</span>
              <span>计划数量</span>
              <span>订购数量</span>
              <span style="flex:2">
                <span>加工类型</span>
                <span>加工数量</span>
              </span>
              <span>入库数量</span>
              <span>出库数量</span>
              <span>补充数量</span>
              <span>物料状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in materialList"
              :key="index">
              <span style="flex:2">{{item.material_name}}</span>
              <span>{{item.plan_number}}{{item.unit}}</span>
              <span>{{item.order_number}}{{item.unit}}</span>
              <span class="col"
                style="flex:2">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number}}{{item.unit}}</span>
                </span>
              </span>
              <span>还没统计</span>
              <span>还没统计</span>
              <span>{{item.replenish_number?item.replenish_number:0}}{{item.unit}}</span>
              <span>还没统计</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href2">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">生产概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">生产详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
              <span>产品图片</span>
              <span>下单数量</span>
              <span>库存调取</span>
              <span>计划生产</span>
              <span>织造分配</span>
              <span>加工工序</span>
              <span>加工数量</span>
              <span>生产状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in designList"
              :key="index">
              <span style="flex:2">{{item.product_code}}({{item.type}})</span>
              <span>
                <div class="imgCtn">
                  <img class="img"
                    :src="item.img.length>0?item.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                    :onerror="defaultImg" />
                  <div class="toolTips"
                    v-if="item.img.length>0"><span @click="showImg(item.img)">点击查看大图</span></div>
                  <div class="toolTips"
                    v-if="item.img.length===0"><span>没有预览图</span></div>
                </div>
              </span>
              <span>{{item.order_num}}{{item.unit}}</span>
              <span>{{item.stock_pick}}{{item.unit}}</span>
              <span>{{item.plan_num}}{{item.unit}}</span>
              <span>{{item.weave_number}}{{item.unit}}</span>
              <span class="col"
                style="flex:2">
                <span v-for="(itemType,indexType) in item.processType"
                  :key="indexType">
                  <span>{{itemType.type}}</span>
                  <span>{{itemType.number}}{{item.unit}}</span>
                </span>
              </span>
              <span>还没统计</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href3">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">收发概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">收发详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span style="flex:2">产品信息</span>
              <span>产品图片</span>
              <span>工序</span>
              <span>出库捆数</span>
              <span>出库数量</span>
              <span>入库捆数</span>
              <span>入库数量</span>
              <span>收发状态</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in designList"
              :key="index">
              <span style="flex:2">{{item.product_code}}({{item.type}})</span>
              <span>
                <div class="imgCtn">
                  <img class="img"
                    :src="item.img.length>0?item.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                    :onerror="defaultImg" />
                  <div class="toolTips"
                    v-if="item.img.length>0"><span @click="showImg(item.img)">点击查看大图</span></div>
                  <div class="toolTips"
                    v-if="item.img.length===0"><span>没有预览图</span></div>
                </div>
              </span>
              <span>工序</span>
              <span>出库捆数</span>
              <span>出库数量</span>
              <span>入库捆数</span>
              <span>入库数量</span>
              <span>收发状态</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href4">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">检验概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">检验详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
            <li class="material_info"
              v-for="(item,index) in designList"
              :key="index">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href5">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">出库概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">出库详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
            <li class="material_info">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
            <li class="material_info">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
          </div>
        </div>
        <div class="hrefCtn"
          id="href6">
          <div class="titleLine">
            <div class="titleCtn">
              <span class="title">财务概述</span>
              <i class="border"></i>
            </div>
            <div class="oprationCtn">
              <span class="opration">财务详情</span>
              <span class="opration">一键完成</span>
            </div>
          </div>
          <div class="table">
            <li class="title">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
            <li class="material_info">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
            <li class="material_info">
              <span>生产单位</span>
              <span>加工类型</span>
              <span>所需辅料</span>
              <span>颜色</span>
              <span>数量</span>
              <span>操作</span>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- 目录 -->
    <div class="catalogue">
      <div class="title">详情目录</div>
      <li class="ahref"><a href="#href1">物料概述</a></li>
      <li class="ahref"><a href="#href2">生产概述</a></li>
      <li class="ahref"><a href="#href3">收发概述</a></li>
      <li class="ahref"><a href="#href4">检验概述</a></li>
      <li class="ahref"><a href="#href5">出库概述</a></li>
      <li class="ahref"><a href="#href6">财务概述</a></li>
    </div>
    <div class="suspend">
      <span class="blue"
        style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
        <a href="#top"
          style="color: rgb(255, 255, 255); text-decoration: none;">回到顶部</a>
      </span>
    </div>
  </div>
</template>

<script>
import { orderDetailNew, rawMaterialOrderInit, productionDetail } from '@/assets/js/api.js'
import { moneyArr } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      imgList: [],
      scroll: 0,
      timer: '',
      order_info: {
        order_code: '',
        client_name: '',
        contacts: '',
        exchange_rate: '',
        tax_rate: '',
        total_price: '',
        account_unit: '元',
        order_time: '',
        remark: '',
        status: 0
      },
      timeAxis: [],
      order_log: {},
      process: {
        assist_material_pre: 0,
        main_material_pre: 0,
        pack_pre: 0,
        product_ins_pre: 0,
        product_pop_push: 9,
        semi_product_ins_pre: 0,
        weave_pre: 0
      },
      materialList: [], // 物料概述
      designList: [], //  生产概述
      outStockList: [], // 出库概述
      productPriceList: [], // 产品价格信息
      storeList: [] // 收发概述
    }
  },
  methods: {
    // 日期格式化
    getTime (date) {
      let fmt = 'yyyy-MM-dd'
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    // 获取时间差
    getTimeDif (big, small) {
      return parseInt((new Date(big).getTime() - (new Date(small)).getTime()) / (1000 * 60 * 60 * 24))
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    translated (str) {
      const maxScroll = this.$refs.cardTransform.scrollWidth - this.$refs.cardTransform.clientWidth
      if (str === 'right') {
        this.timer = setInterval(() => {
          this.scroll -= 10
          if (Math.abs(this.scroll) >= maxScroll) {
            clearInterval(this.timer)
          } else {
            this.$refs.cardTransform.style.transform = 'translateX(' + this.scroll + 'px)'
          }
        }, 20)
      } else {
        this.timer = setInterval(() => {
          this.scroll += 10
          if (this.scroll >= 0) {
            clearInterval(this.timer)
          } else {
            this.$refs.cardTransform.style.transform = 'translateX(' + this.scroll + 'px)'
          }
        }, 20)
      }
    },
    clearTimer () {
      clearInterval(this.timer)
    }
  },
  computed: {
    // 订单金额
    moneyCmp () {
      return moneyArr.find((itemFind) => itemFind.name === this.order_info.account_unit).sign + this.order_info.total_price.toLocaleString()
    },
    // 订单状态
    orderState () {
      if (this.order_info.status === 1) {
        return '已完成'
      } else if (this.order_info.status === 2) {
        return '订单异常'
      } else {
        for (let key in this.order_log) {
          if (this.order_log[key].length > 0) {
            return '进行中'
          }
        }
        return '已创建'
      }
    },
    // 订单状态的样式
    orderStateColor () {
      if (this.order_info.status === 1) {
        return '#67c23a'
      } else if (this.order_info.status === 2) {
        return '#F56C6C'
      } else {
        for (let key in this.order_log) {
          if (this.order_log[key].length > 0) {
            return '#1A95FF'
          }
        }
        return '#E6A23C'
      }
    },
    // (今天 + 1) - 下单日期
    useTime () {
      if (this.timeAxis.length > 0) {
        return this.getTimeDif((new Date().getTime()) + (1000 * 60 * 60 * 24), new Date(this.timeAxis[0].time))
      } else {
        return 0
      }
    },
    // 交货日期 - 今天
    leaveTime () {
      if (this.timeAxis.length > 0) {
        return this.getTimeDif(new Date(this.timeAxis[this.timeAxis.length - 1].time), new Date())
      } else {
        return 0
      }
    }
  },
  mounted () {
    Promise.all([orderDetailNew({
      id: 20
    }), rawMaterialOrderInit({
      order_id: 20
    }), productionDetail({
      order_id: 20
    })]).then((res) => {
      console.log(res)
      const data = res[0].data.data
      this.order_info = data.order_info
      this.order_log = data.order_log
      this.process = data.order_schedule
      for (let key in this.process) {
        this.process[key] = this.process[key] > 100 ? 100 : this.process[key].toFixed(1)
      }
      // 整理时间线 并排序
      this.order_info.order_batch.forEach((item, index) => {
        if (index === this.order_info.order_batch.length - 1) {
          this.timeAxis.push({
            name: '交货日期',
            time: item.delivery_time
          })
        } else {
          this.timeAxis.push({
            name: '第' + (index + 1) + '批',
            time: item.delivery_time
          })
        }
      })
      this.timeAxis.push({
        name: '今天',
        time: this.getTime(new Date())
      })
      this.timeAxis.push({
        name: '下单日期',
        time: this.order_info.order_time
      })
      // 按时间排序
      this.timeAxis.sort((a, b) => {
        return (new Date(a.time) - new Date(b.time))
      })
      const allTime = this.getTimeDif(new Date(this.timeAxis[this.timeAxis.length - 1].time), new Date(this.timeAxis[0].time))
      this.timeAxis.forEach((item) => {
        item.rate = (this.getTimeDif(new Date(item.time), new Date(this.timeAxis[0].time)) / allTime).toFixed(2) * 100 + '%'
      })
      // 物料概述
      let materialInfo = res[1].data.data
      let processInfo = this.order_log.material_production
      // let outStockInfo = [].concat(this.order_log.material_push_z, this.order_log.material_push_f)
      // let inStockInfo = [].concat(this.order_log.material_pop_z, this.order_log.material_pop_f)
      let materialPageInfo = this.order_log.material_order
      // 物料计划值
      materialInfo.material_info.forEach(item => {
        for (let prop in item) {
          let flag = this.materialList.find(key => key.material_name === prop)
          if (!flag) {
            this.materialList.push({
              material_name: prop,
              unit: item[prop].unit === '克' ? 'kg' : (item[prop].unit === 'g' ? 'kg' : item[prop].unit),
              plan_number: (item[prop].unit === '克' || item[prop].unit === 'g') ? (item[prop].total_number / 1000) : item[prop].total_number
            })
          } else {
            flag.plan_number = Number(flag.plan_number) + Number((item[prop].unit === '克' || item[prop].unit === 'g') ? (item[prop].total_number / 1000) : item[prop].total_number)
          }
        }
      })
      // 物料加工值，订购值
      this.materialList.map(res => {
        if (materialInfo.total_weight_order[res.material_name]) {
          res.order_number = materialInfo.total_weight_order[res.material_name]
        }
      })
      // 物料入库值
      for (let prop in materialInfo.stock_info) {
        let ind = materialInfo.stock_info[prop]
        let num = 0
        ind.map(res => {
          num += Number(res.total_weight)
        })
        let flag = this.materialList.find(keys => keys.material_name === prop)
        if (flag) {
          flag.stock_number = num
        }
      }
      // 物料出库值

      // 物料订购值
      materialPageInfo.forEach(item => {
        let flag = this.materialList.find(keys => keys.material_name === item.material_name)
        if (flag && item.replenish_id !== null) {
          flag.replenish_number = Number(flag.replenish_number ? flag.replenish_number : 0) + Number(item.weight)
        }
        if (flag) {
          if (!flag.order_client) {
            flag.order_client = []
          }
          if (flag.order_client.indexOf(item.order_client) === -1) {
            flag.order_client.push(item.order_client)
          }
          flag.total_price_order = Number(flag.total_price_order ? flag.total_price_order : 0) + Number(item.price * item.weight)
        }
      })
      // 物料加工类型
      processInfo.forEach(item => {
        let flag = this.materialList.find(keys => keys.material_name === item.material_name)
        if (flag) {
          if (!flag.processType) {
            flag.processType = []
          }
          item.material_info = JSON.parse(item.material_info)
          let num = 0
          item.material_info.map(key => {
            num += Number(key.value)
          })
          let flag1 = flag.processType.find(key => key.type === item.process_type)
          if (!flag1) {
            flag.processType.push({
              type: item.process_type,
              number: num,
              total_price_process: item.total_price,
              process_client: [item.client_name]
            })
          } else {
            if (flag1.process_client.indexOf(item.client_name) === -1) {
              flag1.process_client.push(item.client_name)
            }
            flag1.number = Number(flag1.number) + Number(num)
            flag1.total_price_process = Number(flag1.total_price_process) + Number(item.total_price)
          }
        }
      })
      // console.log(this.materialList)

      // 生产概述
      let designInfo = res[2].data.data
      let weaveInfo = this.order_log.product_weave
      let halfProductInfo = this.order_log.semi_finished_production
      designInfo.production_detail.product_info.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_code,
            type: item.category_name + '/' + item.type_name + '/' + item.style_name,
            img: [],
            order_num: item.order_num,
            stock_pick: item.stock_pick,
            plan_num: item.production_num,
            unit: item.unit_name
          })
        } else {
          flag.order_num = Number(flag.order_num ? flag.order_num : 0) + Number(item.order_num)
          flag.stock_pick = Number(flag.stock_pick ? flag.stock_pick : 0) + Number(item.stock_pick)
          flag.plan_num = Number(flag.plan_num ? flag.plan_num : 0) + Number(item.production_num)
        }
      })
      weaveInfo.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (flag) {
          if (!flag.weave_client) {
            flag.weave_client = []
          }
          if (flag.weave_client.indexOf(item.client_name) === -1) {
            flag.weave_client.push(item.client_name)
          }
          flag.weave_number = Number(flag.weave_number ? flag.weave_number : 0) + Number(item.number)
          flag.total_price_weave = Number(flag.total_price_weave ? flag.total_price_weave : 0) + Number(item.price * item.number)
        }
      })
      halfProductInfo.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (flag) {
          if (!flag.processType) {
            flag.processType = []
          }
          let flag1 = flag.processType.find(key => key.type === item.type)
          if (!flag1) {
            flag.processType.push({
              type: item.type,
              number: item.number
            })
          } else {
            flag1.number = Number(flag1.number ? flag1.number : 0) + Number(item.number)
          }
          flag.total_price_semiProcess = Number(flag.total_price_semiProcess ? flag.total_price_semiProcess : 0) + Number(item.price * item.number)
        }
      })
      // 收发概述
      let storeIn = this.order_log.product_push
      let storeOut = this.order_log.product_pop
      storeIn.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            store_in: [item.type],
            store_in_count: item.count,
            store_in_number: item.number
          })
        } else {
          if (!flag.store_in) {
            flag.store_in = []
          }
          if (flag.store_in.indexOf(item.type) === -1) {
            flag.store_in.push(item.type)
          }
          flag.store_in_number = Number(flag.store_in_number ? flag.store_in_number : 0) + Number(item.number)
          flag.store_in_count = Number(flag.store_in_count ? flag.store_in_count : 0) + Number(item.count)
        }
      })
      storeOut.forEach(item => {
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            store_out: [item.type],
            store_out_count: item.count,
            store_out_number: item.number
          })
        } else {
          if (!flag.store_out) {
            flag.store_out = []
          }
          if (flag.store_out.indexOf(item.type) === -1) {
            flag.store_out.push(item.type)
          }
          flag.store_out_number = Number(flag.store_out_number ? flag.store_out_number : 0) + Number(item.number)
          flag.store_out_count = Number(flag.store_out_count ? flag.store_out_count : 0) + Number(item.count)
        }
      })
      console.log(this.designList)
      // 检验概述
      let semiInfo = this.order_log.semi_product_inspection
      let finishedInfo = this.order_log.product_inspection
      semiInfo.forEach(item => {
        item.rejects_info = JSON.parse(item.rejects_info)
        let num = 0
        item.rejects_info.map(keys => {
          num += Number(keys.number ? keys.number : 0)
        })
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            img: [],
            semi_number: item.number,
            semi_defective: num
          })
        } else {
          flag.semi_number = Number(item.number) + Number(flag.semi_number ? flag.semi_number : 0)
          flag.semi_defective = Number(flag.semi_defective ? flag.semi_defective : 0) + Number(num)
        }
      })
      finishedInfo.forEach(item => {
        item.rejects_info = JSON.parse(item.rejects_info)
        let num = 0
        item.rejects_info.map(keys => {
          num += Number(keys.number ? keys.number : 0)
        })
        let flag = this.designList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          this.designList.push({
            product_code: item.product_info.product_code,
            img: [],
            finished_number: item.number,
            finished_defective: num
          })
        } else {
          flag.finished_number = Number(item.number) + Number(flag.finished_number ? flag.finished_number : 0)
          flag.finished_defective = Number(flag.finished_defective ? flag.finished_defective : 0) + Number(num)
        }
      })
      console.log(this.designList)
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/orderDetailNew.less";
</style>
<style lang="less">
#orderDetail .el-button {
  font-weight: 300 !important;
}
#orderDetail .el-button--medium {
  padding: 5px 14px !important;
  line-height: normal !important;
  background: #1a95ff;
  &:last-child {
    padding: 5px !important;
  }
}
.imgCtn {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    .toolTips {
      display: flex;
      align-items: center;
    }
  }
  .img {
    width: 48px;
    padding: 6px;
    height: 48px;
  }
  .toolTips {
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    line-height: 1;
    cursor: pointer;
    span {
      color: #fff;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
</style>
