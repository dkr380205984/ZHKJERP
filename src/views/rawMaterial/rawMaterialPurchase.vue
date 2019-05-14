<template>
  <div id="rawMaterialPurchase">
    <div class="head">
      <h2>原料预订购</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">订购单位:</span>
          <span class="content">
            <el-select v-model="company"
                       placeholder="请选择订购单位">
              <el-option v-for="item in companyList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料信息:</span>
          <span class="content">
            <div class="material"
                 v-for="(item,key) in material_info"
                 :key="key">
              <h4>第{{change(key+1)}}种原料</h4>
              <div class="inputBox">
                <el-select v-model="item.material_name"
                           placeholder="请选择原料">
                  <el-option v-for="value in materialList.material"
                             :key="value.value"
                             :value="value.name">
                  </el-option>
                </el-select>
                <el-select v-model="item.color_code"
                           placeholder="请选择颜色">
                  <el-option v-for="value in colorList"
                             :key="value.id"
                             :value="value.name">
                  </el-option>
                </el-select>
                <el-select v-model="item.attribute"
                           placeholder="请选择属性">
                  <el-option v-for="value in materialList.attr"
                             :key="value.value"
                             :value="value.name">
                  </el-option>
                </el-select>
                <el-input placeholder="请输入预定价格"
                          v-model="item.price">
                  <span class="small"
                        slot="append">元/千克</span>
                </el-input>
              </div>
              <span class="delet el-icon-close"
                    @click="delet(key)"></span>
            </div>
          </span>
        </div>
        <div class="inputCtn">
          <div class="addBtn"
               @click="addMaterial">
            <span>添加原料</span>
            <span>+</span>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料总重:</span>
          <span class="content">
            <el-input placeholder="请输入所有原料总重量"
                      v-model="total_weight">
              <span slot="append">千克</span>
            </el-input>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">总价:</span>
          <span class="content">
            <el-input placeholder="请输入所有原料总价"
                      v-model="total_price">
              <span slot="append">元</span>
            </el-input>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订购日期:</span>
          <span class="content">
            <el-date-picker v-model="order_time"
                            type="date"
                            placeholder="请选择订购日期">
            </el-date-picker>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">备注:</span>
          <span class="content">
            <el-input type="textarea"
                      :rows="4"
                      v-model="remark">
            </el-input>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="clean"
                  @click="clean">清空</span>
            <span class="save"
                  @click="save">保存</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rawMaterialPurchase, colorList, clientList, YarnList } from '@/assets/js/api.js'
// import { promised } from 'q'
export default {
  data () {
    return {
      colorList: [], // 颜色列表
      companyList: [], // 公司列表
      materialList: {
        material: [{ name: '36支上光晴纶' }, { name: '48支单股涤纶' }],
        attr: [{ name: '针织' }, { name: '毛绒' }]
      },
      company: '',
      remark: '',
      total_weight: '',
      total_price: '',
      order_time: '',
      material_info: [
        {
          material_name: '',
          color_code: '',
          attribute: '',
          price: ''
        }
      ]
    }
  },
  methods: {
    addMaterial () {
      this.material_info.push({
        material_name: '',
        color_code: '',
        attribute: '',
        price: ''
      })
      console.log(this.material_info)
    },
    change (number) {
      if (number === 1) {
        return '一'
      } else if (number === 2) {
        return '二'
      } else if (number === 3) {
        return '三'
      } else if (number === 4) {
        return '四'
      } else if (number === 5) {
        return '五'
      } else if (number === 6) {
        return '六'
      } else if (number === 7) {
        return '七'
      } else if (number === 8) {
        return '八'
      } else if (number === 9) {
        return '九'
      }
    },
    delet (key) {
      this.material_info.splice(key, 1)
      // console.log(this.material)
    },
    clean () {
      this.company = ''
      this.remark = ''
      this.total_weight = ''
      this.total_price = ''
      this.order_time = ''
      this.material_info = [
        {
          material_name: '',
          color_code: '',
          attribute: '',
          price: ''
        }
      ]
    },
    save () {
      if (this.company && this.total_weight && this.total_price && this.order_time) {
        let flag = true
        this.material_info.forEach(item => {
          item.price = Number(item.price)
          if (!item.material_name && !item.color_code && !item.attribute && !item.price) {
            flag = false
            this.$message({
              showClose: true,
              message: '请检查信息是否填写完整',
              type: 'error'
            })
          }
        })
        if (flag) {
          console.log({
            company_id: sessionStorage.company_id,
            client_id: this.company,
            material_info: [...this.material_info],
            total_weight: Number(this.weight),
            total_price: Number(this.total_price),
            order_time: this.order_time,
            desc: this.remark
          })
          rawMaterialPurchase({
            company_id: sessionStorage.company_id,
            client_id: this.company,
            material_info: [...this.material_info],
            total_weight: Number(this.weight),
            total_price: Number(this.total_price),
            order_time: this.order_time,
            desc: this.remark
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                showClose: true,
                message: '提交成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: res.data.code + '出问题了哦',
                type: 'error'
              })
            }
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: '请检查信息是否填写完整',
          type: 'error'
        })
      }
    }
  },
  created () {
    Promise.all([
      colorList({
        company_id: sessionStorage.company_id
      }),
      clientList({
        company_id: sessionStorage.company_id
      }),
      YarnList({
        keyword: ''
      })
    ]).then(res => {
      console.log(res)
      this.colorList = res[0].data.data
      this.companyList = res[1].data.data
      this.materialList.material = res[2].data.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialPurchase.less";
</style>
