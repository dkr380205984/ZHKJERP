<template>
  <div id="designFormSetting">
    <div class="head">
      <h2>工艺单设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn"
        :style="{'max-height':flagObj.ruffled?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">边型:</span>
          <el-input class="elInput"
            v-model="ruffled"
            placeholder="请输入边型"></el-input>
          <div class="okBtn"
            @click="saveRuffled">添加</div>
          <div class="showAll"
            @click="flagObj.ruffled=!flagObj.ruffled">{{!flagObj.ruffled?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.ruffled?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in ruffledArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <!-- <i class="iconCancle" @click="deleteRuffled(item.id)">x</i> -->
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.model?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">机型:</span>
          <el-input class="elInput"
            v-model="model"
            placeholder="请输入机型"></el-input>
          <div class="okBtn"
            @click="saveModel">添加</div>
          <div class="showAll"
            @click="flagObj.model=!flagObj.model">{{!flagObj.model?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.model?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in modelArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <!-- <i class="iconCancle" @click="deleteModel(item.id)">x</i> -->
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.organization?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">组织法:</span>
          <el-input class="elInput"
            v-model="organization"
            placeholder="请输入组织法"></el-input>
          <div class="okBtn"
            @click="saveOrganization">添加</div>
          <div class="showAll"
            @click="flagObj.organization=!flagObj.organization">{{!flagObj.organization?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.organization?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in organizationArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <!-- <i class="iconCancle" @click="deleteOrganization(item.id)">x</i> -->
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn"
        :style="{'max-height':flagObj.process?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">产品生产流程</span>
          <el-input class="elInput"
            v-model="process"
            placeholder="请输入工序流程"></el-input>
          <div class="okBtn"
            @click="saveProcess">添加</div>
          <div class="showAll"
            @click="flagObj.process=!flagObj.process">{{!flagObj.process?'展开':'收起'}}<i class="el-icon-d-arrow-right"
              :class="!flagObj.process?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn"
              v-for="item in processArr"
              :key="item.id">
              <span>{{item.name}}</span>
              <!-- <i class="iconCancle" @click="deleteProcess(item.id)">x</i> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { editList, saveProductionType, saveProductionProcess, saveProductionMethod, saveProductionSide } from '@/assets/js/api.js'
export default {
  data () {
    return {
      id: 1000, // 一个假的自增Id
      company_id: window.sessionStorage.getItem('company_id'),
      flagObj: {
        piece: false,
        type: false,
        ruffled: false,
        model: false,
        organization: false,
        process: false,
        color: false
      },
      colorVal: '',
      color: '',
      colorArr: [],
      pieceUnit: '0',
      piece: '',
      pieceArr: [],
      type: '',
      typeArr: [],
      ruffled: '',
      ruffledArr: [],
      model: '',
      modelArr: [],
      organization: '',
      organizationArr: [],
      process: '',
      processArr: []
    }
  },
  created () {
    Promise.all([
      editList({
        company_id: this.company_id
      })
    ]).then((res) => {
      this.ruffledArr = res[0].data.data.side
      this.processArr = res[0].data.data.process
      this.organizationArr = res[0].data.data.method
      this.modelArr = res[0].data.data.type
    })
  },
  methods: {
    // 添加边型
    saveRuffled () {
      if (this.ruffled) {
        saveProductionSide({
          name: this.ruffled,
          company_id: this.company_id
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.ruffledArr.push({
              'id': this.id++,
              'name': this.ruffled
            })
            this.ruffled = ''
          }
        })
      } else {
        this.$message.error({
          message: '请填写边型'
        })
      }
    },
    // 删除边型
    deleteRuffled () {

    },
    // 添加机型
    saveModel () {
      if (this.model) {
        saveProductionType({
          name: this.model,
          company_id: this.company_id
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.modelArr.push({
              'id': this.id++,
              'name': this.model
            })
            this.model = ''
          }
        })
      } else {
        this.$message.error({
          message: '请填写机型'
        })
      }
    },
    // 删除机型
    deleteModel () {

    },
    // 添加组织法
    saveOrganization () {
      if (this.organization) {
        saveProductionMethod({
          name: this.organization,
          company_id: this.company_id
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.organizationArr.push({
              'id': this.id++,
              'name': this.organization
            })
            this.organization = ''
          }
        })
      } else {
        this.$message.error({
          message: '请填写组织法'
        })
      }
    },
    // 删除组织法
    deleteOrganization () {

    },
    // 添加工艺流程
    saveProcess () {
      if (this.process) {
        saveProductionProcess({
          name: this.process,
          company_id: this.company_id
        }).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.processArr.push({
              'id': this.id++,
              'name': this.process
            })
            this.process = ''
          }
        })
      } else {
        this.$message.error({
          message: '请填写工艺流程'
        })
      }
    },
    deleteProcess () {

    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormSetting.less";
</style>
