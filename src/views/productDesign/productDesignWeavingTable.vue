<template>
  <div id="productDesignWeavingTable"
    @click.right="goTop"
    v-loading='loading'>
    <div class="head">
      <div class="left">
        <p class="company">{{company_name + '生产任务通知单'}}</p>
        <span><span class="label">联系人:</span>{{linkman}}</span>
        <span><span class="label">联系人电话:</span>{{linkman_tel}}</span>
        <span><span class="label">创建日期:</span>{{create_time}}</span>
      </div>
      <div class="right">
        <img :src="qrCodeUrl"
          alt=""
          ref="qrcodeCanvas"
          class="qrcode">
        <div class="messages">
          <span>扫一扫</span>
          <span>更新生产进度</span>
        </div>
      </div>
    </div>
    <div class="tableBox">
      <div>
        <span>
          <span>订单号</span>
          <span>{{order_code}}</span>
          <span>下单日期</span>
          <span>{{order_time}}</span>
        </span>
        <span>
          <span>订单公司</span>
          <span>{{order_company}}</span>
          <span>负责小组</span>
          <span>{{group_name}}</span>
        </span>
      </div>
      <div>
        <span>
          <span>生产单位</span>
          <span>{{client_name === 'null' ? '仓库' : client_name}}</span>
          <span>总价</span>
          <span>{{total_price|fixedFilter}}{{'元'}}</span>
        </span>
      </div>
      <div>
        <ul class="tables"
          style="width:inherit">
          <li class="title">
            <span>产品信息</span>
            <span class="flex5">
              <span>尺码颜色</span>
              <span class="flex4">

                <span>加工类型</span>
                <span>单价</span>
                <span>数量</span>
                <span>完成日期</span>
              </span>
            </span>
          </li>
          <li v-for="(item,key) in product_info"
            :key="key"
            class="content">
            <span class="tableRow">
              <div>
                {{item.product_code}}<br />{{item.product_type}}
              </div>
            </span>
            <span class="tableRow col flex5">
              <span class="tableColumn"
                v-for="(val,ind) in item.size_info"
                :key="ind">
                <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                <span class="tableRow col flex4">
                  <span class="tableColumn"
                    v-for="(value,index) in val.process_info"
                    :key="index">
                    <span class="tableRow">{{value.type}}</span>
                    <span class="tableRow">{{value.price}}{{'元/条'}}</span>
                    <span class="tableRow">{{value.number}}{{'条'}}</span>
                    <span class="tableRow">{{value.compiled_time}}</span>
                  </span>
                </span>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <ul class="tables">
          <li class="title">
            <span>{{type === '0' ? '原' : '辅'}}料信息</span>
            <span class="flex5">
              <span>{{type === '0' ? '原' : '辅'}}料颜色</span>
              <span class="flex4">{{type === '0' ? '原' : '辅'}}料数量</span>
            </span>
          </li>
          <li v-if="material_info.length === 0">无{{type === '0' ? '原' : '辅'}}料信息</li>
          <li class="content"
            v-for="(item,key) in material_info"
            :key="key">
            <span class="tableRow">{{item.material}}</span>
            <span class="tableRow flex5 col">
              <span class="tableColumn"
                v-for="(val,ind) in item.color_info"
                :key="ind">
                <span class="tableRow">{{val.color}}</span>
                <span class="flex4 tableRow">{{type === '0' ? val.number.toFixed(2) : Math.ceil(val.number)}}{{val.unit}}</span>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="remark">
        <span>
          <span>备注</span>
          <span></span>
        </span>
      </div>
    </div>
    <div class="head"
      style="margin-top:80px;">
      <div class="left">
        <p class="company">{{company_name + (type === '0' ? '原料' : '辅料') +'调拨单'}}</p>
        <span><span class="label">联系人:</span>{{linkman}}</span>
        <span><span class="label">联系人电话:</span>{{linkman_tel}}</span>
        <span><span class="label">创建日期:</span>{{create_time}}</span>
      </div>
      <div class="right">
        <img :src="qrCodeUrl"
          alt=""
          ref="qrcodeCanvas"
          class="qrcode">
        <div class="messages">
          <span>扫一扫</span>
          <span>调取{{type === '1' ? '辅料' : '原料'}}库存</span>
        </div>
      </div>
    </div>
    <div class="tableBox">
      <div>
        <span>
          <span>订单号</span>
          <span>{{order_code}}</span>
          <span>下单日期</span>
          <span>{{order_time}}</span>
        </span>
        <span>
          <span>订单公司</span>
          <span>{{order_company}}</span>
          <span>负责小组</span>
          <span>{{group_name}}</span>
        </span>
      </div>
      <div>
        <span>
          <span>生产单位</span>
          <span>{{client_name === 'null' ? '仓库' : client_name}}</span>
          <span>总价</span>
          <span>{{total_price|fixedFilter}}{{'元'}}</span>
        </span>
      </div>
      <div>
        <ul class="tables"
          style="width:inherit">
          <li class="title">
            <span>产品信息</span>
            <span class="flex5">
              <span>尺码颜色</span>
              <span class="flex4">

                <span>加工类型</span>
                <span>单价</span>
                <span>数量</span>
                <span>完成日期</span>
              </span>
            </span>
          </li>
          <li v-for="(item,key) in product_info"
            :key="key"
            class="content">
            <span class="tableRow">
              <div>
                {{item.product_code}}<br />{{item.product_type}}
              </div>
            </span>
            <span class="tableRow col flex5">
              <span class="tableColumn"
                v-for="(val,ind) in item.size_info"
                :key="ind">
                <span class="tableRow">{{val.size}}{{'/'}}{{val.color}}</span>
                <span class="tableRow col flex4">
                  <span class="tableColumn"
                    v-for="(value,index) in val.process_info"
                    :key="index">
                    <span class="tableRow">{{value.type}}</span>
                    <span class="tableRow">{{value.price}}{{'元/条'}}</span>
                    <span class="tableRow">{{value.number}}{{'条'}}</span>
                    <span class="tableRow">{{value.compiled_time}}</span>
                  </span>
                </span>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <ul class="tables">
          <li class="title">
            <span>{{type === '0' ? '原' : '辅'}}料信息</span>
            <span class="flex5">
              <span>{{type === '0' ? '原' : '辅'}}料颜色</span>
              <span class="flex4">{{type === '0' ? '原' : '辅'}}料数量</span>
            </span>
          </li>
          <li v-if="material_info.length === 0">无{{type === '0' ? '原' : '辅'}}料信息</li>
          <li class="content"
            v-for="(item,key) in material_info"
            :key="key">
            <span class="tableRow">{{item.material}}</span>
            <span class="tableRow flex5 col">
              <span class="tableColumn"
                v-for="(val,ind) in item.color_info"
                :key="ind">
                <span class="tableRow">{{val.color}}</span>
                <span class="flex4 tableRow">{{type === '0' ? val.number.toFixed(2) : Math.ceil(val.number)}}{{val.unit}}</span>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="remark">
        <span>
          <span>备注</span>
          <span></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail, authList, productionDetail, weaveDetail, halfProductDetail, clientList, companyInfoDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      company_name: '',
      process_code: '',
      create_time: '',
      order_code: '',
      order_time: '',
      order_company: '',
      group_name: '',
      client_name: '',
      linkman_tel: '',
      linkman: '',
      total_price: 0,
      product_info: [],
      material_info: [],
      qrCodeUrl: ''
    }
  },
  filters: {
    fixedFilter (item) {
      return Number(item).toFixed(2)
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    },
    getMaterial () {
      productionDetail({
        order_id: this.$route.params.id
      }).then(res => {
        let data = res.data.data
        this.product_info.forEach(item => {
          item.size_info.forEach(value => {
            let sunhao = data.production_detail.product_info.find(index => (index.product_code === item.product_code && index.size === value.size && index.color === value.color))
            if (sunhao) {
              item.sunhao = sunhao.production_sunhao
              value.plan_number = sunhao.total_num
              value.order_number = sunhao.order_num
            }
            value.process_info.forEach(val => {
              if (data.product_plan[item.product_code]) {
                data.product_plan[item.product_code].forEach(index => {
                  if (index.size === value.size && index.color_match_name === value.color && index.type === Number(this.type)) {
                    let flag = this.material_info.find(key => key.material === index.material_name)
                    if (!flag) {
                      this.material_info.push({
                        material: index.material_name,
                        color_info: [{
                          color: index.color_name,
                          unit: (index.unit === '克' || index.unit === 'g') ? 'kg' : index.unit,
                          number: (index.unit === '克' || index.unit === 'g') ? (index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100)) / 1000 : (this.type === '0' ? index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100) : index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100))
                        }]
                      })
                    } else {
                      let flag1 = flag.color_info.find(key => key.color === index.color_name)
                      if (!flag1) {
                        flag.color_info.push({
                          color: index.color_name,
                          unit: (index.unit === '克' || index.unit === 'g') ? 'kg' : index.unit,
                          number: (index.unit === '克' || index.unit === 'g') ? (index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100)) / 1000 : (this.type === '0' ? index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100) : index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100))
                        })
                      } else {
                        flag1.number = Number(flag1.number) + Number((index.unit === '克' || index.unit === 'g') ? (index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100)) / 1000 : (this.type === '0' ? index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100) : index.number * value.order_number * (val.number / value.plan_number) * (1 + item.sunhao / 100)))
                      }
                    }
                  }
                })
              }
            })
          })
        })
        this.loading = false
      })
    }
  },
  created () {
    let date = new Date()
    this.create_time = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
    // 获取类型
    this.type = this.$route.params.type
    // 获取公司
    this.client_name = this.$route.params.clientName
    // 获取数据
    if (this.type === '0') {
      weaveDetail({
        order_id: this.$route.params.id
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          if (item.client_name === this.client_name && item.product_info.product_code === this.$route.params.product_code) {
            let flag = this.product_info.find(val => val.product_code === item.product_info.product_code)
            if (!flag) {
              this.total_price += item.price * item.number
              let type = item.product_info.category_name + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_name ? '/' + item.product_info.flower_name : '')
              this.product_info.push({
                product_code: item.product_info.product_code,
                product_type: type,
                size_info: [{
                  size: item.size,
                  color: item.color,
                  process_info: [{
                    type: item.type ? item.type : '织造',
                    price: item.price,
                    number: item.number,
                    compiled_time: item.complete_time.split(' ')[0]
                  }]
                }]
              })
            } else {
              this.total_price += item.price * item.number
              let flag1 = flag.size_info.find(val => (val.size === item.size && val.color === item.color))
              if (!flag1) {
                flag.size_info.push({
                  size: item.size,
                  color: item.color,
                  process_info: [{
                    type: item.type ? item.type : '织造',
                    price: item.price,
                    number: item.number,
                    compiled_time: item.complete_time.split(' ')[0]
                  }]
                })
              } else {
                let flag2 = flag1.process_info.find(val => ((val.type === item.type || (val.type === '织造' && item.type === undefined)) && val.price === item.price && val.compiled_time === item.complete_time.split(' ')[0]))
                if (!flag2) {
                  flag1.process_info.push({
                    type: item.type ? item.type : '织造',
                    price: item.price,
                    number: item.number,
                    compiled_time: item.complete_time.split(' ')[0]
                  })
                } else {
                  flag2.number = Number(flag2.number) + Number(item.number)
                }
              }
            }
          }
        })
        this.getMaterial()
      })
    } else if (this.type === '1') {
      halfProductDetail({
        order_id: this.$route.params.id
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          if (item.client_name === this.client_name && item.product_info.product_code === this.$route.params.product_code) {
            let flag = this.product_info.find(val => val.product_code === item.product_info.product_code)
            if (!flag) {
              this.total_price += item.price * item.number
              let type = item.product_info.category_info.product_category + '/' + item.product_info.type_name + '/' + item.product_info.style_name + (item.product_info.flower_name ? '/' + item.product_info.flower_name : '')
              this.product_info.push({
                product_code: item.product_info.product_code,
                product_type: type,
                size_info: [{
                  size: item.size,
                  color: item.color,
                  process_info: [{
                    type: item.type ? item.type : '织造',
                    price: item.price,
                    number: item.number,
                    compiled_time: item.complete.split(' ')[0]
                  }]
                }]
              })
            } else {
              this.total_price += item.price * item.number
              let flag1 = flag.size_info.find(val => (val.size === item.size && val.color === item.color))
              if (!flag1) {
                flag.size_info.push({
                  size: item.size,
                  color: item.color,
                  process_info: [{
                    type: item.type ? item.type : '织造',
                    price: item.price,
                    number: item.number,
                    compiled_time: item.complete.split(' ')[0]
                  }]
                })
              } else {
                let flag2 = flag1.process_info.find(val => ((val.type === item.type || (val.type === '织造' && item.type === undefined)) && val.price === item.price && val.compiled_time === item.complete.split(' ')[0]))
                if (!flag2) {
                  flag1.process_info.push({
                    type: item.type ? item.type : '织造',
                    price: item.price,
                    number: item.number,
                    compiled_time: item.complete.split(' ')[0]
                  })
                } else {
                  flag2.number = Number(flag2.number) + Number(item.number)
                }
              }
            }
          }
        })
        this.getMaterial()
      })
    }
    Promise.all([
      orderDetail({
        id: this.$route.params.id
      }), authList({
        company_id: window.sessionStorage.getItem('company_id')
      }), clientList({
        company_id: window.sessionStorage.getItem('company_id')
      }), companyInfoDetail({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then(res => {
      // 初始化订单信息
      this.order_code = res[0].data.data.order_code
      this.group_name = res[0].data.data.group_name
      this.order_company = res[0].data.data.client_name
      this.order_time = res[0].data.data.order_time
      // 初始化联系人信息
      let linkman = res[1].data.data.find(val => val.id === window.sessionStorage.getItem('user_id'))
      this.linkman = linkman.name
      this.linkman_tel = linkman.mobile
      // 将公司名称转为简称
      let clientList = res[2].data.data
      this.order_company = clientList.find(val => val.name === this.order_company).abbreviation || this.order_company
      this.company_name = res[3].data.data.company_name
    })
  },
  mounted () {
    const QRCode = require('qrcode')
    this.urlVal = window.location.origin + '/index/rawMaterialStockDetail/' + this.$route.params.id + '/' + this.$route.params.type
    // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
    QRCode.toDataURL(this.urlVal, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      this.qrCodeUrl = url
    })
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/css/productDesignWeavingTable.less";
</style>
<style lang="less">
html {
  overflow: visible;
}
body {
  overflow: visible;
}
</style>
