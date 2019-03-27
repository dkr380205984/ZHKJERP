<template>
  <div class="colorPicker">
    <!-- 占位符 -->
    <span class="placeHolder">{{content}}</span>
    <!-- input输入框,用于获取鼠标blur事件 -->
    <input class="getFocus" @click="flag = !flag" @blur="flag=false" :style="{'background':color}"/>
    <!-- 实际显示的文字 设置点透-->
    <span class="realContent">{{content}}</span>
    <div class="selectList" v-show="flag">
      <div class="selectListCtn">
        <div class="selectListChild" v-for="(item,index) in colorArr" :key="index" @mousedown="getColor(item.color_code,item.name)" node="colorPick">
          <div class="bgColorBlock" :style="{'background':item.color_code}"></div>
          <span class="bgColorLabel">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './colorPicker.less'
export default {
  props: ['value', 'colorArr', 'content'],
  data () {
    return {
      flag: false,
      color: this.value
    }
  },
  methods: {
    getColor (color, name) {
      this.color = color
      this.$emit('input', color)
      this.$emit('colorChange', {
        color: color,
        name: name
      })
    }
  }
}
</script>
