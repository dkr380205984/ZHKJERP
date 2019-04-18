<template>
  <div id="productDesignTable">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>桐庐凯瑞针纺有限公司原料统计单</h2>
        </div>
        <div class="info">
          <span>订单编号：<em class="bold12">kr19rm00001</em></span>
          <span>创建日期：2019-03-26</span>
        </div>
      </li>
      <li class="information">
        <span>订单号</span>
        <span>ES6728392</span>
        <span>下单日期</span>
        <span>2019-04-27</span>
      </li>
      <li class="information">
        <span>订单公司</span>
        <span>飞泰</span>
        <span>负责组</span>
        <span>A组</span>
      </li>
      <li class="size-info">
        <div class="title">产品详情</div>
        <div class="content">
          <div v-for="(item,key) in InfoList"
               :key="key">
            {{key}}
            <template v-for='value in item'>
              <span :key='value.name'>{{value.name}}</span>
              <span :key='value.value+value.unit'>{{value.value + value.unit}}</span>
            </template>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <ul class="size-table"
            v-for="(item,key) in list"
            :key="key">
          <li>
            <span>原料名称</span>
            <span>{{item.material}}</span>
            <span>合计</span>
            <span>{{item.total + 'kg'}}</span>
          </li>
          <li v-for="(value,index) in item.colors"
              :key="index">
            <span>颜色重量</span>
            <span>{{value.name + " "+value.value+value.unit}}</span>
          </li>
        </ul>
      </li>
      <li class="beizhu">备注：</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      InfoList: {
        '19ABC001': [
          {
            name: '围巾/针织/长巾/豹纹',
            value: 5000,
            unit: '条'
          }
        ],
        '19BBB002': [
          {
            name: '手套/针织/半指/卡通',
            value: 5000,
            unit: '个'
          }
        ],
        '19CCC003': [
          {
            name: '帽子/针织/吊球/卡通',
            value: 5000,
            unit: '顶'
          }
        ]
      },
      list: [
        {
          material: '52支上光晴纶',
          total: 562.8,
          colors: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            }
          ]
        }, {
          material: '36支上光晴纶',
          total: 562.8,
          colors: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            }
          ]
        }, {
          material: '48支上光晴纶',
          total: 562.8,
          colors: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            },
            {
              name: '黑色',
              value: 281.4,
              unit: 'kg'
            }
          ]
        }
      ]
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productStatisticsTable.less";
</style>
