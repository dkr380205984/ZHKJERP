<template>
  <div id="packagMaterialList"
    v-loading="loading">
    <div class="head">
      <h2>包装辅料列表</h2>
      <el-input placeholder="输入包装编号精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="addBtn"
        @click="$router.push('/index/packagMaterialSetting')">添加包装辅料</div>
      <div class="tableCtn"
        v-scroll="{fun:getPackList,pageSize:15}">
        <div class="tableRow titleTableRow">
          <div class="tableColumn flex9">包装辅料编号</div>
          <div class="tableColumn flex9">名称</div>
          <div class="tableColumn flex9">规格</div>
          <div class="tableColumn flexSamll">重量</div>
          <div class="tableColumn flex9">属性</div>
          <div class="tableColumn">备注</div>
          <div class="tableColumn flex9">更新时间</div>
          <div class="tableColumn">操作</div>
        </div>
        <div class="tableRow bodyTableRow"
          v-for="(item,key) in list"
          :key="key">
          <div class="tableColumn flex9">{{item.id}}</div>
          <div class="tableColumn flex9">{{item.name}}</div>
          <div class="tableColumn flex9">{{item.size ? item.size : '无'}}</div>
          <div class="tableColumn flexSamll">{{item.weight !== '0' ? item.weight : '无'}}</div>
          <div class="tableColumn flex9"><template v-for="(val,ind) in item.attribute">{{((ind !== 0) ? '，' : '') + val.pack_attr}}</template></div>
          <div class="tableColumn">{{item.desc ? item.desc : '暂无备注'}}</div>
          <div class="tableColumn flex9">{{item.updated_at}}</div>
          <div class="tableColumn blue"
            @click="$router.push('/index/packagMaterialSetting?id=' + item.id  )">修改</div>
        </div>
      </div>
      <div class="pageCtn">
        <el-pagination background
          :page-size="15"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pages"
          @current-change="getPackList">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { packagMaterialList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      searchVal: '',
      pages: 1,
      total: 0,
      list: []
    }
  },
  methods: {
    getPackList () {
      this.loading = true
      packagMaterialList({
        company_id: window.sessionStorage.getItem('company_id'),
        limit: 15,
        page: this.pages
      }).then(res => {
        console.log(res)
        this.list = res.data.data
        this.list.forEach(res => {
          res.attribute = JSON.parse(res.attribute)
        })
        this.total = res.data.data.length
        this.loading = false
      })
    }
  },
  created () {
    this.getPackList()
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
