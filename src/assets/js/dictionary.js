// 字典文件，存储常用json数据
// 公司类型
const companyType = [{
  value: 1,
  name: '外贸公司'
}, {
  value: 2,
  name: '纱线订购单位'
}, {
  value: 3,
  name: '染色单位'
}, {
  value: 4,
  name: '倒纱单位'
}, {
  value: 5,
  name: '裁剪单位'
}, {
  value: 6,
  name: '辅料订购单位'
}]

// 字母映射
const letterArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z']
// 货币
const moneyArr = [{
  name: '元',
  short: '人民币',
  id: 1
}, {
  name: '美元',
  short: 'USD',
  id: 2
}, {
  name: '欧元',
  short: 'EUR',
  id: 3
}, {
  name: '英镑',
  short: 'GBP',
  id: 4
}, {
  name: '日元',
  short: 'JPY',
  id: 5
}, {
  name: '港币',
  short: 'HKD',
  id: 6
}, {
  name: '韩元',
  short: 'KRW',
  id: 7
}, {
  name: '泰铢',
  short: 'THP',
  id: 8
}, {
  name: '缅元',
  short: 'BUK',
  id: 9
}, {
  name: '卢比',
  short: 'INR',
  id: 10
}, {
  name: '卢布',
  short: 'SUR',
  id: 11
}, {
  name: '新西兰元',
  short: 'NZD',
  id: 12
}, {
  name: '加拿大元',
  short: 'CAD',
  id: 13
}, {
  name: '澳大利亚元',
  short: 'AUD',
  id: 14
}
]

// 菜单栏在做中的页面
const menu = [{
  name: '产品管理',
  children: [{
    name: '添加新产品',
    url: '/index/productCreate'
  }, {
    name: '产品列表',
    url: '/index/productList'
  }]
}, {
  name: '工艺单管理',
  children: [{
    name: '添加工艺单',
    url: '/index/designFormAdd'
  }, {
    name: '工艺单列表',
    url: '/index/designFormList'
  }, {
    name: '添加设计单',
    url: '/index/designFormPlanCreate'
  }, {
    name: '设计单列表',
    url: '/index/designFormPlanList'
  }]
}, {
  name: '配料单管理',
  children: [{
    name: '添加配料单',
    url: '/index/productPlanAdd'
  }, {
    name: '配料单列表',
    url: '/index/productPlanList'
  }]
}, {
  name: '订单管理',
  children: [{
    name: '添加新订单',
    url: '/index/orderCreate'
  }, {
    name: '订单列表',
    url: '/index/orderList'
  }, {
    name: '订单发货列表',
    url: '/index/orderStat'
  }
    // {
    //   name: '添加样品订单(未完成)',
    //   url: '/index/sampleCreate'
    // }, {
    //   name: '样单列表(未完成)',
    //   url: '/index/sampleList'
    // }
  ]
}, {
  name: '库存管理',
  children: [{
    name: '添加产品库存',
    url: '/index/stockProductList'
  }, {
    name: '产品库存列表',
    url: '/index/productStockList'
  }, {
    name: '原料库存列表',
    url: '/index/mainMaterialStockList'
    // }, {
    //   name: '添加原料库存',
    //   url: '/index/mainMaterialStockCreate'
    // }, {
    //   name: '添加辅料库存',
    //   url: '/index/otherMaterialStockCreate'
    // }, {
    //   name: '辅料库存列表',
    //   url: '/index/otherMaterialStockList'
  }]
}, {
  name: '生产管理',
  children: [{
    name: '新建生产计划单',
    url: '/index/productDesignCreateList'
  }, {
    name: '生产计划单列表',
    url: '/index/productDesignList'
  }]
}, {
  name: '原料管理',
  children: [{
    name: '原料预订购',
    url: '/index/rawMaterialPurchase'
  }, {
    name: '物料详情列表',
    url: '/index/rawMaterialOrderList'
  }, {
    name: '物料出入库列表',
    url: '/index/rawMaterialStockList'
  }]
}, {
  name: '合作公司管理',
  children: [{
    name: '添加合作公司',
    url: '/index/foreignTradeCreate'
  }, {
    name: '合作公司列表',
    url: '/index/foreignTradeList'
  }]
}, {
  name: '系统设置',
  children: [{
    name: '系统设置',
    url: '/index/setting'
  }]
}]
// 左侧栏菜单 副本
const menu2 = [{
  name: '产品管理',
  children: [{
    name: '添加新产品',
    url: '/index/productCreate'
  }, {
    name: '产品列表',
    url: '/index/productList'
  }, {
    name: '产品设置',
    url: '/index/productSetting'
  }]
}, {
  name: '工艺单管理',
  children: [{
    name: '添加工艺单',
    url: '/index/designFormAdd'
  }, {
    name: '工艺单列表',
    url: '/index/designFormList'
  }, {
    name: '计划单列表',
    url: '/index/productPlanList'
  }, {
    name: '工艺单设置',
    url: '/index/designFormSetting'
  }]
}, {
  name: '订单管理',
  children: [{
    name: '添加样品订单',
    url: '/index/sampleCreate'
  }, {
    name: '样单列表',
    url: '/index/sampleList'
  }, {
    name: '添加新订单',
    url: '/index/orderCreate'
  }, {
    name: '订单列表',
    url: '/index/orderList'
  }, {
    name: '订单统计列表',
    url: '/index/orderStat'
  }, {
    name: '订单统计',
    url: '/index/null'
  }]
}, {
  name: '库存管理',
  children: [{
    name: '添加产品库存',
    url: '/index/stockProductList'
  }, {
    name: '产品库存列表',
    url: '/index/productStockList'
  }, {
    name: '添加原料库存',
    url: '/index/mainMaterialStockCreate'
  }, {
    name: '原料库存列表',
    url: '/index/mainMaterialStockList'
  }, {
    name: '添加辅料库存',
    url: '/index/otherMaterialStockCreate'
  }, {
    name: '辅料库存列表',
    url: '/index/otherMaterialStockList'
  }]
}, {
  name: '原料管理',
  children: [{
    name: '原料订购',
    url: '/index/null'
  }, {
    name: '原料订购列表',
    url: '/index/null'
  }, {
    name: '原料库存列表',
    url: '/index/null'
  }, {
    name: '原料库存添加',
    url: '/index/null'
  }, {
    name: '原料价格表',
    url: '/index/null'
  }, {
    name: '新建原料计划单',
    url: '/index/null'
  }, {
    name: '新建染色计划单',
    url: '/index/null'
  }, {
    name: '新建倒纱计划单',
    url: '/index/null'
  }, {
    name: '原料计划列表',
    url: '/index/null'
  }, {
    name: '染色计划列表',
    url: '/index/null'
  }, {
    name: '倒纱计划列表',
    url: '/index/null'
  }, {
    name: '原料出库列表',
    url: '/index/null'
  }, {
    name: '原料统计',
    url: '/index/null'
  }]
}, {
  name: '辅料管理',
  children: [{
    name: '辅料订购',
    url: '/index/null'
  }, {
    name: '辅料订购列表',
    url: '/index/null'
  }, {
    name: '辅料库存列表',
    url: '/index/null'
  }, {
    name: '辅料库存添加',
    url: '/index/null'
  }, {
    name: '新建辅料计划单',
    url: '/index/null'
  }, {
    name: '辅料计划单列表',
    url: '/index/null'
  }, {
    name: '辅料统计',
    url: '/index/null'
  }]
}, {
  name: '生产管理',
  children: [{
    name: '新建生产计划单',
    url: '/index/productDesignCreateList'
  }, {
    name: '生产计划列表',
    url: '/index/productDesignList'
  }, {
    name: '生产补纱',
    url: '/index/null'
  }, {
    name: '生产统计',
    url: '/index/null'
  }]
}, {
  name: '半成品管理',
  children: [{
    name: '半成品入库',
    url: '/index/null'
  }, {
    name: '半成品入库列表',
    url: '/index/null'
  }, {
    name: '半成品检验统计',
    url: '/index/null'
  }, {
    name: '半成品检验列表',
    url: '/index/null'
  }, {
    name: '半成品出库',
    url: '/index/null'
  }, {
    name: '半成品出库列表',
    url: '/index/null'
  }]
}, {
  name: '外道加工管理',
  children: [{
    name: '新建外道加工计划单',
    url: '/index/null'
  }, {
    name: '外道加工计划列表',
    url: '/index/null'
  }, {
    name: '更新外道加工计划单',
    url: '/index/null'
  }, {
    name: '外道加工统计',
    url: '/index/null'
  }]
}, {
  name: '成品管理',
  children: [{
    name: '成品入库',
    url: '/index/null'
  }, {
    name: '成品入库列表',
    url: '/index/null'
  }, {
    name: '成品检验统计',
    url: '/index/null'
  }, {
    name: '更新计划出库计划单',
    url: '/index/null'
  }]
}, {
  name: '装箱出库管理',
  children: [{
    name: '装箱统计',
    url: '/index/null'
  }, {
    name: '装箱统计列表',
    url: '/index/null'
  }, {
    name: '新建订单出库计划单',
    url: '/index/null'
  }, {
    name: '订单出库统计',
    url: '/index/null'
  }, {
    name: '更新订单出库计划单',
    url: '/index/null'
  }]
}, {
  name: '财务管理',
  children: [{
    name: '原料财务管理',
    url: '/index/null'
  }, {
    name: '辅料财务管理',
    url: '/index/null'
  }, {
    name: '生产财务管理',
    url: '/index/null'
  }, {
    name: '半成品财务管理',
    url: '/index/null'
  }, {
    name: '外道加工财务管理',
    url: '/index/null'
  }, {
    name: '成品财务管理',
    url: '/index/null'
  }, {
    name: '订单财务管理',
    url: '/index/null'
  }, {
    name: '订单财务统计',
    url: '/index/null'
  }, {
    name: '人力财务管理',
    url: '/index/null'
  }, {
    name: '公司财务统计',
    url: '/index/null'
  }]
}, {
  name: '合作公司管理',
  children: [{
    name: '添加合作公司',
    url: '/index/foreignTradeCreate'
  }, {
    name: '合作公司列表',
    url: '/index/foreignTradeList'
  }]
}]
export { menu, menu2, letterArr, companyType, moneyArr }
