<template>
  <div class="myMessage"
    v-show="visible">
    <div class="main">
      <div class="top">
        <span>消息通知</span>
        <i class="el-icon-close"
          @click="closeWin"></i>
      </div>
      <div class="center">
        <div class="line">
          <span class="label">通知类型：</span>
          <div class="content">
            <div class="btnCtn">
              <span class="btn blue active">普通</span>
            </div>
            <div class="btnCtn">
              <span class="btn yellow">重要</span>
            </div>
            <div class="btnCtn">
              <span class="btn red">紧急</span>
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
        <div class="line">
          <span class="label">已选成员：</span>
          <div class="content">
            <el-tag size="mini"
              closable>张三
            </el-tag>
            <el-tag size="mini"
              closable>李四
            </el-tag>
            <el-tag size="mini"
              closable>张三三
            </el-tag>
            <el-tag size="mini"
              closable>小红
            </el-tag>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btnCtn">
          <div class="btn">取消</div>
          <div class="btn blue"
            @click="sendMsg">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './message.less'
export default {
  props: {
    source: {
      required: true,
      validator: function (value) {
        let source = ['产品添加', '产品修改', '工艺单添加', '工艺单修改', '样品添加', '样品修改']
        if (source.indexOf(value) === -1) {
          console.warn('消息来源不正确，请输入正确来源：', source)
        }
        return source.indexOf(value) !== -1
      }
    },
    visible: {
      type: Boolean,
      required: true
    },
    content: {
      type: String,
      required: false
    },
    type: {
      default: 0
    },
    // 默认标题
    defaultTitle: {
      default: '您有一条消息通知',
      required: false
    },
    // 默认选择成员
    defaultGroup: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      title: this.defaultTitle,
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
  },
  watch: {

  },
  methods: {
    sendMsg () {

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

  }
}
</script>
