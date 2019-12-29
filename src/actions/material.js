import axios from '../utils/interceptors'
import { API_USER_IMAGES } from '../constant/api'
export function delMaterial (id) {
  return axios({
    url: `${API_USER_IMAGES}/${id}`,
    method: 'delete'
  })
}
export function collectCut (id, data) {
  return axios({
    url: `${API_USER_IMAGES}/${id}`,
    method: 'put',
    data
  })
}
export function UpDateImg (data) {
  return axios({
    method: 'post',
    url: API_USER_IMAGES,
    data
  })
}
export function getMaterial (params) {
  return axios({
    url: API_USER_IMAGES,
    params
  })
}
