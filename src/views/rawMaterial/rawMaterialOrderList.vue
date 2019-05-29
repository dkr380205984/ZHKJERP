<template>
  <div id="rawMaterialOrderList"
       v-loading='loading'>
    <div class="head">
      <h2>物料详情列表</h2>
      <el-input placeholder="输入文字精确搜索"
                suffix-icon="el-icon-search"
                v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
                  v-show="clientValCmp"
                  @close="clear('clientVal')">{{clientValCmp}}</el-tag>
          <el-tag closable
                  v-show="categoryCmp"
                  @close="clear('category')">{{categoryCmp}}</el-tag>
          <el-tag closable
                  v-show="groupValCmp"
                  @close="clear('groupVal')">{{groupValCmp}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="clientVal"
                       placeholder="筛选公司">
              <el-option v-for="item in client"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="categoryVal"
                       placeholder="筛选品类">
              <el-option v-for="item in category"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="groupVal"
                       placeholder="筛选小组">
              <el-option v-for="item in group"
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
          <div class="tableColumn flex21"
               style="flex-direction:row;">
            <span class='flex2'
                  style="border-right:1px solid #DDD;">产品信息</span>
            <span class="flex06">数量</span>
          </div>
          <div class="tableColumn flex08">负责小组</div>
          <div class="tableColumn">下单日期</div>
          <div class="tableColumn">交货日期</div>
          <div class="tableColumn flex17">操作</div>
        </div>
        <div class="mergeBody"
             v-for="(item,key) in list"
             :key="key">
          <div class="tableColumn">{{item.order_code}}</div>
          <div class="tableColumn">{{item.client_name}}</div>
          <div class="tableColumn flex21">
            <div class="once onces"
                 v-for="(itemProduct,indexProduct) in item.productList"
                 :key="indexProduct">
              <span class="flex2"
                    style="border-right:1px solid #DDD;">
                <span>{{itemProduct.productCode}}</span>
                <span>{{itemProduct.productType}}</span>
              </span>
              <span class="flex06">{{itemProduct.sum + '条'}}</span>
            </div>
          </div>
          <div class="tableColumn flex08">{{item.group_name}}</div>
          <div class="tableColumn">{{item.order_time}}</div>
          <div class="tableColumn">
            <div class="once"
                 v-for="(itemTime,indexTime) in item.delivery_time"
                 :key="indexTime">
              <span>第 {{indexTime + 1}} 批：</span>
              <span>{{itemTime}}</span>
            </div>
          </div>
          <div class="tableColumn flex17"
               style="flex-direction:row;">
            <span class="btns normal"
                  @click="$router.push('/index/rawMaterialOrderDetail/'+item.id + '/0')">原料详情</span>
            <span class="btns normal"
                  @click="$router.push('/index/rawMaterialOrderDetail/' + item.id + '/1')">辅料详情</span>
          </div>
        </div>
      </div>
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
      client: [], // 公司
      clientVal: '',
      category: [], // 分类
      categoryVal: '',
      group: [], // 小组
      groupVal: '',
      timer: '',
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    getOrderList () {
      this.loading = true
      productionList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 5,
        'page': this.pages,
        'client_id': this.clientVal,
        'category_id': this.categoryVal,
        'group_id': this.groupVal,
        'order_code': this.searchVal,
        'start_time': this.start_time,
        'end_time': this.end_time
      }).then((res) => {
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
              productType: (itemProduct.productInfo.category_info.product_category ? itemProduct.productInfo.category_info.product_category + '/' : '') + (itemProduct.productInfo.type_name ? itemProduct.productInfo.type_name + '/' : '') + (itemProduct.productInfo.style_name ? itemProduct.productInfo.style_name : '') + (itemProduct.productInfo.flower_id ? '/' + itemProduct.productInfo.flower_id : ''),
              sum: itemProduct.sum
            }
          })
          return {
            id: item.order_info.id,
            group_name: item.order_info.group_name,
            order_code: item.order_info.order_code,
            order_time: item.order_info.order_time,
            client_name: item.order_info.client_name,
            delivery_time: item.order_info.order_batch.map((item) => item.delivery_time),
            productList: productList
          }
        })
        this.loading = false
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
      if (item === 'clientVal') {
        this.clientVal = ''
      } else if (item === 'category') {
        this.categoryVal = ''
      } else if (item === 'groupVal') {
        this.groupVal = ''
      }
    }
  },
  watch: {
    clientVal (newVal) {
      if (newVal) {
        this.pages = 1
      }
      this.getOrderList()
    },
    categoryVal (newVal) {
      if (newVal) {
        this.pages = 1
      }
      this.getOrderList()
    },
    groupVal (newVal) {
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
    clientValCmp () {
      if (this.clientVal) {
        return this.client.find((item) => item.id === this.clientVal).name
      } else {
        return '所有分类'
      }
    },
    categoryCmp () {
      if (this.categoryVal) {
        return this.category.find((item) => item.id === this.categoryVal).name
      } else {
        return ''
      }
    },
    groupValCmp () {
      if (this.groupVal) {
        return this.group.find((item) => item.id === this.groupVal).name
      } else {
        return ''
      }
    }
  },
  created () {
    this.getOrderList()
    clientList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.status === 200) {
        res.data.data.forEach(item => {
          if (item.type === 1) {
            this.client.push(item)
          }
        })
      }
    })
    productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.status === 200) {
        this.category = res.data.data
      }
    })
    getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      this.group = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialOrderList.less";
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
