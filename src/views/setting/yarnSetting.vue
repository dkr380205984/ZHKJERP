<template>
  <div id="yarnSetting">
    <div class="head">
      <h2>原料设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn"
        :style="{'max-height':flagObj.yarn?'9999px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线名称:</span>
          <el-input class="elInput"
            v-model="yarn"
            placeholder="请输入纱线名称"></el-input>
          <div class="okBtn"
            @click="saveYarn">添加</div>
          <div class="showAll"
            @click="flagObj.yarn=!flagObj.yarn">{{!flagObj.yarn?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.yarn?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in yarnArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <!-- <i class="iconCancle" @click="deleteYarn(item.id)">x</i> -->
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.color?'9999px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线颜色:</span>
          <el-input class="elInput"
            v-model="color"
            placeholder="请输入颜色"></el-input>
          <el-color-picker style="margin-left:15px;"
            v-model="colorVal"></el-color-picker>
          <div class="okBtn"
            @click="saveColor">添加</div>
          <div class="showAll"
            @click="flagObj.color=!flagObj.color">{{!flagObj.color?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.color?'showIcon':'hideIcon'"></i></div>
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
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.otherIngredient?'9999px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加辅料:</span>
          <el-input class="elInput"
            v-model="otherIngredient"
            placeholder="请输入辅料名称"></el-input>
          <el-input class="elInput"
            v-model="otherIngredientUnit"
            placeholder="请输入辅料单位"></el-input>
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
    </div>
  </div>
</template>

<script>
import { saveYarn, YarnList, saveYarnColor, YarnColorList, saveMaterial, materialList, deleteMaterial } from '@/assets/js/api.js'
export default {
  data () {
    return {
      flagObj: {
        yarn: false,
        color: false,
        otherIngredient: false
      },
      yarn: '',
      yarnArr: [],
      colorVal: '',
      color: '',
      colorArr: [],
      otherIngredient: '',
      otherIngredientUnit: '',
      otherIngredientArr: []
    }
  },
  methods: {
    // 纱线名称列表
    getYarnList () {
      YarnList({
        keyword: ''
      }).then((res) => {
        this.yarnArr = res.data.data
      })
    },
    // 添加纱线名称
    saveYarn () {
      saveYarn({
        id: null,
        name: this.yarn
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '添加成功'
          })
          this.yarn = ''
          this.getYarnList()
        }
      })
    },
    getYarnColorList () {
      YarnColorList({
        company_id: window.sessionStorage.getItem('company_id')
      }).then((res) => {
        this.colorArr = res.data.data
      })
    },
    // 添加纱线颜色
    saveColor () {
      if (this.color && this.colorVal) {
        saveYarnColor({
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.color,
          color_code: this.colorVal
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.colorArr.push({
              'id': this.id++,
              'name': this.color,
              'color_code': this.colorVal
            })
            this.color = ''
            this.colorVal = ''
          }
        })
      } else {
        this.$message.error({
          message: '请填写颜色名称并选择对应色块'
        })
      }
    },
    // 添加辅料
    saveOtherIngredient () {
      if (this.otherIngredient && this.otherIngredientUnit) {
        this.loading = true
        saveMaterial({
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.otherIngredient,
          otherIngredientUnit: this.unit,
          max_price: 0,
          min_price: 0
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
          message: '请输入辅料名称和辅料单位'
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
    }
  },
  mounted () {
    Promise.all([YarnList({
      keyword: ''
    }), YarnColorList({
      company_id: window.sessionStorage.getItem('company_id')
    }), materialList({
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      this.yarnArr = res[0].data.data
      this.colorArr = res[1].data.data
      this.otherIngredientArr = res[2].data.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/yarnSetting.less";
</style>
