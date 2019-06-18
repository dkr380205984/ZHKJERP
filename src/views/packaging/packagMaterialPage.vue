<template>
  <div id="packagInfoCreate"
    v-loading="loading">
    <div class="head">
      <h2>包装辅料订购</h2>
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
      <!-- <div class="stepCtn">
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
                      <span class="tableRow">{{value.plan_number ? value.plan_number : 0}}{{value.unit}}</span>
                      <span class="tableRow">{{value.number}}{{(value.unit ? value.unit : '条')+'/'+(item.unit ? item.unit : '包')}}</span>
                    </span>
                  </span>
                  <span class="tableRow flex17">{{item.packag_number}}{{item.unit}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="stepCtn">
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
              style="height:230px;">
              <li>
                <span>产品/包装:</span>
                <el-select v-model="item.packag_name"
                  placeholder="请选择产品/包装"
                  size="small"
                  style="width:243px;">
                  <el-option v-for="type in arrGeter()"
                    :key="type.id"
                    :value="type">
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
      </div> -->
      <!-- <div class="stepCtn">
        <div class="stepTitle">其他辅料统计表</div>
        <div class="borderCtn">
          <div class="cicle"></div>
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
      </div> -->
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
      list: {
        packagList: [
          {
            code: '1A1',
            type: '袋子',
            size: '60*40*80cm',
            attr: '印字',
            unit: '袋',
            packag_number: '2000',
            product_info: [{
              code: 'ES5623134',
              type: '围巾/针织/长巾',
              size: '均码',
              color: '黄色',
              number: '4000',
              one_number: '2',
              unit: '条'
            }, {
              code: 'ES5623144',
              type: '围巾/针织/长巾',
              size: '均码',
              color: '黑色',
              number: '2000',
              one_number: '1',
              unit: '条'
            }]
          }
        ]
      },
      options: {
        productArr: []
      }
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  watch: {
  },
  methods: {
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
                arr.unshift(valCode.packag_code + ' ' + value.type.split(' ')[0])
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
      // console.log('orderInfo', orderInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化装箱预计表
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/packagInfoCreate.less";
</style>
