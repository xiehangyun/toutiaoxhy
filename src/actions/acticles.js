import axios from '../utils/interceptors'
import { API_ARTICLES, API_CHANNELS } from '../constant/api'
export function delArticles (id) {
  return axios({
    url: `${API_ARTICLES}/${id}`,
    method: 'delete'
  })
}
export function getChannelsList () {
  return axios({
    url: API_CHANNELS
  })
}
export function getArticles (params) {
  return axios({
    url: API_ARTICLES,
    params
  })
}
