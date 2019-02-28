// import http from './http.js'
// const baseUrl = '/api'
// // 登录
// const login = (params) => http.post(`${baseUrl}/auth/login`, params, 'application/json')
// export { login }

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = '/api'
const login = (params) => axios.post(`/auth/login`, params)
export { login }
