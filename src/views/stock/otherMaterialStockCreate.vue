<template>
  <div id="mainMaterialStockCreate">
    <div class="head">
      <h2>添加辅料库存</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">辅料名称:</span>
          <el-select class="elInput"
            v-model="material_name"
            filterable
            @change="getUnit"
            placeholder="请选择辅料名称">
            <el-option v-for="item in yarnList"
              :key="item.id"
              :value="item.name"
              :label="item.name"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">辅料属性:</span>
          <el-input class="elInput"
            v-model="color_code"
            placeholder="请输入辅料属性">
          </el-input>
        </div>
      </div>
      <!-- <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">辅料属性:</span>
          <el-input class="elInput"
            v-model="attribute"
            placeholder="请输入辅料属性">
          </el-input>
        </div>
      </div> -->
      <!-- <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">缸号/批号:</span>
          <el-input class="elInput"
            v-model="vat_code"
            placeholder="请输入辅料缸号" />
        </div>
      </div> -->
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">入库数量:</span>
          <el-input class="elInput"
            placeholder="请输入辅料数量"
            v-model="weight">
            <template slot="append">{{unit}}</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label must">存放仓库:</span>
          <el-select class="elInput"
            v-model="stock_id"
            filterable
            placeholder="请选择存放仓库">
            <el-option v-for="item in companyList"
              :key="item.id"
              :value="item.id"
              :label="item.name"></el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">备注:</span>
          <el-input type="textarea"
            :rows="6"
            class="elInput"
            placeholder="请输入其他信息" />
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
import { stockMaterialAdd, materialList, clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      yarnList: [],
      colorList: [],
      companyList: [],
      material_name: '',
      color_code: '',
      vat_code: '',
      stock_id: 0,
      company_id: '',
      attribute: '',
      weight: '',
      unit: ''
    }
  },
  methods: {
    getUnit () {
      this.unit = this.yarnList.find((item) => item.name === this.material_name).unit
    },
    saveAll () {
      if (!this.material_name) {
        this.$message.error('请选择辅料')
        return
      }
      if (!this.color_code) {
        this.$message.error('请输入辅料属性')
        return
      }
      if (!this.weight) {
        this.$message.error('请输入辅料重量')
        return
      }
      stockMaterialAdd({
        material_name: this.material_name,
        color_code: this.color_code,
        vat_code: this.vat_code ? this.vat_code : 'vat-null',
        stock_id: this.stock_id,
        attribute: this.attribute,
        weight: this.weight,
        type: 2
      }).then((res) => {
        if (res.data.status) {
          this.$message.success('入库成功')
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },
  mounted () {
    Promise.all([
      materialList(),
      clientList()
    ]).then((res) => {
      console.log(res)
      this.yarnList = res[0].data.data
      this.companyList = [{ id: 0, name: '本厂' }, ...res[1].data.data]
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/mainMaterialStockCreate.less";
</style>
