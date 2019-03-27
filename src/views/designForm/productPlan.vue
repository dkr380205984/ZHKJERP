<template>
  <div id="productPlan">
     <div class="head">
      <h2>产品计划单</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">产品基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">工艺单编号:</span>
            <span class="content important">KR-0001</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品编号:</span>
            <span class="content">KWZ1233444</span>
          </div>
           <div class="inputCtn">
            <span class="label">产品名称:</span>
            <span class="content">{{product|filterType}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品成分:</span>
            <span class="content">{{product.materials|filterMaterials}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品花型:</span>
            <span class="content">{{product.flower_id}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品配色:</span>
            <span class="content">{{product.color|filterColor}}</span>
          </div>
        </div>
         <div class="lineCtn">
          <div class="inputCtn" style="align-items:flex-start">
            <span class="label">创建日期:</span>
            <span class="content">{{product.create_time}}</span>
          </div>
          <div class="inputCtn" style="align-items:flex-start">
            <span class="label">创建人:</span>
            <span class="content">{{product.user_id}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品规格:</span>
            <span class="content contentLine" v-for="(item,key) in product.size" :key="key">
              <span style="margin-right:15px">{{key}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce" v-for="itemChild in item" :key="itemChild.id">{{itemChild.size_value + 'cm' + '(' + itemChild.size_name + ')'}}&nbsp;&nbsp;&nbsp;</span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料辅料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">主要原料:</span>
            <div class="addBtn" @click="addMainMaterial">
              <span>添加主要原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <!-- 多层嵌套四个index分别为
          index1:Ingredient 原料
          index2:colour 配色方案
          index3:color 纱线颜色
          index4:size 尺码
         -->
        <div class="lineCtn">
          <div class="inputCtn oneLine rowLine">
            <span class="label">原料列表:</span>
            <div class="specialCtn" v-for="(item,index) in mainIngredient.ingredient.length" :key="index">
              <div class="blockCtn">
                <el-cascader
                  v-model="mainIngredient.ingredient[index]"
                  style="width:200px"
                  :options="ingredientArr"
                  placeholder="请选择主要原料"
                  expand-trigger="hover">
                </el-cascader>
                <div class="addBtn" style="background:#fff;" @click="addColour(index)">
                  <span>添加配色方案</span>
                  <span>+</span>
                </div>
              </div>
              <div class="blockCtn" v-for="(item2,index2) in mainIngredient.colour[index].length" :key="index2">
                <el-select v-model="mainIngredient.colour[index][index2]" placeholder="请选择配色方案">
                  <el-option
                    v-for="item in colourArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    <div class="bgBlock" :style="{'background':item.color_code}"></div>
                    <div class="desc">{{item.name}}</div>
                  </el-option>
                </el-select>
                <div class="deleteCtn" @click="deleteColour(index,index2)"><i class="el-icon-delete"></i></div>
                <div class="colorsCtn">
                  <div class="colorOnce" v-for="(item3,index3) in mainIngredient.color[index][index2].length" :key="index3">
                    <color-picker :content="mainIngredient.color[index][index2][index3].name.substr(0,1)" :colorArr="colorArr" v-model="mainIngredient.color[index][index2][index3].colorCode" @colorChange="(json)=>{getColor(json,index,index2,index3)}"></color-picker>
                    <div class="allInputs" v-for="(item4,index4) in mainIngredient.color[index][index2][index3].value.length" :key="index4">
                      <span class="labeled">{{mainIngredient.color[index][index2][index3].value[index4].size}}</span>
                      <input class="input1" placeholder="数字" v-model="mainIngredient.color[index][index2][index3].value[index4].number"/>
                      <input class="input2" @blur="commonUnit=mainIngredient.color[index][index2][index3].value[index4].unit" placeholder="单位" v-model="mainIngredient.color[index][index2][index3].value[index4].unit"/>
                    </div>
                    <i class="el-icon-delete delete" @click="deleteColor(index,index2,index3)"></i>
                  </div>
                  <div class="addBtn" style="background:#fff;margin-left:0;margin-bottom:15px;" @click="addColor(index,index2)">
                    <span>添加颜色</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div class="deleteIcon" @click="deleteMainMaterial(index)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">主要辅料:</span>
            <div class="addBtn" @click="addOtherMaterial">
              <span>添加主要辅料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn" v-show="otherIngredient.ingredient.length>0">
          <div class="inputCtn oneLine rowLine">
            <span class="label">辅料列表:</span>
            <div class="specialCtn" v-for="(item,index) in otherIngredient.ingredient.length" :key="index">
              <div class="blockCtn">
                <el-select style="width:200px" v-model="otherIngredient.ingredient[index]" placeholder="请选择主要辅料">
                  <el-option
                    v-for="item in materialArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <div class="addBtn" style="background:#fff;" @click="addOtherColour(index)">
                  <span>添加配色方案</span>
                  <span>+</span>
                </div>
              </div>
              <div class="blockCtn" v-for="(item2,index2) in otherIngredient.colour[index].length" :key="index2">
                <el-select v-model="otherIngredient.colour[index][index2]" placeholder="请选择配色方案">
                  <el-option
                    v-for="item in colourArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    <div class="bgBlock" :style="{'background':item.color_code}"></div>
                    <div class="desc">{{item.name}}</div>
                  </el-option>
                </el-select>
                <div class="deleteCtn" @click="deleteOtherColour(index,index2)"><i class="el-icon-delete"></i></div>
                <div class="colorsCtn">
                  <div class="colorOnce" style="padding-left:0" v-for="(item3,index3) in otherIngredient.color[index][index2].length" :key="index3">
                    <el-input placeholder="请输入颜色" v-model="otherIngredient.color[index][index2][index3].name" style="width:150px"/>
                    <div class="allInputs" v-for="(item4,index4) in otherIngredient.color[index][index2][index3].value.length" :key="index4">
                      <span class="labeled">{{otherIngredient.color[index][index2][index3].value[index4].size}}</span>
                      <input class="input1" placeholder="数字" v-model="otherIngredient.color[index][index2][index3].value[index4].number"/>
                      <input class="input2" @blur="commonUnit=otherIngredient.color[index][index2][index3].value[index4].unit" placeholder="单位" v-model="otherIngredient.color[index][index2][index3].value[index4].unit"/>
                    </div>
                    <i class="el-icon-delete delete" @click="deleteOtherColor(index,index2,index3)"></i>
                  </div>
                  <div class="addBtn" style="background:#fff;margin-left:0;margin-bottom:15px;" @click="addOtherColor(index,index2)">
                    <span>添加颜色</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div class="deleteIcon" @click="deleteOtherMaterial(index)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">净重:</span>
            <el-input class="elInput" placeholder="请输入产品净重" v-model="weight">
              <template slot="append">克</template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">外道加工信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">外道加工流程:</span>
            <el-select v-for="(item,index) in process.length" class="elSelect" style="margin-bottom:24px" v-model="process[index]" placeholder="请选择工序" :key="index">
              <el-option
                v-for="item in processArr"
                :key="item.name"
                :label="item.name"
                :value="item.name">
                <div class="bgBlock" :style="{'background':item.color_code}"></div>
                <div class="desc">{{item.name}}</div>
              </el-option>
            </el-select>
            <div @click="addProcess" class="addBtn" style="display:block;width:40px;text-align:center;padding:0;margin-bottom:24px">
              <i class="el-icon-plus"></i>
            </div>
            <div @click="deleteProcess" class="addBtn" style="width:40px;text-align:center;padding:0;margin-bottom:24px">
              <i class="el-icon-minus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="clearAll">清空</div>
        <div class="okBtn" @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, YarnList, editList, materialList, saveProductPlan } from '@/assets/js/api.js'
export default {
  data () {
    return {
      companyId: window.sessionStorage.getItem('company_id'),
      commonUnit: 'cm',
      product: {
        category_name: '',
        create_time: '',
        flower_id: '',
        style_name: '',
        type_name: '',
        user_id: '',
        materials: [],
        color: [],
        size: []
      },
      ingredientArr: [], // 原料
      mainIngredient: {
        ingredient: [[]],
        colour: [['']],
        color: [[[{
          colorCode: '',
          name: '无',
          value: [{
            size: '',
            number: '',
            unit: ''
          }]
        }]]]
      },
      otherIngredient: {
        ingredient: [],
        colour: [],
        color: []
      },
      colourArr: [],
      colorArr: [],
      process: [''],
      processArr: [],
      materialArr: [],
      weight: ''
    }
  },
  created () {
    // 初始化接口
    Promise.all([porductOne({
      id: this.$route.params.id
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    }), materialList({
      company_id: this.companyId
    })]).then((res) => {
      console.log(res)
      this.product = res[0].data.data
      this.sizeKey = Object.keys(res[0].data.data.size)[0]
      this.colourArr = res[0].data.data.color
      this.colorArr = res[1].data.data.color
      this.processArr = res[2].data.data.process
      this.ingredientArr = res[1].data.data.count.map((item) => {
        const unit = ['支', '厘米']
        return {
          value: item.name + unit[item.unit],
          label: item.name + unit[item.unit],
          children: res[1].data.data.type.map((item2) => {
            return {
              value: item2.name,
              label: item2.name
            }
          })
        }
      })
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.mainIngredient.color[0][0][0].value = value
      this.materialArr = res[3].data.data
    })
  },
  methods: {
    // 添加主要原料
    addMainMaterial () {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.mainIngredient.ingredient.push([])
      this.mainIngredient.colour.push([''])
      this.mainIngredient.color.push([[{
        colorCode: '',
        name: '无',
        value: value
      }]])
    },
    addOtherMaterial () {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.otherIngredient.ingredient.push('')
      this.otherIngredient.colour.push([''])
      this.otherIngredient.color.push([[{
        colorCode: '',
        name: '',
        value: value
      }]])
    },
    // 删除主要原料
    deleteMainMaterial (index) {
      if (this.mainIngredient.ingredient.length > 1) {
        this.$confirm('是否删除该原料', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.mainIngredient.ingredient.splice(index, 1)
          this.mainIngredient.colour.splice(index, 1)
          this.mainIngredient.color.splice(index, 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message.error({
          message: '主要原料不得少于一种'
        })
      }
    },
    deleteOtherMaterial (index) {
      this.$confirm('是否删除该辅料', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.otherIngredient.ingredient.splice(index, 1)
        this.otherIngredient.colour.splice(index, 1)
        this.otherIngredient.color.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加配色方案
    addColour (index) {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.mainIngredient.colour[index].push('')
      this.mainIngredient.color[index].push([{
        colorCode: '',
        name: '无',
        value: value
      }])
    },
    addOtherColour (index) {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.otherIngredient.colour[index].push('')
      this.otherIngredient.color[index].push([{
        colorCode: '',
        name: '',
        value: value
      }])
    },
    // 删除配色方案
    deleteColour (index, index2) {
      if (this.mainIngredient.colour[index].length > 1) {
        this.mainIngredient.colour[index].splice(index2, 1)
        this.mainIngredient.color[index].splice(index2, 1)
      } else {
        this.$message.error({
          message: '配色方案不得少于一种'
        })
      }
    },
    deleteOtherColour (index, index2) {
      if (this.otherIngredient.colour[index].length > 1) {
        this.otherIngredient.colour[index].splice(index2, 1)
        this.otherIngredient.color[index].splice(index2, 1)
      } else {
        this.$message.error({
          message: '配色方案不得少于一种'
        })
      }
    },
    // 添加颜色
    addColor (index, index2) {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.mainIngredient.color[index][index2].push({
        colorCode: '',
        name: '无',
        value: value
      })
    },
    addOtherColor (index, index2) {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit
        })
      })
      this.otherIngredient.color[index][index2].push({
        colorCode: '',
        name: '',
        value: value
      })
    },
    // 删除颜色
    deleteColor (index, index2, index3) {
      if (this.mainIngredient.color[index][index2].length > 1) {
        this.mainIngredient.color[index][index2].splice(index3, 1)
      } else {
        this.$message.error({
          message: '颜色不得少于一种'
        })
      }
    },
    deleteOtherColor (index, index2, index3) {
      if (this.otherIngredient.color[index][index2].length > 1) {
        this.otherIngredient.color[index][index2].splice(index3, 1)
      } else {
        this.$message.error({
          message: '颜色不得少于一种'
        })
      }
    },
    // 颜色选择器选择颜色
    getColor (json, index, index2, index3) {
      this.mainIngredient.color[index][index2][index3].name = json.name
    },
    getOtherColor (json, index, index2, index3) {
      this.otherIngredient.color[index][index2][index3].name = json.name
    },
    // 添加工序
    addProcess () {
      this.process.push('')
    },
    // 删除工序
    deleteProcess () {
      this.process.pop()
    },
    // 添加
    saveAll () {
      console.log(this.mainIngredient)
      console.log(this.otherIngredient)
      console.log(this.process)
      saveProductPlan({
        'id': '',
        'company_id': this.companyId,
        'product_id': this.product.id,
        'user_id': window.sessionStorage.getItem('user_id'),
        'material_data': {
          'mainIngredient': this.mainIngredient,
          'otherIngredient': this.otherIngredient
        },
        'outside_process': this.process
        // 'weight': this.weight
      }).then((res) => {
        console.log(res)
      })
    },
    // 清空
    clearAll () {

    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_name
      } else if (!item.style_name) {
        return item.category_name + '/' + item.type_name
      } else {
        return item.category_name + '/' + item.type_name + '/' + item.style_name
      }
    },
    // 成分合并
    filterMaterials (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.ingredient_name + item.ingredient_value + '%' + ' / '
      })
      return str.substring(0, str.length - 2)
    },
    // 颜色合并
    filterColor (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.name + '/'
      })
      return str.substring(0, str.length - 1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/productPlan.less';
</style>
