<template>
  <div id="designFormTable">
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
          <div>80*190=2*15</div>
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
              <span>{{this.material_data.warpMaterialMain}}：主</span>
            </div>
            <div class="lost-raw-material material">
              <span>次要原料(经)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in material_data.warpMaterialOther"
                      :key="indexMaterial">{{itemMaterial.name}}</span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">经向排列</div>
              <div class="content">
                <div class="particulars">
                  <div class="list-box"
                       v-for="(value,key) in date2"
                       :key="key"
                       :style="{width: (100/12) * Object.keys(value).length + '%'}">
                    <div class="list">
                      <div v-for="(item,index,m) in value"
                           :key="index">
                        <span>{{index == 'main' ? "主" : "夹" + m}}</span>
                        <span>{{item}}</span>
                      </div>
                    </div>
                    <div>{{Object.keys(value).length * 1.5}}</div>
                  </div>
                </div>
                <div>正序6遍</div>
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
                      :key="indexMaterial">{{itemMaterial.name}}</span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">纬向排列</div>
              <div class="content">
                <div class="particulars">
                  <div class="list-box"
                       v-for="(value,key) in date2"
                       :key="key"
                       :style="{width: (100/12) * Object.keys(value).length + '%'}">
                    <div class="list">
                      <div v-for="(item,index,m) in value"
                           :key="index">
                        <span>{{index == 'main' ? "主" : "夹" + m}}</span>
                        <span>{{item}}</span>
                      </div>
                    </div>
                    <div>{{Object.keys(value).length * 1.5}}</div>
                  </div>
                </div>
                <div>倒序1遍</div>
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
        description: ''
      },
      weight: '',
      date2: {
        list1: {
          main: '11',
          jia1: '22',
          jia2: '653',
          jia3: '74'
        },
        list2: {
          main: '333',
          jia1: 'fajk',
          jia2: 'faf',
          jia3: 'gfd'
        },
        list3: {
          main: '333',
          jia1: '324',
          jia2: '524',
          jia3: '52'
        }
      },
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
