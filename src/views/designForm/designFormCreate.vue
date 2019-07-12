<template>
  <div id="designFormCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加工艺单</h2>
      <div class="rigth">
        <el-select class="elSelect"
          filterable
          remote
          reserve-keyword
          v-model="gyd"
          :remote-method="remoteMethod"
          :loading="loadingS"
          clearable
          :disabled="ifgetCraft"
          @change="getCarft"
          style="width:300px"
          placeholder="输入工艺单编号导入工艺单">
          <el-option v-for="item in gydArr"
            :key="item.craft_code"
            :label="item.craft_code"
            :value="item.id">
            <span>{{ item.craft_code }}</span>
            <span style="margin-left:10px;color: #8492a6; font-size: 13px">({{item.product_info?item.product_info.category_info.product_category +'/'+item.product_info.type_name+'/'+item.product_info.style_name+'/'+item.product_info.flower_id:'设计单' }})</span>
          </el-option>
        </el-select>
      </div>
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
          <div class="inputCtn"
            style="width:620px">
            <span class="label">产品规格:</span>
            <span class="content contentLine"
              style="width:100%"
              v-for="(item,key) in product.size"
              :key="key">
              <span style="margin-right:15px">{{key}}</span>
              <span class="sizeDetail">
                <span class="sizeOnce"
                  v-for="itemChild in item"
                  :key="itemChild.id">{{itemChild.size_value + 'cm' + '(' + itemChild.size_name + ')'}}&nbsp;&nbsp;&nbsp;</span>
                <span class="sizeOnce">{{ item[0].weight + 'g' + '(克重)'}}</span>
              </span>
              <br />
            </span>
          </div>
          <div class="inputCtn"
            style="align-items:flex-start">
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
            <div class="addBtn"
              @click="addColour">
              <span>新增配色方案</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">方案列表:</span>
            <div class="list"
              style="margin-bottom:0"
              v-for="(item,index) in colourNum"
              :key="index">
              <el-select class="elSelect"
                v-model="colour[index]"
                placeholder="请选择配色方案">
                <el-option v-for="item in colourArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                  <div class="bgBlock"
                    :style="{'background':item.color_code}"></div>
                  <div class="desc">{{item.name}}</div>
                </el-option>
              </el-select>
              <color-picker v-for="(item2,index2) in colorNum[index]"
                :key="index2 + color[index][index2].color"
                style="margin-left:15px;margin-bottom:24px"
                v-model="color[index][index2]"
                :content="filterMethods(index2)"
                :colorArr="colorArr"></color-picker>
              <div class="addBtn"
                @click="addColor(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteColor(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteColour(index)"
                style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="list">
              <el-select filterable
                class="elSelect"
                v-model="mainIngredient"
                style="margin-left:15px;width:200px"
                placeholder="请选择主要原料">
                <el-option v-for="item in ingredientArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-top:0">
          <div class="inputCtn">
            <span class="label">次要原料:</span>
            <div class="addBtn"
              @click="addOtherIngredient">
              <span>新增次要原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div v-show="otherIngredientNum>0"
          class="lineCtn"
          style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">次料列表:</span>
            <div class="list"
              v-for="(item,index) in otherIngredientNum"
              :key="index">
              <el-select filterable
                class="elSelect"
                v-model="otherIngredient[index]"
                style="margin-left:15px;width:200px"
                placeholder="请选择次要原料">
                <el-option v-for="item in ingredientArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-for="(item2,index2) in jiaNum[index]"
                :key="index2"
                class="elSelect"
                style="width:80px"
                v-model="jia[index][index2]"
                placeholder="夹">
                <el-option v-for="(item,index2) in colorNum[0]"
                  :key="item"
                  :label="filterMethods(item-1)"
                  :value="index2">
                </el-option>
              </el-select>
              <div class="addBtn"
                @click="addJia(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteJia(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteOtherIngredient(index)"
                style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-top:0">
          <div class="inputCtn oneLine rowLine">
            <span class="label must">经向排列:</span>
            <div class="overflowCtn"
              :style="{'overflow-x':longSort.length>12?'auto':'hidden'}">
              <div class="selectCtn"
                style="height:40px;line-height:40px;">
                <div class="tableConnect">
                  <div class="selectOnce"
                    v-for="(item,index) in longSort"
                    :key="index"
                    style="text-align:center;padding:0;cursor:not-allowed">
                    {{index+1}}
                  </div>
                </div>
              </div>
              <div class="selectCtn">
                <div class="tableConnect">
                  <div class="selectOnce"
                    v-for="(item,index) in longSort"
                    :key="index">
                    <el-select class="elSelect"
                      style="width:50px;margin-left:0;"
                      placeholder=""
                      v-model="longSort[index]">
                      <el-option v-for="(item,index2) in colorNum[0]"
                        :key="item"
                        :label="filterMethods(item-1)"
                        :value="index2">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="excelCtn">
                <hot-table :settings="hotSettings"
                  :height="140"
                  ref="table"></hot-table>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">整经总头纹:</span>
            <el-input class="elInput"
              v-model="warp_data.weft"
              disabled>
              <template slot="append">根</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label must">边型:</span>
            <el-select class="elSelect"
              v-model="warp_data.side_id"
              placeholder="请选择边型">
              <el-option v-for="item in sideArr"
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
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="warp_data.width">
              <template slot="append">厘米</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label must">机型:</span>
            <el-select class="elSelect"
              v-model="warp_data.machine_id"
              placeholder="请选择机型">
              <el-option v-for="item in modeleArr"
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
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="warp_data.reed">
              <template slot="append">筘</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">穿筘法:</span>
            <el-input class="elInput"
              placeholder="数字"
              v-model="warp_data.reed_method">
              <template slot="append">根/筘</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label must">筘幅:</span>
            <el-input class="elInput"
              placeholder="请输入数字"
              @focus="showMore=true"
              @blur="$refs.moreInfo.$refs.input.focus()"
              v-model="warp_data.reed_width">
              <template slot="append">厘米</template>
            </el-input>
            <el-input ref="moreInfo"
              class="moreInfo"
              v-show="showMore||warp_data.reed_detail"
              v-model="warp_data.reed_detail"
              @blur="warp_data.reed_detail?showMore=true:showMore=false"
              placeholder="筘幅详细信息(选填)"></el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">综页:</span>
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="warp_data.sum_up">
              <template slot="append">片</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn"
            style="width:940px">
            <span class="label">穿综法:</span>
            <el-input style="margin-left:15px;"
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
            <el-select class="elSelect"
              clearable=""
              v-model="weft_data.organization_id"
              placeholder="请选择组织法">
              <el-option v-for="item in methodArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="inputCtn">
            <span class="label must">机上坯幅:</span>
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="weft_data.peifu">
              <template slot="append">厘米</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label must">纬密:</span>
            <el-input class="elInput"
              placeholder="数字"
              v-model="weimi"
              disabled>
              <template slot="append">梭/厘米</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">上齿牙:</span>
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="weft_data.shangchiya">
              <template slot="append">牙</template>
            </el-input>
          </div>
          <div class="inputCtn">
            <span class="label">下齿牙:</span>
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="weft_data.xiachiya">
              <template slot="append">牙</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label must">让位要求:</span>
            <el-input class="elInput"
              placeholder="数字"
              v-model="weft_data.neichang">
              <template slot="prepend">内长</template>
              <template slot="append">厘米</template>
            </el-input>
            <el-input class="elInput"
              placeholder="数字"
              v-model="weft_data.rangwei">
              <template slot="prepend">让位</template>
              <template slot="append">厘米</template>
            </el-input>
            <el-input class="elInput"
              placeholder="数字"
              disabled
              v-model="weft_data.total">
              <template slot="prepend">总计</template>
              <template slot="append">梭</template>
            </el-input>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label must">配色方案:</span>
            <div class="addBtn"
              @click="addColour">
              <span>新增配色方案</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-bottom:0">
          <div class="inputCtn oneLine">
            <span class="label">方案列表:</span>
            <div class="list"
              style="margin-bottom:0"
              v-for="(item,index) in colourNum"
              :key="index">
              <el-select class="elSelect"
                v-model="colour[index]"
                placeholder="请选择配色方案">
                <el-option v-for="item in colourArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                  <div class="bgBlock"
                    :style="{'background':item.color_code}"></div>
                  <div class="desc">{{item.name}}</div>
                </el-option>
              </el-select>
              <color-picker v-for="(item2,index2) in colorNum2[index]"
                :key="index2 + color2[index][index2].color"
                style="margin-left:15px;margin-bottom:24px"
                v-model="color2[index][index2]"
                :content="filterMethods(index2)"
                :colorArr="colorArr"></color-picker>
              <div class="addBtn"
                @click="addColor2(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteColor2(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteColour(index)"
                style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">主要原料:</span>
            <div class="list">
              <el-select filterable
                class="elSelect"
                v-model="mainIngredient2"
                style="margin-left:15px;width:200px"
                placeholder="请选择主要原料">
                <el-option v-for="item in ingredientArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-top:0">
          <div class="inputCtn">
            <span class="label">次要原料:</span>
            <div class="addBtn"
              @click="addOtherIngredient2">
              <span>新增次要原料</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div v-show="otherIngredientNum2>0"
          class="lineCtn"
          style="margin-bottom:0;margin-top:0">
          <div class="inputCtn oneLine">
            <span class="label must">次料列表:</span>
            <div class="list"
              v-for="(item,index) in otherIngredientNum2"
              :key="index">
              <el-select filterable
                class="elSelect"
                v-model="otherIngredient2[index]"
                style="margin-left:15px;width:200px"
                placeholder="请选择次要原料">
                <el-option v-for="item in ingredientArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <el-select v-for="(item2,index2) in jiaNum2[index]"
                :key="index2"
                class="elSelect"
                style="width:80px"
                v-model="jia2[index][index2]"
                placeholder="夹">
                <el-option v-for="(item,index2) in colorNum2[0]"
                  :key="item"
                  :label="filterMethods(item-1)"
                  :value="index2">
                </el-option>
              </el-select>
              <div class="addBtn"
                @click="addJia2(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-plus"></i>
              </div>
              <div class="addBtn"
                @click="deleteJia2(index)"
                style="width:40px;text-align:center;padding:0">
                <i class="el-icon-minus"></i>
              </div>
              <div class="addBtn"
                @click="deleteOtherIngredient2(index)"
                style="width:40px;text-align:center;padding:0;border-color:transparent">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn"
          style="margin-top:0">
          <div class="inputCtn oneLine rowLine">
            <span class="label must">纬向排列</span>
            <div class="overflowCtn"
              :style="{'overflow-x':longSort2.length>12?'auto':'hidden'}">
              <div class="selectCtn"
                style="height:40px;line-height:40px;">
                <div class="tableConnect">
                  <div class="selectOnce"
                    v-for="(item,index) in longSort2"
                    :key="index"
                    style="text-align:center;padding:0;cursor:not-allowed">
                    {{index+1}}
                  </div>
                </div>
              </div>
              <div class="selectCtn">
                <div class="tableConnect">
                  <div class="selectOnce"
                    v-for="(item,index) in longSort2"
                    :key="index">
                    <el-select class="elSelect"
                      style="width:50px;margin-left:0;"
                      placeholder=""
                      v-model="longSort2[index]">
                      <el-option v-for="(item,index2) in colorNum2[0]"
                        :key="item"
                        :label="filterMethods(item-1)"
                        :value="index2">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="excelCtn">
                <hot-table :settings="hotSettings2"
                  :width="2000"
                  :height="140"
                  ref="table2"></hot-table>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label must">产品净重:</span>
            <el-input class="elInput"
              placeholder="请输入数字"
              v-model="weight">
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
            <div class="list"
              v-for="(item,index) in materialList"
              :key="index">
              <el-input style="width:420px"
                class="elInput"
                placeholder="数字"
                v-model="coefficient[index]">
                <template slot="prepend">{{item}}</template>
                <template slot="append">克/厘米</template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">添加</div>
      </div>
    </div>
    <div class="suspend">
      <span class="blue"
        @click="saveDraft">保存草稿</span>
      <div class="border"></div>
      <span class="red"
        @click="clearDraft">清空草稿</span>
    </div>
  </div>
</template>

<script>
import { porductOne, YarnList, editList, saveCraft, YarnColorList, craftList, craftOne } from '@/assets/js/api.js'
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
      editFlag: false,
      showMore: false,
      lock: false,
      ifgetCraft: false,
      gyd: '',
      gydArr: [],
      loadingS: false,
      loading: true,
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
        className: 'htCenter htMiddle',
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
          'copy',
          '粘贴(Ctrl + V)',
          'undo',
          'redo',
          'remove_col'
        ],
        // cells: (row, col) => {
        //   let cellMeta = {}
        //   if (row === 0) {

        //   } else {
        //     cellMeta.type = 'numeric'
        //   }
        //   return cellMeta
        // },
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
      colourArr: [],
      colourNum: 1,
      color: [[{
        name: '',
        color: ''
      }]],
      color2: [[{
        name: '',
        color: ''
      }]],
      colorArr: [],
      colorNum: [0],
      colorNum2: [0],
      countArr: [],
      typeArr: [],
      ingredient: [],
      mainIngredient: '',
      mainIngredient2: '',
      otherIngredient: [], // 这里只能存对象,用数组会报错
      otherIngredient2: [],
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
        drafting_method: null,
        reed_detail: null
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
    // colorNum2 (newVal) {
    //   this.hotSettings2.cells = (row, col) => {
    //     let cellMeta = {}
    //     if (row === 0) {
    //       cellMeta.type = 'dropdown'
    //       cellMeta.source = []
    //       for (let i = 0; i < newVal[0]; i++) { cellMeta.source.push('夹' + (i + 1)) }
    //       console.log(cellMeta.source)
    //     } else {
    //       cellMeta.type = 'numeric'
    //     }
    //     return cellMeta
    //   }
    // }
  },
  mounted () {
    // 初始化接口
    Promise.all([porductOne({
      id: this.$route.params.id
    }), YarnList({
      company_id: this.companyId
    }), editList({
      company_id: this.companyId
    }), YarnColorList({
      company_id: this.companyId
    })]).then((res) => {
      console.log(res)
      this.product = res[0].data.data
      this.colourArr = res[0].data.data.color
      this.colorArr = res[3].data.data
      this.ingredientArr = res[1].data.data
      this.sideArr = res[2].data.data.side
      this.modeleArr = res[2].data.data.type
      this.methodArr = res[2].data.data.method
      // 读取草稿信息
      this.colour = JSON.parse(window.localStorage.getItem('colour')) || ['']
      this.colour = this.colour.map((item) => { return '' })
      this.colourNum = this.colour.length > 1 ? this.colour.length : 1
      this.color = JSON.parse(window.localStorage.getItem('color')) || [[{ name: '', color: '' }]]
      this.colorNum = this.color.map((item) => item.length > 1 ? item.length : 1)
      this.color2 = JSON.parse(window.localStorage.getItem('color2')) || [[{ name: '', color: '' }]]
      this.colorNum2 = this.color2.map((item) => item.length > 1 ? item.length : 1)
      this.mainIngredient = JSON.parse(window.localStorage.getItem('mainIngredient')) || ''
      this.mainIngredient2 = JSON.parse(window.localStorage.getItem('mainIngredient2')) || ''
      this.otherIngredient = JSON.parse(window.localStorage.getItem('otherIngredient')) || []
      this.otherIngredient2 = JSON.parse(window.localStorage.getItem('otherIngredient2')) || []
      this.otherIngredientNum = this.otherIngredient.length
      this.otherIngredientNum2 = this.otherIngredient2.length
      this.jia = JSON.parse(window.localStorage.getItem('jia')) || []
      this.jia2 = JSON.parse(window.localStorage.getItem('jia2')) || []
      this.jiaNum = JSON.parse(window.localStorage.getItem('jiaNum')) || []
      this.jiaNum2 = JSON.parse(window.localStorage.getItem('jiaNum2')) || []
      this.warp_data = JSON.parse(window.localStorage.getItem('warp_data')) || {
        weft: null, // 整理总头纹,需要计算
        side_id: null,
        width: null,
        machine_id: null,
        reed: null,
        reed_method: null,
        reed_width: null,
        sum_up: null,
        drafting_method: null
      }
      this.weft_data = JSON.parse(window.localStorage.getItem('weft_data')) || {
        organization_id: null,
        peifu: null,
        weimi: null,
        shangchiya: null,
        xiachiya: null,
        neichang: null,
        rangwei: null,
        total: null
      }
      this.hotSettings.data = JSON.parse(window.localStorage.getItem('table')) || [[''], [''], ['']]
      this.hotSettings2.data = JSON.parse(window.localStorage.getItem('table2')) || [[''], [''], ['']]
      // 因为单元格不会自动合并，只保留第一行的数据
      this.hotSettings.data = this.hotSettings.data.map((item, index) => {
        if (index > 0) {
          return item.map((item) => '')
        } else {
          return item
        }
      })
      this.hotSettings2.data = this.hotSettings2.data.map((item, index) => {
        if (index > 0) {
          return item.map((item) => '')
        } else {
          return item
        }
      })
      this.longSort = JSON.parse(window.localStorage.getItem('longSort')) || ['']
      this.longSort2 = JSON.parse(window.localStorage.getItem('longSort2')) || ['']
      this.weight = window.localStorage.getItem('weight') || ''
      this.coefficient = JSON.parse(window.localStorage.getItem('coefficient')) || []
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
      console.log(this.color)
      this.colour.push('')
      this.colorNum.push(this.colorNum[0])
      this.color.push([])
      for (let i = 0; i < this.colorNum[0]; i++) { this.color[this.color.length - 1].push({ name: '', color: '' }) }
      this.colourNum++
      this.colorNum2.push(this.colorNum2[0])
      this.color2.push([])
      for (let i = 0; i < this.colorNum2[0]; i++) { this.color2[this.color2.length - 1].push({ name: '', color: '' }) }
    },
    // 删除配色方案
    deleteColour (index) {
      if (this.colour.length > 1) {
        this.colour.splice(index, 1)
        this.colourNum--
        this.color.splice(index, 1)
        this.colorNum.splice(index, 1)
        this.color2.splice(index, 1)
        this.colorNum2.splice(index, 1)
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
        this.color[index].push({
          name: '',
          color: ''
        })
      })
    },
    addColor2 () {
      this.colorNum2.forEach((item, index) => {
        this.$set(this.colorNum2, index, (this.colorNum2[index] + 1))
        this.color2[index].push({
          name: '',
          color: ''
        })
      })
    },
    // 删除颜色
    deleteColor () {
      this.colorNum.forEach((item, index) => {
        if (this.colorNum[index] > 1) {
          this.$set(this.colorNum, index, (this.colorNum[index] - 1))
        } else {
          this.$message.error({
            message: '颜色不得少于一种'
          })
        }
      })
    },
    deleteColor2 () {
      this.colorNum2.forEach((item, index) => {
        if (this.colorNum2[index] > 1) {
          this.$set(this.colorNum2, index, (this.colorNum2[index] - 1))
        } else {
          this.$message.error({
            message: '颜色不得少于一种'
          })
        }
      })
    },
    // 添加次要原料
    addOtherIngredient () {
      this.$set(this.otherIngredient, this.otherIngredientNum, '')
      this.jiaNum.push(1)
      this.jia.push([])
      this.otherIngredientNum++
    },
    addOtherIngredient2 () {
      this.$set(this.otherIngredient2, this.otherIngredientNum2, '')
      this.jiaNum2.push(1)
      this.jia2.push([])
      this.otherIngredientNum2++
    },
    // 删除次要原料
    deleteOtherIngredient (index) {
      this.jiaNum.splice(index, 1)
      this.jia.splice(index, 1)
      this.otherIngredient.splice(index, 1)
      this.otherIngredientNum--
    },
    deleteOtherIngredient2 (index) {
      this.jiaNum2.splice(index, 1)
      this.jia2.splice(index, 1)
      this.otherIngredient2.splice(index, 1)
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
      if (!this.lock) {
        // 用户体验优化,判断表单必填字段是否填写
        let flag = {
          color: true,
          colour: true,
          color2: true,
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
        this.colour.forEach((item) => {
          if (item === '') {
            flag.colour = false
          }
        })
        // 检查纱线颜色
        this.color.forEach((item, index) => {
          for (let i = 0; i < this.colorNum[index]; i++) {
            if (!item[i].name) {
              flag.color = false
            }
          }
        })
        this.color2.forEach((item, index) => {
          for (let i = 0; i < this.colorNum2[index]; i++) {
            if (!item[i].name) {
              flag.color2 = false
            }
          }
        })
        // 检查主要原料
        if (!this.mainIngredient) {
          flag.mainIngredient = false
        }
        if (!this.mainIngredient2) {
          flag.mainIngredient2 = false
        }
        // 检查次要原料
        for (let key in this.otherIngredient) {
          if (!this.otherIngredient[key]) {
            flag.otherIngredient = false
          }
        }
        for (let key in this.otherIngredient2) {
          if (!this.otherIngredient2[key]) {
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
        if (!flag.colour) {
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
        if (!this.warp_data.reed_width) {
          this.$message.error({
            message: '请填写筘幅'
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
        let warpMaterialMain = this.mainIngredient
        // 纬向主料获取name
        let weftMaterialMain = this.mainIngredient2
        // 经向次料获取
        let warpMaterialOther = []
        this.otherIngredient.forEach((item, index) => {
          warpMaterialOther.push({
            name: item,
            value: this.jia[index]
          })
        })
        // 纬向次料获取
        let weftMaterialOther = []
        this.otherIngredient2.forEach((item, index) => {
          weftMaterialOther.push({
            name: item,
            value: this.jia2[index]
          })
        })
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
              name: this.color[index][i].name,
              value: this.color[index][i].color
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
              name: this.color2[index][i].name,
              value: this.color2[index][i].color
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
          id: '',
          is_draft: 0,
          company_id: this.companyId,
          product_id: this.$route.params.id,
          user_id: window.sessionStorage.getItem('user_id'),
          craft_code: null,
          warp_data: this.warp_data,
          weft_data: this.weft_data,
          color_data: colorData,
          material_data: materialDataNew,
          weight: this.weight,
          yarn_coefficient: yarnCoefficient
        }
        console.log(json)
        this.lock = true
        this.loading = true
        saveCraft(json).then((res) => {
          if (res.data.status) {
            this.$message.success({
              message: '添加成功'
            })
            this.clearDraft(false)
            this.$router.push('/index/productPlanCreate/' + this.$route.params.id)
          } else {
            this.$message.error({
              message: res.data.message
            })
          }
          this.lock = false
          this.loading = false
        })
      } else {
        this.$message.error({
          message: '请勿频繁操作'
        })
      }
    },
    // 清空
    clearAll () {
      this.$confirm('此操作将清空所有填写信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '暂时不支持清空功能!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清除'
        })
      })
    },
    // 保存草稿
    saveDraft () {
      window.localStorage.setItem('colour', JSON.stringify(this.colour))
      window.localStorage.setItem('colour', JSON.stringify(this.colour))
      window.localStorage.setItem('color', JSON.stringify(this.color))
      window.localStorage.setItem('color2', JSON.stringify(this.color2))
      window.localStorage.setItem('mainIngredient', JSON.stringify(this.mainIngredient))
      window.localStorage.setItem('mainIngredient2', JSON.stringify(this.mainIngredient2))
      window.localStorage.setItem('otherIngredient', JSON.stringify(this.otherIngredient))
      window.localStorage.setItem('otherIngredient2', JSON.stringify(this.otherIngredient2))
      window.localStorage.setItem('jia', JSON.stringify(this.jia))
      window.localStorage.setItem('jia2', JSON.stringify(this.jia2))
      window.localStorage.setItem('jiaNum', JSON.stringify(this.jiaNum))
      window.localStorage.setItem('jiaNum2', JSON.stringify(this.jiaNum2))
      window.localStorage.setItem('weft_data', JSON.stringify(this.weft_data))
      window.localStorage.setItem('warp_data', JSON.stringify(this.warp_data))
      window.localStorage.setItem('table', JSON.stringify(this.hotSettings.data))
      window.localStorage.setItem('table2', JSON.stringify(this.hotSettings2.data))
      window.localStorage.setItem('longSort', JSON.stringify(this.longSort))
      window.localStorage.setItem('longSort2', JSON.stringify(this.longSort2))
      window.localStorage.setItem('coefficient', JSON.stringify(this.coefficient))
      window.localStorage.setItem('weight', this.weight)
      this.$message.success({
        message: '保存草稿成功'
      })
    },
    // 清空草稿
    clearDraft (noMessage) {
      window.localStorage.removeItem('colour')
      window.localStorage.removeItem('colour')
      window.localStorage.removeItem('color')
      window.localStorage.removeItem('color2')
      window.localStorage.removeItem('mainIngredient')
      window.localStorage.removeItem('mainIngredient2')
      window.localStorage.removeItem('otherIngredient')
      window.localStorage.removeItem('otherIngredient2')
      window.localStorage.removeItem('jia')
      window.localStorage.removeItem('jia2')
      window.localStorage.removeItem('jiaNum')
      window.localStorage.removeItem('jiaNum2')
      window.localStorage.removeItem('weft_data')
      window.localStorage.removeItem('warp_data')
      window.localStorage.removeItem('table')
      window.localStorage.removeItem('table2')
      window.localStorage.removeItem('longSort')
      window.localStorage.removeItem('longSort2')
      window.localStorage.removeItem('coefficient')
      window.localStorage.removeItem('weight')
      if (noMessage) {
        this.$message.success({
          message: '清空草稿成功'
        })
      }
    },
    // 查找工艺单
    remoteMethod (query) {
      if (query !== '') {
        this.loadingS = true
        craftList({
          company_id: this.companyId,
          type_id: null,
          style_id: null,
          category_id: null,
          limit: 20,
          page: 1,
          craft_code: query,
          is_draft: null
        }).then((res) => {
          this.gydArr = res.data.data
          this.loadingS = false
        })
      } else {
        this.gydArr = []
      }
    },
    // 获取单张工艺单并渲染
    getCarft (code) {
      this.loading = true
      craftOne({
        id: code
      }).then((res) => {
        this.ifgetCraft = true
        // 整理工艺单数据
        let data = res.data.data
        // 处理原料数据
        data.material_data.forEach((item) => {
          if (item.type === 0 && item.type_material === 0) {
            this.mainIngredient = item.material_name
          }
          if (item.type === 1 && item.type_material === 0) {
            this.mainIngredient2 = item.material_name
          }
          if (item.type === 0 && item.type_material === 1) {
            this.otherIngredient.push(item.material_name)
            this.jiaNum.push(item.apply.length)
            this.jia.push(item.apply)
            this.otherIngredientNum++
          }
          if (item.type === 1 && item.type_material === 1) {
            this.otherIngredient2.push(item.material_name)
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
        this.colour = warpColorData.map((item) => '')
        this.colourNum = warpColorData.length
        this.colour2 = weftColorData.map((item) => '')
        this.colourNum2 = weftColorData.length
        this.color = warpColorData.map((item) => item.color_scheme.map((itemColor) => { return { 'name': itemColor.name, 'color': itemColor.value } }))
        this.colorNum = warpColorData.map((item) => item.color_scheme.length)
        this.color2 = weftColorData.map((item) => item.color_scheme.map((itemColor) => { return { 'name': itemColor.name, 'color': itemColor.value } }))
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
        this.loading = false
      })
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
      let warpMaterialMain = []
      let weftMaterialMain = []
      let warpMaterialOther = []
      let weftMaterialOther = []
      if (this.mainIngredient) {
        warpMaterialMain = [this.mainIngredient]
      }
      if (this.mainIngredient2) {
        weftMaterialMain = [this.mainIngredient2]
      }
      if (this.otherIngredient.length > 0) {
        warpMaterialOther = this.otherIngredient
      }
      if (this.otherIngredient2.length > 0) {
        weftMaterialOther = this.otherIngredient2
      }
      // ES6提供的数组去重方式
      return Array.from(new Set(warpMaterialMain.concat(weftMaterialMain).concat(warpMaterialOther).concat(weftMaterialOther)))
    },
    weimi () {
      if (this.weft_data.neichang && this.weft_data.rangwei) {
        return ((this.weft_data.total / (this.weft_data.neichang + this.weft_data.rangwei)) * 100).toFixed(2)
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/designFormCreate.less";
</style>
<style lang="less">
.selectOnce {
  .el-input--suffix .el-input__inner {
    padding: 0 15px 0 5px;
  }
  .el-select .el-input .el-select__caret {
    font-size: 10px;
    width: 15px;
  }
}
.moreInfo {
  position: absolute;
  top: calc(100% + 10px);
  width: 173px;
  margin-left: 15px;
}
</style>
