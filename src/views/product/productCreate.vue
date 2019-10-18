<template>
  <div id="sampleCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加新产品
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label">产品编号:</span>
        <div class="content blue">{{productCode}}</div>
      </div>
      <div class="inputCtn">
        <span class="label">产品名称:</span>
        <div class="content">
          <el-input v-model="sampleName"
            clearable
            placeholder="请输入产品名称"
            class="inputItem"></el-input>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">产品分类:</span>
        <div class="content">
          <el-cascader :options="treeData"
            expand-trigger="hover"
            v-model="types"
            class="inputItem"
            clearable
            placeholder="请选择产品品类">
          </el-cascader>
        </div>
        <div class="tooltips"
          style="bottom:-20px"
          v-show="warning">
          <i class="el-icon-warning"></i>
          警告：系统暂时不支持没有三级分类的产品，请联系管理员完善产品信息
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">产品花型:</span>
        <el-select clearable
          v-model="flower"
          class="inputItem content"
          placeholder="请选择花型">
          <el-option v-for="item in flowerArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="inputCtn">
        <span class="label must">产品成分:</span>
        <div v-for="(item,key) in ingredient"
          :key="key"
          class="content">
          <el-select v-model="item.ingredient_name"
            clearable
            class="smallInputItem"
            placeholder="选择成分"
            @change="noRepeat(item.ingredient_name,key,ingredient,'ingredient_name')">
            <el-option v-for="item in ingredientArr"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-input class="smallInputItem"
            placeholder="输入比例"
            :disabled="item.ingredient_name ? false : true"
            v-model="item.ingredient_value">
            <span class="unit"
              slot="append">%</span>
          </el-input>
          <div class="addBtn"
            @click="addIngredient"
            v-if="key === 0">添加</div>
          <div class="deleteBtn"
            @click="deleteIngredient(key)"
            v-else>删除</div>
        </div>
        <div class="tooltips"
          style="bottom:-20px;"
          v-show="showError">
          <i class="el-icon-warning"></i>
          产品成分比例总和不等于100%，请检查比例
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">产品规格:</span>
        <div class="content col"
          v-for="(item,key) in size"
          :key="key">
          <div class="column">
            <el-select clearable
              v-model="item.size"
              class="smallInputItem"
              @change="noRepeat(item.size,key,size,'size')"
              placeholder="选择规格">
              <el-option v-for="item in sizeArr"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-input placeholder="输入克重"
              class="smallInputItem"
              :disabled="item.size ? false : true"
              v-model="item.weight"
              :key="item.id">
              <span slot="append"
                class="unit">克</span>
            </el-input>
            <div class="addBtn"
              @click="addSize"
              v-if="key === 0">添加</div>
            <div class="deleteBtn"
              v-else
              @click="deleteSize(key)">删除</div>
          </div>
          <div class="column">
            <el-input class="inputItem"
              placeholder="输入尺寸信息"
              v-model="item.desc">
              <span slot="append"
                class="unit">cm</span>
            </el-input>
          </div>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">产品配色:</span>
        <div class="content"
          v-for="(item,key) in color"
          :key="key">
          <!-- remote
            :remote-method='remoteColor' -->
          <el-select clearable
            filterable
            allow-create
            class="inputItem"
            v-model="item.color"
            placeholder="请选择配色"
            @change="noRepeat(item.color,key,color,'color')">
            <el-option v-for="item in colorArr"
              :key="item.id"
              :label="item.name"
              :value="item.name">
              <div class="bgBlock"
                :style="{'background':item.color_code}"></div>
              <div class="desc">{{item.name}}</div>
            </el-option>
          </el-select>
          <div class="addBtn"
            @click="addColor"
            v-if="key === 0">添加</div>
          <div class="deleteBtn"
            @click="deleteColor(key)"
            v-else>删除</div>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label">产品图片:</span>
        <div class="content">
          <el-upload class="upload-demo"
            action="http://upload.qiniup.com/"
            accept="image/jpeg,image/gif,image/png,image/bmp"
            :before-upload="beforeAvatarUpload"
            :file-list="fileArr"
            :data="postData"
            ref="uploada"
            list-type="picture">
            <el-button size="small"
              type="primary">点击上传</el-button>
            <div slot="tip"
              class="el-upload__tip">只能上传jpg/png图片文件，且不超过10M</div>
          </el-upload>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label">产品描述:</span>
        <div class="content">
          <el-input class="inputItem autoHeight"
            type="textarea"
            :rows="6"
            placeholder="请输入描述内容..."
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
    <my-message :visible.sync="showMsg"
      :url="localName"
      :afterSave="afterSave"></my-message>
  </div>
</template>

<script>
import { letterArr } from '@/assets/js/dictionary.js'
import { productTppeList, flowerList, ingredientList, colorList, getToken, saveProduct, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      localName: 'productCreate',
      showMsg: false,
      msgFlag: window.localStorage.getItem('productCreate') ? JSON.parse(window.localStorage.getItem('productCreate')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      product_code: ['00', 'X', 'X', 'X', '00'],
      sampleName: '',
      treeData: [],
      types: [],
      warning: false,
      flowerArr: [],
      flower: '',
      ingredient: [{ ingredient_name: '', ingredient_value: '' }],
      ingredientArr: [],
      showError: false,
      size: [{ size: '', weight: '', desc: '' }],
      sizeArr: [{
        id: -1,
        name: '均码'
      }],
      color: [{ color: '' }],
      colorArr: [],
      // nopantongColorArr: [],
      textarea: '',
      postData: { token: '' },
      fileArr: [],
      lock: true
    }
  },
  created () {
    this.product_code[0] = new Date().getFullYear().toString().substring(2, 4)
    Promise.all([
      productTppeList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      flowerList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      ingredientList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      colorList({
        company_id: window.sessionStorage.getItem('company_id')
      }),
      getToken()
    ]).then(res => {
      this.treeData = res[0].data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          sizeArr: item.sizeArr,
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
      this.flowerArr = res[1].data.data
      this.ingredientArr = res[2].data.data
      this.colorArr = res[3].data.data
      // this.nopantongColorArr = res[3].data.data
      this.postData.token = res[4].data.data
      this.loading = false
    })
  },
  watch: {
    types (newVal) {
      this.product_code[1] = 'X'
      this.product_code[2] = 'X'
      this.product_code[3] = 'X'
      if (newVal.length !== 0) {
        const obj = this.treeData.find((item) => item.value === newVal[0])
        this.sizeArr = obj.child_size
        this.child_size = obj.sizeArr
      }
      this.treeData.forEach((item, index) => {
        if (item.value === newVal[0]) {
          this.$set(this.product_code, 1, letterArr[index])
        }
        if (item.children) {
          item.children.forEach((item2, index2) => {
            if (item2.value === newVal[1]) {
              this.$set(this.product_code, 2, letterArr[index2])
            }
            if (item2.children) {
              item2.children.forEach((item3, index3) => {
                if (item3.value === newVal[2]) {
                  this.$set(this.product_code, 3, letterArr[index3])
                }
              })
            }
          })
        }
      })
      if (!newVal[1] || !newVal[2]) {
        this.warning = true
      } else {
        this.warning = false
      }
    },
    flower (newVal) {
      this.flowerArr.forEach((item, index) => {
        if (item.id === newVal) {
          let code = index + 1
          if (code < 10) {
            code = '0' + code
          }
          this.$set(this.product_code, 4, code)
        }
      })
    },
    ingredient: {
      deep: true,
      handler (newVal) {
        let total = 0
        newVal.forEach(item => {
          total += Number(item.ingredient_value ? item.ingredient_value : 0)
        })
        if (total === 100) {
          this.showError = false
        } else {
          this.showError = true
        }
      }
    }
  },
  computed: {
    productCode () {
      return this.product_code.join('')
    }
  },
  methods: {
    afterSave (data) {
      this.msgFlag = data.msgFlag
    },
    sendMsg () {
      let data = JSON.parse(window.localStorage.getItem(this.localName))
      let formData = {
        title: data.title,
        type: data.type,
        tag: '工序',
        content: this.content,
        router_url: this.msgUrl,
        receive_user: data.receive_user
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          this.$message.success('添加成功,即将跳转至详情页')
          this.$router.push(this.msgUrl)
        }
      })
    },
    noRepeat (value, index, item, key) {
      if (value.indexOf(';') !== -1) {
        this.$message.warning('选项中不可含有 " ; "或者" / " ,请重新选择')
        item[index].color = ''
        return
      }
      if (value.indexOf('/') !== -1) {
        this.$message.warning('选项中不可含有 " ; "或者" / " ,请重新选择')
        item[index].color = ''
        return
      }
      let flag = item.filter(val => val[key] === value)
      if (flag.length > 1) {
        item[index][key] = ''
        this.$message.warning('检测到已选择过该项(' + value + ')，请勿重复选择')
      }
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
    deleteIngredient (index) {
      this.ingredient.splice(index, 1)
    },
    addIngredient () {
      this.ingredient.push({ ingredient_name: '', ingredient_value: '' })
    },
    addSize () {
      this.size.push({ size: '', weight: '', desc: '' })
    },
    deleteSize (index) {
      this.size.splice(index, 1)
    },
    addColor () {
      this.color.push({ color: '' })
    },
    deleteColor (index) {
      this.color.splice(index, 1)
    },
    clearAll () {

    },
    saveAll () {
      let flag = true
      if (this.types.length <= 0) {
        this.$message.error('请选择产品分类')
        flag = false
        return
      }
      if (!this.flower) {
        this.$message.error('请选择产品花型')
        flag = false
        return
      }
      this.size.forEach(item => {
        if (!item.size) {
          this.$message.error('请将产品规格填写完整')
          flag = false
        }
        if (!item.weight) {
          this.$message.error('请填写产品克重信息')
          flag = false
        }
      })
      this.ingredient.forEach(item => {
        if (!item.ingredient_name) {
          this.$message.error('请将产品成分填写完整')
          flag = false
        }
        if (!item.ingredient_value) {
          this.$message.error('请将产品成分填写完整')
          flag = false
        }
      })
      let arr = this.ingredient.map(item => {
        return item.ingredient_value
      })
      let total = arr.reduce((total, item) => {
        return Number(total) + Number(item)
      })
      if (Number(total) !== 100) {
        this.$message.error('产品成分比例总和不等于100%，请检查比例')
        flag = false
      }
      if (this.color.filter(item => item.color).map(item => { return item.color }).length === 0) {
        this.$message.error('请将产品配色填写完整')
        flag = false
        return
      }
      const imgArr = this.$refs.uploada.uploadFiles.map((item) => { return 'http://zhihui.tlkrzf.com/' + item.response.key })
      let data = {
        product_code: this.product_code.join(''),
        company_id: window.sessionStorage.getItem('company_id'),
        category_id: this.types[0],
        type_id: this.types[1],
        style_id: this.types[2],
        type: 1,
        flower_id: this.flower,
        description: this.textarea,
        user_id: window.sessionStorage.getItem('user_id'),
        img: imgArr,
        color: this.color.filter(item => item.color).map(item => {
          return item.color
        }),
        // sample_size: JSON.stringify(this.size),
        sample_title: this.sampleName,
        materials: this.ingredient,
        size: this.size.filter(item => item.size).map(item => {
          return {
            weight: item.weight,
            measurement: item.size,
            size_info: item.desc
          }
        })
      }
      if (flag) {
        if (this.lock) {
          this.lock = false
          saveProduct(data).then(res => {
            if (res.data.status) {
              this.lock = true
              if (this.msgFlag) {
                this.msgUrl = '/index/productDetail/' + res.data.data.id
                this.content = '<span style="color:#1A95FF">添加</span>了一个新产品<span style="color:#1A95FF">' + res.data.data.product_code + '</span>(' + res.data.data.category_info.product_category + '/' + res.data.data.type_name + '/' + res.data.data.style_name + '/' + res.data.data.flower_id + ')'
                this.sendMsg()
              } else {
                this.$message.success('添加成功,即将跳转至详情页')
                this.$router.push('/index/productDetail/' + res.data.data.id)
              }
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
          })
        } else {
          this.$message.warning('请勿频繁点击')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/sampleCreate.less";
</style>
<style lang="less">
#sampleCreate {
  .el-input {
    width: 100%;
    height: 100%;
  }
  .el-input-group__append {
    padding: 0;
    .unit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 100%;
    }
  }
}
// .el-cascader-menu {
//   font-size: 14px;
//   color: #666;
//   font-family: "systemfont";
//   font-weight: 300;
// }
// .el-input-group--append .el-select .el-input.is-focus .el-input__inner,
// .el-input-group--prepend .el-select .el-input.is-focus .el-input__inner {
//   border: 0 !important;
//   &:hover {
//     border: 0 !important;
//     border-color: transparent !important;
//   }
//   &:focus {
//     border: 0 !important;
//     border-color: transparent !important;
//   }
// }
</style>
