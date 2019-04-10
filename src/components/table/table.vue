<template>
  <ul id="table">
    <template v-for="(item,index) in date">
      <li class="col"
          :key="index"
          :style="{flex: (typeof(item.data[index]) != 'string' ) ? '2' : 1,
                    minWidth : (typeof(item.data[index]) != 'string' ) ? (2*(843/7) + 'px') : ((843/7) + 'px'),

                  }">
        <span><span :style="{color: (flag && index == 0) ? flag : 'inherit' }">{{item.name}}</span></span>
        <span v-for="(value,key) in item.data"
              :key="key">
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
    </template>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      flag: '',
    }
  },
  props:[
    'date'
  ],
  methods: {

  },
  created(){
    // console.log(this.$el.attributes.color);
    this.flag = this.$attrs.color;
    console.log(this.flag)
  }
}
</script>

<style scoped lang='less'>
@import "./table.less";
</style>
