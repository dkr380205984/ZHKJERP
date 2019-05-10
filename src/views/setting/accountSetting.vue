<template>
  <div id="accountSetting" v-loading="loading">
    <div class="head">
      <h2>账号设置</h2>
    </div>
    <div class="body">
      <div class="lineCtn" :style="{'max-height':flagObj.stationFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加岗位:</span>
          <el-input class="elInput" v-model="station" placeholder="请输入岗位"></el-input>
          <div class="okBtn" @click="saveStation">添加</div>
          <div class="showAll" @click="flagObj.stationFlag=!flagObj.stationFlag">{{!flagObj.stationFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.stationFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in stationArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteStation(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn" :style="{'max-height':flagObj.groupFlag?'300px':'64px'}">
        <div class="inputCtn">
          <span class="label">添加小组:</span>
          <el-input class="elInput" v-model="group" placeholder="请输入岗位"></el-input>
          <div class="okBtn" @click="saveGroup">添加</div>
          <div class="showAll" @click="flagObj.groupFlag=!flagObj.groupFlag">{{!flagObj.groupFlag?'展开':'收起'}}<i class="el-icon-d-arrow-right" :class="!flagObj.groupFlag?'showIcon':'hideIcon'"></i></div>
        </div>
        <div class="allInfo">
          <div class="bgWhite"></div>
          <div class="list">
            <div class="btnCtn" v-for="item in groupArr" :key="item.id">
              <span>{{item.name}}</span>
              <i class="iconCancle" @click="deleteGroup(item.id)">x</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStation, getGroup, addStation, addGroup, deleteStation, deleteGroup } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      station: '',
      stationArr: [],
      group: '',
      groupArr: [],
      flagObj: {
        stationFlag: false,
        groupFlag: false
      }
    }
  },
  methods: {
    // 添加岗位
    saveStation () {
      if (!this.station) {
        this.$message.error({
          message: '请填写岗位名称'
        })
        return
      }
      addStation({
        id: null,
        company_id: window.sessionStorage.getItem('company_id'),
        user_id: window.sessionStorage.getItem('user_id'),
        name: this.station
      }).then((res) => {
        this.$message.success({
          message: '添加岗位成功'
        })
        this.station = ''
        getStation({
          company_id: window.sessionStorage.getItem('company_id')
        }).then((res) => {
          this.stationArr = res.data.data
        })
      })
    },
    // 删除岗位
    deleteStation (id) {
      deleteStation({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除岗位成功'
          })
          getStation({
            company_id: window.sessionStorage.getItem('company_id')
          }).then((res) => {
            this.stationArr = res.data.data
          })
        } else {
          this.$message.success({
            message: res.data.message
          })
        }
      })
    },
    // 添加分组
    saveGroup () {
      if (!this.group) {
        this.$message.error({
          message: '请填写岗位名称'
        })
        return
      }
      addGroup({
        id: null,
        company_id: window.sessionStorage.getItem('company_id'),
        user_id: window.sessionStorage.getItem('user_id'),
        name: this.group
      }).then((res) => {
        this.$message.success({
          message: '添加小组成功'
        })
        this.group = ''
        getGroup({
          company_id: window.sessionStorage.getItem('company_id')
        }).then((res) => {
          this.groupArr = res.data.data
        })
      })
    },
    // 删除分组
    deleteGroup (id) {
      deleteGroup({
        id: id
      }).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '删除分组成功'
          })
          getGroup({
            company_id: window.sessionStorage.getItem('company_id')
          }).then((res) => {
            this.groupArr = res.data.data
          })
        } else {
          this.$message.success({
            message: res.data.message
          })
        }
      })
    }
  },
  mounted () {
    Promise.all([getStation({
      company_id: window.sessionStorage.getItem('company_id')
    }), getGroup({
      company_id: window.sessionStorage.getItem('company_id')
    })]).then((res) => {
      console.log(res)
      this.stationArr = res[0].data.data
      this.groupArr = res[1].data.data
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/accountSetting.less';
</style>
