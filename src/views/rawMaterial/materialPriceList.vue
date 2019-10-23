<template>
  <div id="productList"
    v-loading='loading'>
    <div class="head">
      <h2>原料价格表</h2>
      <el-input placeholder="输入原料名称精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body"
      style="padding:80px 40px">
      <div class="addBtn"
        @click="showShadeFun(false)">设置原料价格</div>
      <div class="tableCtn">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">原料名称</div>
          <div class="tableColumn">价格(元/kg)</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn">历史记录</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item) in getList(pages)"
          :key="item.id">
          <div class="tableColumn"
            style="color:#1A95FF">{{item.name}}</div>
          <div class="tableColumn">{{item.price ? item.price : '-'}}</div>
          <div class="tableColumn">{{item.update_time}}</div>
          <div class="tableColumn">
            <el-popover placement="left"
              width="406"
              popper-class="elPopover-materialPriceList"
              trigger="click">
              <el-table :data="history">
                <el-table-column width="200"
                  property="updated_at"
                  label="更新日期"></el-table-column>
                <el-table-column width="200"
                  property="price"
                  label="价格"></el-table-column>
              </el-table>
              <span slot="reference"
                style="color:#1A95FF;cursor: pointer;"
                @click="getHistory(item)">查看历史价格</span>
            </el-popover>
          </div>
          <div class="tableColumn">
            <span class="btns warning"
              @click="showShadeFun(item)">更新</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages">
        </el-pagination>
      </div>
    </div>
    <div class="message"
      v-if="showShade">
      <div class="messageBox">
        <div class="title">{{isUpdata?'更新':'设置'}}物料价格</div>
        <div class="item"
          style="margin-top:27px;">
          <span class="label">物料名称:</span>
          <div class="content">
            <el-select v-model="material_id"
              class="elInput"
              filterable
              :disabled="isUpdata"
              placeholder="请选择需要设置的原料">
              <el-option v-for="item in materialList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <span class="label">原价格:</span>
          <div class="content">{{oldPrice ? oldPrice + '元/kg' : '-'}}</div>
        </div>
        <div class="item">
          <span class="label">更新价格:</span>
          <div class="content">
            <el-input class="elInput"
              placeholder="请输入价格"
              v-model="price">
              <template slot="append">元/kg</template>
            </el-input>
          </div>
        </div>
        <div class="footer">
          <span class="cancel"
            @click="closeWindow">取消</span>
          <span class="ok"
            @click="submit">更新</span>
        </div>
        <span class="close el-icon-close"
          @click="closeWindow"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { yarnPriceSetting, YarnList, yarnPriceList, yarnPriceHistory } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      total: 0,
      pages: 1,
      list: [],
      filterList: [],
      material_id: '',
      material_list: [],
      isUpdata: false,
      price: '',
      oldPrice: '',
      showShade: false,
      history: []
    }
  },
  methods: {
    getList (pages) {
      return JSON.parse(JSON.stringify(this.filterList)).splice((pages - 1) * 10, 10)
    },
    getHistory (item) {
      yarnPriceHistory({
        yarn_id: item.id
      }).then(res => {
        if (res.data.status) {
          this.history = res.data.data
        } else {
          this.$message.error('出错了:' + res.data.message)
          this.history = []
        }
      })
    },
    showShadeFun (item) {
      this.showShade = true
      if (item) {
        this.isUpdata = true
        this.oldPrice = item.price
        this.material_id = String(item.id)
      }
    },
    closeWindow () {
      this.showShade = false
      this.isUpdata = false
      this.material_id = ''
      this.price = ''
      this.oldPrice = ''
    },
    submit () {
      if (!this.material_id) {
        this.$message.error('请选择需要设置价格的原料')
        return
      }
      if (!this.price) {
        this.$message.error('请输入价格')
        return
      }
      yarnPriceSetting({
        yarn_id: this.material_id,
        price: this.price
      }).then(res => {
        if (res.data.status) {
          this.$message.success('保存成功')
          if (this.isUpdata) {
            this.list.find(items => Number(items.id) === Number(this.material_id)).price = this.price
            this.closeWindow()
          } else {
            window.location.reload()
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getMaterialList () {
      this.loading = true
      yarnPriceList({

      }).then(res => {
        if (res.data.status) {
          this.list = res.data.data
          this.filterList = res.data.data
          this.total = res.data.data.length
        } else {
          this.$message.error(res.data.message)
        }
        this.loading = false
      })
    }
  },
  watch: {
    searchVal (newVal) {
      this.loading = true
      if (newVal) {
        this.filterList = this.list.filter(items => items.name.indexOf(newVal) !== -1)
      } else {
        this.filterList = this.list
      }
      this.pages = 1
      this.total = this.filterList.length
      this.loading = false
    }
  },
  created () {
    Promise.all([
      YarnList({
        'company_id': window.sessionStorage.getItem('company_id')
      })
    ]).then((res) => {
      this.materialList = res[0].data.data
      this.loading = false
    })
    this.getMaterialList()
  }
}
</script>

<style lang="less" scoped>
.messageBox {
  .title {
    line-height: 50px;
    height: 50px;
    width: inherit;
    padding-left: 16px;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
  .elInput {
    width: 288px;
  }
}
.body {
  position: relative;
  .addBtn {
    width: 10em;
    height: 2em;
    font-size: 16px;
    background-color: @normalBlue;
    color: #fff;
    text-align: center;
    line-height: 2em;
    border-radius: 5px;
    margin-bottom: 30px;
    position: absolute;
    right: 40px;
    top: 20px;
    cursor: pointer;
  }
}
@import "~@/assets/css/productList.less";
</style>
<style lang="less">
.elPopover-materialPriceList {
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
