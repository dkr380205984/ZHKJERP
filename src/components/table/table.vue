<template>
  <ul id="table">
    <li class="col"
        v-for="(item,index) in date"
        :key="index"
        :style="{minWidth : (typeof(item.data[0]) == 'object' ) ? (2*(100/7) + '%') : ((100/7) + '%')}">
      <span :style="{borderRight: index == date.length-1  ? 'none' : '1px solid #999'}">
        <span :style="{color: (flag && index == 0) ? flag : 'inherit'}">{{item.name}}</span>
      </span>
      <span v-for="(value,key) in item.data"
            :key="key"
            :style="{borderRight: index === date.length-1  ? 'none' : '1px solid #999',background : index === 0 ? '#EEE' : 'none' }">
        <template v-if="typeof(value) == 'string'">
          <span>
            {{value}}
          </span>
        </template>
        <template v-else>
          <span v-for="(c,n,v) in value"
                :key="n"
                :class="{haveBorder: v == 0}">{{'黑色：' + c + 'g' }}</span>
        </template>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      flag: '',
      num: '',
      left: 0
    }
  },
  props: [
    'date'
  ],
  methods: {
  },
  created () {
    for (let i = 0; i < this.date.length; i++) {
      if (typeof this.date[i].data[0] === 'object') {
        this.num += 2
      } else {
        this.num++
      }
    }
    if (this.num <= 7) {
      for (let i = this.num; i < 7; i++) { this.date.push({ name: '', data: ['', '', ''] }) }
    }
    this.flag = this.$attrs.color
  }
}
</script>

<style scoped lang='less'>
@import "./table.less";
</style>
