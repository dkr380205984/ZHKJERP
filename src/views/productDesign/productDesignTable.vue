<template>
  <div id="productDesignTable">
    <ul class="tableBox">
      <li class="title-info">
        <div class="title">
          <h2>桐庐凯瑞针纺有限公司生产计划单</h2>
        </div>
        <div class="info">
          <span>订单编号：<em class="bold12">ES6728392</em></span>
          <span>创建日期：2019-03-26</span>
        </div>
      </li>
      <li class="information">
        <span>产品类别</span>
        <span>围巾/针织/长巾/豹纹</span>
        <span>交货日期</span>
        <span>2019-04-27</span>
      </li>
      <li class="information">
        <span>订单公司</span>
        <span>飞泰</span>
        <span>损耗比例</span>
        <span>8%</span>
      </li>
      <li class="size-info">
        <div class="title">产品详情</div>
        <div class="content">
          <div v-for="(item,key) in sizeInfoList"
               :key="key">
            {{key+'码'}}
            <span v-for="(value,index) in item"
                  :key="index">{{value.name + ':' + value.value + value.unit}}</span>
          </div>
        </div>
      </li>
      <li class="size-tables">
        <div class="size-table"
             v-for="(item,key) in list"
             :key="key">
          <div class="title">
            <span class="bold12">{{item.sizeName}}码</span>
            <span class="center"
                  v-for="(value,index) in item.color"
                  :key="index">
              <span>{{value.name}}</span>
              <span>{{value.value}}条</span>
            </span>
          </div>
          <div class="content">
            <div v-for="(value,index) in item.materials"
                 :key="index">
              <span class='tit'>{{value.name}}</span>
              <span v-for="(c,n) in value.color"
                    :key="n">
                <span v-for="(x,y) in c"
                      :key="y">{{x.name + ' ' + x.value + x.unit}}</span>
              </span>
            </div>
          </div>
        </div>
      </li>
      <li class="beizhu">备注：</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sizeInfoList: {
        S: [
          {
            name: '长',
            value: 80,
            unit: 'cm'
          }, {
            name: '宽',
            value: 80,
            unit: 'cm'
          }, {
            name: '克重',
            value: 80,
            unit: 'g'
          }
        ],
        M: [
          {
            name: '长',
            value: 80,
            unit: 'cm'
          }, {
            name: '宽',
            value: 80,
            unit: 'cm'
          }, {
            name: '克重',
            value: 80,
            unit: 'g'
          }
        ],
        L: [
          {
            name: '长',
            value: 80,
            unit: 'cm'
          }, {
            name: '宽',
            value: 80,
            unit: 'cm'
          }, {
            name: '克重',
            value: 80,
            unit: 'g'
          }
        ]
      },
      list: [
        {
          sizeName: 'S',
          color: [
            {
              name: '深绿',
              value: '2010'
            }, {
              name: '黑白',
              value: '2010'
            }, {
              name: '宝蓝',
              value: '2010'
            }
          ],
          materials: [
            {
              name: '52支上光晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }, {
              name: '36支上光晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }, {
              name: '48支单股晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }
          ]
        }, {
          sizeName: 'M',
          color: [
            {
              name: '深绿',
              value: '2010'
            }, {
              name: '黑白',
              value: '2010'
            }, {
              name: '宝蓝',
              value: '2010'
            }
          ],
          materials: [
            {
              name: '52支上光晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }, {
              name: '36支上光晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }, {
              name: '48支单股晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ], [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }
          ]
        }, {
          sizeName: 'L',
          color: [
            {
              name: '深绿',
              value: '2010'
            }
          ],
          materials: [
            {
              name: '52支上光晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }, {
              name: '36支上光晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }, {
              name: '48支单股晴纶',
              color: [
                [
                  {
                    name: '深绿',
                    value: '40.2',
                    unit: 'kg'
                  }, {
                    name: '黑色',
                    value: '20',
                    unit: 'g'
                  }
                ]
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productDesignTable.less";
</style>
