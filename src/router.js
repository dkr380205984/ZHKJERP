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
    }
  ]
})
