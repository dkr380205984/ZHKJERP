<template>
  <div id = "sampleCreate">
    <div class="head">
      <h2>添加样品订单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <el-input class="elInput" v-model="value1" disabled></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品品类:</span>
          <el-input class="elInput" v-model="value2" disabled></el-input>
        </div>
        <div class="inputCtn">
          <span class="label">产品成分:</span>
          <el-input class="elInput" v-model="value3" disabled></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品尺寸:</span>
          <el-input class="elInput" v-model="value4" disabled></el-input>
        </div>
        <div class="inputCtn">
          <span class="label">产品克重:</span>
          <el-input class="elInput" v-model="value5" disabled></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <el-input class="elInput" v-model="value7" disabled></el-input>
        </div>
        <div class="inputCtn">
          <span class="label">添加日期:</span>
          <el-input class="elInput" v-model="value6" disabled></el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品图片:</span>
          <img src="" />
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品描述:</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="value8"
            disabled>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订单公司:</span>
          <el-select v-model="value" placeholder="请选择订单公司">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn">
        <div class="specialCtn">
          <span class="label">订单信息:</span>
          <div class="infoCtn" v-for="item in num" :key="item">
            <span class="index">{{item}}</span>
            <el-select v-model="value" placeholder="请选择颜色">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input class="elInputAp" placeholder="请输入数字" v-model="value">
              <template slot="prepend">订单条数:</template>
              <template slot="append">条</template>
            </el-input>
            <el-icon class="el-icon-delete" @click.native="num--"></el-icon>
          </div>
          <div class="addBtn" @click="num++">
            <span>添加分类</span>
            <span>+</span>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="specialCtn" style="width:300px">
          <span class="label">订单价格:</span>
          <div class="infoCtn" style="height:40px">
            <el-radio-group v-model="radio2">
              <el-radio :label="3">按单价计算</el-radio>
              <el-radio :label="6">按款数计算</el-radio>
            </el-radio-group>
          </div>
          <div class="infoCtn">
            <el-input style="margin-left:0px" class="elInputAp" placeholder="请输入数字" v-model="value">
              <template slot="prepend">单价:</template>
              <template slot="append">元/条</template>
            </el-input>
          </div>
          <div class="infoCtn">
            <el-input style="margin-left:0px" class="elInputAp" value="1000" disabled>
              <template slot="prepend">总价:</template>
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="specialCtn">
          <span class="label">交货订单:</span>
          <div class="onceTable" v-for="item in num3" :key="item">
            <div class="onceLine">
              <span class="span">批次:</span>
              <span class="pici">第{{item}}批</span>
            </div>
            <div class="onceLine">
              <span class="span">交货日期:</span>
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择交货日期">
              </el-date-picker>
            </div>
            <div class="onceLine">
              <span class="span">产品数量:</span>
              <div class="infoCtn" v-for="item in num2" :key="item" style="padding-right:120px;">
                <el-select v-model="value" placeholder="请选择颜色">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input class="elInputAp" placeholder="请输入数字" v-model="value">
                  <template slot="prepend">条数:</template>
                  <template slot="append">条</template>
                </el-input>
                <el-icon class="el-icon-delete" @click.native="num--"></el-icon>
              </div>
              <div class="addBtn" @click="num2++" style="bottom:0">
                <span>继续添加</span>
                <span>+</span>
              </div>
            </div>
          </div>
          <div class="addBtn2" @click="num3++">
            <span>添加批次</span>
            <span>+</span>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn">清空</div>
        <div class="okBtn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      value1: 'KB12345678',
      value2: '围脖 / 针织 / 长巾 / 条纹',
      value3: '涤纶:10% / 毛线:90%',
      value4: '长(40cm) * 宽(40cm) * 须头(40cm)',
      value5: '100克',
      value6: '2018-03-21',
      value7: '夏东海',
      value8: '长(40cm) * 宽(40cm) * 须头(40cm)长(40cm) * 宽(40cm) * 须头(40cm)长(40cm) * 宽(40cm) * 须头(40cm)长(40cm) * 宽(40cm) * 须头(40cm)',
      options: [{
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
      }],
      num: 1,
      num2: 1,
      num3: 1,
      radio2: 3,
      date: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/sampleCreate.less';
</style>
<style lang="less">
#sampleCreate{
  .onceLine{
    .el-input__inner{
      background: #F8F8F8;
    }
  }
}
</style>
