import axios from '../utils/interceptors'
import { API_COMMENTS_STATUS, API_ARTICLES } from '../constant/api'
export function commentStatus (id, status) {
  return axios({
    method: 'put',
    url: API_COMMENTS_STATUS,
    params: {
      article_id: id
    },
    data: {
      allow_comment: status
    }
  })
}
export function getComment (params) {
  return axios({
    url: API_ARTICLES,
    params
  })
}
