import axios from 'axios'
import ApiHost from './apiHost'

const api = axios.create({
  baseURL: ApiHost(),
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api
