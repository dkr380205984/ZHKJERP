<template>
  <div id="packagMaterialSetting">
    <div class="head">
      <h2>添加仓库</h2>
    </div>
    <div class="body">
      <!-- <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">辅料类型:</span>
          <el-radio-group v-model="type"
            style="margin-left: 15px;">
            <el-radio :label="1">主要辅料</el-radio>
            <el-radio :label="2">次要辅料</el-radio>
          </el-radio-group>
          <el-tooltip class="item"
            effect="dark"
            content="包装辅料订购详情页面区分开主要包装统计与次要包装统计"
            placement="top-start">
            <span class="el-icon-question"
              style="margin-left:80px;"></span>
          </el-tooltip>
        </div>
      </div> -->
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">仓库名称:</span>
          <el-input class="elInput"
            v-model="stock_name"
            placeholder="请输入仓库名称"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">仓库类型:</span>
          <el-select v-model="stock_type"
            class="elInput"
            placeholder="请选择仓库类型">
            <el-option v-for="item in stockTypeArr"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">仓库地址:</span>
          <el-input class="elInput"
            v-model="stock_address"
            placeholder="请输入仓库地址"></el-input>
        </div>
      </div>
      <!-- <div class="lineCtn"
        v-for="(item,key) in stock_area"
        :key="key">
        <div class="inputCtn">
          <span class="label"> {{'仓库区域' + (key+1) + ':'}}</span>
          <template>
            <el-autocomplete class="elInput"
              v-model="item.value"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"></el-autocomplete>
            <span class="el-icon-plus icon"
              v-if="key === 0"
              @click="addArea()"></span>
            <span class="el-icon-minus icon"
              v-else
              @click="deleteArea(key)"></span>
          </template>
        </div>
      </div> -->
      <div class="lineCtn bigLine">
        <div class="inputCtn">
          <span class="label">备注:</span>
          <el-input class="elInput"
            v-model="remark"
            :autosize="{minRows:2,maxRows:5}"
            type="textarea"
            placeholder="请输入备注信息"></el-input>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.push('/index/stockList')">返回</div>
        <div class="okBtn"
          @click="saveAll()">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { addStock } from '@/assets/js/api.js'
export default {
  data () {
    return {
      stock_type: '',
      stock_name: '',
      stock_area: [{ value: '' }],
      stock_address: '',
      remark: '',
      // stockAreaArr: [
      //   { value: '一区' },
      //   { value: '二区' },
      //   { value: '三区' },
      //   { value: '四区' },
      //   { value: '五区' },
      //   { value: '六区' },
      //   { value: '七区' },
      //   { value: 'A区' },
      //   { value: 'B区' },
      //   { value: 'C区' },
      //   { value: 'D区' },
      //   { value: 'E区' },
      //   { value: 'F区' },
      //   { value: 'G区' },
      //   { value: 'H区' }
      // ],
      stockTypeArr: [
        {
          name: '本厂仓库',
          id: 1
        }, {
          name: '染色仓库',
          id: 2
        }, {
          name: '租赁仓库',
          id: 3
        }, {
          name: '临时仓库',
          id: 4
        }, {
          name: '外厂仓库',
          id: 5
        }
      ],
      timer: true
    }
  },
  created () {
  },
  methods: {
    saveAll () {
      if (!this.stock_name) {
        this.$message({
          type: 'error',
          message: `请输入仓库名称`
        })
        return
      }
      if (!this.stock_type) {
        this.$message({
          type: 'error',
          message: `请选择仓库类型`
        })
        return
      }
      // if (!this.stock_address) {
      //   this.$message({
      //     type: 'error',
      //     message: `请输入仓库地址`
      //   })
      //   return
      // }
      if (this.timer) {
        addStock({
          name: this.stock_name,
          type: this.stock_type,
          // area: ((this.stock_area && this.stock_area.length > 0) ? this.stock_area : null),
          address: this.stock_address,
          desc: this.remark
        }).then(res => {
          if (res.data.status) {
            this.$message.success('添加成功')
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        this.$message.error('请勿频繁点击！')
      }
    }
    // querySearch (queryString, cb) {
    //   console.log(queryString)
    //   var restaurants = this.stockAreaArr
    //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
    //   // 调用 callback 返回建议列表的数据
    //   cb(results)
    //   // return results
    // },
    // createFilter (queryString) {
    //   return (restaurant) => {
    //     return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
    //   }
    // },
    // handleSelect (item) {
    //   console.log(item)
    // },
    // addArea () {
    //   this.stock_area.push({ value: '' })
    // },
    // deleteArea (index) {
    //   this.stock_area.splice(index, 1)
    // }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/packagMaterialSetting.less";
</style>
