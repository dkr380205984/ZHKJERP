<template>
  <div id="tableCtn">
    <div class="tableRow titleTableRow">
      <div class="tableColumn">计划单编号</div>
      <div class="tableColumn">产品编号</div>
      <div class="tableColumn">产品类别</div>
      <div class="tableColumn">产品规格</div>
      <div class="tableColumn">主要原料</div>
      <div class="tableColumn">主要辅料</div>
      <div class="tableColumn">创建人</div>
      <div class="tableColumn">创建日期</div>
      <div class="tableColumn flex9">操作</div>
    </div>
    <div class="tableRow bodyTableRow"
         v-for="(item) in list"
         :key="item.id">
      <div class="tableColumn"
           style="color: rgb(26, 149, 255);">{{item.craft_code}}</div>
      <div class="tableColumn">{{item.product_info}}</div>
      <div class="tableColumn">{{item.product_class}}</div>
      <div class="tableColumn">{{item.material_data}}</div>
      <div class="tableColumn">{{item.weight}}</div>
      <div class="tableColumn">{{item.user}}</div>
      <div class="tableColumn">{{item.create_time}}</div>
      <div class="tableColumn flex9">
        <span class="btns success"
              @click="$router.push('/index/designFormDetail/'+item.id)">查看</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableList',
  data () {
    return {
      list: [
        {
          id: 1,
          craft_code: 'ES0010213',
          product_info: 'ES0010213',
          product_class: '围巾/针织/长巾/条纹',
          material_data: 'S码/M码',
          weight: '36支上光晴纶/52支…'

        }, {
          id: 2,
          craft_code: 'ES0010213',
          product_info: 'ES0010213',
          product_class: '围巾/针织/长巾/条纹',
          material_data: 'S码/M码',
          weight: '36支上光晴纶/52支…'

        }, {
          id: 3,
          craft_code: 'ES0010213',
          product_info: 'ES0010213',
          product_class: '围巾/针织/长巾/条纹',
          material_data: 'S码/M码',
          weight: '36支上光晴纶/52支…'

        }
      ]
    }
  },
  methods: {

  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      }
    },
    // 类型展示
    filterSize (item) {
      let str = ''
      for (let key in item) {
        str += key + '/'
      }
      return str.substring(0, str.length - 1)
    },
    // 经纬合并
    filterWeft (item) {
      if (item.warp_data && item.weft_data) {
        return item.warp_data.weft + '/' + item.weft_data.total
      } else {
        return '数据错误'
      }
    },
    // 原料合并
    filterMaterial (material) {
      let str = ''
      material.forEach((item) => {
        if (item.type === 0 && item.type_material === 0) {
          str += item.material_name + '/'
        }
      })
      material.forEach((item) => {
        if (item.type === 1 && item.type_material === 0) {
          str += item.material_name
        }
      })
      return str
    }
  }
}
</script>

<style scoped lang='less'>
@import "./tableList.less";
</style>
