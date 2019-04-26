<template>
  <div id="productDesignList" v-loading="loading">
    <div class="head">
      <h2>生产计划单列表</h2>
      <el-input placeholder="输入订单号精确搜索" suffix-icon="el-icon-search" v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable v-show="categoryValCmp" @close="clear('categoryVal')">{{categoryValCmp}}</el-tag>
          <el-tag closable v-show="typesValCmp" @close="clear('typesVal')">{{typesValCmp}}</el-tag>
          <el-tag closable v-show="styleValCmp" @close="clear('styleVal')">{{styleValCmp}}</el-tag>
          <el-tag closable v-show="companyCmp" @close="clear('company')">{{companyCmp}}</el-tag>
          <el-tag closable v-show="groupCmp" @close="clear('group')">{{groupCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="categoryVal" placeholder="筛选品类">
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="typesVal" placeholder="筛选类型">
              <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="styleVal" placeholder="筛选款型">
              <el-option
                v-for="item in style"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="company" placeholder="外贸公司">
              <el-option
                v-for="item in companyArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
             <el-select v-model="group" placeholder="负责小组">
              <el-option
                v-for="item in groupArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="rightFilter">
            <el-date-picker
              v-model="date"
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
      <div class="mergeTable">
        <div class="mergeHeader">
          <div class="tableColumn">订单号</div>
          <div class="tableColumn">外贸公司</div>
          <div class="tableColumn" style="flex:2">产品信息</div>
          <div class="tableColumn" style="flex:0.5">订单数量</div>
          <div class="tableColumn" style="flex:0.5">库存调取</div>
          <div class="tableColumn" style="flex:0.5">计划生产</div>
          <div class="tableColumn" style="flex:0.5">合计生产</div>
          <div class="tableColumn" style="flex:0.5">负责小组</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="mergeBody" v-for="(item ,index) in list" :style="{'height':(item.lineNum*60)+'px'}" :key="index">
          <div class="tableColumn">{{item.order_code}}</div>
          <div class="tableColumn">{{item.client_name}}</div>
          <div class="tableColumn" style="flex:2">
            <div class="small" style="height:60px;justify-content: center;" v-for="(itemProduct,indexProduct) in item.productList" :key="indexProduct">
              <span style="margin:0 5px">{{itemProduct.productCode}}</span>
              <span style="margin:0 5px">{{itemProduct.productInfo.category_info.product_category}}/{{itemProduct.productInfo.type_name}}/{{itemProduct.productInfo.style_name}}/{{itemProduct.productInfo.flower_id}}</span>
            </div>
          </div>
          <div class="tableColumn" style="flex:0.5">
            <div class="small" style="height:60px;justify-content: center;" v-for="(itemProduct,indexProduct) in item.productList" :key="indexProduct">
              <span style="margin:0 5px">{{itemProduct.sum}}{{itemProduct.productInfo.category_info.name}}</span>
            </div>
          </div>
          <div class="tableColumn" style="flex:0.5">
            <div class="small" style="height:60px;justify-content: center;" v-for="(itemProduct,indexProduct) in item.productList" :key="indexProduct">
              <span style="margin:0 5px">{{itemProduct.stockSum}}{{itemProduct.productInfo.category_info.name}}</span>
            </div>
          </div>
          <div class="tableColumn" style="flex:0.5">
            <div class="small" style="height:60px;justify-content: center;" v-for="(itemProduct,indexProduct) in item.productList" :key="indexProduct">
              <span style="margin:0 5px">{{itemProduct.total}}{{itemProduct.productInfo.category_info.name}}</span>
            </div>
          </div>
          <div class="tableColumn" style="flex:0.5">
            <div class="small" style="height:60px;justify-content: center;" v-for="(itemProduct,indexProduct) in item.productList" :key="indexProduct">
              <span style="margin:0 5px">{{itemProduct.total + itemProduct.stockSum}}{{itemProduct.productInfo.category_info.name}}</span>
            </div>
          </div>
          <div class="tableColumn" style="flex:0.5">{{item.group_name}}</div>
          <div class="tableColumn" style="flex-direction:row;">
            <span class="btns warning" @click="$router.push('/index/productDesignUpdate/'+item.id)">修改</span>
            <span class="btns success" @click="$router.push('/index/productDesignDetail/'+item.id)">详情</span>
          </div>
        </div>
        <div class="mergeBody" v-if="list.length===0">
          <div style="width:100%;text-align:center;line-height:59px;">暂无数据</div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination
          background
          :page-size="5"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getProductionList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { productionList, productTppeList, clientList, getGroup } from '@/assets/js/api.js'
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
    getProductionList () {
      this.loading = true
      productionList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 5,
        'page': this.pages,
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'client_id': this.company,
        'group_id': this.group,
        'product_code': this.searchVal,
        'start_time': this.start_time,
        'end_time': this.end_time
      }).then((res) => {
        this.loading = false
        this.total = res.data.meta.total
        this.list = res.data.data.map((item) => {
          let productList = []
          item.order_info.order_batch.forEach((itemOrder) => {
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
          // 统计产品库存调取数量
          productList = productList.map((itemProduct) => {
            return {
              productCode: itemProduct.productCode,
              productInfo: itemProduct.productInfo,
              sum: itemProduct.sum,
              stockSum: item.product_info.reduce((total, itemFind) => {
                if (itemFind.product_code === itemProduct.productCode) {
                  return parseInt(total) + parseInt(itemFind.stock_pick)
                } else {
                  return total
                }
              }, 0),
              total: item.product_info.reduce((total, itemFind) => {
                if (itemFind.product_code === itemProduct.productCode) {
                  return parseInt(total) + parseInt(itemFind.total_num)
                } else {
                  return total
                }
              }, 0)
            }
          })
          return {
            id: item.order_info.id,
            total_price: item.order_info.total_price + item.order_info.account_unit,
            group_name: item.order_info.group_name,
            order_code: item.order_info.order_code,
            order_time: item.order_info.order_time,
            client_name: item.order_info.client_name,
            contacts: item.order_info.contacts,
            delivery_time: item.order_info.order_batch.map((item) => item.delivery_time),
            productList: productList,
            lineNum: productList.length
          }
        })
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
      this.getProductionList()
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
      this.getProductionList()
    },
    typesVal (newVal) {
      if (newVal) {
        this.style = this.types.find((item) => item.id === newVal).child
        this.styleVal = ''
        this.pages = 1
      }
      this.getProductionList()
    },
    styleVal (newVal) {
      this.getProductionList()
    },
    company (newVal) {
      this.getProductionList()
    },
    group (newVal) {
      this.getProductionList()
    },
    searchVal (newVal) {
      this.timer = ''
      this.timer = setTimeout(() => {
        this.getProductionList()
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
    this.getProductionList()
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
      this.companyArr = res.data.data
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
  @import '~@/assets/css/productDesignList.less';
</style>
<style lang="less">
#productDesignList{
  .el-carousel__arrow{
    color:#fff;
    background: #1A95FF;
    &:hover{
      background:#48AAFF;
    }
  }
}

</style>
