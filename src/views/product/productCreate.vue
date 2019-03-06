<template>
  <div id="productCreate">
    <div class="head">
      <h2>添加新产品</h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label">产品分类:</span>
        <div class="ascaderCtn">
          <el-cascader
            :options="options"
            expand-trigger="hover"
            v-model="selectedOptions"
            @change="handleChange"
            placeholder="请选择产品品类">
          </el-cascader>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label">产品成分:</span>
        <el-input class="elInput"  placeholder="请输入产品成分"  v-model="value1" clearable></el-input>
      </div>
      <div class="inputCtn">
        <span class="label">产品花型:</span>
        <el-input class="elInput"  placeholder="请输入产品花型"  v-model="value1" clearable></el-input>
      </div>
      <div class="inputCtn" style="margin-bottom:0">
        <span class="label">产品尺寸:</span>
        <el-input class="elInputAp" placeholder="请输入数字" v-model="value2">
          <template slot="prepend">长</template>
          <template slot="append">厘米</template>
        </el-input>
        <el-input class="elInputAp" placeholder="请输入数字" v-model="value3">
          <template slot="prepend">宽</template>
          <template slot="append">厘米</template>
        </el-input>
        <el-input class="elInputAp" placeholder="请输入数字" v-model="value4">
          <template slot="prepend">须头</template>
          <template slot="append">厘米</template>
        </el-input>
      </div>
      <div class="inputCtn" style="margin-top:0">
        <span class="label">产品克重:</span>
        <el-input class="elInput" placeholder="请输入产品克重" v-model="value5">
          <template slot="append">克</template>
        </el-input>
      </div>
      <div class="inputCtn" style="margin-bottom:0">
        <span class="label">产品颜色:</span>
        <el-select v-for="item in colorNum" :key="item" class="elSelect" v-model="colorArr[item]" placeholder="请选择颜色">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
        <div class="addBtn" @click="colorNum++">
          <span>添加颜色</span>
          <span>+</span>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label">产品图片:</span>
        <el-upload
          class="upload-demo"
          action="http://upload.qiniup.com/"
          accept="image/jpeg,image/gif,image/png,image/bmp"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList2"
          :data = postData
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="inputCtn" style="margin-top:50px">
        <span class="label">产品描述:</span>
        <el-input
          class="textarea"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn">清空</div>
        <div class="okBtn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { productType } from '@/assets/js/dictionary.js'
import { getToken } from '@/assets/js/api.js'
export default {
  data () {
    return {
      postData: { token: '' },
      options: productType,
      selectedOptions: [],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      colorArr: [],
      colorNum: 1,
      fileList2: [],
      textarea: ''
    }
  },
  created () {
    getToken().then((res) => {
      console.log(res)
      this.postData.token = res.data.data
    })
  },
  watch: {
    fileList2 (oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productCreate.less';
</style>
