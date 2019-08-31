<template>
  <div id="designFormCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加工艺单</h2>
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
              <div class="content important">1234567</div>
            </div>
            <div class="box box4">
              <div class="label">产品名称：</div>
              <div class="content">10234</div>
            </div>
            <div class="box box4">
              <div class="label">产品花型：</div>
              <div class="content">10234</div>
            </div>
            <div class="box box4">
              <div class="label">产品配色：</div>
              <div class="content">产品配色</div>
            </div>
          </div>
          <div class="row">
            <div class="box box4">
              <div class="label">产品成分：</div>
              <div class="content">10234</div>
            </div>
            <div class="box box4">
              <div class="label">创建日期：</div>
              <div class="content">10234</div>
            </div>
            <div class="box box4">
              <div class="label">创建人：</div>
              <div class="content">10234</div>
            </div>
          </div>
          <div class="row">
            <div class="box box1">
              <div class="label">产品规格：</div>
              <div class="content">
                <div class="oneLine">一行内容</div>
                <div class="oneLine">一行内容</div>
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
        <div class="lineCtn">
          <div class="label">配色方案：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 配色方案</div>
            <div class="formCtn">
              <el-select placeholder="请选择配色方案"
                v-model="value"></el-select>
              <color-picker v-model="value"
                content="主"
                :colorArr="colorArr"></color-picker>
              <div class="addBtn"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                style="margin-left:16px;margin-top:0;float:none;display:inline-block;height:30px;width:38px;vertical-align:middle">
                <i class="el-icon-minus"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">主要原料：</div>
          <div class="content">
            <div class="formCtn">
              <el-select placeholder="请选择主要原料"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">次要原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 次要原料</div>
            <div class="formCtn">
              <el-select placeholder="请选择次要原料"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">辅助原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 辅助原料</div>
            <div class="formCtn">
              <el-select placeholder="请选择辅料"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">经向排列：</div>
          <div class="content">
            <i class="sliderCtn">
              <span class="text active">单</span>
              <span class="text">双</span>
            </i>
            <el-input v-model="value"
              style="width:214px;margin-left:19px;"
              placeholder="请输入插入列数">
              <template slot="append">列</template>
            </el-input>
            <div class="button"
              style="display:inline-block;width:3.5em;margin:0 0 0 24px;font-size:14px">添加</div>
            <el-input v-model="value"
              style="width:80px;margin-left:19px;"
              placeholder="列数">
            </el-input>
            <span style="color:#E9E9E9;margin:0 6px">~</span>
            <el-input v-model="value"
              style="width:80px;"
              placeholder="列数">
            </el-input>
            <div class="button"
              style="display:inline-block;width:3.5em;margin:0 0 0 24px;font-size:14px">倒序</div>
            <div class="button"
              style="display:inline-block;width:3.5em;margin:0 0 0 24px;font-size:14px">重置</div>
            <div class="table">
              <hot-table v-if="initTable"
                :settings="hotSettings"
                ref="table"></hot-table>
            </div>
          </div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box2">
              <div class="label">整经头纹：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入整经头纹">
                  <template slot="append">根</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">边形：</div>
              <div class="content">
                <el-select v-model="value"
                  placeholder="请选择边形"
                  style="width:294px"></el-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">整经门幅：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入整经头纹">
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">机型：</div>
              <div class="content">
                <el-select v-model="value"
                  placeholder="请选择机型"
                  style="width:294px"></el-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">筘号：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入筘号">
                  <template slot="append">筘</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">穿筘法：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入穿筘法">
                  <template slot="append">根/筘</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">筘幅：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入筘幅">
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">筘幅说明：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入筘幅说明"></el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">综页：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入综页">
                  <template slot="append">页</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">备注信息：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入备注信息"></el-input>
              </div>
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
          <div class="label">穿综法：</div>
          <div class="content">
            <el-select v-model="value"
              placeholder="请选择常用穿综法"
              style="width:294px"></el-select>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">纹版图：</div>
          <div class="content">
            <i class="sliderCtn">
              <span class="text active">普通</span>
              <span class="text">高级</span>
            </i>
            <div class="button"
              style="display:inline-block;width:5.5em;margin:0 0 0 24px;font-size:14px">添加纹版</div>
          </div>
          <div class="content"
            style="overflow:hidden">
            <div class="mark">A：</div>
            <div class="deltaCtn">
              <div class="leftCtn">
                <span>1</span>
              </div>
              <div class="rightCtn">
                <el-input placeholder="数字间用逗号分隔"
                  v-model="value"></el-input>
                <el-input placeholder="数字间用逗号分隔"
                  v-model="value"></el-input>
                <el-input placeholder="非必填项"
                  v-model="value"></el-input>
              </div>
            </div>
            <div class="deltaCtn">
              <div class="leftCtn">
                <span>2</span>
              </div>
              <div class="rightCtn">
                <el-input placeholder="数字间用逗号分隔"
                  v-model="value"></el-input>
                <el-input placeholder="数字间用逗号分隔"
                  v-model="value"></el-input>
                <el-input placeholder="非必填项"
                  v-model="value"></el-input>
              </div>
            </div>
            <div class="addBtn">
              <i class="el-icon-plus"></i>
            </div>
            <div class="addBtn">
              <i class="el-icon-minus"></i>
            </div>
          </div>
          <div class="content"
            style="overflow:hidden">
            <div class="mark">B：</div>
            <div class="deltaCtn">
              <div class="leftCtn">
                <span>1</span>
              </div>
              <div class="rightCtn">
                <el-input placeholder="数字间用逗号分隔"
                  v-model="value"></el-input>
                <el-input placeholder="数字间用逗号分隔"
                  v-model="value"></el-input>
                <el-input placeholder="非必填项"
                  v-model="value"></el-input>
              </div>
            </div>
            <div class="addBtn">
              <i class="el-icon-plus"></i>
            </div>
            <div class="addBtn">
              <i class="el-icon-minus"></i>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">穿综循环：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 穿综循环</div>
          </div>
          <div class="treeCtn">
            <div class="node">
              <div class="nodeBox">
                <div class="box box1">循环1</div>
                <div class="box box2">
                  <div class="lines">
                    <div class="line1">行1</div>
                    <div class="line2">行2</div>
                  </div>
                </div>
              </div>
              <div class="nodeBtn">
                <i class="el-icon-plus"></i>
              </div>
              <div class="nodeBtn">
                <i class="el-icon-minus"></i>
              </div>
              <div class="nodeChild">
                <div class="nodeBox">
                  <div class="box box1">循环1</div>
                  <div class="box box2">
                    <div class="lines">
                      <div class="line1">行1</div>
                      <div class="line2">行1</div>
                      <div class="oprText add">新增行</div>
                    </div>
                    <div class="lines">
                      <div class="line1">行1</div>
                      <div class="line2">行1</div>
                      <div class="oprText delete">删除行</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="node">
              <div class="nodeBox">
                <div class="box box1">循环1</div>
                <div class="box box2">
                  <div class="lines">
                    <div class="line1">行1</div>
                    <div class="line2">行2</div>
                  </div>
                </div>
              </div>
              <div class="nodeBtn">
                <i class="el-icon-plus"></i>
              </div>
              <div class="nodeBtn">
                <i class="el-icon-minus"></i>
              </div>
              <div class="nodeChild">
                <div class="nodeBox">
                  <div class="box box1">循环1</div>
                  <div class="box box2">
                    <div class="lines">
                      <div class="line1">行1</div>
                      <div class="line2">行1</div>
                      <div class="oprText add">新增行</div>
                    </div>
                    <div class="lines">
                      <div class="line1">行1</div>
                      <div class="line2">行1</div>
                      <div class="oprText delete">删除行</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">穿综备注：</div>
          <div class="content">
            <el-input style="width:294px"
              v-model="value"
              placeholder="请输入备注信息"></el-input>
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
          <div class="row">
            <div class="box box2">
              <div class="label">组织法:</div>
              <div class="content">
                <el-select v-model="value"
                  placeholder="请选择组织法"
                  style="width:294px"></el-select>
              </div>
            </div>
            <div class="box box2">
              <div class="label">纬密:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入纬密">
                  <template slot="append">梭/cm</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">机上坯幅:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入机上坯幅">
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">坯幅说明:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入坯幅说明">
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">上齿牙:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入上齿牙">
                  <template slot="append">牙</template>
                </el-input>
              </div>
            </div>
            <div class="box box2">
              <div class="label">下齿牙:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入下齿牙">
                  <template slot="append">牙</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">让位说明:</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入内长">
                  <template slot="prepend">内长</template>
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入让位">
                  <template slot="prepend">让位</template>
                  <template slot="append">cm</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  disabled
                  placeholder="待计算">
                  <template slot="prepend">总计</template>
                  <template slot="append">梭</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">配色方案：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 配色方案</div>
            <div class="formCtn">
              <el-select placeholder="请选择配色方案"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">主要原料：</div>
          <div class="content">
            <div class="formCtn">
              <el-select placeholder="请选择主要原料"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">次要原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 次要原料</div>
            <div class="formCtn">
              <el-select placeholder="请选择次要原料"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">辅助原料：</div>
          <div class="content">
            <div class="button"
              style="width:6em">+ 辅助原料</div>
            <div class="formCtn">
              <el-select placeholder="请选择辅料"
                v-model="value"></el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="label">纬向排列：</div>
          <div class="content">
            <i class="sliderCtn">
              <span class="text active">单</span>
              <span class="text">双</span>
            </i>
            <el-input v-model="value"
              style="width:214px;margin-left:19px;"
              placeholder="请输入插入列数">
              <template slot="append">列</template>
            </el-input>
            <div class="button"
              style="display:inline-block;width:3.5em;margin:0 0 0 24px;font-size:14px">添加</div>
            <el-input v-model="value"
              style="width:80px;margin-left:19px;"
              placeholder="列数">
            </el-input>
            <span style="color:#E9E9E9;margin:0 6px">~</span>
            <el-input v-model="value"
              style="width:80px;"
              placeholder="列数">
            </el-input>
            <div class="button"
              style="display:inline-block;width:3.5em;margin:0 0 0 24px;font-size:14px">倒序</div>
            <div class="button"
              style="display:inline-block;width:3.5em;margin:0 0 0 24px;font-size:14px">重置</div>
            <div class="table">
              <hot-table v-if="initTable"
                :settings="hotSettings"
                ref="table"></hot-table>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">其他信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="appendInfo">
          <div class="row">
            <div class="box box2">
              <div class="label">产品克重：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入产品克重">
                  <template slot="append">g</template>
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="box box2">
              <div class="label">纱线系数：</div>
              <div class="content">
                <el-input style="width:294px"
                  v-model="value"
                  placeholder="请输入纱线系数">
                  <template slot="append">g</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBtnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>
<script>
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
      colorArr: [{
        color_code: '#ff0000',
        name: '红色'
      }],
      initTable: true,
      loading: false,
      value: '',
      hotSettings: {
        data: [
          [1],
          [''],
          [3],
          ['a'],
          ['']
        ],
        rowHeaders: (index) => {
          let headerArr = ['序号', '主/夹', '根数', '合并项', '合并项']
          return `<div style="height:38px;line-height:38px;color:#666;display:table-row">${headerArr[index]}</div>`
        },
        rowHeaderWidth: 80,
        minCols: 1,
        autoColumnSize: true, // 自适应宽度
        cells: (row, col, prop) => {
          var cellProperties = {}
          if (row === 0) {
            cellProperties.readOnly = true
          }
          if (row === 1) {
            cellProperties.type = 'dropdown'
            cellProperties.source = this.warpJiaArr
          }
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
        contextMenu: [
          'mergeCells', // 合并单元格菜单
          'col_right',
          'col_left',
          'copy',
          '粘贴(Ctrl + V)',
          'undo',
          'redo',
          'remove_col'
        ],
        className: 'handsontable',
        afterChange: this.afterChange,
        afterCreateCol: this.afterCreateCol,
        afterRemoveCol: this.afterRemoveCol,
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        mergeCells: true,
        width: '100%',
        height: 240
      },
      warpJiaArr: ['主', '夹1', '夹2'],
      number: 1
    }
  },
  methods: {
    saveAll () {
      this.warpJiaArr.push('夹3')
    },
    afterCreateCol (index, amount) {
      this.number++
      for (let i = 0; i < this.number; i++) {
        this.hotSettings.data[0][i] = i + 1
      }
    },
    afterRemoveCol (index, amount) {
      if (this.number === 1) {
        this.$message.error({
          message: '至少有一列数据'
        })
      } else {
        this.number--
        for (let i = 0; i < this.number; i++) {
          this.hotSettings.data[0][i] = i + 1
        }
      }
    },
    afterChange (changes) {

    },
    addOneCol () {
      this.hotSettings.data.forEach((item, index) => {
        if (index === 0) {
          item.push(item.length + 1)
        } else {
          item.push('')
        }
      })
      this.number++
    },
    deleteOneCol () {
      this.hotSettings.data.forEach((item) => {
        if (item.length > 1) {
          item.pop()
        } else {
          this.$message.error({
            message: '至少有一列数据'
          })
        }
      })
      if (this.number > 1) {
        this.number--
      }
    }
  },
  mounted () {
    // this.initTable = true
    document.onkeydown = (e) => {
      if (e.keyCode === 187 && e.shiftKey) {
        this.addOneCol()
      } else if (e.keyCode === 189 && e.shiftKey) {
        this.deleteOneCol()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/designFormCreateR.less";
</style>
<style lang="less">
#designFormCreate {
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
  .colorPicker {
    height: 32px;
    line-height: 32px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 16px;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    border-radius: 2px;
    .realContent {
      border-radius: 2px;
    }
  }
}
</style>
