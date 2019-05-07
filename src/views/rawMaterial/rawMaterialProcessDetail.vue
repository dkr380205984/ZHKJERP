<template>
  <div id="rawMaterialProcessDetail"
       v-loading="loading">
    <div class="head">
      <h2>原料加工详情</h2>
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
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品信息:</span>
            <span class="content">
              <ul class="productInfo">
                <li v-for="(item,key) in productList"
                    :key="key">
                  <span>{{item.product_code}}({{item.product_class}})</span>
                  <span>{{item.size+'/'+item.color}}</span>
                  <span>{{item.number+'条'}}</span>
                </li>
              </ul>
            </span>
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
          <div class="inputCtn maxWidth"
               v-for="(item,key) in rawMaterialPlanList"
               :key="key">
            <div class="label smallFont">{{item.material}}</div>
            <div class="content marginBig">
              <span v-for="(value,index) in item.need"
                    :key="index">
                <span class="title">{{value.name}}:</span>
                <span class="content">{{value.value + value.unit}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">加工信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn noPadding"
               v-for="(item,key) in list"
               :key="key">
            <!-- <div class="title">
              <span>{{item.material}}</span>
              <span>合计：{{item.total_number}}kg</span>
            </div> -->
            <div class="content">
              <ul class="table">
                <li>
                  <span>订购公司</span>
                  <span class="flex7">颜色-单价-数量</span>
                  <span>总价</span>
                  <span>下单日期</span>
                  <span class="flex2">交货日期</span>
                  <span>备注</span>
                </li>
                <li v-for="(value,index) in item.info"
                    :key="index">
                  <span>{{value.company}}</span>
                  <span class="flex7">
                    <span v-for="(content,number) in value.info"
                          :key="number">
                      {{content.color}} {{content.price}}元/kg {{content.value}}kg
                    </span>
                  </span>
                  <span>{{value.total_price}}</span>
                  <span>{{value.create_time}}</span>
                  <span class="flex2">{{value.out_time}}</span>
                  <span>{{value.remark}}</span>
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
             @click="change">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [
        {
          material: '52支上光晴纶',
          total_number: '562.4',
          info: [
            { company: '杭州飞泰服饰有限公司',
              info: [
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                },
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                },
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                }
              ],
              total_price: 6400,
              create_time: '2019-04-23',
              out_time: '2019-04-23',
              remark: '备注信息'
            }, { company: '杭州飞泰服饰有限公司',
              info: [
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                }
              ],
              total_price: 6400,
              create_time: '2019-04-23',
              out_time: '2019-04-23',
              remark: '备注信息'
            }, { company: '杭州飞泰服饰有限公司',
              info: [
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                },
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                },
                {
                  color: '深绿',
                  price: '5',
                  value: 400
                }
              ],
              total_price: 6400,
              create_time: '2019-04-23',
              out_time: '2019-04-23',
              remark: '备注信息'
            }
          ]

        }
      ],
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
          material: '52支上光晴纶',
          need: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4444,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '卡其色',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }
          ]
        },
        {
          material: '36支上光晴纶',
          need: [
            {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
            }, {
              name: '深绿',
              value: 281.4,
              unit: 'kg'
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
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
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
    change () {
      this.$message(
        {
          message: '修改成功',
          type: 'success'
        }
      )
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialProcessDetail.less";
</style>
