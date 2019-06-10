<template>
  <div id="productDesignCreate"
    v-loading="loading">
    <div class="head">
      <h2>添加生产计划单</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">订单号：</span>
          <span class="content important">{{order.order_code}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">外贸公司：</span>
          <span class="content">{{order.client_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">联系人：</span>
          <span class="content">{{order.contacts}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建人：</span>
          <span class="content">{{order.user_name}}</span>
        </div>
        <div class="inputCtn">
          <span class="label">下单日期：</span>
          <span class="content">{{order.order_time}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">备注：</span>
          <span class="content">{{order.remark?order.remark:'暂无信息'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn oneLine">
          <span class="label">生产数量：</span>
          <div class="specialTable">
            <div class="left"
              style="width:180px">
              <div class="firstLine">产品品类</div>
              <div style="color:#1a95ff;"
                class="mergeLine"
                v-for="(item,index) in product"
                :style="{height:(index!==product.length-1)?(61*item.num)+'px':(61*item.num)-1+'px'}"
                :key="item.product_code">
                <span @click="$router.push('/index/productDetail/'+item.product_code)"
                  style="cursor:help">{{item.product_code}}</span>
                <span @click="$router.push('/index/productDetail/'+item.product_code)"
                  style="cursor:help">{{item.category_name}}/{{item.type_name}}/{{item.style_name}}</span>
              </div>
            </div>
            <div class="right">
              <div class="tableRow titleTableRow">
                <div class="tableColumn">尺寸/颜色</div>
                <div class="tableColumn ">下单数</div>
                <div class="tableColumn">库存数量</div>
                <div class="tableColumn">库存调取</div>
                <div class="tableColumn">工厂生产</div>
                <div class="tableColumn">总计</div>
                <div class="tableColumn"
                  style="flex:1.3">生产损耗(%)</div>
              </div>
              <div class="tableRow bodyTableRow"
                v-for="(item) in productInfo"
                :key="item.id">
                <div class="tableColumn">{{item.size}}/{{item.color}}</div>
                <div class="tableColumn">{{item.numbers}}{{item.unit_name}}</div>
                <div class="tableColumn">{{item.stock_num}}{{item.unit_name}}</div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.stock_pick" />
                </div>
                <div class="tableColumn">
                  <input class="inputs"
                    placeholder="输入数字"
                    v-model="item.production_num" />
                </div>
                <div class="tableColumn">{{(parseInt(item.stock_pick) + parseInt(item.production_num))?(parseInt(item.stock_pick) + parseInt(item.production_num)):'待计算'}}</div>
                <div class="tableColumn"
                  style="flex:1.3">
                  <input class="inputs"
                    placeholder="百分比"
                    v-model="item.production_sunhao" />
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
          @click="saveAll">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderStockDetail, productionSave } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      order: {
        order_code: '',
        client_name: '',
        remark: '',
        account_unit: '',
        contacts: '',
        exchange_rate: '',
        order_time: '',
        order_batch: [],
        product_stock: '',
        tax_rate: '',
        total_price: '',
        user_name: '',
        id: ''
      },
      productInfo: [],
      product: []
    }
  },
  methods: {
    clearAll () {

    },
    saveAll () {
      let stockState = true
      let numberState = true
      let sunhaoState = true
      this.productInfo.forEach((item) => {
        if (item.stock_pick > item.stock_num) {
          stockState = false
        }
        if (!item.production_num) {
          numberState = false
        }
        if (!item.production_sunhao) {
          sunhaoState = false
        }
      })
      if (!stockState) {
        this.$message.error({
          message: '检测到库存调取数量大于库存数量,请修改后提交'
        })
        return
      }
      if (!numberState) {
        this.$message.error({
          message: '检测到有未填写的工厂生产数量,请输入后提交'
        })
        return
      }
      if (!sunhaoState) {
        this.$message.error({
          message: '检测到有未填写的损耗比,请输入后提交'
        })
        return
      }
      let json = {
        is_update: false,
        company_id: window.sessionStorage.getItem('company_id'),
        order_id: this.order.id,
        id: null,
        detail_info: this.productInfo.map((item) => {
          return {
            category_name: item.category_name,
            style_name: item.style_name,
            type_name: item.type_name,
            unit_name: item.unit_name,
            product_code: item.product_code,
            size: item.size,
            color: item.color,
            order_num: item.numbers,
            stock_pick_change: item.stock_pick,
            // stock_num: item.stock_num, //库存总量不存储,让后台自己算
            stock_pick: item.stock_pick,
            production_num: item.production_num,
            production_sunhao: item.production_sunhao,
            total_num: parseInt(item.stock_pick) + parseInt(item.production_num)
          }
        })
      }
      console.log(json)
      productionSave(json).then((res) => {
        console.log(res)
        if (res.data.status) {
          this.$message.success({
            message: '添加成功'
          })
          this.$router.push('/index/productDesignList')
        } else {
          this.$message.error({
            message: '库存变动,请刷新页面后重试'
          })
        }
      })
    }
  },
  mounted () {
    orderStockDetail({
      order_id: this.$route.params.id,
      company_id: window.sessionStorage.getItem('company_id')
    }).then((res) => {
      console.log(res)
      this.order = res.data.data.order
      let obj = res.data.data.stock_data
      Object.keys(obj).forEach((key) => {
        obj[key].forEach((item) => {
          this.productInfo.push({
            product_code: key,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            stock_num: item.stock_num,
            size: item.size,
            color: item.color,
            numbers: item.numbers,
            unit_name: item.unit_name,
            stock_pick: 0,
            production_num: '',
            production_sunhao: ''
          })
        })
      })
      // 合并相同编号的产品数据
      this.productInfo.forEach((item) => {
        let finded = this.product.find((itemFind, index) => itemFind.product_code === item.product_code)
        if (!finded) {
          this.product.push({
            product_code: item.product_code,
            category_name: item.category_name,
            type_name: item.type_name,
            style_name: item.style_name,
            num: 1
          })
        } else {
          this.product = this.product.map((item) => {
            if (item.product_code === finded.product_code) {
              return {
                product_code: item.product_code,
                category_name: item.category_name,
                type_name: item.type_name,
                style_name: item.style_name,
                num: (item.num + 1)
              }
            } else {
              return item
            }
          })
        }
      })
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/productDesignCreate.less";
</style>
