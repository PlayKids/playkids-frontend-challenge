import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://5ff37c3328c3980017b195e8.mockapi.io/api/'
})

export default instance
