<template>
  <div id="semiExaminationDetail"
    v-loading="loading">
    <div class="head">
      <h2>半成品检验详情</h2>
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
        <div class="stepTitle">产品织造信息</div>
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
                      <span>尺码颜色</span>
                      <span class="flex4">
                        <span class="flex13">生产单位</span>
                        <span>计划生产数量</span>
                        <span>已入库数量</span>
                        <span>计划完成时间</span>
                      </span>
                    </span>
                    <span class="flex17">操作</span>
                  </li>
                  <li class="content"
                    v-for="(item,key) in productList"
                    :key="key">
                    <span class="tableRow blue"
                      @click="$router.push('/index/productDetail/' + item.product_code)">{{item.product_code}}</span>
                    <span class="tableRow flex17">{{item.product_class}}</span>
                    <span class="tableRow col flex45">
                      <span v-for="(val,ind) in item.size_info"
                        :key="ind"
                        class="tableColumn">
                        <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                        <span class="tableRow col flex4">
                          <span v-for="(value,index) in val.production_info"
                            :key='index'
                            class="tableColumn">
                            <span class="tableRow flex13">{{value.production_client}}</span>
                            <span class="tableRow">{{value.plan_number}}{{'条'}}</span>
                            <span class="tableRow">{{value.goStock_number ? value.goStock_number : '0'}}{{'条'}}</span>
                            <span class="tableRow">{{value.compiled_time}}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="tableRow flex17">
                      <span class="blue"
                        @click="go(item.product_code)">显示详情</span>
                      <span class="blue"
                        @click="$router.push('/index/semiExamination/' + $route.params.id + '/' +item.product_code)">半成品检验</span>
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
            v-if="key !== productList.length -1"></div>
        </div>
        <div class="lineCtn">
          <div class="inputCtn noPadding">
            <div class="content">
              <ul class="tablesCtn">
                <li class="title">
                  <span>产品编号</span>
                  <span class="flex55">
                    <span>尺码颜色</span>
                    <span class="flex45">
                      <span class="flex13">生产单位</span>
                      <span class="flex13">计划生产数量</span>
                      <span>已检验数量</span>
                      <span>次品数量</span>
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
                      <span>{{item.product_class}}</span>
                    </div>
                  </span>
                  <span class="tableRow col flex55">
                    <span v-for="(value,index) in item.size_info"
                      :key="index"
                      class="tableColumn">
                      <span class="tableRow">{{value.size}}{{'/'}}{{value.color}}</span>
                      <span class="tableRow flex45 col">
                        <span v-for="(val,ind) in value.production_info"
                          :key="ind"
                          class="tableColumn">
                          <span class="tableRow flex13">{{val.production_client}}</span>
                          <span class="tableRow flex13">{{val.plan_number}}{{'条'}}</span>
                          <span class="tableRow">{{val.test_number ? val.test_number : 0}}{{'条'}}</span>
                          <span class="tableRow">{{val.defective_number ? val.defective_number : 0}}{{'条'}}</span>
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
                    <span>生产单位</span>
                    <span>尺码颜色</span>
                    <span class="flexMid">检验件数</span>
                    <span class="flexMid">次品数量</span>
                    <span>次品原因</span>
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
                  @click="$router.push('/index/semiExamination/' + $route.params.id + '/' +item.product_code)">
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
import { orderDetail, weaveDetail } from '@/assets/js/api.js'
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
      }),
      weaveDetail({
        order_id: this.$route.params.id
      })
    ]).then(res => {
      let orderInfo = res[0].data.data
      let weaveInfo = res[1].data.data
      // console.log('orderInfo', orderInfo)
      console.log('weaveInfo', weaveInfo)
      // 初始化订单信息
      this.order_code = orderInfo.order_code
      this.client_name = orderInfo.client_name
      this.order_time = orderInfo.order_time
      this.group_name = orderInfo.group_name
      // 匹配产品织造信息
      weaveInfo.forEach(item => {
        let flag = this.productList.find(key => key.product_code === item.product_info.product_code)
        if (!flag) {
          let type = item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_id ? '/' + item.product_info.flower_id : '')
          this.productList.push({
            product_code: item.product_info.product_code,
            product_class: type,
            flag: false,
            log: [],
            size_info: [{
              size: item.size,
              color: item.color,
              production_info: [{
                plan_number: item.number,
                production_client: item.client_name,
                compiled_time: item.complete_time.split(' ')[0]
              }]
            }]
          })
        } else {
          let flag1 = flag.size_info.find(key => (key.size === item.size && key.color === item.color))
          if (!flag1) {
            flag.size_info.push({
              size: item.size,
              color: item.color,
              production_info: [{
                plan_number: item.number,
                production_client: item.client_name,
                compiled_time: item.complete_time.split(' ')[0]
              }]
            })
          } else {
            let flag2 = flag1.production_info.find(key => key.production_client === item.client_name)
            if (!flag2) {
              flag1.production_info.push({
                plan_number: item.number,
                production_client: item.client_name,
                compiled_time: item.complete_time.split(' ')[0]
              })
            } else {
              flag2.plan_number = Number(flag2.plan_number) + Number(item.number)
            }
          }
        }
      })
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/semiExaminationDetail.less";
</style>
