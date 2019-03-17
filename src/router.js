import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    }, {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    }, {
      path: '/changePsd',
      name: 'changePsd',
      component: () => import('./views/changePsd.vue')
    }, {
      path: '/index',
      name: 'index',
      component: () => import('./views/index.vue'),
      children: [{
        path: 'productDetail/:id',
        name: 'productDetail',
        component: () => import('./views/product/productDetail.vue')
      }, {
        path: 'productCreate',
        name: 'productCreate',
        component: () => import('./views/product/productCreate.vue')
      }, {
        path: 'productList',
        name: 'productList',
        component: () => import('./views/product/productList.vue')
      }, {
        path: 'sampleCreate',
        name: 'sampleCreate',
        component: () => import('./views/product/sampleCreate.vue')
      }, {
        path: 'sampleList',
        name: 'sampleList',
        component: () => import('./views/product/sampleList.vue')
      }, {
        path: 'productSetting',
        name: 'productSetting',
        component: () => import('./views/product/productSetting.vue')
      }, {
        path: 'personManage',
        name: 'personManage',
        component: () => import('./views/self/personManage.vue')
      }]
    }
  ]
})
