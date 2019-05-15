<template>
  <div id="rawMaterialOutStockDetail"
       v-loading="loading">
    <div class="head">
      <h2>原料出库详情</h2>
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
        <div class="stepTitle">生产单位</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn"
               style="width:100%;padding-left:40px;">
            <ul class="makeTable">
              <li>
                <span>生产单位</span>
                <span class="flex22">
                  <span class="flex17">产品信息</span>
                  <span class="flex06">尺码/颜色</span>
                  <span class="flex06">生产数量</span>
                </span>
                <span class="flex20">
                  <span class="flex12">所需原料</span>
                  <span class="flex06">原料颜色</span>
                  <span class="flex06">原料重量</span>
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
      <div class="stepCtn">
        <div class="stepTitle">生产计划信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn"
               style="width:100%;
               padding-left:40px;">
            <ul class="planTable">
              <li>
                <span>产品编号</span>
                <span>产品品类</span>
                <span class="flex06">产品克重</span>
                <span class="flex20">产品规格</span>
                <span>计划条数</span>
                <span class="flex06">价格</span>
                <span class="flex06">合计</span>
                <span>交货日期</span>
              </li>
              <li v-for="(item,key) in planList"
                  :key="key">
                <span>{{item.product_code}}</span>
                <span>{{item.product_class}}</span>
                <span class="flex06">{{item.product_weight}}</span>
                <span class="flex20">
                  <span v-for="(value,index) in item.product_size"
                        :key="index">
                    {{value.name + ': ' + value.value + value.unit}}
                  </span>
                </span>
                <span>{{item.plan_number + '条'}}</span>
                <span class="flex06">{{item.price + '元/条'}}</span>
                <span class="flex06">{{item.total + '元'}}</span>
                <span>{{item.compiled_time}}</span>
              </li>
            </ul>
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
        <div class="stepTitle">原料出库</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn"
               v-for="(item,key) in stockInfo"
               :key="key"
               style="width:100%;padding-left:40px;">
            <div class="title2">
              <span>{{item.material}}</span>
              <span>合计：{{item.total_number}}kg</span>
              <span>已出库：{{item.stock_number}}kg</span>
              <span>待出库：{{item.before_stock}}kg</span>
            </div>
            <ul class="tables">
              <li>
                <span class="flex2">时间</span>
                <span class="flex2">原料颜色</span>
                <span>缸号</span>
                <span>属性</span>
                <span>出库重量</span>
                <span class="flex2">出库仓库</span>
                <span class="flex2">备注</span>
                <span>操作人</span>
                <span class="flex2">操作</span>
              </li>
              <li v-for="(value,index) in item.stock_info"
                  :key="index">
                <span class="flex2">{{value.stock_time}}</span>
                <span class="flex2">{{value.color}}</span>
                <span>{{value.dyelot}}</span>
                <span>{{value.material_atr}}</span>
                <span>{{value.stock_value}}</span>
                <span class="flex2">{{value.stock_name}}</span>
                <span class="flex2">{{value.remark ? value.remark : '暂无备注'}}
                  <el-popover placement="bottom"
                              width="200"
                              trigger="click"
                              :content="value.remark"
                              class="pop"
                              v-if="chatCodeLength(value.remark) > 14">
                    <el-button slot="reference">展开</el-button>
                  </el-popover>
                </span>
                <span>{{value.change_name}}</span>
                <span class="flex2">
                  <span class="important">修改</span>
                  <span class="important">扣款</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">出库状态</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn"
               v-for="(item,key) in stockInfo"
               :key="key"
               style="padding-left:40px;">
            <span>{{item.material + '：'}}</span>
            <span :class="item.before_stock !== 0 ? 'warning' : 'success'">{{item.before_stock === 0 ? '已完成' : '未完成'}}</span>
            <span v-if="item.before_stock !== 0">待出库重量：&nbsp;&nbsp;&nbsp; {{item.before_stock + 'kg'}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料结余 </div>
        <div class="borderCtn">
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn"
               style="width:100%;
               padding-left:40px;">
            <ul class="planTable noBorderR">
              <li>
                <span>原料名称</span>
                <span>原料颜色</span>
                <span>原料结余</span>
                <span>操作</span>
              </li>
              <li v-for="(item,key) in surplusList"
                  :key="key">
                <span>{{item.material}}</span>
                <span>{{item.color}}</span>
                <span>{{item.weight + 'kg'}}</span>
                <span class="important">存入仓库</span>
              </li>
            </ul>
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
      stockInfo: [
        {
          material: '52支上光晴纶',
          total_number: 562.4,
          stock_number: 562.4,
          before_stock: 10,
          stock_info: [
            {
              stock_time: '2019-03-22-16:31',
              color: '深绿',
              dyelot: '1',
              material_atr: '常规纱',
              stock_value: 200,
              stock_name: '桐庐凯瑞针纺一号仓',
              remark: '',
              change_name: '隔壁老李'
            },
            {
              stock_time: '2019-03-22-16:31',
              color: '深绿',
              dyelot: '1',
              material_atr: '常规纱',
              stock_value: 200,
              stock_name: '桐庐凯瑞针纺一号仓',
              remark: '备注信息超多的啊啊啊啊啊啊',
              change_name: '隔壁老李'
            }
          ]
        },
        {
          material: '36支上光晴纶',
          total_number: 562.4,
          stock_number: 200,
          before_stock: 0,
          stock_info: [
            {
              stock_time: '2019-03-22-16:31',
              color: '深绿',
              dyelot: '1',
              material_atr: '常规纱',
              stock_value: 200,
              stock_name: '桐庐凯瑞针纺一号仓',
              remark: '',
              change_name: '隔壁老李'
            }
          ]
        }
      ],
      planList: [
        {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾',
          product_weight: '200g',
          product_size: [
            {
              name: '长',
              value: '60',
              unit: 'cm'
            }, {
              name: '宽',
              value: '50',
              unit: 'cm'
            }, {
              name: '须头',
              value: '24',
              unit: 'cm'
            }
          ],
          plan_number: 2010,
          price: 10,
          total: '',
          compiled_time: '2019-05-23'
        }, {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾',
          product_weight: '200g',
          product_size: [
            {
              name: '长',
              value: '60',
              unit: 'cm'
            }, {
              name: '宽',
              value: '50',
              unit: 'cm'
            }, {
              name: '须头',
              value: '24',
              unit: 'cm'
            }
          ],
          plan_number: '2010',
          price: '10',
          total: '',
          compiled_time: '2019-05-23'
        }, {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾',
          product_weight: '200g',
          product_size: [
            {
              name: '长',
              value: '60',
              unit: 'cm'
            }, {
              name: '宽',
              value: '50',
              unit: 'cm'
            }, {
              name: '须头',
              value: '24',
              unit: 'cm'
            }
          ],
          plan_number: '2010',
          price: '10',
          total: '',
          compiled_time: '2019-05-23'
        }, {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾',
          product_weight: '200g',
          product_size: [
            {
              name: '长',
              value: '60',
              unit: 'cm'
            }, {
              name: '宽',
              value: '50',
              unit: 'cm'
            }, {
              name: '须头',
              value: '24',
              unit: 'cm'
            }
          ],
          plan_number: '2010',
          price: '10',
          total: '',
          compiled_time: '2019-05-23'
        }, {
          product_code: 'ES5623134',
          product_class: '围巾/针织/长巾',
          product_weight: '200g',
          product_size: [
            {
              name: '长',
              value: '60',
              unit: 'cm'
            }, {
              name: '宽',
              value: '50',
              unit: 'cm'
            }, {
              name: '须头',
              value: '24',
              unit: 'cm'
            }
          ],
          plan_number: '2010',
          price: '10',
          total: '',
          compiled_time: '2019-05-23'
        }
      ],
      surplusList: [
        {
          material: '52支上光晴纶',
          color: '深绿',
          weight: '10'
        },
        {
          material: '36支上光晴纶',
          color: '绿色',
          weight: '10'
        }
      ]
    }
  },
  methods: {
    chatCodeLength (item) {
      let len = item.length
      let lengths = 0
      for (let i = 0; i < len; i++) {
        if (item.charCodeAt(i) > 255) {
          lengths += 2
        } else {
          lengths++
        }
      }
      return lengths
    },
    saveAll () {
    }
  },
  created () {
    // let kays = true
    this.planList.forEach((item, key) => {
      item.total = item.price * item.plan_number
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOutStockDetail.less";
</style>
