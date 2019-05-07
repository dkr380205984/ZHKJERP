import axios from 'axios'
import router from '../../router'
let qs = require('qs')

/*
*本文件是对axios的使用封装
*/
// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

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
  try {
    let response = await axios({ method: 'get', url: url, params: params })
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
      data: params,
      headers: headers,
      responseType: responseType
    })
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
