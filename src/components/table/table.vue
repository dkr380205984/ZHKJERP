<template>
  <ul id="table">
    <li class="col"
        :style="{width: (100/7) + '%',backgroundColor:'#EEE'}">
      <span>{{date.size}}</span>
      <span v-for="(item,key) in colorDate"
            :key="key">{{item.name}}</span>
    </li>
    <li class="col"
        v-for="(item,key) in date.materialList"
        :key="key"
        :style="{width : item.colorInfo}">
      <span>
        <span>{{item.material}}</span>
      </span>
      <span v-for="(value,index) in item.colorInfo"
            :key="index">
        <span v-for="(content,number) in value.colorList"
              :key="number">{{content.name + ': '}}{{content.number + ((content.unit ==='克') ? 'g' : 'kg')}}</span>
      </span>
      <template v-if="item.colorInfo.length < colorDate.length">
        <span v-for="(value,index) in addArr((colorDate.length)-(item.colorInfo.length))"
              :key="index+1">
          <span v-for="(content,number) in addArr(6,value)"
                :key="number+1"></span>
        </span>
      </template>
    </li>
    <!-- v-for="(item,index) in date" :key="index" -->
    <!-- <li class="col"
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
    </li> -->
  </ul>
</template>

<script>
export default {
  data () {
    return {
      flag: '',
      num: '',
      left: 0,
      lenArr: []
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
      console.log(item)
      return item
    }
  },
  created () {
    console.log(this.date)
    this.flag = this.$attrs.color
    this.date.materialList.forEach(material => {
      console.log(material)
    })
  }
}
</script>

<style scoped lang='less'>
@import "./table.less";
</style>
