<template>
  <div id="designFormUpdate" v-loading="loading">
    <div class="head">
      <h2>修改工艺单</h2>
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
            <span class="label">产品编号:</span>
            <span class="content important">{{product.product_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品名称:</span>
            <span class="content">{{product|filterType}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品花型:</span>
            <span class="content">{{product.flower_id}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品配色:</span>
            <span class="content">{{product.color|filterColor}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">创建日期:</span>
            <span class="content">{{product.create_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">创建人:</span>
            <span class="content">{{product.user_name}}</span>
          </div>
        </div>
         <div class="lineCtn">
          <div class="inputCtn" style="width:620px">
            <span class="label">产品规格:</span>
            <span class="content contentLine"  style="width:100%" v-for="(item,key) in product.size" :key="key">
              <span style="margin-right:15px">{{key}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce" v-for="itemChild in item" :key="itemChild.id">{{itemChild.size_value + 'cm' + '(' + itemChild.size_name + ')'}}&nbsp;&nbsp;&nbsp;</span>
                <span class="sizeOnce">{{ item[0].weight + 'g' + '(克重)'}}</span>
              </span>
              <br/>
            </span>
          </div>
          <div class="inputCtn" style="align-items:flex-start">
            <span class="label">产品成分:</span>
            <span class="content">{{product.materials|filterMaterials}}</span>
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
            <div class="list" style="margin-bottom:0" v-for="(item,index) in colourNum" :key="index">
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
              <color-picker v-for="(item2,index2) in colorNum[index]" :key="item2"
                style="margin-left:15px;margin-bottom:24px"
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
                @change="updateotherIngredient($event,index)"
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
            <span class="label">整经总头纹:</span>
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
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">整经门幅:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.width">
              <template slot="append">厘米</template>
            </el-input>
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
            <el-input class="elInput" placeholder="数字" v-model="warp_data.reed_method">
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
            <span class="label">综页:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="warp_data.sum_up">
              <template slot="append">片</template>
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
            <el-input class="elInput" placeholder="数字" v-model="weimi" disabled>
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
            <div class="list" style="margin-bottom:0" v-for="(item,index) in colourNum2" :key="index">
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
                style="margin-left:15px;margin-bottom:24px"
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
                @change="updateotherIngredient2($event,index)"
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
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label must">产品净重:</span>
            <el-input class="elInput" placeholder="请输入数字" v-model="weight">
              <template slot="append">克</template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">纱线系数</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn must">
          <div class="inputCtn oneLine">
            <span class="label must">纱线系数:</span>
            <div class="list" v-for="(item,index) in materialList" :key="index">
              <el-input style="width:420px" class="elInput" placeholder="数字" v-model="coefficient[index]">
                <template slot="prepend">{{item}}</template>
                <template slot="append">克/厘米</template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn" @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { craftOne, YarnList, editList, saveCraft } from '@/assets/js/api.js'
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
      craft_code: '',
      companyId: window.sessionStorage.getItem('company_id'),
      weight: '',
      product: {
        category_info: {
          name: '',
          product_category: ''
        },
        create_time: '',
        flower_id: '',
        style_name: '',
        type_name: '',
        user_name: '',
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
          'mergeCells', // 合并单元格菜单
          'col_right',
          'col_left',
          'remove_col'
        ],
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        mergeCells: true,
        minCols: 1,
        minRows: 3,
        afterMergeCells: this.merge,
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
          'mergeCells', // 合并单元格菜单
          'col_right',
          'col_left',
          'remove_col'
        ],
        licenseKey: 'non-commercial-and-evaluation', // 申明非商业用途
        mergeCells: true,
        minCols: 1,
        minRows: 3,
        afterMergeCells: this.merge2,
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
      colorNum: [0],
      colorNum2: [0],
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
        weft: null, // 整理总头纹,需要计算
        side_id: null,
        width: null,
        machine_id: null,
        reed: null,
        reed_method: null,
        reed_width: null,
        sum_up: null,
        drafting_method: null
      },
      weft_data: {
        organization_id: null,
        peifu: null,
        weimi: null,
        shangchiya: null,
        xiachiya: null,
        neichang: null,
        rangwei: null,
        total: null
      },
      coefficient: [],
      mergeCells1: [],
      mergeCells2: []
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
    Promise.all([craftOne({
      id: this.$route.params.id
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    })]).then((res) => {
      console.log(res[0].data.data)
      this.product = res[0].data.data.product_info
      this.colourArr = res[0].data.data.product_info.color
      this.colorArr = res[1].data.data.color
      this.countArr = res[1].data.data.count
      this.typeArr = res[1].data.data.type
      this.ingredientArr = res[1].data.data.count.map((item) => {
        const unit = ['支', '厘米']
        return {
          value: item.name,
          label: item.name + unit[item.unit],
          children: res[1].data.data.type.map((item2) => {
            return {
              value: item2.name,
              label: item2.name
            }
          })
        }
      })
      this.sideArr = res[2].data.data.side
      this.modeleArr = res[2].data.data.type
      this.methodArr = res[2].data.data.method

      // 整理工艺单数据
      let data = res[0].data.data
      // 处理原料数据
      data.material_data.forEach((item) => {
        if (item.type === 0 && item.type_material === 0) {
          let arr = []
          if (item.material_name.indexOf('支')) {
            arr = item.material_name.split('支')
          }
          if (item.material_name.indexOf('厘米') !== -1) {
            arr = item.material_name.split('厘米')
          }
          this.mainIngredient = arr
        }
        if (item.type === 1 && item.type_material === 0) {
          let arr = []
          if (item.material_name.indexOf('支')) {
            arr = item.material_name.split('支')
          }
          if (item.material_name.indexOf('厘米') !== -1) {
            arr = item.material_name.split('厘米')
          }
          this.mainIngredient2 = arr
        }
        if (item.type === 0 && item.type_material === 1) {
          let arr = []
          if (item.material_name.indexOf('支')) {
            arr = item.material_name.split('支')
          }
          if (item.material_name.indexOf('厘米') !== -1) {
            arr = item.material_name.split('厘米')
          }
          this.$set(this.otherIngredient, this.otherIngredientNum, arr)
          this.jiaNum.push(item.apply.length)
          this.jia.push(item.apply)
          this.otherIngredientNum++
        }
        if (item.type === 1 && item.type_material === 1) {
          let arr = []
          if (item.material_name.indexOf('支')) {
            arr = item.material_name.split('支')
          }
          if (item.material_name.indexOf('厘米') !== -1) {
            arr = item.material_name.split('厘米')
          }
          this.$set(this.otherIngredient2, this.otherIngredientNum2, arr)
          this.jiaNum2.push(item.apply.length)
          this.jia2.push(item.apply)
          this.otherIngredientNum2++
        }
      })
      // 处理颜色数据
      let warpColorData = []
      let weftColorData = []
      data.color_data.forEach((item) => {
        if (item.type === 0) {
          warpColorData.push(item)
        } else {
          weftColorData.push(item)
        }
      })
      this.colour = warpColorData.map((item) => item.product_color)
      this.colourNum = warpColorData.length
      this.colour2 = weftColorData.map((item) => item.product_color)
      this.colourNum2 = weftColorData.length
      this.color = warpColorData.map((item) => item.color_scheme.map((itemColor) => itemColor.value))
      this.colorNum = warpColorData.map((item) => item.color_scheme.length)
      this.color2 = weftColorData.map((item) => item.color_scheme.map((itemColor) => itemColor.value))
      this.colorNum2 = weftColorData.map((item) => item.color_scheme.length)
      // 处理纱线系数
      this.coefficient = data.yarn_coefficient.map((item) => item.value)
      // 处理表格
      this.warp_data = data.warp_data
      this.weft_data = data.weft_data
      // 处理部分id和name转化
      this.$set(this.warp_data, 'side_id', this.sideArr.find((item) => {
        return item.name === this.warp_data.side_name
      }).id)
      this.$set(this.warp_data, 'machine_id', this.modeleArr.find((item) => {
        return item.name === this.warp_data.machine_name
      }).id)
      this.$set(this.weft_data, 'organization_id', this.methodArr.find((item) => {
        return item.name === this.weft_data.organization_name
      }).id)
      // 处理表格单元格合并
      this.hotSettings.data = data.warp_data.warp_rank
      this.longSort = data.warp_data.warp_rank_bottom
      this.hotSettings2.data = data.weft_data.weft_rank
      this.longSort2 = data.weft_data.weft_rank_bottom
      // 处理单元格合并
      let point = []
      let mergeCells = []
      let col = 0
      let colspan = 0
      let unNull = 0 // 遇到第一个不为null的数开始计算
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
            } else {
              mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan })
            }
            if (item === 1 && index === this.hotSettings.data[1].length - 1) {
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
      })
      col = 0
      colspan = 0
      unNull = 0
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
            } else {
              mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan })
            }
            if (item === 1 && index === this.hotSettings.data[1].length - 1) {
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
      })
      this.hotSettings.mergeCells = mergeCells
      mergeCells = []
      col = 0
      colspan = 0
      unNull = 0
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
            } else {
              mergeCells.push({ row: 1, col: col, rowspan: 1, colspan: colspan })
            }
            if (item === 1 && index === this.hotSettings.data[1].length - 1) {
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
      })
      // 重置计算值
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
            } else {
              mergeCells.push({ row: 2, col: col, rowspan: 1, colspan: colspan })
            }
            if (item === 1 && index === this.hotSettings.data[1].length - 1) {
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
      })
      this.hotSettings2.mergeCells = mergeCells
      // 净重
      this.weight = data.weight
      this.craft_code = data.craft_code
      this.loading = false
    })
  },
  methods: {
    // 监听合并单元格 获取的数据还有问题，暂时不用
    merge (cellRange, main) {
      if (this.mergeCells1.length > 0) {
        for (var k = 0; k < this.mergeCells1.length; k++) {
          if (this.mergeCells1[k].row === main.row && this.mergeCells1[k].col === main.col) {
            this.mergeCells1.splice(k, 1)
            return
          } else {
            this.mergeCells1.push({ 'row': main.row,
              'col': main.col,
              'rowspan': main.rowspan,
              'colspan': main.colspan })
            break
          }
        }
      } else {
        this.mergeCells1.push({ 'row': main.row, 'col': main.col, 'rowspan': main.rowspan, 'colspan': main.colspan })
      }
    },
    merge2 (cellRange, main) {
      if (this.mergeCells2.length > 0) {
        for (var k = 0; k < this.mergeCells2.length; k++) {
          if (this.mergeCells2[k].row === main.row && this.mergeCells2[k].col === main.col) {
            this.mergeCells2.splice(k, 1)
            return
          } else {
            this.mergeCells2.push({ 'row': main.row,
              'col': main.col,
              'rowspan': main.rowspan,
              'colspan': main.colspan })
            break
          }
        }
      } else {
        this.mergeCells2.push({ 'row': main.row, 'col': main.col, 'rowspan': main.rowspan, 'colspan': main.colspan })
      }
    },
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
      this.$set(this.otherIngredient, this.otherIngredientNum, [])
      this.jiaNum.push(1)
      this.jia.push([])
      this.otherIngredientNum++
    },
    addOtherIngredient2 () {
      this.$set(this.otherIngredient2, this.otherIngredientNum2, [])
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
    // 更新次要原料的时候由于是改变对象内部的值，需要$set触发
    updateotherIngredient (value, index) {
      this.$set(this.otherIngredient, index, value)
    },
    updateotherIngredient2 (value, index) {
      this.$set(this.otherIngredient2, index, value)
    },
    // 添加
    saveAll () {
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
      if (this.weft_data.rangwei === '' || this.weft_data.neichang === '') {
        this.$message.error({
          message: '请填写让位要求'
        })
        return
      }
      if (this.coefficient.length < this.materialList.length) {
        this.$message.error({
          message: '请填写纱线系数'
        })
        return
      }
      // 经向主料获取name
      const unit = ['支', '厘米']
      const obj = this.countArr.find((item) => {
        return item.name === this.mainIngredient[0]
      })
      const obj2 = this.typeArr.find((item) => {
        return item.name === this.mainIngredient[1]
      })
      let warpMaterialMain = obj.name + unit[obj.unit] + obj2.name
      // 纬向主料获取name
      const obja = this.countArr.find((item) => {
        return item.name === this.mainIngredient2[0]
      })
      const obja2 = this.typeArr.find((item) => {
        return item.name === this.mainIngredient2[1]
      })
      let weftMaterialMain = obja.name + unit[obja.unit] + obja2.name
      // 经向次料获取
      let warpMaterialOther = []
      for (let i in this.otherIngredient) {
        const objs = this.countArr.find((item) => {
          return item.name === this.otherIngredient[i][0]
        })
        const objs2 = this.typeArr.find((item) => {
          return item.name === this.otherIngredient[i][1]
        })
        warpMaterialOther.push({
          name: objs.name + unit[objs.unit] + objs2.name,
          value: this.jia[i]
        })
      }
      // 纬向次料获取
      let weftMaterialOther = []
      for (let i in this.otherIngredient2) {
        const objb = this.countArr.find((item) => {
          return item.name === this.otherIngredient2[i][0]
        })
        const objb2 = this.typeArr.find((item) => {
          return item.name === this.otherIngredient2[i][1]
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
      // 新版本数据格式改动 ---- 材料改动
      let materialDataNew = []
      // 过滤掉经向次要原料的夹
      let warpMainArr = Array.from(Array(this.colorNum[0]), (v, k) => k)
      materialData.warpMaterialOther.forEach((item) => {
        materialDataNew.push({
          material_name: item.name,
          type: 0,
          type_material: 1,
          apply: item.value
        })
        item.value.forEach((item) => {
          warpMainArr.splice(warpMainArr.findIndex(itemJia => itemJia === item), 1)
        })
      })
      materialDataNew.push({
        material_name: materialData.warpMaterialMain,
        type: 0,
        type_material: 0,
        apply: warpMainArr
      })
      // 过滤纬向次要原料的夹
      let weftMainArr = Array.from(Array(this.colorNum2[0]), (v, k) => k)
      materialData.weftMaterialOther.forEach((item) => {
        materialDataNew.push({
          material_name: item.name,
          type: 1,
          type_material: 1,
          apply: item.value
        })
        item.value.forEach((item) => {
          weftMainArr.splice(weftMainArr.findIndex(itemJia => itemJia === item), 1)
        })
      })
      materialDataNew.push({
        material_name: materialData.weftMaterialMain,
        type: 1,
        type_material: 0,
        apply: weftMainArr
      })
      // 新版本数据格式改动 --- 配色方案
      let colorData = []
      this.colour.forEach((item, index) => {
        let colorScheme = []
        for (let i = 0; i < this.colorNum[index]; i++) {
          colorScheme.push({
            name: this.colorArr.find((item2) => item2.color_code === this.color[index][i]).name,
            value: this.color[index][i]
          })
        }
        colorData.push({
          'product_color': item,
          'color_scheme': colorScheme,
          'type': 0
        })
      })
      this.colour.forEach((item, index) => {
        let colorScheme = []
        for (let i = 0; i < this.colorNum2[index]; i++) {
          colorScheme.push({
            name: this.colorArr.find((item2) => item2.color_code === this.color2[index][i]).name,
            value: this.color2[index][i]
          })
        }
        colorData.push({
          'product_color': item,
          'color_scheme': colorScheme,
          'type': 1
        })
      })
      // 纱线系数拼接
      let yarnCoefficient = this.materialList.map((item, index) => {
        return {
          name: item,
          value: this.coefficient[index]
        }
      })
      this.warp_data.warp_rank = this.hotSettings.data
      this.warp_data.warp_rank_bottom = this.longSort
      this.weft_data.weft_rank = this.hotSettings2.data
      this.weft_data.weft_rank_bottom = this.longSort2
      this.weft_data.weimi = this.weimi
      let json = {
        id: this.$route.params.id,
        company_id: this.companyId,
        product_id: this.product.id,
        user_id: window.sessionStorage.getItem('user_id'),
        craft_code: this.craft_code,
        warp_data: this.warp_data,
        weft_data: this.weft_data,
        color_data: colorData,
        material_data: materialDataNew,
        weight: this.weight,
        yarn_coefficient: yarnCoefficient
      }
      saveCraft(json).then((res) => {
        console.log(res)
        if (res.data.status) {
          this.$message.success({
            message: '修改成功'
          })
          this.$router.push('/index/designFormDetail/' + res.data.data.id)
        }
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
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
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
  },
  computed: {
    materialList () {
      // 经向主料获取name
      const unit = ['支', '厘米']
      let warpMaterialMain = []
      if (this.mainIngredient.length > 0) {
        const obj = this.countArr.find((item) => {
          return item.name === this.mainIngredient[0]
        })
        const obj2 = this.typeArr.find((item) => {
          return item.name === this.mainIngredient[1]
        })
        warpMaterialMain = [obj.name + unit[obj.unit] + obj2.name]
      }
      // 纬向主料获取name
      let weftMaterialMain = []
      if (this.mainIngredient2.length > 0) {
        const obja = this.countArr.find((item) => {
          return item.name === this.mainIngredient2[0]
        })
        const obja2 = this.typeArr.find((item) => {
          return item.name === this.mainIngredient2[1]
        })
        weftMaterialMain = [obja.name + unit[obja.unit] + obja2.name]
      }
      // 经向次料获取
      let warpMaterialOther = []
      for (let i in this.otherIngredient) {
        if (this.otherIngredient[i].length > 0) {
          const objs = this.countArr.find((item) => {
            return item.name === this.otherIngredient[i][0]
          })
          const objs2 = this.typeArr.find((item) => {
            return item.name === this.otherIngredient[i][1]
          })
          warpMaterialOther.push(objs.name + unit[objs.unit] + objs2.name)
        }
      }
      // 纬向次料获取
      let weftMaterialOther = []
      for (let i in this.otherIngredient2) {
        if (this.otherIngredient2[i].length > 0) {
          const objb = this.countArr.find((item) => {
            return item.name === this.otherIngredient2[i][0]
          })
          const objb2 = this.typeArr.find((item) => {
            return item.name === this.otherIngredient2[i][1]
          })
          weftMaterialOther.push(objb.name + unit[objb.unit] + objb2.name)
        }
      }
      // ES6提供的数组去重方式
      return Array.from(new Set(warpMaterialMain.concat(weftMaterialMain).concat(warpMaterialOther).concat(weftMaterialOther)))
    },
    weimi () {
      if (this.weft_data.neichang && this.weft_data.rangwei) {
        return (this.weft_data.total / (this.weft_data.neichang + this.weft_data.rangwei)).toFixed(3)
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/designFormUpdate.less';
</style>
<style lang="less">
.selectOnce{
  .el-input--suffix .el-input__inner{
    padding:0 15px 0 5px;
  }
  .el-select .el-input .el-select__caret{
    font-size:10px;
    width:15px;
  }
}
</style>
