import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  let token = window.sessionStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.defaults.transformResponse = [function (data) {
  return data.length ? JSONBig.parse(data) : {}
}]

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let method = error.response.config.method
  let status = error.response.status
  let url = error.response.config.url
  let href = location.href
  let message = '未知异常'
  if (status === 400 && url.indexOf('/authorizations') !== -1) {
    message = '手机号或者验证码错误'
  } else if (status === 400 && url.indexOf('/comments/status') !== -1) {
    message = '操作失败'
  } else if (status === 400 && url.indexOf('/articles') !== -1 && method !== 'delete') {
    message = '请求参数错误'
  } else if (status === 400 && url.indexOf('/articles') !== -1 && method === 'delete') {
    message = '已发布文章不可删除'
  } else if (status === 401) {
    window.sessionStorage.removeItem('user-token')
    message = '登陆已过期，请重新登陆'
    router.push('/login')
  } else if (status === 404 && url.indexOf('/authorizations') !== -1) {
    message = '手机号错误'
  } else if (status === 403 && url.indexOf('/authorizations') !== -1 && href.indexOf('/login') !== -1) {
    message = '用户非实名认证用户，无权限登录'
  } else if (status === 403 && url.indexOf('/authorizations') !== -1 && !href.indexOf('/login') !== -1) {
    window.sessionStorage.removeItem('user-token')
    message = '登陆已过期,请重新登陆'
    router.push('/login')
  } else if (status === 507) {
    message = '服务器数据库异常'
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)
})

export default axios
