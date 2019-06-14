<template>
  <div id="packagInfoCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加包装辅料</h2>
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
                      <span class="tableRow">{{value.plan_number}}{{'条'}}</span>
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
                      placeholder="请输入包装规格"
                      v-model="value.size">
                    </el-input>
                  </div>
                  <div class="divInp">
                    <span>包装属性:</span>
                    <el-input size="small"
                      style="width:243px;"
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
                        placeholder="请输入预计包装数量"
                        v-model="valCode.packag_number">
                        <template slot="prepend">{{key+1}}{{letterArr[index]}}{{indCode+1}}</template>
                      </el-input>
                    </div>
                    <div class="divInp"
                      v-for="(valPro,indPro) in valCode.product_info"
                      :key="indPro"
                      style="margin-left:6em;font-size:14px;">
                      <el-select v-model="valPro.name"
                        :placeholder="'产品' + (indPro + 1)"
                        size="small"
                        style="width:110px;">
                        <el-option v-for="color in options.colorList"
                          :key="color.value"
                          :value="color">
                        </el-option>
                      </el-select>
                      <strong>——</strong>
                      <el-input size="small"
                        style="width:110px;"
                        placeholder="每包数量"
                        v-model="valPro.number">
                      </el-input>
                      <em v-if="indPro === 0"
                        class="el-icon-plus"
                        style="right:-35px;top:5px;"
                        @click="addProduct(key,index,indCode)"></em>
                      <em v-else
                        class="el-icon-delete"
                        style="right:-35px;top:5px;"
                        @click="deleteProduct(key,index,indCode,indPro)"></em>
                    </div>
                    <div class="addLv"
                      v-if="indCode === 0"
                      style="width:6em;margin-left:6em;font-size:14px;margin-top:20px;"
                      @click="addPackagCode(key,index)">添加{{key+1}}{{letterArr[index]}}</div>
                    <div class="addLv"
                      v-else
                      style="width:6em;margin-left:6em;font-size:14px;margin-top:20px;"
                      @click="deletePackagCode(key,index,indCode)">删除{{key+1}}{{letterArr[index]}}</div>
                  </div>
                  <em v-if="index !== 0"
                    class="el-icon-delete"
                    style="right:5px;top:30px;"
                    @click="deletePackagLv(key,index)"></em>
                </div>
                <!-- </template> -->
                <span class="tag">{{chinaNumber[key+1]}}级{{letterArr[index]}}</span>
              </li>
              <span class="el-icon-close"
                @click="deleteLvInfo(key)"></span>
            </ul>
          </div>
          <div class="addBtn"
            @click="addLvInfo">
            <span>+</span>
            <span>检验人员</span>
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
                  <span class="flex17">规格/属性</span>
                  <span class="flex5">
                    <span class="flex2">产品/包装</span>
                    <span>尺码颜色</span>
                    <span>产品数量</span>
                    <span>每包数量</span>
                  </span>
                  <span class="flex17">预计包装数量</span>
                </li>
                <li v-if="list.addPackagInfo.length === 0">暂无信息</li>
                <li class="content"
                  v-for="(item,key) in list.addPackagInfo"
                  :key="key">
                  <span class="tableRow">{{item.packag_code}}</span>
                  <span class="tableRow">{{item.packag_type}}</span>
                  <span class="tableRow flex17"
                    style="line-height:1.5em;">
                    <div style="padding:5px 0;">
                      <span>{{item.packag_size}}</span>
                      <span>{{item.packag_attr}}</span>
                    </div>
                  </span>
                  <span class="tableRow flex5 col">
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
                      <span class="tableRow">{{value.product_number ? value.product_number : 0}}</span>
                      <span class="tableRow">{{value.number}}</span>
                    </span>
                  </span>
                  <span class="tableRow flex17">{{item.packag_number}}{{item.unit}}</span>
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
import { orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      now_time: '',
      order_code: '',
      order_time: '',
      client_name: '',
      group_name: '',
      productList: [],
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
        ],
        addPackagInfo: []
      },
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
        ],
        testType: ['倒纱', '裁剪', '染色'],
        companyList: [],
        colorList: {}
      },
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
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  watch: {
    // list: {
    //   deep: true,
    //   handler: function () {
    //     this.list.forEach((item, key) => {
    //       let num = 0
    //       item.testInfo.forEach(value => {
    //         value.testSizeInfo.forEach(val => {
    //           num += Number(val.valu
    //         })
    //       })
    //       item.select_number = num
    //     })
    //   }
    // }
    'list.addPackagList': {
      deep: true,
      handler: function (newVal) {
        console.log(newVal)
        this.list.addPackagInfo = []
        newVal.forEach(item => {
          item.forEach(value => {
            value.packag_info.forEach(valCode => {
              valCode.product_info.forEach(valPro => {
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
                      product_code: valPro.name ? valPro.name.split(' ')[0] : '未选择',
                      type: valPro.name ? valPro.name.split(' ')[1] : '未选择',
                      size: valPro.name ? valPro.name.split(' ')[2].split('/')[0] : '',
                      color: valPro.name ? valPro.name.split(' ')[2].split('/')[1] : '',
                      number: valPro.number ? valPro.number : '0'
                    }]
                  })
                } else {
                  flag.product_info.push({
                    product_code: valPro.name ? valPro.name.split(' ')[0] : '未选择',
                    type: valPro.name ? valPro.name.split(' ')[1] : '未选择',
                    size: valPro.name ? valPro.name.split(' ')[2].split('/')[0] : '',
                    color: valPro.name ? valPro.name.split(' ')[2].split('/')[1] : '',
                    number: valPro.number ? valPro.number : '未输入'
                  })
                }
              })
            })
          })
        })
        console.log(this.list.addPackagInfo)
      }
    }
  },
  methods: {
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
      console.log(this.list.addPackagList)
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
      } else {
        let self = this
        this.$alert('请求速度过于频繁', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `请于1s后重新请求`
            })
          }
        })
        setTimeout(() => { self.save = true }, 1000)
      }
    }
  },
  created () {
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      // let weaveInfo = res[1].data.data
      console.log('orderInfo', orderInfo)
      // console.log('weaveInfo', weaveInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化产品发货信息
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          value.size.forEach(val => {
            let flag = this.productList.find(key => key.product_code === value.productCode)
            if (!flag) {
              let type = value.productInfo.category_info.product_category + '/' + value.productInfo.type_name + '/' + value.productInfo.style_name + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
              this.productList.push({
                product_code: value.productCode,
                type: type,
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
          })
        })
      })
      // 初始化装箱预计表
      this.list.addPackagList.forEach(item => {
        item.forEach(value => {
          value.packag_info.forEach(valCode => {
            valCode.product_info.forEach(valPro => {
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
                    product_code: valPro.name ? valPro.name.split(' ')[0] : '未选择',
                    type: valPro.name ? valPro.name.split(' ')[1] : '未选择',
                    size: valPro.name ? valPro.name.split(' ')[2].split('/')[0] : '',
                    color: valPro.name ? valPro.name.split(' ')[2].split('/')[1] : '',
                    number: valPro.number ? valPro.number : '0'
                  }]
                })
              } else {
                flag.product_info.push({
                  product_code: valPro.name ? valPro.name.split(' ')[0] : '未选择',
                  type: valPro.name ? valPro.name.split(' ')[1] : '未选择',
                  size: valPro.name ? valPro.name.split(' ')[2].split('/')[0] : '',
                  color: valPro.name ? valPro.name.split(' ')[2].split('/')[1] : '',
                  number: valPro.number ? valPro.number : '0'
                })
              }
            })
          })
        })
      })
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagInfoCreate.less";
</style>
