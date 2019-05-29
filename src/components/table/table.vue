<template>
  <ul id="table">
    <li class="col"
        :style="{width: (100/6) + '%',backgroundColor:'#EEE'}">
      <span>
        <span>{{data.size}}</span>
      </span>
      <span v-for="(item,key) in colorData"
            :key="key+item">
        <span>{{item}}</span>
      </span>
    </li>
    <li class="col"
        v-for="(item,key) in data.materialList"
        :key="key+item">
      <span>
        <span>{{item.material}}</span>
      </span>
      <template v-for="(value,index) in item.colorInfo">
        <span :key="index+value">
          <span v-for="(content,number) in addLen(setSizeInfo(value,key,index,data.materialList.length,item.colorInfo.length),key)"
                :key="number+content">
            <span>{{content.name}}</span>
            <span>{{content.number|fixedFilter}}{{((content.unit ==='克' || content.unit === '千克') ? (content.unit === '克' ? 'g' : 'kg') : content.unit)}}</span>
          </span>
          <template v-if="value.colorList.length === 0">
            <!-- {{value}} -->
            <span v-if="index === 0"></span>
            <template v-else>
              <span v-for="(content,number) in item.colorInfo[index-1].colorList"
                    :key='number'></span>
            </template>
          </template>
        </span>
      </template>
      <template v-if="item.colorInfo.length < colorData.length">
        <span v-for="(value,index) in addArr((colorData.length)-(item.colorInfo.length))"
              :key="index+value">
          <span v-for="(content,number) in addArr(lenArr[key],value)"
                :key="number+content"></span>
        </span>
      </template>
    </li>
    <template v-if="total < 6">
      <li class="col"
          v-for="(item,key) in addArr(6-total)"
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
      total: 1,
      colorData: []
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  props: [
    'date'
  ],
  methods: {
    setSizeInfo (item, nowA, nowB, lastA, lastB) {
      if (this.colorData.indexOf(item.name) === -1) {
        this.colorData.push(item.name)
      }
      if (nowA + 1 === lastA && nowB + 1 === lastB) {
        if (this.colorData.length < 3) {
          for (let i = (this.colorData.length ? this.colorData.length : 0); i < 3; i++) {
            this.colorData.push('')
          }
        }
      }
      return item.colorList
    },
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
    this.flag = this.$attrs.color
  }
}
</script>

<style scoped lang='less'>
@import "./table.less";
</style>
