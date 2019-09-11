import axios from 'axios'
import router from '../../router'
import Message from 'element-ui'
let qs = require('qs')

/*
*本文件是对axios的使用封装
*/
// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
// 在请求拦截器中 设置token，此时会更新token
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    if (error.response.status === 403) {
      router.push({
        path: '/index/error/403'
      })
    }
    if (error.response.status === 500) {
      router.push({
        path: '/index/error/500'
      })
    }
    if (error.response.status === 502) {
      router.push({
        path: '/index/error/502'
      })
    }
    if (error.response.status === 404) {
      router.push({
        path: '/index/error/404'
      })
    }
    if (error.response.status === 429) {
      router.push({
        path: '/index/error/429'
      })
    }
    // 返回 response 里的错误信息
    let errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  }
)

// 设置请求携带session
// axios.defaults.withCredentials = true

// 请求超时时间
axios.defaults.timeout = 30000

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

async function get (url, params) {
  params = typeof (params) === 'object' ? params : {}
  params.user_id = window.sessionStorage.getItem('user_id')
  params.company_id = window.sessionStorage.getItem('company_id')
  try {
    let response = await axios({ method: 'get', url: url, params: params })
    if (response.data.code === 999) {
      Message.Message.error({
        message: response.data.message
      })
      router.push('/index')
      return Promise.reject(response)
    }
    if (response.data.code === 501 || response.data.code === 502) {
      Message.Message.error({
        message: '登录信息过期',
        duration: 0,
        showClose: true
      })
      router.push('/login' + '?nextUrl=' + window.location.href)
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
async function post (url, params, contentType, responseType) {
  params = typeof (params) === 'object' ? params : {}
  params.user_id = window.sessionStorage.getItem('user_id')
  params.company_id = window.sessionStorage.getItem('company_id')
  // 设置请求头
  let headers = {}
  if (contentType && contentType === 'application/json') {
    headers = { 'Content-Type': 'application/json' }
  } else {
    params = qs.stringify(params)
    headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  // 设置响应头
  responseType = responseType || 'json'
  try {
    let response = await axios({
      method: 'post',
      url: url,
      data: { 'user_id': window.sessionStorage.getItem('user_id'), ...params },
      headers: headers,
      responseType: responseType
    })
    if (response.data.code === 999) {
      Message.Message.error({
        message: response.data.message
      })
      router.push('/index/home')
      return Promise.reject(response)
    }
    console.log(response.data)
    if (response.data.code === 501 || response.data.code === 502) {
      Message.Message.error({
        message: '登录信息过期',
        duration: 0,
        showClose: true
      })
      router.push('/login' + '?nextUrl=' + window.location.href)
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

let http = {
  get: get,
  post: post
}

export default http
