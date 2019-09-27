import http from './http.js'
const baseUrl = '/api'
// 登录
const login = (params) => http.post(`${baseUrl}/auth/login`, params, 'application/json')
// 登录验证
const loginCheck = (params) => http.post(`${baseUrl}/auth/check/login`, params, 'application/json')
// 注册
const register = (params) => http.post(`${baseUrl}/auth/register`, params, 'application/json')
// 发送验证码
const sendCode = (params) => http.post(`${baseUrl}/auth/send_code`, params, 'application/json')
// 获取图片上传验证
const getToken = (params) => http.get(`${baseUrl}/upload/token`, params)
// 修改密码
const updatePsd = (params) => http.post(`${baseUrl}/auth/reset_pass`, params, 'application/json')
// 添加岗位
const addStation = (params) => http.post(`${baseUrl}/user/station/save`, params, 'application/json')
// 添加分组
const addGroup = (params) => http.post(`${baseUrl}/user/group/save`, params, 'application/json')
// 删除岗位
const deleteStation = (params) => http.post(`${baseUrl}/user/station/delete`, params, 'application/json')
// 删除分组
const deleteGroup = (params) => http.post(`${baseUrl}/user/group/delete`, params, 'application/json')
// 获取岗位
const getStation = (params) => http.get(`${baseUrl}/user/station/list`, params)
// 获取分组
const getGroup = (params) => http.get(`${baseUrl}/user/group/list`, params)
// 添加员工账号
const addAuth = (params) => http.post(`${baseUrl}/user/save`, params, 'application/json')
// 获取员工分组
const authList = (params) => http.get(`${baseUrl}/user/list`, params)
// 禁用员工
const banAuth = (params) => http.post(`${baseUrl}/user/check_status`, params, 'application/json')
// 删除上传图片
const deletePic = (params) => http.post(`${baseUrl}/upload/delete`, params, 'application/json')
// 获取类型列表
const productTppeList = (params) => http.get(`${baseUrl}/product/category/list`, params)
// 添加产品类型
const proproductTppeSave = (params) => http.post(`${baseUrl}/product/category/save`, params, 'application/json')
// 删除产品类型
const proproductTppeDelete = (params) => http.post(`${baseUrl}/product/category/delete`, params, 'application/json')
// 获取花型列表
const flowerList = (params) => http.get(`${baseUrl}/product/flower/list`, params)
// 添加花型
const saveFlower = (params) => http.post(`${baseUrl}/product/flower/save`, params, 'application/json')
// 删除花型
const deleteFlower = (params) => http.post(`${baseUrl}/product/flower/delete`, params, 'application/json')
// 获取成分列表
const ingredientList = (params) => http.get(`${baseUrl}/product/component/list`, params)
// 添加成分
const ingredientSave = (params) => http.post(`${baseUrl}/product/component/save`, params, 'application/json')
// 删除成分
const ingredientDelete = (params) => http.post(`${baseUrl}/product/component/delete`, params, 'application/json')
// 获取颜色列表
const colorList = (params) => http.get(`${baseUrl}/product/color/list`, params)
// 添加颜色
const colorSave = (params) => http.post(`${baseUrl}/product/color/save`, params, 'application/json')
// 删除颜色
const colorDelete = (params) => http.post(`${baseUrl}/product/color/delete`, params, 'application/json')
// 尺寸列表
const sizeList = (params) => http.get(`${baseUrl}/product/measurement/company/all`, params)
// 添加尺寸
const sizeSave = (params) => http.post(`${baseUrl}/product/measurement/save`, params, 'application/json')
// 获取尺寸
const sizeOne = (params) => http.get(`${baseUrl}/product/measurement/category/all`, params)
// 删除尺寸
const sizeDelete = (params) => http.post(`${baseUrl}/product/measurement/delete`, params, 'application/json')
// 尺码列表
const footageList = (params) => http.get(`${baseUrl}/product/size/list`, params)
// 添加尺码
const footageSave = (params) => http.post(`${baseUrl}/product/size/save`, params, 'application/json')
// 获取尺码
const footageOne = (params) => http.get(`${baseUrl}/product/size/category/all`, params)
// 获取产品单位列表
const unitList = (params) => http.get(`${baseUrl}/product/unit/all`, params)
// 添加产品单位
const unitSave = (params) => http.post(`${baseUrl}/product/unit/save`, params, 'application/json')
// 删除产品单位
const unitDelete = (params) => http.post(`${baseUrl}/product/unit/delete`, params, 'application/json')
// 删除尺码
const footageDelete = (params) => http.post(`${baseUrl}/product/size/delete`, params, 'application/json')
// 添加产品
const saveProduct = (params) => http.post(`${baseUrl}/product/save`, params, 'application/json')
// 产品列表
const productList = (params) => http.get(`${baseUrl}/product/list`, params)
// 单个产品获取
const porductOne = (params) => http.get(`${baseUrl}/product/one`, params)
// 删除产品
const productDelete = (params) => http.post(`${baseUrl}/product/delete`, params, 'application/json')
// 添加纱线名称
const saveYarn = (params) => http.post(`${baseUrl}/yarn/save`, params, 'application/json')
// 纱线名称列表
const YarnList = (params) => http.get(`${baseUrl}/yarn/list`, params)
// 添加纱线支数
const saveYarnCount = (params) => http.post(`${baseUrl}/yarn/count/save`, params, 'application/json')
// 添加纱线类型
const saveYarnType = (params) => http.post(`${baseUrl}/yarn/type/save`, params, 'application/json')
// 添加纱线颜色
const saveYarnColor = (params) => http.post(`${baseUrl}/yarn/color/save`, params, 'application/json')
// 纱线颜色列表
const YarnColorList = (params) => http.get(`${baseUrl}/yarn/color/list`, params)
// 纱线详情
const yarnDetail = (params) => http.get(`${baseUrl}/yarn/one`, params)
// 获取工序+边型+织造法+机型
const editList = (params) => http.get(`${baseUrl}/production/edit/list`, params)
// 添加机型
const saveProductionType = (params) => http.post(`${baseUrl}/production/type/save`, params, 'application/json')
// 添加工序
const saveProductionProcess = (params) => http.post(`${baseUrl}/production/process/save`, params, 'application/json')
// 添加织造法
const saveProductionMethod = (params) => http.post(`${baseUrl}/production/method/save`, params, 'application/json')
// 添加边型
const saveProductionSide = (params) => http.post(`${baseUrl}/production/side/save`, params, 'application/json')
// 添加工艺单
const saveCraft = (params) => http.post(`${baseUrl}/product/craft/save`, params, 'application/json')
// 工艺单列表
const craftList = (params) => http.get(`${baseUrl}/product/craft/list`, params)
// 获取单张工艺单
const craftOne = (params) => http.get(`${baseUrl}/product/craft/one`, params)
// 根据产品id获取工艺单
const craftProduct = (params) => http.get(`${baseUrl}/craft/product/one`, params)
// 删除工艺单
const craftDelete = (params) => http.post(`${baseUrl}/product/craft/draft/delete`, params, 'application/json')
// 添加穿综法
const savePM = (params) => http.post(`${baseUrl}/craft/pattern/save`, params, 'application/json')
// 穿综法列表
const PMList = (params) => http.get(`${baseUrl}/craft/pattern/list`, params)
// 删除穿综法
const deletePM = (params) => http.post(`${baseUrl}/craft/pattern/delete`, params, 'application/json')
// 获取产品计划单
const productPlanOne = (params) => http.get(`${baseUrl}/product/plan/one`, params)
// 产品计划单列表
const productPlanList = (params) => http.get(`${baseUrl}/product/plan/list`, params)
// 添加产品计划单
const saveProductPlan = (params) => http.post(`${baseUrl}/product/plan/save`, params, 'application/json')
// 根据code获取计划单
const productPlanDetail = (params) => http.get(`${baseUrl}/product/plan/product/one`, params)
// 添加产品辅料
const saveMaterial = (params) => http.post(`${baseUrl}/product/material/save`, params, 'application/json')
// 删除产品辅料
const deleteMaterial = (params) => http.post(`${baseUrl}/product/material/delete`, params, 'application/json')
// 获取辅料列表
const materialList = (params) => http.get(`${baseUrl}/product/material/list`, params)
// 辅料详情
const materialDetail = (params) => http.get(`${baseUrl}/product/material/one`, params)
// 外贸公司列表
const clientList = (params) => http.get(`${baseUrl}/client/list`, params)
// 禁用/启用联系人
const contactsCheck = (params) => http.post(`${baseUrl}/client/contacts/check`, params, 'application/json')
// 删除联系人
const contactsDelete = (params) => http.post(`${baseUrl}/client/contacts/delete`, params, 'application/json')
// 外贸公司详情
const clientDetail = (params) => http.get(`${baseUrl}/client/one`, params)
// 删除外贸公司
const clientDelete = (params) => http.post(`${baseUrl}/client/delete`, params, 'application/json')
// 添加外贸公司
const clientAdd = (params) => http.post(`${baseUrl}/client/save`, params, 'application/json')
// 添加样品订单
const sampleSave = (params) => http.post(`${baseUrl}/order/sample/save`, params, 'application/json')
// 创建订单
const orderSave = (params) => http.post(`${baseUrl}/order/save`, params, 'application/json')
// 订单取消
const orderCancleLog = (params) => http.get(`${baseUrl}/order/cancel/list`, params)
// 订单详情
const orderDetail = (params) => http.get(`${baseUrl}/order/one`, params)
// 订单详情新
const orderDetailNew = (params) => http.get(`${baseUrl}/order/detail`, params)
// 修改订单状态
const orderCheck = (params) => http.post(`${baseUrl}/order/status/check`, params, 'application/json')
// 订单列表
const orderList = (params) => http.get(`${baseUrl}/order/list`, params)
// 订单删除
const orderDelete = (params) => http.post(`${baseUrl}/order/delete`, params, 'application/json')
// 订单批次信息
const orderBatchList = (params) => http.get(`${baseUrl}/order/batch/list`, params)
// 添加产品库存
const productStockSave = (params) => http.post(`${baseUrl}/product/stock/save`, params, 'application/json')
// 产品库存列表
const productStockList = (params) => http.get(`${baseUrl}/product/stock/list`, params)
// 产品库存详情--添加记录
const productStockDetail = (params) => http.get(`${baseUrl}/product/stock/detail`, params)
// 获取单挑产品库存
const productStockOne = (params) => http.get(`${baseUrl}/product/stock/one`, params)
// 原料库存列表
const materialStockList = (params) => http.get(`${baseUrl}/stock/material/list`, params)
// 原料库存详情
// const materialStockDetail = (params) => http.get(`${baseUrl}/material/stock/detail`, params)
// 原料库存内详情
const stockMaterialDetail = (params) => http.get(`${baseUrl}/stock/material/detail`, params)
// 订单库存详情
const orderStockDetail = (params) => http.get(`${baseUrl}/product/stock/order`, params)
// 添加生产计划单
const productionSave = (params) => http.post(`${baseUrl}/production/save`, params, 'application/json')
// 生产计划单列表
const productionList = (params) => http.get(`${baseUrl}/production/list`, params)
// 生产计划单详情
const productionDetail = (params) => http.get(`${baseUrl}/production/one`, params)
// 生产统计单详情
const productionStat = (params) => http.get(`${baseUrl}/product/plan/order`, params)
// 潘通色号列表
const pantongList = (params) => http.get(`${baseUrl}/pan/color/list`, params)
// 原料预订购
const rawMaterialPurchase = (params) => http.post(`${baseUrl}/material/reserve/save`, params, 'application/json')
// 物料订购初始化
const rawMaterialOrderInit = (params) => http.get(`${baseUrl}/material/order/init`, params)
// 物料订购
const rawMaterialOrder = (params) => http.post(`${baseUrl}/material/order/save`, params, 'application/json')
// 物料已订购列表、物料订购详情
const rawMaterialOrderList = (params) => http.get(`${baseUrl}/material/order/list`, params)
// 物料已加工列表、物料加工详情
const rawMaterialProcessList = (params) => http.get(`${baseUrl}/material/process/list`, params)
// 物料加工
const rawMaterialProcessPage = (params) => http.post(`${baseUrl}/material/process/save`, params, 'application/json')
// 物料入库
const rawMaterialGoStock = (params) => http.post(`${baseUrl}/order/material/push`, params, 'application/json')
// 物料出库
const rawMaterialOutStock = (params) => http.post(`${baseUrl}/order/material/pop`, params, 'application/json')
// 物料出库详情
const rawMaterialOutStockDetail = (params) => http.get(`${baseUrl}/order/material/pop/detail`, params)
// 物料入库详情
const rawMaterialGoStockDetail = (params) => http.get(`${baseUrl}/order/material/push/detail`, params)
// 织造分配
const weaveSave = (params) => http.post(`${baseUrl}/production/weave/save`, params, 'application/json')
// 织造分配详情
const weaveDetail = (params) => http.get(`${baseUrl}/production/weave/list`, params)
// 织造分配更新
const weaveUpadate = (params) => http.post(`${baseUrl}/production/weave/edit`, params, 'application/json')
// 根据订单号获取产品配料详情
const productOrderDetail = (params) => http.get(`${baseUrl}/product/plan/order/detail`, params)
// 半成品加工分配
const halfProductSave = (params) => http.post(`${baseUrl}/production/semi_product/save`, params, 'application/json')
// 半成品加工分配详情
const halfProductDetail = (params) => http.get(`${baseUrl}/production/semi_product/list`, params)
// 半成品加工更新
const halfProductUpadate = (params) => http.post(`${baseUrl}/production/semi_product/edit`, params, 'application/json')
// 半成品检验
const semiExamination = (params) => http.post(`${baseUrl}/product/semi/inspection`, params, 'application/json')
// 成品检验
const finishedExamination = (params) => http.post(`${baseUrl}/product/inspection`, params, 'application/json')
// 半成品检验详情
const semiExaminationDetail = (params) => http.get(`${baseUrl}/product/semi/inspection/list`, params)
// 成品检验详情
const finishedExaminationDetail = (params) => http.get(`${baseUrl}/product/inspection/list`, params)
// 产品出库
const storeOut = (params) => http.post(`${baseUrl}/product/order/pop`, params, 'application/json')
// 出库详情列表
const storeOutList = (params) => http.get(`${baseUrl}/product/order/push/list`, params)
// 出库日志修改
const storeOutUpdate = (params) => http.post(`${baseUrl}/product/order/pop/edit`, params, 'application/json')
// 产品入库
const storeIn = (params) => http.post(`${baseUrl}/product/order/push`, params, 'application/json')
// 入库详情列表
const storeInList = (params) => http.get(`${baseUrl}/product/order/pop/list`, params)
// 入库日志修改
const storeInUpdate = (params) => http.post(`${baseUrl}/product/order/push/edit`, params, 'application/json')
// 补纱
const replenishYarnSave = (params) => http.post(`${baseUrl}/production/yarn/replenish/save`, params, 'application/json')
// 补纱列表
const replenishYarnList = (params) => http.get(`${baseUrl}/production/yarn/replenish/list`, params)
// 承担公司
const bearClient = (params) => http.get(`${baseUrl}/production/order/client/list`, params)
// 包装辅料添加
const packagMaterialAdd = (params) => http.post(`${baseUrl}/pack/material/save`, params, 'application/json')
// 包装辅料详情
const packagMaterialdetail = (params) => http.get(`${baseUrl}/pack/material/one`, params)
// 包装辅料列表
const packagMaterialList = (params) => http.get(`${baseUrl}/pack/material/list`, params)
// 包装辅料订购
const packagMaterialPage = (params) => http.post(`${baseUrl}/pack/order/save`, params, 'application/json')
// 包装辅料订购详情
const packagMaterialDetail = (params) => http.get(`${baseUrl}/pack/order/list`, params)
// 添加包装资料
const packagCreate = (params) => http.post(`${baseUrl}/pack/info/save`, params, 'application/json')
// 包装资料详情
const packagDetail = (params) => http.get(`${baseUrl}/pack/info/list`, params)
// 装箱出库
const outStockAdd = (params) => http.post(`${baseUrl}/stock/out/save`, params, 'application/json')
// 装箱出库详情 stock/out/list'
const outStockDetail = (params) => http.get(`${baseUrl}/stock/out/list`, params)
// 添加实际装箱数 pack/real/save
const packagNumberAdd = (params) => http.post(`${baseUrl}/pack/real/save`, params, 'application/json')
// 实际装箱详情
const packagNumberDetail = (params) => http.get(`${baseUrl}/pack/real/list`, params)
// 原料预订购
const rawMaterialPurchaseList = (params) => http.get(`${baseUrl}/material/reserve/list`, params)
// 原料预订购详情
const rawMaterialPurchaseDetail = (params) => http.get(`${baseUrl}/material/reserve/one`, params)
// 原料预定购入库
const rawMaterialPurchaseIn = (params) => http.post(`${baseUrl}/material/reserve/push`, params, 'application/json')
// 物料结余入库
const materialSurplusPush = (params) => http.post(`${baseUrl}/order/material/surplus/push`, params, 'application/json')
// 产品结余入库
const productSurplusPush = (params) => http.post(`${baseUrl}/product/stock/save`, params, 'application/json')
// 订单物料库存
const orderMaterialSotckDetail = (params) => http.get(`${baseUrl}/order/material/list`, params)
// 结余清空
const surplusDelete = (params) => http.post(`${baseUrl}/order/material/surplus/delete`, params, 'application/json')
// 添加权限 permission/save
const permissionAdd = (params) => http.post(`${baseUrl}/permission/save`, params, 'application/json')
// 权限列表
const permissionList = (params) => http.get(`${baseUrl}/permission/company/all`, params)
// 添加角色权限
const rolePermissionAdd = (params) => http.post(`${baseUrl}/permission/group/save`, params, 'application/json')
// 岗位权限列表
const stationPermissionList = (params) => http.get(`${baseUrl}/permission/group/all`, params)
// 添加报价单
const priceListCreate = (params) => http.post(`${baseUrl}/product/quotation/save`, params, 'application/json')
// 报价单列表
const priceListList = (params) => http.get(`${baseUrl}/product/quotation/list`, params)
// 报价单详情
const priceListDetail = (params) => http.get(`${baseUrl}/product/quotation/detail`, params)
// 报价单审核
const priceListCheck = (params) => http.post(`${baseUrl}/product/quotation/check`, params, 'application/json')
// 原料对应仓库material/stock/material
// const materialStockListNew = (params) => http.get(`${baseUrl}/material/stock/material`, params)
// 转账记录financial/transfer/list
const transferList = (params) => http.get(`${baseUrl}/financial/transfer/list`, params)
// 扣款记录financial/deduct/list
const deductList = (params) => http.get(`${baseUrl}/financial/deduct/list`, params)
// 结算记录financial/settle/list
const settleList = (params) => http.get(`${baseUrl}/financial/settle/list`, params)
// 添加转账记录financial/transfer/save
const transferAdd = (params) => http.post(`${baseUrl}/financial/transfer/save`, params, 'application/json')
// 添加扣款记录financial/deduct/save
const deductAdd = (params) => http.post(`${baseUrl}/financial/deduct/save`, params, 'application/json')
// 添加结算记录financial/settle/save
const settleAdd = (params) => http.post(`${baseUrl}/financial/settle/save`, params, 'application/json')
// 订单财务统计合计值financial/order/count
const orderFinancialCount = (params) => http.get(`${baseUrl}/financial/order/count`, params)
// 查询合作公司日志financial/client/log
const clientFinancialLog = (params) => http.get(`${baseUrl}/financial/client/log`, params)
// 合作公司财务列表financial/client/list
const clientFinancialList = (params) => http.get(`${baseUrl}/financial/client/list`, params)
// 合作公司财务合计值financial/client/total
const clientFinancialTotal = (params) => http.get(`${baseUrl}/financial/client/total`, params)
// 产品产值统计financial/product/count
const productFinancialTotal = (params) => http.get(`${baseUrl}/financial/product/count`, params)
// 物料使用统计financial/material/count
const materialFinancialTotal = (params) => http.get(`${baseUrl}/financial/material/count`, params)
// 设置工厂信息
const companyInfoSetting = (params) => http.post(`${baseUrl}/company/save`, params, 'application/json')
// 获取工厂信息
const companyInfoDetail = (params) => http.get(`${baseUrl}/company/detail`, params)
// 设置产品手册
const productMenuSetting = (params) => http.post(`${baseUrl}/product/handbook/save`, params, 'application/json')
// 获取产品手册
const productMenuList = (params) => http.get(`${baseUrl}/product/handbook/list`, params)
// 添加样单order/sample/save
const sampleOrderCreate = (params) => http.post(`${baseUrl}/order/sample/save`, params, 'application/json')
// 获取样单列表order/sample/list
const sampleOrderList = (params) => http.get(`${baseUrl}/order/sample/list`, params)
// 新建消息
const notifySave = (params) => http.post(`${baseUrl}/notify/save`, params, 'application/json')
// 消息列表
const notifyList = (params) => http.get(`${baseUrl}/notify/all`, params)
// 消息读取
const notifyRead = (params) => http.post(`${baseUrl}/notify/check/status`, params, 'application/json')
// 未读消息数量
const notifyNum = (params) => http.get(`${baseUrl}/notify/no/read`, params)
export {
  notifyNum,
  notifySave,
  notifyList,
  notifyRead,
  sampleOrderList,
  sampleOrderCreate,
  savePM,
  PMList,
  deletePM,
  productMenuList,
  productMenuSetting,
  companyInfoDetail,
  companyInfoSetting,
  materialFinancialTotal,
  productFinancialTotal,
  clientFinancialTotal,
  clientFinancialList,
  clientFinancialLog,
  orderFinancialCount,
  settleAdd,
  deductAdd,
  transferAdd,
  settleList,
  deductList,
  transferList,
  // materialStockListNew,
  materialDetail,
  yarnDetail,
  priceListCheck,
  priceListDetail,
  priceListList,
  priceListCreate,
  orderCancleLog,
  productSurplusPush,
  stationPermissionList,
  rolePermissionAdd,
  permissionList,
  permissionAdd,
  stockMaterialDetail,
  surplusDelete,
  orderMaterialSotckDetail,
  materialSurplusPush,
  orderDetailNew,
  orderCheck,
  rawMaterialPurchaseIn,
  rawMaterialPurchaseDetail,
  rawMaterialPurchaseList,
  packagNumberDetail,
  packagNumberAdd,
  outStockDetail,
  outStockAdd,
  packagMaterialList,
  packagMaterialdetail,
  packagMaterialAdd,
  packagCreate,
  packagDetail,
  packagMaterialPage,
  packagMaterialDetail,
  bearClient,
  replenishYarnSave,
  replenishYarnList,
  finishedExaminationDetail,
  semiExaminationDetail,
  finishedExamination,
  semiExamination,
  storeOutUpdate,
  storeInUpdate,
  storeOut,
  storeOutList,
  storeIn,
  storeInList,
  halfProductUpadate,
  weaveUpadate,
  productOrderDetail,
  rawMaterialOutStockDetail,
  halfProductDetail,
  halfProductSave,
  rawMaterialGoStockDetail,
  rawMaterialOutStock,
  rawMaterialGoStock,
  weaveDetail,
  weaveSave,
  rawMaterialProcessPage,
  rawMaterialProcessList,
  rawMaterialOrderList,
  rawMaterialOrder,
  rawMaterialOrderInit,
  craftDelete,
  // materialStockDetail,
  materialStockList,
  YarnColorList,
  pantongList,
  deleteStation,
  deleteGroup,
  loginCheck,
  orderDelete,
  productStockOne,
  productDelete,
  productionStat,
  productionDetail,
  productionList,
  productionSave,
  orderStockDetail,
  productStockDetail,
  productStockList,
  productStockSave,
  orderSave,
  orderDetail,
  orderList,
  orderBatchList,
  craftProduct,
  clientList,
  contactsCheck,
  contactsDelete,
  clientDetail,
  clientDelete,
  clientAdd,
  login,
  register,
  sendCode,
  getToken,
  updatePsd,
  addStation,
  addGroup,
  getStation,
  getGroup,
  addAuth,
  authList,
  banAuth,
  deletePic,
  productTppeList,
  saveFlower,
  flowerList,
  proproductTppeSave,
  deleteFlower,
  ingredientList,
  ingredientSave,
  ingredientDelete,
  colorList,
  colorSave,
  colorDelete,
  proproductTppeDelete,
  sizeList,
  sizeSave,
  sizeOne,
  sizeDelete,
  footageList,
  footageSave,
  footageOne,
  footageDelete,
  saveProduct,
  productList,
  porductOne,
  YarnList,
  editList,
  saveProductionType,
  saveProductionProcess,
  saveProductionMethod,
  saveProductionSide,
  saveYarn,
  saveYarnCount,
  saveYarnType,
  saveYarnColor,
  saveCraft,
  craftList,
  productPlanOne,
  productPlanList,
  saveProductPlan,
  productPlanDetail,
  saveMaterial,
  deleteMaterial,
  materialList,
  unitList,
  unitSave,
  unitDelete,
  sampleSave,
  craftOne,
  rawMaterialPurchase
}
