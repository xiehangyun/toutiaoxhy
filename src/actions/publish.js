import axios from '../utils/interceptors'
import { API_ARTICLES } from '../constant/api'
export function publishArticales (articlesId, params, data) {
  return axios({
    method: articlesId ? 'put' : 'post',
    url: articlesId ? `${API_ARTICLES}/${articlesId}` : API_ARTICLES,
    params,
    data
  })
}
export function getArticle (id) {
  return axios({
    url: `${API_ARTICLES}/${id}`
  })
}
