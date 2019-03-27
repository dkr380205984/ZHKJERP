<template>
  <div id = "sampleCreate">
    <div class="head">
      <h2>添加样品订单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品编号:</span>
          <span class="content important">KR-0001</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">产品品类:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品花型:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">产品成分:</span>
          <span class="content">KR-0001</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">克重:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建人:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">创建日期:</span>
          <span class="content">KR-0001</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品规格:</span>
          <span class="content contentLine">
            <span class="size">S</span>
            <span class="sizeDetail">
              <span class="sizeOnce">长：20cm</span>
              <span class="sizeOnce">长：20cm</span>
            </span>
          </span>
          <span class="content contentLine">
            <span class="size">S</span>
            <span class="sizeDetail">
              <span class="sizeOnce">长：20cm</span>
              <span class="sizeOnce">长：20cm</span>
            </span>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品图片:</span>
          <span class="content">
            <img class="img" src="../../assets/image/index/noPic.jpg"/>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">产品描述:</span>
          <span class="content">
            一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本一段文本
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料信息:</span>
          <span class="content">KR-0001</span>
        </div>
        <div class="inputCtn">
          <span class="label">辅料信息:</span>
          <span class="content">KR-0001</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">外道加工:</span>
          <span class="content">KR-0001</span>
        </div>
      </div>
      <div class="border"></div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">订单公司:</span>
          <el-select class="elSelect" v-model="value" placeholder="请选择订单公司">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="lineCtn" style="margin-bottom:0">
        <div class="specialCtn">
          <span class="label">订单信息:</span>
          <div class="infoCtn" v-for="item in num" :key="item">
            <span class="index">{{item}}</span>
            <el-select style="width:150px" v-model="value" placeholder="请选择尺码">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择颜色" style="margin-left:15px;width:150px">
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
      <div class="lineCtn" style="margin-top:4px;margin-bottom:4px">
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
      <div class="lineCtn" style="margin-top:0;margin-bottom:0px;">
        <div class="specialCtn" style="width:300px">
          <span class="label">承担方:</span>
          <div class="infoCtn" style="height:40px">
            <el-radio-group v-model="radio2">
              <el-radio :label="3">工厂承担</el-radio>
              <el-radio :label="6">订单公司承担</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="lineCtn" style="margin-top:0">
        <div class="inputCtn">
          <span class="label">税率:</span>
          <el-input style="margin-left:15px;" placeholder="请输入数字" v-model="value">
            <template slot="append">%</template>
          </el-input>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">下单日期:</span>
           <el-date-picker
            style="margin-left:15px;width:200px"
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputCtn">
          <span class="label">交货日期:</span>
           <el-date-picker
            style="margin-left:15px;width:200px"
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
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
import { productPlanOne } from '@/assets/js/api.js'
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
      date: '',
      product: {
        category_name: '',
        style_name: '',
        type_name: '',
        user_id: '',
        size: [],
        color: [],
        create_time: '',
        description: '',
        flower_id: ''
      }
    }
  },
  created () {
    productPlanOne({
      id: 2
    }).then((res) => {
      console.log(res)
    })
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
