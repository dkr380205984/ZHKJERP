<template>
  <div id="msgList">
    <div class="head">
      <h2>全部消息列表</h2>
    </div>
    <div class="body">
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane name="1">
          <el-badge :value="999"
            slot="label"
            :max="99"
            class="item">全部通知</el-badge>
        </el-tab-pane>
        <el-tab-pane name="2">
          <el-badge :value="3"
            slot="label"
            :max="99"
            class="item">工序通知</el-badge>
        </el-tab-pane>
        <el-tab-pane name="3">
          <el-badge :value="5"
            slot="label"
            :max="99"
            class="item">公司通知</el-badge>
        </el-tab-pane>
        <el-tab-pane name="4">
          <el-badge :value="200"
            slot="label"
            :max="99"
            class="item">系统通知</el-badge>
        </el-tab-pane>
      </el-tabs>
      <div class="scrollWarp">
        <div class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <div v-for="i in count"
            :key="i"
            class="oneMsg">
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
        </div>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '1',
      count: 15,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 30
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
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
