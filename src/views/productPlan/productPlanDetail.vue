<template>
  <div id="productPlanDetail">
    <div class="head">
      <h2>配料单详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <span class="stepTitle">产品信息</span>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品编号:</span>
            <span class="content">{{product_info.product_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品名称:</span>
            <span class="content">{{product_info.product_title}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品品类:</span>
            <span class="content">{{product_info|filterType}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品花型:</span>
            <span class="content">{{product_info.flower_id}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品成分:</span>
            <span class="content">{{product_info.materials}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">配色色组:</span>
            <span class="content">{{product_info.color.map(item=>{return item.name}).join('/')}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">规格尺码:</span>
            <span class="content contentLine"
              v-for="(item,index) in product_info.size"
              :key="index">
              <span class="size"
                style="margin-right:15px">{{item.measurement}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce">
                  {{item.size_info}}
                </span>
                <span class="sizeOnce">
                  克重：{{item.weight}}g
                </span>
                <!-- <span class="sizeOnce">
                  净重：{{weight_group[index]}}g
                </span> -->
              </span>
            </span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品描述:</span>
            <span class="content">{{product_info.miaoshu}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品图片:</span>
            <span class="content">
              <img v-if="product_info.img.length === 0"
                class="img"
                src="@/assets/image/index/noPic.jpg" />
              <img v-for="(item,index) in product_info.img"
                :key="index"
                class="img"
                :src="item.image_url"
                :onerror="defaultImg" />
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <span class="stepTitle">配料信息</span>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">净重损耗:</span>
            <span class="content">
              <span v-for="(loss,size) in loss"
                :key="size">
                <span style="margin-right:28px;">{{size}}</span>
                <span style="margin-right:28px;">{{loss.weight + 'g'}}</span>
                <span>{{loss.prop}}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">纱线原料:</span>
            <div class="content tableBox">
              <template v-for="(item,index) in material_data.main_material">
                <yl-table color="#1A95FF"
                  :date='item'
                  :key="index"
                  :class="{'maT': (index !== 0)}" />
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
                  :class="{'marT': (index !== 0)}"
                  :key="index" />
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="lineCtn">
        <div class="inputCtn">
          <span class="label change">外道加工流程:</span>
          <ul class="liucheng content">
            <li v-for="(item,index) in liucheng"
              :key="index">{{item}}</li>
          </ul>
        </div>
      </div> -->
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="goBack"
              @click="$router.go(-1)">返回</span>
            <span class="change"
              @click="$router.push('../productPlanUpdate/' + product_info.product_code)">修改</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productPlanOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      liucheng: [],
      plan_code: '',
      product_info: {
        category_info: {
          product_category: ''
        },
        size: [],
        color: [],
        marterials: '',
        img: []
      },
      color: [],
      material_data: {
        main_material: [],
        main_ingredients: []
      },
      weight: {},
      loss: {},
      weight_group: []
    }
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
    productPlanOne({
      id: this.$route.params.id
    }).then((res) => {
      const data = res.data.data
      this.plan_code = data.plan_code
      this.product_info = data.product_info
      this.product_info.materials = this.product_info.materials.map(item => { return item.ingredient_value + '%' + item.ingredient_name }).join('/')
      this.liucheng = data.outside_precess
      this.color = data.product_info.color
      this.weight_group = data.weight_group
      data.material_data.forEach((value, n) => {
        let str = (value.type === 0 ? this.material_data.main_material : this.material_data.main_ingredients)
        value.colour.forEach(index => {
          index.color.forEach(key => {
            key.size.forEach(item => {
              if (str.length === 0) {
                let obj = {}
                obj.size = item.size
                obj.materialList = []
                let materialList = {}
                materialList.material = value.material
                materialList.remark = value.remark
                materialList.colorInfo = []
                let colorInfo = {}
                colorInfo.name = index.name
                colorInfo.colorList = []
                let colorList = {}
                colorList.name = key.name
                colorList.value = key.value
                colorList.number = item.number
                colorList.unit = item.unit
                colorInfo.colorList.push(colorList)
                materialList.colorInfo.push(colorInfo)
                obj.materialList.push(materialList)
                str.push(obj)
              } else {
                let flag3 = true
                str.forEach((size, n) => {
                  let flag2 = true
                  if (size.size === item.size) {
                    flag3 = false
                    size.materialList.forEach((material, m) => {
                      let flag1 = true
                      if (material.material === value.material) {
                        flag2 = false
                        material.colorInfo.forEach((color, b) => {
                          if (color.name === index.name) {
                            flag1 = false
                            color.colorList.push({
                              name: key.name,
                              value: key.value,
                              number: item.number,
                              unit: item.unit
                            })
                          } else if (b === material.colorInfo.length - 1 && color.name !== index.name && flag1) {
                            material.colorInfo.push({
                              name: index.name,
                              colorList: [{
                                name: key.name,
                                value: key.value,
                                number: item.number,
                                unit: item.unit
                              }]
                            })
                          }
                        })
                      } else if (m === size.materialList.length - 1 && material.material !== value.material && flag2) {
                        size.materialList.push({
                          material: value.material,
                          remark: value.remark,
                          colorInfo: [{
                            name: index.name,
                            colorList: [{
                              name: key.name,
                              value: key.value,
                              number: item.number,
                              unit: item.unit
                            }]
                          }]
                        })
                      }
                    })
                  } else if (n === str.length - 1 && size.size !== item.size && flag3) {
                    str.push({
                      size: item.size,
                      materialList: [{
                        material: value.material,
                        remark: value.remark,
                        colorInfo: [{
                          name: index.name,
                          colorList: [{
                            name: key.name,
                            value: key.value,
                            number: item.number,
                            unit: item.unit
                          }]
                        }]
                      }]
                    })
                  }
                })
              }
            })
          })
        })
      })
      this.material_data.main_material.forEach(item => {
        this.weight[item.size] = 0
        item.materialList.forEach((key, n) => {
          key.colorInfo.forEach((value, m) => {
            if (m === 0) {
              value.colorList.forEach(index => {
                this.weight[item.size] += Number(index.number)
              })
            }
          })
        })
      })
      let index = 0
      for (let prop in this.weight) {
        this.loss[prop] = {
          prop: ((this.weight[prop] - this.weight_group[index]) / this.weight_group[index] * 100).toFixed(2) + '%',
          weight: this.weight_group[index]
        }
        index++
      }
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productPlanDetail.less";
</style>
