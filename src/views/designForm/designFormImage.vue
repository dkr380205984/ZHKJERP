<template>
  <div id="designFormImage">
    <div class="loadingShade"
      v-show="loading">
      <div class="main">
        <svg version="1.1"
          id="dc-spinner"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width:="38"
          height:="38"
          viewBox="0 0 38 38"
          preserveAspectRatio="xMinYMin meet">
          <text x="13"
            y="19"
            font-family="Monaco"
            font-size="2px"
            style="letter-spacing:0.6"
            fill="grey">工艺图加载中
            <animate attributeName="opacity"
              values="0.5;1;0.5"
              dur="2.8s"
              repeatCount="indefinite"></animate>
          </text>
          <text x="13"
            y="23"
            font-family="Monaco"
            font-size="2px"
            style="letter-spacing:0.6"
            fill="grey">请耐心等待...
            <animate attributeName="opacity"
              values="1;0.5;1"
              dur="2.8s"
              repeatCount="indefinite"></animate>
          </text>
          <path fill="#373a42"
            d="M20,35c-8.271,0-15-6.729-15-15S11.729,5,20,5s15,6.729,15,15S28.271,35,20,35z M20,5.203 C11.841,5.203,5.203,11.841,5.203,20c0,8.159,6.638,14.797,14.797,14.797S34.797,28.159,34.797,20 C34.797,11.841,28.159,5.203,20,5.203z">
          </path>
          <path fill="#373a42"
            d="M20,33.125c-7.237,0-13.125-5.888-13.125-13.125S12.763,6.875,20,6.875S33.125,12.763,33.125,20 S27.237,33.125,20,33.125z M20,7.078C12.875,7.078,7.078,12.875,7.078,20c0,7.125,5.797,12.922,12.922,12.922 S32.922,27.125,32.922,20C32.922,12.875,27.125,7.078,20,7.078z">
          </path>
          <path fill="#2AA198"
            stroke="#2AA198"
            stroke-width="0.6027"
            stroke-miterlimit="10"
            d="M5.203,20 c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z"
            transform="rotate(298.277 20 20)">
            <animateTransform attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              calcMode="spline"
              keySplines="0.4, 0, 0.2, 1"
              keyTimes="0;1"
              dur="2s"
              repeatCount="indefinite"></animateTransform>
          </path>
          <path fill="#859900"
            stroke="#859900"
            stroke-width="0.2027"
            stroke-miterlimit="10"
            d="M7.078,20 c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203 C12.875,32.922,7.078,27.125,7.078,20z"
            transform="rotate(138.75 20 20)">
            <animateTransform attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="1.8s"
              repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </div>
    </div>
    <div class="canvasCtn">
      <canvas ref="myCanvas"
        :width="canvasWidth"
        :height="canvasHeight"></canvas>
      <canvas ref="myCanvasBack"
        v-show="selectColour!==-1&&(warpInfo.back_status===1||weftInfo.back_status===1)"
        :width="canvasWidth"
        :height="canvasHeight"></canvas>
    </div>
    <div class="colourCtn">
      <div class="colour"
        v-for="(item,index) in warpInfo.color_data"
        :key="index"
        :class="{'active':index===selectColour}"
        @click="getColour(index)">{{item.product_color}}</div>
    </div>
  </div>
</template>
<script>
import { craftOne } from '@/assets/js/api.js'
export default {
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
      canvasWidth: 0,
      showMagnifier: false,
      showMagnifierBack: false,
      warpCanvas: [], // 经纬向绘图数据
      weftCanvas: [],
      warpCanvasBack: [], // 反面
      weftCanvasBack: [],
      selectColour: -1, // 选择配色方案
      colorNumber: {
        warp: [],
        weft: []
      }, // 根数信息
      colorWeight: {
        warp: [],
        weft: []
      },
      weight: 0,
      coefficient: []
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
    enlargeImg (point, ifBack) {
      // 放大镜效果实现
      if (this.showMagnifier && !ifBack) {
        const drawWidth = 100
        const drawHeight = 100
        let dom = this.$refs.magnifier
        let ctx = dom.getContext('2d')
        let img = this.$refs.img
        ctx.clearRect(0, 0, 400, 400)
        ctx.beginPath()
        ctx.drawImage(img, point.offsetX * 4 - drawWidth / 2, point.offsetY * 4 - drawHeight / 2, drawWidth, drawHeight, 0, 0, drawWidth * 4, drawHeight * 4)
      }
      if (this.showMagnifierBack && ifBack === 'back') {
        const drawWidth = 100
        const drawHeight = 100
        let dom = this.$refs.magnifierBack
        let ctx = dom.getContext('2d')
        let img = this.$refs.imgBack
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
        let canvasMatrixBack = []
        let warpWidth = this.canvasWidth / this.warpCanvas.length
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
        this.warpCanvasBack.reduce((totalWarp, itemWarp) => {
          this.weftCanvasBack.reduce((totalWeft, itemWeft) => {
            canvasMatrixBack.push({
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
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        canvasMatrix.forEach((item) => {
          ctx.fillStyle = item.color
          ctx.fillRect(item.x, item.y, item.width, item.height)
        })
        let domBack = this.$refs.myCanvasBack
        let ctxBack = domBack.getContext('2d')
        ctxBack.beginPath()
        ctxBack.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        canvasMatrixBack.forEach((item) => {
          ctxBack.fillStyle = item.color
          ctxBack.fillRect(item.x, item.y, item.width, item.height)
        })
        this.loading = false
      }, 100)
    }
  },
  mounted () {
    this.canvasWidth = document.body.clientWidth - 20
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
      this.material.materialWarp = this.warpInfo.assist_material
      this.material.materialWeft = this.weftInfo.assist_material
      this.coefficient = data.yarn_coefficient
      this.tableData.warp.mergeCells = JSON.parse(this.warpInfo.merge_data)
      this.tableData.weft.mergeCells = JSON.parse(this.weftInfo.merge_data)
      this.tableData.warpBack.mergeCells = JSON.parse(this.warpInfo.merge_data_back)
      this.tableData.weftBack.mergeCells = JSON.parse(this.weftInfo.merge_data_back)
      this.GL = data.draft_method.GL
      this.GLFlag = data.draft_method.GLFlag
      this.PM = data.draft_method.PM
      this.PMFlag = data.draft_method.PMFlag
      // 计算克重信息
      let arrWarp = JSON.parse(this.warpInfo.warp_rank).slice(1, 5)
      this.tableData.warp.mergeCells.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWarp[item.row - 1][i] = arrWarp[item.row - 1][item.col]
          }
        }
      })
      let arrWeft = JSON.parse(this.weftInfo.weft_rank).slice(1, 5)
      this.tableData.weft.mergeCells.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWeft[item.row - 1][i] = arrWeft[item.row - 1][item.col]
          }
        }
      })
      let arrWarpBack = JSON.parse(this.warpInfo.warp_rank_back).slice(1, 5)
      this.tableData.warpBack.mergeCells.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWarpBack[item.row - 1][i] = arrWarpBack[item.row - 1][item.col]
          }
        }
      })
      let arrWeftBack = JSON.parse(this.weftInfo.weft_rank_back).slice(1, 5)
      this.tableData.weftBack.mergeCells.forEach((item) => {
        if (item.row === 3 || item.row === 4) {
          for (let i = (item.col + 1); i < (item.col + item.colspan); i++) {
            arrWeftBack[item.row - 1][i] = arrWeftBack[item.row - 1][item.col]
          }
        }
      })
      for (let i = 0; i < arrWarp[0].length; i++) {
        const x = arrWarp[1][i] ? arrWarp[1][i] : 1
        const y = arrWarp[2][i] ? arrWarp[2][i] : 1
        const z = arrWarp[3][i] ? arrWarp[3][i] : 1
        this.colorNumber.warp[arrWarp[0][i]] = this.colorNumber.warp[arrWarp[0][i]] ? this.colorNumber.warp[arrWarp[0][i]] : 0
        this.colorNumber.warp[arrWarp[0][i]] += x * y * z
      }
      for (let i = 0; i < arrWeft[0].length; i++) {
        const x = arrWeft[1][i] ? arrWeft[1][i] : 1
        const y = arrWeft[2][i] ? arrWeft[2][i] : 1
        const z = arrWeft[3][i] ? arrWeft[3][i] : 1
        this.colorNumber.weft[arrWeft[0][i]] = this.colorNumber.weft[arrWeft[0][i]] ? this.colorNumber.weft[arrWeft[0][i]] : 0
        this.colorNumber.weft[arrWeft[0][i]] += x * y * z
      }
      for (let i = 0; i < arrWarpBack[0].length; i++) {
        const x = arrWarpBack[1][i] ? arrWarpBack[1][i] : 1
        const y = arrWarpBack[2][i] ? arrWarpBack[2][i] : 1
        const z = arrWarpBack[3][i] ? arrWarpBack[3][i] : 1
        this.colorNumber.warp[arrWarpBack[0][i]] += x * y * z
      }
      for (let i = 0; i < arrWeftBack[0].length; i++) {
        const x = arrWeftBack[1][i] ? arrWeftBack[1][i] : 1
        const y = arrWeftBack[2][i] ? arrWeftBack[2][i] : 1
        const z = arrWeftBack[3][i] ? arrWeftBack[3][i] : 1
        this.colorNumber.weft[arrWeftBack[0][i]] += x * y * z
      }
      this.warpInfo.material_data.forEach((item) => {
        item.apply.forEach((itemChild) => {
          this.colorWeight.warp[itemChild] = (this.colorNumber.warp[itemChild] * (this.weftInfo.neichang + this.weftInfo.rangwei) * data.yarn_coefficient.find((itemFind) => itemFind.name === item.material_name).value / 100).toFixed(1)
        })
      })
      this.weftInfo.material_data.forEach((item) => {
        item.apply.forEach((itemChild) => {
          this.colorWeight.weft[itemChild] = (this.colorNumber.weft[itemChild] * this.warpInfo.reed_width * data.yarn_coefficient.find((itemFind) => itemFind.name === item.material_name).value / 100).toFixed(1)
        })
      })
      this.colorWeight.warp.forEach((item) => {
        this.weight += item === 'NaN' ? 0 : Number(item)
      })
      this.colorWeight.weft.forEach((item) => {
        this.weight += item === 'NaN' ? 0 : Number(item)
      })
      this.canvasHeight = (this.weftInfo.neichang + this.weftInfo.rangwei) / this.warpInfo.reed_width * this.canvasWidth
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
      let warpTableBack = this.getFlatTable(this.warpInfo.warp_rank_back, 'warpInfo', 'merge_data_back').map((item) => {
        if (!item.GLorPM) {
          item.GLorPM = 'Ⅰ'
        }
        return item
      })
      let weftTableBack = this.getFlatTable(this.weftInfo.weft_rank_back, 'weftInfo', 'merge_data_back').map((item) => {
        if (!item.GLorPM) {
          item.GLorPM = 'A'
        }
        return item
      })
      // 将展开的合并信息结合穿综和纹版信息
      let warpGetPMNum = []
      let weftGetGLNum = []
      let warpGetPMNumBack = []
      let weftGetGLNumBack = []
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
      warpTableBack.forEach((item) => {
        let len = warpGetPMNumBack.length
        if (len > 0) {
          if (warpGetPMNumBack[len - 1].PM === item.GLorPM) {
            warpGetPMNumBack[len - 1].number += parseInt(item.number)
          } else {
            warpGetPMNumBack.push({
              PM: item.GLorPM,
              number: parseInt(item.number)
            })
          }
        } else {
          warpGetPMNumBack.push({
            PM: item.GLorPM,
            number: parseInt(item.number)
          })
        }
      })
      weftTableBack.forEach((item) => {
        let len = weftGetGLNumBack.length
        if (len > 0) {
          if (weftGetGLNumBack[len - 1].GL === item.GLorPM) {
            weftGetGLNumBack[len - 1].number += parseInt(item.number)
          } else {
            weftGetGLNumBack.push({
              GL: item.GLorPM,
              number: parseInt(item.number)
            })
          }
        } else {
          weftGetGLNumBack.push({
            GL: item.GLorPM,
            number: parseInt(item.number)
          })
        }
      })
      let warpGetPM = []
      let weftGetGL = []
      let warpGetPMBack = []
      let weftGetGLBack = []
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
      warpGetPMNumBack.forEach((item) => {
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
            warpGetPMBack = warpGetPMBack.concat(PMFlatArr)
          }
          warpGetPMBack = warpGetPMBack.concat(PMFlatArr.filter((item, index) => index < remainder))
        } else {
          let PM = this.PM[this.romanNum.indexOf(item.PM)]
          let PMArr = PM.value.split(',')
          let times = parseInt(PM.number / PMArr.length)
          let remainder = PM.number % PMArr.length
          for (let i = 0; i < times; i++) {
            warpGetPMBack = warpGetPMBack.concat(PMArr)
          }
          warpGetPMBack = warpGetPMBack.concat(PMArr.filter((item, index) => index < remainder))
        }
      })
      weftGetGLNumBack.forEach((item) => {
        let GL = this.mergeArray(this.GL[this.alphabet.indexOf(item.GL)]).filter((item) => item) // 剔除null
        let times = item.number / GL.length
        let remainder = item.number % GL.length
        for (let i = 0; i < times; i++) {
          weftGetGLBack = weftGetGLBack.concat(GL)
        }
        weftGetGLBack = weftGetGLBack.concat(GL.filter((item, index) => index < remainder))
      })
      // 获取画图数据
      let warpCanvas = []
      let weftCanvas = []
      let warpCanvasBack = []
      let weftCanvasBack = []
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
      warpTableBack.forEach((item) => {
        for (let i = 0; i < item.number; i++) {
          warpCanvasBack.push({
            color: item.color,
            PM: warpGetPMBack[warpCanvasBack.length]
          })
        }
      })
      weftTableBack.forEach((item) => {
        for (let i = 0; i < item.number; i++) {
          weftCanvasBack.push({
            color: item.color,
            GL: weftGetGLBack[weftCanvasBack.length]
          })
        }
      })
      // 保存下画图数据，方便在切换配色的时候使用
      this.warpCanvas = warpCanvas
      this.weftCanvas = weftCanvas
      if (this.warpInfo.back_status === 1 && this.weftInfo.back_status === 1) {
        this.warpCanvasBack = warpCanvasBack
        this.weftCanvasBack = weftCanvasBack
      } else if (this.warpInfo.back_status === 1 && this.weftInfo.back_status === 0) {
        this.warpCanvasBack = warpCanvasBack
        this.weftCanvasBack = weftCanvas
      } else if (this.warpInfo.back_status === 0 && this.weftInfo.back_status === 1) {
        this.warpCanvasBack = warpCanvas
        this.weftCanvasBack = weftCanvasBack
      }
      this.getColour(0)
    })
  }
}
</script>
<style lang="less" scoped>
body {
  background: red;
}
@import "~@/assets/css/designFormImage.less";
</style>
