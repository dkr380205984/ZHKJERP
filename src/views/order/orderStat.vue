<template>
  <div id="orderList"
    v-getHash="{'categoryVal':categoryVal,'typesVal':typesVal,'styleVal':styleVal,'company':company,'searchVal':searchVal,'group':group,'pages':pages}"
    v-loading="loading">
    <div class="head">
      <h2>订单发货列表</h2>
      <el-input placeholder="输入订单号精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
            v-show="categoryValCmp"
            @close="clear('categoryVal')">{{categoryValCmp}}</el-tag>
          <el-tag closable
            v-show="typesValCmp"
            @close="clear('typesVal')">{{typesValCmp}}</el-tag>
          <el-tag closable
            v-show="styleValCmp"
            @close="clear('styleVal')">{{styleValCmp}}</el-tag>
          <el-tag closable
            v-show="companyCmp"
            @close="clear('company')">{{companyCmp}}</el-tag>
          <el-tag closable
            v-show="groupCmp"
            @close="clear('group')">{{groupCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="categoryVal"
              placeholder="筛选品类">
              <el-option v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="typesVal"
              placeholder="筛选类型">
              <el-option v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="styleVal"
              placeholder="筛选款型">
              <el-option v-for="item in style"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="company"
              filterable
              placeholder="外贸公司">
              <el-option v-for="item in companyArrS"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="group"
              placeholder="负责小组">
              <el-option v-for="item in groupArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="rightFilter">
            <span class="changeToScreenShipmentsList"
              @click="$router.push('/screenShipmentsList?categoryVal=' + categoryVal +'&typesVal=' + typesVal +'&styleVal=' + styleVal + '&company=' + company + '&group=' + group + '&start_time=' + (start_time ? start_time.getTime() : '') + '&end_time=' + (end_time ? end_time.getTime() : ''))">大屏模式</span>
            <el-date-picker v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="pickTime">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="mergeTable"
        v-scroll="{fun:getOrderList,pageSize:15}">
        <div class="mergeHeader">
          <div class="tableColumn">发货日期</div>
          <div class="tableColumn">订单号</div>
          <div class="tableColumn"
            style="flex:1.8">订单公司</div>
          <div class="tableColumn"
            style="flex:3">产品信息</div>
          <div class="tableColumn">产品图片</div>
          <div class="tableColumn">下单数</div>
          <div class="tableColumn">小组信息</div>
          <div class="tableColumn">完成状态</div>
          <div class="tableColumn"
            style="flex:1">操作</div>
        </div>
        <div class="mergeBody"
          v-for="(item ,index) in list"
          :key="index"
          :style="{'height':(item.lineNum*60)+'px'}">
          <div class="tableColumn">{{item.date}}</div>
          <div class="tableColumn">
            <div class="small"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div style="margin:auto">{{itemOrder.order_code}}</div>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:1.8">
            <div class="small"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div style="margin:auto">{{itemOrder.company_name}}</div>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:3">
            <div class="small column"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div class="smallChild"
                v-for="(itemProduct,indexProduct) in itemOrder.batch_info"
                :key="indexProduct">
                <div style="margin:auto">
                  <span class="hoverBlue"
                    style="margin:0 5px;cursor:pointer"
                    @click="open('/index/productDetail/'+itemProduct.productInfo.product_id)">{{itemProduct.productCode}}</span>
                  <span style="margin:0 5px">{{itemProduct.productInfo.category_name}}/{{itemProduct.productInfo.type_name}}/{{itemProduct.productInfo.style_name}}/{{itemProduct.productInfo.flower_name}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tableColumn">
            <div class="small column"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div class="smallChild"
                v-for="(itemProduct,indexProduct) in itemOrder.batch_info"
                :key="indexProduct">
                <div class="imgCtn">
                  <img class="img"
                    :src="itemProduct.productInfo.images.length>0?itemProduct.productInfo.images[0].thumb:require('@/assets/image/index/noPic.jpg')"
                    :onerror="defaultImg" />
                  <div class="toolTips"
                    v-if="itemProduct.productInfo.images.length>0"><span @click="showImg(itemProduct.productInfo.images)">点击查看大图</span></div>
                  <div class="toolTips"
                    v-if="itemProduct.productInfo.images.length===0"><span>没有预览图</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="tableColumn">
            <div class="small column"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div class="smallChild"
                v-for="(itemProduct,indexProduct) in itemOrder.batch_info"
                :key="indexProduct">
                <div style="margin:auto">
                  <span style="margin:0 5px">{{itemProduct.sum}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tableColumn">
            <div class="small"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div style="margin:auto">{{itemOrder.group_name}}</div>
            </div>
          </div>
          <div class="tableColumn">
            <div class="small"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div :style="{'margin':'auto','color':((getStatus(item.date,itemOrder.total_number,itemOrder.compiled_number) === '完成') ? '#67c23a' : ( (getStatus(item.date,itemOrder.total_number,itemOrder.compiled_number) !== '未完成') ? '#E0364F' : false))}">{{getStatus(item.date,itemOrder.total_number,itemOrder.compiled_number)}}</div>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:1;">
            <div class="small"
              v-for="(itemOrder,indexOrder) in item.orderInfo"
              :key="indexOrder"
              :style="{'height':(itemOrder.lineNum*60)+'px'}">
              <div style="margin:auto">
                <span class="btns success"
                  @click="$router.push('/index/orderDetailNew/'+itemOrder.order_id)">详情</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mergeBody"
          v-if="list.length===0">
          <div style="width:100%;text-align:center;line-height:59px;">暂无数据</div>
        </div>
      </div>
      <!-- <div class="sum">订单统计:暂不统计</div> -->
      <div class="pageCtn">
        <el-pagination background
          :page-size="15"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getOrderList">
        </el-pagination>
      </div>
    </div>
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
            <img :src="item.image_url"
              class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { orderBatchList, productTppeList, clientList, getGroup } from '@/assets/js/api.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      imgList: [],
      first: true, // 判断是不是第一次进入页面
      loading: true,
      searchVal: '',
      date: '',
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
      total: 0,
      pages: 1,
      list: [],
      category: [], // 大类
      categoryVal: '',
      types: [], // 二级分类
      typesVal: '',
      style: [], // 三级分类
      styleVal: '',
      companyArr: [],
      company: '',
      group: '',
      groupArr: [],
      timer: '',
      start_time: '',
      end_time: '',
      companyArrS: []
    }
  },
  methods: {
    open (url) {
      window.open(url)
    },
    getStatus (time, totalNumber, compiledNumber) {
      if (new Date().getTime() > new Date(time).getTime()) {
        let num = Math.floor((new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24)
        if (num < 1 && totalNumber > compiledNumber) {
          return '未完成'
        } else if (num < 1 && compiledNumber >= totalNumber) {
          return '完成'
        }
        return '逾期' + num + '天'
      } else if (totalNumber > compiledNumber) {
        return '未完成'
      } else {
        return '完成'
      }
    },
    getOrderList () {
      this.loading = true
      orderBatchList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 15,
        'page': this.pages,
        'has_plan': '',
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'client_id': this.company,
        'group_id': this.group,
        'order_code': this.searchVal,
        'start_time': this.start_time,
        'end_time': this.end_time
      }).then((res) => {
        let json = res.data.data.data
        this.list = Object.keys(json).map((key) => {
          let arr = []
          json[key].forEach((item) => {
            let productList = []
            let totalNumber = 0
            let compiledNumber = 0
            item.batch_info.forEach((itemBatch) => {
              if (productList.find((itemFind) => itemFind.productCode === itemBatch.productCode)) {
                let mark = -1
                productList.forEach((itemFind, index) => {
                  if (itemFind.productCode === itemBatch.productCode) {
                    mark = index
                  }
                })
                totalNumber = totalNumber + itemBatch.size.reduce((total, current) => {
                  return total + parseInt(current.numbers)
                }, 0)
                productList[mark].sum = productList[mark].sum + itemBatch.size.reduce((total, current) => {
                  return total + parseInt(current.numbers)
                }, 0)
              } else {
                totalNumber = itemBatch.size.reduce((total, current) => {
                  return total + parseInt(current.numbers)
                }, 0)
                productList.push({
                  productInfo: itemBatch.category_info,
                  productCode: itemBatch.productCode,
                  sum: itemBatch.size.reduce((total, current) => {
                    return total + parseInt(current.numbers)
                  }, 0)
                })
              }
            })
            compiledNumber = compiledNumber + item.log.reduce((total, current) => { return total + parseInt(current.number) }, 0)
            arr.push({
              order_id: item.order_id,
              batch_info: productList,
              group_name: this.groupArr.find((itemGroup) => itemGroup.id === item.group_id).name,
              company_name: this.companyArrS.find((itemCompany) => { return parseInt(itemCompany.id) === item.client_id }).name,
              order_code: item.order_code,
              total_number: totalNumber,
              compiled_number: compiledNumber,
              lineNum: item.batch_info.length
            })
          })
          return {
            lineNum: arr.reduce((total, current) => total + current.lineNum, 0),
            date: key,
            orderInfo: arr
          }
        })
        this.total = res.data.data.count
        this.loading = false
        this.first = false
      })
    },
    pickTime (date) {
      if (date) {
        this.start_time = date[0]
        this.end_time = date[1]
      } else {
        this.start_time = ''
        this.end_time = ''
      }
      this.pages = 1
      this.getOrderList()
    },
    // 删除条件
    clear (item) {
      if (item === 'categoryVal') {
        this.categoryVal = ''
        this.typesVal = ''
        this.types = []
        this.styleVal = ''
        this.style = []
      } else if (item === 'typesVal') {
        this.typesVal = ''
        this.styleVal = ''
        this.style = []
      } else if (item === 'styleVal') {
        this.styleVal = ''
      } else if (item === 'company') {
        this.company = ''
      } else if (item === 'group') {
        this.group = ''
      }
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    }
  },
  watch: {
    categoryVal (newVal) {
      if (this.first) {
        const finded = this.category.find((item) => item.id === newVal)
        this.types = finded ? finded.child : []
      } else {
        if (newVal) {
          this.types = this.category.find((item) => item.id === newVal).child
          this.typesVal = ''
          this.styleVal = ''
          this.style = []
          this.pages = 1
        }
        this.getOrderList()
      }
    },
    typesVal (newVal) {
      if (this.first) {
        const finded = this.types.find((item) => item.id === newVal)
        this.style = finded ? finded.child : []
      } else {
        if (newVal) {
          this.style = this.types.find((item) => item.id === newVal).child
          this.styleVal = ''
          this.pages = 1
        }
        this.getOrderList()
      }
    },
    styleVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getOrderList()
      }
    },
    searchVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getOrderList()
      }
    },
    company (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getOrderList()
      }
    },
    group (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getOrderList()
      }
    }
  },
  computed: {
    categoryValCmp () {
      if (this.categoryVal) {
        return this.category.find((item) => item.id === this.categoryVal).name
      } else {
        return '所有分类'
      }
    },
    typesValCmp () {
      if (this.typesVal) {
        return this.types.find((item) => item.id === this.typesVal).name
      } else {
        return ''
      }
    },
    styleValCmp () {
      if (this.styleVal) {
        return this.style.find((item) => item.id === this.styleVal).name
      } else {
        return ''
      }
    },
    companyCmp () {
      if (this.company) {
        return this.companyArrS.find((item) => item.id === this.company).name
      } else {
        return ''
      }
    },
    groupCmp () {
      if (this.group) {
        return this.groupArr.find((item) => item.id === this.group).name
      } else {
        return ''
      }
    }
  },
  created () {
    const hash = window.location.hash ? JSON.parse(decodeURIComponent(window.location.hash).slice(1)) : {}
    // 分页的特殊性单独处理
    this.pages = hash.pages
    Promise.all([productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }), clientList({
      company_id: window.sessionStorage.getItem('company_id'),
      keyword: '',
      status: 1
    }), getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      this.category = res[0].data.data
      this.companyArrS = res[1].data.data.filter((item) => (item.type.indexOf(1) !== -1))
      this.groupArr = res[2].data.data
      for (let key in hash) {
        this[key] = hash[key]
      }
      this.getOrderList()
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/orderList.less";
</style>
<style lang="less">
#orderList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
  .rightFilter {
    position: relative;
    .changeToScreenShipmentsList {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(-150%);
      background-color: #1a95ff;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      color: #fff;
    }
  }
}
.imgCtn {
  position: relative;
  width: 100%;
  height: 100%;
  &:hover {
    .toolTips {
      display: block;
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
    line-height: 60px;
    cursor: pointer;
    span {
      color: #fff;
      &:hover {
        color: #1a95ff;
      }
    }
  }
  .hoverBlue {
    &:hover {
      color: #1a95ff;
    }
  }
}
</style>
