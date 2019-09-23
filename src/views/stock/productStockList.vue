<template>
  <div id="productStockList"
    v-loading='loading'>
    <div class="head">
      <h2>产品列表</h2>
      <el-input placeholder="输入产品编号精确搜索"
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
            v-show="flowerValCmp"
            @close="clear('flowerVal')">{{flowerValCmp}}</el-tag>
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
            <el-select v-model="flowerVal"
              placeholder="筛选花型">
              <el-option v-for="item in flower"
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
      <div class="tableCtn">
        <!-- v-scroll="{fun:getProductList,pageSize:5}" -->
        <div class="tableRow titleTableRow">
          <div class="tableColumn">产品编号</div>
          <div class="tableColumn flex9">产品类别</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">尺码</div>
          <div class="tableColumn">颜色</div>
          <div class="tableColumn">库存数</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item,key) in list[pages-1]"
          :key="key">
          <div class="tableColumn"
            style="color:#1A95FF">{{item.product_code}}</div>
          <div class="tableColumn flex9">{{item|filterType}}</div>
          <div class="tableColumn">{{item.flower_name ? item.flower_name : '暂无花型'}}</div>
          <div class="tableColumn">{{item.size }}</div>
          <div class="tableColumn">{{item.color}}</div>
          <div class="tableColumn">{{item.stock_number}}</div>
          <div class="tableColumn">
            <div class="tableColumn">
              <div class="imgCtn">
                <img class="img"
                  :src="item.images.length>0?item.images[0].thumb:require('@/assets/image/index/noPic.jpg')"
                  :onerror="defaultImg" />
                <div class="toolTips"
                  v-if="item.images.length>0"><span @click="showImg(item.images)">点击查看大图</span></div>
                <div class="toolTips"
                  v-if="item.images.length===0"><span>没有预览图</span></div>
              </div>
            </div>
          </div>
          <div class="tableColumn">{{item.update_time}}</div>
          <div class="tableColumn">
            <span class="btns success"
              @click="$router.push('/index/productStockDetail/'+item.product_id)">详情</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="1"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages">
        </el-pagination>
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
  </div>
</template>

<script>
import { productStockList, productTppeList, flowerList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      showShade: false,
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
      list: [],
      imgList: [],
      category: [], // 大类
      categoryVal: '',
      types: [], // 二级分类
      typesVal: '',
      style: [], // 三级分类
      styleVal: '',
      flower: [],
      flowerVal: '',
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    getProductList () {
      this.loading = true
      this.list = []
      productStockList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'flower_id': this.flowerVal,
        'start_time': this.start_time,
        'end_time': this.end_time,
        'product_code': this.searchVal
      }).then((res) => {
        let list = []
        for (let prop in res.data.data) {
          let item = res.data.data[prop].data
          if (list.length === 5) {
            this.list.push(list)
            list = []
          }
          list.push({
            product_code: prop,
            color: this.arrNoRepeat(item.map(value => {
              return value.color
            })).join('/'),
            size: this.arrNoRepeat(item.map(value => {
              return value.size
            })).join('/'),
            stock_number: item.map(value => {
              return Number(value.total_stock)
            }).reduce((total, item) => {
              return total + item
            }),
            update_time: item.map(value => {
              return value.updated_at
            }).sort((val1, val2) => {
              return (new Date(val1).getTime() > new Date(val2).getTime())
            })[0],
            ...res.data.data[prop].product_info
          })
        }
        this.list.push(list)
        this.total = this.list.length
        this.loading = false
        console.log(this.list)
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
      this.getProductList()
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
    },
    // 简单的数组去重
    arrNoRepeat (arr) {
      let newArr = []
      arr.forEach(item => {
        if (newArr.indexOf(item) === -1) {
          newArr.push(item)
        }
      })
      return newArr
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
      this.getProductList()
    },
    typesVal (newVal) {
      if (newVal) {
        this.style = this.types.find((item) => item.id === newVal).child
        this.styleVal = ''
        this.pages = 1
      }
      this.getProductList()
    },
    styleVal (newVal) {
      this.pages = 1
      this.getProductList()
    },
    flowerVal (newVal) {
      this.pages = 1
      this.getProductList()
    },
    searchVal (newVal) {
      this.pages = 1
      this.getProductList()
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
    flowerValCmp () {
      if (this.flowerVal) {
        return this.flower.find((item) => item.id === this.flowerVal).name
      } else {
        return ''
      }
    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_name
      } else if (!item.style_name) {
        return item.category_name + '/' + item.type_name
      } else {
        return item.category_name + '/' + item.type_name + '/' + item.style_name
      }
    },
    // 类型展示
    filterSize (item) {
      let str = ''
      for (let key in item) {
        str += key + '/'
      }
      return str.substring(0, str.length - 1)
    }

  },
  mounted () {
    this.getProductList()
    productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.status) {
        this.category = res.data.data
      }
    })
    flowerList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.status) {
        this.flower = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productStockList.less";
</style>
<style lang="less">
#productStockList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
}
</style>
