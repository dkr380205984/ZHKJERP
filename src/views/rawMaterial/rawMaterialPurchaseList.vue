<template>
  <div id="rawMaterialOrderList"
    v-loading='loading'>
    <div class="head">
      <h2>原料预订购列表</h2>
    </div>
    <div class="body">
      <div class="filterCtn">
        <div class="selectLine">
          <span class="label">筛选条件:</span>
          <div class="leftFilter">
            <el-select v-model="clientVal"
              placeholder="筛选公司">
              <el-option v-for="item in client"
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
      <div class="mergeTable"
        v-scroll="{fun:getList,pageSize:5}">
        <div class="mergeHeader">
          <div class="tableColumn">订购日期</div>
          <div class="tableColumn">订单公司</div>
          <div class="tableColumn"
            style="flex:2">原料名称</div>
          <div class="tableColumn">原料颜色</div>
          <div class="tableColumn">原料属性</div>
          <div class="tableColumn">预定价格</div>
          <div class="tableColumn">预定总重</div>
          <div class="tableColumn">总价</div>
          <div class="tableColumn">备注</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="mergeBody"
          v-for="(item,key) in list"
          :key="key">
          <div class="tableColumn">{{item.order_time.slice(0,10)}}</div>
          <div class="tableColumn">{{item.client_name}}</div>
          <div class="tableColumn"
            style="flex:5">
            <div class="once onces"
              v-for="(itemMaterial,indexMaterial) in item.material_info"
              :key="indexMaterial">
              <span class="flex06"
                style="border-right:1px solid #DDD;flex:1.2">{{itemMaterial.material_name}}</span>
              <span class="flex06"
                style="border-right:1px solid #DDD;">{{itemMaterial.color_code}}</span>
              <span class="flex06"
                style="border-right:1px solid #DDD;">{{itemMaterial.attribute}}</span>
              <span class="flex06">{{itemMaterial.price}}元</span>
            </div>
          </div>
          <div class="tableColumn">{{item.total_weight}}kg</div>
          <div class="tableColumn">{{item.total_price}}元</div>
          <div class="tableColumn">{{item.remark?item.remark:'无'}}</div>
          <div class="tableColumn">
            <span class="btns normal"
              @click="$router.push('/index/rawMaterialPurchaseDetail/'+item.id)">原料入库</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="5"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { rawMaterialPurchaseList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      client: [],
      clientVal: '',
      list: [],
      total: 0,
      pages: 1,
      start_time: '',
      end_time: '',
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
      }
    }
  },
  methods: {
    getList () {
      rawMaterialPurchaseList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 5
      }).then((res) => {
        this.list = res.data.data.map((item) => {
          item.material_info = JSON.parse(item.material_info)
          return item
        })
        this.loading = false
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
      this.pages = 1
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialOrderList.less";
</style>
