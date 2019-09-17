<template>
  <div id="productPlan"
    v-loading="loading">
    <div class="head">
      <h2>添加配料单</h2>
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
            <span class="content contentLine"
              v-for="(item,key) in product.size"
              :key="key">
              <span class="size">{{item.measurement}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce">{{item.size_info}}</span>
                <span class="sizeOnce">{{ '克重' + '：'+item.weight + 'g'}}</span>
              </span>
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
          <div class="inputCtn">
            <span class="label must">是否有原料:</span>
            <el-radio :disabled="!state"
              style="margin-left:15px"
              v-model="hasIngredient"
              label="0">无</el-radio>
            <el-radio v-model="hasIngredient"
              label="1">有</el-radio>
          </div>
        </div>
        <!-- 多层嵌套四个index分别为
          index1:Ingredient 原料
          index2:colour 配色方案
          index3:color 纱线颜色
          index4:size 尺码
         -->
        <div class="lineCtn"
          style="flex-direction:column;">
          <div class="inputCtn oneLine"
            v-for="(item,index) in mainIngredient.ingredient.length"
            :key="index">
            <span class="label must">纱线原料{{index+1}}:</span>
            <div class="specialCtn">
              <div class="materialInfo">
                <el-select v-model="mainIngredient.ingredient[index]"
                  class="elInput noMarginLeft"
                  placeholder="请选择纱线原料">
                  <el-option v-for="item in ingredientArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-select v-model="value"
                  class="elInput"
                  placeholder="请选择包装属性">
                  <el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input v-model="value"
                  class="elInput"
                  placeholder="原料备注"></el-input>
              </div>
              <div class="proColorInfo"
                v-for="(item2,index2) in mainIngredient.colour[index].length"
                :key="index2"
                style="padding-top:12px;">
                <div class="proColorBox">
                  <span class="line"></span>
                  <div class="tranY">
                    <el-select v-model="mainIngredient.colour[index][index2]"
                      class="elInput noMarginLeft"
                      :placeholder="'请选择配色方案' + (index2 + 1)">
                      <el-option v-for="item in colourArr"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        <div class="bgBlock"
                          :style="{'background':item.color_code}"></div>
                        <div class="desc">{{item.name}}</div>
                      </el-option>
                    </el-select>
                    <span class="delete haveBg"
                      @click="deleteColour(index,index2)">删除</span>
                  </div>
                </div>
                <div class="colorSize"
                  v-for="(item3,index3) in mainIngredient.color[index][index2].length"
                  :key="index3">
                  <div class="selectBox tranY">
                    <span class="line"></span>
                    <el-select v-model="mainIngredient.color[index][index2][index3].colorCode"
                      class="elInput noMarginLeft"
                      :placeholder="'请选择原料' + (index+1) + '颜色' + (index3+1)">
                      <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <span class="delete"
                      @click="deleteColor(index,index2,index3)">删除</span>
                  </div>
                  <div class="rightBox">
                    <div class="sizeBox tranY"
                      v-for="(item4,index4) in mainIngredient.color[index][index2][index3].value.length"
                      :key="index4">
                      <el-input v-model="mainIngredient.color[index][index2][index3].value[index4].number"
                        placeholder="克重"
                        class="elInput">
                        <span slot="prepend"
                          class="size">{{mainIngredient.color[index][index2][index3].value[index4].size}}</span>
                        <span slot="append"
                          class="unit">克</span>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="colorSize">
                  <div class="selectBox">
                    <span class="line"></span>
                    <span class="addBtn noMarginLeft tranY"
                      @click="addColor(index,index2)">添加原料颜色</span>
                  </div>
                </div>
              </div>
              <div class="proColorInfo">
                <div class="proColorBox">
                  <span class="line"></span>
                  <span class="addBtn haveBg noMarginLeft tranY"
                    @click="addColour(index)">添加产品配色</span>
                </div>
              </div>
              <div class="deleteIcon"
                @click="deleteMainMaterial(index)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="addBtn"
              @click="addMainMaterial">
              <span>添加纱线原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">净重:</span>
            <el-input :disabled="!state||hasIngredient==='0'"
              class="elInput"
              placeholder="净重"
              v-model="weight[index]"
              v-for="(item,index) in sizeKey"
              :key="index">
              <span class="size"
                slot="prepend">{{item}}</span>
              <span class="unit"
                slot="append">克</span>
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
        <div class="lineCtn"
          v-show="otherIngredient.ingredient.length>0">
          <div class="inputCtn oneLine rowLine"
            v-for="(item,index) in otherIngredient.ingredient.length"
            :key="index">
            <span class="label">辅料列表:</span>
            <div class="specialCtn">
              <div class="materialInfo">
                <el-select v-model="mainIngredient.ingredient[index]"
                  class="elInput noMarginLeft"
                  placeholder="请选择纱线原料">
                  <el-option v-for="item in ingredientArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-select v-model="value"
                  class="elInput"
                  placeholder="请选择包装属性">
                  <el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input v-model="value"
                  class="elInput"
                  placeholder="原料备注"></el-input>
              </div>
              <div class="proColorInfo"
                v-for="(item2,index2) in mainIngredient.colour[index].length"
                :key="index2"
                style="padding-top:12px;">
                <div class="proColorBox">
                  <span class="line"></span>
                  <div class="tranY">
                    <el-select v-model="mainIngredient.colour[index][index2]"
                      class="elInput noMarginLeft"
                      :placeholder="'请选择配色方案' + (index2 + 1)">
                      <el-option v-for="item in colourArr"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        <div class="bgBlock"
                          :style="{'background':item.color_code}"></div>
                        <div class="desc">{{item.name}}</div>
                      </el-option>
                    </el-select>
                    <span class="delete haveBg"
                      @click="deleteColour(index,index2)">删除</span>
                  </div>
                </div>
                <div class="colorSize"
                  v-for="(item3,index3) in mainIngredient.color[index][index2].length"
                  :key="index3">
                  <div class="selectBox tranY">
                    <span class="line"></span>
                    <el-select v-model="mainIngredient.color[index][index2][index3].colorCode"
                      class="elInput noMarginLeft"
                      :placeholder="'请选择原料' + (index+1) + '颜色' + (index3+1)">
                      <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <span class="delete"
                      @click="deleteColor(index,index2,index3)">删除</span>
                  </div>
                  <div class="rightBox">
                    <div class="sizeBox tranY"
                      v-for="(item4,index4) in mainIngredient.color[index][index2][index3].value.length"
                      :key="index4">
                      <el-input v-model="mainIngredient.color[index][index2][index3].value[index4].number"
                        placeholder="克重"
                        class="elInput">
                        <span slot="prepend"
                          class="size">{{mainIngredient.color[index][index2][index3].value[index4].size}}</span>
                        <span slot="append"
                          class="unit">克</span>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="colorSize">
                  <div class="selectBox">
                    <span class="line"></span>
                    <span class="addBtn noMarginLeft tranY"
                      @click="addColor(index,index2)">添加原料颜色</span>
                  </div>
                </div>
              </div>
              <div class="proColorInfo">
                <div class="proColorBox">
                  <span class="line"></span>
                  <span class="addBtn haveBg noMarginLeft tranY"
                    @click="addColour(index)">添加产品配色</span>
                </div>
              </div>
              <div class="deleteIcon"
                @click="deleteOtherMaterial(index)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">主要辅料:</span>
            <div class="addBtn"
              @click="addOtherMaterial">
              <span>添加装饰辅料</span>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>

      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, YarnList, editList, materialList, saveProductPlan, craftProduct, YarnColorList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      lock: false,
      hasIngredient: '1',
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
        ingredient: [''],
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
        color: []
      },
      colourArr: [],
      colorArr: [],
      materialArr: [],
      weight: [],
      xishu: [],
      options: [],
      value: '',
      state: true // 用于标记是否为工艺单
    }
  },
  mounted () {
    // 初始化接口
    Promise.all([porductOne({
      id: this.$route.params.id
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    }), materialList({
      company_id: this.companyId
    }), craftProduct({
      product_id: this.$route.params.id
    }), YarnColorList({
      company_id: this.companyId
    })]).then((res) => {
      this.product = res[0].data.data
      this.sizeKey = res[0].data.data.size.map(item => {
        return item.measurement
      })
      console.log(this.sizeKey)
      this.colourArr = res[0].data.data.color
      this.colorArr = res[5].data.data
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
        this.state = true // 工艺单对配料单的限制去除，如需加限制，把这个字段改为false即可
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
        console.log(gyd)
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
                          number: gyd.peise_yarn_wight[keyColour][keyMaterial][keyColor].toFixed(1),
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
      }
      this.loading = false
    })
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
              if (!item2.colorCode) {
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
        this.ingredientCmp.forEach((item, index) => {
          if (!this.xishu[index]) {
            this.xishu[index] = [0]
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
        this.lock = true
        this.loading = true
        // saveProductPlan({
        //   'is_update': false,
        //   'company_id': this.companyId,
        //   'product_id': this.product.id,
        //   'user_id': window.sessionStorage.getItem('user_id'),
        //   'material_data': materialData,
        //   'outside_process': [], // 外道加工去了
        //   'weight_group': this.weight,
        //   'yarn_coefficient': [] // 纱线系数去了
        // }).then((res) => {
        //   if (res.data.status) {
        //     this.$message.success({
        //       message: '添加成功'
        //     })
        //     this.$router.push('/index/productPlanList')
        //   } else {
        //     this.$message.error({
        //       message: res.data.message
        //     })
        //   }
        //   this.lock = false
        //   this.loading = false
        // })
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
  watch: {
    hasIngredient (newVal) {
      console.log(this.colorArr)
      if (newVal === '0') {
        this.mainIngredient.ingredient = [this.ingredientArr[0].name]
        this.mainIngredient.colour = [this.colourArr.map((item) => item.name)]
        this.mainIngredient.color = [this.colourArr.map((item) => {
          return [{
            name: '无',
            colorCode: {
              name: this.colorArr[0].name,
              color: this.colorArr[0].color_code
            },
            value: this.mainIngredient.color[0][0][0].value.map((item2) => {
              return {
                size: item2.size,
                number: '0',
                unit: item2.unit
              }
            })
          }]
        })]
        let weightArr = []
        this.mainIngredient.color[0][0][0].value.forEach((item) => {
          weightArr.push('0')
        })
        this.weight = weightArr
        this.xishu = ['0']
      }
      console.log(this.mainIngredient)
    },
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
      return arr.map(item => {
        return item.color_name
      }).join('/')
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productPlanNew.less";
</style>
<style lang="less">
#productPlan {
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0;
    .size {
      display: flex;
      width: 60px;
      justify-content: center;
      align-items: center;
    }
    .unit {
      display: flex;
      width: 50px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
