import http from './http.js'
const baseUrl = '/api'
// 登录
const login = (params) => http.post(`${baseUrl}/auth/login`, params, 'application/json')
// 注册
const register = (params) => http.post(`${baseUrl}/auth/register`, params, 'application/json')
// 发送验证码
const sendCode = (params) => http.post(`${baseUrl}/auth/send_code`, params, 'application/json')
// 获取图片上传验证
const getToken = () => http.get(`${baseUrl}/upload/token`)
// 修改密码
const updatePsd = (params) => http.post(`${baseUrl}/auth/reset_pass`, params, 'application/json')
// 添加岗位
const addStation = (params) => http.post(`${baseUrl}/user/station/save`, params, 'application/json')
// 添加分组
const addGroup = (params) => http.post(`${baseUrl}/user/group/save`, params, 'application/json')
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
const ingredientList = (params) => http.get(`${baseUrl}/product/ingredient/list`, params)
// 添加成分
const ingredientSave = (params) => http.post(`${baseUrl}/product/ingredient/save`, params, 'application/json')
// 删除成分
const ingredientDelete = (params) => http.post(`${baseUrl}/product/ingredient/delete`, params, 'application/json')
// 获取颜色列表
const colorList = (params) => http.get(`${baseUrl}/product/color/list`, params)
// 添加颜色
const colorSave = (params) => http.post(`${baseUrl}/product/color/save`, params, 'application/json')
// 删除颜色
const colorDelete = (params) => http.post(`${baseUrl}/product/color/delete`, params, 'application/json')
// 尺寸列表
const sizeList = (params) => http.get(`${baseUrl}/product/size/company/all`, params)
// 添加尺寸
const sizeSave = (params) => http.post(`${baseUrl}/product/size/save`, params, 'application/json')
// 获取尺寸
const sizeOne = (params) => http.get(`${baseUrl}/product/size/category/all`, params)
// 删除尺寸
const sizeDelete = (params) => http.post(`${baseUrl}/product/size/delete`, params, 'application/json')
// 尺码列表
const footageList = (params) => http.get(`${baseUrl}/product/category/list`, params)
// 添加尺码
const footageSave = (params) => http.post(`${baseUrl}/product/footage/save`, params, 'application/json')
// 获取尺码
const footageOne = (params) => http.get(`${baseUrl}/product/footage/category/all`, params)
// 获取产品单位列表
const unitList = (params) => http.get(`${baseUrl}/product/unit/all`, params)
// 添加产品单位
const unitSave = (params) => http.post(`${baseUrl}/product/unit/save`, params, 'application/json')
// 删除产品单位
const unitDelete = (params) => http.post(`${baseUrl}/product/unit/delete`, params, 'application/json')
// 删除尺码
const footageDelete = (params) => http.post(`${baseUrl}/product/footage/delete`, params, 'application/json')
// 添加产品
const saveProduct = (params) => http.post(`${baseUrl}/product/save`, params, 'application/json')
// 产品列表
const productList = (params) => http.get(`${baseUrl}/product/list`, params)
// 单个产品获取
const porductOne = (params) => http.get(`${baseUrl}/product/one`, params)
// 删除产品
const productDelete = (params) => http.post(`${baseUrl}/product/delete`, params)
// 获取纱线类型+数量
const YarnList = (params) => http.get(`${baseUrl}/yarn/list`, params)
// 添加纱线支数
const saveYarnCount = (params) => http.post(`${baseUrl}/yarn/count/save`, params, 'application/json')
// 添加纱线类型
const saveYarnType = (params) => http.post(`${baseUrl}/yarn/type/save`, params, 'application/json')
// 添加纱线颜色
const saveYarnColor = (params) => http.post(`${baseUrl}/yarn/color/save`, params, 'application/json')
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
// 获取产品计划单
const productPlanOne = (params) => http.get(`${baseUrl}/product/plan/one`, params)
// 产品计划单列表
const productPlanList = (params) => http.get(`${baseUrl}/product/plan/list`, params)
// 添加产品计划单
const saveProductPlan = (params) => http.post(`${baseUrl}/product/plan/save`, params, 'application/json')
// 根据Id获取计划单
const productPlanDetail = (params) => http.get(`${baseUrl}/product/plan/product/one`, params)
// 添加产品辅料
const saveMaterial = (params) => http.post(`${baseUrl}/product/material/save`, params, 'application/json')
// 删除产品辅料
const deleteMaterial = (params) => http.post(`${baseUrl}/product/material/delete`, params, 'application/json')
// 获取辅料列表
const materialList = (params) => http.get(`${baseUrl}/product/material/list`, params)
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
// 订单详情
const orderDetail = (params) => http.get(`${baseUrl}/order/one`, params)
// 订单列表
const orderList = (params) => http.get(`${baseUrl}/order/list`, params)
// 订单批次信息
const orderBatchList = (params) => http.get(`${baseUrl}/order/batch/list`, params)
// 添加产品库存
const productStockSave = (params) => http.post(`${baseUrl}/product/stock/save`, params, 'application/json')
// 产品库存列表
const productStockList = (params) => http.get(`${baseUrl}/product/stock/list`, params)
// 产品库存详情
const productStockDetail = (params) => http.get(`${baseUrl}/product/stock/one`, params)
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
export {
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
  craftOne
}
