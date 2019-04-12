<template>
  <div id="productList">
    <div class="head">
      <h2>工艺单列表</h2>
      <el-input placeholder="输入工艺单编号精确搜索" suffix-icon="el-icon-search" v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable v-show="categoryValCmp" @close="clear('categoryVal')">{{categoryValCmp}}</el-tag>
          <el-tag closable v-show="typesValCmp" @close="clear('typesVal')">{{typesValCmp}}</el-tag>
          <el-tag closable v-show="styleValCmp" @close="clear('styleVal')">{{styleValCmp}}</el-tag>
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
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">编号</div>
          <div class="tableColumn flex5">品类</div>
          <div class="tableColumn">总根数(经/纬)</div>
          <div class="tableColumn flex9">主料(经/纬)</div>
          <div class="tableColumn flexSamll">产品净重(克)</div>
          <div class="tableColumn flexSamll">创建人</div>
          <div class="tableColumn flexSamll">创建时间</div>
          <div class="tableColumn flex9">操作</div>
        </div>
        <div class="tableRow bodyTableRow" v-for="(item) in list" :key="item.id">
          <div class="tableColumn" style="color: rgb(26, 149, 255);">{{item.craft_code}}</div>
          <div class="tableColumn flex5">{{item.product_info|filterType}}</div>
          <div class="tableColumn">{{item|filterWeft}}</div>
          <div class="tableColumn flex9">{{item.material_data|filterMaterial}}</div>
          <div class="tableColumn flexSamll">{{item.weight}}</div>
          <div class="tableColumn flexSamll">{{item.user_name}}</div>
          <div class="tableColumn flexSamll">{{item.create_time}}</div>
          <div class="tableColumn flex9">
            <span class="btns normal">修改</span>
            <span class="btns success" @click="$router.push('/index/designFormDetail/'+item.id)">查看</span>
            <span class="btns warning" @click="copy(item.id)">打印</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination
          background
          :page-size="5"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getCraftList">
        </el-pagination>
      </div>
    </div>
    <div class="shade" v-show="showShade">
      <div class="main">
        <div class="closeBtn" @click="showShade=false">点此退出预览</div>
        <el-carousel indicator-position="outside" height="550px" arrow="always">
          <el-carousel-item v-for="item in imgList" :key="item.image_url">
            <img :src="item.image_url" class="imgList" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { productTppeList, craftList } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      styleVal: ''
    }
  },
  methods: {
    getCraftList () {
      craftList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'limit': 5,
        'category_id': this.categoryVal,
        'type_id': this.typesVal,
        'style_id': this.styleVal,
        'page': this.pages
        // 'start_time': '',
        // 'end_time': ''
      }).then((res) => {
        console.log(res)
        this.total = res.data.meta.total
        this.list = res.data.data
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
      console.log(date)
    },
    copy (id) {
      window.open('/designFormTable/' + id)
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
      let str = ''
      material.forEach((item) => {
        if (item.type === 0 && item.type_material === 0) {
          str += item.material_name + '/'
        }
      })
      material.forEach((item) => {
        if (item.type === 1 && item.type_material === 0) {
          str += item.material_name
        }
      })
      return str
    }
  },
  created () {
    this.getCraftList()
    productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.status) {
        this.category = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productList.less';
</style>
<style lang="less">
#productList{
  .el-carousel__arrow{
    color:#fff;
    background: #1A95FF;
    &:hover{
      background:#48AAFF;
    }
  }
}

</style>
