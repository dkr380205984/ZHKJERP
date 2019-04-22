import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/designFormTable/:id',
    name: 'designFormTable',
    component: () => import('./views/designForm/designFormTable.vue')
  }, {
    path: '/productDesignTable/:id',
    name: 'productDesignTable',
    component: () => import('./views/productDesign/productDesignTable.vue')
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
      path: 'productPlanAdd',
      name: 'productPlanAdd',
      component: () => import('./views/productPlan/productList.vue')
    }, {
      path: 'productPlanCreate/:id',
      name: 'productPlanCreate',
      component: () => import('./views/productPlan/productPlanCreate.vue')
    }, {
      path: 'personManage',
      name: 'personManage',
      component: () => import('./views/self/personManage.vue')
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
    }, {
      path: 'orderStat',
      name: 'orderStat',
      component: () => import('./views/order/orderStat.vue')
    }, {
      path: 'foreignTradeCreate',
      name: 'foreignTradeCreate',
      component: () => import('./views/foreignTrade/foreignTradeCreate.vue')
    }, {
      path: 'foreignTradeDetail/:id',
      name: 'foreignTradeDetail',
      component: () => import('./views/foreignTrade/foreignTradeDetail.vue')
    }, {
      path: 'foreignTradeList',
      name: 'foreignTradeList',
      component: () => import('./views/foreignTrade/foreignTradeList.vue')
    }, {
      path: 'foreignTradeUpdate',
      name: 'foreignTradeUpdate',
      component: () => import('./views/foreignTrade/foreignTradeUpdate.vue')
    }, {
      path: 'designFormDetail/:id',
      name: 'designFormDetail',
      component: () => import('./views/designForm/designFormDetail.vue')
    }, {
      path: 'productPlanList',
      name: 'productPlanList',
      component: () => import('./views/productPlan/productPlanList.vue')
    }, {
      path: 'productPlanDetail/:id',
      name: 'productPlanDetail',
      component: () => import('./views/productPlan/productPlanDetail.vue')
    }, {
      path: 'mainMaterialStockCreate',
      name: 'mainMaterialStockCreate',
      component: () => import('./views/stock/mainMaterialStockCreate.vue')
    }, {
      path: 'mainMaterialStockList',
      name: 'mainMaterialStockList',
      component: () => import('./views/stock/mainMaterialStockList.vue')
    }, {
      path: 'mainMaterialStockDetail/:id',
      name: 'mainMaterialStockDetail',
      component: () => import('./views/stock/mainMaterialStockDetail.vue')
    }, {
      path: 'otherMaterialStockCreate',
      name: 'otherMaterialStockCreate',
      component: () => import('./views/stock/otherMaterialStockCreate.vue')
    }, {
      path: 'otherMaterialStockList',
      name: 'otherMaterialStockList',
      component: () => import('./views/stock/otherMaterialStockList.vue')
    }, {
      path: 'otherMaterialStockDetail/:id',
      name: 'otherMaterialStockDetail',
      component: () => import('./views/stock/otherMaterialStockDetail.vue')
    }, {
      path: 'stockProductList',
      name: 'stockProductList',
      component: () => import('./views/stock/productList.vue')
    }, {
      path: 'productStockCreate/:id',
      name: 'productStockCreate',
      component: () => import('./views/stock/productStockCreate.vue')
    }, {
      path: 'productStockList',
      name: 'productStockList',
      component: () => import('./views/stock/productStockList.vue')
    }, {
      path: 'productStockDetail/:id',
      name: 'productStockDetail',
      component: () => import('./views/stock/productStockDetail.vue')
    }, {
      path: 'productDesignCreate/:id',
      name: 'productDesignCreate',
      component: () => import('./views/productDesign/productDesignCreate.vue')
    }, {
      path: 'productDesignDetail/:id',
      name: 'productDesignDetail',
      component: () => import('./views/productDesign/productDesignDetail.vue')
    }, {
      path: 'productDesignList',
      name: 'productDesignList',
      component: () => import('./views/productDesign/productDesignList.vue')
    }, {
      path: 'productDesignCreateList',
      name: 'productDesignCreateList',
      component: () => import('./views/productDesign/productDesignCreateList.vue')
    }, {
      path: 'rawMaterialPurchase',
      name: 'rawMaterialPurchase',
      component: () => import('./views/rawMaterial/rawMaterialPurchase.vue')
    }, {
      path: 'rawMaterialPlan/:orderId/:productId',
      name: 'rawMaterialPlan',
      component: () => import('./views/rawMaterial/rawMaterialPlan.vue')
    }, {
      path: 'rawMaterialStat/:id',
      name: 'rawMaterialStat',
      component: () => import('./views/rawMaterial/rawMaterialStat.vue')
    }]
  }
  ]
})
