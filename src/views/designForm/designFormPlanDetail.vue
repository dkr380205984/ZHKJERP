<template>
 <div id="designFormDetail" v-loading="loading">
    <div class="head">
      <h2>工艺单详情页</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">产品基本信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">设计单名称:</span>
            <span class="content">{{code}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">经向</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn" style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">配色方案:</span>
            <div class="columnCtn" v-for="(itemColour,indexColour) in color_data.warpColorData" :key="indexColour">
              <div class="name">配色 {{indexColour+1}} ：</div>
              <div class="value">
                <el-tooltip class="item" effect="dark" :content="itemColor.name + ' : '+ warpWeightArr[indexColor].toFixed(2) + '克'" placement="top" v-for="(itemColor,indexColor) in itemColour.color_scheme" :key="indexColor">
                  <div class="bgBlock">
                    <div :style="{'background-color':itemColor.value}" class="shadeBlock">{{indexColor|filterMethods}}</div>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label">主要原料:</span>
            <div class="content">{{this.material_data.warpMaterialMain}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">次要原料:</span>
            <div class="columnCtn" v-for="(itemMaterial,indexMaterial) in material_data.warpMaterialOther" :key="indexMaterial">
              <div class="name">{{itemMaterial.name}}：</div>
              <div class="value">
                <div class="bgBlock" v-for="(itemColor,indexColor) in itemMaterial.value" :key="indexColor"><div class="shadeBlock" style="background:rgba(0,0,0,0.5)">{{itemColor|filterMethods}}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine rowLine">
            <span class="label">经向排列:</span>
            <div class="overflowCtn" :style="{'overflow-x':longSort.length>12?'auto':'hidden'}">
              <div class="selectCtn">
                <div class="tableConnect">
                  <div class="selectOnce" v-for="(item,index) in longSort" :key="index">
                    {{item|filterMethods}}
                  </div>
                </div>
              </div>
              <div class="excelCtn">
                <hot-table :settings="hotSettings" :height="140" ref="table"></hot-table>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">整经总头纹:</span>
            <div class="content">{{warp_data.weft}}根</div>
          </div>
          <div class="inputCtn">
            <span class="label">边型:</span>
            <div class="content">{{warp_data.side_name}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">整经门幅:</span>
            <div class="content">{{warp_data.width?warp_data.width:'暂无信息'}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">机型:</span>
            <div class="content">{{warp_data.machine_name}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">筘号:</span>
            <div class="content">{{warp_data.reed?warp_data.reed+'筘':'暂无信息'}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">穿筘法:</span>
            <div class="content">{{warp_data.reed_method?warp_data.reed_method+'根/筘':'暂无信息'}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">筘幅:</span>
            <div class="content">{{warp_data.reed_width?warp_data.reed_width+'厘米':'暂无信息'}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">综页:</span>
            <div class="content">{{warp_data.sum_up?warp_data.sum_up+'支':'暂无信息'}}</div>
          </div>
          <div class="inputCtn" style="width:615px">
            <span class="label">穿综法:</span>
            <div class="content">{{warp_data.drafting_method?warp_data.drafting_method:'暂无信息'}}</div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">纬向</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">组织法:</span>
            <div class="content">{{weft_data.organization_name}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">机上坯幅:</span>
            <div class="content">{{weft_data.peifu}}厘米</div>
          </div>
          <div class="inputCtn">
            <span class="label">纬密:</span>
            <div class="content">{{weft_data.weimi}}梭/厘米</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">上齿牙:</span>
            <div class="content">{{weft_data.shangchiya?weft_data.shangchiya+'牙':'暂无信息'}}</div>
          </div>
          <div class="inputCtn">
            <span class="label">下齿牙:</span>
            <div class="content">{{weft_data.xiachiya?weft_data.xiachiya+'牙':'暂无信息'}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">让位要求:</span>
            <div class="content">{{'内长：'+ weft_data.neichang+'cm / 让位：'+ weft_data.rangwei +'cm / 总计：'+ weft_data.total + '梭'}}</div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">配色方案:</span>
            <div class="columnCtn" v-for="(itemColour,indexColour) in color_data.weftColorData" :key="indexColour">
              <div class="name">配色 {{indexColour+1}} ：</div>
              <div class="value">
                <el-tooltip class="item" effect="dark" :content="itemColor.name +' : '+ weftWeightArr[indexColor].toFixed(2) + '克'" placement="top" v-for="(itemColor,indexColor) in itemColour.color_scheme" :key="indexColor">
                  <div class="bgBlock" ><div :style="{'background-color':itemColor.value}" class="shadeBlock">{{indexColor|filterMethods}}</div></div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label">主要原料:</span>
            <div class="content">{{this.material_data.weftMaterialMain}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">次要原料:</span>
            <div class="columnCtn" v-for="(itemMaterial,indexMaterial) in material_data.weftMaterialOther" :key="indexMaterial">
              <div class="name">{{itemMaterial.name}}：</div>
              <div class="value">
                <div class="bgBlock" v-for="(itemColor,indexColor) in itemMaterial.value" :key="indexColor"><div class="shadeBlock" style="background:rgba(0,0,0,0.5)">{{itemColor|filterMethods}}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine rowLine">
            <span class="label">纬向排列:</span>
            <div class="overflowCtn" :style="{'overflow-x':longSort2.length>12?'auto':'hidden'}">
              <div class="selectCtn">
                <div class="tableConnect">
                  <div class="selectOnce" v-for="(item,index) in longSort2" :key="index">
                    {{item|filterMethods}}
                  </div>
                </div>
              </div>
              <div class="excelCtn">
                <hot-table :settings="hotSettings2" :height="140" ref="table"></hot-table>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
         <div class="inputCtn">
            <span class="label">产品净重:</span>
            <span class="content">{{weight}}克</span>
          </div>
          <div class="inputCtn">
            <span class="label">工艺单净重:</span>
            <span class="content">{{weigthAll}}克</span>
          </div>
          <div class="inputCtn">
            <span class="label">损耗比:</span>
            <span class="content">{{((weigthAll - weight)/weight*100).toFixed(2)}}%</span>
          </div>
        </div>
         <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">纱线系数:</span>
            <span class="content" style="width:100%"  v-for="item in yarn" :key="item.name">{{item.name}} : {{item.value}}克</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">图像预览</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">选择配色方案:</span>
            <div class="colourCtn">
              <div class="colour" @click="chooseWhichColour=index" :class="{'active':index===chooseWhichColour}" v-for="(item,index) in color_data.warpColorData" :key="index">配色{{index+1}}</div>
            </div>
          </div>
        </div>
        <div class="canvasCtn" :style="{height:600*chang/kuan + 'px'}">
          <canvas ref="myCanvas" width="600" :height="600*chang/kuan"></canvas>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn"  @click="$router.push('/index/designFormPlanUpdate/' + $route.params.id)">修改</div>
      </div>
    </div>
 </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import enCH from '@/assets/js/languages.js'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css' // 注册中文字典
import { craftOne } from '@/assets/js/api.js'
Handsontable.languages.registerLanguageDictionary(enCH)
export default {
  components: {
    HotTable
  },
  data () {
    return {
      weftWeightArr: [],
      warpWeightArr: [],
      code: '',
      loading: true,
      chang: 2, // 初始化长
      kuan: 1, // 初始化宽
      chooseWhichColour: 0, // 选择哪款配色方案进行渲染
      longSort: [],
      longSort2: [],
      hotSettings: {
        data: [ // 数据，可以是数据，对象
          [''],
          [''],
          ['']
        ],
        colWidths: 62, // 列宽
        rowHeights: [34, 34, 34],
        className: 'htCenter htMiddle ',
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        minCols: 1,
        minRows: 3,
        mergeCells: [

        ]
      },
      hotSettings2: {
        data: [ // 数据，可以是数据，对象
          [''],
          [''],
          ['']
        ],
        colWidths: 62, // 列宽
        rowHeights: [34, 34, 34],
        className: 'htCenter htMiddle ',
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        minCols: 1,
        minRows: 3,
        mergeCells: [

        ]
      },
      product: {
        category_info: {
          name: '',
          product_category: ''
        },
        flower_id: '',
        style_name: '',
        type_name: '',
        materials: [],
        size: []
      },
      color_data: {
        warpColorData: [],
        weftColorData: []
      },
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
      },
      warp_canvas: [], // 保存下经向绘图数据用于颜色重绘
      werf_canvas: [], // 保存下纬向绘图数据用于颜色重绘
      weight: 0,
      yarn: [],
      weigthAll: 0
    }
  },
  methods: {
    copy (id) {
      window.open('/designFormTable/' + id)
    }
  },
  filters: {
    // 主 夹1 夹2命名
    filterMethods (index) {
      if (index === 0) {
        return '主'
      } else {
        return '夹' + index
      }
    }
  },
  watch: {
    chooseWhichColour: function (newVal, oldVal) {
      // 处理下颜色数据
      let ArrMain = this.warp_canvas.map((item) => {
        return {
          number: item.number,
          index: item.index,
          color: this.color_data.warpColorData[newVal].color_scheme[item.colorIndex].value,
          colorIndex: item.colorIndex
        }
      })
      let ArrMain2 = this.weft_canvas.map((item) => {
        return {
          number: item.number,
          index: item.index,
          color: this.color_data.weftColorData[newVal].color_scheme[item.colorIndex].value,
          colorIndex: item.colorIndex
        }
      })
      // 画图
      this.$nextTick(() => {
        let lineWidth = 500 / this.warp_data.weft // 经向粗细
        let dom = this.$refs.myCanvas
        let ctx = dom.getContext('2d')
        ctx.clearRect(0, 0, 600, (600 * this.chang / this.kuan))
        ArrMain.reduce((total, current, index) => {
          ctx.globalAlpha = 0.5
          ctx.beginPath()
          ctx.fillStyle = current.color
          ctx.rect(total, 50, current.number * lineWidth, (600 * this.chang / this.kuan - 100))
          ctx.fill()
          return total + current.number * lineWidth
        }, 50)
        let lineHeight = (600 * this.chang / this.kuan - 100) / this.weft_data.total
        ArrMain2.reduce((total, current, index) => {
          ctx.globalAlpha = 0.3
          ctx.beginPath()
          ctx.fillStyle = current.color
          ctx.rect(50, total, 500, current.number * lineHeight)
          ctx.fill()
          return total + current.number * lineHeight
        }, 50)
      })
      // 保存下绘图的数据
      this.warp_canvas = ArrMain
      this.weft_canvas = ArrMain2
    }
  },
  mounted () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      const data = res.data.data
      this.weight = data.weight
      this.yarn = data.yarn_coefficient
      this.code = data.title
      data.color_data.forEach((item) => {
        if (item.type === 0) {
          this.color_data.warpColorData.push(item)
        } else {
          this.color_data.weftColorData.push(item)
        }
      })
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
      this.warp_data = data.warp_data
      this.weft_data = data.weft_data
      this.hotSettings.data = data.warp_data.warp_rank
      this.longSort = data.warp_data.warp_rank_bottom
      // 经向单元格合并操作
      let warpMerge2 = [] // 经向第二层数据合并 用于画图
      let mergeCells = []
      let col = 0
      let colspan = 0
      let unNull = 0 // 遇到第一个不为null的数开始计算
      let mark = 1 // 用于标记不为null的值 用于画图xunhuan字段获取
      let point = []
      this.hotSettings.data[1].forEach((item, index) => {
        if (item === '') {
          point.push(index)
        }
      })
      this.hotSettings.data[1][point[0]] = 1
      point.forEach((item, index) => {
        if (point[index + 1] && (point[index + 1] - item) > 1) {
          this.hotSettings.data[1][point[index + 1]] = 1
        }
      })
      this.hotSettings.data[1] = this.hotSettings.data[1].map((item) => {
        return item === '' ? null : item
      })
      this.hotSettings.data[1].forEach((item, index) => {
        if (item || index === this.hotSettings.data[1].length - 1) {
          // 遇到第一个不为null的数开始计算,否则初始化col
          if (unNull > 0) {
            if (item === null && index === this.hotSettings.data[1].length - 1) {
              mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan + 1 })
              warpMerge2.push({ 'buchang': colspan + 1, 'xunhuan': mark })
            } else {
              mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan })
              warpMerge2.push({ 'buchang': colspan, 'xunhuan': mark })
            }
            if (parseInt(item) === 1 && index === this.hotSettings.data[1].length - 1) {
              warpMerge2.push({ 'buchang': 1, 'xunhuan': 1 })
            }
            colspan = 1
            col = index
          } else {
            colspan = 1
            col = index
            unNull++
          }
        } else {
          colspan++
        }
        if (item) {
          mark = item
        }
      })
      // 重置计算值
      col = 0
      colspan = 0
      unNull = 0
      let warpMerge3 = [] // 经向第三层数据合并 用于画图
      let mark2 = 1
      point = []
      this.hotSettings.data[2].forEach((item, index) => {
        if (item === '') {
          point.push(index)
        }
      })
      this.hotSettings.data[2][point[0]] = 1
      point.forEach((item, index) => {
        if (point[index + 1] && (point[index + 1] - item) > 1) {
          this.hotSettings.data[2][point[index + 1]] = 1
        }
      })
      this.hotSettings.data[2] = this.hotSettings.data[2].map((item) => {
        return item === '' ? null : item
      })
      this.hotSettings.data[2].forEach((item, index) => {
        if (item !== null || index === this.hotSettings.data[2].length - 1) {
          // 遇到第一个不为null的数开始计算,否则初始化col
          if (unNull > 0) {
            if (item === null && index === this.hotSettings.data[2].length - 1) {
              mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan + 1 })
              warpMerge3.push({ 'buchang': colspan + 1, 'xunhuan': mark2 })
            } else {
              mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan })
              warpMerge3.push({ 'buchang': colspan, 'xunhuan': mark2 })
            }
            if (parseInt(item) && index === this.hotSettings.data[1].length - 1) {
              warpMerge3.push({ 'buchang': 1, 'xunhuan': 1 })
            }
            colspan = 1
            col = index
          } else {
            colspan = 1
            col = index
            unNull++
          }
        } else {
          colspan++
        }
        if (item) {
          mark2 = item
        }
      })
      this.hotSettings.mergeCells = mergeCells
      // 经向画图数据格式获取 将三维数组合并成二维
      let Arr = [] // 第一次合并数组 存放结果
      let ArrMain = [] // 第二次合并数组
      let markBuchang = 0 // 标记步长
      let colorArr = this.color_data.warpColorData[this.chooseWhichColour].color_scheme
      let numArr = this.hotSettings.data[0]
      if (warpMerge2.length > 0) {
        warpMerge2.forEach((item) => {
          for (let index2 = 0; index2 < item.xunhuan; index2++) {
            for (let index3 = markBuchang; index3 < item.buchang + markBuchang; index3++) {
              Arr.push({
                color: colorArr[this.longSort[index3]].value,
                number: numArr[index3],
                index: index3,
                colorIndex: this.longSort[index3]
              })
            }
          }
          markBuchang = item.buchang + markBuchang
        })
      } else {
        Arr = this.hotSettings.data[0].map((item, index) => {
          return {
            color: colorArr[this.longSort[index]].value,
            number: numArr[index],
            index: index,
            colorIndex: this.longSort[index]
          }
        })
      }
      markBuchang = 0 // 初始化步长
      if (warpMerge3.length > 0 && warpMerge3.find((item) => item.buchang !== 1)) {
        warpMerge3.forEach((item) => {
          let lastMarkBuchang = markBuchang
          markBuchang = item.buchang + markBuchang
          for (let index2 = 0; index2 < item.xunhuan; index2++) {
            Arr.forEach((item2) => {
              if (lastMarkBuchang <= item2.index && item2.index < markBuchang) {
                ArrMain.push(item2)
              }
            })
          }
        })
      } else {
        ArrMain = Arr
      }
      this.longSort2 = data.weft_data.weft_rank_bottom
      this.hotSettings2.data = data.weft_data.weft_rank
      // 纬向单元格合并操作
      let weftMerge2 = [] // 纬向第二层数据合并 用于画图
      mergeCells = []
      col = 0
      colspan = 0
      unNull = 0
      mark = 1
      point = []
      this.hotSettings2.data[1].forEach((item, index) => {
        if (item === '') {
          point.push(index)
        }
      })
      this.hotSettings2.data[1][point[0]] = 1
      point.forEach((item, index) => {
        if (point[index + 1] && (point[index + 1] - item) > 1) {
          this.hotSettings2.data[1][point[index + 1]] = 1
        }
      })
      this.hotSettings2.data[1] = this.hotSettings2.data[1].map((item) => {
        return item === '' ? null : item
      })
      this.hotSettings2.data[1].forEach((item, index) => {
        if (item || index === this.hotSettings2.data[1].length - 1) {
          // 遇到第一个不为null的数开始计算,否则初始化col
          if (unNull > 0) {
            if (!item && index === this.hotSettings2.data[1].length - 1) {
              mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan + 1 })
              weftMerge2.push({ 'buchang': colspan + 1, 'xunhuan': mark })
            } else {
              mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan })
              weftMerge2.push({ 'buchang': colspan, 'xunhuan': mark })
            }
            if (parseInt(item) === 1 && index === this.hotSettings2.data[1].length - 1) {
              weftMerge2.push({ 'buchang': 1, 'xunhuan': 1 })
            }
            colspan = 1
            col = index
          } else {
            colspan = 1
            col = index
            unNull++
          }
        } else {
          colspan++
        }
        if (item) {
          mark = item
        }
      })
      // 重置计算值
      let weftMerge3 = [] // 经向第三层数据合并 用于画图
      mark2 = 1
      col = 0
      colspan = 0
      unNull = 0
      point = []
      this.hotSettings2.data[2].forEach((item, index) => {
        if (item === '') {
          point.push(index)
        }
      })
      this.hotSettings2.data[2][point[0]] = 1
      point.forEach((item, index) => {
        if (point[index + 1] && (point[index + 1] - item) > 1) {
          this.hotSettings2.data[2][point[index + 1]] = 1
        }
      })
      this.hotSettings2.data[2] = this.hotSettings2.data[2].map((item) => {
        return item === '' ? null : item
      })
      this.hotSettings2.data[2].forEach((item, index) => {
        if (item || index === this.hotSettings2.data[2].length - 1) {
          // 遇到第一个不为null的数开始计算,否则初始化col
          if (unNull > 0) {
            if (!item && index === this.hotSettings2.data[2].length - 1) {
              mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan + 1 })
              weftMerge3.push({ 'buchang': colspan + 1, 'xunhuan': mark2 })
            } else {
              mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan })
              weftMerge3.push({ 'buchang': colspan, 'xunhuan': mark2 })
            }
            if (parseInt(item) === 1 && index === this.hotSettings2.data[1].length - 1) {
              weftMerge3.push({ 'buchang': 1, 'xunhuan': 1 })
            }
            colspan = 1
            col = index
          } else {
            colspan = 1
            col = index
            unNull++
          }
        } else {
          colspan++
        }
        if (item) {
          mark2 = item
        }
      })
      this.hotSettings2.mergeCells = mergeCells
      // 纬向画图数据格式获取 将三维数组合并成二维
      let Arr2 = [] // 第一次合并数组 存放结果
      let ArrMain2 = [] // 第二次合并数组
      let colorArr2 = this.color_data.weftColorData[this.chooseWhichColour].color_scheme
      let numArr2 = this.hotSettings2.data[0]
      markBuchang = 0 // 标记步长
      if (weftMerge2.length > 0) {
        weftMerge2.forEach((item) => {
          for (let index2 = 0; index2 < item.xunhuan; index2++) {
            for (let index3 = markBuchang; index3 < item.buchang + markBuchang; index3++) {
              Arr2.push({
                color: colorArr2[this.longSort2[index3]].value,
                number: numArr2[index3],
                index: index3,
                colorIndex: this.longSort2[index3]
              })
            }
          }
          markBuchang = item.buchang + markBuchang
        })
      } else {
        Arr2 = this.hotSettings2.data[0].map((item, index) => {
          return {
            color: colorArr2[this.longSort2[index]].value,
            number: numArr2[index],
            index: index,
            colorIndex: this.longSort2[index] // 记录下颜色所处的位置,在修改配色方案的时候有用
          }
        })
      }
      markBuchang = 0 // 初始化步长
      if (weftMerge3.length > 0 && weftMerge3.find((item) => item.buchang !== 1)) {
        weftMerge3.forEach((item) => {
          let lastMarkBuchang = markBuchang
          markBuchang = item.buchang + markBuchang
          for (let index2 = 0; index2 < item.xunhuan; index2++) {
            Arr2.forEach((item2) => {
              if (lastMarkBuchang <= item2.index && item2.index < markBuchang) {
                ArrMain2.push(item2)
              }
            })
          }
        })
      } else {
        ArrMain2 = Arr2
      }
      // 新需求,要把主夹克重算出来
      // 处理下经纬向的数据,保证三行数据可以相乘
      let newWarpData = this.hotSettings.data.map((item, index) => {
        return item.map((item2, index2) => {
          if (item2) {
            return item2
          } else {
            for (let i = index2 - 1; i >= 0; i--) {
              if (item[i]) {
                return item[i]
              }
            }
          }
        })
      })
      let newWeftData = this.hotSettings2.data.map((item, index) => {
        return item.map((item2, index2) => {
          if (item2) {
            return item2
          } else {
            for (let i = index2 - 1; i >= 0; i--) {
              if (item[i]) {
                return item[i]
              }
            }
          }
        })
      })
      // 取纱线系数
      let warpWeight = []
      let weftWeight = []
      data.material_data.forEach((itemMaterial) => {
        if (itemMaterial.type === 0) {
          itemMaterial.apply.forEach((itemApply) => {
            warpWeight[itemApply] = data.yarn_coefficient.find((itemYarn) => {
              return itemYarn.name === itemMaterial.material_name
            }).value
          })
        } else if (itemMaterial.type === 1) {
          itemMaterial.apply.forEach((itemApply) => {
            weftWeight[itemApply] = data.yarn_coefficient.find((itemYarn) => {
              return itemYarn.name === itemMaterial.material_name
            }).value
          })
        }
      })
      // 根据经纬排列的下标和前面得到的两组数据计算最终的主夹克重
      data.warp_data.warp_rank_bottom.forEach((item, index) => {
        if (!this.warpWeightArr[item]) {
          this.warpWeightArr[item] = warpWeight[item] * newWarpData[0][index] * newWarpData[1][index] * newWarpData[2][index]
        } else {
          this.warpWeightArr[item] += warpWeight[item] * newWarpData[0][index] * newWarpData[1][index] * newWarpData[2][index]
        }
      })
      data.weft_data.weft_rank_bottom.forEach((item, index) => {
        if (!this.weftWeightArr[item]) {
          this.weftWeightArr[item] = weftWeight[item] * newWeftData[0][index] * newWeftData[1][index] * newWeftData[2][index]
        } else {
          this.weftWeightArr[item] += weftWeight[item] * newWeftData[0][index] * newWeftData[1][index] * newWeftData[2][index]
        }
      })
      // 计算下总重量
      this.weigthAll = (this.weftWeightArr.reduce((total, num) => {
        return total + num
      }, 0) + this.warpWeightArr.reduce((total, num) => {
        return total + num
      }, 0)).toFixed(2)
      // 保存下绘图的数据
      this.warp_canvas = ArrMain
      this.weft_canvas = ArrMain2
      this.chang = res.data.data.weft_data.neichang + res.data.data.weft_data.rangwei
      this.kuan = res.data.data.warp_data.reed_width
      // 画图
      this.$nextTick(() => {
        let lineWidth = 500 / this.warp_data.weft // 经向粗细
        let dom = this.$refs.myCanvas
        let ctx = dom.getContext('2d')
        ArrMain.reduce((total, current, index) => {
          ctx.globalAlpha = 0.5
          ctx.beginPath()
          ctx.fillStyle = current.color
          ctx.rect(total, 50, current.number * lineWidth, (600 * this.chang / this.kuan - 100))
          ctx.fill()
          return total + current.number * lineWidth
        }, 50)
        let lineHeight = (600 * this.chang / this.kuan - 100) / this.weft_data.total
        ArrMain2.reduce((total, current, index) => {
          ctx.globalAlpha = 0.3
          ctx.beginPath()
          ctx.fillStyle = current.color
          ctx.rect(50, total, 500, current.number * lineHeight)
          ctx.fill()
          return total + current.number * lineHeight
        }, 50)
      })
    })
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/designFormDetail.less';
</style>
