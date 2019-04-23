<template>
  <div id="mainMaterialStockCreate">
    <div class="head">
      <h2>添加原料库存</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料名称:</span>
          <el-select class="elInput"
                     v-model="value"
                     placeholder="请选择原料名称">
            <el-option v-for="(item,index) in arr"
                       :key="index"
                       :value="item"
                       :label="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料颜色:</span>
          <el-select class="elInput"
                     v-model="value"
                     placeholder="请选择原料颜色">
            <el-option v-for="(item,index) in arr"
                       :key="index"
                       :value="item"
                       :label="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料属性:</span>
          <el-select class="elInput"
                     v-model="value"
                     placeholder="请选择原料属性">
            <el-option v-for="(item,index) in arr"
                       :key="index"
                       :value="item"
                       :label="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料缸号:</span>
          <el-input class="elInput"
                    placeholder="请输入原料缸号" />
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">原料重量:</span>
          <el-input class="elInput"
                    placeholder="请输入原料重量">
            <template slot="append">千克</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">存放仓库:</span>
          <el-select class="elInput"
                     v-model="value"
                     placeholder="请选择存放仓库">
            <el-option v-for="(item,index) in arr"
                       :key="index"
                       :value="item"
                       :label="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">备注:</span>
          <el-input type="textarea"
                    :rows="6"
                    class="elInput"
                    placeholder="请输入其他信息" />
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
             @click="$router.go(-1)">返回</div>
        <div class="okBtn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [],
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/mainMaterialStockCreate.less";
</style>
