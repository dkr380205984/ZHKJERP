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
            <yl-table color="#1A95FF"
                      :date='productDetail.date1'
                      class="table" />
            <yl-table color="#1A95FF"
                      :date='productDetail.date2'
                      class="table marT" />
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">主要辅料:</span>
          <div class="content tableBox">
            <yl-table color="#1A95FF"
                      :date='productDetail.date1'
                      class="table" />
            <yl-table color="#1A95FF"
                      :date='productDetail.date3'
                      class="table marT" />
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label change">外道加工流程:</span>
          <ul class="liucheng content">
            <li v-for="(item,index) in productDetail.liucheng"
                :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="cancel"
                  @click="cancel">取消</span>
            <span class="save"
                  @click='save'>保存</span>
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
      productDetail: {
        size: {},
        date1: [
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
        ],
        date2: [
          {
            name: 'M',
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
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          }
        ],
        date3: [
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
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
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
          },
          {
            name: '14支涤纶',
            data: ['120g', '120g', '120g']
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
          }
        ],
        liucheng: []
      },
      plan_code: '',
      product_info: {
        category_info: {
          product_category: ''
        },
        size: {}
      },
      color: [],
      material_data: []
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
  methods: {
    cancel () {

    },
    save () {

    }
  },
  created () {
    productPlanOne({
      id: this.$route.params.id
    }).then((res) => {
      const data = res.data.data
      console.log(data)
      this.plan_code = data.plan_code
      this.product_info = data.product_info
      this.productDetail.liucheng = data.outside_precess
      data.material_data.forEach(value => {
        let obj = {}
        obj.main_material = []
        if (value.type === 0) {
          obj.type = 0
          let material = {}
          material.name = value.material
          material.colorInfo = {}
          value.colour.forEach(index => {
            console.log(index)
            material.colorInfo.colorClass = index.name
          })
          obj.main_material.push(material)
        }
        this.material_data.push(obj)
      })
      console.log(this.material_data)
    })
  },
  beforeMount () {
    // console.log(this.color)
    // console.log(this.material_data)
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productPlanDetail.less";
</style>
