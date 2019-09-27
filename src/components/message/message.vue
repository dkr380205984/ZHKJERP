<template>
  <div class="myMessage"
    v-show="visible">
    <div class="main">
      <div class="top">
        <span>编辑消息通知</span>
        <i class="el-icon-close"
          @click="closeWin"></i>
      </div>
      <div class="center">
        <div class="line">
          <span class="label">开启通知：</span>
          <div class="content">
            <el-switch v-model="msgFlag"></el-switch>
          </div>
        </div>
        <div class="line">
          <span class="label">通知类型：</span>
          <div class="content">
            <div class="btnCtn">
              <span class="btn blue"
                :class="{'active':type==='普通'}"
                @click="type='普通'">普通</span>
            </div>
            <div class="btnCtn">
              <span class="btn yellow"
                :class="{'active':type==='重要'}"
                @click="type='重要'">重要</span>
            </div>
            <div class="btnCtn">
              <span class="btn red"
                :class="{'active':type==='紧急'}"
                @click="type='紧急'">紧急</span>
            </div>
          </div>
        </div>
        <div class="line">
          <span class="label">通知标题：</span>
          <div class="content">
            <el-input placeholder="请输入通知标题"
              v-model="title"></el-input>
          </div>
        </div>
        <div class="line">
          <span class="label">通知成员：</span>
          <div class="content">
            <div class="btnCtn"
              v-for="(item,index) in stationAndGroupSelf"
              :key="index">
              <span class="btn normal"
                @click="getUsers(index)"
                :class="{'active':item.check}">{{item.name}}</span>
            </div>
          </div>
          <div class="content">
            <el-checkbox v-for="(item,index) in userListSelf"
              :key="index"
              v-model="item.check">{{item.name}}
            </el-checkbox>
          </div>
        </div>
        <div class="line">
          <span class="label">已选成员：</span>
          <div class="content">
            <el-tag size="mini"
              v-if="checkList.length===0"
              type="warning">无</el-tag>
            <el-tag v-for="(item,index) in checkList"
              :key="index"
              size="mini"
              @close="handleClose(item.id)"
              closable>{{item.name}}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btnCtn">
          <div class="btn"
            @click="closeWin">取消</div>
          <div class="btn blue"
            @click="saveMsg">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './message.less'
import { getStation, getGroup, authList } from '@/assets/js/api.js'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    afterSave: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      title: '您有一条消息通知',
      stationAndGroupSelf: JSON.parse(JSON.stringify(this.$store.state.stationAndGroup)),
      userListSelf: JSON.parse(JSON.stringify(this.$store.state.userList)),
      type: '普通',
      msgFlag: false,
      defaultGroup: []
    }
  },
  computed: {
    stationAndGroup () {
      return this.$store.state.stationAndGroup
    },
    userList () {
      return this.$store.state.userList
    },
    checkList () {
      return this.userListSelf.filter((item) => {
        return item.check
      })
    }
  },
  watch: {
    stationAndGroup (val) {
      this.stationAndGroupSelf = JSON.parse(JSON.stringify(val))
    },
    userList (val) {
      this.userListSelf = JSON.parse(JSON.stringify(val))
      this.getDefaultGroup()
    }
  },
  methods: {
    // 初始化数据
    init () {
      // 分组信息获取一次,保存在vuex里
      if (this.stationAndGroup.length === 0) {
        Promise.all([getStation(), getGroup()]).then((res) => {
          this.$store.commit('getStationAndGroup', [{ name: '所有人', check: false }].concat(res[0].data.data.map(item => {
            return {
              name: item.name,
              check: false
            }
          })).concat(res[1].data.data.map(item => {
            return {
              name: item.name,
              check: false
            }
          })))
        })
      }
      if (this.userList.length === 0) {
        authList().then((res) => {
          this.$store.commit('getUserList', res.data.data.map((item) => {
            return {
              station: item.station,
              group: item.group,
              id: item.id,
              name: item.name,
              check: false
            }
          }))
        })
      }
      if (window.localStorage.getItem(this.url)) {
        let data = JSON.parse(window.localStorage.getItem(this.url))
        this.msgFlag = data.msgFlag
        this.title = data.title
        this.type = data.type
        this.defaultGroup = data.receive_user
      }
    },
    getDefaultGroup () {
      if (this.defaultGroup.length && this.defaultGroup.length > 0) {
        this.userListSelf.forEach((item) => {
          if (this.defaultGroup.find((itemFind) => itemFind === item.id)) {
            item.check = true
          }
        })
      }
    },
    handleClose (id) {
      this.userListSelf.find((item) => item.id === id).check = false
    },
    getUsers (index) {
      let stationAndGroup = this.stationAndGroupSelf[index]
      this.stationAndGroupSelf[index].check = !stationAndGroup.check
      this.userListSelf.forEach((item) => {
        if (index === 0) {
          item.check = stationAndGroup.check
        } else if (index !== 0 && (item.station === stationAndGroup.name || item.group === stationAndGroup.name)) {
          item.check = stationAndGroup.check
        }
      })
    },
    saveMsg () {
      let formData = {
        msgFlag: this.msgFlag,
        title: this.title,
        type: this.type,
        receive_user: this.checkList.map(item => item.id)
      }
      window.localStorage.setItem(this.url, JSON.stringify(formData))
      if (typeof (this.afterSave) === 'function') {
        this.afterSave(formData)
      }
      this.$message.success({
        message: '编辑成功'
      })
      this.$emit('update:visible', false)
    },
    closeWin () {
      // <comp :foo.sync="bar"></comp>
      // 将被扩展为<comp :foo="bar" @update:foo="val => bar = val"></comp>
      // 用与子组件触发父组件值更新的语法糖
      // 在子组件中需要显示触发这个update事件:this.$emit('update:foo', newValue)
      this.$emit('update:visible', false)
    }
  },
  mounted () {
    this.init()
    this.getDefaultGroup()
  }
}
</script>
