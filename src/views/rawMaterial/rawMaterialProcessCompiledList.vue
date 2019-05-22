<template>
  <div id="rawMaterialProcessCompiledList"
       v-loading="loading">
    <div class="head">
      <h2>原料已加工列表</h2>
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
                       placeholder="筛选订购单位">
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
          <div class="tableColumn flex12">订单公司</div>
          <div class="tableColumn">负责小组</div>
          <div class="tableColumn flex43"
               style="flex-direction:row;">
            <span style="border-right:1px solid #DDD;flex:1; ">加工单位</span>
            <span style="border-right:1px solid #DDD;flex:0.7; ">加工类型</span>
            <span style="flex:1.4">加工信息</span>
          </div>
          <div class="tableColumn">创建人</div>
          <div class="tableColumn">创建时间</div>
          <div class="tableColumn"
               style="flex:1.2">操作</div>
        </div>
        <div class="mergeBody"
             v-for="(item,key) in list"
             :key="key">
          <div class="tableColumn"
               style="color: rgb(26, 149, 255);">{{item.order_code}}</div>
          <div class="tableColumn flex12">{{item.order_company}}</div>
          <div class="tableColumn">{{item.group_name}}</div>
          <div class="tableColumn col flex43">
            <span v-for="(value,index) in item.process_info"
                  :key="index">
              <span class="flex1"
                    style="box-sizing:border-box">
                <span>{{value.company}}</span>
              </span>
              <span class="flex21">
                <div v-for="(val,ind) in value.types"
                     :key="ind"
                     class="flex1">
                  <span class="flex07">
                    <span>{{val.process_type}}</span>
                  </span>
                  <span class="flex14">
                    <span v-for="(content,number) in val.info"
                          :key="number">{{content.material}}-{{content.color}}-{{content.value+'kg'}}
                    </span>
                  </span>
                </div>
              </span>
            </span>
          </div>
          <div class="tableColumn">{{item.create_name}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn flex12"
               style="flex-direction:row;">
            <span class="btns normal"
                  @click="$router.push('/index/rawMaterialProcessDetail/' + item.order_id)">查看</span>
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
import { rawMaterialProcessList } from '@/assets/js/api.js'
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
      list: [],
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
      rawMaterialProcessList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          res.data.data.forEach((item, key) => {
            item.material_info = JSON.parse(item.material_info)
            item.material_info.forEach((value, index) => {
              let data = this.list.find(val => val.order_code === item.order_code)
              if (!data) {
                this.list.push({
                  order_id: item.order_id,
                  order_code: item.order_code,
                  order_company: item.order_company,
                  group_name: item.order_group,
                  process_info: [{
                    company: item.client_name,
                    types: [{
                      process_type: item.process_type,
                      info: [{
                        material: item.material_name,
                        ...value
                      }]
                    }]
                  }],
                  create_name: item.user_name,
                  create_time: item.order_time.split(' ')[0]
                })
              } else {
                let data1 = data.process_info.find(val => val.company === item.client_name)
                if (!data1) {
                  data.process_info.push({
                    company: item.client_name,
                    types: [{
                      process_type: item.process_type,
                      info: [{
                        material: item.material_name,
                        ...value
                      }]
                    }]
                  })
                } else {
                  let data2 = data1.types.find(val => val.process_type === item.process_type)
                  if (!data2) {
                    data1.types.push({
                      process_type: item.process_type,
                      info: [{
                        material: item.material_name,
                        ...value
                      }]
                    })
                  } else {
                    let data3 = data2.info.find(val => val.color === value.color)
                    if (!data3) {
                      data2.info.push({
                        material: item.material_name,
                        ...value
                      })
                    } else {
                      data3.value = Number(data3.value) + Number(value.value)
                    }
                  }
                }
              }
            })
          })
          console.log(this.list)
          this.loading = false
        }
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
  created () {
    this.getCraftList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialProcessCompiledList.less";
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
