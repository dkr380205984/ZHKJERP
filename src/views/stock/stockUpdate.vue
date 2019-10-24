<template>
  <div id="packagMaterialSetting"
    v-loading="loading">
    <div class="head">
      <h2>修改仓库</h2>
    </div>
    <div class="body">
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
            multiple
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
      <div class="lineCtn"
        v-for="(item,key) in stock_area"
        :key="key">
        <div class="inputCtn">
          <span class="label">区域:</span>
          <template>
            <el-input class="elInput"
              v-model="item.value"
              placeholder="请输入区域名称"></el-input>
            <!-- <span class="el-icon-plus icon"
              v-if="key === 0"
              @click="addArea()"></span>
            <span class="el-icon-minus icon"
              v-else
              @click="deleteArea(key)"></span> -->
          </template>
        </div>
      </div>
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
          @click="saveAll()">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { stockType } from '@/assets/js/dictionary.js'
import { stockUpdate, stockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      stock_type: [],
      stock_name: '',
      stock_area: [{ value: '' }],
      stock_address: '',
      remark: '',
      stockAreaArr: [
        { value: '一区' },
        { value: '二区' },
        { value: '三区' },
        { value: '四区' },
        { value: '五区' },
        { value: '六区' },
        { value: '七区' },
        { value: 'A区' },
        { value: 'B区' },
        { value: 'C区' },
        { value: 'D区' },
        { value: 'E区' },
        { value: 'F区' },
        { value: 'G区' },
        { value: 'H区' }
      ],
      stockTypeArr: stockType,
      timer: true
    }
  },
  methods: {
    saveAll () {
      console.log(this)
      if (!this.stock_name) {
        this.$message({
          type: 'error',
          message: `请输入仓库名称`
        })
        return
      }
      if (this.stock_type.length === 0) {
        this.$message({
          type: 'error',
          message: `请选择仓库类型`
        })
        return
      }
      if (this.timer) {
        let quyu = this.stock_area[0].value ? '<' + this.stock_area[0].value + '>' : ''
        stockUpdate({
          id: this.$route.params.id,
          name: this.stock_name + quyu,
          type: this.stock_type,
          address: this.stock_address,
          desc: this.remark
        }).then(res => {
          if (res.data.status) {
            this.$message.success('修改成功')
            this.$router.push('/index/stockList')
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        this.$message.error('请勿频繁点击！')
      }
    },
    querySearch (queryString, cb) {
      var restaurants = this.stockAreaArr
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
      // return results
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect (item) {
      console.log(item)
    },
    addArea () {
      this.stock_area.push({ value: '' })
    },
    deleteArea (index) {
      this.stock_area.splice(index, 1)
    }
  },
  mounted () {
    stockDetail({
      id: this.$route.params.id
    }).then((res) => {
      let data = res.data.data
      this.stock_type = JSON.parse(data.type)
      let match = data.name.match(/<\S*>/)
      this.stock_area = match ? [{ value: (match[0].slice(1, match[0].length - 1)) }] : [{ value: '' }]
      this.stock_name = data.name.split('<') ? data.name.split('<')[0] : data.name
      this.stock_address = data.address
      this.remark = data.desc
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/packagMaterialSetting.less";
</style>
