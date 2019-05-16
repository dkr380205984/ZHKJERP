<template>
  <div id="rawMaterialProcessTable"
       @click.right="goTop">
    <h2>{{company_name + '染色单'}}</h2>
    <div class="processCodeTime">
      <span>染色单编号：{{process_code}}</span>
      <span>创建时间：{{create_time}}</span>
    </div>
    <div class="tableBox">
      <div>
        <span>
          <span>订单号</span>
          <span>{{order_code}}</span>
          <span>下单日期</span>
          <span>{{create_date}}</span>
        </span>
        <span>
          <span>订单公司</span>
          <span>{{order_company}}</span>
          <span>负责小组</span>
          <span>{{ground_name}}</span>
        </span>
      </div>
      <div>
        <span>
          <span>染色单位</span>
          <span>{{process_company}}</span>
          <span>联系人电话</span>
          <span>{{linkman_tel}}</span>
        </span>
        <span>
          <span>总价</span>
          <span>{{total_price + '元'}}</span>
          <span>联系人</span>
          <span>{{linkman}}</span>
        </span>
      </div>
      <div>
        <ul v-for="(item,key) in process_info"
            :key="key">
          <li>
            <span>原料名称</span>
            <span>{{item.material}}</span>
            <span>合计</span>
            <span>{{item.total_weight + 'kg'}}</span>
          </li>
          <li v-for="(val,ind) in item.color_info"
              :key="ind">
            <span>颜色重量</span>
            <span>
              {{val.name}}
              <span>{{val.value + val.unit}}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="remark">
        <span>
          <span>备注</span>
          <span></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      company_name: '桐庐凯瑞针纺有限公司',
      process_code: 'KR19RS00001',
      create_time: '2019-04-24',
      order_code: 'ES6728392',
      create_date: '2019-03-24',
      order_company: '飞泰',
      ground_name: 'A组',
      process_company: '杭州锦欣染色公司',
      linkman_tel: '13111111111',
      linkman: '马云',
      total_price: 25000,
      process_info: [
        {
          material: '52支上光晴纶',
          total_weight: 0,
          color_info: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '黑色',
              value: 215.6,
              unit: 'kg'
            }
          ]
        }, {
          material: '36支上光晴纶',
          total_weight: 0,
          color_info: [
            {
              name: '卡其色',
              value: 28.4,
              unit: 'kg'
            }, {
              name: '本白',
              value: 15.6,
              unit: 'kg'
            }
          ]
        }, {
          material: '52支上光晴纶',
          total_weight: 0,
          color_info: [
            {
              name: '深紫',
              value: 2810.4,
              unit: 'kg'
            }, {
              name: '天空蓝',
              value: 2015.6,
              unit: 'kg'
            }, {
              name: '浅紫',
              value: 2810.4,
              unit: 'kg'
            }, {
              name: '深蓝',
              value: 2015.6,
              unit: 'kg'
            }
          ]
        }
      ]
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    }
  },
  created () {
    this.process_info.forEach((item, key) => {
      item.color_info.forEach((val, ind) => {
        item.total_weight = Number(item.total_weight) + Number(val.value)
      })
      console.log(item.total_weight)
    })
  },
  updated () {
    this.loading = false
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/css/rawMaterialProcessTable.less";
</style>
<style lang="less">
html {
  overflow: visible;
}
body {
  overflow: visible;
}
</style>
