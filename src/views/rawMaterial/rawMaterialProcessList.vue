<template>
  <div id="rawMaterialProcessList"
       v-loading="loading">
    <div class="head">
      <h2>原料加工列表</h2>
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
          <div class="tableColumn"
               style="flex:1.2">订单公司</div>
          <div class="tableColumn">负责小组</div>
          <div class="tableColumn"
               style="flex:3.8;flex-direction:row;">
            <span style="border-right:1px solid #DDD;flex:1; ">订购单位</span>
            <span style="flex:1">原料信息</span>
          </div>
          <div class="tableColumn">创建人</div>
          <div class="tableColumn">创建时间</div>
          <div class="tableColumn"
               style="flex:1.2">操作</div>
        </div>
        <div class="mergeBody"
             v-for="(item,key) in list[pages-1]"
             :key="key">
          <div class="tableColumn"
               style="color: rgb(26, 149, 255);">{{item.order_code}}</div>
          <div class="tableColumn"
               style="flex:1.2">{{item.order_company}}</div>
          <div class="tableColumn">{{item.group_name}}</div>
          <div class="tableColumn col"
               style="flex:3.8">
            <span v-for="(value,index) in item.order_list"
                  :key="index">
              <span>
                <span>{{value.company ? value.company : '仓库'}}</span>
              </span>
              <span>
                <span v-for="(content,number) in value.info"
                      :key="number"
                      :style="{'padding':value.info.length === 1 ? '10px 0' : false}">{{content.material}} {{content.color}} {{content.weight + 'kg'}}
                </span>
              </span>
            </span>

          </div>
          <div class="tableColumn">{{item.create_name}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn"
               style="flex-direction:row;flex:1.2">
            <span class="btns normal"
                  @click="$router.push('/index/rawMaterialProcess/'+ item.order_id)">原料加工</span>
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
    </div>
  </div>
</template>

<script>
import { rawMaterialOrderList } from '@/assets/js/api.js'
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
    getOrderList () {
      this.loading = true
      rawMaterialOrderList({
        company_id: sessionStorage.company_id
      }).then(res => {
        console.log(res)
        let arr = []
        res.data.data.forEach(item => {
          let flag = arr.find(val => val.order_code === item.order_code)
          if (!flag) {
            arr.push({
              order_code: item.order_code,
              order_company: item.order_client,
              create_time: item.order_time.split(' ')[0],
              order_list: [{
                company: item.client_name,
                info: [{
                  material: item.material_name,
                  color: item.color_code,
                  weight: item.weight
                }]
              }],
              group_name: item.order_group,
              create_name: item.user_name,
              order_id: item.order_id
            })
          } else {
            let nowTime = flag.create_time.split('-')
            let testTime = item.order_time.split(' ')[0].split('-')
            if (Number(nowTime[0]) < Number(testTime[0])) {
              flag.create_time = item.order_time.split(' ')[0]
            } else if (Number(nowTime[0]) === Number(testTime[0])) {
              if (Number(nowTime[1]) < Number(testTime[1])) {
                flag.create_time = item.order_time.split(' ')[0]
              } else if (Number(nowTime[1]) === Number(testTime[1])) {
                if (Number(nowTime[2]) < Number(testTime[2])) {
                  flag.create_time = item.order_time.split(' ')[0]
                }
              }
            }
            let fleg = flag.order_list.find(val => val.company === item.client_name)
            if (!fleg && fleg !== null) {
              flag.order_list.push({
                company: item.client_name,
                info: [{
                  material: item.material_name,
                  color: item.color_code,
                  weight: item.weight
                }]
              })
            } else {
              if (fleg.info.find(val => val.material === item.material_name) && fleg.info.find(val => val.color === item.color_code)) {
                let val = fleg.info.find(val => val.material === item.material_name)
                val.weight = Number(val.weight) + Number(item.weight)
              } else {
                fleg.info.push({
                  material: item.material_name,
                  color: item.color_code,
                  weight: item.weight
                })
              }
            }
          }
        })
        do {
          this.list.push(arr.splice(0, 5))
        } while (arr.length > 0)
        this.total = this.list.length
        this.loading = false
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
    Promise.all([
    ]).then(res => {
      console.log(res)
    })
    this.getOrderList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialProcessList.less";
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
