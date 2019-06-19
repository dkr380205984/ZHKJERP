<template>
  <div id="productPlan"
    v-loading="loading">
    <div class="head">
      <h2>配料单修改</h2>
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
            <span class="label">产品编号:</span>
            <span class="content important">{{product.product_code}}</span>
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
          <div class="inputCtn"
            style="align-items:flex-start">
            <span class="label">创建日期:</span>
            <span class="content">{{product.create_time}}</span>
          </div>
          <div class="inputCtn"
            style="align-items:flex-start">
            <span class="label">创建人:</span>
            <span class="content">{{product.user_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn"
            style="width:100%">
            <span class="label">产品规格:</span>
            <span class="content"
              style="width:100%;"
              v-for="(item,key) in product.size"
              :key="key">
              <span style="margin-right:15px">{{key}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce"
                  v-for="itemChild in item"
                  :key="itemChild.id">{{itemChild.size_value + 'cm' + '(' + itemChild.size_name + ')'}}&nbsp;&nbsp;&nbsp;</span>
              </span>
              <span class="size">{{item[0].weight}}g(克重)</span>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="addBtn"
              @click="addMainMaterial">
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
            <span class="label must">原料列表:</span>
            <div class="specialCtn"
              v-for="(item,index) in mainIngredient.ingredient.length"
              :key="index">
              <div class="blockCtn">
                <el-select filterable
                  class="elSelect"
                  v-model="mainIngredient.ingredient[index]"
                  style="margin-left:0;width:200px"
                  placeholder="请选择主要原料">
                  <el-option v-for="item in ingredientArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <div class="addBtn"
                  style="background:#fff;"
                  @click="addColour(index)">
                  <span>添加配色方案</span>
                  <span>+</span>
                </div>
              </div>
              <div class="blockCtn"
                v-for="(item2,index2) in mainIngredient.colour[index].length"
                :key="index2">
                <el-select v-model="mainIngredient.colour[index][index2]"
                  placeholder="请选择配色方案">
                  <el-option v-for="item in colourArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    <div class="bgBlock"
                      :style="{'background':item.color_code}"></div>
                    <div class="desc">{{item.name}}</div>
                  </el-option>
                </el-select>
                <div class="deleteCtn"
                  @click="deleteColour(index,index2)"><i class="el-icon-delete"></i></div>
                <div class="colorsCtn">
                  <div class="colorOnce"
                    v-for="(item3,index3) in mainIngredient.color[index][index2].length"
                    :key="index3">
                    <color-picker :key="mainIngredient.color[index][index2][index3].colorCode.color"
                      :content="mainIngredient.color[index][index2][index3].name.substr(0,1)"
                      :colorArr="colorArr"
                      v-model="mainIngredient.color[index][index2][index3].colorCode"
                      @colorChange="(json)=>{getColor(json,index,index2,index3)}"></color-picker>
                    <div class="allInputs"
                      v-for="(item4,index4) in mainIngredient.color[index][index2][index3].value.length"
                      :key="index4">
                      <span class="labeled">{{mainIngredient.color[index][index2][index3].value[index4].size}}</span>
                      <input class="input1"
                        placeholder="数量"
                        v-model="mainIngredient.color[index][index2][index3].value[index4].number" />
                      <input class="input2"
                        @blur="commonUnit1=mainIngredient.color[index][index2][index3].value[index4].unit"
                        placeholder="单位"
                        v-model="mainIngredient.color[index][index2][index3].value[index4].unit" />
                    </div>
                    <i class="el-icon-delete delete"
                      @click="deleteColor(index,index2,index3)"></i>
                  </div>
                  <div class="addBtn"
                    style="background:#fff;margin-left:0;margin-bottom:15px;"
                    @click="addColor(index,index2)">
                    <span>添加颜色</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div class="deleteIcon"
                @click="deleteMainMaterial(index)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">净重:</span>
            <el-input :disabled="!state"
              class="elInput"
              placeholder="原料净重"
              v-model="weight[index]"
              v-for="(item,index) in sizeKey"
              :key="index">
              <template slot="prepend">{{item}}</template>
              <template slot="append">克</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">纱线系数:</span>
            <el-input :disabled="!state"
              style="width:300px"
              class="elInput"
              placeholder="纱线系数"
              v-model="xishu[index]"
              v-for="(item,index) in ingredientCmp"
              :key="index">
              <template slot="prepend">{{item}}</template>
              <template slot="append">克/厘米</template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">辅料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">主要辅料:</span>
            <div class="addBtn"
              @click="addOtherMaterial">
              <span>添加辅料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          v-show="otherIngredient.ingredient.length>0">
          <div class="inputCtn oneLine rowLine">
            <span class="label">辅料列表:</span>
            <div class="specialCtn"
              v-for="(item,index) in otherIngredient.ingredient.length"
              :key="index">
              <div class="blockCtn">
                <el-select :disabled="index<otherIngredient.old"
                  style="width:200px"
                  v-model="otherIngredient.ingredient[index]"
                  placeholder="请选择主要辅料">
                  <el-option v-for="item in materialArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <div class="addBtn"
                  style="background:#fff;"
                  @click="addOtherColour(index)">
                  <span>添加配色方案</span>
                  <span>+</span>
                </div>
              </div>
              <div class="blockCtn"
                v-for="(item2,index2) in otherIngredient.colour[index].length"
                :key="index2">
                <el-select v-model="otherIngredient.colour[index][index2]"
                  placeholder="请选择配色方案">
                  <el-option v-for="item in colourArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    <div class="bgBlock"
                      :style="{'background':item.color_code}"></div>
                    <div class="desc">{{item.name}}</div>
                  </el-option>
                </el-select>
                <div class="deleteCtn"
                  @click="deleteOtherColour(index,index2)"><i class="el-icon-delete"></i></div>
                <div class="colorsCtn">
                  <div class="colorOnce"
                    style="padding-left:0"
                    v-for="(item3,index3) in otherIngredient.color[index][index2].length"
                    :key="index3">
                    <el-input placeholder="请输入颜色"
                      v-model="otherIngredient.color[index][index2][index3].name"
                      style="width:150px" />
                    <div class="allInputs"
                      v-for="(item4,index4) in otherIngredient.color[index][index2][index3].value.length"
                      :key="index4">
                      <span class="labeled">{{otherIngredient.color[index][index2][index3].value[index4].size}}</span>
                      <input class="input1"
                        placeholder="数量"
                        v-model="otherIngredient.color[index][index2][index3].value[index4].number" />
                      <input class="input2"
                        @blur="commonUnit2=otherIngredient.color[index][index2][index3].value[index4].unit"
                        placeholder="单位"
                        v-model="otherIngredient.color[index][index2][index3].value[index4].unit" />
                    </div>
                    <i class="el-icon-delete delete"
                      @click="deleteOtherColor(index,index2,index3)"></i>
                  </div>
                  <div class="addBtn"
                    style="background:#fff;margin-left:0;margin-bottom:15px;"
                    @click="addOtherColor(index,index2)">
                    <span>添加颜色</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div v-show="index>=otherIngredient.old"
                class="deleteIcon"
                @click="deleteOtherMaterial(index)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">生产流程</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">生产流程:</span>
            <el-select v-for="(item,index) in process.length"
              class="elSelect"
              style="margin-bottom:24px"
              v-model="process[index]"
              placeholder="请选择工序"
              :key="index">
              <el-option v-for="item in processArr"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <div @click="addProcess"
              class="addBtn"
              style="display:block;width:40px;text-align:center;padding:0;margin-bottom:24px">
              <i class="el-icon-plus"></i>
            </div>
            <div @click="deleteProcess"
              class="addBtn"
              style="width:40px;text-align:center;padding:0;margin-bottom:24px">
              <i class="el-icon-minus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, YarnList, editList, materialList, saveProductPlan, craftProduct, productPlanDetail, YarnColorList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      lock: false,
      loading: true,
      sizeKey: [],
      companyId: window.sessionStorage.getItem('company_id'),
      commonUnit1: '克',
      commonUnit2: '个',
      product: {
        category_info: {
          product_category: ''
        },
        create_time: '',
        flower_id: '',
        style_name: '',
        type_name: '',
        user_name: '',
        materials: [],
        color: [],
        size: []
      },
      ingredientArr: [], // 原料
      mainIngredient: {
        ingredient: [[]],
        colour: [['']],
        color: [[[{
          colorCode: { name: '', color: '' },
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
        color: [],
        old: 0
      },
      colourArr: [],
      colorArr: [],
      process: [''],
      processArr: [],
      materialArr: [],
      weight: [],
      xishu: [],
      state: true // 用于标记是否为工艺单
    }
  },
  mounted () {
    // 初始化接口
    Promise.all([porductOne({
      id: this.$route.params.productId
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    }), materialList({
      company_id: this.companyId
    }), craftProduct({
      product_id: this.$route.params.productId
    }), productPlanDetail({
      product_key: this.$route.params.productId
    }), YarnColorList({
      company_id: this.companyId
    })]).then((res) => {
      console.log(res)
      this.product = res[0].data.data
      this.sizeKey = Object.keys(res[0].data.data.size)
      this.colourArr = res[0].data.data.color
      this.colorArr = res[6].data.data
      this.processArr = res[2].data.data.process
      this.ingredientArr = res[1].data.data
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit1
        })
      })
      this.mainIngredient.color[0][0][0].value = value
      this.materialArr = res[3].data.data
      // 对有工艺单的情况进行正义的数据改造
      if (res[4].data.code === 200) {
        this.state = false
        const gyd = res[4].data.data
        let ingredient = gyd.yarn_coefficient.map((item) => {
          return item.name
        })
        let colour = []
        // 通过原料的长度初始化配色方案二维数组
        ingredient.forEach((item) => { colour.push([]) })
        for (let keyColour in gyd.peise_yarn_wight) {
          for (let keyMaterial in gyd.peise_yarn_wight[keyColour]) {
            ingredient.forEach((item, index) => {
              if (item === keyMaterial) {
                colour[index].push(keyColour)
              }
            })
          }
        }
        let color = []
        // 通过原料长度 和 配色方案长度初始化颜色三维数组
        ingredient.forEach((item, index) => {
          color.push([])
          colour[index].forEach((item) => {
            color[index].push([])
          })
        })
        for (let keyColour in gyd.peise_yarn_wight) {
          for (let keyMaterial in gyd.peise_yarn_wight[keyColour]) {
            for (let keyColor in gyd.peise_yarn_wight[keyColour][keyMaterial]) {
              ingredient.forEach((item, index) => {
                if (item === keyMaterial) {
                  colour[index].forEach((item, indexColour) => {
                    if (item === keyColour) {
                      let name = this.colorArr.find((item) => item.color_code === keyColor) ? this.colorArr.find((item) => item.color_code === keyColor).name : '潘'
                      color[index][indexColour].push({
                        name: name,
                        colorCode: { 'color': keyColor, 'name': name },
                        value: [{
                          size: Object.keys(gyd.product_info.size)[0], // 这里的size理论上只有均码，工艺单产品只有均码，现在为了对应数据稍微改造一下
                          number: gyd.peise_yarn_wight[keyColour][keyMaterial][keyColor],
                          unit: '克'
                        }]
                      })
                    }
                  })
                }
              })
            }
          }
        }
        this.mainIngredient = {
          ingredient: ingredient,
          colour: colour,
          color: color
        }
        // 净重
        this.weight.push(gyd.weight)
        this.xishu = gyd.yarn_coefficient.map((item) => {
          return item.value
        })
      } else {
        // 没有工艺单的情况下，按照产品计划单接口取数据
        let planData = res[5].data.data
        this.weight = planData.weight_group
        let ingredient = []
        let colour = []
        let color = []
        planData.material_data.forEach((itemMaterial) => {
          if (itemMaterial.type === 0) {
            ingredient.push(itemMaterial.material)
            colour.push(itemMaterial.colour.map((itemColour) => itemColour.name))
            color.push(itemMaterial.colour.map((itemColour) => itemColour.color.map((itemColor) => {
              return {
                colorCode: { name: itemColor.name, color: itemColor.value },
                name: itemColor.name,
                value: itemColor.size
              }
            })))
            this.mainIngredient = {
              ingredient: ingredient,
              colour: colour,
              color: color
            }
            console.log(this.mainIngredient)
            this.xishu = planData.yarn_coefficient.map((item) => item.value)
          }
        })
      }
      // 不管有没有工艺单，都需要接收的数据，工序和辅料信息
      this.process = res[5].data.data.outside_precess
      res[5].data.data.material_data.forEach((itemMaterial) => {
        if (itemMaterial.type === 1) {
          this.otherIngredient.ingredient.push(itemMaterial.material)
          this.otherIngredient.colour.push(itemMaterial.colour.map((itemColour) => itemColour.name))
          this.otherIngredient.color.push(itemMaterial.colour.map((itemColour) => itemColour.color.map((itemColor) => {
            return {
              colorCode: '',
              name: itemColor.name,
              value: itemColor.size
            }
          })))
          this.otherIngredient.old++
        }
      })
      this.loading = false
      console.log(this.otherIngredient)
    })
  },
  watch: {
    'otherIngredient.ingredient': {
      handler: function (newVal) {
        newVal.forEach((item, index) => {
          if (item) {
            let unit = this.materialArr.find((itemFind) => itemFind.name === item).unit
            for (let index1 in this.otherIngredient.color[index]) {
              for (let index2 in this.otherIngredient.color[index][index1]) {
                for (let index3 in this.otherIngredient.color[index][index1][index2].value) {
                  this.otherIngredient.color[index][index1][index2].value[index3].unit = unit
                }
              }
            }
            this.commonUnit2 = unit
          }
        })
      },
      deep: true
    }
  },
  methods: {
    // 添加主要原料
    addMainMaterial () {
      if (this.state) {
        let value = []
        Object.keys(this.product.size).forEach((key) => {
          value.push({
            size: key,
            number: '',
            unit: this.commonUnit1
          })
        })
        this.mainIngredient.ingredient.push([])
        this.mainIngredient.colour.push([''])
        this.mainIngredient.color.push([[{
          colorCode: { name: '', color: '' },
          name: '无',
          value: value
        }]])
      } else {
        this.$message.error({
          message: '拥有工艺单的产品不能修改原料信息'
        })
      }
    },
    addOtherMaterial () {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit2
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
      if (this.state) {
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
      } else {
        this.$message.error({
          message: '拥有工艺单的产品不能修改原料信息'
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
      if (this.state) {
        let value = []
        Object.keys(this.product.size).forEach((key) => {
          value.push({
            size: key,
            number: '',
            unit: this.commonUnit1
          })
        })
        this.mainIngredient.colour[index].push('')
        this.mainIngredient.color[index].push([{
          colorCode: { name: '', color: '' },
          name: '无',
          value: value
        }])
      } else {
        this.$message.error({
          message: '拥有工艺单的产品不能修改原料信息'
        })
      }
    },
    addOtherColour (index) {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit2
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
      if (this.state) {
        if (this.mainIngredient.colour[index].length > 1) {
          this.mainIngredient.colour[index].splice(index2, 1)
          this.mainIngredient.color[index].splice(index2, 1)
        } else {
          this.$message.error({
            message: '配色方案不得少于一种'
          })
        }
      } else {
        this.$message.error({
          message: '拥有工艺单的产品不能修改原料信息'
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
      if (this.state) {
        let value = []
        Object.keys(this.product.size).forEach((key) => {
          value.push({
            size: key,
            number: '',
            unit: this.commonUnit1
          })
        })
        this.mainIngredient.color[index][index2].push({
          colorCode: { name: '', color: '' },
          name: '无',
          value: value
        })
      } else {
        this.$message.error({
          message: '拥有工艺单的产品不能修改原料信息'
        })
      }
    },
    addOtherColor (index, index2) {
      let value = []
      Object.keys(this.product.size).forEach((key) => {
        value.push({
          size: key,
          number: '',
          unit: this.commonUnit2
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
      if (this.state) {
        if (this.mainIngredient.color[index][index2].length > 1) {
          this.mainIngredient.color[index][index2].splice(index3, 1)
        } else {
          this.$message.error({
            message: '颜色不得少于一种'
          })
        }
      } else {
        this.$message.error({
          message: '拥有工艺单的产品不能修改原料信息'
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
      if (!this.lock) {
        let state = false
        this.mainIngredient.ingredient.forEach((itemMaterial) => {
          if (!itemMaterial) {
            state = true
          }
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的原料信息，请完善信息'
          })
          return
        }
        this.mainIngredient.colour.forEach((itemColour) => {
          itemColour.forEach((item) => {
            if (!item) {
              state = true
            }
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的原料配色信息，请完善信息'
          })
          return
        }
        this.mainIngredient.color.forEach((itemColor) => {
          itemColor.forEach((item) => {
            item.forEach((item2) => {
              if (!item2.colorCode.name) {
                state = true
              }
            })
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的原料纱线颜色信息，请完善信息'
          })
          return
        }
        this.otherIngredient.ingredient.forEach((itemMaterial) => {
          if (!itemMaterial) {
            state = true
          }
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的辅料信息，请完善信息'
          })
          return
        }
        this.otherIngredient.colour.forEach((itemColour) => {
          itemColour.forEach((item) => {
            if (!item) {
              state = true
            }
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的辅料配色方案信息，请完善信息'
          })
          return
        }
        this.otherIngredient.color.forEach((itemColor) => {
          itemColor.forEach((item) => {
            item.forEach((item2) => {
              if (!item2.name) {
                state = true
              }
              item2.value.forEach((item3) => {
                if (!item3.number) {
                  state = true
                }
              })
            })
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的辅料颜色或辅料数量信息，请完善信息'
          })
          return
        }
        this.weight.forEach((item) => {
          if (!item) {
            state = true
          }
        })
        if (state || this.weight.length === 0) {
          this.$message.error({
            message: '检测到有未填写的净重信息，请完善信息'
          })
          return
        }
        if (this.xishu.length < this.ingredientCmp.length) {
          this.$message.error({
            message: '检测到有未填写的纱线系数，请完善信息'
          })
          return
        }
        this.process.forEach((item) => {
          if (!item) {
            state = true
          }
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的工序信息，请完善信息'
          })
          return
        }
        let materialData = []
        this.mainIngredient.ingredient.forEach((itemMaterial, indexMaterial) => {
          materialData.push({
            material: itemMaterial,
            colour: this.mainIngredient.colour[indexMaterial].map((itemColour, indexColour) => {
              return {
                name: itemColour,
                color: this.mainIngredient.color[indexMaterial][indexColour].map((itemColor, indexColor) => {
                  return {
                    name: itemColor.name,
                    value: itemColor.colorCode.color,
                    size: this.mainIngredient.color[indexMaterial][indexColour][indexColor].value
                  }
                })
              }
            }),
            type: 0
          })
        })
        this.otherIngredient.ingredient.forEach((itemMaterial, indexMaterial) => {
          materialData.push({
            material: itemMaterial,
            colour: this.otherIngredient.colour[indexMaterial].map((itemColour, indexColour) => {
              return {
                name: itemColour,
                color: this.otherIngredient.color[indexMaterial][indexColour].map((itemColor, indexColor) => {
                  return {
                    name: itemColor.name,
                    value: itemColor.colorCode,
                    size: this.otherIngredient.color[indexMaterial][indexColour][indexColor].value
                  }
                })
              }
            }),
            type: 1
          })
        })
        let xishu = this.xishu.map((item, index) => {
          return {
            name: this.ingredientCmp[index],
            value: item
          }
        })
        this.lock = true
        this.loading = true
        saveProductPlan({
          'is_update': true,
          'id': this.$route.params.productId,
          'company_id': this.companyId,
          'product_id': this.product.id,
          'user_id': window.sessionStorage.getItem('user_id'),
          'material_data': materialData,
          'outside_process': this.process,
          'weight_group': this.weight,
          'yarn_coefficient': xishu
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '修改成功'
            })
            this.$router.push('/index/productPlanList')
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
          this.lock = false
          this.loading = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    },
    // 清空
    clearAll () {

    }
  },
  computed: {
    // 纱线系数原料合并
    ingredientCmp () {
      return this.mainIngredient.ingredient.map((item) => {
        if (item) {
          return item
        } else {
          return '待选原料'
        }
      })
    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
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
@import "~@/assets/css/productPlan.less";
</style>
