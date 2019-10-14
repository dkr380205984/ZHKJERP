<template>
  <div id="msgList"
    v-loading="loading"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled">
    <div class="head">
      <h2>全部消息列表
        <div class="readAll"
          @click="readAll">全部标记已读</div>
      </h2>
    </div>
    <div class="body">
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane name="null">
          <span slot="label">全部通知
            <el-badge class="mark"
              v-show="unread.all>0"
              :value="unread.all"
              :max="99" />
          </span>
        </el-tab-pane>
        <el-tab-pane name="工序">
          <span slot="label">工序通知
            <el-badge class="mark"
              v-show="unread.tag>0"
              :value="unread.tag"
              :max="99" />
          </span>
        </el-tab-pane>
        <el-tab-pane name="公司">
          <span slot="label">公司通知
            <el-badge class="mark"
              v-show="unread.company>0"
              :value="unread.company"
              :max="99" />
          </span>
        </el-tab-pane>
        <el-tab-pane name="系统">
          <span slot="label">系统通知
            <el-badge class="mark"
              v-show="unread.system>0"
              :value="unread.system"
              :max="99" />
          </span>
          <!-- <el-badge :value="unread.system"
            slot="label"
            :max="99"
            class="item">系统通知</el-badge> -->
        </el-tab-pane>
      </el-tabs>
      <div class="scrollWarp">
        <div class="list">
          <div class="oneMsg"
            :class="{'unread':item.status===1,'readed':item.status===2}"
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
        <p v-if="noMore"
          style="text-align:center;color:#666;">加载完毕</p>
      </div>
    </div>
  </div>
</template>
<script>
import { notifyList, notifyRead, notifyNum } from '@/assets/js/api.js'
export default {
  data () {
    return {
      activeName: 'null',
      noMore: false,
      loading: false,
      pages: 1,
      msgList: [],
      unread: {
        all: 0,
        tag: 0,
        company: 0,
        system: 0
      }
    }
  },
  computed: {
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    getNotify () {
      this.loading = true
      notifyList({
        limit: 20,
        page: this.pages,
        status: null,
        tag: this.activeName === 'null' ? null : this.activeName
      }).then((res) => {
        this.loading = false
        this.msgList = this.msgList.concat(res.data.data)
        if (res.data.data.length === 0) {
          this.noMore = true
        }
      })
    },
    readMsg (item) {
      if (item.tag === '公司') {
        this.$alert('通知详情：' + item.content, item.title, {
          confirmButtonText: '确定'
        })
      } else {
        window.open(item.router_url)
      }
      if (item.status === 1) {
        notifyRead({
          id: item.id
        }).then((res) => {
          if (res.data.status) {
            this.msgList.find((itemFind) => itemFind.id === item.id).status = 2
            if (item.tag === '工序') {
              this.unread.tag--
            } else if (item.tag === '公司') {
              this.unread.company--
            } else if (item.tag === '系统') {
              this.unread.system--
            }
            this.unread.all--
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
        })
      }
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
          this.msgList.forEach((item) => {
            item.status = 2
          })
          this.unread = { all: 0,
            tag: 0,
            company: 0,
            system: 0
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleClick (tab, event) {
      this.noMore = false
      this.msgList = []
      this.pages = 1
      this.getNotify()
    },
    load () {
      this.pages++
      this.getNotify()
    }
  },
  mounted () {
    notifyNum().then((res) => {
      let data = res.data.data
      this.unread = {
        tag: data['工序'] || 0,
        system: data['系统'] || 0,
        company: data['公司'] || 0
      }
      this.unread.all = this.unread['tag'] + this.unread['system'] + this.unread['company']
    })
    this.getNotify()
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/msgList.less";
</style>
<style lang="less">
#msgList {
  .el-tabs__item {
    color: #666;
    font-weight: 400;
  }
  .el-badge__content.is-fixed {
    top: 7px;
    right: 4px;
  }
}
</style>
