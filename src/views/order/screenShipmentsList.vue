<template>
  <div id="screenShipments"
    v-loading='loading'>
    <!-- 头部 -->
    <div class="head">
      <h1>订单发货详情表
        <span class="client">{{'桐庐凯瑞针纺有限公司'}}</span></h1>
      <div class="info">
        <div class="timeBox">
          <span class="big">{{hours+ ':' + minutes}}</span>
          <span class="small">{{seconds}}</span>
          <span class="yearInfo">
            <span>星期{{day}}</span>
            <span>{{year}}年{{month}}月{{date}}日</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 轮播区域 -->
    <div class="label">
      <div class="title">
        <span>发货日期</span>
        <span>订单号</span>
        <span>负责小组</span>
        <span style="flex:5">产品详情</span>
        <span class="warp">
          <span>数量合计</span>
          <span>(已完成/总和)</span>
        </span>
        <span>已用工时</span>
        <span>当前状态</span>
      </div>
      <!-- 轮播dom -->
      <el-carousel trigger="click"
        height="100%"
        :interval='6000'
        indicator-position='none'
        arrow='never'
        class="content"
        ref='carousel'
        @change="getPages">
        <el-carousel-item v-for="(items,keys) in pagingList"
          :key="keys">
          <div class="table">
            <ul class="tablesCtn">
              <li class="content"
                v-for="(item,key) in items.data"
                :key="key">
                <span class="tableRow"
                  :style="{'font-size':'24px','color':isToday(item.delivery_time)}">{{item.delivery_time}}</span>
                <span class="tableRow col"
                  style="flex:10">
                  <span class="tableColumn"
                    v-for="(value,index) in item.data"
                    :key="index"
                    :style="{background:(value.id % 2 === 1 ? 'rgb(250,250,250)' : false)}">
                    <span class="tableRow">
                      <div style="line-height:1.4rem;">
                        <em class="textOverflow"
                          style="max-width:170px;">{{value.order_code}}</em>
                        <em style="font-size:16px;max-width:170px;"
                          class="textOverflow">{{value.order_client}}</em>
                      </div>
                    </span>
                    <span class="tableRow">{{value.group_name}}</span>
                    <span class="tableRow col"
                      style="flex:5">
                      <span class="tableColumn"
                        v-for="(valPro,indPro) in value.product_info"
                        :key="indPro">
                        <span class="tableRow">
                          <div style="line-height:1.4rem;">
                            <span>{{valPro.product_code}}</span>
                            <span>{{valPro.product_type}}</span>
                          </div>
                        </span>
                        <span class="tableRow imgBox">
                          <img :src="(valPro.img.length > 0 ? valPro.img[0].thumb : require('@/assets/image/index/noPic.jpg'))"
                            alt="">
                        </span>
                        <span class="tableRow col"
                          style="flex:2;">
                          <span class="tableColumn"
                            v-for="(valSize,indSize) in valPro.size_info"
                            :key="indSize">
                            <span class="tableRow">
                              <em style="flex:1.5;max-width:130px;"
                                class="textOverflow">{{valSize.size + '/' + valSize.color}}</em>
                              <em>{{valSize.number + valPro.unit}}</em>
                            </span>
                            <span class="tableRow">
                              <el-progress :class="setColor(item.delivery_time) ? 'success' : 'warning'"
                                :stroke-width="10"
                                :percentage="Math.ceil((valSize.compiled_number/valSize.number)*100)"></el-progress>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow"
                      :style="{color:((value.compiled_number / value.total_number) >= 1)? '#67c23a' : (computedTime(item.delivery_time,value.order_time)[1] === '未完成' ? false : '#E0364F')}">
                      <div style="line-height:1.5rem;">
                        <span style="font-size:1.3rem;">{{((value.compiled_number / value.total_number)*100).toFixed(2) + '%'}}</span>
                        <span>{{value.compiled_number + '/' + value.total_number}}</span>
                      </div>
                    </span>
                    <span class="tableRow"
                      :style="{color:((value.compiled_number / value.total_number) >= 1)? '#67c23a' : (computedTime(item.delivery_time,value.order_time)[1] === '未完成' ? false : '#E0364F')}">{{computedTime(item.delivery_time,value.order_time)[0]}}天</span>
                    <span class="tableRow"
                      :style="{color:((value.compiled_number / value.total_number) >= 1)? '#67c23a' : (computedTime(item.delivery_time,value.order_time)[1] === '未完成' ? false : '#E0364F'),'font-size':'24px'}">{{((value.compiled_number / value.total_number) >= 1) ? '完成' : computedTime(item.delivery_time,value.order_time)[1]}}</span>
                  </span>
                </span>
              </li>
              <li v-if="!items.flag"
                class="content"
                style="color:#CCC">已是最后一页</li>
            </ul>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 页脚控件及logo -->
    <div class="footed">
      <div class="logo">
        <img src="../../assets/image/icon/logo.png"
          alt="logo">
        <span>织慧科技</span>
      </div>
      <el-pagination background
        layout="pager"
        :page-size="1"
        :current-page.sync="pages"
        @current-change='setActiveItem(pages)'
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { orderBatchList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      year: '',
      month: '',
      day: '',
      date: '',
      hours: '',
      minutes: '',
      seconds: '',
      total: 0,
      pages: 1,
      count: 1,
      start_time: '',
      end_time: '',
      list: [], // 整理好未分页的数据
      pagingList: [], // 分页好的数据
      searchList: {} // 筛选条件
    }
  },
  methods: {
    // 判断是否为今日
    isToday (time) {
      if ((new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24 > 0 && (new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24 < 1) {
        return '#1A94FF'
      } else {
        return false
      }
    },
    // 计算已用工时及是否超时
    computedTime (time, orderTime) {
      let useDay = Math.ceil((new Date().getTime() - new Date(orderTime).getTime()) / 1000 / 60 / 60 / 24)
      let dayNumber = Math.floor((new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24)
      let str = dayNumber > 0 ? '逾期' + dayNumber + '天' : '未完成'
      return [useDay, str]
    },
    // 判断是否逾期
    setColor (time) {
      if (new Date(time).getTime() > new Date().getTime()) {
        return true
      } else {
        return false
      }
    },
    // 获取当前时间戳
    getTime () {
      requestAnimationFrame(() => {
        let data = new Date()
        this.year = data.getFullYear()
        this.month = Number(data.getMonth()) > 8 ? Number(data.getMonth()) + 1 : '0' + (Number(data.getMonth()) + 1)
        this.date = Number(data.getDate()) > 9 ? Number(data.getDate()) : '0' + (Number(data.getDate()))
        switch (data.getDay()) {
          case 1:
            this.day = '一'
            break
          case 2:
            this.day = '二'
            break
          case 3:
            this.day = '三'
            break
          case 4:
            this.day = '四'
            break
          case 5:
            this.day = '五'
            break
          case 6:
            this.day = '六'
            break
          case 7:
            this.day = '日'
            break
        }
        this.hours = Number(data.getHours()) > 9 ? Number(data.getHours()) : '0' + (Number(data.getHours()))
        this.minutes = Number(data.getMinutes()) > 9 ? Number(data.getMinutes()) : '0' + (Number(data.getMinutes()))
        this.seconds = Number(data.getSeconds()) > 9 ? Number(data.getSeconds()) : '0' + (Number(data.getSeconds()))
        this.getTime()
        this.total = this.pagingList.length
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
    getData (number, pageNumber) {
      orderBatchList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': number,
        'page': this.count,
        'category_id': this.searchList.categoryVal,
        'type_id': this.searchList.typesVal,
        'style_id': this.searchList.styleVal,
        'client_id': this.searchList.company,
        'group_id': this.searchList.group,
        'start_time': this.searchList.start_time ? new Date(Number(this.searchList.start_time)).toISOString() : this.start_time,
        'end_time': this.searchList.end_time ? new Date(Number(this.searchList.end_time)).toISOString() : this.end_time
      }).then(res => {
        if (res.status) {
          let orderInfo = res.data.data
          // console.log(orderInfo)
          for (let prop in orderInfo.data) {
            let valTime = orderInfo.data[prop]
            valTime.forEach((valOrder, indOrder) => {
              valOrder.batch_info = JSON.parse(valOrder.batch_info)
              valOrder.batch_info.forEach((valPro, indPro) => {
                valPro.size.forEach((valSize, indSize) => {
                  // 拆分数据  利于切割分页
                  let flag = this.list.find(item => (item.delivery_time === valOrder.delivery_time && item.order_code === valOrder.order_code && item.product_code === valPro.productCode && item.size === valSize.name[0] && item.color === valSize.name[1]))
                  if (!flag) {
                    this.list.push(
                      {
                        delivery_time: valOrder.delivery_time,
                        order_code: valOrder.order_code,
                        order_time: valOrder.create_time,
                        order_client: valOrder.client_name,
                        group_name: valOrder.group_name,
                        total_number: valSize.numbers,
                        unit: valPro.productInfo.category_info.name,
                        compiled_number: 0,
                        product_code: valPro.productCode,
                        product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? ('/' + valPro.productInfo.flower_id) : ''),
                        img: [...valPro.productInfo.img],
                        size: valSize.name[0],
                        color: valSize.name[1],
                        number: valSize.numbers
                      }
                    )
                  } else {
                    flag.total_number = Number(flag.total_number ? flag.total_number : 0) + Number(valSize.numbers)
                    flag.number = Number(flag.number ? flag.number : 0) + Number(valSize.numbers)
                    valPro.productInfo.img.forEach(valImg => {
                      if (flag.img.indexOf(valImg) === -1) {
                        flag.img.push(valImg)
                      }
                    })
                  }
                  // 仅用于比对数据  无用
                  // let time = this.lists.find(item => item.delivery_time === valOrder.delivery_time)
                  // if (!time) {
                  //   this.lists.push(
                  //     {
                  //       delivery_time: valOrder.delivery_time,
                  //       data: [
                  //         {
                  //           order_code: valOrder.order_code,
                  //           order_time: valOrder.create_time,
                  //           order_client: valOrder.client_name,
                  //           group_name: valOrder.group_name,
                  //           total_number: valSize.numbers,
                  //           unit: valPro.productInfo.category_info.name,
                  //           compiled_number: 0,
                  //           product_info: [
                  //             {
                  //               product_code: valPro.productCode,
                  //               product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? ('/' + valPro.productInfo.flower_id) : ''),
                  //               img: [...valPro.productInfo.img],
                  //               size_info: [
                  //                 {
                  //                   size: valSize.name[0],
                  //                   color: valSize.name[1],
                  //                   number: valSize.numbers
                  //                 }
                  //               ]
                  //             }
                  //           ]
                  //         }
                  //       ]
                  //     }
                  //   )
                  // } else {
                  //   let order = time.data.find(item => item.order_code === valOrder.order_code)
                  //   if (!order) {
                  //     time.data.push({
                  //       order_code: valOrder.order_code,
                  //       order_time: valOrder.create_time,
                  //       order_client: valOrder.client_name,
                  //       group_name: valOrder.group_name,
                  //       total_number: valSize.numbers,
                  //       unit: valPro.productInfo.category_info.name,
                  //       compiled_number: 0,
                  //       product_info: [
                  //         {
                  //           product_code: valPro.productCode,
                  //           product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? ('/' + valPro.productInfo.flower_id) : ''),
                  //           img: [...valPro.productInfo.img],
                  //           size_info: [
                  //             {
                  //               size: valSize.name[0],
                  //               color: valSize.name[1],
                  //               number: valSize.numbers
                  //             }
                  //           ]
                  //         }
                  //       ]
                  //     })
                  //   } else {
                  //     order.total_number = Number(order.total_number) + Number(valSize.numbers)
                  //     let product = order.product_info.find(item => item.product_code === valPro.productCode)
                  //     if (!product) {
                  //       order.product_info.push({
                  //         product_code: valPro.productCode,
                  //         product_type: valPro.productInfo.category_info.product_category + '/' + valPro.productInfo.type_name + '/' + valPro.productInfo.style_name + (valPro.productInfo.flower_id ? ('/' + valPro.productInfo.flower_id) : ''),
                  //         img: [...valPro.productInfo.img],
                  //         size_info: [
                  //           {
                  //             size: valSize.name[0],
                  //             color: valSize.name[1],
                  //             number: valSize.numbers
                  //           }
                  //         ]
                  //       })
                  //     } else {
                  //       let size = product.size_info.find(item => (item.size === valSize.name[0] && item.color === valSize.name[1]))
                  //       if (!size) {
                  //         product.size_info.push({
                  //           size: valSize.name[0],
                  //           color: valSize.name[1],
                  //           number: valSize.numbers
                  //         })
                  //       } else {
                  //         size.number = Number(size.number) + Number(valSize.numbers)
                  //       }
                  //     }
                  //   }
                  // }
                })
              })
              valOrder.log.forEach(valPro => {
                // 插入已完成成品检验的数据
                let flags = this.list.find(item => (item.delivery_time === valOrder.delivery_time && item.order_code === valOrder.order_code && item.product_code === valPro.product_info.product_code && item.size === valPro.size && item.color === valPro.color))
                if (flags) {
                  flags.compiled_number = Number(flags.compiled_number ? flags.compiled_number : 0) + Number(valPro.number)
                }
                // 仅用于比对数据  无用
                // let flag = this.lists.find(item => item.delivery_time === valOrder.delivery_time)
                // if (flag) {
                //   let flag1 = flag.data.find(item => item.order_code === valOrder.order_code)
                //   if (flag1) {
                //     let flag2 = flag1.product_info.find(item => item.product_code === valPro.product_info.product_code)
                //     if (flag2) {
                //       let flag3 = flag2.size_info.find(item => (item.size === valPro.size && item.color === valPro.color))
                //       if (flag3) {
                //         flag3.compiled_number = Number(flag3.compiled_number ? flag3.compiled_number : 0) + Number(valPro.number)
                //         flag1.compiled_number = Number(flag1.compiled_number ? flag1.compiled_number : 0) + Number(valPro.number)
                //       }
                //     }
                //   }
                // }
              })
            })
          }
          // console.log(this.list)
          // console.log(this.lists)
          this.paging(this.list, pageNumber)
          if (this.loading) {
            this.loading = false
          }
          if (Math.ceil(orderInfo.count / number) > this.count) {
            this.count++
            this.getData(number, pageNumber)
          } else {
            this.goOnPaging(this.list, pageNumber)
          }
        }
      }).catch(res => {
        console.log('error')
      })
    },
    // 切割list数组进行分页
    paging (data, number) {
      this.total = this.pagingList.length
      console.log(this.total, this.pagingList)
      // 切割数据
      let list = data.splice(0, number)
      let arr = []
      let num = 1
      let flag = list.length === Number(number)
      // console.log(flag)
      // 合并切割的数据
      list.forEach(val => {
        let time = arr.find(item => item.delivery_time === val.delivery_time)
        if (!time) {
          arr.push({
            delivery_time: val.delivery_time,
            data: [
              {
                id: num,
                order_code: val.order_code,
                order_time: val.order_time,
                order_client: val.order_client,
                group_name: val.group_name,
                total_number: val.total_number,
                compiled_number: (val.compiled_number ? val.compiled_number : 0),
                product_info: [
                  {
                    product_code: val.product_code,
                    product_type: val.product_type,
                    img: [...val.img],
                    unit: val.unit,
                    size_info: [
                      {
                        size: val.size,
                        color: val.color,
                        number: val.number,
                        compiled_number: (val.compiled_number ? val.compiled_number : 0)
                      }
                    ]
                  }
                ]
              }
            ]
          })
          num++
        } else {
          let order = time.data.find(item => item.order_code === val.order_code)
          if (!order) {
            time.data.push({
              id: num,
              order_code: val.order_code,
              order_time: val.order_time,
              order_client: val.order_client,
              group_name: val.group_name,
              total_number: val.total_number,
              compiled_number: (val.compiled_number ? val.compiled_number : 0),
              product_info: [
                {
                  product_code: val.product_code,
                  product_type: val.product_type,
                  img: [...val.img],
                  unit: val.unit,
                  size_info: [
                    {
                      size: val.size,
                      color: val.color,
                      number: val.number,
                      compiled_number: (val.compiled_number ? val.compiled_number : 0)
                    }
                  ]
                }
              ]
            })
            num++
          } else {
            order.compiled_number = Number(order.compiled_number ? order.compiled_number : 0) + Number(val.compiled_number ? val.compiled_number : 0)
            order.total_number = Number(order.total_number ? order.total_number : 0) + Number(val.total_number)
            let product = order.product_info.find(item => item.product_code === val.product_code)
            if (!product) {
              order.product_info.push({
                product_code: val.product_code,
                product_type: val.product_type,
                img: [...val.img],
                unit: val.unit,
                size_info: [
                  {
                    size: val.size,
                    color: val.color,
                    number: val.number,
                    compiled_number: (val.compiled_number ? val.compiled_number : 0)
                  }
                ]
              })
            } else {
              let size = product.size_info.find(item => (item.size === val.size && item.color === val.color))
              if (!size) {
                product.size_info.push({
                  size: val.size,
                  color: val.color,
                  number: val.number,
                  compiled_number: (val.compiled_number ? val.compiled_number : 0)
                })
              } else {
                size.number = Number(size.number ? size.number : 0) + Number(val.number)
                size.compiled_number = Number(size.compiled_number ? size.compiled_number : 0) + Number(val.compiled_number)
              }
            }
          }
        }
      })
      // arr.forEach(valTime => {
      //   valTime.data.forEach(valOrder => {
      //     valOrder.product_info.forEach(valPro => {
      //       if (valPro.size_info.length === 1) {
      //         valPro.flex = 2
      //         valOrder.flex = Number(valOrder.flex ? valOrder.flex : 0) + 2
      //         valTime.flex = Number(valTime.flex ? valTime.flex : 0) + 2
      //       } else {
      //         valPro.flex = valPro.size_info.length
      //         valOrder.flex = Number(valOrder.flex ? valOrder.flex : 0) + Number(valPro.size_info.length)
      //         valTime.flex = Number(valTime.flex ? valTime.flex : 0) + Number(valPro.size_info.length)
      //       }
      //     })
      //   })
      // })
      this.pagingList.push({
        flag: flag,
        data: arr
      })
      console.log(this.pagingList)
    },
    // 当停止获取数据时，继续切割分页
    goOnPaging (data, number) {
      if (data.length !== 0) {
        this.paging(data, number)
        this.goOnPaging(data, number)
      }
    }
  },
  created () {
    if (window.location.search) {
      let searchList = window.location.search.split('?')[1].split('&')
      searchList.forEach(item => {
        this.searchList[item.split('=')[0]] = item.split('=')[1]
      })
      console.log(this.searchList)
    }
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
    this.getData(12, 12)
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/screenShipments.less";
</style>
<style lang="less" scope>
.success {
  width: 90%;
  .el-progress-bar__inner {
    background-color: #67c23a;
  }
}
.warning {
  width: 90%;
  .el-progress-bar__inner {
    background-color: #edbf43;
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
</style>
