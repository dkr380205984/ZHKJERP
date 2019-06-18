<template>
  <div id="orderList"
    v-loading="loading">
    <div class="head">
      <h2>订单列表</h2>
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
      <div class="mergeTable">
        <div class="mergeHeader">
          <div class="tableColumn">订单号</div>
          <div class="tableColumn">外贸公司</div>
          <div class="tableColumn"
            style="flex:2">产品信息</div>
          <div class="tableColumn"
            style="flex:0.7">下单数</div>
          <div class="tableColumn"
            style="flex:0.7">负责小组</div>
          <div class="tableColumn"
            style="flex:0.7">下单日期</div>
          <div class="tableColumn">交货日期</div>
          <div class="tableColumn"
            style="flex:0.7">订单状态</div>
          <div class="tableColumn"
            style="flex:1.3">操作</div>
        </div>
        <div class="mergeBody"
          v-for="(item ,index) in list"
          :key="index"
          v-scroll="{fun:getOrderList,pageSize:5}">
          <div class="tableColumn">{{item.order_code}}</div>
          <div class="tableColumn">{{item.client_name}}</div>
          <div class="tableColumn"
            style="flex:2">
            <div class="small"
              v-for="(itemProduct,indexProduct) in item.productList"
              :key="indexProduct"
              style="height:60px;text-align:center;justify-content:space-around">
              <span style="display:inline-block">
                <span style="margin:0 5px">{{itemProduct.productCode}}</span>
                <span style="margin:0 5px">{{itemProduct.productInfo.category_info.product_category}}/{{itemProduct.productInfo.type_name}}/{{itemProduct.productInfo.style_name}}/{{itemProduct.productInfo.flower_id}}</span>
              </span>
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
            style="flex:0.7">{{item.order_time}}</div>
          <div class="tableColumn">
            <div class="once"
              v-for="(itemTime,indexTime) in item.delivery_time"
              :key="indexTime">
              <span>第 {{indexTime+1}} 批：</span>
              <span>{{itemTime}}</span>
            </div>
          </div>
          <div class="tableColumn"
            style="flex:0.7">暂无状态</div>
          <div class="tableColumn"
            style="flex-direction:row;flex:1.3">
            <div style="margin:auto">
              <span class="btns success"
                @click="$router.push('/index/orderDetail/' + item.id)">详情</span>
              <span class="btns error"
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
  </div>
</template>

<script>
import { orderList, productTppeList, clientList, getGroup, orderDelete } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      end_time: ''
    }
  },
  methods: {
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
        'start_time': this.start_time,
        'end_time': this.end_time
      }).then((res) => {
        this.loading = false
        this.total = res.data.meta.total
        this.list = res.data.data.map((item) => {
          let productList = []
          item.order_batch.forEach((itemOrder) => {
            itemOrder.batch_info.forEach((itemBatch) => {
              if (productList.find((itemFind) => itemFind.productCode === itemBatch.productCode)) {
                let mark = -1
                productList.forEach((itemFind, index) => {
                  if (itemFind.productCode === itemBatch.productCode) {
                    mark = index
                  }
                })
                productList[mark].sum = productList[mark].sum + itemBatch.size.reduce((total, current) => {
                  return total + parseInt(current.numbers)
                }, 0)
              } else {
                productList.push({
                  productInfo: itemBatch.productInfo,
                  productCode: itemBatch.productCode,
                  sum: itemBatch.size.reduce((total, current) => {
                    return total + parseInt(current.numbers)
                  }, 0)
                })
              }
            })
          })
          console.log(productList)
          return {
            id: item.id,
            group_name: item.group_name,
            order_code: item.order_code,
            order_time: item.order_time,
            client_name: item.client_name,
            contacts: item.contacts,
            delivery_time: item.order_batch.map((item) => item.delivery_time),
            productList: productList,
            lineNum: productList.length // 这个参数用于计算每行的高度
          }
        })
        console.log(this.list)
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
      if (newVal) {
        this.types = this.category.find((item) => item.id === newVal).child
        this.typesVal = ''
        this.styleVal = ''
        this.style = []
        this.pages = 1
      }
      this.getOrderList()
    },
    typesVal (newVal) {
      if (newVal) {
        this.style = this.types.find((item) => item.id === newVal).child
        this.styleVal = ''
        this.pages = 1
      }
      this.getOrderList()
    },
    styleVal (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    company (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    group (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    searchVal (newVal) {
      this.pages = 1
      this.timer = ''
      this.timer = setTimeout(() => {
        this.getOrderList()
      }, 800)
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
  mounted () {
    this.getOrderList()
    productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.status) {
        this.category = res.data.data
      }
    })
    clientList({
      company_id: window.sessionStorage.getItem('company_id'),
      keyword: '',
      status: 1
    }).then((res) => {
      this.companyArr = res.data.data.filter((item) => item.type === 1)
    })
    getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      this.groupArr = res.data.data
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
</style>
