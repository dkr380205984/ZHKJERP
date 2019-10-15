<template>
  <div id="designFormSetting">
    <div class="head">
      <h2>加工工序设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn"
        :style="{'max-height':flagObj.materialFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">原料工序:</span>
          <el-input class="elInput"
            v-model="materialProcess"
            placeholder="请输入工序名称"></el-input>
          <div class="okBtn"
            @click="saveMaterialProcess">添加</div>
          <div class="showAll"
            @click="flagObj.materialFlag=!flagObj.materialFlag">{{!flagObj.materialFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.materialFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in materialProcessArr"
              :key="item.id">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.semiProcessFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">半成品工序:</span>
          <el-input class="elInput"
            v-model="semiProcess"
            placeholder="请输入工序名称"></el-input>
          <div class="okBtn"
            @click="saveSemiProcess">添加</div>
          <div class="showAll"
            @click="flagObj.semiProcessFlag = !flagObj.semiProcessFlag">{{!flagObj.semiProcessFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.semiProcessFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in semiProcessArr"
              :key="item.id">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { settingCourse, courseList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      company_id: window.sessionStorage.getItem('company_id'),
      flagObj: {
        materialFlag: false,
        semiProcessFlag: false
      },
      materialProcess: '',
      semiProcess: '',
      semiProcessArr: [],
      materialProcessArr: []
    }
  },
  created () {
    // Promise.all([
    courseList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.materialProcessArr = res.data.data.filter(item => item.type === 1)
      this.semiProcessArr = res.data.data.filter(item => item.type === 2)
    })
    // ]).then((res) => {
    // })
  },
  methods: {
    // 添加原料工序
    saveMaterialProcess () {
      if (this.materialProcess) {
        settingCourse({
          name: this.materialProcess,
          type: 1
        }).then(res => {
          if (!res.data.status) {
            this.$message.error(res.data.message)
          } else {
            this.materialProcessArr.push(res.data.data)
            this.$message.success('添加成功')
          }
        })
      } else {
        this.$message.warning('检测到未填写工序名称')
      }
    },
    deleteMaterialProcess () {

    },
    saveSemiProcess () {
      if (this.semiProcess) {
        settingCourse({
          name: this.semiProcess,
          type: 2
        }).then(res => {
          if (!res.data.status) {
            this.$message.error(res.data.message)
          } else {
            this.semiProcessArr.push(res.data.data)
            this.$message.success('添加成功')
          }
        })
      } else {
        this.$message.warning('检测到未填写工序名称')
      }
    },
    deleteSemiProcess () {

    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormSetting.less";
</style>
