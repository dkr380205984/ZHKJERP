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
const addStation = (params) => http.post(`${baseUrl}/auth//station/add`, params, 'application/json')
// 添加分组
const addGroup = (params) => http.post(`${baseUrl}/auth//group/add`, params, 'application/json')
// 获取岗位
const getStation = (params) => http.get(`${baseUrl}/auth//station/all`, params)
// 获取分组
const getGroup = (params) => http.get(`${baseUrl}/auth//group/all`, params)
// 添加员工账号
const addAuth = (params) => http.post(`${baseUrl}/auth/add`, params, 'application/json')
// 获取员工分组
const authList = (params) => http.get(`${baseUrl}/auth//list`, params)
// 禁用员工
const banAuth = (params) => http.post(`${baseUrl}/auth/check_status`, params, 'application/json')
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
export {
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
  proproductTppeDelete
}
