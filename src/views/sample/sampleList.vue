<template>
  <div id="productList"
    v-loading="loading"
    v-getHash="{'categoryVal':categoryVal,'typesVal':typesVal,'styleVal':styleVal,'flowerVal':flowerVal,'searchVal':searchVal,'pages':pages}">
    <div class="head">
      <h2>样品列表</h2>
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
      <div class="tableCtn"
        v-scroll="{fun:getProductList,pageSize:15}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn flex9">品类</div>
          <div class="tableColumn">样品名称</div>
          <div class="tableColumn">花型</div>
          <div class="tableColumn">图片</div>
          <div class="tableColumn">创建人</div>
          <div class="tableColumn">创建时间</div>
          <div class="tableColumn flex9">样品状态</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item) in list"
          :key="item.id">
          <div class="tableColumn"
            style="color:#1A95FF">{{item.product_code}}</div>
          <div class="tableColumn flex9">{{item|filterType}}</div>
          <div class="tableColumn">{{item.sample_title}}</div>
          <div class="tableColumn">{{item.flower_id}}</div>
          <div class="tableColumn">
            <div class="imgCtn">
              <img class="img"
                :src="item.img.length>0?item.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                :onerror="defaultImg" />
              <div class="toolTips"
                v-if="item.img.length>0"><span @click="showImg(item.img)">点击查看大图</span></div>
              <div class="toolTips"
                v-if="item.img.length===0"><span>没有预览图</span></div>
            </div>
          </div>
          <div class="tableColumn">{{item.user_name}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn flex9"
            style="display:flex;justify-content:center">
            <el-tooltip class="item"
              effect="dark"
              content="工艺单"
              placement="top-start">
              <span :class="{'circle':true,'has':(item.craft_info && item.craft_info.length>0)}">
                <img :src="require('@/assets/image/icon/craft_icon.png')"
                  alt="">
              </span>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="配料单"
              placement="top-start">
              <span :class="{'circle':true,'has':(item.product_plan_info && item.product_plan_info.length>0)}">
                <img :src="require('@/assets/image/icon/plan_icon.png')"
                  alt="">
              </span>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="报价单"
              placement="top-start">
              <span :class="{'circle':true,'has':(item.quotation_id && item.quotation_id.length>0)}">
                <img :src="require('@/assets/image/icon/price_icon.png')"
                  alt="">
              </span>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="样品订单"
              placement="top-start">
              <span :class="{'circle':true,'has':(item.order_list && item.order_list.length>0)}">
                <img :src="require('@/assets/image/icon/sample_icon.png')"
                  alt="">
              </span>
            </el-tooltip>
          </div>
          <div class="tableColumn flex9">
            <el-tooltip class="item"
              effect="dark"
              :content="toolTips(item)"
              placement="top-start">
              <span class="btns warning"
                v-if="item.has_craft===1||item.has_plan===1"
                @click="$router.push('/index/productUpdate/'+item.id + '?type=2')">修改</span>
            </el-tooltip>
            <span class="btns warning"
              v-if="item.has_craft===0&&item.has_plan===0"
              @click="$router.push('/index/productUpdate/'+item.id + '?type=2')">修改</span>
            <span class="btns success"
              @click="$router.push('/index/sampleDetail/'+item.id)">详情</span>
            <span class="btns error"
              @click="deleteProduct(item.id)">删除</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="15"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getProductList">
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
import { productList, productTppeList, flowerList, productDelete } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
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
      list: [],
      imgList: [],
      showShade: false,
      category: [], // 大类
      categoryVal: '',
      types: [], // 二级分类
      typesVal: '',
      style: [], // 三级分类
      styleVal: '',
      flower: [],
      flowerVal: '',
      start_time: '',
      end_time: '',
      first: true // 判断是不是第一次进入页面
    }
  },
  methods: {
    getProductList () {
      this.loading = true
      productList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 15,
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'flower_id': this.flowerVal,
        'page': this.pages,
        'start_time': this.start_time,
        'end_time': this.end_time,
        'product_code': this.searchVal,
        'type': 2
      }).then((res) => {
        this.total = res.data.meta.total
        this.list = res.data.data
        this.loading = false
        this.first = false
      })
    },
    showImg (imgList) {
      this.imgList = imgList
      this.showShade = true
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
    // 判断提示信息
    toolTips (product) {
      if (product.has_craft === 1) {
        return '该产品已有工艺单信息，只能修改图片'
      }
      if (product.has_plan === 1) {
        return '该产品已有配料单信息，只能修改图片'
      }
      if (product.in_order === 1) {
        return '该产品已有订单信息，只能修改图片'
      }
    },
    // 删除产品
    deleteProduct (id) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        productDelete({
          id: id
        }).then((res) => {
          if (res.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getProductList()
          } else {
            this.$message.error(res.data.message)
            this.loading = false
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
        this.getProductList()
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
        this.getProductList()
      }
    },
    styleVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getProductList()
      }
    },
    flowerVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getProductList()
      }
    },
    searchVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getProductList()
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
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else if (!item.flower_id) {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    },
    // 类型展示
    filterSize (item) {
      return item.map(key => {
        return key.measurement
      }).join('/')
    }
  },
  created () {
    const hash = window.location.hash ? JSON.parse(decodeURIComponent(window.location.hash).slice(1)) : {}
    // 分页的特殊性单独处理
    this.pages = hash.pages
    // 初始化
    Promise.all([productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }), flowerList({
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      this.category = res[0].data.data
      this.flower = res[1].data.data
      for (let key in hash) {
        this[key] = hash[key]
      }
      this.getProductList()
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productList.less";
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
