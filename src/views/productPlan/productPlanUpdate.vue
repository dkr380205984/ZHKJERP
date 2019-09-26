<template>
  <div id="productPlan"
    v-loading="loading">
    <div class="head">
      <h2>修改配料单</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">产品基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box2">
              <span class="label">产品编号:</span>
              <span class="content important">{{product.product_code}}</span>
            </div>
            <div class="box box2">
              <span class="label">产品名称:</span>
              <span class="content">{{product|filterType}}</span>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <span class="label">产品成分:</span>
              <span class="content">{{product.materials|filterMaterials}}</span>
            </div>
            <div class="box box2">
              <span class="label">产品花型:</span>
              <span class="content">{{product.flower_id}}</span>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <span class="label">产品配色:</span>
              <span class="content">{{product.color|filterColor}}</span>
            </div>
            <div class="box box2">
              <span class="label">创建日期:</span>
              <span class="content">{{product.create_time}}</span>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <span class="label">创建人:</span>
              <span class="content">{{product.user_name}}</span>
            </div>
            <div class="box box2">
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
            <el-radio style="margin-left:15px"
              v-model="hasIngredient"
              label="0">无</el-radio>
            <el-radio v-model="hasIngredient"
              label="1">有</el-radio>
          </div>
        </div>
        <div class="lineCtn"
          v-show="hasIngredient==='1'">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="addBtn"
              @click="addMainMaterial">
              <span>添加纱线原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="flex-direction:column;">
          <div class="inputCtn oneLine"
            v-for="(itemMaterial,indexMaterial) in mainIngredient"
            :key="indexMaterial">
            <span class="label must">纱线原料{{indexMaterial+1}}:</span>
            <div class="specialCtn">
              <div class="materialInfo">
                <el-select v-model="itemMaterial.material"
                  class="elInput noMarginLeft"
                  placeholder="请选择纱线原料">
                  <el-option v-for="item in ingredientArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-input v-model="itemMaterial.remark"
                  class="elInput"
                  placeholder="原料备注">
                </el-input>
              </div>
              <div class="proColorInfo"
                v-for="(itemColour,indexColour) in itemMaterial.colour"
                :key="indexColour"
                style="padding-top:12px;">
                <div class="proColorBox">
                  <span class="line"></span>
                  <div class="tranY">
                    <el-select v-model="itemColour.name"
                      class="elInput noMarginLeft"
                      placeholder='请选择配色方案'>
                      <el-option v-for="item in colourArr"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                    <span class="delete haveBg"
                      @click="deleteColour(indexMaterial,indexColour)">删除</span>
                  </div>
                </div>
                <div class="colorSize"
                  v-for="(itemColor,indexColor) in itemColour.color"
                  :key="indexColor">
                  <div class="selectBox tranY">
                    <span class="line"></span>
                    <el-select v-model="itemColor.name"
                      class="elInput noMarginLeft"
                      placeholder="请选择原料颜色"
                      filterable>
                      <el-option v-for="(item,index) in colorArr"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
                        <div class="bgBlock"
                          :style="{'background':item.color_code}"></div>
                        <div class="desc">{{item.name}}</div>
                      </el-option>
                    </el-select>
                    <span class="delete"
                      @click="deleteColor(indexMaterial,indexColour,indexColor)">删除</span>
                  </div>
                  <div class="rightBox">
                    <div class="sizeBox tranY"
                      v-for="(itemSize,indexSize) in itemColor.size"
                      :key="indexSize">
                      <el-input v-model="itemSize.number"
                        placeholder="克重"
                        class="elInput">
                        <span slot="prepend"
                          class="size">{{itemSize.size}}</span>
                        <span slot="append"
                          class="unit">{{itemSize.unit}}</span>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="colorSize">
                  <div class="selectBox">
                    <span class="line"></span>
                    <span class="addBtn noMarginLeft tranY"
                      @click="addColor(indexMaterial,indexColour)">添加原料颜色</span>
                  </div>
                </div>
              </div>
              <div class="proColorInfo">
                <div class="proColorBox">
                  <span class="line"></span>
                  <span class="addBtn haveBg noMarginLeft tranY"
                    @click="addColour(indexMaterial)">添加产品配色</span>
                </div>
              </div>
              <div class="deleteIcon"
                @click="deleteMainMaterial(indexMaterial)"><i class="el-icon-close"></i></div>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">净重:</span>
            <el-input class="elInput"
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
        <div class="lineCtn"
          style="flex-direction:column;">
          <div class="inputCtn oneLine"
            v-for="(itemMaterial,indexMaterial) in otherIngredient"
            :key="indexMaterial">
            <span class="label must">辅助原料{{indexMaterial+1}}:</span>
            <div class="specialCtn">
              <div class="materialInfo">
                <el-select v-model="itemMaterial.material"
                  class="elInput noMarginLeft"
                  placeholder="请选择辅助原料"
                  @change="getUnit(indexMaterial)">
                  <el-option v-for="item in materialArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-input v-model="itemMaterial.remark"
                  class="elInput"
                  placeholder="辅料备注">
                </el-input>
              </div>
              <div class="proColorInfo"
                v-for="(itemColour,indexColour) in itemMaterial.colour"
                :key="indexColour"
                style="padding-top:12px;">
                <div class="proColorBox">
                  <span class="line"></span>
                  <div class="tranY">
                    <el-select v-model="itemColour.name"
                      class="elInput noMarginLeft"
                      placeholder='请选择配色方案'>
                      <el-option v-for="item in colourArr"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                    <span class="delete haveBg"
                      @click="deleteOtherColour(indexMaterial,indexColour)">删除</span>
                  </div>
                </div>
                <div class="colorSize"
                  v-for="(itemColor,indexColor) in itemColour.color"
                  :key="indexColor">
                  <div class="selectBox tranY">
                    <span class="line"></span>
                    <el-input placeholder="请输入辅料属性"
                      class="elInput noMarginLeft"
                      v-model="itemColor.name"></el-input>
                    <span class="delete"
                      @click="deleteOtherColor(indexMaterial,indexColour,indexColor)">删除</span>
                  </div>
                  <div class="rightBox">
                    <div class="sizeBox tranY"
                      v-for="(itemSize,indexSize) in itemColor.size"
                      :key="indexSize">
                      <el-input v-model="itemSize.number"
                        placeholder="克重"
                        class="elInput">
                        <span slot="prepend"
                          class="size">{{itemSize.size}}</span>
                        <span slot="append"
                          class="unit">{{itemSize.unit}}</span>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="colorSize">
                  <div class="selectBox">
                    <span class="line"></span>
                    <span class="addBtn noMarginLeft tranY"
                      @click="addOtherColor(indexMaterial,indexColour)">添加辅料属性</span>
                  </div>
                </div>
              </div>
              <div class="proColorInfo">
                <div class="proColorBox">
                  <span class="line"></span>
                  <span class="addBtn haveBg noMarginLeft tranY"
                    @click="addOtherColour(indexMaterial)">添加产品配色</span>
                </div>
              </div>
              <div class="deleteIcon"
                @click="deleteOtherMaterial(indexMaterial)"><i class="el-icon-close"></i></div>
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
import { YarnList, editList, materialList, craftProduct, YarnColorList, pantongList, saveProductPlan, productPlanDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      lock: false,
      hasIngredient: '1',
      loading: true,
      sizeKey: [],
      sizeArr: [],
      sizeArrF: [],
      companyId: window.sessionStorage.getItem('company_id'),
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
      mainIngredient: [],
      otherIngredient: [],
      colourArr: [],
      colorArr: [],
      materialArr: [],
      weight: []
    }
  },
  mounted () {
    // 初始化接口
    Promise.all([YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    }), materialList({
      company_id: this.companyId
    }), craftProduct({
      product_id: this.$route.params.id
    }), YarnColorList({
      company_id: this.companyId
    }), pantongList({

    }), productPlanDetail({
      product_key: this.$route.params.productId
    })]).then((res) => {
      this.product = res[6].data.data.product_info
      this.sizeKey = this.product.size.map(item => {
        return item.measurement
      })
      this.sizeArr = this.sizeKey.map((item) => {
        return {
          size: item,
          number: '',
          unit: 'g'
        }
      })
      this.sizeArrF = this.sizeKey.map((item) => {
        return {
          size: item,
          number: '',
          unit: ''
        }
      })
      this.colourArr = this.product.color
      this.colorArr = res[4].data.data
      this.ingredientArr = res[0].data.data
      this.materialArr = res[2].data.data
      // 获取详情
      let data = res[6].data.data
      this.mainIngredient = data.material_data.filter((item) => item.type === 0)
      this.otherIngredient = data.material_data.filter((item) => item.type === 1)
      this.weight = data.weight_group
      this.loading = false
    })
  },
  methods: {
    // 添加主要原料
    addMainMaterial () {
      this.mainIngredient.push({
        material: '',
        remark: '',
        type: 0,
        colour: [{
          name: '',
          color: [{
            name: '',
            value: '',
            size: JSON.parse(JSON.stringify(this.sizeArr))
          }]
        }]
      })
    },
    addOtherMaterial () {
      this.otherIngredient.push({
        unit: '',
        material: '',
        remark: '',
        type: 1,
        colour: [{
          name: '',
          color: [{
            name: '',
            value: '',
            size: JSON.parse(JSON.stringify(this.sizeArrF))
          }]
        }]
      })
    },
    // 删除主要原料
    deleteMainMaterial (indexMaterial) {
      if (this.mainIngredient.length > 1) {
        this.$confirm('是否删除该原料', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.mainIngredient.splice(indexMaterial, 1)
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
    deleteOtherMaterial (indexMaterial) {
      this.$confirm('是否删除该辅料', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.otherIngredient.splice(indexMaterial, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加配色方案
    addColour (indexMaterial) {
      this.mainIngredient[indexMaterial].colour.push({
        name: '',
        color: [{
          name: '',
          value: '',
          size: JSON.parse(JSON.stringify(this.sizeArr))
        }]
      })
    },
    addOtherColour (indexMaterial) {
      this.otherIngredient[indexMaterial].colour.push({
        name: '',
        color: [{
          name: '',
          value: '',
          size: JSON.parse(JSON.stringify(this.sizeArrF)).map((item) => {
            item.unit = this.otherIngredient[indexMaterial].unit
            return item
          })
        }]
      })
    },
    // 删除配色方案
    deleteColour (indexMaterial, indexColour) {
      if (this.mainIngredient[indexMaterial].colour.length > 1) {
        this.mainIngredient[indexMaterial].colour.splice(indexColour, 1)
      } else {
        this.$message.error({
          message: '配色方案不得少于一种'
        })
      }
    },
    deleteOtherColour (indexMaterial, indexColour) {
      if (this.otherIngredient[indexMaterial].colour.length > 1) {
        this.otherIngredient[indexMaterial].colour.splice(indexColour, 1)
      } else {
        this.$message.error({
          message: '配色方案不得少于一种'
        })
      }
    },
    // 添加颜色
    addColor (indexMaterial, indexColour) {
      this.mainIngredient[indexMaterial].colour[indexColour].color.push({
        name: '',
        value: '',
        size: JSON.parse(JSON.stringify(this.sizeArr))
      })
    },
    addOtherColor (indexMaterial, indexColour) {
      this.otherIngredient[indexMaterial].colour[indexColour].color.push({
        name: '',
        value: '',
        size: JSON.parse(JSON.stringify(this.sizeArrF)).map((item) => {
          item.unit = this.otherIngredient[indexMaterial].unit
          return item
        })
      })
    },
    // 删除颜色
    deleteColor (indexMaterial, indexColour, indexColor) {
      if (this.mainIngredient[indexMaterial].colour[indexColour].color.length > 1) {
        this.mainIngredient[indexMaterial].colour[indexColour].color.splice(indexColor, 1)
      } else {
        this.$message.error({
          message: '颜色不得少于一种'
        })
      }
    },
    deleteOtherColor (indexMaterial, indexColour, indexColor) {
      if (this.otherIngredient[indexMaterial].colour[indexColour].color.length > 1) {
        this.otherIngredient[indexMaterial].colour[indexColour].color.splice(indexColor, 1)
      } else {
        this.$message.error({
          message: '颜色不得少于一种'
        })
      }
    },
    // 获取辅料单位信息
    getUnit (indexMaterial) {
      const unit = this.materialArr.find((item) => item.material === this.otherIngredient[indexMaterial].name).unit
      this.otherIngredient[indexMaterial].unit = unit
      this.otherIngredient[indexMaterial].colour.forEach((itemColour) => {
        itemColour.color.forEach((itemColor) => {
          itemColor.size.forEach((itemSize) => {
            itemSize.unit = unit
          })
        })
      })
    },
    jsonMerge (jsonArr, keyArr) {
      let newJson = [] // 合并好的数据都放在这个数组里
      jsonArr.forEach((itemJson, indexJson) => {
        let mark = -1
        let finded = newJson.find((itemFind, indexFind) => {
          if (itemFind[keyArr[0]] === itemJson[keyArr[0]]) {
            mark = indexFind
            return itemFind[keyArr[0]] === itemJson[keyArr[0]]
          }
        })
        if (!finded) {
          let value = {}
          value[keyArr[0]] = itemJson[keyArr[0]]
          value['info'] = []
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          value['info'].push(info)
          newJson.push(value)
        } else {
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          newJson[mark]['info'].push(info)
        }
      })
      // 递归的条件是不断的缩减keyArr的length，每次都去除第零个，直到为0
      if (keyArr.length === 1) {
        return newJson
      } else {
        return newJson.map((itemInfo) => {
          let newKeyArr = []
          keyArr.forEach((item, index) => {
            if (index > 0) {
              newKeyArr.push(item)
            }
          })
          return {
            [keyArr[0]]: itemInfo[keyArr[0]],
            'info': this.jsonMerge(itemInfo['info'], newKeyArr)
          }
        })
      }
    },
    // 添加
    saveAll () {
      if (!this.lock) {
        let state = false
        state = this.mainIngredient.some((item) => {
          return !item.material
        })
        if (state) {
          this.$message.error({
            message: '检测到有未选择的纱线信息，请完善'
          })
          return
        }
        state = this.mainIngredient.some((item) => {
          return item.colour.some((itemColour) => {
            return !itemColour.name
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未选择的产品配色信息，请完善'
          })
          return
        }
        state = this.mainIngredient.some((item) => {
          return item.colour.some((itemColour) => {
            return itemColour.color.some((itemColor) => {
              return !itemColor.name
            })
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未选择的原料颜色信息，请完善'
          })
          return
        }
        state = this.mainIngredient.some((item) => {
          return item.colour.some((itemColour) => {
            return itemColour.color.some((itemColor) => {
              return itemColor.size.some((itemSize) => {
                return !itemSize.number
              })
            })
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有填写的纱线克重信息，请完善'
          })
          return
        }
        state = this.weight.some((item) => !item) || this.weight.length < this.sizeKey.length
        if (state) {
          this.$message.error({
            message: '检测到有未填写的产品净重信息，请完善'
          })
          return
        }
        state = this.otherIngredient.some((item) => {
          return !item.material
        })
        if (state) {
          this.$message.error({
            message: '检测到有未选择的辅料信息，请完善'
          })
          return
        }
        state = this.otherIngredient.some((item) => {
          return item.colour.some((itemColour) => {
            return !itemColour.name
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未选择的产品配色信息，请完善'
          })
          return
        }
        state = this.otherIngredient.some((item) => {
          return item.colour.some((itemColour) => {
            return itemColour.color.some((itemColor) => {
              return !itemColor.name
            })
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未选择的辅料属性信息，请完善'
          })
          return
        }
        state = this.otherIngredient.some((item) => {
          return item.colour.some((itemColour) => {
            return itemColour.color.some((itemColor) => {
              return itemColor.size.some((itemSize) => {
                return !itemSize.number
              })
            })
          })
        })
        if (state) {
          this.$message.error({
            message: '检测到有未填写的辅料信息，请完善'
          })
          return
        }
        let materialData = this.mainIngredient.concat(this.otherIngredient)
        // 该数据结构为后台需要
        let mtd = materialData.map((item) => {
          return {
            product_id: this.product.product_id,
            desc: item.remark ? item.remark : null,
            material_name: item.material
          }
        })
        this.lock = true
        this.loading = true
        saveProductPlan({
          'is_update': true,
          'company_id': this.companyId,
          'product_id': this.product.product_id,
          'user_id': window.sessionStorage.getItem('user_id'),
          'material_data': materialData,
          'weight_group': this.weight,
          'product_material_attribute': mtd
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
    }
  },
  watch: {
    hasIngredient (newVal) {
      if (newVal === '0') {
        this.mainIngredient.length = 0
      }
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
        return item.name
      }).join('/')
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productPlanCreateR.less";
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
  .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .el-input__icon {
    line-height: 30px !important;
  }
}
</style>
