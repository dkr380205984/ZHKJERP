<template>
  <ul id="table">
    <li class="col"
        :style="{width: (100/7) + '%',backgroundColor:'#EEE'}">
      <span>
        <span>{{data.size}}</span>
      </span>
      <span v-for="(item,key) in colorData"
            :key="key+item">
        <span>{{item.name}}</span>
      </span>
    </li>
    <li class="col"
        v-for="(item,key) in data.materialList"
        :key="key+item">
      <span>
        <span>{{item.material}}</span>
      </span>
      <span v-for="(value,index) in item.colorInfo"
            :key="index+value">
        <span v-for="(content,number) in addLen(value.colorList,key)"
              :key="number+content">
          {{content.name + ': '}}{{content.number + ((content.unit ==='克' || content.unit === 'g') ? 'g' : 'kg')}}
        </span>
      </span>
      <template v-if="item.colorInfo.length < colorData.length">
        <span v-for="(value,index) in addArr((colorData.length)-(item.colorInfo.length))"
              :key="index+value">
          <span v-for="(content,number) in addArr(lenArr[key],value)"
                :key="number+content"></span>
        </span>
      </template>
    </li>
    <template v-if="total < 7">
      <li class="col"
          v-for="(item,key) in addArr(7-total)"
          :key="key+item">
        <span v-for="(value,index) in addArr(colorData.length+1)"
              :key="index+value">
          <span></span>
        </span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      flag: '',
      num: '',
      left: 0,
      lenArr: {},
      data: null,
      colorData: null,
      total: 1
    }
  },
  props: [
    'date',
    'colorDate'
  ],
  methods: {
    addArr (num, item) {
      if (!item) {
        item = []
      }
      for (let i = 0; i < num; i++) {
        item.push([])
      }
      return item
    },
    addLen (item, key) {
      if (!this.lenArr[key]) {
        this.total += item.length
      }
      if (this.lenArr[key] < item.length || !this.lenArr[key]) {
        this.lenArr[key] = item.length
      }
      return item
    }
  },
  created () {
    function clone (item) {
      let obj = Object.prototype.toString.call(item) === '[object Array]' ? [] : {}
      for (let prop in item) {
        if (Object.prototype.toString.call(item[prop]) === '[object Array]') {
          obj[prop] = clone(item[prop])
        } else if (Object.prototype.toString.call(item[prop]) === '[object Object]') {
          obj[prop] = clone(item[prop])
        } else {
          obj[prop] = item[prop]
        }
      }
      return obj
    }
    this.data = clone(this.date)
    this.colorData = clone(this.colorDate)
    this.flag = this.$attrs.color
    if (this.colorData.length < 3 || this.colorData === undefined) {
      for (let i = (this.colorData.length ? this.colorData.length : 0); i < 3; i++) {
        this.colorData.push({})
      }
    }
    console.log(this.date)
  }
}
</script>

<style scoped lang='less'>
@import "./table.less";
</style>
