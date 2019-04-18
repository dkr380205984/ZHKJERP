<template>
  <div id="orderList">
    <div class="head">
      <h2>订单发货列表</h2>
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
          <div class="tableColumn">发货日期</div>
          <div class="tableColumn">订单号</div>
          <div class="tableColumn">订单公司</div>
          <div class="tableColumn" style="flex:4">产品信息</div>
          <div class="tableColumn" style="flex:2">操作</div>
        </div>
        <div class="mergeBody" v-for="(item ,index) in list" :key="index" :style="{'height':(item.lineNum*30)+'px'}">
          <div class="tableColumn">{{item.date}}</div>
          <div class="tableColumn"></div>
          <div class="tableColumn"></div>
          <div class="tableColumn" style="flex:4"></div>
          <div class="tableColumn" style="flex:2"></div>
        </div>
      </div>
      <div class="sum">订单统计:暂不统计</div>
      <div class="pageCtn">
        <el-pagination
          background
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
import { orderBatchList, productTppeList, clientList, getGroup } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      timer: ''
    }
  },
  methods: {
    getOrderList () {
      orderBatchList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 5,
        'page': this.pages,
        'has_plan': '',
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'client_id': this.company,
        'group_id': this.group,
        'product_code': this.searchVal
        // 'start_time': '',
        // 'end_time': ''
      }).then((res) => {
        console.log(res)
        // this.total = res.data.meta.total
        // this.list = res.data.data.map((item) => {
        //   let productList = []
        //   item.order_batch.forEach((itemOrder) => {
        //     itemOrder.batch_info.forEach((itemBatch) => {
        //       if (productList.find((itemFind) => itemFind.productCode === itemBatch.productCode)) {
        //         let mark = -1
        //         productList.forEach((itemFind, index) => {
        //           if (itemFind.productCode === itemBatch.productCode) {
        //             mark = index
        //           }
        //         })
        //         productList[mark].sum = productList[mark].sum + itemBatch.size.reduce((total, current) => {
        //           return total + parseInt(current.numbers)
        //         }, 0)
        //       } else {
        //         productList.push({
        //           productInfo: itemBatch.productInfo,
        //           productCode: itemBatch.productCode,
        //           sum: itemBatch.size.reduce((total, current) => {
        //             return total + parseInt(current.numbers)
        //           }, 0)
        //         })
        //       }
        //     })
        //   })
        //   console.log(productList)
        //   return {
        //     group_name: item.group_name,
        //     order_code: item.order_code,
        //     order_time: item.order_time,
        //     client_name: item.client_name,
        //     contacts: item.contacts,
        //     delivery_time: item.order_batch.map((item) => item.delivery_time),
        //     productList: productList,
        //     lineNum: Math.max(item.order_batch.length, productList.length) // 这个参数用于计算每行的高度
        //   }
        // })
        // console.log(this.list)
        // console.log(JSON.parse(res.data.data['2019-04-09'][0].batch_info))
        let data = res.data.data
        Object.keys(data).forEach((key) => {
          let arr = []
          data[key].forEach((item) => {
            arr.push({
              batch_info: JSON.parse(item.batch_info),
              group_name: ''
            })
          })
        })
      })
    },
    pickTime (date) {
      console.log(date)
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
    // 修改产品
    goUpdata (id) {

    },
    // 查看产品
    goDetail (id) {

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
        this.getOrderList()
      }
    },
    styleVal (newVal) {
      this.getOrderList()
    },
    company (newVal) {
      this.getOrderList()
    },
    group (newVal) {
      this.getOrderList()
    },
    searchVal (newVal) {
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
    Promise.all([productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }), clientList({
      company_id: window.sessionStorage.getItem('company_id'),
      keyword: '',
      status: 1
    }), getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    }), orderBatchList({
      'company_id': window.sessionStorage.getItem('company_id'),
      'limit': 5,
      'page': this.pages,
      'category_id': this.categoryVal,
      'type_id': this.typesVal,
      'style_id': this.styleVal,
      'client_id': this.company,
      'group_id': this.group,
      'product_code': this.searchVal
    })]).then((res) => {
      this.category = res[0].data.data
      this.companyArr = res[1].data.data
      this.groupArr = res[2].data.data
      let json = res[3].data.data
      this.list = Object.keys(json).map((key) => {
        let arr = []
        json[key].forEach((item) => {
          arr.push({
            batch_info: JSON.parse(item.batch_info),
            group_name: this.groupArr.find((itemGroup) => itemGroup.id === item.group_id).name,
            company_name: this.companyArr.find((itemCompany) => { return parseInt(itemCompany.id) === item.client_id }).name,
            order_code: item.order_code,
            lineNum: JSON.parse(item.batch_info).length
          })
        })
        return {
          lineNum: arr.reduce((total, current) => total + current.lineNum, 0),
          date: key,
          orderInfo: arr
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/orderList.less';
</style>
<style lang="less">
#orderList{
  .el-carousel__arrow{
    color:#fff;
    background: #1A95FF;
    &:hover{
      background:#48AAFF;
    }
  }
}

</style>
