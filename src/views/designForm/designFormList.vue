<template>
  <div id="productList"
    v-getHash="{'categoryVal':categoryVal,'typesVal':typesVal,'styleVal':styleVal,'searchVal':searchVal,'pages':pages}"
    v-loading="loading">
    <div class="head">
      <h2>工艺单列表</h2>
      <el-input placeholder="输入工艺单编号精确搜索"
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
              placeholder="筛选品类">
              <el-option v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <el-select v-model="typesVal"
              placeholder="筛选类型">
              <el-option v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <el-select v-model="styleVal"
              placeholder="筛选款型">
              <el-option v-for="item in style"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
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
        v-scroll='{fun:getCraftList,pageSize:15}'>
        <div class="tableRow titleTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn flex5">品类</div>
          <div class="tableColumn">产品图片</div>
          <div class="tableColumn flexSamll">创建人</div>
          <div class="tableColumn flexSamll">创建时间</div>
          <div class="tableColumn"
            style="flex:2.4">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item) in list"
          :key="item.id">
          <div class="tableColumn"
            style="color: rgb(26, 149, 255);">{{item.craft_code}}</div>
          <div class="tableColumn flex5">{{item.product_info|filterType}}</div>
          <div class="tableColumn">
            <div class="imgCtn">
              <img class="img"
                :src="item.product_info.img.length>0?item.product_info.img[0].thumb:require('@/assets/image/index/noPic.jpg')"
                :onerror="defaultImg" />
              <div class="toolTips"
                v-if="item.product_info.img.length>0"><span @click="showImg(item.product_info.img)">点击查看大图</span></div>
              <div class="toolTips"
                v-if="item.product_info.img.length===0"><span>没有预览图</span></div>
            </div>
          </div>
          <div class="tableColumn flexSamll">{{item.user_name}}</div>
          <div class="tableColumn flexSamll">{{item.create_time.slice(0,10)}}</div>
          <div class="tableColumn"
            style="flex:2.4">
            <span class="btns warning"
              v-if="item.product_info.has_plan===0"
              @click="$router.push('/index/designFormUpdate/'+item.id)">修改</span>
            <span class="btns error"
              v-if="item.product_info.has_plan===1"
              @click="showError(item.id)">修改</span>
            <span class="btns success"
              @click="$router.push('/index/designFormDetail/'+item.id)">查看</span>
            <span class="btns copy"
              @click="copy(item.id)">打印</span>
            <span class="btns error"
              @click="deleteCraft(item.id)">删除</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="15"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getCraftList">
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
import { productTppeList, craftList, craftDelete } from '@/assets/js/api.js'
export default {
  data () {
    return {
      first: true, // 判断是不是第一次进入页面
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
        }],
        start_time: '',
        end_time: ''
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
      styleVal: ''
    }
  },
  methods: {
    getCraftList () {
      this.loading = true
      craftList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 15,
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'page': this.pages,
        'start_time': this.start_time,
        'end_time': this.end_time,
        'craft_code': this.searchVal,
        'is_draft': 1
      }).then((res) => {
        this.loading = false
        this.total = res.data.meta.total
        this.list = res.data.data
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
      this.getCraftList()
    },
    copy (id) {
      window.open('/designFormTable/' + id)
    },
    showError (id) {
      this.$confirm('该产品已有配料单,修改工艺单会导致配料单信息删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/index/designFormUpdate/' + id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    deleteCraft (id) {
      this.$confirm('是否删除该工艺单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        craftDelete({
          id: id
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '删除成功'
            })
          } else {
            this.$message.error({
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
        this.getCraftList()
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
        this.getCraftList()
      }
    },
    styleVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getCraftList()
      }
    },
    searchVal (newVal) {
      if (!this.first) {
        if (newVal) {
          this.pages = 1
        }
        this.getCraftList()
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
    // 经纬合并
    filterWeft (item) {
      if (item.warp_data && item.weft_data) {
        return item.warp_data.weft + '/' + item.weft_data.total
      } else {
        return '数据错误'
      }
    },
    // 原料合并
    filterMaterial (material) {
      return material.find((item) => item.type_material === 1).material_name
    }
  },
  created () {
    const hash = window.location.hash ? JSON.parse(decodeURIComponent(window.location.hash).slice(1)) : {}
    // 分页的特殊性单独处理
    this.pages = hash.pages
    // 初始化
    Promise.all([productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      this.category = res[0].data.data
      for (let key in hash) {
        this[key] = hash[key]
      }
      this.getCraftList()
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
