<template>
  <div id="mainMaterialStockDetail">
    <div class="head">
      <h2>原料库存详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料名称:</span>
          <span class="content">{{materialInfo.material_name}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料颜色:</span>
          <span class="content">{{materialInfo.material_color}}</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料属性:</span>
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
          <span class="label">原料库存:</span>
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
                <span  style="flex:1">{{item.time}}</span>
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
import { materialStockDetail } from '@/assets/js/api.js'
export default {
  data () {
    return {
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
      actionArr: ['全部', '预定购入库', '加工出库', '订购入库', '生产出库', '订购入库']
    }
  },
  methods: {
  },
  mounted () {
    materialStockDetail({
      stock_id: this.$route.params.id,
      action: null
    }).then((res) => {
      console.log(res)
      this.materialInfo = res.data.data.data_stock
      this.list = res.data.data.data_detail.map((item) => {
        return {
          time: item.create_time,
          unit: '千克',
          action: this.actionArr[item.action],
          style: item.action === 1 || item.action === 3 || item.action === 5 ? '#67c23a' : '#F56C6C',
          weight: item.action_weight,
          user_name: item.user_name
        }
      })
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/mainMaterialStockDetail.less";
</style>
