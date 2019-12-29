import axios from '../utils/interceptors'
import { API_LOGIN } from '../constant/api'

export function logIn (data) {
  return axios({
    method: 'post',
    url: API_LOGIN,
    data
  })
}
