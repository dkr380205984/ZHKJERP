<template>
  <div id="foreignTradeDetail">
    <div class="head">
      <h2>外贸公司详情</h2>
    </div>
    <div class="body">
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司名称:</span>
          <span class="content">随便写点</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司简称:</span>
          <span class="content">随便写点</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">合作状态:</span>
          <span class="content">合作中</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司人员:</span>
          <div class="specialTable">
            <div class="tableHead">
              <div class="once">姓名</div>
              <div class="once">职务</div>
              <div class="once">联系号码</div>
              <div class="once">登录密码</div>
              <div class="once">状态</div>
            </div>
            <div class="tableBody">
              <div class="line">
                <div class="once">姓名</div>
                <div class="once">财务</div>
                <div class="once">联系号码</div>
                <div class="once">登录密码</div>
                <div class="once">状态</div>
              </div>
              <div class="line">
                <div class="once">姓名</div>
                <div class="once">财务</div>
                <div class="once">联系号码</div>
                <div class="once">登录密码</div>
                <div class="once">状态</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">联系电话:</span>
          <span class="content">随便写点</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">公司地址:</span>
          <span class="content">随便写点</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">创建时间:</span>
          <span class="content">随便写点</span>
        </div>
      </div>
      <div class="lineCtn">
        <div class="inputCtn">
          <span class="label">更新时间:</span>
          <span class="content">随便写点</span>
        </div>
      </div>
      <div class="btnCtn">
        <div class="cancleBtn" @click="$router.go(-1)">返回</div>
        <div class="okBtn">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    clearAll () {

    },
    saveAll () {

    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/foreignTradeDetail.less';
</style>
