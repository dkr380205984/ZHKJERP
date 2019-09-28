<template>
  <div id="orderList"
    v-getHash="{'categoryVal':categoryVal,'typesVal':typesVal,'styleVal':styleVal,'company':company,'searchVal':searchVal,'searchVal2':searchVal2,'group':group,'pages':pages}"
    v-loading="loading">
    <div class="head">
      <h2>样单列表</h2>
      <div>
        <el-input placeholder="输入样单标题搜索"
          suffix-icon="el-icon-search"
          style="margin-right:25px"
          v-model="searchVal"></el-input>
        <el-input placeholder="输入产品编号搜索"
          suffix-icon="el-icon-search"
          v-model="searchVal2"></el-input>
      </div>
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
              <el-option v-for="item in companyArr"
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
            <el-date-picker v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
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
        v-scroll="{fun:getOrderList,pageSize:5}">
        <div class="mergeHeader">
          <div class="tableColumn">样单标题</div>
          <div class="tableColumn">外贸公司</div>
          <div class="tableColumn"
            style="flex:2">样品信息</div>
          <div class="tableColumn"
            style="flex:0.7">样品图片</div>
          <div class="tableColumn"
            style="flex:0.7">打样数量</div>
          <div class="tableColumn"
            style="flex:0.7">负责小组</div>
          <div class="tableColumn"
            style="flex:0.7">订单状态</div>
          <div class="tableColumn">下单日期</div>
          <div class="tableColumn">样单交货</div>
          <div class="tableColumn"
            style="flex:1.3">操作</div>
        </div>
        <div class="mergeBody"
          v-for="(item ,index) in list"
          :key="index">
          <div class="tableColumn">{{item.order_code}}</div>
          <div class="tableColumn">{{item.client_name}}</div>
          <div class="tableColumn"
            style="flex:2">
            <div class="small"
              v-for="(itemProduct,indexProduct) in item.productList"
              :key="indexProduct"
              style="height:60px;text-align:center;justify-content:space-around">
              <span style="display:inline-block">
                <span class="hoverBlue"
                  style="margin:0 5px;cursor:pointer"
                  @click="open('/index/productDetail/'+itemProduct.productInfo.id)">{{itemProduct.productCode}}</span>
                <span style="margin:0 5px">{{itemProduct.productInfo.category_info.category_name}}/{{itemProduct.productInfo.category_info.type_name}}/{{itemProduct.productInfo.category_info.style_name}}/{{itemProduct.productInfo.category_info.flower_id}}</span>
              </span>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:0.7">
            <div class="imgCtn small"
              v-for="(itemProduct,indexProduct) in item.productList"
              :key="indexProduct">
              <img class="img"
                :src="itemProduct.productInfo.category_info.images.length>0?itemProduct.productInfo.category_info.images[0].thumb:require('@/assets/image/index/noPic.jpg')"
                :onerror="defaultImg" />
              <div class="toolTips"
                v-if="itemProduct.productInfo.category_info.images.length>0"><span @click="showImg(itemProduct.productInfo.category_info.images)">点击查看大图</span></div>
              <div class="toolTips"
                v-if="itemProduct.productInfo.category_info.images.length===0"><span>没有预览图</span></div>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:0.7">
            <div class="small"
              v-for="(itemProduct,indexProduct) in item.productList"
              :key="indexProduct"
              style="height:60px;text-align:center;justify-content:space-around">
              <span style="display:inline-block">
                <span style="margin:0 5px">{{itemProduct.sum}}{{itemProduct.productInfo.category_info.name}}</span>
              </span>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:0.7">{{item.group_name}}</div>
          <div class="tableColumn"
            style="flex:0.7"
            :style="{'color':statusStyle(item.status,item.has_log)}">{{sampleTypeArr.find(key=>key.id === item.order_type).name}}</div>
          <div class="tableColumn">{{item.order_time}}</div>
          <div class="tableColumn">{{item.delivery_time[0]}}</div>
          <div class="tableColumn"
            style="flex-direction:row;flex:1.3">
            <div style="margin:auto">
              <span class="btns success"
                @click="$router.push('/index/sampleOrderDetail/' + item.id)">详情</span>
              <!-- <span class="btns warning"
                @click="$router.push('/index/orderUpdate/' + item.id)">修改</span> -->
              <span class="btns error"
                style="display:none"
                @click="deleteOrder(item.id)">删除</span>
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
          :page-size="5"
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
import { productTppeList, clientList, getGroup, orderDelete, orderList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      first: true, // 判断是不是第一次进入页面
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
      imgList: [],
      loading: true,
      searchVal: '',
      searchVal2: '',
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
      sampleTypeArr: [{
        id: 0,
        name: '开发样'
      }, {
        id: 1,
        name: '修改样'
      }, {
        id: 2,
        name: '销售样'
      }, {
        id: 3,
        name: '确认样'
      }, {
        id: 4,
        name: '产前样'
      }, {
        id: 5,
        name: '大货样'
      }],
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
      end_time: ''
    }
  },
  methods: {
    // 订单状态
    orderStatus (val, hasLog) {
      if (val === 1) {
        return '已完成'
      } else if (val === 2) {
        return '已取消'
      } else {
        if (hasLog) {
          return '进行中'
        }
      }
      return '已创建'
    },
    statusStyle (val, hasLog) {
      if (val === 1) {
        return '#67c23a'
      } else if (val === 2) {
        return '#F56C6C'
      } else {
        if (hasLog) {
          return '#1a95ff'
        }
      }
      return '#E6A23C'
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    open (url) {
      window.open(url)
    },
    getOrderList () {
      this.loading = true
      orderList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 5,
        'page': this.pages,
        'has_plan': '',
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'client_id': this.company,
        'group_id': this.group,
        'order_code': this.searchVal,
        'product_code': this.searchVal2,
        'start_time': this.start_time,
        'end_time': this.end_time,
        'type': 2
      }).then((res) => {
        this.loading = false
        this.total = res.data.meta.total
        this.list = res.data.data.map((item) => {
          let productList = []
          let deliveryTime = []
          for (let prop in item.order_batch) {
            let itemOrder = item.order_batch[prop]
            for (let index in itemOrder) {
              let itemBatch = itemOrder[index]
              if (productList.find((itemFind) => itemFind.productCode === itemBatch.product_code)) {
                let mark = -1
                productList.forEach((itemFind, index) => {
                  if (itemFind.productCode === itemBatch.product_code) {
                    mark = index
                  }
                })
                productList[mark].sum = productList[mark].sum + itemBatch.numbers
              } else {
                productList.push({
                  productInfo: itemBatch,
                  productCode: itemBatch.product_code,
                  sum: itemBatch.numbers
                })
              }
              if (deliveryTime.indexOf(itemBatch.delivery_time) === -1) {
                deliveryTime.push(itemBatch.delivery_time)
              }
            }
          }
          return {
            id: item.id,
            has_log: item.has_log,
            status: item.status,
            order_type: item.sample_order_type,
            group_name: item.group_name,
            order_code: item.order_code,
            order_time: item.order_time,
            client_name: item.client_name,
            contacts: item.contacts,
            delivery_time: deliveryTime,
            productList: productList,
            lineNum: productList.length // 这个参数用于计算每行的高度
          }
        })
        console.log(this.list)
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
    // 删除订单
    deleteOrder (id) {
      this.$confirm('此操作将删除订单和相关联的生产计划单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderDelete({
          id: id
        }).then((res) => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getOrderList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    searchVal2 (newVal) {
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
        return this.companyArr.find((item) => item.id === this.company).name
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
      this.companyArr = res[1].data.data.filter((item) => (item.type.indexOf(1) !== -1))
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
}
.hoverBlue {
  &:hover {
    color: #1a95ff;
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
    margin: auto;
  }
  .toolTips {
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 60px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    cursor: pointer;
    span {
      color: #fff;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .main {
    width: 1000px;
    height: 600px;
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    .imgList {
      max-height: 550px;
      margin: auto;
      display: block;
    }
    .closeBtn {
      position: absolute;
      right: 0;
      top: -78px;
      color: #fff;
      width: 100%;
      text-align: center;
      font-size: 26px;
      cursor: pointer;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
</style>
