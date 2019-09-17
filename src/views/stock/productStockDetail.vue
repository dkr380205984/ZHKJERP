<template>
  <div id="productStockDetail">
    <div class="head">
      <h2>产品库存详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <span class="stepTitle">产品信息</span>
        <div class="borderCtn">
          <div class="circle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品编号:</span>
            <div class="content important">{{product_info.product_code}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品品类:</span>
            <div class="content">{{product_info|filterType}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">创建人:</span>
            <div class="content">{{product_info.user_name}}({{product_info.create_time}})</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品成分:</span>
            <div class="content">
              <template v-for="(item,key) in product_info.materials">
                {{key !== 0 ? ',' : ''}}
                {{item.ingredient_value + '%' + item.ingredient_name}}
              </template>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">产品规格:</span>
            <div class="content col">
              <div v-for="(item,key) in product_info.size"
                :key="key"
                class="itemBox">
                <div class="item">
                  <span>尺码:{{key}}</span>
                  <span>克重:{{item[0].weight}}</span>
                </div>
                <div class="item">
                  <span v-for="(value,index) in item"
                    :key="index">
                    {{value.size_name}}:
                    {{value.size_value}}cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">产品描述:</span>
            <div class="content">{{product_info.description ? product_info.description : '暂无产品描述 '}}</div>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn oneLine">
            <span class="label">产品图片:</span>
            <span class="content">
              <img v-if="product_info.img.length === 0"
                class="img"
                src="@/assets/image/index/noPic.jpg" />
              <img v-for="(item,index) in product_info.img"
                :key="index"
                class="img"
                :src="item.img_url"
                :onerror="defaultImg" />
            </span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <span class="stepTitle">库存信息</span>
        <div class="borderCtn">
          <div class="circle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <ul class="tablesCtn">
            <li class="title">
              <span>尺码颜色</span>
              <span>库存数量</span>
              <span class="flex15">库存操作</span>
              <span>库存日志</span>
            </li>
            <template v-for="(item,key) in product_info.size">
              <template v-for="(value,index) in product_info.color">
                <li class="content"
                  :key="key + index">
                  <span class="tableRow">{{key + '/' + value.name}}</span>
                  <span class="tableRow"></span>
                  <span class="tableRow flex15">
                    <span class="important"
                      @click="stock('go',key + '/' + value.name)">
                      <img class="icon"
                        :src="require('@/assets/image/icon/goStock.png')" />
                      入库
                    </span>
                    <span class="important"
                      @click="stock('out',key + '/' + value.name)">
                      <img class="icon"
                        :src="require('@/assets/image/icon/outStock.png')" />
                      出库
                    </span>
                  </span>
                  <span class="tableRow important">查看日志</span>
                </li>
              </template>
            </template>
          </ul>
        </div>
      </div>
      <div class="stepCtn">
        <span class="stepTitle">日志信息</span>
        <div class="borderCtn">
          <div class="circ"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn col">
          <div class="filterCtn">
            <div class="filterItem">
              <span class="label">筛选列表:</span>
              <el-tag closable
                v-if="colorSizeComp"
                @close="colorSize = ''">{{colorSizeComp}}</el-tag>
              <el-tag closable
                v-if="stockTypeComp"
                @close="stockType = ''">{{stockTypeComp}}</el-tag>
              <el-tag closable
                v-if="dateComp"
                @close="date = ''">{{dateComp}}</el-tag>
            </div>
            <div class="filterInput">
              <span class="label">筛选条件:</span>
              <el-select v-model="colorSize"
                class="elInput"
                placeholder="筛选尺码颜色">
                <el-option v-for="item in colorSizeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="stockType"
                class="elInput"
                placeholder="筛选出入库类型">
                <el-option v-for="item in stockTypeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-date-picker v-model="date"
                class="elInput"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="筛选日期">
              </el-date-picker>
            </div>
          </div>
          <div class="logBox">
            <div class="title">
              <span>时间</span>
              <span>订单号</span>
              <span>尺码颜色</span>
              <span>操作人</span>
              <span>操作类型</span>
              <span>操作数量</span>
              <span>备注信息</span>
            </div>
            <ul class="logUl">
              <li class="item"
                v-for="item in 6"
                :key="item">
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="shade"
      v-show="showShade">
      <div class="main">
        <div class="close"
          @click="showShade=false">
          <span class="icon">x</span>
        </div>
        <div class="title">{{type === "go" ? '产品入库' : '产品出库'}}</div>
        <div class="inputCtn"
          v-if="type === 'go'">
          <span class="label">结余订单号:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.order_code"
              placeholder="请输入订单号">
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>颜色尺码:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.colorSize"
              disabled
              placeholder="请输入数量">
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>{{type === 'go' ? '入库' : '出库'}}日期:</span>
          <div class="elCtn">
            <el-date-picker v-model="stockObj.time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label"><em>*</em>{{type === 'go' ? '入库' : '出库'}}数量:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.number"
              placeholder="请输入数量">
            </el-input>
          </div>
        </div>
        <div class="inputCtn">
          <span class="label">备注:</span>
          <div class="elCtn">
            <el-input v-model="stockObj.desc"
              type="textarea"
              :row="3"
              placeholder="请输入其他信息"></el-input>
          </div>
        </div>
        <div class="btnCtn">
          <div class="okBtn"
            @click="submit(type)">提交</div>
          <div class="cancleBtn"
            @click="showShade=false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      product_info: {
        category_info: {
          name: '',
          product_category: ''
        },
        style_name: '',
        type_name: '',
        materials: [],
        flower_id: '',
        img: []
      },
      defaultImg: 'this.src="' + require('@/assets/image/index/noPic.jpg') + '"',
      stockType: '',
      stockTypeArr: [
        {
          id: 1,
          name: '入库'
        }, {
          id: 2,
          name: '出库'
        }
      ],
      stockObj: {
        order_code: '',
        colorSize: '',
        number: '',
        time: '',
        desc: ''
      },
      colorSize: '',
      colorSizeArr: [],
      date: '',
      type: '',
      showShade: false
    }
  },
  methods: {
    submit (type) {

    },
    stock (type, item) {
      this.showShade = true
      this.stockObj.colorSize = item
      this.type = type
    }
  },
  computed: {
    stockTypeComp () {
      if (this.stockType) {
        return this.stockTypeArr.find(item => item.id === this.stockType).name
      } else {
        return ''
      }
    },
    colorSizeComp () {
      if (this.colorSize) {
        return this.colorSize
      } else {
        return '全部分类'
      }
    },
    dateComp () {
      if (this.date) {
        return this.date
      } else {
        return ''
      }
    }
  },
  filters: {
    // 类型合并
    filterType (item) {
      if (!item.type_name) {
        return item.category_info.product_category
      } else if (!item.style_name) {
        return item.category_info.product_category + ' / ' + item.type_name
      } else if (!item.flower_id) {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name
      } else {
        return item.category_info.product_category + ' / ' + item.type_name + ' / ' + item.style_name + '/' + item.flower_id
      }
    },
    filterMaterials (arr) {
      let str = ''
      arr.forEach((item) => {
        str += item.ingredient_name + item.ingredient_value + '%' + ' / '
      })
      return str.substring(0, str.length - 2)
    },
    filterReject (item) {
      console.log(item)
      if (!item) {
        return 0
      }
      let arr = JSON.parse(item)
      return (arr && arr.reduce((total, current) => {
        return Number(total) + Number(current.num)
      }, 0)) || '0'
    }
  },
  mounted () {
    productStockDetail({
      product_id: this.$route.params.productId,
      size: this.$route.params.size,
      color: this.$route.params.color
    }).then((res) => {
      console.log(res)
      let data = res.data.data
      this.product_info = data[0].product_info
      this.color = data[0].color
      this.size = data[0].size
      this.list = data
      this.total = this.list.reduce((total, current) => {
        return total + current.stock_number
      }, 0)
    })
  }
}
</script>

<style scoped lang='less'>
#productStockDetail {
  .shade {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .main {
      position: absolute;
      width: 640px;
      height: 580px;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #ffffff;
      overflow: hidden;
      border-radius: 4px;
      .close {
        position: absolute;
        right: -30px;
        top: -30px;
        width: 60px;
        height: 60px;
        background: #1a95ff;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s;
        color: #ecf0f1;
        &:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: #48aaff;
        }
        .icon {
          position: absolute;
          left: 15px;
          bottom: 7px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .title {
        line-height: 66px;
        font-size: 22px;
        padding: 0 20px;
        background: linear-gradient(to right, #1a95ff, #ceddef);
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        color: #ffffff;
        margin-bottom: 40px;
      }
      .inputCtn {
        margin: 20px;
        position: relative;
        font-size: 16px;
        padding-left: 6em;
        height: 40px;
        line-height: 40px;
        color: #666;
        .label {
          position: absolute;
          left: 0;
          text-align: right;
          width: 6em;
          color: #666;
          em {
            color: #f56c6c;
            line-height: 40px;
            margin-right: 2px;
            vertical-align: -4px;
          }
        }
        .elCtn {
          margin-left: 15px;
          width: 300px;
        }
      }
      .btnCtn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        .okBtn {
          margin: 0 30px;
        }
      }
    }
  }
}
@import "~@/assets/css/productStockDetail.less";
</style>
<style lang="less">
#productStockDetail {
  .el-input,
  .el-input__inner {
    width: 100%;
  }
}
</style>
