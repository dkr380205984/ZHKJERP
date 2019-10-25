<template>
  <div class="headerCompt">
    <div class="cmpCtn">
      <img class="cmpLogo"
        src="@/assets/image/index/copDefault.png" />
      <span class="cmpName">{{company_name}}</span>
    </div>
    <div class="menuCtn">
      <div class="menuLeft">
        <i class="el-icon-d-arrow-left"
          @click="$router.go(-1)"></i>
        <div class="home"
          @click="goHome"></div>
      </div>
      <div class="menuRight">
        <div class="item">
          <el-badge :value="total"
            :max="99">
            <i class="el-icon-bell"></i>
          </el-badge>
          <!-- 这个节点只用于连接盒子和铃铛之间的空白,触发hover区域变大 -->
          <div class="msgTop"></div>
          <div class="msgBox">
            <div class="msgOpr">
              <span>消息通知</span>
              <span @click="readAll">全部标记已读</span>
            </div>
            <div class="msgContent">
              <div class="noMsg"
                v-show="msgList.length===0">暂无新通知</div>
              <div class="oneMsg"
                v-for="item in msgList"
                :key="item.id">
                <div class="oneMsgLeft">
                  <div class="oneMsgLine1">
                    <span class="oneMsgTitle"
                      @click="readMsg(item)"
                      :class="{'must':item.type==='紧急','normal':item.type==='普通','important':item.type==='重要'}">{{item.title}}</span>
                    <span class="mark"
                      :class="{'blue':item.tag==='工序','purple':item.tag==='公司','yellow':item.tag==='系统'}">{{item.tag}}</span>
                  </div>
                  <div class="oneMsgLine2">
                    <div class="oneMsgInfo"
                      v-html="item.content"></div>
                  </div>
                </div>
                <div class="oneMsgRight">
                  <div class="oneMsgLine1">{{item.create_time.slice(0,10)}}</div>
                  <div class="oneMsgLine2">{{item.user_name}}</div>
                </div>
              </div>
            </div>
            <div class="msgBottom"><span @click="$router.push('/index/msgList')">查看全部通知</span></div>
          </div>
        </div>
        <i class="el-icon-setting"
          @click="showSetting=true"></i>
        <div class="selectCtn">
          <el-dropdown @command="commondHandler">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="sendMsg">发布通知</el-dropdown-item>
              <el-dropdown-item command="personManage"
                divided>人员管理</el-dropdown-item>
              <el-dropdown-item command="login"
                divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 这里加一个设置模块 -->
    <div class="settingsCtn"
      v-show="showSetting">
      <div class="main">
        <div class="close"
          @click="closeWin">
          <span class="icon">x</span>
        </div>
        <div class="title">系统设置</div>
        <div class="blockCtn">
          <div @click="openWin(item.url)"
            class="blocks"
            v-for="(item,index) in list"
            :key="index">
            <img class="image"
              :src="item.img" />
            <span class="description">{{item.name}}</span>
          </div>
        </div>
        <div class="btnCtn">
          <div class="cancleBtn"
            @click="closeWin">取消</div>
          <div class="okBtn"
            @click="closeWin">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './header.less'
import { notifyList, notifyRead, companyInfoDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      goSetting: false,
      showSetting: false,
      list: [{
        name: '产品设置',
        img: require('../../assets/image/setting/产品设置-蓝.png'),
        url: '/index/productSetting'
      }, {
        name: '工艺单设置',
        img: require('../../assets/image/setting/工艺单设置-蓝.png'),
        url: '/index/designFormSetting'
      }, {
        name: '原料设置',
        img: require('../../assets/image/setting/原料设置-蓝.png'),
        url: '/index/yarnSetting'
      }, {
        name: '辅料设置',
        img: require('../../assets/image/setting/辅料设置-蓝.png'),
        url: '/index/error/404'
      }, {
        name: '账号设置',
        img: require('../../assets/image/setting/账号设置-蓝.png'),
        url: '/index/accountSetting'
      }, {
        name: '包装设置',
        img: require('../../assets/image/setting/包装设置-蓝.png'),
        url: '/index/packagMaterialList'
      }],
      msgList: [],
      total: 0,
      company_name: ''
    }
  },
  methods: {
    getNotify () {
      notifyList({
        limit: 5,
        page: 1,
        status: 1,
        type: null
      }).then((res) => {
        this.msgList = res.data.data
        this.total = res.data.meta.total
      })
    },
    commondHandler (cmd) {
      if (cmd === 'personManage') {
        // 这里刷新页面是为了解决左侧导航栏不能刷新的问题
        window.location.replace('/index/personManage')
      } else if (cmd === 'login') {
        window.location.replace('/login')
      } else if (cmd === 'sendMsg') {
        window.location.replace('/index/sendMsg')
      }
    },
    goHome () {
      window.location.replace('/index/home')
    },
    openWin (url) {
      this.goSetting = true
      window.open(url)
    },
    readMsg (item) {
      if (item.tag === '公司') {
        this.$alert('通知详情：' + item.content, item.title, {
          confirmButtonText: '确定'
        })
      } else {
        window.open(item.router_url)
      }
      notifyRead({
        id: item.id
      }).then((res) => {
        if (res.data.status) {
          this.getNotify()
        } else {
          this.$message.error({
            message: res.data.message
          })
        }
      })
    },
    readAll () {
      this.$confirm('是否已读所有通知', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        notifyRead({
          id: null
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.msgList = []
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    closeWin () {
      if (this.goSetting) {
        window.location.reload()
      } else {
        this.showSetting = false
      }
    }
  },
  mounted () {
    companyInfoDetail({
      company_id: window.sessionStorage.getItem('company_id')
    }).then(res => {
      this.company_name = res.data.data.alias || res.data.data.company_name
      document.title = this.company_name + '-织为云'
    })
    this.getNotify()
  }
}
</script>
