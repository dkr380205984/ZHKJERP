<template>
  <div id="productCreate" v-loading="loading">
    <div class="head">
      <h2>产品修改</h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label">产品编号:</span>
        <span class="unInput">{{product_code}}</span>
      </div>
      <div class="inputCtn">
        <span class="label must">产品分类:</span>
        <div class="ascaderCtn">
          <el-cascader
            :options="treeData"
            expand-trigger="hover"
            v-model="types"
            @change="handleChange"
            disabled
            placeholder="请选择产品品类">
          </el-cascader>
        </div>
      </div>
      <div class="inputCtn" style="margin-bottom:0">
        <span class="label must">产品花型:</span>
        <el-select clearable style="width:400px" class="elSelect" v-model="flower" placeholder="请选择花型" disabled>
          <el-option
            v-for="item in flowerArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="inputCtn" style="margin-top:0;margin-bottom:0">
        <span class="label must">产品成分:</span>
        <div class="cancleCtn" v-for="item in ingredientNum" :key="item">
          <div class="index">{{item}}</div>
          <el-select class="specialSel" v-model="ingredient[item-1]" placeholder="请选择成分">
            <el-option
              v-for="item in ingredientArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input style="width:160px;margin-left:15px;margin-bottom:24px" placeholder="请输入比例" v-model="ingredientScale[item-1]" class="input-with-select">
            <template slot="append">%</template>
          </el-input>
          <div class="deleteBtn" @click="deleteIngredient(item)"><i class="el-icon-delete"></i></div>
        </div>
        <div class="addBtn" @click="ingredientNum++">
          <span>添加成分</span>
          <span>+</span>
        </div>
        <div class="tooltips" v-show="showError">
          <i class="el-icon-warning"></i>
          产品成分比例总和不等于100%，请检查比例
        </div>
      </div>
      <div class="inputCtn" style="margin-bottom:0;margin-top:4px">
        <span class="label must">产品尺寸:</span>
        <div class="lineCtn" v-for="(itemf,indexf) in sizeNum" :key="indexf">
          <el-select clearable class="elInput" v-model="footage[indexf]" placeholder="请选择尺码" style="width:200px;margin-bottom: 24px;">
            <el-option
              v-for="item in child_footage"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input v-for="(item,index) in child_size" class="elInputAp" placeholder="请输入数字" v-model="sizeArr[indexf][index]" :key="item.id">
            <template slot="prepend">{{item.name}}</template>
            <template slot="append">厘米</template>
          </el-input>
          <el-input class="elInputAp" style="width:200px" placeholder="请输入产品克重" v-model="weight[indexf]">
            <template slot="append">克</template>
          </el-input>
          <div class="deleteBtn2" @click="deleteSize(itemf)"><i class="el-icon-delete"></i></div>
        </div>
        <div class="addBtn" @click="addSizeLine">
          <span>添加尺寸</span>
          <span>+</span>
        </div>
      </div>
      <div class="inputCtn" style="margin-top:0;margin-bottom:0">
        <span class="label must">产品配色:</span>
        <div class="cancleCtn" v-for="item in colorNum" :key="item">
          <el-select clearable filterable class="elSelect" v-model="color[item-1]" placeholder="请选择配色">
            <el-option
              v-for="item in colorArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <div class="bgBlock" :style="{'background':item.color_code}"></div>
              <div class="desc">{{item.name}}</div>
            </el-option>
          </el-select>
          <div class="deleteBtn" @click="deleteColor(item)"><i class="el-icon-delete"></i></div>
        </div>
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
          :file-list="fileArr"
          :data = postData
          ref="uploada"
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
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn" @click="saveAll">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, productTppeList, flowerList, ingredientList, colorList, saveProduct, porductOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      product_code: '',
      postData: { token: '' },
      loading: true,
      colorNum: 1,
      sizeNum: 1,
      ingredientNum: 1,
      textarea: '',
      flower: '',
      flowerArr: [],
      types: [],
      treeData: [],
      ingredient: [],
      ingredientScale: [100],
      ingredientArr: [],
      color: [],
      colorArr: [],
      fileArr: [],
      footage: [],
      sizeArr: [],
      child_footage: [{
        id: -1,
        name: '均码'
      }],
      child_size: [],
      weight: [],
      showError: false
    }
  },
  mounted () {
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
    }), getToken(),
    porductOne({
      id: this.$route.params.id
    })]).then((res) => {
      this.flowerArr = res[0].data.data
      this.treeData = res[1].data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          child_footage: item.child_footage,
          child_size: item.child_size,
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
      // 初始化已有数据,详情数据给的都是name所以都要处理成id初始化
      const product = res[5].data.data
      this.colorNum = product.color.length
      this.product_code = product.product_code
      this.color = product.color.map((item) => {
        return this.colorArr.find((item2) => {
          return item2.name === item.name
        }).id
      })
      this.flower = this.flowerArr.find((item) => {
        return item.name === product.flower_id
      }).id
      this.textarea = product.description
      // 成分
      this.ingredientNum = product.materials.length
      this.ingredientScale = product.materials.map((item) => {
        return item.ingredient_value
      })
      this.ingredient = product.materials.map((item) => {
        return item.ingredient_name
      })
      // 尺码
      this.footage = Object.keys(product.size)
      console.log(this.footage)
      this.footage.forEach((key) => {
        this.sizeArr.push(product.size[key].map((item) => {
          return item.size_value
        }))
      })
      this.footage.forEach((key) => {
        this.weight.push(product.size[key][0].weight)
      })
      console.log(this.weight)
      this.sizeNum = this.footage.length
      // 类型
      const categoryObj = this.treeData.find((item) => {
        return item.label === product.category_info.product_category
      })
      console.log(this.treeData)
      const typeObj = product.type_name ? categoryObj.children.find((item) => {
        return item.label === product.type_name
      }) : ''
      const styleObj = product.style_name ? typeObj.children.find((item) => {
        return item.label === product.style_name
      }) : ''
      this.types.push(categoryObj.value, typeObj.value || '', styleObj.value || '')
      // 图片
      this.fileArr = product.img.map((item, index) => {
        return {
          name: '图片' + index,
          url: item.image_url
        }
      })
      this.loading = false
    })
  },
  watch: {
    types (newVal) {
      if (newVal.length !== 0) {
        const obj = this.treeData.find((item) => item.value === newVal[0])
        this.child_footage = obj.child_footage
        this.child_size = obj.child_size
      }
    },
    ingredientScale (newVal) {
      let add = 0
      newVal.forEach((item) => {
        add += parseInt(item)
      })
      console.log(add)
      if (add !== 100) {
        this.showError = true
      } else {
        this.showError = false
      }
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
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeAvatarUpload: function (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 6
      // const isReapeat = this.fileArr.find((item) => {
      //   return item.key === file.name
      // })
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
      // if (isReapeat) {
      //   this.$message.error('不能重复上传图片')
      //   return false
      // }
    },
    handleSuccess (file) {
      // this.fileArr.push(file)
    },
    // 保存操作
    saveAll () {
      // 表单验证
      if (this.types.length === 0) {
        this.$message.error({
          message: '请选择产品品类'
        })
        return
      }
      if (!this.flower) {
        this.$message.error({
          message: '请选择产品花型'
        })
        return
      }
      if (this.ingredient.length < this.ingredientNum) {
        this.$message.error({
          message: '检测到未填写的产品成分，请选择后保存'
        })
        return
      }
      for (let i = 0; i < this.ingredient.length; i++) {
        if (!this.ingredient[i]) {
          this.$message.error({
            message: '检测到未填写的产品成分，请选择后保存'
          })
          return
        }
      }
      if (this.ingredientScale.length < this.ingredientNum) {
        this.$message.error({
          message: '检测到有未填写的产品占比，请输入后保存'
        })
        return
      }
      for (let i = 0; i < this.ingredientScale.length; i++) {
        if (!this.ingredientScale[i]) {
          this.$message.error({
            message: '检测到未填写的产品成分，请输入后保存'
          })
          return
        }
      }
      if (this.showError) {
        this.$message.error({
          message: '产品成分比例总和不等于100%，请重新输入占比'
        })
        return
      }
      if (this.footage.length < this.sizeNum) {
        this.$message.error({
          message: '检测到有未填写的产品尺码，请输入后保存'
        })
        return
      }
      for (let i = 0; i < this.footage.length; i++) {
        if (!this.footage[i]) {
          this.$message.error({
            message: '检测到未填写的产品尺码，请选择后保存'
          })
          return
        }
      }
      console.log(this.$refs.uploada.uploadFiles)
      const imgArr = this.$refs.uploada.uploadFiles.map((item) => {
        if (item.response) {
          return 'http://zhihui.tlkrzf.com/' + item.response.key
        } else {
          return item.url
        }
      })
      // const sizeArr = this.footage.map((item, index) => {
      //   return this.sizeArr[index].map((item2, index2) => {
      //     return {
      //       'size_name': this.child_size[index2].name || null,
      //       'size_value': item2 || null,
      //       'footage': this.child_footage.find((item3) => item3.id === item).name || null,
      //       'weight': this.weight[index]
      //     }
      //   })
      // }).flat() // ES6二维数组转一维用不了 polyfill支持不来
      // 获取多维sizeArr
      const sizeArrErWei = this.footage.map((item, index) => {
        return this.sizeArr[index].map((item2, index2) => {
          return {
            'size_name': this.child_size[index2].name || null,
            'size_value': item2 || null,
            'footage': this.child_footage.find((item3) => item3.id === item).name || null,
            'weight': this.weight[index]
          }
        })
      })
      let sizeArr = []
      // 数组扁平化
      sizeArrErWei.forEach((item) => {
        if (Array.isArray(item)) {
          sizeArr = sizeArr.concat(item.flat())
        } else {
          sizeArr.push(item)
        }
      })
      if (sizeArr.length < this.sizeNum * this.child_size.length) {
        this.$message.error({
          message: '检测到未填写的产品尺寸，请输入后保存'
        })
      }
      for (let i = 0; i < sizeArr.length; i++) {
        if (!(sizeArr[i].size_name && sizeArr[i].size_value)) {
          this.$message.error({
            message: '检测到未填写的产品尺寸，请输入后保存'
          })
          return
        }
      }
      if (this.color.length < this.colorNum) {
        this.$message.error({
          message: '检测到未填写的颜色，请选择后保存'
        })
      }
      const materialsArr = this.ingredientScale.map((item, index) => {
        return {
          'ingredient_value': item,
          'ingredient_name': this.ingredient[index]
        }
      })
      saveProduct({
        id: this.$route.params.id,
        product_code: this.product_code,
        company_id: window.sessionStorage.getItem('company_id'),
        category_id: this.types[0],
        type_id: this.types[1],
        style_id: this.types[2] || null,
        flower_id: this.flower,
        description: this.textarea,
        user_id: window.sessionStorage.getItem('user_id'),
        img: imgArr,
        color: this.color,
        size: sizeArr,
        materials: materialsArr
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '修改成功',
            onClose: () => {
              this.$router.push('/index/productList')
            }
          })
        }
      })
    },
    // 解决了vue数据类型检测的bug
    addSizeLine () {
      this.sizeArr.push([])
      this.sizeNum++
    },
    // 删除成分
    deleteIngredient (index) {
      if (this.ingredientNum > 1) {
        this.ingredientScale.splice(index - 1, 1)
        this.ingredient.splice(index - 1, 1)
        this.ingredientNum--
      } else {
        this.$message.error({
          message: '至少含有一种成分'
        })
      }
    },
    // 删除颜色
    deleteColor (index) {
      if (this.colorNum > 1) {
        this.color.splice(index - 1, 1)
        this.colorNum--
      } else {
        this.$message.error({
          message: '至少含有一种配色'
        })
      }
    },
    // 删除尺寸
    deleteSize (index) {
      if (this.sizeNum > 1) {
        this.footage.splice(index - 1, 1)
        this.sizeArr.splice(index - 1, 1)
        this.sizeNum--
      } else if (this.sizeNum === 1) {
        this.$message.error({
          message: '至少含有一种尺寸'
        })
      }
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
.el-input-group--append .el-select .el-input.is-focus .el-input__inner, .el-input-group--prepend .el-select .el-input.is-focus .el-input__inner{
  border:0!important;
  &:hover{
    border:0!important;
    border-color:transparent!important;
  }
  &:focus{
    border:0!important;
    border-color:transparent!important;
  }
}
.el-cascader.is-disabled .el-cascader__label span{
  color:#c0c4cc!important;
}
.el-cascader.is-disabled .el-cascader__label{
  cursor: not-allowed!important;
}
.el-input.is-disabled .el-input__inner{
  color:#c0c4cc!important;
}
</style>
