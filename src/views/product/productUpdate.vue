<template>
  <div id="sampleCreate"
    v-loading="loading">
    <div class="head">
      <h2>修改{{type === '1' ? '产' : '样'}}品
        <i class="el-icon-message-solid"
          :class="{'active':msgFlag}"
          @click="showMsg = true"></i>
      </h2>
    </div>
    <div class="body">
      <div class="inputCtn">
        <span class="label">{{type === '1' ? '产' : '样'}}品编号:</span>
        <div class="content blue">{{product_code}}</div>
      </div>
      <div class="inputCtn">
        <span class="label">{{type === '1' ? '产' : '样'}}品名称:</span>
        <div class="content">
          <el-input v-model="sampleName"
            clearable
            :placeholder="'请输入' + (type === '1' ? '产' : '样') + '品名称'"
            class="inputItem"></el-input>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">{{type === '1' ? '产' : '样'}}品分类:</span>
        <div class="content">
          <el-cascader :options="treeData"
            expand-trigger="hover"
            v-model="types"
            disabled
            class="inputItem"
            clearable
            :placeholder="'请选择' + (type === '1' ? '产' : '样') + '品品类'">
          </el-cascader>
        </div>
        <div class="tooltips"
          style="bottom:-20px"
          v-show="warning">
          <i class="el-icon-warning"></i>
          警告：系统暂时不支持没有三级分类的{{type === '1' ? '产' : '样'}}品，请联系管理员完善{{type === '1' ? '产' : '样'}}品信息
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">{{type === '1' ? '产' : '样'}}品花型:</span>
        <el-select clearable
          v-model="flower"
          disabled
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
        <span :class="{'label':true,'must':type === '1'}">{{type === '1' ? '产' : '样'}}品成分:</span>
        <div v-for="(item,key) in ingredient"
          :key="key"
          class="content">
          <el-select v-model="item.ingredient_name"
            clearable
            @change="noRepeat(item.ingredient_name,key,ingredient,'ingredient_name')"
            class="smallInputItem"
            placeholder="选择成分">
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
          {{type === '1' ? '产' : '样'}}品成分比例总和不等于100%，请检查比例
        </div>
      </div>
      <div class="inputCtn">
        <span class="label must">{{type === '1' ? '产' : '样'}}品规格:</span>
        <div class="content col"
          v-for="(item,key) in size"
          :key="key">
          <div class="column">
            <el-select clearable
              v-model="item.size"
              :disabled="item.disabled && (has_craft !== 0 || has_plan !== 0 || in_order !== 0)"
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
              @click="item.disabled ? showMessage() :deleteSize(key)">删除</div>
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
        <span class="label must">{{type === '1' ? '产' : '样'}}品配色:</span>
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
            :disabled="item.disabled && (has_craft !== 0 || has_plan !== 0 || in_order !== 0)"
            @change="noRepeat(item.color,key,color,'color')"
            placeholder="请选择配色">
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
            @click="item.disabled ? showMessage() : deleteColor(key)"
            v-else>删除</div>
        </div>
      </div>
      <div class="inputCtn">
        <span class="label">{{type === '1' ? '产' : '样'}}品图片:</span>
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
        <span class="label">{{type === '1' ? '产' : '样'}}品描述:</span>
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
          @click="saveAll">修改</div>
      </div>
      <my-message :visible.sync="showMsg"
        :url="localName"
        :afterSave="afterSave"></my-message>
    </div>
  </div>
</template>

<script>
import { productTppeList, flowerList, ingredientList, colorList, getToken, saveProduct, porductOne, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      showMsg: false,
      localName: 'productUpdate',
      msgFlag: window.localStorage.getItem('productUpdate') ? JSON.parse(window.localStorage.getItem('productUpdate')).msgFlag : false,
      msgUrl: '',
      content: '',
      loading: true,
      product_code: '',
      sampleName: '',
      treeData: [],
      types: [],
      warning: false,
      flowerArr: [],
      flower: '',
      ingredient: [{ ingredient_name: '', ingredient_value: 100 }],
      ingredientArr: [],
      showError: false,
      size: [{ size: '', weight: '', desc: '' }],
      sizeArr: [{
        id: -1,
        name: '均码'
      }],
      color: [{ color: '' }],
      colorArr: [],
      textarea: '',
      postData: { token: '' },
      fileArr: [],
      lock: true,
      type: '',
      has_craft: '',
      has_plan: '',
      in_order: ''
    }
  },
  created () {
    this.type = window.location.search.split('?')[1].split('&')[0].split('=')[1]
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
      getToken(),
      porductOne({
        id: this.$route.params.id
      })
    ]).then(res => {
      this.has_craft = res[5].data.data.has_craft
      this.has_plan = res[5].data.data.has_plan
      this.in_order = res[5].data.data.in_order
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
      this.postData.token = res[4].data.data
      let productInfo = res[5].data.data
      // 加载数据
      this.sampleName = productInfo.sample_title
      this.product_code = productInfo.product_code
      this.fileArr = productInfo.img.map(item => {
        return {
          url: item.image_url
        }
      })
      this.flower = this.flowerArr.find(item => item.name === productInfo.flower_id).id
      this.ingredient = productInfo.materials.map(item => {
        return {
          ingredient_name: item.ingredient_name,
          ingredient_value: item.ingredient_value
        }
      })
      if (this.ingredient.length === 0) {
        this.ingredient.push({
          ingredient_name: '',
          ingredient_value: ''
        })
      }
      this.size = productInfo.size.map(item => {
        return {
          size: item.measurement,
          desc: item.size_info,
          weight: item.weight,
          disabled: true
        }
      })
      this.color = productInfo.color.map(item => {
        return {
          color: item.color_name,
          disabled: true
        }
      })
      this.types[0] = this.treeData.find(item =>
        item.label === productInfo.category_info.product_category
      ).value
      this.sizeArr = this.treeData.find(item => item.value === this.types[0]).child_size
      this.types[1] = this.treeData.find(item =>
        item.label === productInfo.category_info.product_category
      ).children.find(item => item.label === productInfo.type_name).value

      this.types[2] = this.treeData.find(item =>
        item.label === productInfo.category_info.product_category
      ).children.find(item => item.label === productInfo.type_name).children.find(item => item.label === productInfo.style_name).value
      this.description = productInfo.description
      this.loading = false
    })
  },
  watch: {
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
        this.lock = true
        if (res.data.status) {
          this.$message.success('修改成功')
          this.$router.push(this.msgUrl)
        }
      })
    },
    showMessage () {
      if (this.has_plan === 1) {
        this.$message.error('已有配料单,不可删除原有项')
      } else if (this.has_craft === 1) {
        this.$message.error('已有工艺单,不可删除原有项')
      } else if (this.in_order === 1) {
        this.$message.error('已有相关订单,不可删除原有项')
      }
    },
    noRepeat (value, index, item, key) {
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
    saveAll () {
      let flag = true
      if (this.types.length <= 0) {
        this.$message.error('请选择' + (this.type === '1' ? '产' : '样') + '品分类')
        flag = false
      }
      if (!this.flower) {
        this.$message.error('请选择' + (this.type === '1' ? '产' : '样') + '品花型')
        flag = false
      }
      if (this.type === '2') {
        let total = 0
        this.ingredient.filter(item => (item.ingredient_name && item.ingredient_value !== '' && item.ingredient_value !== '0')).forEach(item => {
          total += Number(item.ingredient_value)
        })
        if (this.ingredient.filter(item => (item.ingredient_name && item.ingredient_value !== '' && item.ingredient_value !== '0')).length !== 0 && total !== 100) {
          this.$message.error('样品成分比例总和不等于100%，请检查比例')
          flag = false
          return
        }
      } else if (this.type === '1') {
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
      }
      this.size.forEach(item => {
        if (!item.size) {
          this.$message.error('请将' + (this.type === '1' ? '产' : '样') + '品规格填写完整')
          flag = false
        }
        if (this.type === '1' && !item.weight) {
          this.$message.error('请填写产品克重')
          flag = false
        }
      })
      if (this.type === '1' && this.color.filter(item => item.color).length === 0) {
        this.$message.error('请选择配色方案')
        flag = false
        return
      }
      const imgArr = this.$refs.uploada.uploadFiles.map((item) => { return (item.response ? 'http://zhihui.tlkrzf.com/' + item.response.key : item.url) })
      let data = {
        id: this.$route.params.id,
        product_code: this.product_code,
        company_id: window.sessionStorage.getItem('company_id'),
        category_id: this.types[0],
        type_id: this.types[1],
        style_id: this.types[2],
        type: Number(this.type),
        flower_id: this.flower,
        description: this.textarea,
        user_id: window.sessionStorage.getItem('user_id'),
        img: imgArr,
        color: this.color.filter(item => item.color).map(item => {
          return item.color
        }),
        sample_title: this.sampleName,
        materials: this.ingredient,
        size: this.size.map(item => {
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
              if (this.msgFlag) {
                if (this.type === '1') {
                  this.msgUrl = '/index/productDetail/' + res.data.data.id
                } else if (this.type === '2') {
                  this.msgUrl = '/index/sampleDetail/' + res.data.data.id
                }
                this.content = '<span style="color:#E6A23C">修改</span>了一个' + (this.type === '1' ? '产' : '样') + '品<span style="color:#1A95FF">' + res.data.data.product_code + '</span>(' + res.data.data.category_info.product_category + '/' + res.data.data.type_name + '/' + res.data.data.style_name + '/' + res.data.data.flower_id + ')'
                this.sendMsg()
              } else {
                this.lock = true
                this.$message.success('修改成功')
                if (this.type === '1') {
                  this.$router.push('/index/productDetail/' + res.data.data.id)
                } else if (this.type === '2') {
                  this.$router.push('/index/sampleDetail/' + res.data.data.id)
                }
              }
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
