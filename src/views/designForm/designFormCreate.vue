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
            <span class="label">产品规格:</span>
            <span class="content">80*90*100 cm</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品名称:</span>
            <span class="content">围巾 / 梭织 / 宽巾</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品花型:</span>
            <span class="content">豹纹</span>
          </div>
          <div class="inputCtn">
            <span class="label">产品克重:</span>
            <span class="content">200</span>
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
            <span class="label">配色方案:</span>
            <div class="addBtn" @click="test">
              <span>新增配色方案</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">方案列表:</span>
            <div class="list">
              <el-select class="elSelect" v-model="color" placeholder="请选择配色方案">
                <el-option
                  v-for="item in colorArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <div class="bgBlock" :style="{'background':item.color_code}"></div>
                  <div class="desc">{{item.name}}</div>
                </el-option>
              </el-select>
              <div class="once">主</div>
              <div class="once">夹1</div>
              <div class="once">夹2</div>
              <div class="addBtn">
                <span>+</span>
              </div>
            </div>
             <div class="list">
              <el-select class="elSelect" v-model="color" placeholder="请选择配色方案">
                <el-option
                  v-for="item in colorArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <div class="bgBlock" :style="{'background':item.color_code}"></div>
                  <div class="desc">{{item.name}}</div>
                </el-option>
              </el-select>
              <div class="once">主</div>
              <div class="once">夹1</div>
              <div class="once">夹2</div>
              <div class="addBtn">
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label">主要原料:</span>
            <div class="list">
              <el-select class="elSelect" v-model="ingredient" placeholder="请选择原料">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input class="elInput" placeholder="请输入数字">
                <template slot="append">支</template>
              </el-input>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn">
            <span class="label">次要原料:</span>
            <div class="addBtn">
              <span>新增次要原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label">次料列表:</span>
            <div class="list">
              <el-select class="elSelect" v-model="ingredient" placeholder="请选择原料">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input class="elInput" placeholder="请输入数字">
                <template slot="append">支</template>
              </el-input>
              <el-select class="elSelect" style="width:60px" v-model="ingredient" placeholder="夹1">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select class="elSelect" style="width:60px" v-model="ingredient" placeholder="夹2">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="addBtn">
                <span>+</span>
              </div>
            </div>
            <div class="list">
              <el-select class="elSelect" v-model="ingredient" placeholder="请选择原料">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input class="elInput" placeholder="请输入数字">
                <template slot="append">支</template>
              </el-input>
              <el-select class="elSelect" style="width:60px" v-model="ingredient" placeholder="夹1">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select class="elSelect" style="width:60px" v-model="ingredient" placeholder="夹2">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="addBtn">
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn" style="margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label">经向排列:</span>
            <hot-table style="margin-left:15px" :settings="hotSettings" :width="800" :height="400" ref="table"></hot-table>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">整理总头纹:</span>
            <el-input class="elInput" placeholder="请输入数字">
              <template slot="append">支</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">边型:</span>
             <el-select class="elSelect" v-model="ingredient" placeholder="请选择原料">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="inputCtn">
            <span class="label">整理门幅:</span>
            <el-input class="elInput" placeholder="请输入数字"></el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">筘号:</span>
            <el-input class="elInput" placeholder="请输入数字">
              <template slot="append">支</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">穿筘法:</span>
            <el-input class="elInput" placeholder="请输入数字">
              <template slot="append">支</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">筘幅:</span>
            <el-input class="elInput" placeholder="请输入数字">
              <template slot="append">支</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">机型:</span>
             <el-select class="elSelect" v-model="ingredient" placeholder="请选择原料">
                <el-option
                  v-for="item in ingredientArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="inputCtn">
            <span class="label">综页:</span>
            <el-input class="elInput" placeholder="请输入数字">
              <template slot="append">支</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn" style="width:940px">
            <span class="label">穿综法:</span>
            <el-input
              class="textarea"
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="textarea">
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
      </div>
    </div>
  </div>
</template>

<script>
import { colorList, ingredientList } from '@/assets/js/api.js'
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
      hotSettings: {
        data: [ // 数据，可以是数据，对象
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ],
        colWidths: 64, // 列宽
        rowHeights: [47, 34, 34],
        colHeaders: ['主', '夹1', '夹2', '夹3', '夹4', '夹5'], // 行表头
        contextMenu: [
          'col_left',
          'col_right',
          'remove_col',
          'mergeCells'
        ]
      },
      color: '',
      colorArr: [],
      ingredient: '',
      ingredientArr: [],
      textarea: ''
    }
  },
  created () {
    let companyId = window.sessionStorage.getItem('company_id')
    // 初始化接口
    Promise.all([ colorList({
      company_id: companyId
    }), ingredientList({
      company_id: companyId
    })]).then((res) => {
      this.colorArr = res[0].data.data
      this.ingredientArr = res[1].data.data
    })
  },
  methods: {
    test () {
      console.log(this.hotSettings.data)
    },
    setmergeCells () {
      console.log()
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/designFormCreate.less';
</style>
<style lang="less">
#hot-display-license-info{
  display: none;
}
</style>
