import axios from '../utils/interceptors'
import { API_USER_PHOTO, API_USER_PROFILE } from '../constant/api'
export function saveUserImg (data) {
  return axios({
    url: API_USER_PHOTO,
    method: 'patch',
    data
  })
}
export function saveUserData (data) {
  return axios({
    url: API_USER_PROFILE,
    method: 'patch',
    data
  })
}
