/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mycomponent from './components'
// 粒子特效 文档地址：https://www.jianshu.com/p/53199b842d25
import VueParticles from 'vue-particles'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/sunburst'

import EleMultiCascader from 'ele-multi-cascader'
import 'ele-multi-cascader/dist/cascader.css'
Vue.use(EleMultiCascader)
Vue.component('echarts', ECharts)
Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.use(mycomponent)

Vue.config.productionTip = false
// 列表滚动指令
Vue.directive('scroll', {
  // 执行window监听事件因此只要绑定一次
  bind: (el, binding, vnode) => {
    let self = vnode.context
    window.addEventListener('keydown', function (e) {
      if (e.target.tagName !== 'INPUT' && e.keyCode === 37 && self.pages > 1) {
        --self.pages
        binding.value.fun()
      } else if (e.target.tagName !== 'INPUT' && e.keyCode === 39 && (self.pages < Math.ceil(self.total / binding.value.pageSize))) {
        ++self.pages
        binding.value.fun()
      }
    }, false)
  }
})
Vue.directive('getHash', {
  // 当被绑定的元素插入到 DOM 中时……
  update: function (el, binding, vnode) {
    // 聚焦元素
    window.location.hash = encodeURIComponent(JSON.stringify(binding.value))
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
