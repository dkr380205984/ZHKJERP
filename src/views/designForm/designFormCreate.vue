<template>
  <div id="designFormCreate">
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
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">工艺单编号:</span>
            <span class="content important">KR-0001</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品编号:</span>
            <span class="content">KWZ1233444</span>
          </div>
           <div class="inputCtn">
            <span class="label">产品名称:</span>
            <span class="content">{{product|filterType}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品成分:</span>
            <span class="content">{{product.materials|filterMaterials}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品花型:</span>
            <span class="content">{{product.flower_id}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品配色:</span>
            <span class="content">{{product.color|filterColor}}</span>
          </div>
        </div>
         <div class="lineCtn">
          <div class="inputCtn" style="align-items:flex-start">
            <span class="label">创建日期:</span>
            <span class="content">{{product.create_time}}</span>
          </div>
          <div class="inputCtn" style="align-items:flex-start">
            <span class="label">创建人:</span>
            <span class="content">{{product.user_id}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品规格:</span>
            <span class="content contentLine" v-for="(item,key) in product.size" :key="key">
              <span style="margin-right:15px">{{key}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce" v-for="itemChild in item" :key="itemChild.id">{{itemChild.size_value + 'cm' + '(' + itemChild.size_name + ')'}}&nbsp;&nbsp;&nbsp;</span>
              </span>
              <br/>
            </span>
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
          <div class="inputCtn">
            <span class="label must">配色方案:</span>
            <div class="addBtn" @click="addColour">
              <span>新增配色方案</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">方案列表:</span>
            <div class="list" v-for="(item,index) in colourNum" :key="index">
              <el-select class="elSelect" v-model="colour[index]" placeholder="请选择配色方案">
                <el-option
                  v-for="item in colourArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                  <div class="bgBlock" :style="{'background':item.color_code}"></div>
                  <div class="desc">{{item.name}}</div>
                </el-option>
              </el-select>
              <color-picker v-for="(item2,index2) in colorNum[index]" :key="index2"
                style="margin-left:15px"
                v-model="color[index][index2]"
                :content="filterMethods(index2)"
                :colorArr="colorArr"></color-picker>
              <div class="addBtn" @click="addColor(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn" @click="deleteColor(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn" @click="deleteColour(index)" style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="list">
              <el-cascader
                v-model="mainIngredient"
                style="margin-left:15px;width:200px"
                :options="ingredientArr"
                placeholder="请选择主要原料"
                expand-trigger="hover">
              </el-cascader>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn">
            <span class="label">次要原料:</span>
            <div class="addBtn" @click="addOtherIngredient">
              <span>新增次要原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div v-show="otherIngredientNum>0" class="lineCtn" style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">次料列表:</span>
            <div class="list" v-for="(item,index) in otherIngredientNum" :key="index">
              <el-cascader
                v-model="otherIngredient[index]"
                style="margin-left:15px;width:200px"
                :options="ingredientArr"
                placeholder="请选择次要原料"
                expand-trigger="hover">
              </el-cascader>
              <el-select v-for="(item2,index2) in jiaNum[index]" :key="index2" class="elSelect" style="width:80px" v-model="jia[index][index2]" placeholder="夹">
                <el-option
                  v-for="(item,index2) in colorNum[0]"
                  :key="item"
                  :label="filterMethods(item-1)"
                  :value="index2">
                </el-option>
              </el-select>
              <div class="addBtn" @click="addJia(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn" @click="deleteJia(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn" @click="deleteOtherIngredient(index)" style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine rowLine">
            <span class="label must">经向排列:</span>
            <div class="overflowCtn" :style="{'overflow-x':longSort.length>12?'auto':'hidden'}">
              <div class="selectCtn">
                <div class="tableConnect">
                  <div class="selectOnce" v-for="(item,index) in longSort" :key="index">
                    <el-select class="elSelect" style="width:50px;margin-left:0;" placeholder="" v-model="longSort[index]">
                      <el-option
                        v-for="(item,index2) in colorNum[0]"
                        :key="item"
                        :label="filterMethods(item-1)"
                        :value="index2">
                      </el-option>
                    </el-select>
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
            <span class="label">整理总头纹:</span>
            <el-input class="elInput" v-model="warp_data.weft" disabled>
              <template slot="append">根</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label must">边型:</span>
             <el-select class="elSelect" v-model="warp_data.side_id" placeholder="请选择边型">
                <el-option
                  v-for="item in sideArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="inputCtn">
            <span class="label must">机型:</span>
             <el-select class="elSelect" v-model="warp_data.machine_id" placeholder="请选择机型">
                <el-option
                  v-for="item in modeleArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">筘号:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.reed">
              <template slot="append">筘</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">穿筘法:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.reed_method">
              <template slot="append">根/筘</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">筘幅:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.reed_width">
              <template slot="append">厘米</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">整经门幅:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.width"></el-input>
          </div>
          <div class="inputCtn">
            <span class="label">综页:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.sum_up">
              <template slot="append">支</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn" style="width:940px">
            <span class="label">穿综法:</span>
            <el-input
              style="margin-left:15px;"
              class="warp_data.drafting_method"
              type="textarea"
              :rows="6"
              placeholder="请输入穿综法,可打印后用笔填写"
              v-model="warp_data.drafting_method">
            </el-input>
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
            <span class="label must">组织法:</span>
             <el-select class="elSelect" v-model="weft_data.organization_id" placeholder="请选择组织法">
                <el-option
                  v-for="item in methodArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="inputCtn">
            <span class="label must">机上坯幅:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="weft_data.peifu">
              <template slot="append">厘米</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label must">纬密:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="weft_data.weimi">
              <template slot="append">梭/厘米</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">上齿牙:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="weft_data.shangchiya">
              <template slot="append">牙</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">下齿牙:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="weft_data.xiachiya">
              <template slot="append">牙</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">让位要求:</span>
            <el-input class="elInput" placeholder="数字" v-model="weft_data.neichang">
              <template slot="prepend">内长</template>
              <template slot="append">厘米</template>
            </el-input>
            <el-input class="elInput" placeholder="数字" v-model="weft_data.rangwei">
              <template slot="prepend">让位</template>
              <template slot="append">厘米</template>
            </el-input>
            <el-input class="elInput" placeholder="数字" disabled v-model="weft_data.total">
              <template slot="prepend">总计</template>
              <template slot="append">梭</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label must">配色方案:</span>
            <div class="addBtn" @click="addColour2">
              <span>新增配色方案</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">方案列表:</span>
            <div class="list" v-for="(item,index) in colourNum2" :key="index">
              <el-select class="elSelect" v-model="colour2[index]" placeholder="请选择配色方案">
                <el-option
                  v-for="item in colourArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                  <div class="bgBlock" :style="{'background':item.color_code}"></div>
                  <div class="desc">{{item.name}}</div>
                </el-option>
              </el-select>
              <color-picker v-for="(item2,index2) in colorNum2[index]" :key="index2"
                style="margin-left:15px"
                v-model="color2[index][index2]"
                :content="filterMethods(index2)"
                :colorArr="colorArr"></color-picker>
              <div class="addBtn" @click="addColor2(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn" @click="deleteColor2(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn" @click="deleteColour2(index)" style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="list">
              <el-cascader
                v-model="mainIngredient2"
                style="margin-left:15px;width:200px"
                :options="ingredientArr"
                placeholder="请选择主要原料"
                expand-trigger="hover">
              </el-cascader>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn">
            <span class="label">次要原料:</span>
            <div class="addBtn" @click="addOtherIngredient2">
              <span>新增次要原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div v-show="otherIngredientNum2>0" class="lineCtn" style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">次料列表:</span>
            <div class="list" v-for="(item,index) in otherIngredientNum2" :key="index">
              <el-cascader
                v-model="otherIngredient2[index]"
                style="margin-left:15px;width:200px"
                :options="ingredientArr"
                placeholder="请选择次要原料"
                expand-trigger="hover">
              </el-cascader>
              <el-select v-for="(item2,index2) in jiaNum2[index]" :key="index2" class="elSelect" style="width:80px" v-model="jia2[index][index2]" placeholder="夹">
                <el-option
                  v-for="(item,index2) in colorNum2[0]"
                  :key="item"
                  :label="filterMethods(item-1)"
                  :value="index2">
                </el-option>
              </el-select>
              <div class="addBtn" @click="addJia2(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn" @click="deleteJia2(index)" style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn" @click="deleteOtherIngredient2(index)" style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine rowLine">
            <span class="label must">纬向排列</span>
            <div class="overflowCtn" :style="{'overflow-x':longSort2.length>12?'auto':'hidden'}">
              <div class="selectCtn">
                <div class="tableConnect">
                  <div class="selectOnce" v-for="(item,index) in longSort2" :key="index">
                    <el-select class="elSelect" style="width:50px;margin-left:0;" placeholder="" v-model="longSort2[index]">
                      <el-option
                        v-for="(item,index2) in colorNum2[0]"
                        :key="item"
                        :label="filterMethods(item-1)"
                        :value="index2">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="excelCtn">
                <hot-table :settings="hotSettings2" :width="2000" :height="140" ref="table2"></hot-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="clearAll">清空</div>
        <div class="okBtn" @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { porductOne, YarnList, editList, saveCraft } from '@/assets/js/api.js'
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
      companyId: window.sessionStorage.getItem('company_id'),
      product: {
        category_name: '',
        create_time: '',
        flower_id: '',
        style_name: '',
        type_name: '',
        user_id: '',
        materials: [],
        color: [],
        size: []
      },
      hotSettings: {
        data: [ // 数据，可以是数据，对象
          [''],
          [''],
          ['']
        ],
        colWidths: 62, // 列宽
        rowHeights: [47, 34, 34],
        className: 'htCenter htMiddle ',
        contextMenu: [
          'col_left',
          'col_right',
          'remove_col',
          'mergeCells' // 合并单元格菜单
        ],
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        mergeCells: true,
        minCols: 1,
        minRows: 3,
        afterChange: this.afterChange,
        afterCreateCol: this.createCol, // 监听行添加
        afterRemoveCol: this.removeCol // 监听列删除
      },
      hotSettings2: {
        data: [ // 数据，可以是数据，对象
          [''],
          [''],
          ['']
        ],
        colWidths: 62, // 列宽
        rowHeights: [47, 34, 34],
        className: 'htCenter htMiddle ',
        contextMenu: [
          'col_left',
          'col_right',
          'remove_col',
          'mergeCells' // 合并单元格菜单
        ],
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        mergeCells: true,
        minCols: 1,
        minRows: 3,
        afterChange: this.afterChange2,
        afterCreateCol: this.createCol2, // 监听行添加
        afterRemoveCol: this.removeCol2 // 监听列删除
      },
      colour: [''],
      colour2: [''],
      colourArr: [],
      colourNum: 1,
      colourNum2: 1,
      color: [[]],
      color2: [[]],
      colorArr: [],
      colorNum: [1],
      colorNum2: [1],
      process: [],
      processArr: [],
      countArr: [],
      typeArr: [],
      ingredient: [],
      mainIngredient: [],
      mainIngredient2: [],
      otherIngredient: {}, // 这里只能存对象,用数组会报错
      otherIngredient2: {},
      otherIngredientNum: 0,
      otherIngredientNum2: 0,
      ingredientArr: [],
      jiaNum: [1],
      jiaNum2: [1],
      jia: [],
      jia2: [],
      longSort: [''], // 经向排列
      longSort2: [''], // 纬向排列
      sideArr: [],
      modeleArr: [],
      method: '',
      methodArr: [],
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
  watch: {
    hotSettings: {
      handler: function (newVal) {
        let arr = [[], [], []]
        newVal.data.forEach((item, index) => {
          let mark = 1
          item.forEach((item2) => {
            if (item2) {
              mark = item2
            } else if (item2 === '') {
              mark = 1
            }
            arr[index].push(mark)
          })
        })
        let sum = 0
        arr[0].forEach((item, index) => {
          sum += arr[0][index] * arr[1][index] * arr[2][index]
        })
        this.warp_data.weft = sum
        console.log(arr)
      },
      deep: true
    },
    hotSettings2: {
      handler: function (newVal) {
        let arr = [[], [], []]
        newVal.data.forEach((item, index) => {
          let mark = 1
          item.forEach((item2) => {
            if (item2) {
              mark = item2
            } else if (item2 === '') {
              mark = 1
            }
            arr[index].push(mark)
          })
        })
        let sum = 0
        arr[0].forEach((item, index) => {
          sum += arr[0][index] * arr[1][index] * arr[2][index]
        })
        this.weft_data.total = sum
      },
      deep: true
    }
  },
  created () {
    // 初始化接口
    Promise.all([porductOne({
      id: this.$route.params.id
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    })]).then((res) => {
      console.log(res)
      this.product = res[0].data.data
      this.colourArr = res[0].data.data.color
      this.colorArr = res[1].data.data.color
      this.countArr = res[1].data.data.count
      this.typeArr = res[1].data.data.type
      this.ingredientArr = res[1].data.data.count.map((item) => {
        const unit = ['支', '厘米']
        return {
          value: item.id,
          label: item.name + unit[item.unit],
          children: res[1].data.data.type.map((item2) => {
            return {
              value: item2.id,
              label: item2.name
            }
          })
        }
      })
      this.sideArr = res[2].data.data.side
      this.modeleArr = res[2].data.data.type
      this.methodArr = res[2].data.data.method
    })
  },
  methods: {
    afterChange (changes, source) {
      let arr = [[], [], []]
      this.hotSettings.data.forEach((item, index) => {
        let mark = 1
        item.forEach((item2) => {
          if (item2) {
            mark = item2
          } else if (item2 === '') {
            mark = 1
          }
          arr[index].push(mark)
        })
      })
      let sum = 0
      arr[0].forEach((item, index) => {
        sum += arr[0][index] * arr[1][index] * arr[2][index]
      })
      this.warp_data.weft = sum
    },
    afterChange2 (changes, source) {
      let arr = [[], [], []]
      this.hotSettings2.data.forEach((item, index) => {
        let mark = 1
        item.forEach((item2) => {
          if (item2) {
            mark = item2
          } else if (item2 === '') {
            mark = 1
          }
          arr[index].push(mark)
        })
      })
      let sum = 0
      arr[0].forEach((item, index) => {
        sum += arr[0][index] * arr[1][index] * arr[2][index]
      })
      this.weft_data.total = sum
    },
    // 监听添加行 amount：新列的数目,index：新列的索引
    createCol (index, amount) {
      this.hotSettings.data[0][index] = ''
      this.hotSettings.data[1][index] = ''
      this.hotSettings.data[2][index] = ''
      this.longSort.splice(index, 0, '')
    },
    // 监听列删除
    removeCol (index, amount) {
      this.longSort.splice(index, amount)
    },
    // 监听添加行 amount：新列的数目,index：新列的索引
    createCol2 (index, amount) {
      this.hotSettings2.data[0][index] = ''
      this.hotSettings2.data[1][index] = ''
      this.hotSettings2.data[2][index] = ''
      this.longSort2.splice(index, 0, '')
    },
    // 监听列删除
    removeCol2 (index, amount) {
      this.longSort2.splice(index, amount)
    },
    // 添加新的配色方案
    addColour () {
      this.colour.push('')
      this.colorNum.push(this.colorNum[0])
      this.color.push([])
      this.colourNum++
    },
    addColour2 () {
      this.colour2.push('')
      this.colorNum2.push(this.colorNum2[0])
      this.color2.push([])
      this.colourNum2++
    },
    // 删除配色方案
    deleteColour () {
      if (this.colour.length > 1) {
        this.colour.pop()
        this.colorNum.pop()
        this.color.pop()
        this.colourNum--
      } else {
        this.$message.error({
          message: '至少有一种配色方案'
        })
      }
    },
    deleteColour2 () {
      if (this.colour2.length > 1) {
        this.colour2.pop()
        this.colorNum2.pop()
        this.color2.pop()
        this.colourNum2--
      } else {
        this.$message.error({
          message: '至少有一种配色方案'
        })
      }
    },
    // 添加颜色
    addColor () {
      this.colorNum.forEach((item, index) => {
        this.$set(this.colorNum, index, (this.colorNum[index] + 1))
      })
    },
    addColor2 () {
      this.colorNum2.forEach((item, index) => {
        this.$set(this.colorNum2, index, (this.colorNum2[index] + 1))
      })
    },
    // 删除颜色
    deleteColor () {
      this.colorNum.forEach((item, index) => {
        if (this.colorNum[index] > 1) {
          this.$set(this.colorNum, index, (this.colorNum[index] - 1))
        }
      })
    },
    deleteColor2 () {
      this.colorNum2.forEach((item, index) => {
        if (this.colorNum2[index] > 1) {
          this.$set(this.colorNum2, index, (this.colorNum2[index] - 1))
        }
      })
    },
    // 添加次要原料
    addOtherIngredient () {
      this.otherIngredient[this.otherIngredientNum] = []
      this.jiaNum.push(1)
      this.jia.push([])
      this.otherIngredientNum++
    },
    addOtherIngredient2 () {
      this.otherIngredient2[this.otherIngredientNum2] = []
      this.jiaNum2.push(1)
      this.jia2.push([])
      this.otherIngredientNum2++
    },
    // 删除次要原料
    deleteOtherIngredient (index) {
      this.jiaNum.splice(index, 1)
      this.jia.splice(index, 1)
      let newVal = {}
      let num = 0
      for (let i in this.otherIngredient) {
        if (parseInt(i) !== parseInt(index)) {
          newVal[num] = this.otherIngredient[i]
          num++
        }
      }
      this.otherIngredient = newVal
      this.otherIngredientNum--
    },
    deleteOtherIngredient2 (index) {
      this.jiaNum2.splice(index, 1)
      this.jia2.splice(index, 1)
      let newVal = {}
      let num = 0
      for (let i in this.otherIngredient2) {
        if (parseInt(i) !== parseInt(index)) {
          newVal[num] = this.otherIngredient2[i]
          num++
        }
      }
      this.otherIngredient2 = newVal
      this.otherIngredientNum2--
    },
    // 添加次要原料的 夹
    addJia (index) {
      this.$set(this.jiaNum, index, (this.jiaNum[index] + 1))
      this.jia[index].push('')
    },
    addJia2 (index) {
      this.$set(this.jiaNum2, index, (this.jiaNum2[index] + 1))
      this.jia2[index].push('')
    },
    // 删除次要原料的 夹
    deleteJia (index) {
      if (this.jiaNum[index] > 1) {
        this.$set(this.jiaNum, index, (this.jiaNum[index] - 1))
        this.jia[index].pop()
      } else {
        this.$message.error({
          message: '至少包含一种'
        })
      }
    },
    deleteJia2 (index) {
      if (this.jiaNum2[index] > 1) {
        this.$set(this.jiaNum2, index, (this.jiaNum2[index] - 1))
        this.jia2[index].pop()
      } else {
        this.$message.error({
          message: '至少包含一种'
        })
      }
    },
    // 主 夹1 夹2命名
    filterMethods (index) {
      if (index === 0) {
        return '主'
      } else {
        return '夹' + index
      }
    },
    // 添加
    saveAll () {
      console.log(this.mainIngredient, this.otherIngredient)
      // 用户体验优化,判断表单必填字段是否填写
      let flag = {
        color: true,
        colour: true,
        color2: true,
        colour2: true,
        mainIngredient: true,
        mainIngredient2: true,
        otherIngredient: true,
        otherIngredient2: true,
        jia: true,
        jia2: true,
        longSort: true,
        longSort2: true,
        hotSettings: true,
        hotSettings2: true
      }
      // 检查配色方案
      this.colour.forEach((item) => {
        if (item === '') {
          flag.colour = false
        }
      })
      this.colour2.forEach((item) => {
        if (item === '') {
          flag.colour2 = false
        }
      })
      // 检查纱线颜色
      this.color.forEach((item) => {
        if (item.length < this.colorNum[0]) {
          flag.color = false
        }
        for (let i = 0; i < item.length; i++) {
          if (!item[i]) {
            flag.color = false
          }
        }
      })
      this.color2.forEach((item) => {
        if (item.length < this.colorNum2[0]) {
          flag.color2 = false
        }
        for (let i = 0; i < item.length; i++) {
          if (!item[i]) {
            flag.color2 = false
          }
        }
      })
      // 检查主要原料
      if (this.mainIngredient.length === 0) {
        flag.mainIngredient = false
      }
      if (this.mainIngredient2.length === 0) {
        flag.mainIngredient2 = false
      }
      // 检查次要原料
      for (let key in this.otherIngredient) {
        if (this.otherIngredient[key].length === 0) {
          flag.otherIngredient = false
        }
      }
      for (let key in this.otherIngredient2) {
        if (this.otherIngredient2[key].length === 0) {
          flag.otherIngredient2 = false
        }
      }
      // 检查次要原料的夹
      this.jia.forEach((item) => {
        if (item.length === 0) {
          flag.jia = false
        }
        item.forEach((item2) => {
          if (item2 === '') {
            flag.jia = false
          }
        })
      })
      this.jia2.forEach((item) => {
        if (item.length === 0) {
          flag.jia2 = false
        }
        item.forEach((item2) => {
          if (item2 === '') {
            flag.jia2 = false
          }
        })
      })
      // 检查表格的夹
      this.longSort.forEach((item) => {
        if (item === '') {
          flag.longSort = false
        }
      })
      this.longSort2.forEach((item) => {
        if (item === '') {
          flag.longSort2 = false
        }
      })
      // 检查表格第一行
      console.log(this.hotSettings.data[0])
      this.hotSettings.data[0].forEach((item) => {
        if (item === '') {
          flag.hotSettings = false
        }
      })
      this.hotSettings2.data[0].forEach((item) => {
        if (item === '') {
          flag.hotSettings2 = false
        }
      })
      if (!flag.colour) {
        this.$message.error({
          message: '检测到有未选择的经向配色方案,请检查配色方案是否填写完整'
        })
        return
      }
      if (!flag.colour2) {
        this.$message.error({
          message: '检测到有未选择的纬向配色方案,请检查配色方案是否填写完整'
        })
        return
      }
      if (!flag.color) {
        this.$message.error({
          message: '检测到有未选择的经向纱线颜色,请检查纱线颜色是否填写完整'
        })
        return
      }
      if (!flag.color2) {
        this.$message.error({
          message: '检测到有未选择的纬向纱线颜色,请检查纱线颜色是否填写完整'
        })
        return
      }
      if (!flag.mainIngredient) {
        this.$message.error({
          message: '检测到有未选择的经向主要原料,请检查主要原料是否填写完整'
        })
        return
      }
      if (!flag.mainIngredient2) {
        this.$message.error({
          message: '检测到有未选择的纬向主要原料,请检查主要原料是否填写完整'
        })
        return
      }
      if (!flag.otherIngredient) {
        this.$message.error({
          message: '检测到有未选择的经向次要原料,请检查次要原料是否填写完整'
        })
        return
      }
      if (!flag.otherIngredient2) {
        this.$message.error({
          message: '检测到有未选择的纬向次要原料,请检查次要原料是否填写完整'
        })
        return
      }
      if (!flag.jia) {
        this.$message.error({
          message: '检测到有未选择的经向次要原料,请检查次要原料是否填写完整'
        })
        return
      }
      if (!flag.jia2) {
        this.$message.error({
          message: '检测到有未选择的纬向次要原料,请检查次要原料是否填写完整'
        })
        return
      }
      if (!flag.longSort) {
        this.$message.error({
          message: '请检查经向列表表头是否填写完整'
        })
        return
      }
      if (!flag.longSort2) {
        this.$message.error({
          message: '请检查纬向列表表头是否填写完整'
        })
        return
      }
      if (!flag.hotSettings) {
        this.$message.error({
          message: '请检查经向列表第一行是否填写完整'
        })
        return
      }
      if (!flag.hotSettings2) {
        this.$message.error({
          message: '请检查纬向列表第一行是否填写完整'
        })
        return
      }
      if (this.warp_data.side_id === '') {
        this.$message.error({
          message: '请选择边型'
        })
        return
      }
      if (this.warp_data.machine_id === '') {
        this.$message.error({
          message: '请选择机型'
        })
        return
      }
      if (this.weft_data.organization_id === '') {
        this.$message.error({
          message: '请选择组织法'
        })
        return
      }
      if (this.weft_data.organization_id === '') {
        this.$message.error({
          message: '请选择组织法'
        })
        return
      }
      if (this.weft_data.peifu === '') {
        this.$message.error({
          message: '请输入机上坯幅'
        })
        return
      }
      if (this.weft_data.weimi === '') {
        this.$message.error({
          message: '请输纬密'
        })
        return
      }
      if (this.weft_data.rangwei === '' || this.weft_data.neichang === '') {
        this.$message.error({
          message: '请填写让位要求'
        })
        return
      }
      // // 经向主料获取name
      const unit = ['支', '厘米']
      const obj = this.countArr.find((item) => {
        return item.id === this.mainIngredient[0]
      })
      const obj2 = this.typeArr.find((item) => {
        return item.id === this.mainIngredient[1]
      })
      let warpMaterialMain = obj.name + unit[obj.unit] + obj2.name
      // 纬向主料获取name
      const obja = this.countArr.find((item) => {
        return item.id === this.mainIngredient2[0]
      })
      const obja2 = this.typeArr.find((item) => {
        return item.id === this.mainIngredient2[1]
      })
      let weftMaterialMain = obja.name + unit[obja.unit] + obja2.name
      // // 经向次料获取
      let warpMaterialOther = []
      for (let i in this.otherIngredient) {
        const objs = this.countArr.find((item) => {
          return item.id === this.otherIngredient[i][0]
        })
        const objs2 = this.typeArr.find((item) => {
          return item.id === this.otherIngredient[i][1]
        })
        warpMaterialOther.push({
          name: objs.name + unit[objs.unit] + objs2.name,
          value: this.jia[i]
        })
      }
      let weftMaterialOther = []
      for (let i in this.otherIngredient2) {
        const objb = this.countArr.find((item) => {
          return item.id === this.otherIngredient2[i][0]
        })
        const objb2 = this.typeArr.find((item) => {
          return item.id === this.otherIngredient2[i][1]
        })
        weftMaterialOther.push({
          name: objb.name + unit[objb.unit] + objb2.name,
          value: this.jia2[i]
        })
      }
      let materialData = {
        'warpMaterialMain': warpMaterialMain,
        'weftMaterialMain': weftMaterialMain,
        'warpMaterialOther': warpMaterialOther,
        'weftMaterialOther': weftMaterialOther
      }
      // 经向配色方案获取
      let warpColorData = []
      this.colour.forEach((item, index) => {
        warpColorData.push({
          'product_color_id': item,
          'color_data': this.color[index]
        })
      })
      // 纬向配色获取
      let weftColorData = []
      this.colour2.forEach((item, index) => {
        weftColorData.push({
          'product_color_id': item,
          'color_data': this.color2[index]
        })
      })
      let colorData = {
        'warpColorData': warpColorData,
        'weftColorData': weftColorData
      }
      this.warp_data.warp_rank = this.hotSettings.data
      this.warp_data.warp_rank_bottom = this.longSort
      this.weft_data.weft_rank = this.hotSettings2.data
      this.weft_data.weft_rank_bottom = this.longSort2
      let json = {
        id: '',
        company_id: this.companyId,
        product_id: this.$route.params.id,
        user_id: window.sessionStorage.getItem('user_id'),
        craft_code: null,
        warp_data: this.warp_data,
        weft_data: this.weft_data,
        color_data: colorData,
        material_data: materialData
      }
      saveCraft(json).then((res) => {
        if (res.data.status) {
          this.$message.success({
            message: '添加成功'
          })
        }
        console.log(res)
      })
    },
    // 清空
    clearAll () {

    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_name
      } else if (!item.style_name) {
        return item.category_name + '/' + item.type_name
      } else {
        return item.category_name + '/' + item.type_name + '/' + item.style_name
      }
    },
    // 成分合并
    filterMaterials (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.ingredient_name + item.ingredient_value + '%' + ' / '
      })
      return str.substring(0, str.length - 2)
    },
    // 颜色合并
    filterColor (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.name + '/'
      })
      return str.substring(0, str.length - 1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/designFormCreate.less';
</style>
