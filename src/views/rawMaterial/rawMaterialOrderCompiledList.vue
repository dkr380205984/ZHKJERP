<template>
  <div id="rawMaterialOrderCompiledList"
       v-loading="loading">
    <div class="head">
      <h2>原料已购列表</h2>
      <el-input placeholder="输入订单号精确搜索"
                suffix-icon="el-icon-search"
                v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="filterLine">
          <span class="label">筛选列表:</span>
          <el-tag closable
                  v-show="companyValCmp"
                  @close="clear('companyVal')">{{companyValCmp}}</el-tag>
          <el-tag closable
                  v-show="groupValCmp"
                  @close="clear('groupVal')">{{groupValCmp}}</el-tag>
          <el-tag closable
                  v-show="clientVal"
                  @close="clear('clientVal')">{{clientVal}}</el-tag>
          <el-tag closable
                  v-show="userVal"
                  @close="clear('userVal')">{{userVal}}</el-tag>
        </div>
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="companyVal"
                       placeholder="筛选订单公司">
              <el-option v-for="item in company"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="groupVal"
                       placeholder="筛选负责小组">
              <el-option v-for="item in group"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="clientVal"
                       placeholder="筛选订购单位">
              <el-option v-for="item in client"
                         :key="item.id"
                         :value="item.name">
              </el-option>
            </el-select>
            <el-select v-model="userVal"
                       placeholder="筛选创建人">
              <el-option v-for="item in user"
                         :key="item.id"
                         :value="item.name">
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
                            value-format="yyyy-MM-dd"
                            @change="pickTime"
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
               style="flex:1.9">订购单位</div>
          <div class="tableColumn">总公斤数</div>
          <div class="tableColumn">创建人</div>
          <div class="tableColumn">创建时间</div>
          <div class="tableColumn"
               style="flex:1.5">操作</div>
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
               style="flex:1.9">
            <span v-for="(value,index) in item.order_list"
                  :key="index">{{value ? value : '仓库' }}</span>
          </div>
          <div class="tableColumn">{{item.total_weight}}kg</div>
          <div class="tableColumn">{{item.create_name}}</div>
          <div class="tableColumn">{{item.create_time}}</div>
          <div class="tableColumn"
               style="flex-direction:row;flex:1.5">
            <span class="btns normal"
                  @click="$router.push('/index/rawMaterialOrderDetail/'+item.order_id)">查看</span>
            <span class="btns warning">修改</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
                       :page-size="1"
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
import { rawMaterialOrderList, clientList, getGroup, authList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
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
      company: [], // 订单公司
      companyVal: '',
      group: [], // 小组
      groupVal: '',
      client: [{ name: '仓库', id: 0 }], // 订购单位
      clientVal: '',
      user: [], // 创建人
      userVal: '',
      end_time: '',
      start_time: ''
    }
  },
  components: {
  },
  methods: {
    getOrderList () {
      this.loading = true
      rawMaterialOrderList({
        'company_id': window.sessionStorage.getItem('company_id'),
        'order_company_id': this.companyVal,
        'group_id': this.groupVal,
        'order_code': this.searchVal
      }).then((res) => {
        console.log(res)
        this.loading = false
        this.list = []
        let arr = []
        let data = []
        if (this.userVal || this.clientVal || this.date) {
          let arr1 = []
          // 筛选创建人
          if (this.userVal) {
            let arrs = []
            res.data.data.forEach(item => {
              if (item.user_name === this.userVal) {
                arrs.push(item.order_code)
              }
              if (arrs.find(val => val === item.order_code)) {
                arr1.push(item)
              }
            })
          } else {
            arr1 = res.data.data
          }
          let arr2 = []
          // 筛选订购单位
          if (this.clientVal) {
            let arrs = []
            arr1.forEach(item => {
              if (item.client_name === this.clientVal || (item.client_name === null && this.clientVal === '仓库')) {
                arrs.push(item.order_code)
              }
              if (arrs.find(val => val === item.order_code)) {
                arr2.push(item)
              }
            })
          } else {
            arr2 = arr1
          }
          // 筛选日期范围
          if (this.date) {
            let startArr = this.start_time.split('-')
            let endArr = this.end_time.split('-')
            let arrs = []
            arr2.forEach(item => {
              let nowTime = item.order_time.split(' ')[0].split('-')
              if (Number(startArr[0]) < Number(nowTime[0]) && Number(nowTime[0]) < Number(endArr[0])) {
                arrs.push(item.order_code)
              } else if (Number(startArr[0]) === Number(nowTime[0])) {
                if (Number(startArr[1]) < Number(nowTime[1]) && Number(nowTime[1]) < Number(endArr[1])) {
                  arrs.push(item.order_code)
                } else if (Number(startArr[1]) === Number(nowTime[1])) {
                  if (Number(startArr[2]) <= Number(nowTime[2]) && Number(nowTime[2]) <= Number(endArr[2])) {
                    arrs.push(item.order_code)
                  }
                }
              }
              if (arrs.find(val => val === item.order_code)) {
                data.push(item)
              }
            })
          } else {
            data = arr2
          }
        } else {
          data = res.data.data
        }
        data.forEach(item => {
          let flag = arr.find(val => val.order_code === item.order_code)
          if (!flag) {
            arr.push({
              order_code: item.order_code,
              order_company: item.order_client,
              total_weight: item.weight,
              create_time: item.order_time.split(' ')[0],
              order_list: [item.client_name],
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
            flag.total_weight = Number(flag.total_weight) + Number(item.weight)
            let fleg = flag.order_list.find(val => val === item.client_name)
            if (!fleg && fleg !== null) {
              flag.order_list.push(item.client_name)
            }
          }
        })
        do {
          this.list.push(arr.splice(0, 5))
        } while (arr.length > 0)
        this.total = this.list.length
      })
    },
    pickTime (date) {
      console.log(date)
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
      if (item === 'companyVal') {
        this.companyVal = ''
      } else if (item === 'groupVal') {
        this.groupVal = ''
      } else if (item === 'clientVal') {
        this.clientVal = ''
      } else if (item === 'userVal') {
        this.userVal = ''
      }
    }
  },
  watch: {
    companyVal (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    groupVal (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    clientVal (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    userVal (newVal) {
      this.pages = 1
      this.getOrderList()
    },
    searchVal (newVal) {
      this.timer = ''
      this.timer = setTimeout(() => {
        this.getOrderList()
      }, 800)
    }
  },
  computed: {
    companyValCmp () {
      if (this.companyVal) {
        return this.company.find((item) => item.id === this.companyVal).name
      } else {
        return '所有分类'
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
    Promise.all([
      clientList({
        company_id: sessionStorage.company_id
      }),
      getGroup({
        company_id: sessionStorage.company_id
      }),
      authList({
        company_id: sessionStorage.company_id
      })
    ]).then(res => {
      console.log(res)
      // 初始化筛选订单公司与订购公司数据
      res[0].data.data.forEach(item => {
        if (item.type === 1) {
          this.company.push(item)
        }
        if (item.type === 2) {
          this.client.push(item)
        }
      })
      // 初始化筛选小组数据
      this.group = res[1].data.data
      this.user = res[2].data.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialOrderCompiledList.less";
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
