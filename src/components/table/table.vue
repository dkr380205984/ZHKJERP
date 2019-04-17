<template>
  <ul id="table">
    <li class="col"
        :style="{width: (100/7) + '%',backgroundColor:'#EEE'}">
      <span>
        <span>{{data.size}}</span>
      </span>
      <span v-for="(item,key) in colorData"
            :key="key">
        <span>{{item.name}}</span>
      </span>
    </li>
    <li class="col"
        v-for="(item,key) in data.materialList"
        :key="key">
      <span>
        <span>{{item.material}}</span>
      </span>
      <span v-for="(value,index) in item.colorInfo"
            :key="index">
        <span v-for="(content,number) in addLen(value.colorList,key)"
              :key="number">
          {{content.name + ': '}}{{content.number + ((content.unit ==='克') ? 'g' : 'kg')}}
        </span>
      </span>
      <template v-if="item.colorInfo.length < colorData.length">
        <span v-for="(value,index) in addArr((colorData.length)-(item.colorInfo.length))"
              :key="index+1">
          <span v-for="(content,number) in addArr(lenArr[key],value)"
                :key="number+1"></span>
        </span>
      </template>
    </li>
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
      colorData: null
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
    console.log(this.colorDate)
    this.data = clone(this.date)
    this.colorData = clone(this.colorDate)
    this.flag = this.$attrs.color
    if (this.colorData.length < 3 || this.colorData === undefined) {
      for (let i = (this.colorData.length ? this.colorData.length : 0); i < 3; i++) {
        this.colorData.push({})
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "./table.less";
</style>
