<template>
  <div id="rawMaterialStockList"
       v-loading="loading">
    <div class="head">
      <h2>原料已入库列表</h2>
      <el-input placeholder="输入文字精确搜索"
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
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="categoryVal"
                       placeholder="筛选订单公司">
              <el-option v-for="item in category"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="typesVal"
                       placeholder="筛选负责小组">
              <el-option v-for="item in types"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="styleVal"
                       placeholder="筛选原料">
              <el-option v-for="item in style"
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
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="mergeTable">
        <div class="mergeHeader">
          <div class="tableColumn">订单号</div>
          <div class="tableColumn"
               style="flex:1.5">订单公司</div>
          <div class="tableColumn">负责小组</div>
          <div class="tableColumn"
               style="flex:3.5;flex-direction:row;">
            <span style="border-right:1px solid #DDD;flex:1.5; ">原料名称</span>
            <span style="border-right:1px solid #DDD;flex:1; ">计划重量</span>
            <span style="flex:1">入库重量</span>
          </div>
          <div class="tableColumn">创建人</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn"
               style="flex:1.5">操作</div>
        </div>
        <div class="mergeBody"
             v-for="(item,key) in list"
             :key="key">
          <div class="tableColumn"
               style="color: rgb(26, 149, 255);">{{item.order_code}}</div>
          <div class="tableColumn"
               style="flex:1.5">{{item.order_company}}</div>
          <div class="tableColumn">{{item.ground_name}}</div>
          <div class="tableColumn col"
               style="flex:3.5">
            <span v-for="(value,index) in item.materialsInfo"
                  :key="index">
              <span style="flex:1.5">
                <span>{{value.material}}</span>
              </span>
              <span style="flex:1">
                <span>{{value.plan_number + ' kg'}}</span>
              </span>
              <span style="flex:1">
                <span>{{value.stock_number + ' kg'}}</span>
              </span>
            </span>
          </div>
          <div class="tableColumn">{{item.create_name}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn"
               style="flex-direction:row;flex:1.5">
            <span class="btns normal"
                  @click="$router.push('/index/rawMaterialStockDetail/'+1)">查看</span>
            <span class="btns warning"
                  @click="$router.push('/index/null')">修改</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
                       :page-size="5"
                       layout="prev, pager, next"
                       :total="total"
                       :current-page.sync="pages"
                       @current-change="getCraftList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { productPlanList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      searchVal: '',
      value: '',
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
      list: [
        {
          order_code: 'KR-0001',
          order_company: '杭州飞泰服饰有限公司',
          ground_name: 'B组',
          materialsInfo: [
            {
              material: '52支上光晴纶',
              plan_number: 2001,
              stock_number: 1010
            },
            {
              material: '36支上光晴纶',
              plan_number: 1998,
              stock_number: 1520
            }
          ],
          total: 700,
          create_name: '王锦鲤',
          create_time: '2019-04-23'
        },
        {
          order_code: 'KR-0001',
          order_company: '杭州飞泰服饰有限公司',
          ground_name: 'B组',
          materialsInfo: [
            {
              material: '48支上光晴纶',
              plan_number: 2001,
              stock_number: 1010
            },
            {
              material: '36支上光晴纶',
              plan_number: 1998,
              stock_number: 1520
            }
          ],
          total: 700,
          create_name: '王锦鲤',
          create_time: '2019-04-23'
        },
        {
          order_code: 'KR-0001',
          order_company: '杭州飞泰服饰有限公司',
          ground_name: 'B组',
          materialsInfo: [
            {
              material: '52支上光晴纶',
              plan_number: 2001,
              stock_number: 1010
            },
            {
              material: '36支上光晴纶',
              plan_number: 1998,
              stock_number: 1520
            },
            {
              material: '48支上光晴纶',
              plan_number: 1998,
              stock_number: 1520
            }
          ],
          total: 700,
          create_name: '王锦鲤',
          create_time: '2019-04-23'
        }
      ],
      category: [], // 大类
      categoryVal: '',
      types: [], // 二级分类
      typesVal: '',
      style: [], // 三级分类
      styleVal: ''
    }
  },
  components: {
  },
  methods: {
    getCraftList () {
      this.loading = true
      productPlanList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 5,
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'page': this.pages
      }).then((res) => {
        this.loading = false
        this.total = res.data.meta.total
        this.list = res.data.data
      })
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
      } else if (item === 'flowerVal') {
        this.flowerVal = ''
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
      this.getCraftList()
    },
    typesVal (newVal) {
      if (newVal) {
        this.style = this.types.find((item) => item.id === newVal).child
        this.styleVal = ''
        this.pages = 1
        this.getCraftList()
      }
    },
    styleVal (newVal) {
      this.getCraftList()
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
    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    },
    // 类型展示
    filterSize (item) {
      let str = ''
      for (let key in item) {
        str += key + '/'
      }
      return str.substring(0, str.length - 1)
    },
    // 原料合并
    filterMaterial (material) {
      let str = ''
      material.forEach((item) => {
        if (item.type === 0 && str !== '') {
          str += '/' + item.material
        } else if (str === '' && item.type === 0) {
          str += item.material
        }
      })
      return str
    },
    // 辅料合并
    filterOtherMaterial (material) {
      let str = ''
      material.forEach((item) => {
        if (item.type === 1 && str === '') {
          str += item.material
        } else if (str === '' && item.type === 1) {
          str += item.material
        }
      })
      return str
    }
  },
  created () {
    // this.getCraftList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialStockList.less";
</style>
<style lang="less">
#productList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
}
</style>
