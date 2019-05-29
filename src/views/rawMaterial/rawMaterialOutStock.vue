<template>
  <div id="rawMaterialOutStock"
       v-loading="loading">
    <div class="head">
      <h2>原料出库</h2>
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
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>计划原料</span>
                  <span class="flex17">
                    <span>颜色</span>
                    <span>数量</span>
                  </span>
                  <span>已计划</span>
                  <span>已入库</span>
                  <span>已出库</span>
                </li>
                <li class="materialInfo"
                    v-for="(item,key) in materialInfo"
                    :key="key">
                  <span>{{item.material}}</span>
                  <span class="flex17 col">
                    <span v-for="(val,ind) in item.colorInfo"
                          :key="ind">
                      <span>{{val.color}}</span>
                      <span>{{val.value}}{{item.unit}}</span>
                    </span>
                  </span>
                  <span>{{item.plan_number}}{{item.unit}}</span>
                  <span>{{item.goStock_number}}{{item.unit}}</span>
                  <span>{{item.outStock_number}}{{item.unit}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">生产单位</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="makeTable">
                <li>
                  <span>生产单位</span>
                  <span class="flex22">
                    <span class="flex17">产品信息</span>
                    <span class="flex06">尺码/颜色</span>
                    <span class="flex06">数量</span>
                  </span>
                  <span class="flex20">
                    <span class="flex12">所需原料</span>
                    <span class="flex06">颜色</span>
                    <span class="flex06">数量</span>
                  </span>
                </li>
                <li v-for="(item,key) in companyList"
                    :key="key">
                  <span>
                    <span>{{item.company}}</span>
                  </span>
                  <span class="flex22">
                    <span class="flex17">
                      <span v-for="(value,index) in item.productList"
                            :key="index">
                        <span class="flex17">
                          <span>
                            <div>
                              <span>{{value.product_code}}</span>
                              <span style="margin-left:20px">{{value.product_class}}</span>
                            </div>
                          </span>
                        </span>
                        <span class="flex12">
                          <span v-for="(ite,ka) in value.makeInfo"
                                :key="ka">
                            <span class="flex06">{{ite.size + '/' + ite.color }}</span>
                            <span class="flex06">{{ite.make_number + '条'}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="flex20">
                    <span class="flex17">
                      <span v-for="(value,index) in item.materialList"
                            :key="index">
                        <span class="flex12">
                          <span>
                            <div>
                              <span>{{value.material}}</span>
                            </div>
                          </span>
                        </span>
                        <span class="flex12">
                          <span v-for="(ite,ka) in value.colors"
                                :key="ka">
                            <span class="flex06">{{ite.color }}</span>
                            <span class="flex06">{{ite.number + ite.unit}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料出库</div>
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
              <span>合计数量</span>
              <span>已出库数量</span>
              <span>待出库数量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material}}</span>
              <span>
                {{item.total_number + 'kg'}}
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
                           placeholder="请选择颜色"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li v-for="(value,index) in iten.stockWeightInfo"
                  :key="index"
                  class="col">
                <div>
                  <span>批号/缸号</span>:
                  <el-input size="small"
                            placeholder="请输入批号/缸号"
                            v-model="value.dyelot_number"
                            style="width:243px;">
                  </el-input>
                </div>
                <div>
                  <span>件数/数量</span>:
                  <el-input size="small"
                            placeholder="件数"
                            v-model="value.number"
                            @change="jisuan">
                    <template slot="append">件</template>
                  </el-input>
                  <el-input size="small"
                            placeholder="数量"
                            v-model="value.weight"
                            @change="jisuan">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
                <em v-if="index === 0"
                    class="el-icon-plus"
                    @click="appendStockWeightInfo(key,kay)"></em>
                <em v-else
                    class="el-icon-delete"
                    @click="deleteStockWeightInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>出库单位</span>:
                <el-select v-model="iten.outStock_client"
                           placeholder="请选择出库单位"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>出库时间</span>:
                <el-date-picker v-model="iten.stock_time"
                                align="right"
                                type="date"
                                placeholder="选择出库时间"
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
            <span>添加出库</span>
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
      type: '',
      now_time: '',
      total_weight: 0,
      defaultStock: '桐庐凯瑞针纺有限公司',
      loading: false,
      materialInfo: [
        {
          material: '52',
          unit: 'kg',
          plan_number: 100,
          goStock_number: 200,
          outStock_number: 300,
          colorInfo: [
            {
              color: '绿',
              value: 1220
            }, {
              color: '绿',
              value: 1220
            }, {
              color: '绿',
              value: 1220
            }
          ]
        }, {
          material: '52',
          unit: 'kg',
          plan_number: 100,
          goStock_number: 200,
          outStock_number: 300,
          colorInfo: [
            {
              color: '绿',
              value: 1220
            }, {
              color: '绿',
              value: 1220
            }, {
              color: '绿',
              value: 1220
            }
          ]
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
          stockInfo: [],
          weight: ''
        }
      ],
      companyList: [
        {
          company: '杭州凰顺针织有限公司',
          productList: [
            {
              product_code: 'ES5623134',
              product_class: '围巾/针织/长巾',
              makeInfo: [
                {
                  size: 'S码',
                  color: '深绿',
                  make_number: 2010
                }, {
                  size: 'M码',
                  color: '卡其色',
                  make_number: 1998
                }
              ]
            }, {
              product_code: 'ES5623134',
              product_class: '围巾/针织/长巾',
              makeInfo: [
                {
                  size: 'S码',
                  color: '深绿',
                  make_number: 2010
                }, {
                  size: 'M码',
                  color: '卡其色',
                  make_number: 1998
                }
              ]
            }
          ],
          materialList: [
            {
              material: '52支上光单股晴纶',
              colors: [
                {
                  color: '卡其色',
                  number: 200,
                  unit: 'kg'
                }, {
                  color: '白色',
                  number: 20,
                  unit: 'g'
                }
              ]
            }, {
              material: '36支上光双股晴纶',
              colors: [
                {
                  color: '卡其色',
                  number: 200,
                  unit: 'kg'
                }
              ]
            }, {
              material: '48支上光双股晴纶',
              colors: [
                {
                  color: '卡其色',
                  number: 200,
                  unit: 'kg'
                }
              ]
            }
          ]
        }, {
          company: '杭州凰顺针织有限公司',
          productList: [
            {
              product_code: 'ES5623134',
              product_class: '围巾/针织/长巾',
              makeInfo: [
                {
                  size: 'S码',
                  color: '深绿',
                  make_number: 2010
                }
              ]
            }, {
              product_code: 'ES5623134',
              product_class: '围巾/针织/长巾',
              makeInfo: [
                {
                  size: 'S码',
                  color: '深绿',
                  make_number: 2010
                }, {
                  size: 'M码',
                  color: '卡其色',
                  make_number: 1998
                }
              ]
            }
          ],
          materialList: [
            {
              material: '52支上光单股晴纶',
              colors: [
                {
                  color: '卡其色',
                  number: 200,
                  unit: 'kg'
                }, {
                  color: '白色',
                  number: 20,
                  unit: 'g'
                }
              ]
            }, {
              material: '36支上光双股晴纶',
              colors: [
                {
                  color: '卡其色',
                  number: 200,
                  unit: 'kg'
                }
              ]
            }, {
              material: '48支上光双股晴纶',
              colors: [
                {
                  color: '卡其色',
                  number: 200,
                  unit: 'kg'
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
        dyelot_number: '',
        number: '',
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
          remark: '',
          outStock_client: this.defaultStock,
          stock_time: this.now_time,
          stockWeightInfo: [
            {
              dyelot_number: '',
              number: '',
              weight: ''
            }
          ]
        }
      )
    },
    deleteStockInfo (key, kay) {
      this.list[key].stockInfo.splice(kay, 1)
    },
    saveAll () {
      console.log(this.list)
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
    this.type = this.$route.params.type
    let nowDate = new Date()
    this.now_time = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1)) + '-' + (nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate())
    console.log(this.now_time)
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
                stockInfo: [],
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
                    stockInfo: [],
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
    // this.planList.forEach((item, key) => {
    //   item.total = item.price * item.plan_number
    // })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOutStock.less";
</style>
