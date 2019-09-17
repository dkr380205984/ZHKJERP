<template>
  <div id="packagMaterialSetting">
    <div class="head">
      <h2>{{this.id ? '修改' : '添加'}}包装辅料</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">辅料名称:</span>
          <el-input class="elInput"
            v-model="pack_name"
            :disabled="id ? true : false"
            placeholder="请输入辅料名称"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">辅料规格:</span>
          <el-input class="elInput"
            v-model="pack_size"
            placeholder="请输入辅料规格"></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">辅料重量:</span>
          <el-input class="elInput"
            v-model="pack_weight"
            placeholder="请输入辅料净重"></el-input>
        </div>
      </div>
      <div class="lineCtn"
        v-for="(item,key) in pack_attrs"
        :key="key">
        <div class="inputCtn">
          <span class="label"
            v-if="key === 0">辅料属性:</span>
          <span class="label"
            v-else></span>
          <el-input class="elInput"
            v-model="item.pack_attr"
            placeholder="请输入辅料属性"></el-input>
          <span class="el-icon-plus icon"
            v-if="key === 0"
            @click="addPackAttr()"></span>
          <span class="el-icon-minus icon"
            v-else
            @click="deletePackAttr(key)"></span>
        </div>
      </div>
      <div class="lineCtn bigLine">
        <div class="inputCtn">
          <span class="label">备注:</span>
          <el-input class="elInput"
            v-model="remark"
            :autosize="{minRows:2,maxRows:5}"
            type="textarea"
            placeholder="请输入备注信息"></el-input>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.push('/index/packagMaterialList')">返回</div>
        <div class="okBtn"
          @click="saveAll()">{{this.id ? '修改' : '添加'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { packagMaterialAdd, packagMaterialdetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      pack_name: '',
      pack_size: '',
      pack_weight: '',
      pack_attrs: [{ pack_attr: '' }],
      remark: '',
      id: '',
      timer: true
    }
  },
  created () {
    let str = window.location.href
    if (str.indexOf('?') !== -1) {
      this.id = str.split('?')[1].split('=')[1]
    }
    if (this.id !== '') {
      packagMaterialdetail({
        id: this.id
      }).then(res => {
        console.log(res.data.data)
        let info = res.data.data
        this.pack_name = info.name
        this.pack_size = info.size
        this.pack_weight = info.weight
        this.pack_attrs = JSON.parse(info.attribute)
        this.remark = info.desc
      })
    }
  },
  methods: {
    addPackAttr () {
      this.pack_attrs.push({
        pack_attr: ''
      })
    },
    deletePackAttr (key) {
      this.pack_attrs.splice(key, 1)
    },
    saveAll () {
      if (!this.pack_name) {
        this.$message({
          type: 'error',
          message: `请输入辅料名称`
        })
        return
      }
      if (this.timer) {
        this.timer = false
        packagMaterialAdd({
          id: this.id ? this.id : null,
          company_id: window.sessionStorage.getItem('company_id'),
          name: this.pack_name,
          size: this.pack_size,
          attribute: JSON.stringify(this.pack_attrs),
          weight: this.pack_weight,
          desc: this.remark
        }).then(res => {
          console.log(res)
          let str = this.id ? '修改' : '添加'
          this.$message({
            type: 'success',
            message: str + `成功` + (this.id ? '，即将跳转至列表页！' : '')
          })
          if (this.id) {
            setTimeout(() => { this.$router.push('/index/packagMaterialList') }, 800)
          }
        })
        setTimeout(() => {
          this.timer = true
        }, 2000)
      } else {
        this.$message.error('请勿频繁点击！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/packagMaterialSetting.less";
</style>
