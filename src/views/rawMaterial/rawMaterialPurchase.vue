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
            <el-select v-model="value"
                       placeholder="请选择订购单位">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
                         :disabled="item.disabled">
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
                 v-for="(item,key) in material"
                 :key="key">
              <h4>第{{change(key+1)}}种原料</h4>
              <div class="inputBox">
                <el-select v-model="item.name"
                           placeholder="请选择原料">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :value="value.label">
                  </el-option>
                </el-select>
                <el-select v-model="item.color"
                           placeholder="请选择颜色">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :value="value.label">
                  </el-option>
                </el-select>
                <el-select v-model="item.attr"
                           placeholder="请选择属性">
                  <el-option v-for="value in options"
                             :key="value.value"
                             :value="value.label">
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
                      v-model="weight">
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
                      v-model="price">
              <span slot="append">元</span>
            </el-input>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订购日期:</span>
          <span class="content">
            <el-date-picker v-model="timer"
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
                      v-model="textarea">
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
export default {
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
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
      value: '',
      textarea: '',
      weight: '',
      price: '',
      timer: '',
      material: [
        {
          name: '',
          color: '',
          attr: '',
          price: ''
        }
      ]
    }
  },
  methods: {
    addMaterial () {
      this.material.push({
        name: '',
        color: '',
        attr: '',
        price: ''
      })
      console.log(this.material)
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
      this.material.splice(key, 1)
      console.log(this.material)
    },
    clean () {
      this.value = ''
      this.textarea = ''
      this.weight = ''
      this.price = ''
      this.timer = ''
      this.material = [
        {
          name: '',
          color: '',
          attr: '',
          price: ''
        }
      ]
    },
    save () {

    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/rawMaterialPurchase.less";
</style>
