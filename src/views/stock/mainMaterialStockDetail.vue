<template>
  <div id="mainMaterialStockDetail">
    <div class="head">
      <h2>原料库存详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料名称:</span>
          <span class="content">52支上光晴纶</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料颜色:</span>
          <span class="content">白胚</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料属性:</span>
          <span class="content">常规</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料缸号:</span>
          <span class="content">1</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">原料重量:</span>
          <span class="content">200g</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">存放仓库:</span>
          <span class="content">桐庐凯瑞针纺1号仓</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建时间:</span>
          <span class="content">2018-04-22</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新时间:</span>
          <span class="content">2019-04-22</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">备注信息:</span>
          <span class="content">暂无备注信息</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新日志:</span>
          <span class="content">
            <ul class="tableBox">
              <li class="title">
                <span>时间</span>
                <span>操作</span>
                <span>重量</span>
                <span>结余</span>
              </li>
              <li class="list"
                  v-for="(item,key) in list"
                  :key="key">
                <span>{{item.time}}</span>
                <span>{{item.type === 1 ? '存入' : '调取'}}</span>
                <span>{{(item.type !== 1 ? '-' : '+') + item.weight + item.unit}}</span>
                <span v-once>{{change(item.type,item.weight) + 'g'}}</span>
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
export default {
  data () {
    return {
      list: [
        {
          time: '2019-04-22-16:31',
          type: 1,
          weight: 200,
          unit: 'g'
        },
        {
          time: '2019-04-23-13:22',
          type: 0,
          weight: 200,
          unit: 'g'
        },
        {
          time: '2019-04-23-13:22',
          type: 0,
          weight: 200,
          unit: 'g'
        },
        {
          time: '2019-04-23-13:22',
          type: 0,
          weight: 200,
          unit: 'g'
        }
      ],
      weight: 5000
    }
  },
  methods: {
    change (type, key) {
      if (type === 1) {
        this.weight += key
      } else {
        this.weight -= key
      }
      return this.weight
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/css/mainMaterialStockDetail.less";
</style>
