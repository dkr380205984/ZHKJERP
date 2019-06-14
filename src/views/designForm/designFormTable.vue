<template>
  <div id="designFormTable"
    @click.right='goTop'>
    <div class="table">
      <p class="company">桐庐凯瑞针纺有限公司工艺单</p>
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
              <span>
                {{material_data.warpMaterialMain.name + ':'}}
                <template v-for="(item,index) in material_data.warpMaterialMain.value">
                  {{item === 0 ? '主' : '夹' + item}}{{index+1 !== material_data.warpMaterialMain.value.length ? '/' : ''}}
                </template>
              </span>
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
                <div class="particulars"
                  v-if="warp_data.warp_rank_bottom.length < 13 && weft_data.weft_rank_bottom.length < 13">
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
                        :style="{minWidth : (100/12) * value.key + '%',borderRight :'1px solid #999'}">
                        {{value.value === 'no' ? '' : value.value}}
                      </span>
                    </template>
                  </div>
                </div>
                <span v-else>见附件</span>
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
                <span>上:{{weft_data.shangchiya?weft_data.shangchiya:''}}</span>
                <span>下:{{weft_data.xiachiya?weft_data.xiachiya:''}}</span>
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
              <span>
                {{this.material_data.weftMaterialMain.name}}:
                <template v-for="(item,index) in material_data.weftMaterialMain.value">
                  {{item === 0 ? '主' : '夹' + item}}{{index+1 !== material_data.weftMaterialMain.value.length ? '/' : ''}}
                </template>
              </span>
            </div>
            <div class="lost-raw-material material">
              <span>次要原料(纬)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in material_data.weftMaterialOther"
                  :key="indexMaterial">{{itemMaterial.name}}:
                  <template v-for="(item,index) in itemMaterial.value">
                    {{item === 0 ? '主' : '夹' + item}}{{index+1 !== itemMaterial.value.length ? '/' : ''}}
                  </template>
                </span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">纬向排列</div>
              <div class="content">
                <div class="particulars"
                  v-if="weft_data.weft_rank_bottom.length < 13 && warp_data.warp_rank_bottom.length < 13">
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
                        :style="{minWidth : (100/12) * value.key + '%',borderRight :'1px solid #999'}">
                        {{value.value === 'no' ? '' : value.value}}
                      </span>
                    </template>
                  </div>
                </div>
                <span v-else>见附件</span>
              </div>
            </div>
          </div>
        </li>
        <li class="match-colors">
          <div class="title">配色工艺</div>
          <div class="content">
            <template v-if="color_data.length < 7">
              <div class="table-head-row">
                <div class="table-head">
                  <span>颜色组</span>
                  <span>具体配色</span>
                </div>
                <div v-for="(item,index) in forArr(6)"
                  :key="index">
                  <div>{{index === 0 ? "主" : "夹" + index}}</div>
                  <div>
                    <span>经</span>
                    <span>纬</span>
                  </div>
                </div>
              </div>
              <ul class="list">
                <li>
                  <div class="table-head-col">克重</div>
                  <div v-for="(val,ind) in forArr(6)"
                    :key="ind + 'a'">
                    <span :style="{fontSize:smallFont(weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.warp ? weight_info[ind].data.warp.weight + 'g' : '') : '') : '') ? '10px' : false}">{{weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.warp ? weight_info[ind].data.warp.weight + 'g' : '') : '') : ''}}</span>
                    <span :style="{fontSize:smallFont(weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.weft ? weight_info[ind].data.weft.weight + 'g' : '') : '') : '') ? '10px' : false}">{{weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.weft ? weight_info[ind].data.weft.weight + 'g' : '') : '') : ''}}</span>
                  </div>
                </li>
                <template v-for="(value,index) in color_data">
                  <li v-if='index < 5'
                    :key="index">
                    <div class="table-head-col">{{value.product_color}}</div>
                    <div v-for="(item,key) in value.color_scheme"
                      :key="key">
                      <span :style="{fontSize:smallFont(item.warp.name) ? '10px' : false}">{{item.warp.name}}</span>
                      <span :style="{fontSize:smallFont(item.weft.name) ? '10px' : false}">{{item.weft ? item.weft.name : ''}}</span>
                    </div>
                    <template v-if="value.color_scheme.length<6">
                      <div v-for="(x,y) in forArr( 6 - value.color_scheme.length)"
                        :key="y+'1'">
                        <span></span>
                        <span></span>
                      </div>
                    </template>
                  </li>
                </template>

                <template v-if="color_data.length < 6">
                  <li v-for="(b,cdf) in forArr(6 - color_data.length)"
                    :key="cdf+b">
                    <div class="table-head-col"></div>
                    <div v-for="(item,key) in forArr(6)"
                      :key="key+item">
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                </template>
              </ul>
            </template>
            <template v-else>
              <span>
                见附件
              </span>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="outTable-arrangement"
      v-if="warp_data.warp_rank_bottom.length > 12">
      <div class="code">
        <div class="title">工艺单编号:</div>
        <div class="content">{{craft_code}}</div>
      </div>
      <div class="warp-wise-arrange">
        <div class="title">经向排列:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (a,b) in add(warp_data.warp_rank_bottom,'all')"
            :key="b">
            <div>
              <span v-for="(item,key) in add(warp_data.warp_rank_bottom,b)"
                :style="{minWidth : 100/12 + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 'no' ? '' : (item === 0 ? '主' : '夹' + item)}}</span>
            </div>
            <div v-for="(item,key) in warp_data.warp_rank"
              :key="key">
              <template v-if="key === 0">
                <span v-for="(val,ind) in add(item,b)"
                  :style="{minWidth : (100/12) + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                  :key="ind">
                  {{val === 'no' ? '' : val}}
                </span>
              </template>
              <template v-else>
                <span v-for="(value,index) in changeArr(add(item,b))"
                  :key="index"
                  :style="{minWidth : (100/12) * value.key + '%',borderRight :'1px solid #999',background: (consol(item,b,value,index) && value.value !== 'no') ? 'rgb(240,240,240)' : false}">
                  {{value.value === 'no' ? '' : value.value}}
                  <!-- <span v-if="consol(item,b,value,index) && value.value !== 'no'"
                    class="jiantou">
                    <span v-if="consol(item,b,value,index,true) === '' && b !== 0 && b !== add(warp_data.warp_rank_bottom,'all').length -1"></span>
                    <span v-else-if="(((item[(b + 1) * 12] === item[(b + 1) * 12 - 1] && item[( b + 1 ) * 12 ] === '' ) || item[(b + 1) * 12] === null) && index === changeArr(add(item, b)).length - 1)"
                      class="el-icon-back left"></span>
                    <span v-else-if="(((item[b * 12] === item[b * 12 - 1] && item[b * 12] === '') || item[b * 12] === null) && index === 0 && b !== 0)"
                      class="el-icon-back right"></span>
                  </span> -->
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="warp-wise-arrange">
        <div class="title">纬向排列:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (a,b) in add(weft_data.weft_rank_bottom,'all')"
            :key="b">
            <div>
              <span v-for="(item,key) in add(weft_data.weft_rank_bottom,b)"
                :style="{minWidth : 100/12 + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 'no' ? '' : (item === 0 ? '主' : '夹' + item)}}</span>
            </div>
            <div v-for="(item,key) in weft_data.weft_rank"
              :key="key">
              <template v-if="key === 0">
                <span v-for="(items,key) in add(item,b)"
                  :style="{minWidth : (100/12) + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                  :key="key">
                  {{items === 'no' ? '' : items}}
                </span>
              </template>
              <template v-else>
                <span v-for="(value,index) in changeArr(add(item,b))"
                  :key="index"
                  :style="{minWidth : (100/12) * value.key + '%',borderRight :'1px solid #999',background: consol(item,b,value,index) && value.value !== 'no' ? 'rgb(240,240,240)' : false}">
                  {{value.value === 'no' ? '' : value.value}}

                  <span v-if="consol(item,b,value,index) && value.value !== 'no' "
                    class="jiantou">
                    <span v-if="consol(item,b,value,index,true) === '' && b !== 0 && b !== add(weft_data.weft_rank_bottom,'all').length -1"></span>
                    <span v-else-if="(((item[(b + 1) * 12] === item[(b + 1) * 12 - 1] && item[( b + 1 ) * 12 ] === '' ) || item[(b + 1) * 12] === null) && index === changeArr(add(item, b)).length - 1)"
                      class="el-icon-back left"></span>
                    <span v-else-if="(((item[b * 12] === item[b * 12 - 1] && item[b * 12] === '') || item[b * 12] === null) && index === 0 && b !== 0)"
                      class="el-icon-back right"></span>
                  </span>
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="outTable-color"
      v-if='color_data.length > 6'>
      <div class="code">
        <div class="title">工艺单编号:</div>
        <div class="content">{{craft_code}}</div>
      </div>
      <div class="content">
        <div class="table-head-row">
          <div class="table-head">
            <span>颜色组</span>
            <span>具体配色</span>
          </div>
          <div v-for="(item,index) in forArr(6)"
            :key="index">
            <div>{{index === 0 ? "主" : "夹" + index}}</div>
            <div>
              <span>经</span>
              <span>纬</span>
            </div>
          </div>
        </div>
        <ul class="list">
          <li>
            <div class="table-head-col">克重</div>
            <div v-for="(val,ind) in forArr(6)"
              :key="ind">
              <span :style="{fontSize:smallFont(item.warp.name) ? '10px' : false}">{{ + 'g'}}</span>
              <span :style="{fontSize:smallFont(item.weft.name) ? '10px' : false}">{{ + 'g'}}</span>
            </div>
          </li>
          <template v-for="(value,index) in color_data">
            <li v-if='index < 5'
              :key="index">
              <div class="table-head-col">{{value.product_color}}</div>
              <div v-for="(item,key) in value.color_scheme"
                :key="key">
                <span :style="{fontSize:smallFont(item.warp.name) ? '10px' : false}">{{item.warp.name}}</span>
                <span :style="{fontSize:smallFont(item.weft.name) ? '10px' : false}">{{item.weft ? item.weft.name : ''}}</span>
              </div>
              <template v-if="value.color_scheme.length < 6">
                <div v-for="(x,y) in forArr( 6 - value.color_scheme.length)"
                  :key="y">
                  <span></span>
                  <span></span>
                </div>
              </template>
            </li>
            <template v-if="color_data.length < 6">
              <li v-for="(value,index) in forArr(6 - color_data.length)"
                :key="index+'1'">
                <div class="table-head-col"></div>
                <div v-for="(item,key) in forArr(6)"
                  :key="key+'1'">
                  <span></span>
                  <span></span>
                </div>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { craftOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      weight_info: {},
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
      // companyName: 'xx',
      material_data: {
        warpMaterialMain: {
          name: '',
          value: []
        },
        warpMaterialOther: [],
        weftMaterialMain: {},
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
        drafting_method: '',
        warp_rank_bottom: []
      },
      weft_data: {
        organization_id: '',
        peifu: '',
        weimi: '',
        shangchiya: '',
        xiachiya: '',
        neichang: '',
        rangwei: '',
        total: '',
        weft_rank_bottom: []
      },
      color_data: []
    }
  },
  methods: {
    consol (item, b, value, index, fleg) {
      // console.log(item)
      let key = (((item[b * 12] === item[b * 12 - 1] || item[b * 12] === '') || item[b * 12] === null) && index === 0 && b !== 0) && ((item[(b + 1) * 12] === item[(b + 1) * 12 - 1] || item[(b + 1) * 12] === null) && index === this.changeArr(this.add(item, b)).length - 1)
      let flag = (((item[b * 12] === item[b * 12 - 1] || item[b * 12] === '') || item[b * 12] === null) && index === 0 && b !== 0) || ((item[(b + 1) * 12] === item[(b + 1) * 12 - 1] || item[(b + 1) * 12] === null) && index === this.changeArr(this.add(item, b)).length - 1)
      // 判断条件1：((item[b * 12] === item[b * 12 - 1] || item[b * 12] === null) && index === 0 && b !== 0)
      // 判断当前元素是否等于上一行的最后一个等于''或者为null 并且当前元素为第一个 当前行数不为第一个
      // 判断条件2：((item[(b + 1) * 12] === item[(b + 1) * 12 - 1] || item[(b + 1) * 12] === null) && index === this.changeArr(this.add(item, b)).length - 1)
      // 判断当前元素是否等于下一行的第一个等于'' 并且当前元素为最后一个
      if (fleg) {
        // console.log(key ? '' : flag)
        return key ? '' : flag
      }
      // console.log(item, b, value, index, fleg)
      // console.log(flag)
      return flag
    },
    forArr: (num) => {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push(Math.random())
      }
      return arr
    },
    smallFont (item) {
      let len = item ? item.length : 0
      let num = 0
      for (let i = 0; i < len; i++) {
        if (item.charCodeAt(i) > 255) {
          num += 2
        } else {
          num++
        }
      }
      if (num > 7) {
        return true
      } else {
        return false
      }
    },
    // 如果数据少于12条
    add (item, flag) {
      let items = []
      let arr = []
      for (let prop in item) {
        if (item[prop] === '') {
          items.push(1)
        } else {
          items.push(item[prop])
        }
      }
      change(items, arr)
      function change (items, arr) {
        if (items.length > 12) {
          let ar = items.splice(0, 12)
          arr.push(ar)
          if (items.length > 12) {
            change(items, arr)
          } else {
            let len = items.length
            for (let i = len; i < 12; i++) {
              items.push('no')
            }
            arr.push(items)
          }
        } else {
          let len = items.length
          for (let i = len; i < 12; i++) {
            items.push('no')
          }
          arr.push(items)
        }
      }
      if (flag === 'all') {
        return arr
      } else if (typeof flag === 'number') {
        if (arr[flag][0] === null) {
          for (let i = flag - 1; i >= 0; i--) {
            for (let j = 11; j >= 0; j--) {
              if (arr[i][j] !== null) {
                arr[flag][0] = arr[i][j]
                return arr[flag]
              }
            }
          }
        }
        return arr[flag]
      } else {
        return arr[0]
      }
    },
    // 处理数组
    changeArr (item) {
      // console.log(item)
      let obj = {}
      let n = 1
      let firstVal = ''
      let len = item.length
      let arr = []
      let flag = true
      item.forEach((value, index) => {
        if (value === 'no') {
          if (flag) {
            flag = false
            obj.value = firstVal
            obj.key = n
            arr.push(obj)
          }
          arr.push({ value: 'no', key: 1 })
        } else if (index === len - 1) {
          if ((firstVal === value && value === 1) || value === null || firstVal === value) {
            n++
          }
          obj.value = firstVal
          obj.key = n
          arr.push(obj)
          if (firstVal !== value && value !== null) {
            obj = {}
            obj.value = value
            obj.key = 1
            arr.push(obj)
          }
        } else if (value === null) {
          n++
        } else {
          if ((value === firstVal) || (value === firstVal && value === 1)) {
            n++
          } else {
            if (index !== 0) {
              obj.value = firstVal
              obj.key = n
              arr.push(obj)
              obj = {}
            }
            firstVal = value
            n = 1
          }
        }
      })
      // console.log(arr)
      return arr
    },
    goTop () {
      document.body.scrollTop = 0
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
  created () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      // console.log(res.data.data)
      const data = res.data.data
      this.product_info = data.product_info
      this.craft_code = data.craft_code
      this.create_time = data.create_time
      this.weight = data.weight
      this.warp_data = data.warp_data
      this.weft_data = data.weft_data
      data.material_data.forEach((item) => {
        if (item.type === 0 && item.type_material === 0) {
          this.material_data.warpMaterialMain.name = item.material_name
          this.material_data.warpMaterialMain.value = item.apply
        }
        if (item.type === 1 && item.type_material === 0) {
          this.material_data.weftMaterialMain.name = item.material_name
          this.material_data.weftMaterialMain.value = item.apply
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
      data.color_data.forEach(item => {
        item.color_scheme.forEach((index, n) => {
          if (this.color_data.length === 0) {
            let obj = {}
            obj.product_color = item.product_color
            obj.color_scheme = []
            let info = {}
            info[(item.type) === 0 ? 'warp' : 'weft'] = {
              name: index.name,
              value: index.value
            }
            obj.color_scheme.push(info)
            this.color_data.push(obj)
          } else {
            let flag = true
            this.color_data.forEach((value, x) => {
              if (value.product_color === item.product_color) {
                flag = false
                if (item.type === 0) {
                  value.color_scheme.push({
                    warp: {
                      'name': index.name,
                      'value': index.value
                    },
                    weft: {

                    }
                  })
                } else if (item.type === 1) {
                  if (value.color_scheme[n]) {
                    value.color_scheme[n].weft = {
                      name: index.name,
                      value: index.value
                    }
                  }
                }
              } else if (x === this.color_data.length - 1 && value.product_color !== item.product_color && flag) {
                let obj = {}
                obj.product_color = item.product_color
                obj.color_scheme = []
                let info = {}
                info[(item.type) === 0 ? 'warp' : 'weft'] = {
                  name: index.name,
                  value: index.value
                }
                obj.color_scheme.push(info)
                this.color_data.push(obj)
              }
            })
          }
        })
      })
      // 经纬向数据整理
      this.warp_data.warp_rank.forEach((item, key) => {
        item.forEach((val, ind) => {
          if (val === null) {
            item[ind] = item[ind - 1]
          } else if (val === '') {
            item[ind] = 1
          }
        })
      })
      this.weft_data.weft_rank.forEach((item, key) => {
        item.forEach((val, ind) => {
          if (val === null) {
            item[ind] = item[ind - 1]
          } else if (val === '') {
            item[ind] = 1
          }
        })
      })
      // 计算经纬根数
      this.warp_data.warp_rank_bottom.forEach((item, key) => {
        let flag = this.weight_info[item]
        if (!flag) {
          this.weight_info[item] = {
            name: item,
            data: {
              warp: {
                value: this.warp_data.warp_rank[0][key] * this.warp_data.warp_rank[1][key] * this.warp_data.warp_rank[2][key]
              }
            }
          }
        } else {
          if (!flag.data.warp) {
            flag.data.warp = {}
          }
          flag.data.warp.value = Number(flag.data.warp.value ? flag.data.warp.value : 0) + (this.warp_data.warp_rank[0][key] * this.warp_data.warp_rank[1][key] * this.warp_data.warp_rank[2][key])
        }
      })
      this.weft_data.weft_rank_bottom.forEach((item, key) => {
        let flag = this.weight_info[item]
        if (!flag) {
          console.log(this.weight_info[item])
          this.weight_info[item] = {
            name: item,
            data: {
              weft: {
                value: this.weft_data.weft_rank[0][key] * this.weft_data.weft_rank[1][key] * this.weft_data.weft_rank[2][key]
              }
            }
          }
        } else {
          if (!flag.data.weft) {
            flag.data.weft = {}
          }
          flag.data.weft.value = Number(flag.data.weft.value ? flag.data.weft.value : 0) + (this.weft_data.weft_rank[0][key] * this.weft_data.weft_rank[1][key] * this.weft_data.weft_rank[2][key])
        }
      })
      // 与原料关联
      data.material_data.forEach((item, key) => {
        item.apply.forEach((value, index) => {
          let flag = this.weight_info[value]
          if (flag) {
            if (item.type === 1) {
              if (!flag.data.weft) {
                flag.data.weft = {}
              }
              flag.data.weft.material = item.material_name
              let flag1 = data.yarn_coefficient.find(val => val.name === item.material_name)
              console.log(flag1)
              flag.data.weft.weight = ((flag.data.weft.value ? flag.data.weft.value : 0) * flag1.value * (this.warp_data.reed_width / 100)).toFixed(2)
            } else {
              if (!flag.data.warp) {
                flag.data.warp = {}
              }
              flag.data.warp.material = item.material_name
              let flag1 = data.yarn_coefficient.find(val => val.name === item.material_name)
              console.log(flag1)
              flag.data.warp.weight = ((flag.data.warp.value ? flag.data.warp.value : 0) * flag1.value * ((this.weft_data.neichang + this.weft_data.rangwei) / 100)).toFixed(2)
            }
          }
        })
      })
    })
    console.log(this)
  },
  updated () {
    // window.print()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormTable.less";
</style>
<style lang="less">
html {
  overflow: visible;
}
body {
  overflow: visible;
}
</style>
