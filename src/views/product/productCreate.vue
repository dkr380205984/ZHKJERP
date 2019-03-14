<template>
  <div id="productCreate" v-loading="loading">
    <div class="head">
      <h2>添加新产品</h2>
    </div>
    <div class="body">
       <div class="inputCtn">
        <span class="label">产品编号:</span>
        <span class="unInput">KB13229985</span>
      </div>
      <div class="inputCtn">
        <span class="label">产品分类:</span>
        <div class="ascaderCtn">
          <el-cascader
            :options="treeData"
            expand-trigger="hover"
            v-model="types"
            @change="handleChange"
            placeholder="请选择产品品类">
          </el-cascader>
        </div>
      </div>
      <div class="inputCtn" style="margin-bottom:0">
        <span class="label">产品花型:</span>
        <el-select style="width:400px" class="elSelect" v-model="flower" placeholder="请选择花型">
          <el-option
            v-for="item in flowerArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="inputCtn" style="margin-top:0;margin-bottom:0">
        <span class="label">产品成分:</span>
        <el-select style="width:400px" class="elSelect" v-model="ingredient" placeholder="请选择成分">
          <el-option
            v-for="item in ingredientArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="inputCtn" style="margin-bottom:0;margin-top:4px">
        <span class="label">产品尺寸:</span>
        <el-select class="elInput" v-model="size" placeholder="请选择尺码">
          <el-option
            v-for="item in treeData"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input class="elInputAp" placeholder="请输入数字" v-model="length" @keyup.native="filterNum('length')">
          <template slot="prepend">长</template>
          <template slot="append">厘米</template>
        </el-input>
      </div>
      <div class="inputCtn" style="margin-top:0">
        <span class="label">产品克重:</span>
        <el-input class="elInput" placeholder="请输入产品克重" v-model="weight" @keyup.native="filterNum('weight')">
          <template slot="append">克</template>
        </el-input>
      </div>
      <div class="inputCtn" style="margin-bottom:0">
        <span class="label">产品颜色:</span>
        <el-select v-for="item in colorNum" :key="item" class="elSelect" v-model="color[item]" placeholder="请选择颜色">
          <el-option
            v-for="item in colorArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <div class="bgBlock" :style="{'background':item.color_code}"></div>
            <div class="desc">{{item.name}}</div>
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
           :before-upload="beforeAvatarUpload"
          :file-list="fileList2"
          :data = postData
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png图片文件，且不超过10M</div>
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
        <div class="cancleBtn" @click="clearAll">清空</div>
        <div class="okBtn" @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, productTppeList, flowerList, ingredientList, colorList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      postData: { token: '' },
      loading: true,
      selectedOptions: [],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      cities: [],
      colorNum: 1,
      fileList2: [],
      textarea: '',
      flower: '',
      flowerArr: [],
      types: [],
      treeData: [],
      ingredient: '',
      ingredientArr: [],
      color: [],
      colorArr: [],
      length: '',
      width: '',
      extra_size: '',
      weight: '',
      fileArr: [],
      size: ''
    }
  },
  created () {
    let companyId = window.sessionStorage.getItem('company_id')
    // 初始化接口
    Promise.all([flowerList({
      company_id: companyId
    }), productTppeList({
      company_id: companyId
    }), ingredientList({
      company_id: companyId
    }), colorList({
      company_id: companyId
    }), getToken()]).then((res) => {
      console.log(res)
      this.flowerArr = res[0].data.data
      this.treeData = res[1].data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          children: item.child.length === 0 ? null : item.child.map((item) => {
            return {
              value: item.id,
              label: item.name,
              children: item.child.length === 0 ? null : item.child.map((item) => {
                return {
                  value: item.id,
                  label: item.name
                }
              })
            }
          })
        }
      })
      this.ingredientArr = res[2].data.data
      this.colorArr = res[3].data.data
      this.postData.token = res[4].data.data
      this.loading = false
    })
  },
  watch: {
    fileList2 (oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  methods: {
    // 数字校验
    filterNum (val) {
      this[val] = this[val].replace(/[^0-9.]/g, '')
    },
    handleChange (value) {
      console.log(value)
    },
    // 文件上传相关操作
    handleRemove (file, fileList) {
      console.log('remove', file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeAvatarUpload: function (file) {
      this.postData.key = file.name
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      const isReapeat = this.fileArr.find((item) => {
        return item.key === file.name
      })
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
        return false
      }
      if (isReapeat) {
        this.$message.error('不能重复上传图片')
        return false
      }
    },
    handleSuccess (file) {
      this.fileArr.push(file)
    },
    // 清空操作
    clearAll () {

    },
    // 保存操作
    saveAll () {

    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productCreate.less';
</style>
<style lang="less">
.el-cascader-menu{
  font-size: 14px;
  color: #666;
  font-family: 'systemfont';
  font-weight: 300;
}
</style>
