import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 路由守卫
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/tagPrint/:id/:size/:color',
    name: 'tagPrint',
    component: () => import('./views/product/tagPrint.vue')
  }, {
    path: '/priceListTable/:id',
    name: 'priceListTable',
    component: () => import('./views/product/priceListTable.vue')
  }, {
    path: '/rawMaterialProcessTable/:id/:companyName/:type',
    name: 'rawMaterialProcessTable',
    component: () => import('./views/rawMaterial/rawMaterialProcessTable.vue')
  }, {
    path: '/packagMaterialTable/:orderId/:clientId/:time',
    name: 'packagMaterialTable',
    component: () => import('./views/packaging/packagMaterialTable.vue')
  }, {
    path: '/productDesignWeavingTable/:id/:clientName/:product_code/:type',
    name: 'productDesignWeavingTable',
    component: () => import('./views/productDesign/productDesignWeavingTable.vue')
  },
  {
    path: '/designFormTable/:id',
    name: 'designFormTable',
    component: () => import('./views/designForm/designFormTable.vue')
  }, {
    path: '/productStatisticsTable/:id',
    name: 'productStatisticsTable',
    component: () => import('./views/productDesign/productStatisticsTable.vue')
  }, {
    path: '/productDesignTable/:orderId/:productId',
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
    path: '/screenShipments',
    name: 'screenShipments',
    component: () => import('./views/order/screenShipments.vue')
  }, {
    path: '/screenShipmentsList',
    name: 'screenShipmentsList',
    component: () => import('./views/order/screenShipmentsList.vue')
  }, {
    path: '/productMenu',
    name: 'productMenu',
    component: () => import('./views/product/productMenu.vue')
  }, {
    path: '/index',
    name: 'index',
    component: () => import('./views/index.vue'),
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('./views/self/home.vue')
    }, {
      path: 'priceListCreate',
      name: 'priceListCreate',
      component: () => import('./views/product/priceListCreate.vue')
    }, {
      path: 'priceListDetail/:id',
      name: 'priceListDetail',
      component: () => import('./views/product/priceListDetail.vue')
    }, {
      path: 'priceListList',
      name: 'priceListList',
      component: () => import('./views/product/priceListList.vue')
    }, {
      path: 'priceListUpdate/:id',
      name: 'priceListUpdate',
      component: () => import('./views/product/priceListUpdate.vue')
    }, {
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
      path: 'designFormCreate/:id',
      name: 'designFormCreate',
      component: () => import('./views/designForm/designFormCreateR.vue')
    }, {
      path: 'designFormDetail/:id',
      name: 'designFormDetail',
      component: () => import('./views/designForm/designFormDetailR.vue')
    }, {
      path: 'designFormUpdate/:id',
      name: 'designFormUpdate',
      component: () => import('./views/designForm/designFormUpdateR.vue')
    }, {
      path: 'designFormList',
      name: 'designFormList',
      component: () => import('./views/designForm/designFormList.vue')
    }, {
      path: 'designFormAdd',
      name: 'designFormAdd',
      component: () => import('./views/designForm/productList.vue')
    }, {
      path: 'designFormPlanCreate',
      name: 'designFormPlanCreate',
      component: () => import('./views/designForm/designFormPlanCreate.vue')
    }, {
      path: 'designFormPlanUpdate/:id',
      name: 'designFormPlanUpdate',
      component: () => import('./views/designForm/designFormPlanUpdate.vue')
    }, {
      path: 'designFormPlanDetail/:id',
      name: 'designFormPlanDetail',
      component: () => import('./views/designForm/designFormPlanDetail.vue')
    }, {
      path: 'designFormPlanList',
      name: 'designFormPlanList',
      component: () => import('./views/designForm/designFormPlanList.vue')
    }, {
      path: 'productPlanAdd',
      name: 'productPlanAdd',
      component: () => import('./views/productPlan/productList.vue')
    }, {
      path: 'productPlanUpdate/:productId',
      name: 'productPlanUpdate',
      component: () => import('./views/productPlan/productPlanUpdateR.vue')
    }, {
      path: 'productPlanCreate/:id',
      name: 'productPlanCreate',
      component: () => import('./views/productPlan/productPlanCreateR.vue')
    }, {
      path: 'personManage',
      name: 'personManage',
      component: () => import('./views/self/personManage.vue')
    }, {
      path: 'sampleCreate',
      name: 'sampleCreate',
      component: () => import('./views/sample/sampleCreate.vue')
    }, {
      path: 'sampleList',
      name: 'sampleList',
      component: () => import('./views/sample/sampleList.vue')
    }, {
      path: 'sampleDetail/:id',
      name: 'sampleDetail',
      component: () => import('./views/sample/sampleDetail.vue')
    }, {
      path: 'sampleOrderCreate',
      name: 'sampleOrderCreate',
      component: () => import('./views/sample/sampleOrderCreate.vue')
    }, {
      path: 'sampleOrderList',
      name: 'sampleOrderList',
      component: () => import('./views/sample/sampleOrderList.vue')
    }, {
      path: 'sampleOrderDetail/:id',
      name: 'sampleOrderDetail',
      component: () => import('./views/sample/sampleOrderDetail.vue')
    }, {
      path: 'orderCreate',
      name: 'orderCreate',
      component: () => import('./views/order/orderCreate.vue')
    }, {
      path: 'orderUpdate/:id',
      name: 'orderUpdate',
      component: () => import('./views/order/orderUpdate.vue')
    }, {
      path: 'orderDetail/:id',
      name: 'orderDetail',
      component: () => import('./views/order/orderDetail.vue')
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
      path: 'foreignTradeUpdate/:id',
      name: 'foreignTradeUpdate',
      component: () => import('./views/foreignTrade/foreignTradeUpdate.vue')
    }, {
      path: 'productPlanList',
      name: 'productPlanList',
      component: () => import('./views/productPlan/productPlanList.vue')
    }, {
      path: 'productPlanDetail/:id',
      name: 'productPlanDetail',
      component: () => import('./views/productPlan/productPlanDetail.vue')
    }, {
      path: 'orderStockDetail/:id',
      name: 'orderStockDetail',
      component: () => import('./views/orderStock/orderStockDetail.vue')
    }, {
      path: 'orderStockList',
      name: 'orderStockList',
      component: () => import('./views/orderStock/orderStockList.vue')
    }, {
      path: 'orderStockIn/:orderId/:productId',
      name: 'orderStockIn',
      component: () => import('./views/orderStock/orderStockIn.vue')
    }, {
      path: 'orderStockOut/:orderId/:productId',
      name: 'orderStockOut',
      component: () => import('./views/orderStock/orderStockOut.vue')
    }, {
      path: 'mainMaterialStockCreate',
      name: 'mainMaterialStockCreate',
      component: () => import('./views/stock/mainMaterialStockCreate.vue')
    }, {
      path: 'materialStockList',
      name: 'materialStockList',
      component: () => import('./views/stock/materialStockList.vue')
    }, {
      path: 'materialStockListNew',
      name: 'materialStockListNew',
      component: () => import('./views/stock/materialStockListNew.vue')
    }, {
      path: 'materialStockDetail/:stockId',
      name: 'materialStockDetail',
      component: () => import('./views/stock/materialStockDetail.vue')
    }, {
      path: 'mainMaterialStockChange/:id',
      name: 'mainMaterialStockChange',
      component: () => import('./views/stock/mainMaterialStockChange.vue')
    }, {
      path: 'mainMaterialStockDetail/:stockId/:id',
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
      path: 'productStockDetail/:productId',
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
      path: 'productDesignUpdate/:id/:planId',
      name: 'productDesignUpdate',
      component: () => import('./views/productDesign/productDesignUpdate.vue')
    }, {
      path: 'productDesignList',
      name: 'productDesignList',
      component: () => import('./views/productDesign/productDesignList.vue')
    }, {
      path: 'productDesignList2',
      name: 'productDesignList2',
      component: () => import('./views/productDesign/productDesignList2.vue')
    }, {
      path: 'productDesignWeavingCreate/:id',
      name: 'productDesignWeavingCreate',
      component: () => import('./views/productDesign/productDesignWeavingCreate.vue')
    }, {
      path: 'productDesignWeavingDetail/:id',
      name: 'productDesignWeavingDetail',
      component: () => import('./views/productDesign/productDesignWeavingDetail.vue')
    }, {
      path: 'productDesignHalfCreate/:id',
      name: 'productDesignHalfCreate',
      component: () => import('./views/productDesign/productDesignHalfCreate.vue')
    }, {
      path: 'productDesignHalfDetail/:id',
      name: 'productDesignHalfDetail',
      component: () => import('./views/productDesign/productDesignHalfDetail.vue')
    }, {
      path: 'productDesignCreateList',
      name: 'productDesignCreateList',
      component: () => import('./views/productDesign/productDesignCreateList.vue')
    }, {
      path: 'rawMaterialPurchase',
      name: 'rawMaterialPurchase',
      component: () => import('./views/rawMaterial/rawMaterialPurchase.vue')
    }, {
      path: 'rawMaterialPurchaseList',
      name: 'rawMaterialPurchaseList',
      component: () => import('./views/rawMaterial/rawMaterialPurchaseList.vue')
    }, {
      path: 'rawMaterialPurchaseDetail/:id',
      name: 'rawMaterialPurchaseDetail',
      component: () => import('./views/rawMaterial/rawMaterialPurchaseDetail.vue')
    }, {
      path: 'rawMaterialPurchaseUpdate/:id',
      name: 'rawMaterialPurchaseUpdate',
      component: () => import('./views/rawMaterial/rawMaterialPurchaseUpdate.vue')
    }, {
      path: 'rawMaterialPlan/:orderId/:productId',
      name: 'rawMaterialPlan',
      component: () => import('./views/rawMaterial/rawMaterialPlan.vue')
    }, {
      path: 'rawMaterialStat/:id',
      name: 'rawMaterialStat',
      component: () => import('./views/rawMaterial/rawMaterialStat.vue')
    }, {
      path: 'rawMaterialOrderPage/:id/:type',
      name: 'rawMaterialOrderPage',
      component: () => import('./views/rawMaterial/rawMaterialOrderPage.vue')
    }, {
      path: 'rawMaterialOrderPageBu/:id/:type/:times',
      name: 'rawMaterialOrderPageBu',
      component: () => import('./views/rawMaterial/rawMaterialOrderPageBu.vue')
    }, {
      path: 'rawMaterialOrderList',
      name: 'rawMaterialOrderList',
      component: () => import('./views/rawMaterial/rawMaterialOrderList.vue')
    }, {
      path: 'rawMaterialOrderDetail/:id/:type',
      name: 'rawMaterialOrderDetail',
      component: () => import('./views/rawMaterial/rawMaterialOrderDetail.vue')
    }, {
      path: 'rawMaterialProcess/:id/:type',
      name: 'rawMaterialProcess',
      component: () => import('./views/rawMaterial/rawMaterialProcess.vue')
    }, {
      path: 'rawMaterialStockDetail/:id/:type',
      name: 'rawMaterialStockDetail',
      component: () => import('./views/rawMaterial/rawMaterialStockDetail.vue')
    }, {
      path: 'rawMaterialStockList',
      name: 'rawMaterialStockList',
      component: () => import('./views/rawMaterial/rawMaterialStockList.vue')
    }, {
      path: 'rawMaterialStock/:id/:type',
      name: 'rawMaterialStock',
      component: () => import('./views/rawMaterial/rawMaterialStock.vue')
    }, {
      path: 'rawMaterialSupply/:id/:companyName/:companyId',
      name: 'rawMaterialSupply',
      component: () => import('./views/rawMaterial/rawMaterialSupply.vue')
    }, {
      path: 'otherMaterialSupply/:id/:companyName/:companyId',
      name: 'otherMaterialSupply',
      component: () => import('./views/rawMaterial/otherMaterialSupply.vue')
    }, {
      path: 'rawMaterialOutStock/:id/:type',
      name: 'rawMaterialOutStock',
      component: () => import('./views/rawMaterial/rawMaterialOutStock.vue')
    }, {
      path: 'error/:id',
      name: 'error',
      component: () => import('./views/error.vue')
    }, {
      path: 'setting',
      name: 'setting',
      component: () => import('./views/setting/settings.vue')
    }, {
      path: 'productSetting',
      name: 'productSetting',
      component: () => import('./views/setting/productSetting.vue')
    }, {
      path: 'designFormSetting',
      name: 'designFormSetting',
      component: () => import('./views/setting/designFormSetting.vue')
    }, {
      path: 'accountSetting',
      name: 'accountSetting',
      component: () => import('./views/setting/accountSetting.vue')
    }, {
      path: 'yarnSetting',
      name: 'yarnSetting',
      component: () => import('./views/setting/yarnSetting.vue')
    }, {
      path: 'productExaminationList',
      name: 'productExaminationList',
      component: () => import('./views/productExamination/productExaminationList.vue')
    }, {
      path: 'semiExaminationDetail/:id',
      name: 'semiExaminationDetail',
      component: () => import('./views/productExamination/semiExaminationDetail.vue')
    }, {
      path: 'finishedExaminationDetail/:id',
      name: 'finishedExaminationDetail',
      component: () => import('./views/productExamination/finishedExaminationDetail.vue')
    }, {
      path: 'semiExamination/:id/:product_code',
      name: 'semiExamination',
      component: () => import('./views/productExamination/semiExamination.vue')
    }, {
      path: 'finishedExamination/:id/:product_code',
      name: 'finishedExamination',
      component: () => import('./views/productExamination/finishedExamination.vue')
    }, {
      path: 'packagList',
      name: 'packagList',
      component: () => import('./views/packaging/packagList.vue')
    }, {
      path: 'packagDetail/:id',
      name: 'packagDetail',
      component: () => import('./views/packaging/packagDetail.vue')
    }, {
      path: 'packagInfoCreate/:id/:batchId',
      name: 'packagInfoCreate',
      component: () => import('./views/packaging/packagInfoCreate.vue')
    }, {
      path: 'packagMaterialPage/:id',
      name: 'packagMaterialPage',
      component: () => import('./views/packaging/packagMaterialPage.vue')
    }, {
      path: 'packagOutStockList',
      name: 'packagOutStockList',
      component: () => import('./views/packaging/packagOutStockList.vue')
    }, {
      path: 'packagOutStockDetail/:id',
      name: 'packagOutStockDetail',
      component: () => import('./views/packaging/packagOutStockDetail.vue')
    }, {
      path: 'packagOutStock/:id/:batchId',
      name: 'packagOutStock',
      component: () => import('./views/packaging/packagOutStock.vue')
    }, {
      path: 'packagMaterialList',
      name: 'packagMaterialList',
      component: () => import('./views/setting/packagMaterialList.vue')
    }, {
      path: 'packagMaterialSetting',
      name: 'packagMaterialSetting',
      component: () => import('./views/setting/packagMaterialSetting.vue')
    }, {
      path: 'sampleAdd',
      name: 'sampleAdd',
      component: () => import('./views/order/sampleAdd.vue')
    }, {
      path: 'orderDetailNew/:id',
      name: 'orderDetailNew',
      component: () => import('./views/order/orderDetailNew.vue')
    }, {
      path: 'permissionsAdd',
      name: 'permissionsAdd',
      component: () => import('./views/permissions/permissionsAdd.vue')
    }, {
      path: 'permissionsAppend',
      name: 'permissionsAppend',
      component: () => import('./views/permissions/permissionsAppend.vue')
    }, {
      path: 'orderFinancialList',
      name: 'orderFinancialList',
      component: () => import('./views/financial/orderFinancialList.vue')
    }, {
      path: 'productFinancialList',
      name: 'productFinancialList',
      component: () => import('./views/financial/productFinancialList.vue')
    }, {
      path: 'materialFinancialList',
      name: 'materialFinancialList',
      component: () => import('./views/financial/materialFinancialList.vue')
    }, {
      path: 'foreignTradeFinancialList',
      name: 'foreignTradeFinancialList',
      component: () => import('./views/financial/foreignTradeFinancialList.vue')
    }, {
      path: 'foreignTradeFinancialDetail/:id',
      name: 'foreignTradeFinancialDetail',
      component: () => import('./views/financial/foreignTradeFinancialDetail.vue')
    }, {
      path: 'productMenuEdit',
      name: 'productMenuEdit',
      component: () => import('./views/setting/productMenuEdit.vue')
    }, {
      path: 'companyInfoSetting',
      name: 'companyInfoSetting',
      component: () => import('./views/setting/companyInfoSetting.vue')
    }]
  }
  ]
})

// router.beforeEach((to, from, next) => { // 全局前置守卫按照创建顺序调用
//   if (to.name !== 'login') {
//     try {
//       loginCheck({
//         user_id: window.sessionStorage.getItem('user_id'),
//         token: window.sessionStorage.getItem('token')
//       }).then((res) => {
//         if (res.data.status) {
//           if (from.name === 'designFormPlanCreate' || from.name === 'designFormCreate') {
//             const answer = window.confirm('是否要离开当前页面')
//             if (answer) {
//               next()
//             } else {
//               next(false)// 可以通过在这里写逻辑来处理用户点了物理返回之后的操作
//             }
//           } else {
//             next()
//           }
//         } else {
//           alert('登录信息过期,请重新登录')
//           next('/login')
//         }
//       })
//     } catch {
//       alert('系统异常,请重新登录')
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
