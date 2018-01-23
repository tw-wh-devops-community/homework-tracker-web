import axios from 'axios'
import {fetchHomework} from './adminActions'
import store from '../store'

const api=() =>{
  return axios.create({
    baseURL: 'http://localhost:3000/'
  })
}

const getHomework = ()=> {
  api().get('')
    .then(function (result) {
      store.dispatch(fetchHomework(result))
    })
}

export default getHomework