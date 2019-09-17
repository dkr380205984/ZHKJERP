<template>
  <div id='productSetting'
    v-loading="loading">
    <div class="head">
      <h2>产品设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn"
        :style="{'max-height':flagObj.flowerFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加花型:</span>
          <el-input class="elInput"
            v-model="flower"
            placeholder="请输入花型"></el-input>
          <div class="okBtn"
            @click="saveFlower">添加</div>
          <div class="showAll"
            @click="flagObj.flowerFlag=!flagObj.flowerFlag">{{!flagObj.flowerFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.flowerFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in flowerArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle"
                @click="deleteFlower(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.ingredientFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加成分:</span>
          <el-input class="elInput"
            v-model="ingredient"
            placeholder="请输入成分"></el-input>
          <div class="okBtn"
            @click="saveIngredient">添加</div>
          <div class="showAll"
            @click="flagObj.ingredientFlag=!flagObj.ingredientFlag">{{!flagObj.ingredientFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.ingredientFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in ingredientArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle"
                @click="deleteIngredient(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.otherIngredient?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加辅料:</span>
          <el-input class="elInput"
            v-model="otherIngredient"
            placeholder="请输入辅料"></el-input>
          <div class="okBtn"
            @click="saveOtherIngredient">添加</div>
          <div class="showAll"
            @click="flagObj.otherIngredient=!flagObj.otherIngredient">{{!flagObj.otherIngredient?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.otherIngredient?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in otherIngredientArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle"
                @click="deleteOtherIngredient(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.colorFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加配色:</span>
          <el-input class="elInput"
            v-model="colorName"
            placeholder="请输入产品配色方案名称"></el-input>
          <el-color-picker style="margin-left:15px;"
            v-model="colorValue"></el-color-picker>
          <div class="okBtn"
            @click="saveColor">添加</div>
          <div class="showAll"
            @click="flagObj.colorFlag=!flagObj.colorFlag">{{!flagObj.colorFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.colorFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in colorArr"
              :key="item.id">
              <div class="colorBlock"
                :style="{'background':item.color_code}"></div>
              <span>{{item.name}}</span>
              <i class="iconCancle"
                @click="deleteColor(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.sizeTFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加尺寸:</span>
          <el-select v-model="selectTypes2"
            placeholder="请选择大类"
            class="elInput">
            <el-option v-for="item in treeData"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input class="elInput"
            placeholder="请逐个输入产品尺寸"
            v-model="sizeTname"
            @keyup.enter.native="saveSizeTname"></el-input>
          <div class="floatDiv">
            <span class="title">{{selectTComputed}}</span>
            <span class="content">{{sizeString}}</span>
          </div>
          <div class="okBtn"
            @click="saveSizeTname">添加</div>
          <div class="showAll"
            @click="flagObj.sizeTFlag=!flagObj.sizeTFlag">{{!flagObj.sizeTFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.sizeTFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="line"
              v-for="item in sizeTarr"
              :key="item.id">
              <span class="lineTitle">{{item.name}}:</span>
              <div class="btnCtn"
                v-for="itemchild in item.child_measurement"
                :key="itemchild.name">
                <span>{{itemchild.name}}</span>
                <i class="iconCancle"
                  @click="deleteSizeT(itemchild.id)">x</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.sizeFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加尺码:</span>
          <el-select v-model="selectTypes"
            placeholder="请选择大类"
            class="elInput">
            <el-option v-for="item in treeData"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input class="elInput"
            placeholder="请逐个输入尺码包含的种类"
            v-model="sizeName"
            @keyup.enter.native="saveSizeName"></el-input>
          <div class="floatDiv">
            <span class="title">{{selectComputed}}</span>
            <span class="content">{{sizeTString}}</span>
          </div>
          <div class="okBtn"
            @click="saveSizeName">添加</div>
          <div class="showAll"
            @click="flagObj.sizeFlag=!flagObj.sizeFlag">{{!flagObj.sizeFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.sizeFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="line"
              v-for="item in sizeArr"
              :key="item.id">
              <span class="lineTitle">{{item.name}}:</span>
              <div class="btnCtn"
                v-for="itemchild in item.child_size"
                :key="itemchild.name">
                <span>{{itemchild.name}}</span>
                <i class="iconCancle"
                  @click="deleteSize(itemchild.id)">x</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.unitFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加单位:</span>
          <el-select v-model="selectTypes3"
            placeholder="请选择大类"
            class="elInput">
            <el-option v-for="item in treeData"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input class="elInput"
            placeholder="请输入大类对应的单位"
            v-model="unit"
            @keyup.enter.native="saveUnit"></el-input>
          <div class="okBtn"
            @click="saveUnit">添加</div>
          <div class="showAll"
            @click="flagObj.unitFlag=!flagObj.unitFlag">{{!flagObj.unitFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.unitFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in unitArr"
              :key="item.id">
              <span>{{item.product_category}}({{item.name}})</span>
              <i class="iconCancle"
                @click="deleteUnit(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="treeCtn">
        <span class="label">添加产品:</span>
        <el-input class="elInput"
          v-model="newType"
          placeholder="请输入一级大类"></el-input>
        <div class="okBtn"
          @click="addType">添加</div>
        <div class="treeMain">
          <el-tree ref="tree"
            :key="tree_key"
            :data="treeData"
            node-key="id"
            :render-content="renderContent"
            :expand-on-click-node="false"
            :default-expand-all="false"
            :default-expanded-keys="defaultExpand">
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  proproductTppeSave,
  productTppeList,
  saveFlower,
  flowerList,
  deleteFlower,
  ingredientList,
  ingredientSave,
  ingredientDelete,
  colorList,
  colorSave,
  colorDelete,
  proproductTppeDelete,
  sizeList,
  sizeSave,
  sizeOne,
  sizeDelete,
  footageOne,
  footageList,
  footageSave,
  footageDelete,
  saveMaterial,
  materialList,
  unitSave,
  unitList,
  unitDelete,
  deleteMaterial
} from '@/assets/js/api.js'
export default {
  data () {
    return {
      flagObj: {
        flowerFlag: false,
        ingredientFlag: false,
        colorFlag: false,
        sizeFlag: false,
        sizeTFlag: false,
        otherIngredient: false,
        unitFlag: false
      },
      id: -1,
      otherIngredient: '',
      otherIngredientArr: [],
      unit: '',
      unitArr: [],
      flower: '',
      flowerArr: [],
      ingredient: '',
      ingredientArr: [],
      colorName: '',
      colorValue: null,
      colorArr: [],
      treeData: [],
      newType: '',
      tree_key: 0,
      defaultExpand: [],
      loading: true,
      selectTypes: '',
      selectTypes2: '',
      selectTypes3: '',
      sizeName: '',
      sizeNameArr: [],
      sizeTname: '',
      sizeTnameArr: [],
      sizeTarr: [],
      sizeArr: []
    }
  },
  methods: {
    // 获取花型列表
    getFlower () {
      return flowerList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then((res) => {
        if (res.data.status) {
          this.flowerArr = res.data.data
        }
      })
    },
    // 添加花型
    saveFlower () {
      if (this.flower) {
        this.loading = true
        saveFlower({
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.flower
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加花型成功'
            })
            this.flower = ''
            this.getFlower().then((res) => {
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请在左侧输入框输入添加花型的名称'
        })
      }
    },
    // 删除花型
    deleteFlower (id) {
      this.loading = true
      deleteFlower({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          this.getFlower().then((res) => {
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    },
    // 获取成分列表
    getIngredient () {
      return ingredientList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then((res) => {
        if (res.data.status) {
          this.ingredientArr = res.data.data
        }
      })
    },
    // 添加成分
    saveIngredient () {
      if (this.ingredient) {
        this.loading = true
        ingredientSave({
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.ingredient
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成分成功'
            })
            this.ingredient = ''
            this.getIngredient().then((res) => {
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请在左侧输入框输入添加成分的名称'
        })
      }
    },
    // 删除成分
    deleteIngredient (id) {
      this.loading = true
      ingredientDelete({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          this.getIngredient().then((res) => {
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    },
    // 获取颜色列表
    getColor () {
      return colorList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then((res) => {
        if (res.data.status) {
          this.colorArr = res.data.data
        }
      })
    },
    // 添加颜色
    saveColor () {
      if (this.colorName && this.colorValue) {
        this.loading = true
        colorSave({
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.colorName,
          color_code: this.colorValue,
          id: null
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加颜色成功'
            })
            this.colorName = ''
            this.colorValue = null
            this.getColor().then((res) => {
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请输入颜色名称和色块'
        })
      }
    },
    // 删除颜色
    deleteColor (id) {
      this.loading = true
      colorDelete({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          this.getColor().then((res) => {
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    },
    // 获取类型树结构
    getType () {
      return productTppeList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then((res) => {
        // 用最简单粗暴的方式解析了三级结构
        if (res.data.status) {
          this.treeData = res.data.data.map((item) => {
            return {
              pid: item.pid,
              id: item.id,
              label: item.name,
              level: 1,
              children: item.child.map((item) => {
                return {
                  pid: item.pid,
                  id: item.id,
                  label: item.name,
                  level: 2,
                  children: item.child.map((item) => {
                    return {
                      pid: item.pid,
                      id: item.id,
                      label: item.name,
                      children: item.child,
                      isEdit: false,
                      level: 3
                    }
                  }),
                  isEdit: false
                }
              }),
              isEdit: false
            }
          })
        }
      })
    },
    // 添加大类
    addType () {
      if (this.newType) {
        const nodeObj = { id: this.id++, label: this.newType, isEdit: false, children: [] }
        this.treeData.push(nodeObj)
        proproductTppeSave({
          company_id: window.sessionStorage.getItem('company_id'),
          pid: '0',
          name: this.newType
        }).then((res) => {
          this.$message.success({
            message: '添加成功'
          })
        })
      } else {
        this.$message.error({
          message: '请在左侧输入框输入一级大类的名称'
        })
      }
    },
    // 编辑节点
    nodeEdit (ev, store, data) {
      data.isEdit = true
      this.$nextTick(() => {
        let $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
        if (!$input) {
          $input = ''
        } else {
          $input = $input.focus()
        }
      })
    },
    // 节点删除
    nodeDelete (node, data) {
      this.$confirm('是否要删除该产品，这可能会影响包含该产品的订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proproductTppeDelete({
          id: data.id
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '删除成功'
            })
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
          } else {
            this.$message.error({
              message: res.data.message
            })
            this.loading = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增节点
    nodeAppend (ev, data) {
      const newChild = { id: this.id--, label: '新增产品', isEdit: true, pid: data.id }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      // 新增节点后展开当前节点
      this.$refs.tree.store.nodesMap[data.id].expanded = true
      // 新增节点focus
      this.$nextTick(() => {
        let $input = ev.target.offsetParent.querySelector('input')
        if (!$input) {
          $input = ''
        } else {
          $input = $input.focus()
        }
      })
    },
    // 是否展示操作框
    showOrEdit (data, node) {
      if (data.isEdit) {
        return <input class="tree_edit_input" type="text" value={data.label} on-blur={ev => this.edit_sure(ev, data, node)} />
      } else {
        return <span className="node_labe">{data.label}</span>
      }
    },
    // 完成编辑
    edit_sure (ev, data, node) {
      console.log('完成编辑', data)
      this.loading = true
      let realId = null
      // <0说明是添加操作,>0则是编辑操作
      if (data.id > 0) {
        realId = data.id
      }
      const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
      if (!$input) {
        return false
      } else {
        data.label = $input.value
        data.isEdit = false
        proproductTppeSave({
          company_id: window.sessionStorage.getItem('company_id'),
          id: realId,
          pid: data.pid,
          name: $input.value
        }).then((res) => {
          if (res.data.status) {
            this.getType().then((res) => {
              this.loading = false
            })
          }
        })
      }
    },
    // 操作dom节点添加
    renderContent (h, { node, data, store }) {
      if (data.level < 3) {
        return (
          <span class="tree_node_Ctn">
            <span>
              {this.showOrEdit(data, node)}
            </span>
            <div class="tree_node_op">
              <i class="el-icon-plus" on-click={(ev) => this.nodeAppend(ev, data)}></i>
              <i class="el-icon-edit" on-click={(ev) => this.nodeEdit(ev, store, data)}></i>
              <i class="el-icon-delete" on-click={() => this.nodeDelete(node, data)}></i>
            </div>
          </span>)
      } else {
        return (
          <span class="tree_node_Ctn">
            <span>
              {this.showOrEdit(data, node)}
            </span>
            <div class="tree_node_op">
              <i class="el-icon-edit" on-click={(ev) => this.nodeEdit(ev, store, data)}></i>
              <i class="el-icon-delete" on-click={() => this.nodeDelete(node, data)}></i>
            </div>
          </span>)
      }
    },
    // 添加尺码名称
    saveSizeName () {
      if (this.sizeName && this.selectTypes) {
        this.loading = true
        footageSave({
          name: this.sizeName,
          category_id: this.selectTypes,
          company_id: window.sessionStorage.getItem('company_id')
        }).then((res) => {
          footageOne({
            category_id: this.selectTypes
          }).then((res) => {
            this.sizeTnameArr = res.data.data
          })
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.sizeName = ''
            sizeList({
              company_id: window.sessionStorage.getItem('company_id')
            }).then((res) => {
              this.sizeArr = res.data.data
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请输入尺码大类和名称'
        })
      }
    },
    // 添加尺寸名称
    saveSizeTname () {
      if (this.sizeTname && this.selectTypes2) {
        this.loading = true
        sizeSave({
          name: this.sizeTname,
          unit: 'cm',
          category_id: this.selectTypes2,
          company_id: window.sessionStorage.getItem('company_id')
        }).then((res) => {
          sizeOne({
            category_id: this.selectTypes2
          }).then((res) => {
            this.sizeNameArr = res.data.data
          })
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.sizeTname = ''
            sizeList({
              company_id: window.sessionStorage.getItem('company_id')
            }).then((res) => {
              this.sizeTarr = res.data.data
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请输入尺寸大类和名称'
        })
      }
    },
    // 删除尺寸
    deleteSizeT (id) {
      this.loading = true
      sizeDelete({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          sizeList({
            company_id: window.sessionStorage.getItem('company_id')
          }).then((res) => {
            this.sizeTarr = res.data.data
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    },
    // 删除尺码
    deleteSize (id) {
      this.loading = true
      footageDelete({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          sizeList({
            company_id: window.sessionStorage.getItem('company_id')
          }).then((res) => {
            this.sizeArr = res.data.data
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    },
    // 添加辅料
    saveOtherIngredient () {
      if (this.otherIngredient) {
        this.loading = true
        saveMaterial({
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.otherIngredient
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加辅料成功'
            })
            this.flower = ''
            materialList({
              company_id: window.sessionStorage.getItem('company_id')
            }).then((res) => {
              if (res.data.status) {
                this.otherIngredientArr = res.data.data
              }
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请在左侧输入框输入添加花型的名称'
        })
      }
    },
    // 删除辅料
    deleteOtherIngredient (id) {
      deleteMaterial({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          materialList({
            company_id: window.sessionStorage.getItem('company_id')
          }).then((res) => {
            if (res.data.status) {
              this.otherIngredientArr = res.data.data
            }
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    },
    // 添加单位
    saveUnit () {
      if (this.unit && this.selectTypes3) {
        this.loading = true
        unitSave({
          name: this.unit,
          category_id: this.selectTypes3,
          company_id: window.sessionStorage.getItem('company_id')
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.unit = ''
            this.selectTypes3 = ''
            unitList({
              company_id: window.sessionStorage.getItem('company_id')
            }).then((res) => {
              this.unitArr = res.data
              this.loading = false
            })
          }
        })
      } else {
        this.$message.error({
          message: '请输入单位大类和名称'
        })
      }
    },
    // 删除单位
    deleteUnit (id) {
      unitDelete({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除成功'
          })
          unitList({
            company_id: window.sessionStorage.getItem('company_id')
          }).then((res) => {
            this.unitArr = res.data
            this.loading = false
          })
        } else {
          this.$message.error({
            message: res.data.message
          })
          this.loading = false
        }
      })
    }
  },
  watch: {
    selectTypes2 (newVal) {
      sizeOne({
        category_id: newVal
      }).then((res) => {
        this.sizeNameArr = res.data.data
      })
    },
    selectTypes (newVal) {
      footageOne({
        category_id: newVal
      }).then((res) => {
        console.log(res)
        this.sizeTnameArr = res.data.data
      })
    }
  },
  computed: {
    // 添加尺寸得到id筛选label
    selectComputed () {
      if (this.selectTypes === '') {
        return ''
      } else {
        let obj = {}
        obj = this.treeData.find((item) => {
          return item.id === this.selectTypes
        })
        return obj.label + '：'
      }
    },
    selectComputed2 () {
      if (this.selectTypes2 === '') {
        return ''
      } else {
        let obj = {}
        obj = this.treeData.find((item) => {
          return item.id === this.selectTypes2
        })
        return obj.label + '：'
      }
    },
    // 添加尺寸数组拆分
    sizeString () {
      return this.sizeNameArr.map((item) => { return item.name }).join(' / ')
    },
    // 添加尺码得到id筛选label
    selectTComputed () {
      if (this.selectTypes2 === '') {
        return ''
      } else {
        let obj = {}
        obj = this.treeData.find((item) => {
          return item.id === this.selectTypes2
        })
        return obj.label + '：'
      }
    },
    // 添加尺马数组拆分
    sizeTString () {
      return this.sizeTnameArr.map((item) => { return item.name }).join(' / ')
    }
  },
  created () {
    let companyId = window.sessionStorage.getItem('company_id')
    // 获取花型列表
    Promise.all([flowerList({
      company_id: companyId
    }), productTppeList({
      company_id: companyId
    }), ingredientList({
      company_id: companyId
    }), colorList({
      company_id: companyId
    }), sizeList({
      company_id: companyId
    }), footageList({
      company_id: companyId
    }), materialList({
      company_id: companyId
    }), unitList({
      company_id: companyId
    })]).then((res) => {
      console.log(res)
      // 初始化花型和树形数据
      this.flowerArr = res[0].data.data
      this.treeData = res[1].data.data.map((item) => {
        return {
          pid: item.pid,
          id: item.id,
          label: item.name,
          level: 1,
          children: item.child.map((item) => {
            return {
              pid: item.pid,
              id: item.id,
              label: item.name,
              level: 2,
              children: item.child.map((item) => {
                return {
                  pid: item.pid,
                  id: item.id,
                  label: item.name,
                  children: item.child,
                  isEdit: false,
                  level: 3
                }
              }),
              isEdit: false
            }
          }),
          isEdit: false
        }
      })
      this.ingredientArr = res[2].data.data
      this.colorArr = res[3].data.data
      this.sizeTarr = res[4].data.data
      this.sizeArr = res[4].data.data
      this.otherIngredientArr = res[6].data.data
      this.unitArr = res[7].data
      console.log(this.unitArr)
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productSetting.less";
</style>
<style lang="less">
.tree_node_Ctn {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  &:hover {
    .tree_node_op {
      display: block;
    }
  }
  .tree_edit_input {
    color: #666;
    font-size: 12px;
  }
  .tree_node_op {
    display: none;
    margin-left: 30px;
    color: #666;
    i {
      margin: 0 5px;
      &:hover {
        color: #1a95ff;
      }
    }
  }
}
</style>
