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
        path: 'productUpdate/:id',
        name: 'productUpdate',
        component: () => import('./views/product/productUpdate.vue')
      }, {
        path: 'productCreate',
        name: 'productCreate',
        component: () => import('./views/product/productCreate.vue')
      }, {
        path: 'productList',
        name: 'productList',
        component: () => import('./views/product/productList.vue')
      }, {
        path: 'productSetting',
        name: 'productSetting',
        component: () => import('./views/product/productSetting.vue')
      }, {
        path: 'designFormCreate/:id',
        name: 'designFormCreate',
        component: () => import('./views/designForm/designFormCreate.vue')
      }, {
        path: 'designFormSetting',
        name: 'designFormSetting',
        component: () => import('./views/designForm/designFormSetting.vue')
      }, {
        path: 'designFormList',
        name: 'designFormList',
        component: () => import('./views/designForm/designFormList.vue')
      }, {
        path: 'designFormAdd',
        name: 'designFormAdd',
        component: () => import('./views/designForm/productList.vue')
      }, {
        path: 'productPlan/:id',
        name: 'productPlan',
        component: () => import('./views/designForm/productPlan.vue')
      }, {
        path: 'personManage',
        name: 'personManage',
        component: () => import('./views/self/personManage.vue')
      }, {
        path: 'canvas',
        name: 'canvas',
        component: () => import('./views/designForm/designCanvas.vue')
      }, {
        path: 'sampleCreate',
        name: 'sampleCreate',
        component: () => import('./views/order/sampleCreate.vue')
      }, {
        path: 'sampleList',
        name: 'sampleList',
        component: () => import('./views/order/sampleList.vue')
      }, {
        path: 'orderCreate',
        name: 'orderCreate',
        component: () => import('./views/order/orderCreate.vue')
      }, {
        path: 'orderList',
        name: 'orderList',
        component: () => import('./views/order/orderList.vue')
      }, {
        path: 'orderAdd',
        name: 'orderAdd',
        component: () => import('./views/order/productList.vue')
      }]
    }
  ]
})
