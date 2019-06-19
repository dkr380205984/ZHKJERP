<template>
  <div id="rawMaterialOrderDetail"
    style="overflow:auto"
    v-loading="loading">
    <div class="head">
      <h2>原料补充</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">生产单位信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号:</span>
            <span class="content important"
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{order.order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">补纱公司:</span>
            <span class="content">{{$route.params.companyName}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">原料补充</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">选择纱线:</span>
            <div class="casInput">
              <el-cascader class="cas"
                v-model="value"
                :options="options"></el-cascader>
              <el-input placeholder="请输入纱线重量">
                <template slot="append">kg</template>
              </el-input>
            </div>
            <div class="addBtn"><span>添加纱线</span><span>+</span></div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">承担单位:</span>
            <div class="casInput">
              <el-cascader class="cas"
                v-model="value"
                :options="options"></el-cascader>
              <el-input placeholder="价格承担比例">
                <template slot="append">%</template>
              </el-input>
            </div>
            <div class="addBtn"><span>添加单位</span><span>+</span></div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">补纱原因:</span>
            <div class="casInput">
              <el-input type="textarea"
                :rows="3"
                placeholder="请输入补纱原因（必填项）"
                v-model="textarea">
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.go(-1)">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { productionDetail, weaveDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      order: {
        order_code: '',
        client_name: '',
        remark: '',
        account_unit: '',
        contacts: '',
        exchange_rate: '',
        order_time: '',
        order_batch: [],
        product_stock: '',
        tax_rate: '',
        total_price: '',
        user_name: '',
        id: ''
      },
      materialColor: [],
      materialColorArr: [],
      value: [],
      textarea: '',
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }]
      }]
    }
  },
  mounted () {
    Promise.all([productionDetail({
      order_id: this.$route.params.id
    }), weaveDetail({
      order_id: this.$route.params.id
    })]).then((res) => {
      console.log(res)
      this.order = res[0].data.data.production_detail.order_info
      let productPlan = res[0].data.data.product_plan
      // 筛选出跟当前公司相关的日志信息
      let clientInfo = res[1].data.data.filter((item) => item.client_id === parseInt(this.$route.params.companyId))
      console.log(clientInfo)
      let colourInfo = []
      clientInfo.forEach((itemClient) => {
        let finded = colourInfo.find((itemFind) => itemFind.colour === itemClient.color && itemFind.size === itemClient.size && itemFind.product_code === itemClient.product_info.product_code)
        if (!finded) {
          colourInfo.push({
            'colour': itemClient.color,
            'size': itemClient.size,
            'product_code': itemClient.product_info.product_code
          })
        }
      })
      console.log(colourInfo)
      let colorInfo = []
      colourInfo.forEach((itemColour) => {
        if (productPlan[itemColour.product_code]) {
          productPlan[itemColour.product_code].forEach((itemColor) => {
            if (itemColor.color_match_name === itemColour.colour && itemColor.size === itemColour.size && itemColor.product_code === itemColour.product_code && itemColor.type === 0) {
              let finded = colorInfo.find((itemFind) => itemFind.color === itemColor.color_name && itemFind.material_name === itemColor.material_name)
              if (!finded) {
                colorInfo.push({
                  'color': itemColor.color_name,
                  'material_name': itemColor.material_name
                })
              }
            }
          })
        }
      })
      console.log(colorInfo)
      this.materialColorArr = this.jsonMerge(colorInfo, ['material_name'])
      console.log(this.materialColorArr)
    })
  },
  methods: {
    jsonMerge (jsonArr, keyArr) {
      let newJson = [] // 合并好的数据都放在这个数组里
      jsonArr.forEach((itemJson, indexJson) => {
        let mark = -1
        let finded = newJson.find((itemFind, indexFind) => {
          if (itemFind[keyArr[0]] === itemJson[keyArr[0]]) {
            mark = indexFind
            return itemFind[keyArr[0]] === itemJson[keyArr[0]]
          }
        })
        if (!finded) {
          let value = {}
          value[keyArr[0]] = itemJson[keyArr[0]]
          value['info'] = []
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          value['info'].push(info)
          newJson.push(value)
        } else {
          let info = {}
          for (let i in itemJson) {
            if (i !== keyArr[0]) {
              info[i] = itemJson[i]
            }
          }
          newJson[mark]['info'].push(info)
        }
      })
      // 递归的条件是不断的缩减keyArr的length，每次都去除第零个，直到为0
      if (keyArr.length === 1) {
        return newJson
      } else {
        return newJson.map((itemInfo) => {
          let newKeyArr = []
          keyArr.forEach((item, index) => {
            if (index > 0) {
              newKeyArr.push(item)
            }
          })
          return {
            [keyArr[0]]: itemInfo[keyArr[0]],
            'info': this.jsonMerge(itemInfo['info'], newKeyArr)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/rawMaterialOrderDetail.less";
</style>
<style lang="less" scoped>
.handle {
  position: static !important;
  overflow: hidden;
  transform: none !important;
  margin: 15px 0 5px 0;
  div {
    float: right;
  }
}
.logList {
  margin-left: auto;
  width: 4em;
  position: relative !important;
  transform: translateY(0) !important;
  display: block !important;
  opacity: 0.8;
}
.caozuo {
  color: #1a95ff;
  margin: 0 5px;
  cursor: pointer;
}
#rawMaterialOrderDetail {
  .casInput {
    margin-left: 15px;
    overflow: hidden;
    min-width: 415px;
    margin-bottom: 24px;
    .cas {
      width: 200px;
      line-height: 38px;
      color: #666666;
      float: left;
    }
    .el-input {
      float: right;
      width: 200px;
    }
  }
  .addBtn {
    padding: 0 18px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    margin-left: 15px;
    margin-bottom: 24px;
    cursor: pointer;
    color: #909399;
    border: 1px solid #e6e6e6;
    &:hover {
      color: #1a95ff;
      border-color: #1a95ff;
    }
    span {
      font-size: 16px;
      &:nth-child(2) {
        margin-left: 5px;
        font-size: 20px;
        vertical-align: -1px;
      }
    }
  }
}
</style>
