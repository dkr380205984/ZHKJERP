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
                <span class="btn blue">普通</span>
              </div>
              <div class="btnCtn">
                <span class="btn yellow">重要</span>
              </div>
              <div class="btnCtn">
                <span class="btn red">紧急</span>
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
              <div class="btnCtn">
                <span class="btn normal active">所有人</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">A组</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">B组</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">C组</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">D组</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">岗位1</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">岗位2</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">岗位3</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">岗位4</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">岗位5</span>
              </div>
              <div class="btnCtn">
                <span class="btn normal">岗位6</span>
              </div>
            </div>
            <div class="content">
              <el-checkbox v-for="(item,index) in group"
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
              <el-tag size="medium"
                closable>张三
              </el-tag>
              <el-tag size="medium"
                closable>李四
              </el-tag>
              <el-tag size="medium"
                closable>张三三
              </el-tag>
              <el-tag size="medium"
                closable>小红
              </el-tag>
              <el-tag size="medium"
                closable>小黑
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBtnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn">发布</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      content: '',
      group: [{
        name: '张三',
        check: true
      }, {
        name: '李四',
        check: true
      }, {
        name: '王五',
        check: false
      }, {
        name: '小明明',
        check: false
      }, {
        name: '小红红',
        check: false
      }, {
        name: '小刚',
        check: false
      }, {
        name: '张三三',
        check: true
      }, {
        name: '李四四',
        check: false
      }, {
        name: '王五五',
        check: false
      }, {
        name: '小明',
        check: false
      }, {
        name: '小红',
        check: true
      }, {
        name: '小刚',
        check: false
      }, {
        name: '张三',
        check: false
      }, {
        name: '李四',
        check: false
      }, {
        name: '王五',
        check: false
      }, {
        name: '小明',
        check: false
      }, {
        name: '小红',
        check: false
      }, {
        name: '小刚',
        check: false
      }]
    }
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
