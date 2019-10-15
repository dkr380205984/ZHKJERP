<template>
  <div id="mainMaterialStockDetail"
    v-loading='loading'>
    <div class="head">
      <h2>物料库存详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">所在仓库:</span>
          <span class="content">{{materialInfo.stock_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">物料名称:</span>
          <span class="content">{{ materialInfo.material_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">物料颜色:</span>
          <span class="content">{{materialInfo.material_color}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">物料属性:</span>
          <span class="content">{{materialInfo.material_attribute?materialInfo.material_attribute:'无'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">缸号:</span>
          <span class="content">{{materialInfo.vat_code?materialInfo.vat_code:'无'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">物料库存:</span>
          <span class="content">{{materialInfo.total_weight}}千克</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建时间:</span>
          <span class="content">{{materialInfo.created_at}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新时间:</span>
          <span class="content">{{materialInfo.updated_at}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">备注信息:</span>
          <span class="content">{{materialInfo.desc?materialInfo.desc:'暂无备注信息'}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新日志:</span>
          <span class="content">
            <ul class="tableBox">
              <li class="title">
                <span style="flex:1">时间</span>
                <span>操作</span>
                <span>重量</span>
                <span>操作人</span>
              </li>
              <li class="list"
                v-for="(item,key) in list"
                :key="key">
                <span style="flex:1">{{item.time}}</span>
                <span>{{item.action}}</span>
                <span :style="{'color':item.style}">{{item.weight + item.unit}}</span>
                <span>{{item.user_name}}</span>
              </li>
            </ul>
          </span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="content btn">
            <span class="goBack"
              @click="$router.go(-1)">返回</span>
            <span class="change"
              @click="$router.push('/index/mainMaterialStockChange/' + $route.params.id)">修改</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stockMaterialDetail, clientList } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      stock_name: '',
      list: [],
      weight: 5000,
      materialInfo: {
        created_at: '',
        material_attribute: '',
        material_color: '',
        material_name: '',
        total_weight: '',
        updated_at: '',
        vat_code: ''
      },
      actionArr: ['全部', '预定购入库', '加工出库', '订购入库', '生产出库', '订购入库', '', '', '取消订单']
    }
  },
  methods: {
  },
  mounted () {
    Promise.all([
      stockMaterialDetail({
        stock_id: this.$route.params.stockId,
        material_id: this.$route.params.id,
        action: null
      }),
      clientList({
        company_id: window.sessionStorage.getItem('company_id')
      })
    ]).then((res) => {
      this.materialInfo = res[0].data.data.material_info
      this.list = res[0].data.data.detail.map((item) => {
        return {
          time: item.create_time,
          unit: '千克',
          action: this.actionArr[item.action],
          style: item.action === 1 || item.action === 3 || item.action === 5 || item.action === 8 ? '#67c23a' : '#F56C6C',
          weight: item.action_weight,
          user_name: item.user_name
        }
      })
      if (this.$route.params.stockId === '0') {
        this.stock_name = '本厂'
      } else {
        this.stock_name = res[1].data.data.find(item => item.id === this.$route.params.stockId).name
      }
      this.loading = false
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/mainMaterialStockDetail.less";
</style>
