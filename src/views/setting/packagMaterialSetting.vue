<template>
  <div id="packagMaterialSetting">
    <div class="head">
      <h2>添加包装辅料</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">辅料名称:</span>
          <el-input class="elInput"
            v-model="pack_name"
            placeholder="请输入辅料名称"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">辅料规格:</span>
          <el-input class="elInput"
            v-model="pack_size"
            placeholder="请输入辅料编号"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">辅料重量:</span>
          <el-input class="elInput"
            v-model="pack_weight"
            placeholder="请输入辅料净重"></el-input>
        </div>
      </div>
      <div class="lineCtn"
        v-for="(item,key) in pack_attrs"
        :key="key">
        <div class="inputCtn">
          <span class="label"
            v-if="key === 0">辅料属性:</span>
          <span class="label"
            v-else></span>
          <el-input class="elInput"
            v-model="item.pack_attr"
            placeholder="请输入辅料属性"></el-input>
          <span class="el-icon-plus icon"
            v-if="key === 0"
            @click="addPackAttr()"></span>
          <span class="el-icon-minus icon"
            v-else
            @click="deletePackAttr(key)"></span>
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
          @click="$router.push('/index/packagMaterialList')">返回</div>
        <div class="okBtn"
          @click="saveAll()">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { } from '@/assets/js/api.js'
export default {
  data () {
    return {
      pack_name: '',
      pack_size: '',
      pack_weight: '',
      pack_attrs: [{ pack_attr: '' }],
      remark: ''
    }
  },
  created () {
  },
  methods: {
    addPackAttr () {
      this.pack_attrs.push({
        pack_attr: ''
      })
    },
    deletePackAttr (key) {
      this.pack_attrs.splice(key, 1)
    },
    saveAll () {

    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/packagMaterialSetting.less";
</style>
