<template>
  <div id="otherMaterialProcess"
       v-loading="loading">
    <div class="head">
      <h2>辅料加工</h2>
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
        <div class="stepTitle">辅料信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="inputCtn maxWidth noPadding"
               v-for="(item,key) in otherMaterialPlanList"
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
        <div class="stepTitle">辅料加工</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
          <div class="cicle"></div>
        </div>
        <div class="lineCtn col"
             v-for="(item,key) in list"
             :key="key">
          <div class="tablePlan">
            <div class="tableTitle">
              <span>辅料名称</span>
              <span>辅料颜色</span>
              <span>合计重量</span>
              <span>已选重量</span>
            </div>
            <div class="tableInfo">
              <span>{{item.material}}</span>
              <span>
                <template v-for="(value,index) in item.needColors">
                  {{(index === 0 ? '' : '/') + value}}
                </template>
              </span>
              <span>{{item.needNum}}个</span>
              <span>{{item.selectNum}}个</span>
            </div>
          </div>
          <div class="processInfo">
            <ul class="processFrom"
                v-for="(iten,kay) in item.processInfo"
                :key="kay">
              <li>
                <span>加工类型</span>:
                <el-select v-model="iten.processClass"
                           placeholder="请选择加工类型"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :label="value.label"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>加工单位</span>:
                <el-select v-model="iten.processCompany"
                           placeholder="请选择加工单位"
                           size="small">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :label="value.label"
                             :value="value.label">
                  </el-option>
                </el-select>
              </li>
              <li v-for="(value,index) in iten.processMaterialInfo"
                  :key="index"
                  class="col">
                <div>
                  <span>辅料信息</span>:
                  <el-select v-model="value.color"
                             placeholder="颜色"
                             size="small">
                    <el-option v-for="color in options"
                               :key="color.value"
                               :label="color.label"
                               :value="color.label">
                    </el-option>
                  </el-select>
                  <strong>—</strong>
                  <el-input size="small"
                            placeholder="数量"
                            v-model="value.value"
                            @change="jisuan(key)">
                  </el-input>
                </div>
                <em v-if="index === 0"
                    class="el-icon-plus"
                    @click="appendBuyMaterialInfo(key,kay)"></em>
                <em v-else
                    class="el-icon-delete"
                    @click="deleteBuyMaterialInfo(key,kay,index)"></em>
              </li>
              <li>
                <span>总价</span>:
                <el-input size="small"
                          placeholder="总价"
                          :disabled="true"
                          v-model="iten.money">
                </el-input>
                <i>元</i>
              </li>
              <li>
                <span>订购日期</span>:
                <el-date-picker v-model="iten.orderTime"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                size="small"
                                style="width:243px">
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
                    @click="deleteBuyInfo(key,kay)"></span>
            </ul>
          </div>
          <div class="addBtn"
               @click="addBuyInfo(key)">
            <span>添加公司</span>
            <span>+</span>
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
      otherMaterialPlanList: [
        {
          company: '杭州力欧纱线有限公司',
          processInfo: [
            {
              material: '扣子',
              colorInfo: [
                {
                  color: '深绿',
                  value: 400,
                  unit: '个'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: '个'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: '个'
                }
              ]
            },
            {
              material: '饰品',
              colorInfo: [
                {
                  color: '深绿',
                  value: 400,
                  unit: '个'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: '个'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: '个'
                }
              ]
            }
          ]
        },
        {
          company: '杭州飞泰纱线有限公司',
          processInfo: [
            {
              material: '扣子',
              colorInfo: [
                {
                  color: '卡其色',
                  value: 400,
                  unit: '个'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: '个'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: '个'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: '个'
                }
              ]
            },
            {
              material: '拉链',
              colorInfo: [
                {
                  color: '深绿',
                  value: 400,
                  unit: '个'
                },
                {
                  color: '白胚',
                  value: 300,
                  unit: '个'
                },
                {
                  color: '绿色',
                  value: 500,
                  unit: '个'
                }
              ]
            }
          ]
        }
      ],
      list: [
        {
          material: '',
          needColors: [],
          needNum: 0,
          selectNum: 0,
          processInfo: [
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
    jisuan (key) {
      this.list.forEach((item, key) => {
        item.selectNum = 0
        item.processInfo.forEach((value, index) => {
          value.money = 0
          value.processMaterialInfo.forEach((val, ind) => {
            item.selectNum += Number(val.value)
            value.money += (val.price * val.value)
          })
        })
      })
    },
    appendBuyMaterialInfo (key, kay) {
      this.list[key].processInfo[kay].processMaterialInfo.push({
        material: '',
        color: '',
        price: '',
        value: ''
      })
    },
    deleteBuyMaterialInfo (key, kay, index) {
      this.list[key].processInfo[kay].processMaterialInfo.splice(index, 1)
    },
    addBuyInfo (key) {
      this.list[key].processInfo.push(
        {
          company: '',
          money: '',
          orderTime: '',
          remark: '',
          processMaterialInfo: [
            {
              material: '',
              color: '',
              price: '',
              value: ''
            }
          ]
        }
      )
    },
    deleteBuyInfo (key, kay) {
      this.list[key].processInfo.splice(kay, 1)
    },
    saveAll () {
      this.$message(
        {
          message: '添加成功',
          type: 'success'
        }
      )
    }
  },
  created () {
    this.otherMaterialPlanList.forEach((value, index) => {
      value.processInfo.forEach((item, key) => {
        item.colorInfo.forEach((val, ind) => {
          if (ind === 0 && key === 0 && index === 0) {
            this.list[0].material = item.material
            this.list[0].needColors.push(val.color)
            this.list[0].needNum = Number(val.value)
          } else {
            let flag = true
            this.list.forEach((valu, inde) => {
              if (valu.material === item.material) {
                flag = false
                let kay = true
                valu.needColors.forEach((v, i) => {
                  if (v === val.color) {
                    kay = false
                    valu.needNum += Number(val.value)
                  } else if (v !== val.color && kay && i === valu.needColors.length - 1) {
                    valu.needColors.push(val.color)
                    valu.needNum += Number(val.value)
                  }
                })
              } else if (flag && inde === this.list.length - 1 && valu.material !== item.material) {
                let obj = {
                  material: '',
                  needColors: [],
                  needNum: 0,
                  selectNum: 0,
                  processInfo: [
                  ]
                }
                obj.material = item.material
                obj.needColors.push(val.color)
                obj.needNum = Number(val.value)
                this.list.push(obj)
              }
            })
          }
        })
      })
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/otherMaterialProcess.less";
</style>
