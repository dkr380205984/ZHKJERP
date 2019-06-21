<template>
  <div id="packagInfoCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加包装辅料(未启用)</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号:</span>
            <span class="content important"
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <span class="content">{{client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">{{order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">{{group_name}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品发货信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex2">产品品类</span>
                  <span class="flex2">
                    <span>尺码/颜色</span>
                    <span>发货数量</span>
                  </span>
                </li>
                <li v-if="productList.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in productList"
                  :key="key">
                  <span class="tableRow blue">{{item.product_code}}</span>
                  <span class="flex2 tableRow">{{item.type}}</span>
                  <span class="tableRow flex2 col">
                    <span v-for="(value,index) in item.size_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="tableRow">{{value.plan_number}}{{item.unit}}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">添加装箱辅料</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list.addPackagList"
              :key="key">
              <li style="justify-content: center;padding-top:0">
                <div class="addLv"
                  @click="addPackagLv(key)">添加{{chinaNumber[key+1]}}级</div>
              </li>
              <li class="col"
                v-for="(value,index) in item"
                :key="index">
                <div style="flex-direction:column">
                  <div class="divInp">
                    <span>包装分类:</span>
                    <el-select v-model="value.type"
                      placeholder="请选择包装类型"
                      size="small"
                      :disabled="value.flag"
                      style="width:243px;">
                      <el-option v-for="type in options.packagType"
                        :key="type.id"
                        :label="type.value"
                        :value="type.name">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="divInp">
                    <span>包装规格:</span>
                    <el-input size="small"
                      style="width:243px;"
                      :disabled="value.flag"
                      placeholder="请输入包装规格"
                      v-model="value.size">
                    </el-input>
                  </div>
                  <div class="divInp">
                    <span>包装属性:</span>
                    <el-input size="small"
                      style="width:243px;"
                      :disabled="value.flag"
                      placeholder="请输入包装属性"
                      v-model="value.attr">
                    </el-input>
                  </div>
                  <div v-for="(valCode,indCode) in value.packag_info"
                    :key="indCode"
                    style="flex-direction:column;margin-top:20px;">
                    <div class="divInp">
                      <span>包装编号:</span>
                      <el-input size="small"
                        style="width:243px;"
                        :disabled="valCode.flag"
                        placeholder="请输入预计包装数量"
                        v-model="valCode.packag_number">
                        <template slot="prepend">{{key+1}}{{letterArr[index]}}{{indCode+1}}</template>
                      </el-input>
                    </div>
                    <template v-for="(valPro,indPro) in valCode.product_info">
                      <div class="divInp"
                        :key="indPro">
                        <span>产品{{indPro + 1}}:</span>
                        <el-select v-model="valPro.name"
                          :placeholder="'产品' + (indPro + 1)"
                          size="small"
                          :disabled="valPro.flag"
                          style="width:243px;font-size:10px;">
                          <el-option v-for="product in arrGeter(key)"
                            :key="product.value"
                            :value="product.value">
                          </el-option>
                        </el-select>
                        <em v-if="indPro === 0"
                          class="el-icon-plus"
                          style="right:-35px;top:3px;"
                          @click="addProduct(key,index,indCode)"></em>
                        <em v-else
                          class="el-icon-delete"
                          style="right:-35px;top:3px;"
                          @click="valPro.flag ? noDelete() : deleteProduct(key,index,indCode,indPro)"></em>
                      </div>
                      <div class="divInp"
                        style="margin-left:6em;font-size:14px;flex-direction:column"
                        :key="indPro+'Y'">
                        <el-input size="small"
                          style="width:243px"
                          placeholder="每包数量"
                          :disabled="valPro.flag"
                          v-model="valPro.number">
                        </el-input>
                      </div>
                    </template>
                    <div class="addLv"
                      v-if="indCode === 0"
                      style="width:6em;margin-left:6em;font-size:14px;margin-top:20px;"
                      @click="addPackagCode(key,index)">添加{{key+1}}{{letterArr[index]}}</div>
                    <div class="addLv"
                      v-else
                      style="width:6em;margin-left:6em;font-size:14px;margin-top:20px;"
                      @click="valCode.flag ? noDelete() :deletePackagCode(key,index,indCode)">删除{{key+1}}{{letterArr[index]}}</div>
                  </div>
                  <em v-if="index !== 0"
                    class="el-icon-delete"
                    style="right:0px;top:30px;"
                    @click="value.flag ? noDelete() : deletePackagLv(key,index)"></em>
                </div>
                <!-- </template> -->
                <span class="tag">{{chinaNumber[key+1]}}级{{letterArr[index]}}</span>
              </li>
              <span class="el-icon-close"
                @click="item.flag ? noDelete() : deleteLvInfo(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addLvInfo">
            <span>+</span>
            <span>添加级数</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">装箱预计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>包装编号</span>
                  <span>包装分类</span>
                  <span class="flex12">规格/属性</span>
                  <span class="flex12">包装数量</span>
                  <span class="flex6">
                    <span class="flex2">产品/包装</span>
                    <span>尺码颜色</span>
                    <span>产品数量</span>
                    <span>每包数量</span>
                    <span>结余情况</span>
                  </span>
                </li>
                <li v-if="list.addPackagInfo.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in list.addPackagInfo"
                  :key="key">
                  <span class="tableRow">{{item.packag_code}}</span>
                  <span class="tableRow">{{item.packag_type}}</span>
                  <span class="tableRow flex12"
                    style="line-height:1.5em;">
                    <div style="padding:5px 0;">
                      <span>{{item.packag_size}}</span>
                      <span>{{item.packag_attr}}</span>
                    </div>
                  </span>
                  <span class="tableRow flex12">{{item.packag_number}}{{item.unit}}</span>
                  <span class="tableRow flex6 col">
                    <span v-for="(value,index) in item.product_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow flex2"
                        style="line-height:1.5em;">
                        <div style="padding:5px 0;">
                          <span>{{value.product_code}}</span>
                          <span>{{value.type}}</span>
                        </div>
                      </span>
                      <span class="tableRow">{{value.size + '/' + value.color}}</span>
                      <span class="tableRow">{{value.plan_number ? value.plan_number : 0}}{{value.unit ? value.unit : '条'}}</span>
                      <span class="tableRow">{{value.number}}{{(value.unit ? value.unit : '条')+'/'+(item.unit ? item.unit : '包')}}</span>
                      <span :class="{tableRow:true,warning:value.surplus_number > 0,error:value.surplus_number < 0,success:value.surplus_number === 0}">{{(value.surplus_number >= 0) ? '结余:' : '缺少:'}}{{value.surplus_number ? value.surplus_number : 0}}{{value.unit ? vlaue.unit : '条'}}</span>
                    </span>
                  </span>
                </li>
                <!-- <li class="content">
                  <span class="col">
                    <span v-for="(item,key) in surplus"
                      :key="key"
                      class="tablecolumn">{{item.value}}{{((item.number ? item.number : 0) >= 0) ? '结余' : '缺少'}}{{item.number ? item.number : 0}}{{item.unit}}</span>
                  </span>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">其他装箱辅料</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="addPackagInfo">
            <ul class="addPackagFrom"
              v-for="(item,key) in list.addPackagMaterialList"
              :key="key"
              style="height:400px;">
              <li>
                <span>产品/包装:</span>
                <el-select v-model="item.packag_name"
                  placeholder="请选择产品/包装"
                  size="small"
                  style="width:243px;">
                  <el-option v-for="type in arrGeter()"
                    :key="type.id"
                    :value="type.value">
                  </el-option>
                </el-select>
              </li>
              <li style="flex-direction:column;align-items: flex-start;"
                v-for="(value,index) in item.packag_material"
                :key="index">
                <div class="divInp">
                  <span>包装辅料:</span>
                  <el-select v-model="value.name"
                    placeholder="请选择包装辅料"
                    size="small"
                    style="width:243px;">
                    <el-option v-for="type in options.materialArr"
                      :key="type.id"
                      :label="type.value"
                      :value="type.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="divInp">
                  <span>数量属性:</span>
                  <el-input size="small"
                    style="width:108px"
                    placeholder="每包数量"
                    v-model="value.number">
                  </el-input>
                  <strong>——</strong>
                  <el-input size="small"
                    style="width:108px"
                    placeholder="属性"
                    v-model="value.attr">
                  </el-input>
                </div>
                <em v-if="index === 0"
                  class="el-icon-plus"
                  style="right:0px;top:13px;"
                  @click="addMaterialPro(key)"></em>
                <em v-else
                  class="el-icon-delete"
                  style="right:0px;top:13px;"
                  @click="deleteMaterialPro(key,index)"></em>
              </li>
              <span class="el-icon-close"
                @click="deleteMaterialInfo(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addMaterialInfo">
            <span>+</span>
            <span>添加辅料</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">其他辅料统计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <!-- <div class="border"></div> -->
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span class="flex17">产品/包装</span>
                  <span>尺码/颜色</span>
                  <span class="flex5">
                    <span>辅料名称</span>
                    <span>辅料属性</span>
                    <span>产品数量</span>
                    <span>包装要求</span>
                    <span>辅料数量</span>
                  </span>
                </li>
                <li v-if="list.addPackagMaterialInfo.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in list.addPackagMaterialInfo"
                  :key="key">
                  <span class="tableRow flex17"
                    style="line-height:1.5em;">
                    <div>
                      <span>{{item.code}}</span>
                      <span>{{item.type}}</span>
                    </div>
                  </span>
                  <span class="tableRow">{{item.size}}{{'/'}}{{item.color}}</span>
                  <span class="tableRow flex5 col">
                    <span v-for="(value,index) in item.material_info"
                      :key='index'
                      class="tableColumn">
                      <span class="tableRow">{{value.name}}</span>
                      <span class="tableRow">{{value.attr ? value.attr : '无'}}</span>
                      <span class="tableRow">{{value.plan_number ? value.plan_number : 0}}{{item.unit}}</span>
                      <span class="tableRow">{{value.number?value.number:0}}{{(value.unit ? value.unit : '条') + '/' + (item.unit ? item.unit : '包')}}</span>
                      <span class="tableRow">{{(value.plan_number ? value.plan_number : 0) * value.number}}{{value.unit}}</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="saveAll">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { letterArr } from '@/assets/js/dictionary.js'
import { orderDetail, packagCreate, packagDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: [], // 产品列表
      list: {
        addPackagList: [
          [{
            type: '',
            size: '',
            attr: '',
            packag_info: [{
              packag_code: '1A1',
              packag_number: '',
              product_info: [{
                name: '',
                number: ''
              }]
            }]
          }]
        ], // 添加装箱辅料
        addPackagInfo: [], // 装箱预计表
        addPackagMaterialList: [
          {
            packag_name: '',
            packag_material: [
              {
                name: '',
                number: '',
                attr: ''
              }
            ]
          }
        ], // 其他装箱辅料
        addPackagMaterialInfo: [] // 其他辅料统计表
      },
      surplus: [], // 产品结余
      chinaNumber: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      },
      letterArr: letterArr,
      options: {
        packagType: [
          {
            name: '袋子 袋',
            value: '袋子'
          }, {
            name: '礼盒 盒',
            value: '礼盒'
          }, {
            name: '箱子 箱',
            value: '箱子'
          }, {
            name: '蛇皮袋 袋',
            value: '蛇皮袋'
          }
        ], // 包装分类
        productArr: [], // 产品列表
        materialArr: [
          {
            name: '洗标 个',
            value: '洗标'
          }, {
            name: '吊牌 个',
            value: '吊牌'
          }, {
            name: '吊绳 条',
            value: '吊绳'
          }, {
            name: '衣架 个',
            value: '衣架'
          }, {
            name: '干燥剂 包',
            value: '干燥剂'
          }, {
            name: '防盗扣 个',
            value: '防盗扣'
          }, {
            name: '纸板 个',
            value: '纸板'
          }, {
            name: '箱贴 个',
            value: '箱贴'
          }, {
            name: '袋贴 个',
            value: '袋贴'
          }
        ] // 辅料列表
      },
      flag: true,
      save: true
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  watch: {
    // 监听装箱辅料统计装箱预计值
    'list.addPackagList': {
      deep: true,
      handler: function (newVal) {
        this.list.addPackagInfo = []
        this.list.addPackagList.forEach(item => {
          item.forEach(value => {
            value.packag_info.forEach(valCode => {
              valCode.product_info.forEach((valPro, indPro) => {
                let num = ''
                let fleg = this.arrGeter().find(key => key.value === valPro.name)
                if (fleg) {
                  num = fleg.number
                }
                // 初始化装箱预计表
                let flag = this.list.addPackagInfo.find(key => key.packag_code === valCode.packag_code)
                if (!flag) {
                  this.list.addPackagInfo.push({
                    packag_code: valCode.packag_code,
                    packag_type: value.type ? value.type.split(' ')[0] : '未选择',
                    unit: value.type ? value.type.split(' ')[1] : '',
                    packag_size: value.size ? value.size : '未输入',
                    packag_attr: value.attr ? value.attr : '未输入',
                    packag_number: valCode.packag_number ? valCode.packag_number : '0',
                    product_info: [{
                      name: valPro.name,
                      plans_number: num,
                      product_code: valPro.name ? valPro.name.split(' ')[0] : '未选择',
                      type: valPro.name ? valPro.name.split(' ')[1] : '未选择',
                      size: valPro.name ? (valPro.name.split(' ')[2] ? valPro.name.split(' ')[2].split('/')[0] : '') : '',
                      color: valPro.name ? (valPro.name.split(' ')[2] ? valPro.name.split(' ')[2].split('/')[1] : '') : '',
                      number: valPro.number ? valPro.number : '0',
                      plan_number: (valCode.packag_number && valPro.number) ? (valPro.number * valCode.packag_number) : 0
                    }]
                  })
                } else {
                  flag.product_info.push({
                    name: valPro.name,
                    plans_number: num,
                    product_code: valPro.name ? valPro.name.split(' ')[0] : '未选择',
                    type: valPro.name ? valPro.name.split(' ')[1] : '未选择',
                    size: valPro.name ? (valPro.name.split(' ')[2] ? valPro.name.split(' ')[2].split('/')[0] : '') : '',
                    color: valPro.name ? (valPro.name.split(' ')[2] ? valPro.name.split(' ')[2].split('/')[1] : '') : '',
                    number: valPro.number ? valPro.number : '0',
                    plan_number: (valCode.packag_number && valPro.number) ? (valPro.number * valCode.packag_number) : 0
                  })
                }
              })
            })
          })
        })
      }
    },
    // 监听装箱预计表计算产品或包装的结余
    'list.addPackagInfo': {
      // deep: true,
      handler: function (newVal) {
        this.surplus = JSON.parse(JSON.stringify(this.arrGeter()))
        this.flag = true
        newVal.forEach(item => {
          item.product_info.forEach(valPro => {
            let flag = this.surplus.find(key => (key.value === valPro.name))
            if (flag) {
              flag.number -= valPro.plan_number
              valPro.surplus_number = flag.number
              if (flag.number < 0) {
                this.flag = false
              }
            }
          })
        })
      }
    },
    // 监听其他装箱辅料统计辅料统计表
    'list.addPackagMaterialList': {
      deep: true,
      handler: function (newVal) {
        this.list.addPackagMaterialInfo = []
        newVal.forEach(item => {
          if (item.packag_name) {
            let num = this.arrGeter().find(key => key.value === item.packag_name).number
            let obj = {}
            obj.code = item.packag_name ? item.packag_name.split(' ')[0] : ''
            obj.type = item.packag_name ? item.packag_name.split(' ')[1] : ''
            obj.size = item.packag_name ? (item.packag_name.split(' ')[2] ? item.packag_name.split(' ')[2].split('/')[0] : '') : ''
            obj.color = item.packag_name ? (item.packag_name.split(' ')[2] ? item.packag_name.split(' ')[2].split('/')[1] : '') : ''
            obj.material_info = []
            item.packag_material.forEach(val => {
              let flag = obj.material_info.find(key => ((key.name + ' ' + key.unit) === val.name) && key.attr === val.attr)
              if (!flag) {
                obj.material_info.push({
                  name: val.name ? val.name.split(' ')[0] : '',
                  unit: val.name ? val.name.split(' ')[1] : '',
                  attr: val.attr,
                  number: val.number,
                  plan_number: num
                })
              } else {
                flag.number = Number(flag.number) + Number(val.number)
              }
            })
            this.list.addPackagMaterialInfo.push({ ...obj })
          }
        })
      }
    }
  },
  methods: {
    noDelete () {
      this.$message({
        type: 'error',
        message: `不可对已有数据进行删除`
      })
    },
    addMaterialPro (key) {
      this.list.addPackagMaterialList[key].packag_material.push({
        name: '',
        number: '',
        attr: ''
      })
    },
    deleteMaterialPro (key, index) {
      this.list.addPackagMaterialList[key].packag_material.splice(index, 1)
    },
    addMaterialInfo () {
      this.list.addPackagMaterialList.push({
        packag_name: '',
        packag_material: [
          {
            name: '',
            number: '',
            attr: ''
          }
        ]
      })
    },
    deleteMaterialInfo (key) {
      this.list.addPackagMaterialList.splice(key, 1)
    },
    arrGeter (key) {
      let arr = [...this.options.productArr]
      this.list.addPackagList.forEach((item, kay) => {
        if ((kay < key && key !== undefined) || key === undefined) {
          item.forEach(value => {
            value.packag_info.forEach(valCode => {
              let fleg = arr.find(key => key === (valCode.packag_code + ' ' + value.type))
              if (!fleg) {
                arr.unshift({
                  value: valCode.packag_code + ' ' + value.type.split(' ')[0],
                  number: valCode.packag_number
                })
              }
            })
          })
        }
      })
      return arr
    },
    addProduct (key, index, indCode) {
      this.list.addPackagList[key][index].packag_info[indCode].product_info.push({
        name: '',
        number: ''
      })
    },
    deleteProduct (key, index, indCode, indPro) {
      let len = this.list.addPackagList[key][index].packag_info[indCode].product_info.length
      if (indPro === len - 1) {
        this.list.addPackagList[key][index].packag_info[indCode].product_info.splice(indPro, 1)
      } else {
        this.$message({
          type: 'error',
          message: `请逐级删除！！！`
        })
      }
    },
    addPackagCode (key, index) {
      let len = this.list.addPackagList[key][index].packag_info.length
      let str = (key + 1) + this.letterArr[key] + (len + 1)
      this.list.addPackagList[key][index].packag_info.push({
        packag_code: str,
        packag_number: '',
        product_info: [{
          name: '',
          number: ''
        }]
      })
    },
    deletePackagCode (key, index, indCode) {
      let len = this.list.addPackagList[key][index].packag_info.length
      if (indCode === len - 1) {
        this.list.addPackagList[key][index].packag_info.splice(indCode, 1)
      } else {
        this.$message({
          type: 'error',
          message: `请逐级删除！！！`
        })
      }
    },
    addPackagLv (key) {
      let len = this.list.addPackagList[key].length
      let str = (key + 1) + this.letterArr[len] + '1'
      this.list.addPackagList[key].push({
        type: '',
        size: '',
        attr: '',
        packag_info: [{
          packag_code: str,
          packag_number: '',
          product_info: [{
            name: '',
            number: ''
          }]
        }]
      })
    },
    deletePackagLv (key, index) {
      let len = this.list.addPackagList[key].length
      if (index === len - 1) {
        this.list.addPackagList[key].splice(index, 1)
      } else {
        this.$message({
          type: 'error',
          message: `请逐级删除！！！`
        })
      }
    },
    addLvInfo () {
      let len = this.list.addPackagList.length
      let str = (len + 1) + this.letterArr[0] + '1'
      this.list.addPackagList.push([{
        type: '',
        size: '',
        attr: '',
        packag_info: [{
          packag_code: str,
          packag_number: '',
          product_info: [{
            name: '',
            number: ''
          }]
        }]
      }])
      // console.log(this.list.addPackagList)
    },
    deleteLvInfo (key) {
      let len = this.list.addPackagList.length
      if (key === len - 1) {
        this.list.addPackagList.splice(key, 1)
      } else {
        this.$message({
          type: 'error',
          message: `请逐级删除！！！`
        })
      }
    },
    saveAll () {
      if (this.save) {
        this.save = false
        let arr = []
        let flag = true
        // console.log(this.list.addPackagList)
        // console.log(this.list.addPackagMaterialList)
        this.list.addPackagList.forEach(item => {
          item.forEach(value => {
            value.packag_info.forEach(valPack => {
              valPack.product_info.forEach(valPro => {
                console.log(valPro.name, valPro.flag)
                if (valPro.name && valPro.flag !== true) {
                  if (!value.type) {
                    this.$message({
                      type: 'error',
                      message: `请选择包装类型`
                    })
                    flag = false
                    return
                  }
                  if (!value.size) {
                    this.$message({
                      type: 'error',
                      message: `请输入包装规格`
                    })
                    flag = false
                    return
                  }
                  if (!valPack.packag_number) {
                    this.$message({
                      type: 'error',
                      message: `请输入包装数量`
                    })
                    flag = false
                    return
                  }
                  if (!valPro.number) {
                    this.$message({
                      type: 'error',
                      message: `请输入产品每包数量`
                    })
                    flag = false
                    return
                  }
                  console.log(flag)
                  if (flag) {
                    arr.push({
                      order_id: this.$route.params.id,
                      product_code: valPro.name.split(' ')[0],
                      company_id: window.sessionStorage.getItem('company_id'),
                      user_id: window.sessionStorage.getItem('user_id'),
                      pack_type: value.type.split(' ')[0],
                      pack_size: value.size,
                      pack_attribute: value.attr,
                      pack_code: valPack.packag_code,
                      number: valPro.number,
                      count: valPack.packag_number,
                      size: valPro.name.split(' ')[2].split('/')[0],
                      color: valPro.name.split(' ')[2].split('/')[1],
                      ingredients_info: ''
                    })
                  }
                }
              })
            })
          })
        })
        this.list.addPackagMaterialList.forEach(item => {
          if (item.packag_name) {
            item.packag_material.forEach(val => {
              if (!val.name) {
                this.$message({
                  type: 'error',
                  message: `请最少选择一种包装辅料`
                })
                flag = false
                return
              }
              if (!val.number) {
                this.$message({
                  type: 'error',
                  message: `请输入包装辅料每包数量`
                })
                flag = false
              }
            })
            // console.log(flag)
            if (flag) {
              arr.push({
                order_id: this.$route.params.id,
                product_code: '',
                company_id: window.sessionStorage.getItem('company_id'),
                user_id: window.sessionStorage.getItem('user_id'),
                pack_type: '',
                pack_size: '',
                pack_attribute: '',
                pack_code: '',
                number: null,
                count: null,
                size: '',
                color: '',
                ingredients_info: JSON.stringify(item)
              })
            }
          }
        })
        console.log(arr)
        if (flag && arr.length !== 0) {
          packagCreate({
            data: arr
          }).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: `添加成功`
            })
          })
        } else {
          this.$message({
            type: 'warning',
            message: `无可提交的数据`
          })
        }
        let self = this
        setTimeout(() => { self.save = true }, 1000)
      } else {
        this.$alert('请求速度过于频繁', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请于1s后重新请求`
            })
          }
        })
      }
    }
  },
  created () {
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }),
      packagDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      let packagInfo = res[1].data.data
      // console.log('orderInfo', orderInfo)
      console.log('packagInfo', packagInfo)
      // console.log(this.list.addPackagList)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化产品发货信息
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          value.size.forEach(val => {
            let type = value.productInfo.category_info.product_category + '/' + value.productInfo.type_name + '/' + value.productInfo.style_name + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
            let flag = this.productList.find(key => key.product_code === value.productCode)
            if (!flag) {
              this.productList.push({
                product_code: value.productCode,
                type: type,
                unit: '条',
                size_info: [{
                  size: val.name[0],
                  color: val.name[1],
                  plan_number: val.numbers
                }]
              })
            } else {
              let flag1 = flag.size_info.find(key => (key.size === val.name[0] && key.color === val.name[1]))
              if (!flag1) {
                flag.size_info.push({
                  size: val.name[0],
                  color: val.name[1],
                  plan_number: val.numbers
                })
              } else {
                flag1.plan_number = Number(flag1.plan_number) + Number(val.numbers)
              }
            }
            // 初始化产品下拉框数据
            let fleg = this.options.productArr.find(key => key === (value.productCode + ' ' + type + ' ' + val.name[0] + '/' + val.name[1]))
            if (!fleg) {
              this.options.productArr.push({
                value: value.productCode + ' ' + type + ' ' + val.name[0] + '/' + val.name[1],
                number: val.numbers
              })
            }
          })
        })
      })
      // 初始化装箱预计表
      let packagList = [] // 添加装箱辅料数据
      let materialList = [] // 其他装箱辅料数据
      packagInfo.forEach(item => {
        if (item.pack_code) {
          let num1 = item.pack_code.split('')[0] - 1
          let num2 = this.letterArr.indexOf(item.pack_code.split('')[1])
          let num3 = item.pack_code.split('')[2] - 1
          // console.log(num1, num2, num3)
          if (!packagList[num1]) {
            packagList[num1] = []
            packagList[num1].flag = true
          }
          if (!packagList[num1][num2]) {
            packagList[num1][num2] = {
              attr: item.pack_attribute,
              size: item.pack_size,
              type: item.pack_type,
              flag: true,
              packag_info: []
            }
          }
          if (!packagList[num1][num2].packag_info) {
            packagList[num1][num2].packag_info = []
          }
          if (!packagList[num1][num2].packag_info[num3]) {
            packagList[num1][num2].packag_info[num3] = {
              packag_code: item.pack_code,
              flag: true,
              packag_number: item.count,
              product_info: []
            }
          }
          packagList[num1][num2].packag_info[num3].product_info.push({
            name: item.product_info.product_code + ' ' + item.size + '/' + item.color,
            flag: true,
            number: item.number
          })
        } else if (item.ingredients_info) {

        }
      })
      // console.log(packagList)
      if (packagList.length !== 0) {
        this.list.addPackagList = packagList
        // console.log(this.list.addPackagList)
      }
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagInfoCreate.less";
</style>
