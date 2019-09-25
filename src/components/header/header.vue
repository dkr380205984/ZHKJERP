<template>
  <div class="headerCompt">
    <div class="cmpCtn">
      <img class="cmpLogo"
        src="@/assets/image/index/copDefault.png" />
      <span class="cmpName">企业名称</span>
    </div>
    <div class="menuCtn">
      <div class="menuLeft">
        <i class="el-icon-arrow-left"
          @click="$router.go(-1)"></i>
        <div class="home"
          @click="goHome"></div>
      </div>
      <div class="menuRight">
        <div class="item">
          <el-badge :value="200"
            :max="99">
            <i class="el-icon-bell"></i>
          </el-badge>
          <div class="msgBox">
            <div class="msgOpr">
              <span>消息通知</span>
              <span>全部标记已读</span>
            </div>
            <div class="msgContent">
              <div class="oneMsg">
                <div class="oneMsgLeft">
                  <div class="oneMsgLine1">
                    <span class="oneMsgTitle must">工艺单紧急通知</span>
                    <span class="mark blue">工序</span>
                  </div>
                  <div class="oneMsgLine2">
                    <div class="oneMsgInfo">添加新产品添加新产品添加新产品添加新产品添加新产品添加新产品添加新产品添加新产品</div>
                  </div>
                </div>
                <div class="oneMsgRight">
                  <div class="oneMsgLine1">7:30</div>
                  <div class="oneMsgLine2">隔壁老王</div>
                </div>
              </div>
              <div class="oneMsg">
                <div class="oneMsgLeft">
                  <div class="oneMsgLine1">
                    <span class="oneMsgTitle normal">工艺单紧急通知</span>
                    <span class="mark purple">公司</span>
                  </div>
                  <div class="oneMsgLine2">
                    <div class="oneMsgInfo">添加新产品</div>
                  </div>
                </div>
                <div class="oneMsgRight">
                  <div class="oneMsgLine1">7:30</div>
                  <div class="oneMsgLine2">隔壁老王</div>
                </div>
              </div>
              <div class="oneMsg">
                <div class="oneMsgLeft">
                  <div class="oneMsgLine1">
                    <span class="oneMsgTitle important">工艺单紧急通知</span>
                    <span class="mark yellow">系统</span>
                  </div>
                  <div class="oneMsgLine2">
                    <div class="oneMsgInfo">添加新产品</div>
                  </div>
                </div>
                <div class="oneMsgRight">
                  <div class="oneMsgLine1">7:30</div>
                  <div class="oneMsgLine2">隔壁老王</div>
                </div>
              </div>
            </div>
            <div class="msgBottom"><span>查看全部通知</span></div>
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
              <el-dropdown-item command="personManage">人员管理</el-dropdown-item>
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
      }]
    }
  },
  methods: {
    commondHandler (cmd) {
      console.log(cmd)
      if (cmd === 'personManage') {
        // 这里刷新页面是为了解决左侧导航栏不能刷新的问题
        window.location.replace('/index/personManage')
      } else if (cmd === 'login') {
        window.location.replace('/login')
      }
    },
    goHome () {
      window.location.replace('/index/home')
    },
    openWin (url) {
      this.goSetting = true
      window.open(url)
    },
    closeWin () {
      if (this.goSetting) {
        window.location.reload()
      } else {
        this.showSetting = false
      }
    }
  }
}
</script>
