import axios from 'axios'
let qs = require('qs')

/*
*本文件是对axios的使用封装
*/
// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

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
