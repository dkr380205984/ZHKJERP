<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html,body{
  margin: 0;
  height: 100%;
}
#app{
  height: 100%;
}
// 注册页面select下拉框样式修改
#register{
 .el-select-dropdown__item span{
    color:#666;
    font-size:16px;
    font-family: 'systemfont';
  }
}
</style>
