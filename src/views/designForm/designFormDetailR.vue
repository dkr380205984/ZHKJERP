<template>
  <div id="designFormDetail"
    v-loading="loading">
    <div class="head">
      <h2>工艺单详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">产品基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box4">
              <div class="label">产品编号：</div>
              <div class="content important">{{productInfo.product_code}}</div>
            </div>
            <div class="box box4">
              <div class="label">产品名称：</div>
              <div class="content">{{productInfo.category_info.product_category}}/{{productInfo.type_name}}/{{productInfo.style_name}}</div>
            </div>
            <div class="box box4">
              <div class="label">产品花型：</div>
              <div class="content">{{productInfo.flower_id}}</div>
            </div>
            <div class="box box4">
              <div class="label">产品配色：</div>
              <div class="content">
                <span v-for="(item,index) in productInfo.color"
                  :key="index">
                  <span>{{item.name}}</span>
                  <span v-if="index<productInfo.color.length - 1">/</span>
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box4">
              <div class="label">产品成分：</div>
              <div class="content">
                <span v-for="(item,index) in productInfo.materials"
                  :key="item.id">{{item.ingredient_name}}({{item.ingredient_value}}%){{index>0?'/':''}}</span>
              </div>
            </div>
            <div class="box box4">
              <div class="label">创建日期：</div>
              <div class="content">{{productInfo.create_time}}</div>
            </div>
            <div class="box box4">
              <div class="label">创建人：</div>
              <div class="content">{{productInfo.user_name}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box1">
              <div class="label">产品规格：</div>
              <div class="content">
                <div class="oneLine"
                  v-for="(value,key,index) in productInfo.size"
                  :key="index">
                  <span>{{key}}</span>
                  <span style="margin-left:16px"
                    v-for="itemSize in value"
                    :key="itemSize.id">
                    <span>{{itemSize.size_name}}：</span>
                    <span>{{itemSize.size_value}}cm</span>
                  </span>
                  <span style="margin-left:16px">{{value[0].weight}}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">经向</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row"
            style="margin-bottom:0px;">
            <div class="box box1">
              <div class="label">配色方案：</div>
              <div class="content"
                style="margin-bottom:16px;"
                v-for="(item,index) in warpInfo.color_data"
                :key="index">
                <span class="colorLabel">{{item.product_color}}：</span>
                <div class="colorBox"
                  v-for="(itemColor,indexColor) in item.color_scheme"
                  :key="indexColor"
                  :style="{'background':itemColor.value}">
                  <span class="colorText">{{filterMethods(indexColor)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row"
            style="margin-top:0px;">
            <div class="box box1">
              <div class="label">主要原料：</div>
              <div class="content">
                <span>{{yarn.yarnWarp.material_name}}</span>
                <div class="colorBox"
                  v-for="(item,index) in yarn.yarnWarp.apply"
                  :key="index">
                  <span class="colorText">{{filterMethods(item)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row"
            v-show="yarn.yarnOtherWarp.length>0">
            <div class="box box1">
              <div class="label">次要原料：</div>
              <div class="content"
                v-for="(item,index) in yarn.yarnOtherWarp"
                :key="index">
                <span>{{item.material_name}}</span>
                <div class="colorBox"
                  v-for="(item,index) in item.apply"
                  :key="index">
                  <span class="colorText">{{filterMethods(item)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row"
            v-show="material.materialWarp.length>0">
            <div class="box box1">
              <div class="label">辅助原料：</div>
              <div class="content"
                v-for="(item,index) in material.materialWarp"
                :key="index">
                <span>{{item.value}}</span>
                <span style="margin-left:16px">{{item.number}}</span>
                <div class="colorBox"
                  v-for="(item,index) in item.array"
                  :key="index">
                  <span class="colorText">{{filterMethods(item)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box1">
              <div class="label">经向排列：</div>
              <div class="content">
                <hot-table :settings="tableData.warp"
                  ref="warp">
                </hot-table>
              </div>
            </div>
          </div>
          <!-- <div class="row">
            <div class="box box1">
              <div class="label">经向反面：</div>
              <div class="content">
                <hot-table :settings="tableData.warpBack"
                  ref="warpBack">
                </hot-table>
              </div>
            </div>
          </div> -->
          <div class="row">
            <div class="box box2">
              <div class="label">整经头纹：</div>
              <div class="content">{{warpInfo.weft}}根</div>
            </div>
            <div class="box box2">
              <div class="label">边型：</div>
              <div class="content">{{warpInfo.side_id}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">整经门幅：</div>
              <div class="content">{{warpInfo.width?warpInfo.width + 'cm':'暂无'}}</div>
            </div>
            <div class="box box2">
              <div class="label">机型：</div>
              <div class="content">{{warpInfo.machine_id}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">筘号：</div>
              <div class="content">{{warpInfo.reed?warpInfo.reed+'筘':'暂无'}}</div>
            </div>
            <div class="box box2">
              <div class="label">穿筘法：</div>
              <div class="content">{{warpInfo.drafting_method?warpInfo.drafting_method+'根/筘':'暂无'}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">筘幅：</div>
              <div class="content">{{warpInfo.reed_width+'cm'}}
              </div>
            </div>
            <div class="box box2">
              <div class="label">筘幅说明：</div>
              <div class="content">{{warpInfo.reed_width_data?warpInfo.reed_width_data:'暂无'}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">综页：</div>
              <div class="content">{{warpInfo.sum_up?warpInfo.sum_up + '页':'暂无'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">纬向</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row"
            style="margin-bottom:0">
            <div class="box box1">
              <div class="label">配色方案：</div>
              <div style="margin-bottom:16px;"
                class="content"
                v-for="(item,index) in warpInfo.color_data"
                :key="index">
                <span class="colorLabel">{{item.product_color}}：</span>
                <div class="colorBox"
                  v-for="(itemColor,indexColor) in item.color_scheme"
                  :key="indexColor"
                  :style="{'background':itemColor.value}">
                  <span class="colorText">{{filterMethods(indexColor)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row"
            style="margin-top:0">
            <div class="box box1">
              <div class="label">主要原料：</div>
              <div class="content">
                <span>{{yarn.yarnWeft.material_name}}</span>
                <div class="colorBox"
                  v-for="(item,index) in yarn.yarnWeft.apply"
                  :key="index">
                  <span class="colorText">{{filterMethods(item)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row"
            v-show="yarn.yarnOtherWeft.length>0">
            <div class="box box1">
              <div class="label">次要原料：</div>
              <div class="content"
                v-for="(item,index) in yarn.yarnOtherWeft"
                :key="index">
                <span>{{item.material_name}}</span>
                <div class="colorBox"
                  v-for="(item,index) in item.apply"
                  :key="index">
                  <span class="colorText">{{filterMethods(item)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row"
            v-show="material.materialWeft.length>0">
            <div class="box box1">
              <div class="label">辅助原料：</div>
              <div class="content"
                v-for="(item,index) in material.materialWeft"
                :key="index">
                <span>{{item.value}}</span>
                <span style="margin-left:16px">{{item.number}}</span>
                <div class="colorBox"
                  v-for="(item,index) in item.array"
                  :key="index">
                  <span class="colorText">{{filterMethods(item)}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box1">
              <div class="label">纬向排列：</div>
              <div class="content">
                <hot-table :settings="tableData.weft"
                  ref="weft">
                </hot-table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">组织法:</div>
              <div class="content">{{weftInfo.organization_id}}</div>
            </div>
            <div class="box box2">
              <div class="label">纬密:</div>
              <div class="content">{{((weftInfo.total / (weftInfo.neichang + weftInfo.rangwei)) * 100).toFixed(2)}}梭/cm</div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">机上坯幅:</div>
              <div class="content">{{weftInfo.peifu?weftInfo.peifu + 'cm':'暂无'}}</div>
            </div>
            <div class="box box2">
              <div class="label">坯幅说明:</div>
              <div class="content">{{weftInfo.peifu_data?weftInfo.peifu_data:'暂无'}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">上齿牙:</div>
              <div class="content">{{weftInfo.shangchiya?weftInfo.shangchiya+'牙':'暂无'}}</div>
            </div>
            <div class="box box2">
              <div class="label">下齿牙:</div>
              <div class="content">{{weftInfo.xiachiya?weftInfo.xiachiya+'牙':'暂无'}}</div>
            </div>
          </div>
          <div class="row">
            <div class="box box1">
              <div class="label">让位说明:</div>
              <div class="content">内长：{{weftInfo.neichang+'cm'}}&nbsp;&nbsp;让位：{{weftInfo.rangwei+'cm'}}&nbsp;&nbsp; 总计：{{weftInfo.total+'根'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">穿综法</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="label">纹版图：</div>
          <div class="content"
            v-for="(item1,index1) in GL"
            :key="index1"
            style="overflow:hidden">
            <div class="mark">{{alphabet[index1]}}：</div>
            <div v-for="(item2,index2) in item1"
              :key="index2"
              class="deltaCtn">
              <div class="leftCtn">
                <span>{{index2+1}}</span>
              </div>
              <div class="rightCtn">
                <el-input placeholder="数字间用逗号分隔"
                  v-model="item2[0]"
                  disabled></el-input>
                <el-input placeholder="数字间用逗号分隔"
                  v-model="item2[1]"
                  disabled></el-input>
                <el-input placeholder=""
                  v-model="item2[2]"
                  disabled></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">穿综循环：</div>
          <div class="treeCtn">
            <div class="node"
              v-for="(item1,index1) in PM"
              :key="index1">
              <div class="numbers">{{romanNum[index1]}}</div>
              <div class="lineCol"
                v-show="PMFlag === 'complex'"></div>
              <div class="nodeBox">
                <div class="box box1">
                  <el-input v-if="PMFlag === 'normal'"
                    placeholder="根数"
                    disabled
                    v-model="item1.number">
                  </el-input>
                  <el-input v-if="PMFlag === 'complex'"
                    placeholder="总数"
                    v-model="item1.total"
                    disabled>
                  </el-input>
                  <em class="unit right">根</em>
                </div>
                <div class="box box2">
                  <div class="lines">
                    <div class="line1">
                      <el-input v-if="PMFlag === 'normal'"
                        placeholder="穿综循环"
                        v-model="item1.value"
                        disabled>
                      </el-input>
                    </div>
                    <div class="line2">
                      <em class="unit left">×</em>
                      <el-input style="padding-left:5px;box-sizing:border-box;"
                        placeholder="遍数"
                        v-model="item1.repeat"
                        disabled>
                      </el-input>
                      <em class="unit right">遍</em>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nodeChild"
                v-show="PMFlag === 'complex'"
                v-for="(item2,index2) in item1.children"
                :key="index2">
                <div class="nodeBox">
                  <div class="lineRow"></div>
                  <div class="box box1">
                    <el-input placeholder="根数"
                      disabled
                      v-model="item2.number">
                    </el-input>
                    <em class="unit right">根</em>
                  </div>
                  <div class="box box2">
                    <div class="lines"
                      v-for="(item3,index3) in item2.children"
                      :key="index3">
                      <div class="line1">
                        <el-input placeholder="穿综循环"
                          disabled
                          v-model="item3.value">
                        </el-input>
                      </div>
                      <div class="line2">
                        <em class="unit left">×</em>
                        <el-input style="padding-left:5px;box-sizing:border-box;"
                          placeholder="遍数"
                          disabled
                          v-model="item3.repeat">
                        </el-input>
                        <em class="unit right">遍</em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">图像</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="label">选择配色：</div>
          <div class="buttons">
            <div class="button"
              v-for="(item,index) in warpInfo.color_data"
              :key="index"
              :class="{'active':index===selectColour}"
              @click="getColour(index)">{{item.product_color}}</div>
          </div>
        </div>
        <div class="canvasCtn">
          <canvas ref="myCanvas"
            style="display:none"
            width="2400"
            :height="canvasHeight">
          </canvas>
          <!-- canvas转图像的容器 -->
          <img ref="img"
            @mousedown.prevent="showMagnifier=true"
            @mousemove="enlargeImg($event)"
            @mouseup="showMagnifier=false"
            style="width:600px"
            :style="{'height':canvasHeight/4 + 'px'}"
            :class="{'cursorMagnifier':showMagnifier}"
            src="" />
          <!-- 利用canvas实现放大镜的容器 -->
          <canvas class="floatRightTop"
            ref="magnifier"
            width="400"
            height="400" />
          <!-- 放大镜鼠标位置 -->
          <!-- <div class="mouse"
            :style="{'left':mouseX + 'px','top':mouseY + 'px'}"></div> -->
        </div>
      </div>
      <div class="bottomBtnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.push('/index/designFormUpdate/'+$route.params.id)">修改</div>
      </div>
    </div>
  </div>
</template>
<script>
import { craftOne } from '@/assets/js/api.js'
import { HotTable } from '@handsontable/vue'
import enCH from '@/assets/js/languages.js'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
Handsontable.languages.registerLanguageDictionary(enCH) // 注册中文字典
export default {
  components: {
    HotTable
  },
  data () {
    return {
      loading: true,
      productInfo: {
        product_code: '',
        type_name: '',
        flower_id: '',
        style_name: '',
        category_info: {
          product_category: '',
          name: ''
        },
        color: [],
        materials: [],
        create_time: '',
        user_name: '',
        size: []
      },
      warpInfo: {
        color_data: '',
        weft: null, // 总头纹
        side_id: null, // 边形
        width: null, // 整经门幅
        machine_id: null, // 机型
        reed: null, // 筘号
        reed_method: null, // 穿筘法
        reed_width: null, // 筘幅
        reed_width_data: null, // 筘幅说明
        sum_up: null, // 综页
        drafting_method: null // 穿综法
        // additional_data: null// 穿综法备注
      },
      weftInfo: {
        color_data: '',
        organization_id: null, // 组织法
        peifu: null, // 胚服
        peifu_data: null, // 胚幅说明
        weimi: null, // 纬密
        shangchiya: null, // 上齿牙
        xiachiya: null, // 下齿牙
        neichang: null, // 内长
        rangwei: null, // 让位
        total: null // 总计
      },
      yarn: {
        yarnWarp: {
          material_name: '',
          apply: []
        },
        yarnWeft: {
          material_name: '',
          apply: []
        },
        yarnOtherWarp: [],
        yarnOtherWeft: []
      },
      material: {
        materialWarp: [],
        materialWeft: []
      },
      tableData: {
        warp: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '纹版图']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            cellProperties.readOnly = true
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: false,
          className: 'handsontable',
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          width: '100%',
          height: 250,
          mergeCells: []
        },
        warpBack: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '纹版图']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            cellProperties.readOnly = true
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: false,
          className: 'handsontable',
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          width: '100%',
          height: 250,
          mergeCells: []
        },
        weft: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '纹版图']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            cellProperties.readOnly = true
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: false,
          className: 'handsontable',
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          width: '100%',
          height: 250,
          mergeCells: []
        },
        weftBack: {
          data: [
            [1],
            [null],
            [null],
            [null],
            [null],
            [null]
          ],
          rowHeaders: (index) => {
            let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项', '纹版图']
            return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
          },
          rowHeaderWidth: 80,
          minCols: 1,
          autoColumnSize: true, // 自适应宽度
          cells: (row, col, prop) => {
            var cellProperties = {}
            cellProperties.readOnly = true
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              // 清空节点并重新渲染
              Handsontable.dom.empty(td)
              let node = document.createElement('DIV')
              let CSS = td.style
              node.innerText = value
              td.appendChild(node)
              // 设置样式
              CSS.color = '#666'
              CSS.width = '38px'
              CSS.height = '38px'
              CSS.lineHeight = '38px'
              CSS.textAlign = 'center'
              if (row === 0) {
                CSS.background = '#F0F0F0'
              }
              return td
            }
            return cellProperties
          },
          contextMenu: false,
          className: 'handsontable',
          licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
          width: '100%',
          height: 250,
          mergeCells: []
        }
      },
      PMFlag: 'normal',
      PM: [{
        value: '', // 循环的值，用逗号分割
        repeat: '', // 循环次数
        number: '', // 纱线根数
        GL: '', // 高级穿综法选纹版图
        total: 0, // 高级穿综法统计值
        children: [{
          number: '',
          children: [{
            value: '',
            repeat: ''
          }]
        }]
      }],
      remarkPM: '',
      // GL:graphic layout 纹版图缩写
      GL: [[['', '', '']]],
      GLFlag: 'normal',
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      romanNum: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'],
      canvasHeight: 0, // 图像高度
      showMagnifier: false,
      warpCanvas: [], // 经纬向绘图数据
      weftCanvas: [],
      selectColour: 0// 选择配色方案
    }
  },
  methods: {
    // 展平合并信息
    getFlatTable (table, type, merge) {
      let tableArr = JSON.parse(table)
      let mergeTable = JSON.parse(this[type][merge])
      // 获取完整的合并项信息
      let firstMerge = this.getMergeInfo(mergeTable, 3, tableArr[0].length)
      let secondMerge = this.getMergeInfo(mergeTable, 4, tableArr[0].length)
      // 第一步，处理纹版图的合并信息
      let GLMerge = mergeTable.filter(item => item.row === 5)
      GLMerge.forEach((item) => {
        for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
          tableArr[item.row][i] = tableArr[item.row][item.col]
        }
      })
      // 第二步，处理合并项的合并信息
      let firstArr = []
      firstMerge.forEach((item) => {
        let temporaryStorage = [] // 临时存储合并项
        for (let i = item.col; i < (item.col + item.colspan); i++) {
          temporaryStorage.push({
            order: tableArr[0][i],
            color: tableArr[1][i],
            number: tableArr[2][i],
            GLorPM: tableArr[5][i]
          })
        }
        for (let i = 0; i < (tableArr[item.row][item.col] || 1); i++) {
          firstArr.push(temporaryStorage)
        }
      })
      let secondArr = []
      secondMerge.forEach((item) => {
        let temporaryStorage = firstArr.filter((itemFilter) => {
          return itemFilter[0].order > item.col && itemFilter[0].order <= (item.col + item.colspan)
        })
        for (let i = 0; i < (tableArr[item.row][item.col] || 1); i++) {
          secondArr.push(temporaryStorage)
        }
      })
      // 多维数组展平
      let flattenArr = this.mergeArray(secondArr)
      return flattenArr
    },
    // 合并项信息处理
    getMergeInfo (mergeTable, row, length) {
      let mergeArr = mergeTable.filter(item => item.row === row).sort((a, b) => { return a.col - b.col })
      let saveMerge = []
      let col = 0
      let mergeIndex = 0
      while (col < length) {
        if (mergeArr[mergeIndex]) {
          if (col < mergeArr[mergeIndex].col) {
            saveMerge.push({
              col: col,
              colspan: mergeArr[mergeIndex].col - col,
              row: row
            })
            col = mergeArr[mergeIndex].col
          } else {
            saveMerge.push({
              col: mergeArr[mergeIndex].col,
              colspan: mergeArr[mergeIndex].colspan,
              row: row
            })
            col = mergeArr[mergeIndex].col + mergeArr[mergeIndex].colspan
            mergeIndex++
          }
        } else {
          saveMerge.push({
            col: col,
            colspan: length - col,
            row: row
          })
          col = length
        }
      }
      return saveMerge
    },
    // 合并数组
    mergeArray (arr, saveArr) {
      let array = saveArr || []
      arr.forEach((item) => {
        if (Array.isArray(item)) {
          this.mergeArray(item, array)
        } else {
          array.push(item)
        }
      })
      return array
    },
    // 匹配主/夹名称
    filterMethods (index) {
      if (index === 0) {
        return '主'
      } else {
        return '夹' + index
      }
    },
    // 放大镜效果实现
    enlargeImg (point) {
      // 放大镜效果实现
      if (this.showMagnifier) {
        const drawWidth = 100
        const drawHeight = 100
        let dom = this.$refs.magnifier
        let ctx = dom.getContext('2d')
        let img = this.$refs.img
        ctx.clearRect(0, 0, 400, 400)
        ctx.beginPath()
        ctx.drawImage(img, point.offsetX * 4 - drawWidth / 2, point.offsetY * 4 - drawHeight / 2, drawWidth, drawHeight, 0, 0, drawWidth * 4, drawHeight * 4)
      }
    },
    // 换颜色
    getColour (index) {
      this.loading = true
      this.selectColour = index
      setTimeout(() => {
        let warpColor = this.warpInfo.color_data[index].color_scheme
        let weftColor = this.warpInfo.color_data[index].color_scheme
        let canvasMatrix = []
        let warpWidth = 600 / this.warpCanvas.length * 4
        let weftWidth = this.canvasHeight / this.weftCanvas.length
        this.warpCanvas.reduce((totalWarp, itemWarp) => {
          this.weftCanvas.reduce((totalWeft, itemWeft) => {
            canvasMatrix.push({
              x: totalWarp,
              y: totalWeft,
              width: warpWidth,
              height: weftWidth,
              color: itemWeft.GL.replace(/，/g, ',').split(',').find((item) => item === itemWarp.PM) ? warpColor[itemWarp.color].value : weftColor[itemWeft.color].value
            })
            return totalWeft + weftWidth
          }, 0)
          return totalWarp + warpWidth
        }, 0)
        let dom = this.$refs.myCanvas
        let ctx = dom.getContext('2d')
        ctx.beginPath()
        ctx.clearRect(0, 0, 600, this.canvasHeight)
        canvasMatrix.forEach((item) => {
          ctx.fillStyle = item.color
          ctx.fillRect(item.x, item.y, item.width, item.height)
        })
        let img = this.$refs.img
        img.src = dom.toDataURL() // canvas转图片
        this.loading = false
      }, 100)
    }
  },
  mounted () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      let data = res.data.data
      this.productInfo = data.product_info
      this.warpInfo = data.warp_data
      this.weftInfo = data.weft_data
      this.yarn.yarnWarp = this.warpInfo.material_data.find((item) => item.type_material === 1)
      this.yarn.yarnWeft = this.weftInfo.material_data.find((item) => item.type_material === 1)
      this.yarn.yarnOtherWarp = this.warpInfo.material_data.filter((item) => item.type_material === 2)
      this.yarn.yarnOtherWeft = this.weftInfo.material_data.filter((item) => item.type_material === 2)
      this.material.materialWarp = JSON.parse(this.warpInfo.assist_material)
      this.material.materialWeft = JSON.parse(this.weftInfo.assist_material)
      this.$refs.warp.hotInstance.loadData(JSON.parse(this.warpInfo.warp_rank).map((item, index) => {
        return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
      }))
      this.$refs.weft.hotInstance.loadData(JSON.parse(this.weftInfo.weft_rank).map((item, index) => {
        return index !== 1 ? item : item.map((itemJia) => { return this.filterMethods(itemJia) })
      }))
      this.tableData.warp.mergeCells = JSON.parse(this.warpInfo.merge_data)
      this.tableData.weft.mergeCells = JSON.parse(this.weftInfo.merge_data)
      this.GL = data.draft_method.GL
      this.GLFlag = data.draft_method.GLFlag
      this.PM = data.draft_method.PM
      this.PMFlag = data.draft_method.PMFlag
      this.canvasHeight = (this.weftInfo.neichang + this.weftInfo.rangwei) / this.warpInfo.reed_width * 600 * 4
      // console.log('经向表格:', JSON.parse(this.warpInfo.warp_rank))
      // console.log('纬向表格:', JSON.parse(this.weftInfo.weft_rank))
      // console.log('纹版图:', this.GL)
      // console.log('穿综法:', this.PM)
      // 展平合并信息
      let warpTable = this.getFlatTable(this.warpInfo.warp_rank, 'warpInfo', 'merge_data').map((item) => {
        if (!item.GLorPM) {
          item.GLorPM = 'Ⅰ'
        }
        return item
      })
      let weftTable = this.getFlatTable(this.weftInfo.weft_rank, 'weftInfo', 'merge_data').map((item) => {
        if (!item.GLorPM) {
          item.GLorPM = 'A'
        }
        return item
      })
      // 将展开的合并信息结合穿综和纹版信息
      let warpGetPMNum = []
      let weftGetGLNum = []
      warpTable.forEach((item) => {
        let len = warpGetPMNum.length
        if (len > 0) {
          if (warpGetPMNum[len - 1].PM === item.GLorPM) {
            warpGetPMNum[len - 1].number += parseInt(item.number)
          } else {
            warpGetPMNum.push({
              PM: item.GLorPM,
              number: parseInt(item.number)
            })
          }
        } else {
          warpGetPMNum.push({
            PM: item.GLorPM,
            number: parseInt(item.number)
          })
        }
      })
      weftTable.forEach((item) => {
        let len = weftGetGLNum.length
        if (len > 0) {
          if (weftGetGLNum[len - 1].GL === item.GLorPM) {
            weftGetGLNum[len - 1].number += parseInt(item.number)
          } else {
            weftGetGLNum.push({
              GL: item.GLorPM,
              number: parseInt(item.number)
            })
          }
        } else {
          weftGetGLNum.push({
            GL: item.GLorPM,
            number: parseInt(item.number)
          })
        }
      })
      let warpGetPM = []
      let weftGetGL = []
      warpGetPMNum.forEach((item) => {
        // 高级穿综
        if (this.PMFlag === 'complex') {
          let PM = this.PM[this.romanNum.indexOf(item.PM)]
          let PMFlatArr = []
          PM.children.forEach((itemPM) => {
            let PMVal = []
            itemPM.children.forEach((itemChildren) => {
              for (let i = 0; i < parseInt(itemChildren.repeat); i++) {
                PMVal = PMVal.concat(itemChildren.value.split(','))
              }
            })
            let times = parseInt(itemPM.number / PMVal.length) // 循环次数
            let remainder = itemPM.number % PMVal.length // 取余数
            for (let i = 0; i < times; i++) {
              PMFlatArr = PMFlatArr.concat(PMVal)
            }
            PMFlatArr = PMFlatArr.concat(PMVal.filter((item, index) => index < remainder))
          })
          let times = parseInt(item.number / PMFlatArr.length)
          let remainder = item.number % PMFlatArr.length
          for (let i = 0; i < times; i++) {
            warpGetPM = warpGetPM.concat(PMFlatArr)
          }
          warpGetPM = warpGetPM.concat(PMFlatArr.filter((item, index) => index < remainder))
        } else {
          let PM = this.PM[this.romanNum.indexOf(item.PM)]
          let PMArr = PM.value.split(',')
          let times = parseInt(PM.number / PMArr.length)
          let remainder = PM.number % PMArr.length
          for (let i = 0; i < times; i++) {
            warpGetPM = warpGetPM.concat(PMArr)
          }
          warpGetPM = warpGetPM.concat(PMArr.filter((item, index) => index < remainder))
        }
      })
      weftGetGLNum.forEach((item) => {
        let GL = this.mergeArray(this.GL[this.alphabet.indexOf(item.GL)]).filter((item) => item) // 剔除null
        let times = item.number / GL.length
        let remainder = item.number % GL.length
        for (let i = 0; i < times; i++) {
          weftGetGL = weftGetGL.concat(GL)
        }
        weftGetGL = weftGetGL.concat(GL.filter((item, index) => index < remainder))
      })
      // 获取画图数据
      let warpCanvas = []
      let weftCanvas = []
      warpTable.forEach((item) => {
        for (let i = 0; i < item.number; i++) {
          warpCanvas.push({
            color: item.color,
            PM: warpGetPM[warpCanvas.length]
          })
        }
      })
      weftTable.forEach((item) => {
        for (let i = 0; i < item.number; i++) {
          weftCanvas.push({
            color: item.color,
            GL: weftGetGL[weftCanvas.length]
          })
        }
      })
      // 保存下画图数据，方便在切换配色的时候使用
      this.warpCanvas = warpCanvas
      this.weftCanvas = weftCanvas
      // 用JS 处理矩阵数据，优化画图
      let canvasMatrix = []
      let warpWidth = 600 / warpCanvas.length * 4
      let weftWidth = this.canvasHeight / weftCanvas.length
      let warpColor = this.warpInfo.color_data[0].color_scheme
      let weftColor = this.warpInfo.color_data[0].color_scheme
      warpCanvas.reduce((totalWarp, itemWarp) => {
        weftCanvas.reduce((totalWeft, itemWeft) => {
          canvasMatrix.push({
            x: totalWarp,
            y: totalWeft,
            width: warpWidth,
            height: weftWidth,
            color: itemWeft.GL.replace(/，/g, ',').split(',').find((item) => item === itemWarp.PM) ? warpColor[itemWarp.color].value : weftColor[itemWeft.color].value
          })
          return totalWeft + weftWidth
        }, 0)
        return totalWarp + warpWidth
      }, 0)
      this.loading = false
      // 画图部分优化
      this.$nextTick(() => {
        let dom = this.$refs.myCanvas
        let ctx = dom.getContext('2d')
        ctx.beginPath()
        canvasMatrix.forEach((item) => {
          ctx.fillStyle = item.color
          ctx.fillRect(item.x, item.y, item.width, item.height)
        })
        let img = this.$refs.img
        img.src = dom.toDataURL() // canvas转图片
      })
    })
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/designFormDetailR.less";
</style>
<style lang="less">
#designFormDetail {
  .el-input.is-disabled .el-input__inner {
    background: #fff;
    cursor: default;
  }
  .nodeBox {
    .el-input__inner {
      border: 0;
    }
  }
  .smallWidth {
    .el-input__inner {
      width: 80px !important;
    }
  }
  .inline-input {
    width: 294px;
    .el-select {
      .el-input__inner {
        width: 80px !important;
      }
    }
    .el-input__inner {
      width: 158px !important;
    }
  }
  .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
  .el-input__icon {
    line-height: 32px !important;
  }
  .formCtn {
    .el-input__inner {
      width: 294px;
    }
  }
  .handsontable input,
  .handsontable textarea {
    text-align: center;
    line-height: 38px;
  }
  .textBtn {
    position: absolute;
    line-height: 32px;
    left: 105px;
    top: 0;
    font-size: 12px;
    color: #909399;
    cursor: pointer;
    &:hover {
      color: #1a95ff;
    }
  }
}
</style>
