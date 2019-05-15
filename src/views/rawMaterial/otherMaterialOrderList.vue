<template>
  <div id="otherMaterialOrderList">
    <div class="head">
      <h2>辅料预订购列表</h2>
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
                       placeholder="筛选公司">
              <el-option v-for="item in category"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="typesVal"
                       placeholder="筛选产品">
              <el-option v-for="item in types"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="styleVal"
                       placeholder="筛选小组">
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
              <!-- @change="pickTime" -->
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
            <span style="flex:2;border-right:1px solid #DDD;">产品信息</span>
            <span style="flex:0.6">数量</span>
          </div>
          <div class="tableColumn flex08">负责小组</div>
          <div class="tableColumn">下单日期</div>
          <div class="tableColumn">交货日期</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="mergeBody"
             v-for="(item,key) in list"
             :key="key">
          <div class="tableColumn">{{item.orderCode}}</div>
          <div class="tableColumn">{{item.companyName}}</div>
          <div class="tableColumn flex21">
            <div class="once onces"
                 v-for="(itemProduct,indexProduct) in item.productInfo"
                 :key="indexProduct">
              <span class="flex2"
                    style="border-right:1px solid #DDD;">
                <span>{{itemProduct.productCode}}</span>
                <span>{{itemProduct.productType}}</span>
              </span>
              <span>{{itemProduct.number}}{{itemProduct.unit}}</span>
            </div>
          </div>
          <div class="tableColumn flex08">{{item.responsible}}</div>
          <div class="tableColumn">{{item.createTime}}</div>
          <div class="tableColumn">
            <div class="once"
                 v-for="(itemTime,indexTime) in item.deliveryTime"
                 :key="indexTime">
              <span>第 {{itemTime.value}} 批：</span>
              <span>{{itemTime.timer}}</span>
            </div>
          </div>
          <div class="tableColumn"
               style="flex-direction:row;">
            <span class="btns normal"
                  @click="$router.push('./rawMaterialOrderPage/' + 1)">订购辅料</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
                       :page-size="5"
                       layout="prev, pager, next"
                       :total="total"
                       :current-page.sync="pages">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
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
      list: [
        {
          id: 1,
          orderCode: '15adf1561',
          companyName: '飞泰',
          productInfo: [
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            },
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            },
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            }
          ],
          responsible: 'A组',
          createTime: '2019-04-07',
          deliveryTime: [
            {
              value: '一',
              timer: '2019-05-01'
            },
            {
              value: '二',
              timer: '2019-06-01'
            }
          ]
        },
        {
          id: 2,
          orderCode: '15adf1561',
          companyName: '飞泰',
          productInfo: [
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            }
          ],
          responsible: 'A组',
          createTime: '2019-04-07',
          deliveryTime: [
            {
              value: '一',
              timer: '2019-05-01'
            },
            {
              value: '二',
              timer: '2019-06-01'
            }
          ]
        },
        {
          id: 2,
          orderCode: '15adf1561',
          companyName: '飞泰',
          productInfo: [
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            }
          ],
          responsible: 'A组',
          createTime: '2019-04-07',
          deliveryTime: [
            {
              value: '一',
              timer: '2019-05-01'
            }
          ]
        },
        {
          id: 2,
          orderCode: '15adf1561',
          companyName: '飞泰',
          productInfo: [
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            }
          ],
          responsible: 'A组',
          createTime: '2019-04-07',
          deliveryTime: [
            {
              value: '一',
              timer: '2019-05-01'
            },
            {
              value: '二',
              timer: '2019-06-01'
            }
          ]
        },
        {
          orderCode: '15adf1561',
          companyName: '飞泰',
          productInfo: [
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            },
            {
              productCode: '19ABC0001',
              productType: '围巾/针织/长巾/条纹',
              number: 1000,
              unit: '条'
            }
          ],
          responsible: 'A组',
          createTime: '2019-04-07',
          deliveryTime: [
            {
              value: '一',
              timer: '2019-05-01'
            },
            {
              value: '二',
              timer: '2019-06-01'
            }
          ]
        }
      ],
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
    // 修改产品
    // goUpdata (id) {

    // },
    // 查看产品
    // goDetail (id) {

    // }
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
      // this.getOrderList()
    },
    typesVal (newVal) {
      if (newVal) {
        this.style = this.types.find((item) => item.id === newVal).child
        this.styleVal = ''
        this.pages = 1
        // this.getOrderList()
      }
    },
    styleVal (newVal) {
      // this.getOrderList()
    },
    company (newVal) {
      // this.getOrderList()
    },
    group (newVal) {
      // this.getOrderList()
    },
    searchVal (newVal) {
      this.timer = ''
      this.timer = setTimeout(() => {
        // this.getOrderList()
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
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/otherMaterialOrderList.less";
</style>
<style lang="less">
#otherMaterialOrderList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
}
</style>
