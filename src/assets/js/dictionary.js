// 字典文件，存储常用json数据
// 公司类型
const companyType = [
  //   {
  //   value: 1,
  //   name: '外贸公司'
  // }, {
  //   value: 2,
  //   name: '纱线订购单位'
  // }, {
  //   value: 3,
  //   name: '染色单位'
  // }, {
  //   value: 4,
  //   name: '倒纱单位'
  // }, {
  //   value: 5,
  //   name: '裁剪单位'
  // }, {
  //   value: 6,
  //   name: '辅料订购单位'
  // }
  {
    value: 1,
    name: '外贸公司'
  }, {
    value: 2,
    name: '物料订购公司'
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
    name: '包装辅料公司'
  }, {
    value: 8,
    name: '运输单位'
  }
]

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
}]
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
  }
  ]
}, {
  name: '计划单管理',
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
    name: '预订购列表',
    url: '/index/rawMaterialPurchaseList'
  }, {
    name: '物料详情列表',
    url: '/index/rawMaterialOrderList'
  }, {
    name: '物料出入库列表',
    url: '/index/rawMaterialStockList'
  }]
}, {
  name: '生产管理',
  children: [{
    name: '织造加工列表',
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
    name: '包装订购列表',
    url: '/index/packagList'
  }, {
    name: '装箱出库列表',
    url: '/index/packagOutStockList'
  }]
}, {
  name: '库存管理',
  children: [{
    name: '添加产品库存',
    url: '/index/stockProductList'
  }, {
    name: '产品库存列表',
    url: '/index/productStockList'
  },
  // {
  //   name: '添加物料库存',
  //   url: '/index/mainMaterialStockCreate'
  // },
  {
    name: '物料仓库',
    url: '/index/materialStockList'
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
// 次品原因
const defectiveType = ['跳线', '污迹', '经纬断线', '严重破损', '边型问题', '流苏问题', '颜色问题', '花型问题', '款型问题', '克重问题', '长度问题', '工序问题', '质量问题', '加工问题', '其他问题']
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
// 国家
const countries = '中国、蒙古、朝鲜、韩国、日本、菲律宾、越南、老挝、柬埔寨、缅甸、泰国、马来西亚、文莱、新加坡、印度尼西亚、东帝汶、尼泊尔、不丹、孟加拉国、印度、巴基斯坦、斯里兰卡、马尔代夫、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、乌兹别克斯坦、土库曼斯坦、阿富汗、伊拉克、伊朗、叙利亚、约旦、黎巴嫩、以色列、巴勒斯坦、沙特阿拉伯、巴林、卡塔尔、科威特、阿拉伯联合酋长国（阿联酋）、阿曼、也门、格鲁吉亚、亚美尼亚、阿塞拜疆、土耳其、塞浦路斯、芬兰、瑞典、挪威、冰岛、丹麦 法罗群岛（丹）、爱沙尼亚、拉脱维亚、立陶宛、白俄罗斯、俄罗斯、乌克兰、摩尔多瓦、波兰、捷克、斯洛伐克、匈牙利、德国、奥地利、瑞士、列支敦士登、英国、爱尔兰、荷兰、比利时、卢森堡、法国、摩纳哥、罗马尼亚、保加利亚、塞尔维亚、马其顿、阿尔巴尼亚、希腊、斯洛文尼亚、克罗地亚、波斯尼亚和墨塞哥维那、梵蒂冈、圣马力诺、马耳他、西班牙、葡萄牙、安道尔、埃及、利比亚、苏丹、突尼斯、阿尔及利亚、摩洛哥、亚速尔群岛（葡）、马德拉群岛（葡）、埃塞俄比亚、厄立特里亚、索马里、吉布提、肯尼亚、坦桑尼亚、乌干达、卢旺达、布隆迪、塞舌尔、乍得、中非、喀麦隆、赤道几内亚、加蓬、刚果共和国（即：刚果（布））、刚果民主共和国（即：刚果（金））、圣多美及普林西比、毛里塔尼亚、西撒哈拉、塞内加尔、冈比亚、马里、布基纳法索、几内亚、几内亚比绍、佛得角、塞拉利昂、利比里亚、科特迪瓦、加纳、多哥、贝宁、尼日尔、加那利群岛（西）、赞比亚、安哥拉、津巴布韦、马拉维、莫桑比克、博茨瓦纳、纳米比亚、南非、斯威士兰、莱索托、马达加斯加、科摩罗、毛里求斯、留尼旺（法）、圣赫勒拿（英）、澳大利亚、新西兰、巴布亚新几内亚、所罗门群岛、瓦努阿图、密克罗尼西亚、马绍尔群岛、帕劳、瑙鲁、基里巴斯、图瓦卢、萨摩亚、斐济群岛、汤加、库克群岛（新）、关岛（美）、新喀里多尼亚（法）、法属波利尼西亚、皮特凯恩岛（英）、瓦利斯与富图纳（法）、纽埃（新）、托克劳（新）、美属萨摩亚、北马里亚纳（美）、加拿大、美国、墨西哥、格陵兰（丹）、危地马拉、伯利兹、萨尔瓦多、洪都拉斯、尼加拉瓜、哥斯达黎加、巴拿马、巴哈马、古巴、牙买加、海地、多米尼加共和国、安提瓜和巴布达、圣基茨和尼维斯、多米尼克、圣卢西亚、圣文森特和格林纳丁斯、格林纳达、巴巴多斯、特立尼达和多巴哥、波多黎各（美）、英属维尔京群岛、美属维尔京群岛、安圭拉（英）、蒙特塞拉特（英）、瓜德罗普（法）、马提尼克（法）、荷属安的列斯、阿鲁巴（荷）、特克斯和凯科斯群岛（英）、开曼群岛（英）、百慕大（英）、哥伦比亚、委内瑞拉、圭亚那、法属圭亚那、苏里南、厄瓜多尔、秘鲁、玻利维亚、巴西、智利、阿根廷、乌拉圭、巴拉圭'
export { menu, menu2, letterArr, companyType, moneyArr, machiningType, defectiveType, countries }
