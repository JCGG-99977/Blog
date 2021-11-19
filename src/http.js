import axios from 'axios'
// 环境
axios.defaults.baseURL = 'http://192.168.1.80:3333' // 开发环境

// 请求超时时间
// axios.defaults.timeout = 5000

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function get (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  
  /**
   * 封装delete请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function del (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
  
  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
  
  /**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function put (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
  