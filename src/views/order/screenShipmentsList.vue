<template>
  <div id="screenShipments"
    v-loading='loading'>
    <!-- 头部 -->
    <div class="head">
      <h1>订单发货详情表</h1>
      <!-- <div class="info">
        <div class="timeBox">
          <span class="big">{{hours+ ':' + minutes}}</span>
          <span class="small">{{seconds}}</span>
          <span class="yearInfo">
            <span>星期{{day}}</span>
            <span>{{year}}年{{month}}月{{date}}日</span>
          </span>
        </div>
      </div> -->
    </div>
    <!-- 轮播区域 -->
    <div class="label">
      <div class="title">
        <span>类型</span>
        <span>订单号</span>
        <span class="flex18">订单公司</span>
        <span class="warp">
          <span>订单数量</span>
          <span>下单日期</span>
        </span>
        <span class="flex3">进度</span>
        <span>负责小组</span>
        <span>交货日期</span>
        <span>已用工时</span>
        <span>当前状态</span>
      </div>
      <!-- 轮播dom -->
      <el-carousel trigger="click"
        height="100%"
        :interval='30000'
        indicator-position='none'
        arrow='never'
        class="content"
        ref='carousel'
        @change="getPages">
        <el-carousel-item v-for="(items,keys) in filterList"
          :key="keys">
          <div class="table">
            <ul class="tablesCtn">
              <li class="content"
                v-for="(item,key) in items.info"
                :key="key">
                <span class="tableRow">
                  <div class="iconType sample"
                    v-if="item.type === 2">{{'样'}}</div>
                  <div class="iconType"
                    v-else>{{'订'}}</div>
                </span>
                <span class="tableRow">{{item.order_code}}</span>
                <span class="tableRow flex18">{{item.client_name}}</span>
                <span class="tableRow">
                  <div style="line-height:1.4rem;">
                    <span>{{item.order_number ? item.order_number : 0}}件</span>
                    <span>{{item.order_time}}</span>
                  </div>
                </span>
                <span class="tableRow flex3">
                  <el-progress :stroke-width="16"
                    style="width:80%"
                    :percentage="Math.ceil((item.complete_number/item.order_number)*100) > 100 ?  100 : Math.ceil((item.complete_number/item.order_number)*100)">{{item.complete_number}}</el-progress>
                </span>
                <span class="tableRow">{{item.group_name}}</span>
                <span class="tableRow"
                  :style="{'color':isToday(item.complete_time)}">{{item.complete_time}}</span>
                <span class="tableRow">
                  <div style="line-height:1.4rem;">
                    <span>{{computedTime(item.complete_time,item.order_time)[0]+'天'}}</span>
                    <span v-if="computedTime(item.complete_time,item.order_time)[1]"
                      style="color:#FF4D4D">{{computedTime(item.complete_time,item.order_time)[1]}}</span>
                  </div>
                </span>
                <span class="tableRow">
                  <div :class="['nowType',setType(item.order_number,item.complete_number,item.complete_time)]"></div>
                </span>
              </li>
              <li v-if="items.flag"
                class="content"
                :style="{color:'#CCC',flex: 10 - items.info.length}">已是最后一页</li>
            </ul>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 页脚控件及logo -->
    <div class="footed">
      <el-pagination background
        layout="pager"
        :page-size="10"
        :current-page.sync="pages"
        @current-change='setActiveItem(pages)'
        :total="count">
      </el-pagination>
    </div>
    <!-- 时间区域 -->
    <div class="timeInfo">

      <span>{{year}}/{{month}}/{{date}}</span><span style="margin-left:32px">{{hours}}:{{minutes}}:{{seconds}}</span>
    </div>
    <!--icon区域-->
    <div class="client-info">
      <div class="logo">
        <img src="../../assets/image/login/logo.png"
          alt="logo">
        <span>织为云-协同制造云平台</span>
      </div>
      <!-- <div class="app-name"></div> -->
    </div>
    <!-- 工厂名称 -->
    <div class="company-name">{{company_name}}</div>
  </div>
</template>

<script>
import { orderBatchList, companyInfoDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      year: '',
      month: '',
      // day: '',
      date: '',
      hours: '',
      minutes: '',
      seconds: '',
      pages: 1,
      total: 1,
      count: 1,
      start_time: '',
      end_time: '',
      list: [], // 整理好未分页的数据
      filterList: [],
      searchList: {}, // 筛选条件
      popColor: [
        { color: '#06B4FF', percentage: 0 },
        { color: '#04BA88', percentage: 100 }
      ],
      company_name: ''
    }
  },
  methods: {
    // 判断是否为今日
    isToday (time) {
      if ((new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24 > 0 && (new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24 < 1) {
        return '#1A94FF'
      } else if (new Date().getTime() > new Date(time).getTime()) {
        return '#E6A23C'
      } else if (new Date().getTime() < new Date(time).getTime()) {
        return false
      }
    },
    // 计算已用工时及是否超时
    computedTime (time, orderTime) {
      let useDay = Math.ceil((new Date().getTime() - new Date(orderTime).getTime()) / 1000 / 60 / 60 / 24)
      let dayNumber = Math.floor((new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24)
      let str = dayNumber > 0 ? '逾期' + dayNumber + '天' : false
      return [useDay, str]
    },
    // 判断是否逾期
    setType (orderNum, comNum, time) {
      if (comNum >= orderNum) {
        return 'complete'
      } else if (new Date().getTime() > new Date(time).getTime()) {
        return 'overdue'
      } else {
        return 'running'
      }
    },
    // 获取当前时间戳
    getTime () {
      requestAnimationFrame(() => {
        let data = new Date()
        this.year = data.getFullYear()
        this.month = Number(data.getMonth()) > 8 ? Number(data.getMonth()) + 1 : '0' + (Number(data.getMonth()) + 1)
        this.date = Number(data.getDate()) > 9 ? Number(data.getDate()) : '0' + (Number(data.getDate()))
        // switch (data.getDay()) {
        //   case 1:
        //     this.day = '一'
        //     break
        //   case 2:
        //     this.day = '二'
        //     break
        //   case 3:
        //     this.day = '三'
        //     break
        //   case 4:
        //     this.day = '四'
        //     break
        //   case 5:
        //     this.day = '五'
        //     break
        //   case 6:
        //     this.day = '六'
        //     break
        //   case 7:
        //     this.day = '日'
        //     break
        // }
        this.hours = Number(data.getHours()) > 9 ? Number(data.getHours()) : '0' + (Number(data.getHours()))
        this.minutes = Number(data.getMinutes()) > 9 ? Number(data.getMinutes()) : '0' + (Number(data.getMinutes()))
        this.seconds = Number(data.getSeconds()) > 9 ? Number(data.getSeconds()) : '0' + (Number(data.getSeconds()))
        this.getTime()
        this.end_time = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString()
      })
    },
    // 更新pages
    getPages (key) {
      this.pages = key + 1
    },
    setActiveItem (pages) {
      this.$refs.carousel.setActiveItem(pages - 1)
    },
    // 获取数据
    getData (number) {
      orderBatchList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': number,
        'page': this.total,
        'category_id': this.searchList.categoryVal,
        'type_id': this.searchList.typesVal,
        'style_id': this.searchList.styleVal,
        'client_id': this.searchList.company,
        'group_id': this.searchList.group,
        'start_time': this.searchList.start_time ? new Date(Number(this.searchList.start_time)).toISOString() : this.start_time,
        'end_time': this.searchList.end_time ? new Date(Number(this.searchList.end_time)).toISOString() : this.end_time
      }).then(res => {
        if (res.data.status) {
          this.count = res.data.data.count
          let orderInfo = res.data.data
          for (let prop in orderInfo.data) {
            let valOrder = orderInfo.data[prop]
            this.list.push(
              ...valOrder.map(items => {
                return {
                  type: items.type,
                  complete_time: items.delivery_time,
                  order_code: items.order_code,
                  client_name: items.client_name,
                  order_time: items.create_time,
                  order_number: items.batch_info.map(vals => {
                    return vals.size.map(valSize => {
                      return valSize.numbers
                    }).reduce((total, item) => {
                      return Number(total) + Number(item)
                    })
                  }).reduce((total, item) => {
                    return Number(total) + Number(item)
                  }),
                  complete_number: items.log.length > 0 ? items.log.map(vals => {
                    return vals.number
                  }).reduce((total, val) => {
                    return Number(total) + Number(val)
                  }) : 0,
                  group_name: items.group_name
                }
              })
            )
            if (this.list.length === 10) {
              this.filterList.push({ info: this.list.splice(0, 10) })
            }
          }
          if (Math.ceil(orderInfo.count / number) > this.total) {
            this.total++
            this.getData(number)
          } else if (this.list.length > 0) {
            this.filterList.push({ info: this.list.splice(0, 10), flag: true })
            this.list = []
          }
        } else {
          this.$message.error(res.data.message)
          throw res.data.message
        }
        this.loading = false
      }).catch(res => {
        throw res
      })
    }
  },
  created () {
    companyInfoDetail({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      if (res.data.status) {
        this.company_name = res.data.data.company_name
      } else {
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    })
    if (window.location.search) {
      let searchList = window.location.search.split('?')[1].split('&')
      searchList.forEach(item => {
        this.searchList[item.split('=')[0]] = item.split('=')[1]
      })
    }
    // 按esc返回订单发货列表
    let html = document.getElementsByTagName('html')[0]
    html.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        setTimeout(() => {
          this.$router.push('/index/orderStat')
        }, 800)
      }
    }, false)
    this.start_time = new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).toISOString()
    this.end_time = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString()
    this.getTime()
    this.getData(10)
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/screenShipments.less";
</style>
<style lang="less" scope>
#screenShipments {
  .el-progress {
    width: 100%;
    .el-progress-bar__outer {
      background-color: #0a4d72;
    }
    .el-progress__text {
      font-size: 16px !important;
      color: #53c5ca;
    }
  }
  .imgBox {
    & > img {
      height: 70px;
      cursor: pointer;
    }
  }
  .textOverflow {
    display: block;
    font-style: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
