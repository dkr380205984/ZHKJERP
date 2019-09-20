<template>
  <div id="designFormTable"
    @click.right='goTop'>
    <!-- <div class="table">
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
                  v-if="warp_data.warp_rank_bottom.length < 13 && weft_data.weft_rank_bottom.length < 13 && (warp_data.warp_rank_bottom_back ? warp_data.warp_rank_bottom_back.length === 0 : !warp_data.warp_rank_bottom_back) && (weft_data.weft_rank_bottom_back ? weft_data.weft_rank_bottom_back.length === 0 : !weft_data.weft_rank_bottom_back)">
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
              <span>{{warp_data.drafting_method?warp_data.drafting_method:''}}</span>
              <div class="through-content">
                <div class="through-for">{{warp_data.additional_data}}</div>
                <div class="content-box">
                  <div class="box"
                    v-for="(val,ind) in warp_data.drafting_method"
                    :key='ind'>
                    <span class="index">{{ind+1}}</span>
                    <span class="detail">
                      <span>{{val[0]}}</span>
                      <span>{{val[1]}}</span>
                    </span>
                  </div>
                </div>
                <div class="through-desc"></div>
              </div>
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
                  v-if="weft_data.weft_rank_bottom.length < 13 && warp_data.warp_rank_bottom.length < 13 && (warp_data.warp_rank_bottom_back ? warp_data.warp_rank_bottom_back.length === 0 : !warp_data.warp_rank_bottom_back) && (weft_data.weft_rank_bottom_back ? weft_data.weft_rank_bottom_back.length === 0 : !weft_data.weft_rank_bottom_back)">
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
            <template v-if="color_data.length < 7 && panduan() < 7">
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
                      <span :style="{fontSize:smallFont(item.warp ? item.warp.name : '') ? '10px' : false}">{{item.warp ? item.warp.name : ''}}</span>
                      <span :style="{fontSize:smallFont(item.weft ? item.weft.name : '') ? '10px' : false}">{{item.weft ? item.weft.name : ''}}</span>
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
              <span class="fujian">
                见附件
              </span>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="outTable-arrangement"
      v-if="warp_data.warp_rank_bottom.length > 12 || weft_data.weft_rank_bottom.length > 12 || (warp_data.warp_rank_bottom_back ? warp_data.warp_rank_bottom_back.length !== 0 : warp_data.warp_rank_bottom_back) || (weft_data.weft_rank_bottom_back ? weft_data.weft_rank_bottom_back.length !== 0 : weft_data.weft_rank_bottom_back)">
      <div class="code">
        <div class="title">工艺单编号:</div>
        <div class="content">{{craft_code}}</div>
      </div>
      <div class="warp-wise-arrange">
        <div class="title">经向排列-正:</div>
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
                  <span v-if="consol(item,b,value,index) && value.value !== 'no'"
                    class="jiantou">
                    <span v-if="consol(item,b,value,index,true) === '' && b !== 0 && b !== add(warp_data.warp_rank_bottom,'all').length -1"></span>
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
      <div class="warp-wise-arrange"
        v-if="warp_data.warp_rank_bottom_back && warp_data.warp_rank_bottom_back.length !== 0">
        <div class="title">经向排列-反:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (a,b) in add(warp_data.warp_rank_bottom_back,'all')"
            :key="b">
            <div>
              <span v-for="(item,key) in add(warp_data.warp_rank_bottom_back,b)"
                :style="{minWidth : 100/12 + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 'no' ? '' : (item === 0 ? '主' : '夹' + item)}}</span>
            </div>
            <div v-for="(item,key) in warp_data.warp_rank_back"
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
                  <span v-if="consol(item,b,value,index) && value.value !== 'no'"
                    class="jiantou">
                    <span v-if="consol(item,b,value,index,true) === '' && b !== 0 && b !== add(warp_data.warp_rank_bottom_back,'all').length -1"></span>
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
      <div class="warp-wise-arrange">
        <div class="title">纬向排列-正:</div>
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
      <div class="warp-wise-arrange"
        v-if="weft_data.weft_rank_bottom_back && weft_data.weft_rank_bottom_back.length !== 0">
        <div class="title">纬向排列-反:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (a,b) in add(weft_data.weft_rank_bottom_back,'all')"
            :key="b">
            <div>
              <span v-for="(item,key) in add(weft_data.weft_rank_bottom_back,b)"
                :style="{minWidth : 100/12 + '%',borderRight : key < 11 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 'no' ? '' : (item === 0 ? '主' : '夹' + item)}}</span>
            </div>
            <div v-for="(item,key) in weft_data.weft_rank_back"
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
                    <span v-if="consol(item,b,value,index,true) === '' && b !== 0 && b !== add(weft_data.weft_rank_bottom_back,'all').length -1"></span>
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
      v-if='color_data.length > 6 || panduan() > 6'>
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
              :key="ind + 'a'">
              <span :style="{fontSize:smallFont(weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.warp ? weight_info[ind].data.warp.weight + 'g' : '') : '') : '') ? '10px' : false}">{{weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.warp ? weight_info[ind].data.warp.weight + 'g' : '') : '') : ''}}</span>
              <span :style="{fontSize:smallFont(weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.weft ? weight_info[ind].data.weft.weight + 'g' : '') : '') : '') ? '10px' : false}">{{weight_info[ind] ? (weight_info[ind].data ? (weight_info[ind].data.weft ? weight_info[ind].data.weft.weight + 'g' : '') : '') : ''}}</span>
            </div>
          </li>
          <template v-for="(value,index) in color_data">
            <li :key="index">
              <div class="table-head-col">{{value.product_color}}</div>
              <template v-for="(item,key) in value.color_scheme">
                <div :key="key"
                  v-if="key < 6">
                  <span :style="{fontSize:smallFont(item.warp ? item.warp.name : '') ? '10px' : false}">{{item.warp ? item.warp.name : ''}}</span>
                  <span :style="{fontSize:smallFont(item.weft ? item.weft.name : '') ? '10px' : false}">{{item.weft ? item.weft.name : ''}}</span>
                </div>
              </template>
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
      <div class="content"
        v-if="panduan() > 6"
        style="margin-top:30px;">
        <div class="table-head-row">
          <div class="table-head">
            <span>颜色组</span>
            <span>具体配色</span>
          </div>
          <div v-for="(item,index) in forArr(6)"
            :key="index">
            <div>{{"夹" + (index + 6)}}</div>
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
              <span :style="{fontSize:smallFont(weight_info[ind + 6] ? (weight_info[ind + 6].data ? (weight_info[ind + 6].data.warp ? weight_info[ind + 6].data.warp.weight + 'g' : '') : '') : '') ? '10px' : false}">{{weight_info[ind + 6] ? (weight_info[ind + 6].data ? (weight_info[ind + 6].data.warp ? weight_info[ind + 6].data.warp.weight + 'g' : '') : '') : ''}}</span>
              <span :style="{fontSize:smallFont(weight_info[ind + 6] ? (weight_info[ind + 6].data ? (weight_info[ind + 6].data.weft ? weight_info[ind + 6].data.weft.weight + 'g' : '') : '') : '') ? '10px' : false}">{{weight_info[ind + 6] ? (weight_info[ind + 6].data ? (weight_info[ind + 6].data.weft ? weight_info[ind + 6].data.weft.weight + 'g' : '') : '') : ''}}</span>
            </div>
          </li>
          <template v-for="(value,index) in color_data">
            <li :key="index">
              <div class="table-head-col">{{value.product_color}}</div>
              <div v-for="(item,key) in splices(value.color_scheme)"
                :key="key">
                <span :style="{fontSize:smallFont(item.warp ? item.warp.name : '') ? '10px' : false}">{{item.warp ? item.warp.name : ''}}</span>
                <span :style="{fontSize:smallFont(item.weft ? item.weft.name : '') ? '10px' : false}">{{item.weft ? item.weft.name : ''}}</span>
              </div>
              <template v-if="splices(value.color_scheme).length < 6">
                <div v-for="(x,y) in forArr( 6 - splices(value.color_scheme).length)"
                  :key="y+'X'">
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
    </div> -->
  </div>
</template>

<script>
import { craftOne } from '@/assets/js/api.js'
export default {
  data () {
    return {
      company: '',
      design_code: '',
      create_user: '',
      create_time: '',
      product_name: '',
      product_type: '',
      product_code: '',
      size: '',
      weight: '',
      ingredient: ''
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
    forArr (num) {
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
    // 判断是否超出夹5
    panduan () {
      let len = 0
      this.color_data.forEach(item => {
        if (len < item.color_scheme.length) {
          len = item.color_scheme.length
        }
      })
      console.log(len)
      return len
    },
    // 截取颜色长度
    splices (item) {
      let arr = [...item]
      return arr.splice(6, 13)
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

  },
  created () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      console.log(res.data.data)
      const data = res.data.data
      this.design_code = data.craft_code
      this.create_user = data.user_name
      this.create_time = data.create_time
      // this.product_name = data.product_info.
      this.product_type = data.product_info.category_info.product_category + '/' + data.product_info.type_name + '/' + data.product_info.style_name + '/' + data.product_info.flower_id
      this.product_code = data.product_info.product_code
      this.size = data.product_info.size[0].size_info
      this.weight = data.product_info.size[0].weight
      this.ingredient = data.product_info.materials.map(item => {
        return (item.ingredient_value + '%' + item.ingredient_name)
      }).join('/')
    })
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
