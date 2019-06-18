import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mycomponent from './components'
// 粒子特效 文档地址：https://www.jianshu.com/p/53199b842d25
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.use(mycomponent)

Vue.config.productionTip = false
// 列表滚动指令
Vue.directive('scroll', {
  inserted: (el, x, y) => {
    // console.log('已绑定scroll')
    let self = y.context
    el.addEventListener('mousewheel', function (e) {
      // console.log(e.wheelDelta)
      // console.log(self.pages)
      if (e.wheelDelta > 0 && (self.pages > 1)) {
        // console.log('下一页')
        --self.pages
        x.value.fun()
      } else if (e.wheelDelta < 0 && (self.pages) < Math.ceil(self.total / x.value.pageSize)) {
        // console.log('上一页')
        ++self.pages
        x.value.fun()
      } else {
        // console.log('没有触发')
      }
    }, false)
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
