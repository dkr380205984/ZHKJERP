<template>
  <div id="sendMsg">
    <div class="head">
      <h2>公司消息通知</h2>
    </div>
    <div class="body">
      <div class="appendInfo">
        <div class="row">
          <div class="box box1">
            <div class="label">通知类型：</div>
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
        </div>
        <div class="row">
          <div class="box box1">
            <div class="label">通知标题：</div>
            <div class="content">
              <el-input placeholder="请输入通知标题"
                v-model="title"></el-input>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="box box1">
            <div class="label">通知内容：</div>
            <div class="content">
              <el-input placeholder="请输入通知内容"
                type="textarea"
                :rows="5"
                v-model="content"></el-input>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="box box1">
            <div class="label">通知人员：</div>
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
        </div>
        <div class="row">
          <div class="box box1">
            <div class="label">已选人员：</div>
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
      </div>
      <div class="bottomBtnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="sendMsg">发布</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStation, getGroup, authList, notifySave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      title: '',
      content: '',
      type: '普通',
      stationAndGroupSelf: JSON.parse(JSON.stringify(this.$store.state.stationAndGroup)),
      userListSelf: JSON.parse(JSON.stringify(this.$store.state.userList)),
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
    handleClose (id) {
      this.userListSelf.find((item) => item.id === id).check = false
    },
    sendMsg () {
      let formData = {
        msgFlag: this.msgFlag,
        title: this.title,
        content: this.content,
        type: this.type,
        tag: '公司',
        router_url: '/index/msgList',
        receive_user: this.checkList.map(item => item.id)
      }
      notifySave(formData).then((res) => {
        if (res.data.status) {
          this.$message.success('发布成功')
          this.title = ''
          this.content = ''
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/sendMsg.less";
</style>
<style lang="less">
#sendMsg {
  .el-input__inner {
    height: 32px;
  }
}
</style>
