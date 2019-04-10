<template>
  <ul class="table">
    <template v-for="(item,index) in date">
      <li class="col"
          :key="index"
          :style="{width : (typeof(item.data[index]) != 'string' ) ? (2*(843/7) + 'px') : ((843/7) + 'px')}">
        <span v-for="(value,key) in item.data"
              :key="key">
          <template v-if="typeof(value) == 'string'">
            <span>
              {{value}}
            </span>
          </template>
          <template v-else>
            <span v-for="(c,n) in value"
                  :key="n">{{'黑色：' + c}}</span>
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
      date: [
        {
          name: 'S',
          data: ['黑白', '蓝紫', '灰绿']
        },
        {
          name: '52支单股上光晴纶',
          data: [
            {
              black: 460,
              while: 460
            },
            {
              blue: 460,
              purple: 460
            },
            {
              gray: 460,
              green: 460
            }
          ]
        },
        {
          name: '36支上光晴纶',
          data: [
            {
              black: 460,
              while: 460
            },
            {
              blue: 460,
              purple: 460
            },
            {
              gray: 460,
              green: 460
            }
          ]
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
@import "./table.less";
</style>
