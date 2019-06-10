<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  margin: 0;
  height: 100%;
  min-width: 1366px;
  overflow-x: auto;
}
#app {
  height: 100%;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: transparent;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  height: 4px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.1);
}
// 注册页面select下拉框样式修改
#register {
  .el-select-dropdown__item span {
    color: #666;
    font-size: 16px;
    font-family: "systemfont";
  }
}
// 左侧菜单栏一级菜单鼠标移入修改背景颜色
.el-submenu__title {
  &:hover {
    background: #006bac !important;
  }
}
// 颜色下拉选择框的样式
.el-select-dropdown__item {
  display: flex;
  align-items: center;
  .bgBlock {
    width: 40px;
    height: 20px;
    margin-right: 10px;
  }
}
// 定义所有elment输入框的样式
.el-input__inner {
  font-family: "systemfont";
  border-color: #e6e6e6 !important;
  color: #666 !important;
  &:hover {
    border-color: #b5b5b5 !important;
  }
  &:focus {
    border-color: #1a95ff !important;
  }
}
.el-textarea__inner {
  font-family: "systemfont";
  color: #666 !important;
}
.el-select-dropdown__wrap {
  font-family: "systemfont";
  font-weight: 300;
  color: #666;
}
.el-select-dropdown__item {
  color: #666;
}
.el-select-dropdown__item.selected {
  font-weight: 400 !important;
}
.el-input-group__prepend {
  color: #666 !important;
}
.el-input-group__append {
  color: #666 !important;
}
// 修改分页组件的样式
.el-pager {
  font-family: "systemfont";
  font-weight: 400;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #1a95ff !important;
}
// 消息提示框
.el-message-box {
  font-family: "systemfont";
  font-weight: 300;
}
.el-button {
  font-family: "systemfont";
  font-weight: 300;
}
</style>
