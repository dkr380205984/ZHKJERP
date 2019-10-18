<template>
  <div id="packagMaterialList"
    v-loading="loading">
    <div class="head">
      <h2>库存列表</h2>
      <el-input placeholder="输入库存名称精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="addBtn"
        @click="$router.push('/index/stockSetting')">添加仓库</div>
      <div class="tableCtn"
        v-scroll="{fun:getStockList,pageSize:15}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn">仓库名称</div>
          <div class="tableColumn">仓库类型</div>
          <div class="tableColumn flex9">仓库地址</div>
          <div class="tableColumn">仓库区域</div>
          <!-- <div class="tableColumn flex9">属性</div> -->
          <div class="tableColumn">备注</div>
          <div class="tableColumn">更新时间</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item,key) in list"
          :key="key">
          <div class="tableColumn">{{item.name}}</div>
          <div class="tableColumn">{{item.type ? stockTypeArr.find(items=>items.id === item.type).name : ''}}</div>
          <div class="tableColumn flex9">{{item.address ? item.address : '无'}}</div>
          <div class="tableColumn">{{item.area ? item.area : '无'}}</div>
          <!-- <div class="tableColumn flex9"><template v-for="(val,ind) in item.attribute">{{((ind !== 0) ? '，' : '') + val.pack_attr}}</template></div> -->
          <div class="tableColumn">{{item.desc ? item.desc : '暂无备注'}}</div>
          <div class="tableColumn">{{item.updated_at}}</div>
          <div class="tableColumn blue">打印</div>
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
import { stockList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      pages: 1,
      total: 0,
      list: [],
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
      ]
    }
  },
  methods: {
    getStockList () {
      this.loading = true
      stockList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 15,
        page: this.pages
      }).then(res => {
        this.list = res.data.data
        // this.list.forEach(res => {
        //   res.attribute = JSON.parse(res.attribute)
        // })
        this.total = res.data.data.length
        this.loading = false
      })
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
</style>
