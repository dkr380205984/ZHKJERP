<template>
  <div id="productPlanTable"
    @click.right="goTop"
    v-loading='loading'>
    <div class="head">
      <div class="left">
        <p class="company">{{company_name + '配料单'}}</p>
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
          <span>查看配料单</span>
        </div>
      </div>
    </div>
    <div class="tableBox">
      <div class="pro-info">
        <span>
          <span>产品编号</span>
          <span>{{product_info.product_code}}</span>
          <span>产品名称</span>
          <span>{{product_info.sample_title}}</span>
        </span>
        <span>
          <span>产品品类</span>
          <span>{{product_info|filterType}}</span>
          <span>产品成分</span>
          <span>{{product_info|filterMaterial}}</span>
        </span>
        <span>
          <span>产品配色</span>
          <span>{{product_info.color|filterColor}}</span>
        </span>
        <span style="height:120px;">
          <span>产品描述</span>
          <span style="align-items:flex-start;padding:20px">{{product_info.description}}</span>
        </span>
      </div>
      <div class="size-info"
        v-for="(itemSize,keySize) in info"
        :key="keySize">
        <div class="head">
          <span class="color">{{itemSize.size + '/' + itemSize.color}}</span>
          <span class="weightBox">
            <span class="size">尺码：{{itemSize.size_info}}</span>
            <span class="weight">克重：{{itemSize.weight}}g</span>
          </span>
        </div>
        <div class="content">
          <div class="content-item"
            v-for="(itemMat,keyMat) in itemSize.material_info"
            :key="keyMat">
            <div class="material">{{itemMat.material}}</div>
            <span class="material-info">
              <span class="onLine"
                v-for="item in Math.ceil(itemMat.color_info.length / 4)"
                :key="item">
                <span>
                  <div>{{itemMat.color_info[(item-1)*4].number + itemMat.color_info[(item-1)*4].unit}}</div>
                  <div>{{itemMat.color_info[(item-1)*4].color}}</div>
                </span>
                <span>
                  <div>{{itemMat.color_info[(item-1)*4 + 1] ? itemMat.color_info[(item-1)*4 + 1].number + itemMat.color_info[(item-1)*4 + 1].unit : ''}}</div>
                  <div>{{itemMat.color_info[(item-1)*4 + 1] ? itemMat.color_info[(item-1)*4 + 1].color : ''}}</div>
                </span>
                <span>
                  <div>{{itemMat.color_info[(item-1)*4 + 2] ? itemMat.color_info[(item-1)*4 + 2].number + itemMat.color_info[(item-1)*4 + 2].unit : ''}}</div>
                  <div>{{itemMat.color_info[(item-1)*4 + 2] ? itemMat.color_info[(item-1)*4 + 2].color : ''}}</div>
                </span>
                <span>
                  <div>{{itemMat.color_info[(item-1)*4 + 3] ? itemMat.color_info[(item-1)*4 + 3].number + itemMat.color_info[(item-1)*4 + 3].unit : ''}}</div>
                  <div>{{itemMat.color_info[(item-1)*4 + 3] ? itemMat.color_info[(item-1)*4 + 3].color : ''}}</div>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="remark">
        <span>
          <span>备注:</span>
          <span></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { productPlanOne, authList, companyInfoDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      company_name: '',
      product_info: {
        category_info: {
          product_category: '',
          unit: ''
        },
        materials: [],
        color: []
      },
      info: [],
      linkman: '',
      linkman_tel: '',
      create_time: '',
      qrCodeUrl: ''
    }
  },
  methods: {
    goTop () {
      document.body.scrollTop = 0
    }
  },
  created () {
    // 获取当前日期
    let date = new Date()
    this.create_time = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
    Promise.all([
      productPlanOne({
        id: this.$route.params.productId
      }), authList({
        company_id: window.sessionStorage.getItem('company_id')
      }), companyInfoDetail({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then((res) => {
      let data = res[0].data.data
      this.product_info = data.product_info
      let material = [] // 存入处理好的数据
      // 对数据扁平化
      let materialInfo = []
      data.material_data.forEach(valMate => {
        valMate.colour.forEach(valProColor => {
          valProColor.color.forEach(valMatColor => {
            valMatColor.size.forEach(valSize => {
              materialInfo.push({
                size: valSize.size,
                proColor: valProColor.name,
                materialColor: valMatColor.name,
                number: valSize.number,
                unit: valSize.unit,
                material: valMate.material,
                remark: valMate.remark,
                type: valMate.type
              })
            })
          })
        })
      })
      // 对扁平化的数据处理合并
      materialInfo.forEach(item => {
        let sizeColorFlag = material.find(vals => (vals.size === item.size && vals.color === item.proColor))
        if (!sizeColorFlag) {
          material.push({
            size: item.size,
            color: item.proColor,
            material_info: [{
              material: item.material,
              color_info: [{
                color: item.materialColor,
                number: item.number,
                unit: item.unit
              }]
            }]
          })
        } else {
          let materialFlag = sizeColorFlag.material_info.find(vals => vals.material === item.material)
          if (!materialFlag) {
            sizeColorFlag.material_info.push({
              material: item.material,
              color_info: [{
                color: item.materialColor,
                number: item.number,
                unit: item.unit
              }]
            })
          } else {
            let colorFlag = materialFlag.color_info.find(vals => vals.color === item.materialColor)
            if (!colorFlag) {
              materialFlag.color_info.push({
                color: item.materialColor,
                number: item.number,
                unit: item.unit
              })
            } else {
              colorFlag.number = Number(colorFlag.number ? colorFlag.number : 0) + Number(item.number ? item.number : 0)
            }
          }
        }
      })
      // 处理好的数据加入尺寸信息及克重信息
      this.product_info.size.forEach(valSize => {
        material.forEach(itemSize => {
          if (valSize.measurement === itemSize.size) {
            itemSize.size_info = valSize.size_info
            itemSize.weight = valSize.weight
          }
        })
      })
      this.info = material
      // 初始化联系人信息
      let linkman = res[1].data.data.find(val => val.id === window.sessionStorage.getItem('user_id'))
      this.linkman = linkman.name
      this.linkman_tel = linkman.mobile
      // 初始化公司名称
      this.company_name = res[2].data.data.company_name
    })
  },
  updated () {
    this.loading = false
  },
  filters: {
    filterType (item) {
      return item.category_info.product_category + '/' + item.type_name + '/' + item.style_name + '/' + item.flower_id
    },
    filterMaterial (item) {
      return item.materials.map(items => {
        return items.ingredient_value + '%' + items.ingredient_name
      }).join('/')
    },
    filterColor (item) {
      return item.map(items => {
        return items.color_name
      }).join('/')
    }
  },
  mounted () {
    const QRCode = require('qrcode')
    // window.location.origin +
    this.urlVal = window.location.origin + '/index/productPlanDetail/' + this.$route.params.productId
    // 画二维码里的logo[注意添加logo图片的时候需要使用服务器]
    QRCode.toDataURL(this.urlVal, { errorCorrectionLevel: 'H' }, (err, url) => {
      console.log(err)
      this.qrCodeUrl = url
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/productPlanTable.less";
</style>
<style lang="less">
html,
body {
  overflow: visible !important;
}
</style>
