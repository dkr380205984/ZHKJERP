<template>
  <div id="rawMaterialStock"
       v-loading="loading">
    <div class="head">
      <h2>原料订购</h2>
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
            <span class="content important">KR-0001</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <span class="content">杭州飞泰服饰有限公司</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">2019-04-10</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">A组</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn maxWidth noPadding"
               v-for="(item,key) in rawMaterialPlanList"
               :key="key">
            <span class="title">{{item.company + ':'}}</span>
            <span class="processContent">
              <span v-for="(value,index) in item.processInfo"
                    :key="index">
                <span class="material">{{value.material}}</span>
                <span class="colorInfo">
                  <span v-for="(iten,kay) in value.colorInfo"
                        :key="kay">
                    <span class="tit">{{iten.color}}</span>
                    {{iten.value + iten.unit}}
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">加工信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="table">
            <div class="tableTitle">
              <span>
                <span>加工类型</span>
              </span>
              <span class="flex45">
                <span class="flex17">加工单位</span>
                <span>原料名称</span>
                <span class="flex12">颜色-数量</span>
              </span>
            </div>
            <div class="tableInfo"
                 v-for="(item,key) in processInfo"
                 :key="key">
              <span>
                <span>{{item.process}}</span>
              </span>
              <span class="flex45">
                <span v-for="(value,index) in item.processInfo"
                      :key="index">
                  <!-- 第二层 -->
                  <span class="flex17">
                    <span>{{value.company}}</span>
                  </span>
                  <span class="flex22">
                    <span v-for="(val,ind) in value.materials"
                          :key="ind">
                      <span>
                        <span>{{val.material}}</span>
                      </span>
                      <span class="flex12">
                        <span v-for="(ite,ka) in val.colors"
                              :key="ka">
                          {{ite.color + '--' + ite.value + ite.unit}}
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料入库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col"
             v-for="(item,key) in list"
             :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>原料名称</span>
              <span>合计重量</span>
              <span>已入库重量</span>
              <span>待入库重量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material}}</span>
              <span>
                {{item.total_number + 'kg'}}
                <!-- <template v-for="(value,index) in item.needColors">
                  {{(index === 0 ? '' : '/') + value}}
                </template> -->
              </span>
              <span>{{item.stock_number + 'kg'}}</span>
              <span>{{item.before_stock + 'kg'}}</span>
            </div>
          </div>
          <div class="buyInfo">
            <ul class="buyFrom"
                v-for="(iten,kay) in item.stockInfo"
                :key="kay">
              <li>
                <span>原料颜色</span>:
                <el-select v-model="iten.materialColor"
                           placeholder="请选择订购来源"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :label="value.label"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>缸号</span>:
                <el-input size="small"
                          placeholder="请输入缸号"
                          v-model="iten.dyelot"
                          style="width:243px;">
                </el-input>
                <!-- <i>元</i> -->
              </li>
              <li>
                <span>原料属性</span>:
                <el-select v-model="iten.materialAtr"
                           placeholder="请选择原料属性"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :label="value.label"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li v-for="(value,index) in iten.stockWeightInfo"
                  :key="index"
                  class="col">
                <div>
                  <span>第{{index+1}}包</span>:
                  <el-input size="small"
                            placeholder="请输入重量"
                            v-model="value.weight"
                            @change="jisuan">
                  </el-input>
                  <i>kg</i>
                </div>
                <em v-if="index === 0"
                    class="el-icon-plus"
                    @click="appendStockWeightInfo(key,kay)"></em>
                <em v-else
                    class="el-icon-delete"
                    @click="deleteStockWeightInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>总重量</span>:
                <el-input size="small"
                          placeholder="0"
                          :disabled="true"
                          v-model="iten.total_weight">
                </el-input>
                <i>kg</i>
              </li>
              <li>
                <span>入库仓库</span>:
                <el-input size="small"
                          placeholder="选择仓库"
                          v-model="iten.stock"
                          style="width:243px;">
                </el-input>
              </li>
              <li>
                <span>入库时间</span>:
                <el-date-picker v-model="iten.stock_time"
                                align="right"
                                type="date"
                                placeholder="选择入库时间"
                                size="small"
                                style="width:243px"
                                :picker-options="pickerOptions">
                </el-date-picker>
              </li>
              <li>
                <span>备注</span>:
                <el-input type="textarea"
                          placeholder="请输入内容"
                          style="width:243px;margin: 0 0 0 15px;height:45px;"
                          v-model="iten.remark">
                </el-input>
              </li>
              <span class="el-icon-close"
                    @click="deleteStockInfo(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
               @click="addStockInfo(key)">
            <span>+</span>
            <span>添加公司</span>
          </div>
        </div>
      </div>
      <div class="stepCtn"
           style="padding-top:0;">
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn"
             style="margin:0;">
          <div class="inputCtn noPadding">
            <span class="content"
                  style="margin-left:40px;display:justify-content:center;">
              <span style="width:8em">剩余入库量:</span>
              <el-input size="small"
                        placeholder="0"
                        :disabled="true"
                        v-model="total_weight"
                        style="width:238px;margin-left:15px;">
                <template slot="append">kg</template>
              </el-input>
            </span>
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
export default {
  data () {
    return {
      total_weight: 0,
      defaultStock: '桐庐凯瑞针纺有限公司',
      loading: false,
      productList: [
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾/豹纹',
          size: 'S',
          color: '深绿',
          number: 2000
        },
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾/豹纹',
          size: 'S',
          color: '深绿',
          number: 2000
        },
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾/豹纹',
          size: 'S',
          color: '深绿',
          number: 2000
        }
      ],
      rawMaterialPlanList: [
        {
          company: '杭州力欧纱线有限公司',
          processInfo: [
            {
              material: '52支上光晴纶',
              colorInfo: [
                {
                  color: '深绿',
                  value: 400,
                  unit: 'kg'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: 'kg'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: 'kg'
                }
              ]
            },
            {
              material: '36支上光涤纶',
              colorInfo: [
                {
                  color: '深绿',
                  value: 400,
                  unit: 'kg'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: 'kg'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: 'kg'
                }
              ]
            }
          ]
        },
        {
          company: '杭州飞泰纱线有限公司',
          processInfo: [
            {
              material: '52支上光晴纶',
              colorInfo: [
                {
                  color: '卡其色',
                  value: 400.23,
                  unit: 'kg'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: 'kg'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: 'kg'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: 'kg'
                }
              ]
            },
            {
              material: '48支上光涤纶',
              colorInfo: [
                {
                  color: '深绿',
                  value: 400,
                  unit: 'kg'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: 'kg'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: 'kg'
                }
              ]
            }
          ]
        }
      ],
      processInfo: [
        {
          process: '染色',
          processInfo: [
            {
              company: '杭州飞泰服饰有限公司',
              materials: [
                {
                  material: '52支上光晴纶',
                  colors: [
                    {
                      color: '卡其色',
                      value: 400,
                      unit: 'kg'
                    },
                    {
                      color: '白色',
                      value: 300,
                      unit: 'kg'
                    }
                  ]
                },
                {
                  material: '48支上光晴纶',
                  colors: [
                    {
                      color: '卡其色',
                      value: 400,
                      unit: 'kg'
                    }
                  ]
                }
              ]
            },
            {
              company: '杭州飞泰服饰有限公司',
              materials: [
                {
                  material: '52支上光晴纶',
                  colors: [
                    {
                      color: '卡其色',
                      value: 400,
                      unit: 'kg'
                    },
                    {
                      color: '蓝色',
                      value: 300,
                      unit: 'kg'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          process: '裁剪',
          processInfo: [
            {
              company: '杭州飞泰服饰有限公司',
              materials: [
                {
                  material: '52支上光晴纶',
                  colors: [
                    {
                      color: '卡其色',
                      value: 400,
                      unit: 'kg'
                    },
                    {
                      color: '蓝色',
                      value: 300,
                      unit: 'kg'
                    }
                  ]
                },
                {
                  material: '48支上光晴纶',
                  colors: [
                    {
                      color: '卡其色',
                      value: 400,
                      unit: 'kg'
                    }
                  ]
                }
              ]
            },
            {
              company: '杭州力欧服饰有限公司',
              materials: [
                {
                  material: '52支上光晴纶',
                  colors: [
                    {
                      color: '卡其色',
                      value: 400,
                      unit: 'kg'
                    },
                    {
                      color: '蓝色',
                      value: 300,
                      unit: 'kg'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      list: [
        {
          material: '',
          colors: [],
          total_number: 0,
          stock_number: 0,
          before_stock: 0,
          stockInfo: [
            {
              materialColor: '',
              dyelot: '',
              materialAtr: '',
              total_weight: 0,
              remark: '',
              stock: '桐庐凯瑞针纺有限公司',
              stock_time: new Date(),
              stockWeightInfo: [
                {
                  weight: ''
                }
              ]
            }
          ]
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    jisuan () {
      this.list.forEach((item, key) => {
        item.selectNum = 0
        item.stockInfo.forEach((value, index) => {
          value.total_weight = 0
          value.stockWeightInfo.forEach((val, ind) => {
            item.selectNum += Number(val.value)
            value.total_weight += Number(val.weight)
          })
        })
      })
    },
    appendStockWeightInfo (key, kay) {
      this.list[key].stockInfo[kay].stockWeightInfo.push({
        weight: ''
      })
    },
    deleteStockWeightInfo (key, kay, index) {
      this.list[key].stockInfo[kay].stockWeightInfo.splice(index, 1)
      this.jisuan()
    },
    addStockInfo (key) {
      this.list[key].stockInfo.push(
        {
          materialColor: '',
          dyelot: '',
          materialAtr: '',
          total_weight: 0,
          remark: '',
          stock: this.defaultStock,
          stock_time: new Date(),
          stockWeightInfo: [
            {
              weight: ''
            }
          ]
        }
      )
      console.log(this.list)
    },
    deleteStockInfo (key, kay) {
      this.list[key].stockInfo.splice(kay, 1)
    },
    saveAll () {
      this.list.forEach(item => {
        item.stockInfo.forEach(value => {
          let flag = value.materialColor && value.dyelot && value.materialAtr && value.total_weight && value.stock && value.stock_time
          if (flag) {
            this.$message(
              {
                message: '添加成功',
                type: 'success'
              }
            )
          } else {
            this.$message(
              {
                message: '添加失败，有必填项未填',
                type: 'error'
              }
            )
          }
        })
      })
    }
  },
  created () {
    let kays = true
    this.processInfo.forEach((item, key) => {
      item.processInfo.forEach((value, index) => {
        value.materials.forEach((val, ind) => {
          val.colors.forEach((cont, num) => {
            if (kays) {
              kays = false
              this.list = []
              this.list.push({
                material: val.material,
                total_number: cont.value,
                stock_number: 0,
                before_stock: 0,
                stockInfo: [
                  {
                    materialColor: '',
                    dyelot: '',
                    materialAtr: '',
                    total_weight: 0,
                    remark: '',
                    stock: this.defaultStock,
                    stock_time: new Date(),
                    stockWeightInfo: [
                      {
                        weight: ''
                      }
                    ]
                  }
                ],
                colors: [
                  {
                    color: cont.color,
                    value: cont.value,
                    unit: cont.unit
                  }
                ]
              })
            } else {
              let flag = true
              this.list.forEach((ite, ka) => {
                if (ite.material === val.material) {
                  ite.total_number += cont.value
                  let fleg = true
                  ite.colors.forEach((c, l) => {
                    if (c.color === cont.color) {
                      fleg = false
                      c.value += cont.value
                    } else if (c.color !== cont.color && fleg && l === ite.colors.length - 1) {
                      ite.colors.push({
                        color: cont.color,
                        value: cont.value,
                        unit: cont.unit
                      })
                    }
                  })
                  flag = false
                } else if (flag && ite.material !== val.material && ka === this.list.length - 1) {
                  this.list.push({
                    material: val.material,
                    total_number: cont.value,
                    stock_number: 0,
                    before_stock: 0,
                    stockInfo: [
                      {
                        materialColor: '',
                        dyelot: '',
                        materialAtr: '',
                        total_weight: 0,
                        remark: '',
                        stock: this.defaultStock,
                        stock_time: new Date(),
                        stockWeightInfo: [
                          {
                            weight: ''
                          }
                        ]
                      }
                    ],
                    colors: [{
                      color: cont.color,
                      value: cont.value,
                      unit: cont.unit
                    }]
                  })
                }
              })
            }
          })
        })
      })
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialStock.less";
</style>
