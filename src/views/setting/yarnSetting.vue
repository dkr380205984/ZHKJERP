<template>
  <div id="yarnSetting">
    <div class="head">
      <h2>原料设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn" :style="{'max-height':flagObj.yarn?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线名称:</span>
          <el-input class="elInput" v-model="yarn" placeholder="请输入纱线名称"></el-input>
          <div class="okBtn" @click="saveYarn">添加</div>
          <div class="showAll" @click="flagObj.yarn=!flagObj.yarn">{{!flagObj.yarn?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.yarn?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in yarnArr" :key="item.id">
              <span>{{item.name}}</span>
              <!-- <i class="iconCancle" @click="deleteYarn(item.id)">x</i> -->
            </div>
          </div>
        </div>
      </div>
       <div class="lineCtn" :style="{'max-height':flagObj.color?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">纱线颜色:</span>
          <el-input class="elInput" v-model="color" placeholder="请输入颜色"></el-input>
          <el-color-picker style="margin-left:15px;" v-model="colorVal"></el-color-picker>
          <div class="okBtn" @click="saveColor">添加</div>
          <div class="showAll" @click="flagObj.color=!flagObj.color">{{!flagObj.color?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.color?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
           <div class="list">
            <div class="btnCtn" v-for="item in colorArr" :key="item.id">
              <div class="colorBlock" :style="{'background':item.color_code}"></div>
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveYarn, YarnList, saveYarnColor, YarnColorList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      flagObj: {
        yarn: false,
        color: false
      },
      yarn: '',
      yarnArr: [],
      colorVal: '',
      color: '',
      colorArr: []
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
        console.log(res)
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
    }
  },
  mounted () {
    Promise.all([YarnList({
      keyword: ''
    }), YarnColorList({
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      this.yarnArr = res[0].data.data
      this.colorArr = res[1].data.data
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/yarnSetting.less';
</style>
