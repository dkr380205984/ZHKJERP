<template>
  <div class="colorPicker">
    <!-- 占位符 -->
    <span class="placeHolder">{{content}}</span>
    <!-- input输入框,用于获取鼠标blur事件 -->
    <input class="getFocus" @click="show" @blur="hide" :style="{'background':color}"/>
    <!-- 实际显示的文字 设置点透-->
    <span class="realContent">{{content}}</span>
    <div class="selectList" v-show="flag||flag2">
      <div class="selectListCtn">
        <div class="searchOpt">
          <input ref="search" type="text" placeholder="可搜索潘通色号" v-model="search" @mousedown="flag3=true" @blur="flag2=false"/>
        </div>
        <div class="selectListChild" v-for="(item,index) in colorArray" :key="index" @mousedown="getColor(item.color_code,item.name)" node="colorPick">
          <div class="bgColorBlock" :style="{'background':item.color_code}"></div>
          <span class="bgColorLabel">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './colorPicker.less'
import { pantongList } from '@/assets/js/api.js'
export default {
  props: ['value', 'colorArr', 'content'],
  data () {
    return {
      flag: false,
      flag2: false,
      flag3: false,
      color: this.value.color,
      oldColorArr: this.colorArr, // 原始数据
      colorArray: this.colorArr,
      search: ''
    }
  },
  watch: {
    search (newVal) {
      if (!newVal) {
        this.colorArray = this.oldColorArr.filter((item) => {
          return item.name.indexOf(newVal) !== -1
        })
      } else {
        pantongList({
          keyword: newVal
        }).then((res) => {
          this.colorArray = this.oldColorArr.filter((item) => {
            return item.name.indexOf(newVal) !== -1
          }).concat(res.data.data)
        })
      }
    }
  },
  methods: {
    show () {
      this.flag = !this.flag
      this.flag2 = !this.flag2
    },
    hide (ev) {
      this.flag = false
      if (!this.flag3) {
        this.flag2 = false
      }
    },
    getColor (color, name) {
      this.color = color
      this.$emit('input', {
        color: color,
        name: name
      })
      this.$emit('colorChange', {
        color: color,
        name: name
      })
    }
  }
}
</script>
