<template>
  <div id="designFormTable"
    @click.right='goTop'>
    <div class="table">
      <div class="head">
        <div class="left">
          <p class="company">桐庐凯瑞针纺有限公司工艺单</p>
          <span><span class="label">工艺单编号:</span>{{design_code}}</span>
          <span><span class="label">创建人:</span>{{create_user}}</span>
          <span><span class="label">创建日期:</span>{{create_time}}</span>
        </div>
        <div class="right">
          <img :src="qrCodeUrl"
            alt=""
            ref="qrcodeCanvas"
            class="qrcode">
          <div class="message">
            <span>扫一扫</span>
            <span>获取电子图稿</span>
          </div>
        </div>
      </div>
      <ul class="table-box">
        <li class="info">
          <div>产品名称</div>
          <div>{{product_name}}</div>
          <div>产品品类</div>
          <div>{{product_type}}</div>
          <div>产品编号</div>
          <div>{{product_code}}</div>
        </li>
        <li class="info">
          <div>规格</div>
          <div>{{size}}</div>
          <div>克重</div>
          <div>{{weight}}g</div>
          <div>成分</div>
          <div>{{ingredient}}</div>
        </li>
        <li class="main-arrange">
          <div class="title">原料经向</div>
          <div class="content">
            <div class="material">
              <span>主要原料(经)</span>
              <span>
                主:{{ warp_data.material_data.find(item=>item.apply.indexOf(0) !== -1) ? warp_data.material_data.find(item=>item.apply.indexOf(0) !== -1).material_name : ''}}
              </span>
            </div>
            <div class="material">
              <span>次要原料(经)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in warp_data.material_data"
                  :key="indexMaterial">
                  {{itemMaterial.apply|filterClass}}
                  {{':' + itemMaterial.material_name }}
                </span>
              </span>
            </div>
            <div class="material">
              <span>次要辅料(经)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in warp_data.assist_material"
                  :key="indexMaterial">
                  {{itemMaterial.apply|filterMaterialClass}}
                  {{':' + itemMaterial.material_name }}
                </span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">经向排列</div>
              <div class="content">
                <div class="particulars"
                  v-if="warp_data.warp_rank[1].length <= 16 && weft_data.weft_rank[1].length <= 16">
                  <div>
                    <span v-for="(item,key) in warp_data.warp_rank[1]"
                      :style="{minWidth : 100/16 + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item === 0 ? '主' : '夹' + item}}</span>
                    <template v-if="warp_data.warp_rank[1].length < 16">
                      <span v-for="(value,index) in (16-warp_data.warp_rank[1].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in warp_data.warp_rank[2]"
                      :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">
                      {{item ? item : ''}}
                    </span>
                    <template v-if="warp_data.warp_rank[2].length < 16">
                      <span v-for="(value,index) in (16-warp_data.warp_rank[2].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in mergeSpan(warp_data,3,'warp_rank')"
                      :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item ? item.value : ''}}</span>
                    <template v-if="warp_data.warp_rank[3].length < 16">
                      <span v-for="(value,index) in (16-warp_data.warp_rank[3].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in mergeSpan(warp_data,4,'warp_rank')"
                      :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item ? item.value : ''}}</span>
                    <template v-if="warp_data.warp_rank[4].length < 16">
                      <span v-for="(value,index) in (16-warp_data.warp_rank[4].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in mergeSpan(warp_data,5,'warp_rank')"
                      :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item ? item.value : ''}}</span>
                    <template v-if="warp_data.warp_rank[5].length < 16">
                      <span v-for="(value,index) in (16-warp_data.warp_rank[5].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
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
              <div class="through-content">
                <div class="through-for">{{drafting_method|filterThroughMethod}}</div>
                <div class="content-box"
                  :style="{'justify-content':(drafting_method.GLFlag !== 'normal' || drafting_method.GL[0].length >= 4) ? 'center' : 'space-between'}">
                  <template v-if="drafting_method.GLFlag === 'normal' && 4 >= drafting_method.GL[0].length ">
                    <div class="box"
                      v-for="(val,ind) in drafting_method.GL[0]"
                      :key='ind'>
                      <span class="index">{{ind+1}}</span>
                      <span class="detail">
                        <span>{{val[0]}}</span>
                        <span>{{val[1]}}</span>
                        <span>{{val[2]}}</span>
                      </span>
                    </div>
                  </template>
                  <template v-else>见附件</template>
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
            <div class="material">
              <span>主要原料(纬)</span>
              <span>
                主:{{ weft_data.material_data.find(item=>item.apply.indexOf(0) !== -1) ? weft_data.material_data.find(item=>item.apply.indexOf(0) !== -1).material_name : ''}}
              </span>
            </div>
            <div class="material">
              <span>次要原料(纬)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in weft_data.material_data"
                  :key="indexMaterial">
                  {{itemMaterial.apply|filterClass}}
                  {{":" + itemMaterial.material_name}}
                </span>
              </span>
            </div>
            <div class="material">
              <span>次要辅料(纬)</span>
              <span>
                <span v-for="(itemMaterial,indexMaterial) in weft_data.assist_material"
                  :key="indexMaterial">
                  {{itemMaterial.apply|filterMaterialClass}}
                  {{":" + itemMaterial.material_name}}
                </span>
              </span>
            </div>
            <div class="warp-wise-arrange">
              <div class="title">纬向排列</div>
              <div class="content">
                <div class="particulars"
                  v-if="warp_data.warp_rank[1].length <= 16 && weft_data.weft_rank[1].length <= 16">
                  <div>
                    <span v-for="(item,key) in weft_data.weft_rank[1]"
                      :style="{minWidth : 100/16 + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item === 0 ? '主' : '夹' + item}}</span>
                    <template v-if="weft_data.weft_rank[1].length < 16">
                      <span v-for="(value,index) in (16-weft_data.weft_rank[1].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in weft_data.weft_rank[2]"
                      :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">
                      {{item ? item : ''}}
                    </span>
                    <template v-if="weft_data.weft_rank[2].length < 16">
                      <span v-for="(value,index) in (16-weft_data.weft_rank[2].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in mergeSpan(weft_data,3,'weft_rank')"
                      :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item ? item.value : ''}}</span>
                    <template v-if="weft_data.weft_rank[3].length < 16">
                      <span v-for="(value,index) in (16-weft_data.weft_rank[3].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in mergeSpan(weft_data,4,'weft_rank')"
                      :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item ? item.value : ''}}</span>
                    <template v-if="weft_data.weft_rank[4].length < 16">
                      <span v-for="(value,index) in (16-weft_data.weft_rank[4].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                      </span>
                    </template>
                  </div>
                  <div>
                    <span v-for="(item,key) in mergeSpan(weft_data,5,'weft_rank')"
                      :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                      :key="key">{{item ? item.value : ''}}</span>
                    <template v-if="weft_data.weft_rank[5].length < 16">
                      <span v-for="(value,index) in (16-weft_data.weft_rank[5].length)"
                        :key="index + 'X'"
                        :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
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
            <template v-if="color_data.length < 7 && zhujia_info.length < 7">
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
                    <span :style="{fontSize:smallFont(colorWeight.warp[ind]) ? '10px' : false}">{{colorWeight.warp[ind] ? colorWeight.warp[ind] === 'NaN' ? '0g' : colorWeight.warp[ind] + 'g' : ''}}</span>
                    <span :style="{fontSize:smallFont(colorWeight.weft[ind]) ? '10px' : false}">{{colorWeight.weft[ind] ? colorWeight.weft[ind] === 'NaN' ? '0g' : colorWeight.weft[ind] + 'g' : ''}}</span>
                  </div>
                </li>
                <template v-for="(value,index) in color_data">
                  <li v-if='index < 5'
                    :key="index">
                    <div class="table-head-col">{{value.product_color}}</div>
                    <div v-for="(item,key) in 6"
                      :key="key">
                      <span v-if="value.color_scheme.warp[key] && value.color_scheme.weft[key] && (value.color_scheme.warp[key].name === value.color_scheme.weft[key].name) ? value.color_scheme.warp[key].name : ''">{{value.color_scheme.warp[key].name}}</span>
                      <template v-else>
                        <span :style="{fontSize:smallFont(value.color_scheme.warp[key] ? value.color_scheme.warp[key].name : '') ? '10px' : false}">{{value.color_scheme.warp[key] ? value.color_scheme.warp[key].name : ''}}</span>
                        <span :style="{fontSize:smallFont(value.color_scheme.weft[key] ? value.color_scheme.weft[key].name : '') ? '10px' : false}">{{value.color_scheme.weft[key] ? value.color_scheme.weft[key].name : ''}}</span>
                      </template>
                    </div>
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
            <span class="fujian"
              v-else>见附件</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="outTable-arrangement"
      v-if="warp_data.warp_rank[0].length > 16 || weft_data.weft_rank[0].length > 16 || warp_data.back_status !== 0 || weft_data.back_status !== 0">
      <div class="code">
        <div class="title">工艺单编号:</div>
        <div class="content">{{design_code}}</div>
      </div>
      <div class="warp-wise-arrange">
        <div class="title">经向排列-正:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (items,keys) in Math.ceil(warp_data.warp_rank[0].length / 16)"
            :key="keys">
            <div>
              <span v-for="(item,key) in splitData(warp_data.warp_rank[1],keys)"
                :style="{minWidth : 100/16 + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 0 ? '主' : '夹' + item}}</span>
              <template v-if="splitData(warp_data.warp_rank[1],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank[1],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in splitData(warp_data.warp_rank[2],keys)"
                :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">
                {{item ? item : ''}}
              </span>
              <template v-if="splitData(warp_data.warp_rank[2],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank[2],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(warp_data,3,'warp_rank','merge_data',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(warp_data.warp_rank[3],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank[3],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(warp_data,4,'warp_rank','merge_data',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(warp_data.warp_rank[4],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank[4],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(warp_data,5,'warp_rank','merge_data',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(warp_data.warp_rank[5],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank[5],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="warp-wise-arrange"
        v-if="warp_data.back_status">
        <div class="title">经向排列-反:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (items,keys) in Math.ceil(warp_data.warp_rank_back[0].length / 16)"
            :key="keys">
            <div>
              <span v-for="(item,key) in splitData(warp_data.warp_rank_back[1],keys)"
                :style="{minWidth : 100/16 + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 0 ? '主' : '夹' + item}}</span>
              <template v-if="splitData(warp_data.warp_rank_back[1],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank_back[1],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in splitData(warp_data.warp_rank_back[2],keys)"
                :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">
                {{item ? item : ''}}
              </span>
              <template v-if="splitData(warp_data.warp_rank_back[2],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank_back[2],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(warp_data,3,'warp_rank_back','merge_data_back',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(warp_data.warp_rank_back[3],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank_back[3],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(warp_data,4,'warp_rank_back','merge_data_back',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(warp_data.warp_rank_back[4],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank_back[4],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(warp_data,5,'warp_rank_back','merge_data_back',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(warp_data.warp_rank_back[5],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(warp_data.warp_rank_back[5],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
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
            v-for=" (items,keys) in Math.ceil(weft_data.weft_rank[0].length / 16)"
            :key="keys">
            <div>
              <span v-for="(item,key) in splitData(weft_data.weft_rank[1],keys)"
                :style="{minWidth : 100/16 + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 0 ? '主' : '夹' + item}}</span>
              <template v-if="splitData(weft_data.weft_rank[1],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank[1],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in splitData(weft_data.weft_rank[2],keys)"
                :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">
                {{item ? item : ''}}
              </span>
              <template v-if="splitData(weft_data.weft_rank[2],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank[2],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(weft_data,3,'weft_rank','merge_data',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(weft_data.weft_rank[3],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank[3],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(weft_data,4,'weft_rank','merge_data',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(weft_data.weft_rank[4],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank[4],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(weft_data,5,'weft_rank','merge_data',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(weft_data.weft_rank[5],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank[5],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="warp-wise-arrange"
        v-if="weft_data.back_status">
        <div class="title">纬向排列-反:</div>
        <div class="content">
          <div class="particulars"
            v-for=" (items,keys) in Math.ceil(weft_data.weft_rank_back[0].length / 16)"
            :key="keys">
            <div>
              <span v-for="(item,key) in splitData(weft_data.weft_rank_back[1],keys)"
                :style="{minWidth : 100/16 + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">{{item === 0 ? '主' : '夹' + item}}</span>
              <template v-if="splitData(weft_data.weft_rank_back[1],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank_back[1],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in splitData(weft_data.weft_rank_back[2],keys)"
                :style="{minWidth : (100/16) + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none'}"
                :key="key">
                {{item ? item : ''}}
              </span>
              <template v-if="splitData(weft_data.weft_rank_back[2],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank_back[2],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(weft_data,3,'weft_rank_back','merge_data_back',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(weft_data.weft_rank_back[3],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank_back[3],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(weft_data,4,'weft_rank_back','merge_data_back',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(weft_data.weft_rank_back[4],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank_back[4],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
            <div>
              <span v-for="(item,key) in mergeSpan(weft_data,5,'weft_rank_back','merge_data_back',splitData,keys)"
                :style="{minWidth : (100/16)*item.colspan + '%',borderLeft : key !== 0 ? '1px solid #999' : 'none',background:item.isSplit ? '#DDD' : false}"
                :key="key">{{item ? item.value : ''}}</span>
              <template v-if="splitData(weft_data.weft_rank_back[5],keys).length < 16">
                <span v-for="(value,index) in (16-splitData(weft_data.weft_rank_back[5],keys).length)"
                  :key="index + 'X'"
                  :style="{minWidth : (100/16) + '%',borderLeft :'1px solid #999'}">
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="outTable-color"
      v-if='color_data.length > 6 || zhujia_info.length > 6'>
      <div class="code">
        <div class="title">工艺单编号:</div>
        <div class="content">{{design_code}}</div>
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
              <span :style="{fontSize:smallFont(colorWeight.warp[ind]) ? '10px' : false}">{{colorWeight.warp[ind] ? colorWeight.warp[ind] === 'NaN' ? '0g' : colorWeight.warp[ind] + 'g' : ''}}</span>
              <span :style="{fontSize:smallFont(colorWeight.weft[ind]) ? '10px' : false}">{{colorWeight.weft[ind] ? colorWeight.weft[ind] === 'NaN' ? '0g' : colorWeight.weft[ind] + 'g' : ''}}</span>
            </div>
          </li>
          <template v-for="(value,index) in color_data">
            <li :key="index">
              <div class="table-head-col">{{value.product_color}}</div>
              <div v-for="(item,key) in 6"
                :key="key">
                <span v-if="value.color_scheme.warp[key] && value.color_scheme.weft[key] && (value.color_scheme.warp[key].name === value.color_scheme.weft[key].name) ? value.color_scheme.warp[key].name : ''">{{value.color_scheme.warp[key].name}}</span>
                <template v-else>
                  <span :style="{fontSize:smallFont(value.color_scheme.warp[key] ? value.color_scheme.warp[key].name : '') ? '10px' : false}">{{value.color_scheme.warp[key] ? value.color_scheme.warp[key].name : ''}}</span>
                  <span :style="{fontSize:smallFont(value.color_scheme.weft[key] ? value.color_scheme.weft[key].name : '') ? '10px' : false}">{{value.color_scheme.weft[key] ? value.color_scheme.weft[key].name : ''}}</span>
                </template>
              </div>
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
        v-if="zhujia_info.length > 6"
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
              <span :style="{fontSize:smallFont(colorWeight.warp[ind + 6]) ? '10px' : false}">{{colorWeight.warp[ind + 6] ? colorWeight.warp[ind + 6] === 'NaN' ? '0g' : colorWeight.warp[ind + 6] + 'g' : ''}}</span>
              <span :style="{fontSize:smallFont(colorWeight.weft[ind + 6]) ? '10px' : false}">{{colorWeight.weft[ind + 6] ? colorWeight.weft[ind + 6] === 'NaN' ? '0g' : colorWeight.weft[ind + 6] + 'g' : ''}}</span>
            </div>
          </li>
          <template v-for="(value,index) in color_data">
            <li :key="index">
              <div class="table-head-col">{{value.product_color}}</div>
              <div v-for="(item,key) in 6"
                :key="key">
                <span v-if="value.color_scheme.warp[key + 6] && value.color_scheme.weft[key + 6] && (value.color_scheme.warp[key + 6].name === value.color_scheme.weft[key + 6].name) ? value.color_scheme.warp[key + 6].name : ''">{{value.color_scheme.warp[key + 6].name}}</span>
                <template v-else>
                  <span :style="{fontSize:smallFont(value.color_scheme.warp[key + 6] ? value.color_scheme.warp[key + 6].name : '') ? '10px' : false}">{{value.color_scheme.warp[key + 6] ? value.color_scheme.warp[key + 6].name : ''}}</span>
                  <span :style="{fontSize:smallFont(value.color_scheme.weft[key + 6] ? value.color_scheme.weft[key + 6].name : '') ? '10px' : false}">{{value.color_scheme.weft[key + 6] ? value.color_scheme.weft[key + 6].name : ''}}</span>
                </template>
              </div>
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
    <div class="outTable-through"
      v-if="drafting_method.GLFlag !== 'normal' || drafting_method.GL[0].length">
      <div class="code">
        <div class="title">工艺单编号:</div>
        <div class="content">{{design_code}}</div>
      </div>
      <div class="wenbantu"
        v-for="(item,key) in drafting_method.GL"
        :key="key">
        <div class="title">纹版图{{key !== 0 ? key + 1 : ''}}:</div>
        <div class="content">
          <div class="box"
            v-for="(val,ind) in item"
            :key='ind'>
            <span class="index">{{ind+1}}</span>
            <span class="detail">
              <span>{{val[0]}}</span>
              <span>{{val[1]}}</span>
              <span>{{val[2]}}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="wenbantu">
        <div class="title">穿综法循环:</div>
        <div class="content">{{drafting_method|filterThroughMethod}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { craftOne } from '@/assets/js/api.js'
const QRCode = require('qrcode')
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
      ingredient: '',
      warp_data: {
        material_data: [],
        warp_rank: [[], [], [], [], [], []],
        warp_rank_back: [[], [], [], [], [], []],
        merge_data: [],
        merge_data_back: []
      },
      weft_data: {
        material_data: [],
        weft_rank: [[], [], [], [], [], []],
        weft_rank_back: [[], [], [], [], [], []],
        merge_data: [],
        merge_data_back: []
      },
      drafting_method: {
        PM: [],
        GL: [[]]
      },
      color_data: [],
      colorWeight: {
        warp: [],
        weft: []
      },
      zhujia_info: [],
      qrCodeUrl: ''
    }
  },
  methods: {
    // 给合并规则里添加value
    pushValue (item, key, index) {
      let valueArr = item[key] // value来源数组
      item[index].forEach(val => {
        val.value = clone(valueArr[val.row]).splice(val.col, val.colspan).filter(num => num)[0]
      })
      this.changeMergeMethod(item[index], Math.ceil(item[key][0].length / 16)) // 处理合并规则
      function clone (data) {
        return JSON.parse(JSON.stringify(data))
      } // 克隆数据
    },
    // 对合并规则进行处理
    changeMergeMethod (item, key) {
      for (let i = 1; i < key; i++) {
        // let flag = item.find(val => )
        // if (flag) {

        // }
        item.forEach(val => {
          if (i * 16 >= val.col && (val.col + val.colspan - 1) >= i * 16) {
            item.push({
              col: i * 16,
              colspan: val.colspan - (i * 16 - val.col),
              removed: val.removed,
              row: val.row,
              rowspan: val.rowspan,
              split: true,
              value: val.value
            })
            val.colspan = i * 16 - val.col
            val.split = true
          }
        })
      }
    },
    // 拆分数据
    splitData (item, key, flag) {
      if (flag) {
        // console.log('测试是否作为callBack进行拆分,没作用', item)
      }
      item = JSON.parse(JSON.stringify(item))
      return item.splice(key * 16, 16)
    },
    // 合并单元格
    mergeSpan (item, index, key, mergeIndex, callBack, keys) {
      let mergeALLMathod = item[mergeIndex] ? item[mergeIndex] : []
      let mergeMethod = mergeALLMathod.filter(val => Number(val.row) === Number(index)) // 合并规则
      let isMergeData = callBack ? callBack(item[key][index], keys, true) : item[key][index] // 需要合并的数据
      let mergeData = [] // 合并后的数据
      for (let ind = 0; ind < isMergeData.length; ind++) {
        let val = isMergeData[ind]
        let mergeItem = mergeMethod.find(mergeItem => ind >= (mergeItem.col - (keys || 0) * 16) && ((mergeItem.col - (keys || 0) * 16) + mergeItem.colspan - 1) >= ind)
        if (mergeItem) {
          mergeData.push({ value: mergeItem.value, colspan: mergeItem.colspan, isSplit: mergeItem.split })
          ind += (mergeItem.colspan - 1)
        } else {
          mergeData.push({ value: val, colspan: 1 })
        }
      }
      return mergeData
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
        if (len < item.color_scheme.warp.length) {
          len = item.color_scheme.warp.length
        }
        if (len < item.color_scheme.weft.length) {
          len = item.color_scheme.weft.length
        }
      })
      return len
    },
    // 截取颜色长度
    splices (item) {
      let arr = [...item]
      return arr.splice(6, 13)
    },
    goTop () {
      document.body.scrollTop = 0
    }
  },
  filters: {
    filterThroughMethod (items) {
      console.log(items)
      let str = ''
      if (items.PMFlag === 'normal') {
        items.PM.forEach((item, key) => {
          str = '【' + item.number + '根（' + item.value + '）' + '】' + (item.repeat && item.repeat !== 1 ? 'X' + item.repeat + '遍' : '') + (key !== items.PM.length - 1 ? '。' : '')
        })
      } else if (items.PMFlag === 'complex') {
        items.PM.forEach((item, key) => {
          item.children.forEach((value, index) => {
            str += ('【' + value.number + '根')
            value.children.forEach((val, ind) => {
              str += '（' + val.value + '）' + (val.repeat && val.repeat !== 1 ? 'X' + val.repeat + '遍' : '') + (ind !== value.children.length - 1 ? '，' : '')
            })
            str += ('】' + (item.repeat && item.repeat !== 1 ? 'X' + item.repeat + '遍' : '') + (index !== item.children.length - 1 ? '。' : ''))
          })
        })
      }
      return str
    },
    filterClass (item) {
      let arr = []
      item.forEach(value => {
        if (value !== 0) {
          arr.push('夹' + value)
        }
      })
      return arr.join('/')
    },
    filterMaterialClass (item) {
      let arr = []
      item.forEach(value => {
        if (value !== 0) {
          arr.push('夹' + value)
        } else {
          arr.push('主')
        }
      })
      return arr.join('/')
    }
  },
  created () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      console.log(res.data.data)
      const data = res.data.data
      data.warp_data.merge_data = JSON.parse(data.warp_data.merge_data)
      data.warp_data.merge_data_back = JSON.parse(data.warp_data.merge_data_back)
      data.warp_data.warp_rank = JSON.parse(data.warp_data.warp_rank)
      data.warp_data.warp_rank_back = JSON.parse(data.warp_data.warp_rank_back)
      data.weft_data.merge_data = JSON.parse(data.weft_data.merge_data)
      data.weft_data.merge_data_back = JSON.parse(data.weft_data.merge_data_back)
      data.weft_data.weft_rank = JSON.parse(data.weft_data.weft_rank)
      data.weft_data.weft_rank_back = JSON.parse(data.weft_data.weft_rank_back)
      this.design_code = data.craft_code
      this.create_user = data.user_name
      this.create_time = data.create_time
      this.product_name = data.product_info.title
      this.product_type = data.product_info.category_info.product_category + '/' + data.product_info.type_name + '/' + data.product_info.style_name + '/' + data.product_info.flower_id
      this.product_code = data.product_info.product_code
      this.size = data.product_info.size[0].size_info
      this.weight = data.product_info.size[0].weight
      this.ingredient = data.product_info.materials.map(item => {
        return (item.ingredient_value + '%' + item.ingredient_name)
      }).join('/')
      this.warp_data = JSON.parse(JSON.stringify(data.warp_data))
      this.weft_data = JSON.parse(JSON.stringify(data.weft_data))
      this.drafting_method = JSON.parse(JSON.stringify(data.draft_method))
      this.pushValue(this.warp_data, 'warp_rank', 'merge_data') // 给合并规则里附上value
      this.pushValue(this.warp_data, 'warp_rank_back', 'merge_data_back')// 给合并规则里附上value
      this.pushValue(this.weft_data, 'weft_rank', 'merge_data')// 给合并规则里附上value
      this.pushValue(this.weft_data, 'weft_rank_back', 'merge_data_back')// 给合并规则里附上value
      let colorData = []
      this.warp_data.color_data.forEach(item => {
        let colorFlag = colorData.find(key => key.product_color === item.product_color)
        if (!colorFlag) {
          colorData.push({
            product_color: item.product_color,
            color_scheme: {
              warp: item.color_scheme,
              weft: []
            }
          })
        } else {
          colorFlag.color_scheme.warp = item.color_scheme
        }
      })
      this.weft_data.color_data.forEach(item => {
        let colorFlag = colorData.find(key => key.product_color === item.product_color)
        if (!colorFlag) {
          colorData.push({
            product_color: item.product_color,
            color_scheme: {
              warp: [],
              weft: item.color_scheme
            }
          })
        } else {
          colorFlag.color_scheme.weft = item.color_scheme
        }
      })
      this.color_data = colorData
      // 初始化主夹信息
      this.warp_data.material_data.forEach(item => {
        item.apply.forEach(val => {
          if (this.zhujia_info.indexOf(val) === -1) {
            this.zhujia_info.push(val)
          }
        })
      })
      this.weft_data.material_data.forEach(item => {
        item.apply.forEach(val => {
          if (this.zhujia_info.indexOf(val) === -1) {
            this.zhujia_info.push(val)
          }
        })
      })
      // 计算克重信息
      let arrWarp = data.warp_data.warp_rank.slice(1, 5)
      data.warp_data.merge_data.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWarp[item.row - 1][i] = arrWarp[item.row - 1][item.col]
          }
        }
      })
      let arrWeft = data.weft_data.weft_rank.slice(1, 5)
      data.weft_data.merge_data.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWeft[item.row - 1][i] = arrWeft[item.row - 1][item.col]
          }
        }
      })
      let arrWarpBack = data.warp_data.warp_rank_back.slice(1, 5)
      data.warp_data.merge_data_back.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWarpBack[item.row - 1][i] = arrWarpBack[item.row - 1][item.col]
          }
        }
      })
      let arrWeftBack = data.weft_data.weft_rank_back.slice(1, 5)
      data.weft_data.merge_data_back.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWeftBack[item.row - 1][i] = arrWeftBack[item.row - 1][item.col]
          }
        }
      })
      let colorNumber = {
        warp: [],
        weft: []
      }
      for (let i = 0; i < arrWarp[0].length; i++) {
        const x = arrWarp[1][i] ? arrWarp[1][i] : 1
        const y = arrWarp[2][i] ? arrWarp[2][i] : 1
        const z = arrWarp[3][i] ? arrWarp[3][i] : 1
        colorNumber.warp[arrWarp[0][i]] = colorNumber.warp[arrWarp[0][i]] ? colorNumber.warp[arrWarp[0][i]] : 0
        colorNumber.warp[arrWarp[0][i]] += x * y * z
      }
      for (let i = 0; i < arrWeft[0].length; i++) {
        const x = arrWeft[1][i] ? arrWeft[1][i] : 1
        const y = arrWeft[2][i] ? arrWeft[2][i] : 1
        const z = arrWeft[3][i] ? arrWeft[3][i] : 1
        colorNumber.weft[arrWeft[0][i]] = colorNumber.weft[arrWeft[0][i]] ? colorNumber.weft[arrWeft[0][i]] : 0
        colorNumber.weft[arrWeft[0][i]] += x * y * z
      }
      for (let i = 0; i < arrWarpBack[0].length; i++) {
        const x = arrWarpBack[1][i] ? arrWarpBack[1][i] : 1
        const y = arrWarpBack[2][i] ? arrWarpBack[2][i] : 1
        const z = arrWarpBack[3][i] ? arrWarpBack[3][i] : 1
        colorNumber.warp[arrWarpBack[0][i]] += x * y * z
      }
      for (let i = 0; i < arrWeftBack[0].length; i++) {
        const x = arrWeftBack[1][i] ? arrWeftBack[1][i] : 1
        const y = arrWeftBack[2][i] ? arrWeftBack[2][i] : 1
        const z = arrWeftBack[3][i] ? arrWeftBack[3][i] : 1
        colorNumber.weft[arrWeftBack[0][i]] += x * y * z
      }
      this.warp_data.material_data.forEach((item) => {
        item.apply.forEach((itemChild) => {
          this.colorWeight.warp[itemChild] = (colorNumber.warp[itemChild] * (this.weft_data.neichang + this.weft_data.rangwei) * data.yarn_coefficient.find((itemFind) => itemFind.name === item.material_name).value / 100).toFixed(1)
        })
      })
      this.weft_data.material_data.forEach((item) => {
        item.apply.forEach((itemChild) => {
          this.colorWeight.weft[itemChild] = (colorNumber.weft[itemChild] * this.warp_data.reed_width * data.yarn_coefficient.find((itemFind) => itemFind.name === item.material_name).value / 100).toFixed(1)
        })
      })
    })
  },
  mounted () {
    this.urlVal = window.location.host + '/index/designFromDetail/' + this.$route.params.id
    // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
    QRCode.toDataURL(this.urlVal, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      this.qrCodeUrl = url
      console.log(url)
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
