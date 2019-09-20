<template>
  <div id="productList"
    v-loading="loading">
    <div class="head">
      <h2>设计单列表</h2>
      <el-input placeholder="输入设计单精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn"
        style="justify-content:flex-end;display: flex;">
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
      <div class="canvasDraw">
        <div class="canvasCtn"
          v-for="item in list"
          :key="item.id"
          @click="$router.push('/index/designFormPlanDetail/'+item.id)"
          :ref="'ctn'+item.id">
          <i class="el-icon-close"
            @click.stop="deleteCraft(item.id)"></i>
          <img :src="item.design_url?item.design_url[0]:''"
            :onerror="defaultImg"
            height="170"
            width="170"
            style="padding:10px 10px 5px 10px" />

          <div class="canvasContent">{{item.title}}</div>
          <div class="canvasContent2">{{item.user_name}} / {{item.create_time}}</div>
        </div>
      </div>
    </div>
    <div class="suspend">
      <span @click="getCraftList"
        :class="{'blue':!noMore,'red':noMore}"
        style="border-radius:4px">{{noMore?'加载完毕':'加载更多'}}</span>
    </div>
  </div>
</template>

<script>
import { productTppeList, craftList, craftDelete } from '@/assets/js/api.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      noMore: false,
      loading: true,
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
      pages: 0,
      list: []
    }
  },
  methods: {
    getCraftList () {
      if (!this.noMore) {
        this.pages++
        this.loading = true
        craftList({
          'company_id': window.sessionStorage.getItem('company_id'),
          'limit': 10,
          'category_id': this.categoryVal,
          'type_id': this.typesVal,
          'style_id': this.styleVal,
          'page': this.pages,
          'start_time': this.start_time,
          'end_time': this.end_time,
          'craft_code': this.searchVal,
          'is_draft': 2
        }).then((res) => {
          this.loading = false
          if (res.data.data.length === 0) {
            this.noMore = true
          } else {
            this.list = this.list.concat(res.data.data)
          }
        })
      } else {
        this.$message.error({
          message: '已加载所有设计单'
        })
      }
    },
    // 删除设计单
    deleteCraft (id) {
      this.$confirm('请确认是否删除该设计单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        craftDelete({
          id: id
        }).then((res) => {
          let ctn = 'ctn' + id
          let dom = this.$refs[ctn]
          dom[0].style.display = 'none'
          this.$message.success({
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
      this.list = []
      this.noMore = false
      this.pages = 0
      this.getCraftList()
    }
  },
  watch: {
    searchVal () {
      this.pages = 0
      this.list = []
      this.noMore = false
      this.getCraftList()
    }
  },
  computed: {
  },
  filters: {
  },
  mounted () {
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
<style lang="less" scoped>
.canvasDraw {
  display: flex;
  flex-wrap: wrap;
  .canvasCtn {
    margin: 10px;
    width: 190px;
    height: 240px;
    position: relative;
    .el-icon-close {
      position: absolute;
      right: -2px;
      top: -2px;
      border-radius: 50%;
      padding: 3px;
      cursor: pointer;
      background: #f56c6c;
      color: #fff;
      display: none;
    }
    &:hover {
      .el-icon-close {
        display: block;
      }
      background: rgb(229, 243, 255);
    }
    .canvasContent {
      text-align: center;
      color: #666;
    }
    .canvasContent2 {
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
