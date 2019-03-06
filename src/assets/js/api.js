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
export { login, register, sendCode, getToken }
