<template>
  <div id="finishedExaminationDetail"
    v-loading="loading">
    <div class="head">
      <h2>成品检验详情</h2>
    </div>
    <div class="body">
      <div class="stepCtn">
        <div class="stepTitle">订单信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">订单号:</span>
            <span class="content important"
              @click="$router.push('/index/orderDetail/' + $route.params.id)">{{order_code}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">外贸公司:</span>
            <span class="content">{{client_name}}</span>
          </div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn">
            <span class="label">下单日期:</span>
            <span class="content">{{order_time}}</span>
          </div>
          <div class="inputCtn">
            <span class="label">负责小组:</span>
            <span class="content">{{group_name}}</span>
          </div>
        </div>
      </div>
      <div class="stepCtn">
        <div class="stepTitle">产品信息</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"></div>
        </div>
        <div class="lineCtn">
          <template v-if="productList.length > 0">
            <div class="inputCtn noPadding">
              <div class="content">
                <ul class="tablesCtn">
                  <li class="title">
                    <span>产品编号</span>
                    <span class="flex17">产品类别</span>
                    <span class="flex45">
                      <span>尺码/颜色</span>
                      <span class="flex4">
                        <span>发货批次</span>
                        <span>发货数量</span>
                        <span>已入库数量</span>
                        <span>发货日期</span>
                      </span>
                    </span>
                    <span class="flex17">操作</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in productList"
                    :key="key">
                    <span class="tableRow blue"
                      @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                    <span class="tableRow flex17">{{item.type}}</span>
                    <span class="tableRow col flex45">
                      <span v-for="(val,ind) in item.size_info"
                        :key="ind"
                        class="tableColumn">
                        <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                        <span class="tableRow col flex4">
                          <span v-for="(value,index) in val.batch_info"
                            :key='index'
                            class="tableColumn">
                            <span class="tableRow">{{'第'}}{{chinaNumber[value.batch_id]}}{{'批'}}</span>
                            <span class="tableRow">{{value.number ? value.number : '0'}}{{'条'}}</span>
                            <span class="tableRow">{{value.goStock_number ? value.goStock_number : 0}}{{'条'}}</span>
                            <span class="tableRow">{{value.delivery_time}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow flex17">
                      <span class="blue"
                        @click="go(item.product_code)">显示详情</span>
                      <span class="blue"
                        @click="$router.push('/index/finishedExamination/' + $route.params.id + '/' +item.product_code)">成品检验</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else
            class="inputCtn">暂无信息</div>
        </div>
      </div>
      <div class="stepCtn"
        v-for="(item,key) in productList"
        :key="key"
        :id="item.product_code">
        <div class="stepTitle"
          id="product1">产品{{chinaNumber[key + 1] }}</div>
        <div class="borderCtn">
          <div class="cicle"></div>
          <div class="border"
            v-if="key !== productList.length - 1"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex55">
                    <span>尺码颜色</span>
                    <span>已检验数量</span>
                    <span>次品数量</span>
                    <span class="flex45">
                      <span>发货批次</span>
                      <span>发货日期</span>
                      <span>发货数量</span>
                      <span>检验状态</span>
                    </span>
                  </span>
                </li>
                <!-- <li v-if="list.orderList.length === 0">暂无信息</li> -->
                <li class="content">
                  <span class="tableRow"
                    style="line-height:1.5em;">
                    <div>
                      <span class="blue"
                        @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                      <span>{{item.type}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex55">
                    <span v-for="(value,index) in item.size_info"
                      :key="index"
                      class="tableColumn">
                      <span class="tableRow">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="tableRow">{{value.test_number ? value.test_number : 0}}{{'条'}}</span>
                      <span class="tableRow">{{value.defective_number ? value.defective_number : 0}}{{'条'}}</span>
                      <span class="tableRow flex45 col">
                        <span v-for="(val,ind) in value.batch_info"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow">{{'第'}}{{chinaNumber[val.batch_id]}}{{'批'}}</span>
                          <span class="tableRow">{{val.delivery_time}}</span>
                          <span class="tableRow">{{val.number ? val.number : 0}}{{'条'}}</span>
                          <span :class="{'tableRow':true,'compiled':val.plan_number === val.test_number,'unCompiled':val.plan_number !== val.test_number}">{{val.plan_number === val.test_number ? '完成' : '未完成'}}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <div class="logList"
                  @click="item.flag = !item.flag">{{ item.flag ? '收起' : '展开'}}详情</div>
              </ul>
              <ul class="log"
                v-if="item.flag">
                <div>
                  <li>
                    <span>检验日期</span>
                    <span>检验人员</span>
                    <span class="flexMid">尺码颜色</span>
                    <span class="flexMid">检验数量</span>
                    <span class="flexMid">次品数量</span>
                    <span>次品原因</span>
                    <span>次品承担单位</span>
                    <span>备注信息</span>
                    <span class="flexMid">检验人</span>
                    <span class="flexMid">操作</span>
                  </li>
                </div>
                <div>
                  <li v-if="item.log.length === 0">暂无信息</li>
                  <li v-for="(value,index) in item.Log"
                    :key="index">
                    <span class="flexBig">{{item.order_time}}</span>
                    <span class="flexBig">{{item.client_name}}</span>
                    <span>{{item.material}}</span>
                    <span class="flexMid">{{item.color}}</span>
                    <span class="flexMid">{{item.price|fixedFilter}}{{'元/' + item.unit}}</span>
                    <span class="flexMid">{{item.weight|fixedFilter}}{{item.unit}}</span>
                    <span class="flexMid">{{item.total_price|fixedFilter}}{{'元'}}</span>
                    <span class="flexBig remark">
                      <i>
                        {{item.remark ? item.remark : '暂无备注'}}
                        <el-popover placement="top-end"
                          title="备注信息"
                          width="200"
                          trigger="click"
                          v-if="charCodeLength(item.remark) > 15"
                          :content="item.remark">
                          <span slot="reference">展开</span>
                        </el-popover>
                      </i>
                    </span>
                    <span class="flexMid">{{item.user}}</span>
                  </li>
                </div>
              </ul>
              <div class="handle">
                <div :class="{'disabled':!flag}"
                  @click="$router.push('/index/finishedExamination/' + $route.params.id + '/' +item.product_code)">
                  <img class="icon"
                    v-if="flag"
                    src="@/assets/image/icon/orderIcon.png">
                  <img class="icon"
                    v-else
                    src="@/assets/image/icon/order_disabled.png">
                  <span>去检验</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn"
          @click="$router.go(-1)">返回</div>
        <div class="okBtn"
          @click="$router.go(-1)">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order_code: '',
      client_name: '',
      order_time: '',
      group_name: '',
      productList: [],
      chinaNumber: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      },
      flag: true
    }
  },
  methods: {
    charCodeLength (item) {
      if (!item) {
        return 0
      }
      let len = item.length
      let lengths = 0
      for (let i = 0; i < len; i++) {
        if (item.charCodeAt(i) > 255) {
          lengths += 2
        } else {
          lengths++
        }
      }
      return lengths
    },
    go (idName) {
      document.getElementById(idName).scrollIntoView(true)
    }
  },
  created () {
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      console.log('orderInfo', orderInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 初始化产品信息
      orderInfo.order_batch.forEach(item => {
        item.batch_info.forEach(value => {
          value.size.forEach(val => {
            let flag = this.productList.find(key => key.product_code === value.productCode)
            if (!flag) {
              let type = value.productInfo.category_info.product_category + '/' + value.productInfo.type_name + '/' + value.productInfo.style_name + (value.productInfo.flower_id ? '/' + value.productInfo.flower_id : '')
              this.productList.push({
                product_code: value.productCode,
                type: type,
                flag: false,
                log: [],
                size_info: [{
                  size: val.name[0],
                  color: val.name[1],
                  batch_info: [{
                    batch_id: item.batch_id,
                    delivery_time: item.delivery_time,
                    number: val.numbers
                  }]
                }]
              })
            } else {
              let flag1 = flag.size_info.find(key => (key.size === val.name[0] && key.color === val.name[1]))
              if (!flag1) {
                flag.size_info.push({
                  size: val.name[0],
                  color: val.name[1],
                  batch_info: [{
                    batch_id: item.batch_id,
                    delivery_time: item.delivery_time,
                    number: val.numbers
                  }]
                })
              } else {
                let flag2 = flag1.batch_info.find(key => key.batch_id === item.batch_id)
                if (!flag2) {
                  flag1.batch_info.push({
                    batch_id: item.batch_id,
                    delivery_time: item.delivery_time,
                    number: val.numbers
                  })
                } else {
                  flag2.number = Number(flag2.number) + Number(val.numbers)
                }
              }
            }
          })
        })
      })
      this.loading = false
      console.log('productList', this.productList)
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/finishedExaminationDetail.less";
</style>
