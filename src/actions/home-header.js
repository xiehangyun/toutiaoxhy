import axios from '../utils/interceptors'
import { API_USER_PROFILE } from '../constant/api'
export function userProfile () {
  return axios({
    url: API_USER_PROFILE
  })
}
