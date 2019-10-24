<template>
  <div id="packagMaterialList"
    v-loading="loading">
    <div class="head">
      <h2>仓库列表</h2>
      <el-input placeholder="输入库存名称精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="selectLine">
        <span class="label">筛选条件:</span>
        <div class="leftFilter">
          <el-select v-model="typeVal"
            multiple
            placeholder="筛选仓库类型">
            <el-option v-for="item in typeList"
              :key="item.id"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tableCtn"
        v-scroll="{fun:getStockList,pageSize:15}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">仓库名称</div>
          <div class="tableColumn">仓库类型</div>
          <div class="tableColumn">仓库地址</div>
          <div class="tableColumn">备注</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item,key) in list"
          :key="key">
          <div class="tableColumn">{{item.name}}</div>
          <div class="tableColumn">
            <span class="icons"
              :style="{'background':JSON.parse(item.type).indexOf(1)!==-1?'#1a95ff':'#DDD'}">原</span>
            <span class="icons"
              :style="{'background':JSON.parse(item.type).indexOf(2)!==-1?'#1a95ff':'#DDD'}">辅</span>
            <span class="icons"
              :style="{'background':JSON.parse(item.type).indexOf(3)!==-1?'#1a95ff':'#DDD'}">包</span>
            <span class="icons"
              :style="{'background':JSON.parse(item.type).indexOf(4)!==-1?'#1a95ff':'#DDD'}">产</span>
          </div>
          <div class="tableColumn">{{item.address ? item.address : '暂无'}}</div>
          <div class="tableColumn">{{item.desc ? item.desc : '暂无'}}</div>
          <div class="tableColumn">
            <span class="btns success"
              @click="$router.push('/index/stockDetail/' + item.id)">详情</span>
            <span class="btns warning"
              @click="$router.push('/index/stockUpdate/' + item.id)">修改</span>
          </div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="15"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getStockList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { stockType } from '@/assets/js/dictionary.js'
import { stockList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      typeVal: [],
      loading: true,
      searchVal: '',
      pages: 1,
      total: 0,
      typeList: stockType,
      list: []
    }
  },
  methods: {
    getStockList () {
      this.loading = true
      stockList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 15,
        page: this.pages,
        type: this.typeVal
      }).then(res => {
        this.list = res.data.data.data
        this.total = res.data.data.total
        this.loading = false
      })
    }
  },
  watch: {
    typeVal () {
      this.pages = 1
      this.getStockList()
    }
  },
  created () {
    this.getStockList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/packagMaterialList.less";
</style>
<style lang="less">
#packagMaterialList {
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
.tableColumn {
  .icons {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin: 0 4px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
