<template>
  <div id="screenShipments">
    <!-- 头部 -->
    <div class="head">
      <h1>订单发货详情表</h1>
      <div class="info">
        <span>{{'桐庐凯瑞针纺有限公司'}}</span>
        <span style="margin-top:10px">当前时间：{{nowTime}}</span>
      </div>
    </div>
    <!-- 可视化图表区域 -->
    <div class="DVbox">
      <div class="explain">
        <div class="border">
          <span>进行中</span>
          <span>逾期</span>
        </div>
        <div class="title">
          <span>本周</span>
          <span>发货数量</span>
        </div>
      </div>
      <div class="ImgBox">
        <div class="DVBox">
          <div class="DVImg"></div>
          <span>2000条</span>
        </div>
        <div class="DVBox">
          <div class="DVImg"></div>
          <span>2000条</span>
        </div>
        <div class="DVBox">
          <div class="DVImg"></div>
          <span>2000条</span>
        </div>
        <div class="DVBox">
          <div class="DVImg"></div>
          <span>2000条</span>
        </div>
        <div class="DVBox">
          <div class="DVImg"></div>
          <span>2000条</span>
        </div>
        <div class="DVBox">
          <div class="DVImg"></div>
          <span>2000条</span>
        </div>
      </div>
    </div>
    <!-- 轮播区域 -->
    <div class="label">
      <div class="title">
        <span>发货日期</span>
        <span>订单号</span>
        <span>订单公司</span>
        <span style="flex:5">产品详情</span>
        <span>数量合计(已完成/总和)</span>
        <span>负责小组</span>
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
        <el-carousel-item v-for="(item,key) in orderList"
          :key="key">
          <div class="table">
            <ul class="tablesCtn"
              style="width:100%">
              <li class="content">
                <span class="tableRow">{{item.timer}}</span>
                <span class="tableRow col"
                  style="flex:10">
                  <span class="tableColumn"
                    v-for="(value,index) in item.data"
                    :key="index">
                    <span class="tableRow">{{value.order_code}}</span>
                    <span class="tableRow">{{value.order_client}}</span>
                    <span class="tableRow col"
                      style="flex:5">
                      <span class="tableColumn"
                        v-for="(valPro,indPro) in value.product_info"
                        :key="indPro">
                        <span class="tableRow">{{valPro.product_code}}<br />{{valPro.product_type}}</span>
                        <span class="tableRow">图片</span>
                        <span class="tableRow"
                          style="flex:2;flex-wrap:wrap;justify-content: space-between">
                          <!-- <span class="tableColumn"> -->
                          <em class="sizeWrap"
                            v-for="(valSize,indSize) in valPro.size"
                            :key="indSize">{{valSize.size + '/' + valSize.color + ' ' + valSize.order_number + '件'}}
                          </em>
                          <em class="sizeWrap"
                            v-if="valPro.size.length%2 !== 0"></em>
                        </span>
                        <!-- </span> -->
                      </span>
                    </span>
                    <span class="tableRow">{{value.compiled_number + '/' + value.total_number}}</span>
                    <span class="tableRow">{{value.group_name}}</span>
                    <span class="tableRow"></span>
                  </span>
                </span>
              </li>
              <li class="content"></li>
            </ul>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 页脚控件及logo -->
    <div class="
                            footed">
      <div class="logo"></div>
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
export default {
  data () {
    return {
      nowTime: '',
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '围巾',
            type: 'pie',
            radius: ['60% ', '90% '],
            avoidLabelOverlap: false,
            label: {
              // normal: {
              //   show: false
              // },
              formatter: '{a}\n50%',
              show: true,
              position: 'center',
              textStyle: {
                color: '#27AE60',
                fontSize: 24
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '已完成' },
              { value: 310, name: '未完成' },
              { value: 234, name: '逾期' }
            ]
          }
        ],
        color: ['#27AE60', '#E0E0E0', '#C1272D']
      },
      total: 26,
      pages: 1,
      orderList: [
        {
          timer: '2019-7-24',
          data: [
            {
              order_code: 'kR-0001',
              order_client: '杭州飞泰服饰有限公司',
              group_name: 'A组',
              product_info: [
                {
                  product_code: '19ABC0001',
                  product_type: '围巾/针织/长巾/条纹',
                  img: [],
                  total_number: '8000',
                  compiled: 6000,
                  size: [
                    {
                      size: '均码',
                      color: '红色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '绿色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '白色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    }
                  ]
                }
              ]
            },
            {
              order_code: 'kR-0001',
              order_client: '杭州飞泰服饰有限公司',
              group_name: 'A组',
              product_info: [
                {
                  product_code: '19ABC0001',
                  product_type: '围巾/针织/长巾/条纹',
                  img: [],
                  total_number: '8000',
                  compiled: 6000,
                  size: [
                    {
                      size: '均码',
                      color: '红色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '绿色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '白色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    }
                  ]
                }
              ]
            },
            {
              order_code: 'kR-0001',
              order_client: '杭州飞泰服饰有限公司',
              group_name: 'A组',
              product_info: [
                {
                  product_code: '19ABC0001',
                  product_type: '围巾/针织/长巾/条纹',
                  img: [],
                  total_number: '8000',
                  compiled: 6000,
                  size: [
                    {
                      size: '均码',
                      color: '红色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '绿色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '白色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          timer: '2019-7-25',
          data: [
            {
              order_code: 'kR-0001',
              order_client: '杭州飞泰服饰有限公司',
              group_name: 'A组',
              total_number: '8000',
              compiled_number: 6000,
              product_info: [
                {
                  product_code: '19ABC0001',
                  product_type: '围巾/针织/长巾/条纹',
                  img: [],
                  size: [
                    {
                      size: '均码',
                      color: '红色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '绿色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '白色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    }
                  ]
                }
              ]
            },
            {
              order_code: 'kR-0001',
              order_client: '杭州飞泰服饰有限公司',
              group_name: 'A组',
              total_number: '8000',
              compiled: 6000,
              product_info: [
                {
                  product_code: '19ABC0001',
                  product_type: '围巾/针织/长巾/条纹',
                  img: [],
                  size: [
                    {
                      size: '均码',
                      color: '红色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '绿色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '白色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    }
                  ]
                }
              ]
            },
            {
              order_code: 'kR-0001',
              order_client: '杭州飞泰服饰有限公司',
              group_name: 'A组',
              total_number: '8000',
              compiled: 6000,
              product_info: [
                {
                  product_code: '19ABC0001',
                  product_type: '围巾/针织/长巾/条纹',
                  img: [],
                  size: [
                    {
                      size: '均码',
                      color: '红色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '绿色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '白色',
                      order_number: '2000'
                    },
                    {
                      size: '均码',
                      color: '黄色',
                      order_number: '2000'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 获取当前时间戳
    getTime () {
      requestAnimationFrame(() => {
        let data = new Date()
        this.nowTime = data.getFullYear() + '年' + (Number(data.getMonth()) + 1) + '月' + data.getDate() + '日' + ' ' + (data.getHours() / 12 > 0 ? '下午' + (data.getHours() - 12) : '上午' + data.getHours()) + '点' + data.getMinutes() + '分' + data.getSeconds() + '秒'
        this.getTime()
      })
    },
    // 更新pages
    getPages (key) {
      this.pages = key + 1
    },
    setActiveItem (pages) {
      console.log(this.$refs)
      this.$refs.carousel.setActiveItem(pages - 1)
    }
  },
  created () {
    this.getTime()
    this.total = this.orderList.length
  },
  mounted () {
    let DVImg = document.getElementsByClassName('DVImg')
    for (let ind in DVImg) {
      if (DVImg[ind].className) {
        let myChart = this.$echarts.init(DVImg[ind])
        myChart.setOption(this.option)
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/screenShipments.less";
</style>
