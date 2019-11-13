<template>
  <div id="permissionsAdd"
    v-loading='loading'>
    <div class="head">
      <h2>添加权限</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">权限名称：</span>
          <el-input v-model="name"
            placeholder="请输入权限名称"
            class="inputContent">
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">权限类型：</span>
          <el-select v-model="type"
            placeholder="请选择权限类型"
            class="inputContent">
            <el-option v-for="item in permissData"
              :key="item.id"
              :label="item.module"
              :value="item.id">
            </el-option>
          </el-select>
          <!-- <el-cascader v-model="type"
            :options="permissData"
            placeholder="请选择权限类型"
            class="inputContent"
            @change="getUrlData"></el-cascader> -->
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label must">权限接口：</span>
          <el-input v-model="url"
            placeholder="请输入权限接口"
            class="inputContent">
          </el-input>
          <!-- <span @click="searchFlag = !searchFlag"
            class="search el-icon-search">{{searchFlag ? '关闭' : '打开'}}高级搜索</span> -->
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { permissions } from '@/assets/js/dictionary.js'
import { permissionAdd } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      name: '',
      type: '',
      url: '',
      permissData: permissions
    }
  },
  // watch: {
  //   searchFlag () {
  //     if (!this.searchFlag) {
  //       this.getUrlData()
  //     }
  //   }
  // },
  methods: {
    // getUrlData () {
    //   function digui (data, type, index) {
    //     if (type.length === 0) {
    //       return []
    //     }
    //     let date = data.find(key => key.value === type[index])
    //     if (index < type.length - 1) {
    //       return digui(date.children, type, index + 1)
    //     } else {
    //       return date.url
    //     }
    //   }
    //   this.urlData = digui(this.permissData, this.type, 0)
    // },
    saveAll () {
      permissionAdd({
        name: this.name,
        module: this.type,
        url: this.url
      }).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.name = ''
        this.type = []
        this.url = ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/permissionsAdd.less";
</style>
<style lang="less" scoped>
</style>
