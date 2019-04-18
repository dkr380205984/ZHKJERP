<template>
  <div id="productPlanDetail">
    <div class="head">
      <h2>产品计划单详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">计划单编号:</span>
          <span class="content">{{plan_code}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content">{{product_info.product_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品名称:</span>
          <span class="content">{{product_info|filterType}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">{{product_info.flower_id}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品规格:</span>
          <span class="content contentLine"
                v-for="(item,key) in product_info.size"
                :key="key">
            <span class="size">{{key}}</span>
            <span class="sizeDetail">
              <span class="sizeOnce"
                    v-for="itemChild in item"
                    :key="itemChild.id">{{itemChild.size_name + '：' + itemChild.size_value + (itemChild.size_name == '克重' ? 'g' : 'cm')}}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">损耗比例:</span>
          <span class="content">8%</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要原料:</span>
          <div class="content tableBox">
            <template v-for="(item,index) in material_data.main_material">
              <yl-table color="#1A95FF"
                        :date='item'
                        :colorDate='color'
                        :key="index"
                        class="table" />
            </template>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要辅料:</span>
          <div class="content tableBox">
            {{material_data.main_ingredients.length !== 0 ? '' : '暂无信息'}}
            <template v-for="(item,index) in material_data.main_ingredients">
              <yl-table color="#1A05FF"
                        :date='item'
                        :colorDate='color'
                        class="table"
                        :key="index" />
            </template>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label change">外道加工流程:</span>
          <ul class="liucheng content">
            <li v-for="(item,index) in liucheng"
                :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="cancel"
                  @click="$router.go(-1)">返回</span>
            <span class="save"
                  @click="$router.push('/index/null')">修改</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productPlanOne } from '@/assets/js/api.js'
import ylTable from '@/components/table/table.vue'
export default {
  data () {
    return {
      liucheng: [],
      plan_code: '',
      product_info: {
        category_info: {
          product_category: ''
        },
        size: {}
      },
      color: [],
      material_data: {
        main_material: [],
        main_ingredients: []
      }
    }
  },
  components: {
    ylTable
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
    productPlanOne({
      id: this.$route.params.id
    }).then((res) => {
      const data = res.data.data
      console.log(data)
      this.plan_code = data.plan_code
      this.product_info = data.product_info
      this.liucheng = data.outside_precess
      this.color = data.product_info.color
      console.log(this.color)
      data.material_data.forEach(value => {
        let obj = {
          materialList: [],
          size: ''
        }
        let str = value.type === 0 ? this.material_data.main_material : this.material_data.main_ingredients
        let obj1 = {
          colorInfo: [],
          material: value.material
        }
        value.colour.forEach(index => {
          let obj2 = {
            colorList: [],
            name: index.name
          }
          index.color.forEach(key => {
            let obj3 = {
              name: key.name,
              value: key.value,
              unit: '',
              number: null
            }
            key.size.forEach(item => {
              obj3.unit = item.unit
              obj3.number = item.number
              if (str.length === 0) {
                obj.size = item.size
                obj2.colorList.push(clone(obj3))
                obj1.colorInfo.push(clone(obj2))
                obj.materialList.push(clone(obj1))
                str.push(clone(obj))
              } else {
                str.forEach((size, l) => {
                  if (size.size === item.size) {
                    size.materialList.forEach((material, m) => {
                      if (material.material === value.material) {
                        material.colorInfo.forEach((color, n) => {
                          if (color.name === index.name) {
                            color.colorList.push(clone(obj3))
                            return
                          }
                          if (n === material.colorInfo.length - 1 && color.name !== index.name) {
                            obj2.colorList.push(clone(obj3))
                            material.colorInfo.push(clone(obj2))
                          }
                        })
                      }
                      if (m === size.materialList.length - 1 && material.material !== value.material) {
                        obj2.colorList.push(clone(obj3))
                        obj1.colorInfo.push(clone(obj2))
                        size.materialList.push(clone(obj1))
                      }
                    })
                  }
                  if (l === str.length - 1 && size.size !== item.size) {
                    obj2.colorList.push(clone(obj3))
                    obj1.colorInfo.push(clone(obj2))
                    obj.materialList.push(clone(obj1))
                    str.push(clone(obj))
                  }
                })
              }
            })
          })
        })
        console.log(this.material_data)
      })
    })
  },
  beforeMount () {
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productPlanDetail.less";
</style>
