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
                  <span>尺码:{{item.measurement}}</span>
                  <span>克重:{{item.weight}}g</span>
                  <span>尺寸:{{item.size_info}}</span>
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
                :src="item.image_url"
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
            <li class="content"
              v-for="(item,key) in stock_detail"
              :key="key ">
              <span class="tableRow">{{item.size + '/' + item.color}}</span>
              <span class="tableRow">{{item.stock_number ? item.stock_number : 0}}{{product_info.category_info.name}}</span>
              <span class="tableRow flex15">
                <span class="important"
                  @click="stock('go',item.size + '/' + item.color)">
                  <img class="icon"
                    :src="require('@/assets/image/icon/goStock.png')" />
                  入库
                </span>
                <span class="important"
                  @click="stock('out',item.size + '/' + item.color)">
                  <img class="icon"
                    :src="require('@/assets/image/icon/outStock.png')" />
                  出库
                </span>
              </span>
              <span class="tableRow important"
                @click="filterList.colorSize = (item.size + '/' + item.color),go('logBox')">查看日志</span>
            </li>
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
                @close="filterList.colorSize = ''">{{colorSizeComp}}</el-tag>
              <el-tag closable
                style="margin-left:8px;"
                v-if="stockTypeComp"
                @close="filterList.stockType = ''">{{stockTypeComp}}</el-tag>
              <el-tag closable
                v-if="dateComp"
                style="margin-left:8px;"
                @close="filterList.date = ''">{{dateComp}}</el-tag>
            </div>
            <div class="filterInput">
              <span class="label">筛选条件:</span>
              <el-select v-model="filterList.colorSize"
                class="elInput"
                placeholder="筛选尺码颜色">
                <el-option v-for="item in stock_detail"
                  :key="item.size + '/' + item.color"
                  :label="item.size + '/' + item.color"
                  :value="item.size + '/' + item.color">
                </el-option>
              </el-select>
              <el-select v-model="filterList.stockType"
                class="elInput"
                placeholder="筛选出入库类型">
                <el-option v-for="item in stockTypeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-date-picker v-model="filterList.date"
                class="elInput"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="筛选日期">
              </el-date-picker>
            </div>
          </div>
          <div class="logBox"
            id="logBox">
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
                v-for="item in filterLog"
                :key="item.id">
                <span>{{item.created_at}}</span>
                <span>{{item.order_code}}</span>
                <span>{{item.size + '/' + item.color}}</span>
                <span>{{item.user_name}}</span>
                <span>{{stockTypeArr.find(val=>val.id === item.type).name}}</span>
                <span>{{item.stock_number}}{{product_info.category_info.name}}</span>
                <span>{{item.remark}}</span>
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
        <!-- <div class="inputCtn"
          v-if="type === 'go'">
          <span class="label"><em>*</em>{{type === "go" ? '入库仓库' : '出库仓库'}}:</span>
          <div class="elCtn">
            <el-select v-model="stockObj.stock_id"
              placeholder="请选择仓库">
              <el-option v-for="item in stockArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div> -->
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
          <div class="cancleBtn"
            @click="showShade=false">取消</div>
          <div class="okBtn"
            @click="submit(type)">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productStockOne, productStockSave } from '@/assets/js/api.js'
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
      stockTypeArr: [
        {
          id: 1,
          name: '入库'
        }, {
          id: 2,
          name: '出库'
        }
      ],
      stockArr: [],
      stockObj: {
        order_code: '',
        colorSize: '',
        number: '',
        time: '',
        desc: ''
      },
      type: '',
      log: [],
      filterLog: [],
      filterList: {
        stockType: '',
        colorSize: '',
        date: ''
      },
      stock_detail: [],
      showShade: false
    }
  },
  methods: {
    go (idName) {
      document.getElementById(idName).scrollIntoView(true)
    },
    submit (type) {
      productStockSave({
        data: [{
          user_id: window.sessionStorage.getItem('user_id'),
          remark: this.stockObj.desc,
          storage_time: this.stockObj.time,
          stock_number: (type === 'go' ? this.stockObj.number : 0 - this.stockObj.number),
          company_id: window.sessionStorage.getItem('company_id'),
          color: this.stockObj.colorSize.split('/')[1],
          size: this.stockObj.colorSize.split('/')[0],
          product_id: this.$route.params.productId,
          order_code: (type === 'go' ? this.stockObj.order_code : ''),
          stock_id: 1
        }]
      }).then(res => {
        if (res.data.status) {
          this.showShade = false
          this.$message.success('添加成功')
          this.getStockInfo()
        }
      })
    },
    stock (type, item) {
      this.showShade = true
      this.stockObj.colorSize = item
      this.type = type
    },
    getStockInfo () {
      this.log = []
      this.filterLog = []
      this.stock_detail = []
      productStockOne({
        product_id: this.$route.params.productId
      }).then((res) => {
        console.log(res)
        let data = res.data.data
        this.product_info = data.product_info
        this.product_info.size.forEach(valSize => {
          this.product_info.color.forEach(valColor => {
            this.stock_detail.push({
              size: valSize.measurement,
              color: valColor.color_name
            })
          })
        })
        this.stock_detail.forEach(item => {
          let flag = data.data_detail.find(val => (val.color === item.color && val.size === item.size))
          if (flag) {
            item.stock_number = flag.total_stock
          }
        })
        this.log = data.data_log
        this.filterLog = this.log
      })
    }
  },
  computed: {
    stockTypeComp () {
      if (this.filterList.stockType) {
        return this.stockTypeArr.find(item => item.id === this.filterList.stockType).name
      } else {
        return ''
      }
    },
    colorSizeComp () {
      if (this.filterList.colorSize) {
        return this.filterList.colorSize
      } else {
        return '全部分类'
      }
    },
    dateComp () {
      if (this.filterList.date) {
        return this.filterList.date
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
    this.getStockInfo()
    // stockList({

    // }).then(res => {
    //   if (res.data.status) {
    //     this.stockArr = res.data.data.data
    //   } else {
    //     this.$message({
    //       type: 'error',
    //       message: res.data.message
    //     })
    //   }
    // })
  },
  watch: {
    filterList: {
      deep: true,
      handler (newVal) {
        newVal.colorSize ? this.filterLog = this.log.filter(item => (item.size === newVal.colorSize.split('/')[0] && item.color === newVal.colorSize.split('/')[1])) : this.filterLog = this.log
        newVal.stockType ? this.filterLog = this.filterLog.filter(item => (item.type === newVal.stockType)) : this.filterLog = this.filterLog
        newVal.date ? this.filterLog = this.filterLog.filter(item => item.created_at.split(' ')[0] === newVal.date) : this.filterLog = this.filterLog
      }
    }
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
