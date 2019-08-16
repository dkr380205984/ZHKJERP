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
            <div class="casInput"
              v-for="(item,index) in materialColor"
              :key="index">
              <el-cascader class="cas"
                v-model="materialColor[index]"
                placeholder="请选择原料信息"
                :options="materialColorArr"></el-cascader>
              <el-input placeholder="请输入纱线重量"
                v-model="weight[index]">
                <template slot="append">kg</template>
              </el-input>
              <i :style="{visibility:index===0?'hidden':'visible'}"
                @click="deleteShaxian(index)"
                class="el-icon-delete"></i>
            </div>
            <div class="addBtn"
              @click="materialColor.push([])"><span>添加纱线</span><span>+</span></div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">承担单位:</span>
            <div class="casInput"
              v-for="(item,index) in company"
              :key="index">
              <el-select class="cas"
                filterable
                v-model="company[index]"
                placeholder="请选择承担单位">
                <el-option v-for="item in companyArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item">
                </el-option>
              </el-select>
              <el-input placeholder="价格承担比例"
                v-model="rate[index]">
                <template slot="append">%</template>
              </el-input>
              <i class="el-icon-delete"
                @click="deleteDanwei(index)"
                :style="{visibility:index===0?'hidden':'visible'}"></i>
            </div>
            <div class="addBtn"
              @click="company.push('')"><span>添加单位</span><span>+</span></div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">补纱原因:</span>
            <div class="casInput">
              <el-input type="textarea"
                :rows="3"
                placeholder="请输入补纱原因（必填项）"
                v-model="des">
              </el-input>
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
import { productionDetail, weaveDetail, bearClient, replenishYarnSave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      lock: false,
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
      weight: [''],
      rate: [''],
      materialColor: [[]],
      materialColorArr: [],
      companyArr: [{ name: '本厂', id: 0 }],
      company: [''],
      des: ''
    }
  },
  mounted () {
    Promise.all([productionDetail({
      order_id: this.$route.params.id
    }), weaveDetail({
      order_id: this.$route.params.id
    }), bearClient({
      order_id: this.$route.params.id
    })]).then((res) => {
      console.log(res)
      this.order = res[0].data.data.production_detail.order_info
      let companyArr = res[2].data.data
      for (let i in companyArr) {
        this.companyArr.push({ name: companyArr[i], id: i })
      }
      let productPlan = res[0].data.data.product_plan
      // 筛选出跟当前公司相关的日志信息
      let clientInfo = res[1].data.data.filter((item) => item.client_id === parseInt(this.$route.params.companyId))
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
      this.materialColorArr = this.jsonMerge(colorInfo, ['material_name']).map((item) => {
        return {
          value: item.material_name,
          label: item.material_name,
          children: item.info.map((item2) => {
            return {
              value: item2.color,
              label: item2.color
            }
          })
        }
      })
      this.materialColorArr.forEach((item, index) => {
        this.materialColorArr[index].children.unshift({
          value: '白胚',
          label: '白胚'
        })
      })
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
    },
    // 删除纱线
    deleteShaxian (index) {
      this.materialColor.splice(index, 1)
      this.weight.splice(index, 1)
    },
    // 删除单位
    deleteDanwei (index) {
      this.company.splice(index, 1)
      this.rate.splice(index, 1)
    },
    saveAll () {
      if (!this.lock) {
        let state = true
        let msg = ''
        // 验证数据完整性
        if (!this.des) {
          state = false
          msg = '补纱原因必填！'
        }
        const total = this.rate.reduce((total, item) => {
          return total + parseInt(item)
        }, 0)
        if (total !== 100) {
          state = false
          msg = '承担比例相加不是100%，请重填'
        }
        this.rate.forEach((item) => {
          if (!item) {
            state = false
            msg = '承担比例信息不完整'
          }
        })
        this.company.forEach((item) => {
          if (!item) {
            state = false
            msg = '单位信息不完整'
          }
        })
        this.weight.forEach((item) => {
          if (!item) {
            state = false
            msg = '纱线重量信息不完整'
          }
        })
        this.materialColor.forEach((item) => {
          if (item.length === 0) {
            state = false
            msg = '原料信息不完整'
          }
        })
        if (state) {
          let json = {
            type: 1,
            id: null,
            order_id: this.$route.params.id,
            user_id: window.sessionStorage.getItem('user_id'),
            yarn_info: this.materialColor.map((item, index) => {
              return {
                weight: this.weight[index],
                name: item[0],
                color: item[1]
              }
            }),
            client_info: this.company.map((item, index) => {
              return {
                percent: this.rate[index],
                client_name: item.name,
                client_id: item.id
              }
            }),
            desc: this.des,
            replenish_client: this.$route.params.companyId,
            company_id: window.sessionStorage.getItem('company_id')
          }
          this.lock = true
          this.loading = true
          replenishYarnSave(json).then((res) => {
            if (res.data.status) {
              this.$message.success({
                message: '保存成功'
              })
              this.$router.go(-1)
            } else {
              this.$message.error({
                message: res.data.message
              })
            }
            this.lock = false
            this.loading = false
          })
        } else {
          this.$message.error({
            message: msg
          })
        }
      } else {
        this.$message.error({
          message: '请勿频繁操作'
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
    min-width: 465px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    .cas {
      width: 200px;
      line-height: 38px;
      color: #666666;
    }
    .el-input {
      width: 200px;
    }
    .el-icon-delete {
      line-height: 40px;
      width: 38px;
      text-align: left;
      color: #909399;
      cursor: pointer;
      &:hover {
        color: #1a95ff;
      }
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
