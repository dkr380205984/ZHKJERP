<template>
  <div id="productList"
    v-loading="loading">
    <div class="head">
      <h2>设计单列表</h2>
      <el-input placeholder="输入设计单精确搜索"
        suffix-icon="el-icon-search"
        v-model="searchVal"></el-input>
    </div>
    <div class="body">
      <div class="filterCtn"
        style="justify-content:flex-end;display: flex;">
        <div class="rightFilter">
          <el-date-picker v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="pickTime">
          </el-date-picker>
        </div>
      </div>
      <div class="canvasDraw">
        <div class="canvasCtn"
          v-for="item in list"
          :key="item.id"
          @click="$router.push('/index/designFormPlanDetail/'+item.id)"
          :ref="'ctn'+item.id">
          <i class="el-icon-close"
            @click.stop="deleteCraft(item.id)"></i>
          <canvas :ref="'ref'+item.id"
            height="170"
            width="170"
            style="padding:10px 10px 5px 10px"></canvas>
          <div class="canvasContent">{{item.title}}</div>
          <div class="canvasContent2">{{item.user_name}} / {{item.create_time}}</div>
        </div>
      </div>
    </div>
    <div class="suspend">
      <span @click="getCraftList"
        :class="{'blue':!noMore,'red':noMore}"
        style="border-radius:4px">{{noMore?'加载完毕':'加载更多'}}</span>
    </div>
  </div>
</template>

<script>
import { productTppeList, craftList, craftDelete } from '@/assets/js/api.js'
export default {
  data () {
    return {
      noMore: false,
      loading: true,
      searchVal: '',
      value: '',
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }],
        start_time: '',
        end_time: ''
      },
      pages: 0,
      list: []
    }
  },
  methods: {
    getCraftList () {
      if (!this.noMore) {
        this.pages++
        this.loading = true
        craftList({
          'company_id': window.sessionStorage.getItem('company_id'),
          'limit': 10,
          'category_id': this.categoryVal,
          'type_id': this.typesVal,
          'style_id': this.styleVal,
          'page': this.pages,
          'start_time': this.start_time,
          'end_time': this.end_time,
          'craft_code': this.searchVal,
          'is_draft': 1
        }).then((res) => {
          this.loading = false
          if (res.data.data.length === 0) {
            this.noMore = true
          } else {
            this.list = this.list.concat(res.data.data)
            this.$nextTick(() => {
              this.list.forEach((item) => {
                // 经纬表格初始化
                let warpData = item.warp_data.warp_rank
                let longSort = item.warp_data.warp_rank_bottom
                let weftData = item.weft_data.weft_rank
                let longSort2 = item.weft_data.weft_rank_bottom
                // 处理颜色
                let colorData = {
                  warpColorData: [],
                  weftColorData: []
                }
                item.color_data.forEach((item) => {
                  if (item.type === 0) {
                    colorData.warpColorData.push(item)
                  } else {
                    colorData.weftColorData.push(item)
                  }
                })
                // 经向单元格合并操作 mergeCells是冗余数据,暂不处理
                let warpMerge2 = [] // 经向第二层数据合并 用于画图
                let mergeCells = []
                let col = 0
                let colspan = 0
                let unNull = 0 // 遇到第一个不为null的数开始计算
                let mark = 1 // 用于标记不为null的值 用于画图xunhuan字段获取
                let point = []
                warpData[1].forEach((item, index) => {
                  if (item === '') {
                    point.push(index)
                  }
                })
                warpData[1][point[0]] = 1
                point.forEach((item, index) => {
                  if (point[index + 1] && (point[index + 1] - item) > 1) {
                    warpData[1][point[index + 1]] = 1
                  }
                })
                warpData[1] = warpData[1].map((item) => {
                  return item === '' ? null : item
                })
                warpData[1].forEach((item, index) => {
                  if (item || index === warpData[1].length - 1) {
                    // 遇到第一个不为null的数开始计算,否则初始化col
                    if (unNull > 0) {
                      if (item === null && index === warpData[1].length - 1) {
                        mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan + 1 })
                        warpMerge2.push({ 'buchang': colspan + 1, 'xunhuan': mark })
                      } else {
                        mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan })
                        warpMerge2.push({ 'buchang': colspan, 'xunhuan': mark })
                      }
                      if (parseInt(item) === 1 && index === warpData[1].length - 1) {
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
                warpData[2].forEach((item, index) => {
                  if (item === '') {
                    point.push(index)
                  }
                })
                warpData[2][point[0]] = 1
                point.forEach((item, index) => {
                  if (point[index + 1] && (point[index + 1] - item) > 1) {
                    warpData[2][point[index + 1]] = 1
                  }
                })
                warpData[2] = warpData[2].map((item) => {
                  return item === '' ? null : item
                })
                warpData[2].forEach((item, index) => {
                  if (item !== null || index === warpData[2].length - 1) {
                    // 遇到第一个不为null的数开始计算,否则初始化col
                    if (unNull > 0) {
                      if (item === null && index === warpData[2].length - 1) {
                        mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan + 1 })
                        warpMerge3.push({ 'buchang': colspan + 1, 'xunhuan': mark2 })
                      } else {
                        mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan })
                        warpMerge3.push({ 'buchang': colspan, 'xunhuan': mark2 })
                      }
                      if (parseInt(item) && index === warpData[1].length - 1) {
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
                // 经向画图数据格式获取 将三维数组合并成二维
                let Arr = [] // 第一次合并数组 存放结果
                let ArrMain = [] // 第二次合并数组
                let markBuchang = 0 // 标记步长
                let colorArr = colorData.warpColorData[0].color_scheme
                let numArr = warpData[0]
                if (warpMerge2.length > 0) {
                  warpMerge2.forEach((item) => {
                    for (let index2 = 0; index2 < item.xunhuan; index2++) {
                      for (let index3 = markBuchang; index3 < item.buchang + markBuchang; index3++) {
                        Arr.push({
                          color: colorArr[longSort[index3]].value,
                          number: numArr[index3],
                          index: index3,
                          colorIndex: longSort[index3]
                        })
                      }
                    }
                    markBuchang = item.buchang + markBuchang
                  })
                } else {
                  Arr = warpData[0].map((item, index) => {
                    return {
                      color: colorArr[longSort[index]].value,
                      number: numArr[index],
                      index: index,
                      colorIndex: longSort[index]
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
                // 纬向单元格合并操作
                let weftMerge2 = [] // 纬向第二层数据合并 用于画图
                mergeCells = []
                col = 0
                colspan = 0
                unNull = 0
                mark = 1
                point = []
                weftData[1].forEach((item, index) => {
                  if (item === '') {
                    point.push(index)
                  }
                })
                weftData[1][point[0]] = 1
                point.forEach((item, index) => {
                  if (point[index + 1] && (point[index + 1] - item) > 1) {
                    weftData[1][point[index + 1]] = 1
                  }
                })
                weftData[1] = weftData[1].map((item) => {
                  return item === '' ? null : item
                })
                weftData[1].forEach((item, index) => {
                  if (item || index === weftData[1].length - 1) {
                    // 遇到第一个不为null的数开始计算,否则初始化col
                    if (unNull > 0) {
                      if (!item && index === weftData[1].length - 1) {
                        mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan + 1 })
                        weftMerge2.push({ 'buchang': colspan + 1, 'xunhuan': mark })
                      } else {
                        mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan })
                        weftMerge2.push({ 'buchang': colspan, 'xunhuan': mark })
                      }
                      if (parseInt(item) === 1 && index === weftData[1].length - 1) {
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
                weftData[2].forEach((item, index) => {
                  if (item === '') {
                    point.push(index)
                  }
                })
                weftData[2][point[0]] = 1
                point.forEach((item, index) => {
                  if (point[index + 1] && (point[index + 1] - item) > 1) {
                    weftData[2][point[index + 1]] = 1
                  }
                })
                weftData[2] = weftData[2].map((item) => {
                  return item === '' ? null : item
                })
                weftData[2].forEach((item, index) => {
                  if (item || index === weftData[2].length - 1) {
                    // 遇到第一个不为null的数开始计算,否则初始化col
                    if (unNull > 0) {
                      if (!item && index === weftData[2].length - 1) {
                        mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan + 1 })
                        weftMerge3.push({ 'buchang': colspan + 1, 'xunhuan': mark2 })
                      } else {
                        mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan })
                        weftMerge3.push({ 'buchang': colspan, 'xunhuan': mark2 })
                      }
                      if (parseInt(item) === 1 && index === weftData[1].length - 1) {
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
                // 纬向画图数据格式获取 将三维数组合并成二维
                let Arr2 = [] // 第一次合并数组 存放结果
                let ArrMain2 = [] // 第二次合并数组
                let colorArr2 = colorData.weftColorData[0].color_scheme
                let numArr2 = weftData[0]
                markBuchang = 0 // 标记步长
                if (weftMerge2.length > 0) {
                  weftMerge2.forEach((item) => {
                    for (let index2 = 0; index2 < item.xunhuan; index2++) {
                      for (let index3 = markBuchang; index3 < item.buchang + markBuchang; index3++) {
                        Arr2.push({
                          color: colorArr2[longSort2[index3]].value,
                          number: numArr2[index3],
                          index: index3,
                          colorIndex: longSort2[index3]
                        })
                      }
                    }
                    markBuchang = item.buchang + markBuchang
                  })
                } else {
                  Arr2 = weftData[0].map((item, index) => {
                    return {
                      color: colorArr2[longSort2[index]].value,
                      number: numArr2[index],
                      index: index,
                      colorIndex: longSort2[index] // 记录下颜色所处的位置,在修改配色方案的时候有用
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
                // 保存下绘图的数据
                this.warp_canvas = ArrMain
                this.weft_canvas = ArrMain2
                let lineWidth = 170 / item.warp_data.weft // 经向粗细
                let ref = 'ref' + item.id
                let dom = this.$refs[ref]
                let ctx = dom[0].getContext('2d')
                ArrMain.reduce((total, current, index) => {
                  ctx.globalAlpha = 0.5
                  ctx.beginPath()
                  ctx.fillStyle = current.color
                  ctx.rect(total, 0, current.number * lineWidth, 170)
                  ctx.fill()
                  return total + current.number * lineWidth
                }, 0)
                let lineHeight = 170 / item.weft_data.total
                ArrMain2.reduce((total, current, index) => {
                  ctx.globalAlpha = 0.3
                  ctx.beginPath()
                  ctx.fillStyle = current.color
                  ctx.rect(0, total, 170, current.number * lineHeight)
                  ctx.fill()
                  return total + current.number * lineHeight
                }, 0)
              })
            })
          }
        })
      } else {
        this.$message.error({
          message: '已加载所有设计单'
        })
      }
    },
    // 删除设计单
    deleteCraft (id) {
      this.$confirm('请确认是否删除该设计单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        craftDelete({
          id: id
        }).then((res) => {
          let ctn = 'ctn' + id
          let dom = this.$refs[ctn]
          dom[0].style.display = 'none'
          this.$message.success({
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    pickTime (date) {
      if (date) {
        this.start_time = date[0]
        this.end_time = date[1]
      } else {
        this.start_time = ''
        this.end_time = ''
      }
      this.list = []
      this.noMore = false
      this.pages = 0
      this.getCraftList()
    }
  },
  watch: {
    searchVal () {
      this.pages = 0
      this.list = []
      this.noMore = false
      this.getCraftList()
    }
  },
  computed: {
  },
  filters: {
  },
  mounted () {
    this.getCraftList()
    productTppeList({
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      if (res.data.status) {
        this.category = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productList.less";
</style>
<style lang="less">
#productList {
  .el-carousel__arrow {
    color: #fff;
    background: #1a95ff;
    &:hover {
      background: #48aaff;
    }
  }
}
</style>
<style lang="less" scoped>
.canvasDraw {
  display: flex;
  flex-wrap: wrap;
  .canvasCtn {
    margin: 10px;
    width: 190px;
    height: 240px;
    position: relative;
    .el-icon-close {
      position: absolute;
      right: -2px;
      top: -2px;
      border-radius: 50%;
      padding: 3px;
      cursor: pointer;
      background: #f56c6c;
      color: #fff;
      display: none;
    }
    &:hover {
      .el-icon-close {
        display: block;
      }
      background: rgb(229, 243, 255);
    }
    .canvasContent {
      text-align: center;
      color: #666;
    }
    .canvasContent2 {
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
