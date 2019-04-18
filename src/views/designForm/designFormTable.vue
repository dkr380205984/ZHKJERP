<template>
  <div id="designFormTable" @click.right='goTop'>
    <p class="company">{{companyName}}有限公司工艺单</p>
    <div class="table">
      <div class="page_header">
        <span>工艺单编号:{{craft_code}}</span>
        <span>创建时间：{{create_time}}</span>
      </div>
      <ul class="table-box">
        <li class="info">
          <div>产品名称</div>
          <div>{{product_info|filterType}}</div>
          <div>成分</div>
          <div>{{product_info.materials|filterIngredient}}</div>
          <div>产品编号</div>
          <div>{{product_info.product_code}}</div>
        </li>
        <li class="info">
          <div>规格</div>
          <div>
            {{product_info.size|filterSize}}
          </div>
          <div>克重</div>
          <div>{{weight}}g</div>
          <div>备注</div>
          <div>{{product_info.description}}</div>
        </li>
        <li class="main-arrange">
          <div class="title">主要原料及配色排列</div>
          <div class="content">
            <div class="main-raw-material material">
              <span>主要原料(经)</span>
              <span>{{this.material_data.warpMaterialMain}}</span>
            </div>
            <div class="lost-raw-material material">
              <span>次要原料(经)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in material_data.warpMaterialOther"
                      :key="indexMaterial">
                  {{itemMaterial.name}}:
                  <template v-for="(item,index) in itemMaterial.value">
                    {{item === 0 ? '主' : '夹' + item}}{{index+1 !== itemMaterial.value.length ? '/' : ''}}
                  </template>
                </span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">经向排列</div>
              <div class="content">
                <div class="particulars">
                  <div>
                    <span v-for="(item,key) in add(warp_data.warp_rank_bottom)"
                          :style="{minWidth : 100/12 + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                          :key="key">{{item === 'no' ? '' : (item === 0 ? '主' : '夹' + item)}}</span>
                  </div>
                  <div v-for="(item,key) in warp_data.warp_rank"
                       :key="key">
                    <template v-if="key === 0">
                      <span v-for="(item,key) in add(item)"
                            :style="{minWidth : (100/12) + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                            :key="key">
                        {{item === 'no' ? '' : item}}
                      </span>
                    </template>
                    <template v-else>
                      <span v-for="(value,index) in changeArr(add(item))"
                            :key="index"
                            :style="{minWidth : (100/12) * (item.length > 12 ? 12 : value.key) + '%',borderRight :'1px solid #999'}">
                        {{value.value === 'no' ? '' : value.value}}
                      </span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="warping">
          <div class="title">整经工艺</div>
          <div class="content">
            <div>
              <span>整经总头纹</span>
              <span class="unit">{{warp_data.weft}}</span>
              <span>边型</span>
              <span>{{warp_data.side_name}}</span>
            </div>
            <div>
              <span>整经门幅</span>
              <span>{{warp_data.width?warp_data.width:''}}</span>
              <span>机型</span>
              <span>{{warp_data.machine_name}}</span>
            </div>
          </div>
        </li>
        <li class="drafting">
          <div class="title">穿综筘工艺</div>
          <div class="content">
            <div class="drafting-info">
              <span>筘号</span>
              <span class="unit">{{warp_data.reed?warp_data.reed:''}}</span>
              <span>穿筘法</span>
              <span class="unit">{{warp_data.reed_method?warp_data.reed_method:''}}</span>
              <span>筘幅</span>
              <span class="unit">{{warp_data.reed_width?warp_data.reed_width:''}}</span>
              <span>综页</span>
              <span class="unit">{{warp_data.sum_up?warp_data.sum_up:''}}</span>
            </div>
            <div class="through-methods">
              <div class="through-title">穿综法</div>
              <div><span>{{warp_data.drafting_method?warp_data.drafting_method:''}}</span></div>
            </div>
          </div>
        </li>
        <li class="contexture">
          <div class="title">织造工艺</div>
          <div class="content">
            <div class="contexture-info">
              <span>组织法</span>
              <span>{{weft_data.organization_name}}</span>
              <span>机上坯幅</span>
              <span class="unit">{{weft_data.peifu}}</span>
              <span>纬密</span>
              <span class="unit">{{weft_data.weimi}}</span>
              <span>齿牙</span>
              <span class="unit">
                <span>上:{{weft_data.shangchiya?weft_data.shangchiya+'牙':''}}</span>
                <span>下:{{weft_data.xiachiya?weft_data.xiachiya+'牙':''}}</span>
              </span>
            </div>
            <div class="contexture-info">
              <span>让位要求</span>
              <span>内长</span>
              <span class="unit">{{weft_data.neichang}}</span>
              <span>让位</span>
              <span class="unit">{{weft_data.rangwei}}</span>
              <span>总计</span>
              <span class="unit">{{weft_data.total}}</span>
            </div>
            <div class="main-raw-material material">
              <span>主要原料(纬)</span>
              <span>{{this.material_data.weftMaterialMain}}</span>
            </div>
            <div class="lost-raw-material material">
              <span>次要原料(纬)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in material_data.weftMaterialOther"
                      :key="indexMaterial">
                  <template v-for="(item,index) in itemMaterial.value">
                    {{item === 0 ? '主' : '夹' + item}}{{index+1 !== itemMaterial.value.length ? '/' : ''}}
                  </template>
                  :{{itemMaterial.name}}</span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">纬向排列</div>
              <div class="content">
                <div class="particulars">
                  <div>
                    <span v-for="(item,key) in add(weft_data.weft_rank_bottom)"
                          :style="{minWidth : 100/12 + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                          :key="key">{{item === 'no' ? '' : (item === 0 ? '主' : '夹' + item)}}</span>
                  </div>
                  <div v-for="(item,key) in weft_data.weft_rank"
                       :key="key">
                    <template v-if="key === 0">
                      <span v-for="(item,key) in add(item)"
                            :style="{minWidth : (100/12) + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                            :key="key">
                        {{item === 'no' ? '' : item}}
                      </span>
                    </template>
                    <template v-else>
                      <span v-for="(value,index) in changeArr(add(item))"
                            :key="index"
                            :style="{minWidth : (100/12) * (item.length > 12 ? 12 : value.key) + '%',borderRight :'1px solid #999'}">
                        {{value.value === 'no' ? '' : value.value}}
                      </span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="match-colors">
          <div class="title">配色工艺</div>
          <div class="content">
            <div class="table-head-row">
              <div class="table-head">
                <span>颜色组</span>
                <span>具体配色</span>
              </div>
              <div v-for="(item,index) in forArr(7)"
                   :key="index">
                <div>{{index == 0 ? "主" : "夹" + index}}</div>
                <div>
                  <span>经</span>
                  <span>纬</span>
                </div>
              </div>
            </div>
            <ul class="list">
              <li v-for="(value,index) in forArr(6)"
                  :key="index">
                <div class="table-head-col">颜色组</div>
                <div v-for="(value,index) in forArr(7)"
                     :key="index">
                  <span>颜色</span>
                  <span v-if="index == 3 || index == 4 || index == 6">颜色</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { craftOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      craft_code: '',
      create_time: '',
      product_info: {
        materials: [],
        product_code: '',
        description: '',
        category_info: {
          product_category: ''
        },
        size: {}
      },
      weight: '',
      size: {},
      companyName: 'xx',
      material_data: {
        warpMaterialMain: '',
        warpMaterialOther: [],
        weftMaterialMain: '',
        weftMaterialOther: []
      },
      warp_data: {
        weft: '', // 整理总头纹,需要计算
        side_id: '',
        width: '',
        machine_id: '',
        reed: '',
        reed_method: '',
        reed_width: '',
        sum_up: '',
        drafting_method: ''
      },
      weft_data: {
        organization_id: '',
        peifu: '',
        weimi: '',
        shangchiya: '',
        xiachiya: '',
        neichang: '',
        rangwei: '',
        total: ''
      }
    }
  },
  methods: {
    forArr: (num) => {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push(i)
      }
      return arr
    },
    // 如果数据少于12条
    add (item) {
      let arr = []
      for (let prop in item) {
        arr.push(item[prop])
      }
      let len = arr.length
      if (len < 12) {
        for (len; len < 12; len++) {
          arr.push('no')
        }
      }
      return arr
    },
    // 处理数组
    changeArr (item) {
      let arr = []
      let obj = {}
      let n = 1
      let firstVal = ''
      item.forEach((value) => {
        if (value === '') {
          arr.push(1)
        } else {
          arr.push(value)
        }
      })
      let len = arr.length
      let arr2 = []
      let flag = true
      arr.forEach((value, index) => {
        if (value === 'no') {
          if (flag) {
            flag = false
            obj.value = firstVal
            obj.key = n
            arr2.push(obj)
          }
          arr2.push({ value: 'no', key: 1 })
        } else if (index === len - 1) {
          if (firstVal === value || value === null) {
            n++
          }
          obj.value = firstVal
          obj.key = n
          arr2.push(obj)
          if (firstVal !== value && value !== null) {
            obj = {}
            obj.value = value
            obj.key = 1
            arr2.push(obj)
          }
        } else if (value === null) {
          n++
        } else {
          if (value === firstVal) {
            n++
          } else {
            if (index !== 0) {
              obj.value = firstVal
              obj.key = n
              arr2.push(obj)
              obj = {}
            }
            firstVal = value
            n = 1
          }
        }
      })
      return arr2
    },
    goTop (e) {
      console.log(e)
    }
  },
  filters: {
    // 成分合并
    filterIngredient (item) {
      let str = ''
      item.forEach((value, index) => {
        str += (value.ingredient_value + '%' + value.ingredient_name)
        str += (index === (item.length - 1)) ? '' : '/'
      })
      return str
    },
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
    // 规格合并
    filterSize (item) {
      let str = ''
      for (let prop in item) {
        item[prop].forEach((value, index) => {
          str += (index === 0 ? '' : '*') + value.size_value
        })
      }
      return str
    }
  },
  beforeCreate () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      const data = res.data.data
      console.log(data)
      this.product_info = data.product_info
      this.craft_code = data.craft_code
      this.create_time = data.create_time
      this.weight = data.weight
      this.warp_data = data.warp_data
      this.weft_data = data.weft_data
      data.material_data.forEach((item) => {
        if (item.type === 0 && item.type_material === 0) {
          this.material_data.warpMaterialMain = item.material_name
        }
        if (item.type === 1 && item.type_material === 0) {
          this.material_data.weftMaterialMain = item.material_name
        }
        if (item.type === 0 && item.type_material === 1) {
          this.material_data.warpMaterialOther.push({
            name: item.material_name,
            value: item.apply
          })
        }
        if (item.type === 1 && item.type_material === 1) {
          this.material_data.weftMaterialOther.push({
            name: item.material_name,
            value: item.apply
          })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormTable.less";
</style>
