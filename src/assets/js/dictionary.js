// 字典文件，存储常用json数据
// 公司类型
const companyTypes = [
  {
    label: '订单客户',
    disabled: true,
    children: [{
      value: 1,
      label: '订单公司'
    }]
  }, {
    label: '供应商',
    disabled: true,
    children: [{
      value: 2,
      label: '原料纱线单位'
    }, {
      value: 10,
      label: '装饰辅料单位'
    }, {
      value: 7,
      label: '包装辅料单位'
    }]
  }, {
    label: '生产商',
    disabled: true,
    children: [{
      value: 4,
      label: '生产织造单位'
    }, {
      value: 5,
      label: '半成品加工单位'
    }, {
      value: 3,
      label: '物料加工单位'
    }]
  }, {
    label: '其他',
    disabled: true,
    children: [{
      value: 8,
      label: '运输单位'
    }, {
      value: 6,
      label: '检验单位'
    }, {
      value: 9,
      label: '存储单位'
    }]
  }
]

const companyType = [
  {
    value: 1,
    name: '订单公司'
  }, {
    value: 2,
    name: '原料纱线单位'
  }, {
    value: 3,
    name: '物料加工单位'
  }, {
    value: 4,
    name: '生产织造单位'
  }, {
    value: 5,
    name: '半成品加工单位'
  }, {
    value: 6,
    name: '检验单位'
  }, {
    value: 7,
    name: '包装辅料单位'
  }, {
    value: 8,
    name: '运输单位'
    // }, {
    //   value: 9,
    //   name: '存储单位'
  }, {
    value: 10,
    name: '装饰辅料单位'
  }
]

// 仓库类型
const stockType = [{
  name: '原料仓库',
  id: 1
}, {
  name: '辅料仓库',
  id: 2
}, {
  name: '包装辅料仓库',
  id: 3
}, {
  name: '产品仓库',
  id: 4
}]
// 字母映射
const letterArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z']
// 货币
const moneyArr = [{
  name: '元',
  short: '人民币',
  id: 1,
  sign: '￥'
}, {
  name: '美元',
  short: 'USD',
  id: 2,
  sign: 'US$'
}, {
  name: '欧元',
  short: 'EUR',
  id: 3,
  sign: '₠'
}, {
  name: '英镑',
  short: 'GBP',
  id: 4,
  sign: '￡£'
}, {
  name: '日元',
  short: 'JPY',
  id: 5,
  sign: '¥'
}, {
  name: '港币',
  short: 'HKD',
  id: 6,
  sign: 'HK$'
}, {
  name: '韩元',
  short: 'KRW',
  id: 7,
  sign: '₩'
}, {
  name: '泰铢',
  short: 'THP',
  id: 8,
  sign: '฿'
}, {
  name: '缅元',
  short: 'BUK',
  id: 9,
  sign: 'BUK'
}, {
  name: '卢比',
  short: 'INR',
  id: 10,
  sign: '₲'
}, {
  name: '卢布',
  short: 'SUR',
  id: 11,
  sign: 'руб'
}, {
  name: '新西兰元',
  short: 'NZD',
  id: 12,
  sign: '$'
}, {
  name: '加拿大元',
  short: 'CAD',
  id: 13,
  sign: '$'
}, {
  name: '澳大利亚元',
  short: 'AUD',
  id: 14,
  sign: '$'
}
]

// 加工类型
let machiningType = [{
  name: '成品染色',
  id: 1
}, {
  name: '刺毛',
  id: 2
}, {
  name: '拉毛',
  id: 3
}, {
  name: '捻须',
  id: 4
}, {
  name: '压皱',
  id: 5
}, {
  name: '轧光',
  id: 6
}, {
  name: '车缝',
  id: 7
}, {
  name: '整烫',
  id: 8
}, {
  name: '吊球',
  id: 9
}, {
  name: '绣花',
  id: 10
}, {
  name: '接指',
  id: 11
}, {
  name: '套口',
  id: 12
}, {
  name: '平车',
  id: 13
}, {
  name: '印花',
  id: 14
}, {
  name: '订扣',
  id: 15
}, {
  name: '烫金',
  id: 16
}, {
  name: '手缝',
  id: 17
}, {
  name: '打结',
  id: 18
}, {
  name: '砂洗',
  id: 19
}, {
  name: '烫须',
  id: 20
}, {
  name: '穿线',
  id: 21
}, {
  name: '缝纫',
  id: 22
}]
// 菜单栏在做中的页面
const menu = [{
  name: '样品管理',
  children: [{
    name: '添加样品',
    url: '/index/sampleCreate'
  }, {
    name: '样品列表',
    url: '/index/sampleList'
  }, {
    name: '添加新样单',
    url: '/index/sampleOrderCreate'
  }, {
    name: '样品订单列表',
    url: '/index/sampleOrderList'
  }]
}, {
  name: '报价单管理',
  children: [{
    name: '添加报价单',
    url: '/index/priceListCreate'
  }, {
    name: '报价单列表',
    url: '/index/priceListList'
    // }, {
    //   name: '产品电子手册',
    //   url: '/productMenu'
  }]
}, {
  name: '产品管理',
  children: [{
    name: '添加新产品',
    url: '/index/productCreate'
  }, {
    name: '产品列表',
    url: '/index/productList'
  }, {
    name: '产品库存列表',
    url: '/index/productStockList'
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
    //   name: '大屏发货列表',
    //   url: '/screenShipments'
    // },
    // {
    //   name: '大屏发货列表',
    //   url: '/screenShipmentsList'
    // },
    // {
    //   name: '添加样品订单(未完成)',
    //   url: '/index/sampleCreate'
    // }, {
    //   name: '样单列表(未完成)',
    //   url: '/index/sampleList'
    // },
    // {
    //   name: '添加样品',
    //   url: '/index/sampleAdd'
    // }
  ]
}, {
  name: '计划生产管理',
  children: [{
    name: '新建生产计划单',
    url: '/index/productDesignCreateList'
  }, {
    name: '生产计划单列表',
    url: '/index/productDesignList'
  }]
}, {
  name: '物料管理',
  children: [{
    name: '原料预订购',
    url: '/index/rawMaterialPurchase'
  }, {
    name: '预订购入库',
    url: '/index/rawMaterialPurchaseList'
  }, {
    name: '物料订购加工',
    url: '/index/rawMaterialOrderList'
  }, {
    name: '物料出库入库',
    url: '/index/rawMaterialStockList'
  }]
}, {
  name: '织造加工管理',
  children: [{
    name: '织造加工分配',
    url: '/index/productDesignList2'
  }]
}, {
  name: '收发管理',
  children: [{
    name: '产品出入库列表',
    url: '/index/orderStockList'
  }]
}, {
  name: '检验管理',
  children: [{
    name: '产品检验列表',
    url: '/index/productExaminationList'
  }]
}, {
  name: '装箱出库管理',
  children: [{
    //   name: '包装订购列表',
    //   url: '/index/packagList'
    // }, {
    name: '装箱出库列表',
    url: '/index/packagOutStockList'
  }]
}, {
  name: '库存管理',
  children: [
    {
      name: '添加仓库',
      url: '/index/stockCreate'
    }, {
      name: '仓库列表',
      url: '/index/stockList'
    },
    // {
    //   name: '添加产品库存',
    //   url: '/index/stockProductList'
    // },
    {
      name: '产品库存列表',
      url: '/index/productStockList'
    },
    //  {
    //   name: '添加原料库存',
    //   url: '/index/mainMaterialStockCreate'
    // },
    // {
    //   name: '添加辅料库存',
    //   url: '/index/otherMaterialStockCreate'
    // },
    {
      name: '物料库存列表',
      url: '/index/materialStockListNew'
    }]
}, {
  name: '财务管理',
  children: [{
    name: '订单财务统计',
    url: '/index/orderFinancialList'
  }, {
    name: '合作公司财务统计',
    url: '/index/foreignTradeFinancialList'
  }, {
    name: '产品产量统计',
    url: '/index/productFinancialList'
  }, {
    name: '物料使用统计',
    url: '/index/materialFinancialList'
  }]
}, {
  name: '客户管理',
  children: [{
    name: '添加客户',
    url: '/index/foreignTradeCreate'
  }, {
    name: '客户列表',
    url: '/index/foreignTradeList'
  }]
}, {
  name: '系统设置',
  children: [{
    name: '系统设置',
    url: '/index/setting'
  }, {
    name: '权限设置',
    url: '/index/permissionsAdd'
  }, {
    //   name: '产品手册设置',
    //   url: '/index/productMenuEdit'
    // }, {
    name: '添加权限',
    url: '/index/permissionsAppend'
  }, {
    name: '工厂信息设置',
    url: '/index/companyInfoSetting'
  }]
}]
// 次品原因
const defectiveType = ['跳线', '污迹', '经纬断线', '严重破损', '边型问题', '流苏问题', '颜色问题', '花型问题', '款型问题', '克重问题', '长度问题', '工序问题', '质量问题', '加工问题', '其他问题']
// 国家
const countries = '中国、蒙古、朝鲜、韩国、日本、菲律宾、越南、老挝、柬埔寨、缅甸、泰国、马来西亚、文莱、新加坡、印度尼西亚、东帝汶、尼泊尔、不丹、孟加拉国、印度、巴基斯坦、斯里兰卡、马尔代夫、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、乌兹别克斯坦、土库曼斯坦、阿富汗、伊拉克、伊朗、叙利亚、约旦、黎巴嫩、以色列、巴勒斯坦、沙特阿拉伯、巴林、卡塔尔、科威特、阿拉伯联合酋长国（阿联酋）、阿曼、也门、格鲁吉亚、亚美尼亚、阿塞拜疆、土耳其、塞浦路斯、芬兰、瑞典、挪威、冰岛、丹麦 法罗群岛（丹）、爱沙尼亚、拉脱维亚、立陶宛、白俄罗斯、俄罗斯、乌克兰、摩尔多瓦、波兰、捷克、斯洛伐克、匈牙利、德国、奥地利、瑞士、列支敦士登、英国、爱尔兰、荷兰、比利时、卢森堡、法国、摩纳哥、罗马尼亚、保加利亚、塞尔维亚、马其顿、阿尔巴尼亚、希腊、斯洛文尼亚、克罗地亚、波斯尼亚和墨塞哥维那、梵蒂冈、圣马力诺、马耳他、西班牙、葡萄牙、安道尔、埃及、利比亚、苏丹、突尼斯、阿尔及利亚、摩洛哥、亚速尔群岛（葡）、马德拉群岛（葡）、埃塞俄比亚、厄立特里亚、索马里、吉布提、肯尼亚、坦桑尼亚、乌干达、卢旺达、布隆迪、塞舌尔、乍得、中非、喀麦隆、赤道几内亚、加蓬、刚果共和国（即：刚果（布））、刚果民主共和国（即：刚果（金））、圣多美及普林西比、毛里塔尼亚、西撒哈拉、塞内加尔、冈比亚、马里、布基纳法索、几内亚、几内亚比绍、佛得角、塞拉利昂、利比里亚、科特迪瓦、加纳、多哥、贝宁、尼日尔、加那利群岛（西）、赞比亚、安哥拉、津巴布韦、马拉维、莫桑比克、博茨瓦纳、纳米比亚、南非、斯威士兰、莱索托、马达加斯加、科摩罗、毛里求斯、留尼旺（法）、圣赫勒拿（英）、澳大利亚、新西兰、巴布亚新几内亚、所罗门群岛、瓦努阿图、密克罗尼西亚、马绍尔群岛、帕劳、瑙鲁、基里巴斯、图瓦卢、萨摩亚、斐济群岛、汤加、库克群岛（新）、关岛（美）、新喀里多尼亚（法）、法属波利尼西亚、皮特凯恩岛（英）、瓦利斯与富图纳（法）、纽埃（新）、托克劳（新）、美属萨摩亚、北马里亚纳（美）、加拿大、美国、墨西哥、格陵兰（丹）、危地马拉、伯利兹、萨尔瓦多、洪都拉斯、尼加拉瓜、哥斯达黎加、巴拿马、巴哈马、古巴、牙买加、海地、多米尼加共和国、安提瓜和巴布达、圣基茨和尼维斯、多米尼克、圣卢西亚、圣文森特和格林纳丁斯、格林纳达、巴巴多斯、特立尼达和多巴哥、波多黎各（美）、英属维尔京群岛、美属维尔京群岛、安圭拉（英）、蒙特塞拉特（英）、瓜德罗普（法）、马提尼克（法）、荷属安的列斯、阿鲁巴（荷）、特克斯和凯科斯群岛（英）、开曼群岛（英）、百慕大（英）、哥伦比亚、委内瑞拉、圭亚那、法属圭亚那、苏里南、厄瓜多尔、秘鲁、玻利维亚、巴西、智利、阿根廷、乌拉圭、巴拉圭'
// 权限数据
const permissionsData = [
  {
    url: ['product/save', 'product/list', 'product/one', 'product/delete'],
    value: 1,
    label: '产品管理'
  },
  {
    value: 2,
    label: '工艺单管理',
    children: [
      {
        url: ['product/craft/save', 'product/craft/one', 'craft/product/one', 'product/craft/list', 'product/craft/draft/delete'],
        value: 13,
        label: '工艺单'
      },
      {
        url: ['product/craft/save', 'product/craft/one', 'craft/product/one', 'product/craft/list', 'product/craft/draft/delete'],
        value: 14,
        label: '设计单'
      }
    ]
  },
  {
    url: ['product/plan/save', 'product/plan/one', 'product/plan/product/one', 'product/plan/list'],
    value: 3,
    label: '配料单管理'
  },
  {
    value: 4,
    label: '订单管理',
    children: [
      {
        url: ['order/list', 'order/batch/list', 'order/delete', 'order/status/check', 'order/one', 'order/detail', 'order/save'],
        value: 15,
        label: '订单'
      },
      {
        url: [],
        value: 16,
        label: '订单发货'
      }
    ]
  },
  {
    value: 5,
    label: '生产管理',
    children: [
      {
        url: ['production/save', 'production/list', 'production/one'],
        value: 17,
        label: '生产计划单'
      },
      {
        url: ['production/weave/save', 'production/weave/list', 'production/weave/edit'],
        value: 18,
        label: '织造分配'
      },
      {
        url: ['production/semi_product/save', 'production/semi_product/list', 'production/semi_product/edit'],
        value: 19,
        label: '加工分配'
      },
      {
        url: ['production/yarn/replenish/save', 'production/yarn/replenish/list'],
        value: 20,
        label: '补充物料'
        // },
        // {
        //   url: ['production/yarn/replenish/save', 'production/yarn/replenish/list'],
        //   value: 63,
        //   label: '补充辅料'
      }
    ]
  },
  {
    value: 6,
    label: '物料管理',
    children: [
      {
        url: ['material/reserve/save', 'material/reserve/list', 'material/reserve/one', 'material/reserve/push'],
        value: 21,
        label: '原料预定购'
      },
      {
        url: ['material/order/init', 'material/process/list', 'material/order/list', 'material/order/save', 'material/process/save'],
        value: 22,
        label: '物料详情'
      },
      {
        url: ['order/material/push/detail', 'order/material/pop/detail', 'order/material/pop', 'order/material/push', 'order/material/surplus/push', 'order/material/list', 'order/material/surplus/delete'],
        value: 23,
        label: '物料出入详情'
      }
    ]
  },
  {
    value: 7,
    label: '检验管理',
    children: [
      {
        url: ['product/semi/inspection/list', 'product/semi/inspection'],
        value: 24,
        label: '半成品'
      },
      {
        url: ['product/inspection/list', 'product/inspection'],
        value: 25,
        label: '成品'
      }
    ]
  },
  {
    url: ['product/order/push', 'product/order/pop', 'product/order/push/list', 'product/order/pop/list', 'product/order/push/edit', 'product/order/pop/edit'],
    value: 8,
    label: '收发管理'
  },
  {
    url: ['pack/order/list', 'pack/order/save', 'pack/info/list', 'stock/out/save', 'stock/out/list', 'pack/info/save', 'pack/real/save', 'pack/real/list'],
    value: 9,
    label: '装箱出库管理'
  },
  {
    value: 10,
    label: '库存管理',
    children: [
      {
        url: ['product/stock/save', 'product/stock/detail', 'product/stock/list', 'product/stock/one'],
        value: 26,
        label: '产品库存'
      },
      {
        url: ['material/stock/list', 'material/stock/detail', 'stock/material/detail'],
        value: 27,
        label: '原料库存'
      }
    ]
  },
  {
    url: ['client/delete', 'client/one', 'client/contacts/delete', 'client/contacts/check', 'client/list', 'client/save'],
    value: 11,
    label: '合作公司管理'
  },
  {
    value: 12,
    label: '系统设置',
    children: [
      {
        url: ['permission/save', 'permission/group/save', 'permission/group/all', 'permission/company/all', 'permission/one'],
        value: 28,
        label: '权限设置'
      },
      {
        url: ['product/category/one', 'product/category/list', 'product/category/delete', 'product/category/save', 'product/flower/save', 'product/flower/one', 'product/flower/list', 'product/flower/delete', 'product/ingredient/save', 'product/ingredient/one', 'product/ingredient/delete', 'product/ingredient/list'],
        value: 29,
        label: '产品设置'
      },
      {
        url: ['production/process/save', 'production/type/save', 'production/method/save', 'production/side/save', 'production/edit/list'],
        value: 30,
        label: '工艺单设置'
      },
      {
        url: ['yarn/color/save', 'yarn/save', 'yarn/list', 'yarn/edit', 'yarn/color/list', 'yarn/category/save', 'yarn/category/list'],
        value: 31,
        label: '原料设置'
      },
      {
        url: [],
        value: 32,
        label: '辅料设置'
      },
      {
        url: ['user/station/save', 'user/group/save', 'user/station/list', 'user/group/list', 'user/station/delete', 'user/group/delete'],
        value: 33,
        label: '账号设置'
      },
      {
        url: ['pack/material/save', 'pack/material/one'],
        value: 34,
        label: '包装设置'
      }
    ]
  }
]
const allUrl = ['auth/login', 'auth/send_code', 'auth/register', 'auth/verify_phone', 'upload/token', 'product/flower/save', 'product/flower/one', 'product/flower/list', 'product/category/one', 'product/category/list', 'product/one', 'auth/password/forget', 'product/category/delete', 'product/flower/delete', 'product/color/save', 'product/color/one', 'product/ingredient/save', 'product/ingredient/one', 'product/ingredient/delete', 'product/ingredient/list', 'product/color/list', 'product/size/save', 'product/size/company/all', 'product/size/category/all', 'product/size/delete', 'product/footage/list', 'product/footage/delete', 'product/footage/one', 'product/size/one', 'product/footage/save', 'product/footage/category/all', 'production/process/save', 'production/type/save', 'production/method/save', 'production/side/save', 'product/save', 'production/edit/list', 'permission/one', 'permission/company/all', 'yarn/color/save', 'product/unit/save', 'product/unit/all', 'product/unit/one', 'product/unit/category/one', 'user/save', 'user/check_status', 'user/group/save', 'user/station/save', 'user/list', 'user/station/list', 'user/group/list', 'product/craft/one', 'craft/product/one', 'product/material/save', 'product/material/list', 'product/material/one', 'client/delete', 'client/one', 'client/contacts/delete', 'client/contacts/check', 'client/list', 'order/sample/list', 'order/sample/save', 'product/craft/save', 'product/stock/one', 'product/stock/list', 'product/stock/order', 'production/save', 'production/list', 'production/one', 'client/save', 'order/list', 'order/batch/list', 'product/list', 'product/delete', 'product/craft/list', 'product/plan/list', 'product/plan/order', 'product/plan/product/one', 'product/plan/one', 'upload/put', 'product/plan/save', 'product/stock/detail', 'product/unit/delete', 'product/material/delete', 'order/delete', 'production/side/delete', 'production/method/delete', 'auth/logout', 'auth/check/login', 'user/station/delete', 'user/group/delete', 'yarn/list', 'pan/color/list', 'yarn/color/list', 'yarn/category/save', 'yarn/category/list', 'material/order/init', 'material/process/list', 'material/order/list', 'product/craft/draft/delete', 'material/stock/list', 'material/reserve/save', 'order/material/push/detail', 'order/material/pop/detail', 'production/weave/save', 'production/semi_product/save', 'product/plan/order/detail', 'material/process/save', 'production/semi_product/list', 'production/weave/list', 'product/order/push', 'product/order/pop', 'product/order/push/list', 'product/order/pop/list', 'production/weave/edit', 'production/semi_product/edit', 'product/inspection/list', 'product/semi/inspection/list', 'product/order/push/edit', 'product/order/pop/edit', 'product/inspection', 'yarn/save', 'yarn/edit', 'product/category/save', 'product/semi/inspection', 'pack/order/list', 'production/order/cilent/list', 'production/yarn/replenish/save', 'production/yarn/replenish/list', 'material/order/save', 'pack/material/one', 'pack/material/save', 'pack/material/list', 'pack/order/save', 'pack/info/list', 'stock/out/save', 'stock/out/list', 'pack/info/save', 'pack/real/save', 'pack/real/list', 'material/reserve/list', 'material/reserve/one', 'material/reserve/push', 'order/material/pop', 'order/one', 'order/detail', 'order/material/push', 'order/material/surplus/push', 'order/material/list', 'order/material/surplus/delete', 'material/stock/detail', 'stock/material/detail', 'order/save', 'permission/save', 'permission/group/save', 'permission/group/one', 'permission/group/all', 'product/stock/save', 'order/status/check']
export { menu, letterArr, companyType, companyTypes, moneyArr, machiningType, defectiveType, countries, permissionsData, allUrl, stockType }
