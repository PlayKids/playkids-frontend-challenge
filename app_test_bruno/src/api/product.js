import http from './config'

const product = () => {
  const list = (query = []) => new Promise((resolve, reject) => {
    http.get(`/products?${query.join('&')}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })

  const view = (id) => new Promise((resolve, reject) => {
    http.get(`/products?id=${id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })

  return {
    list,
    view
  }
}

export default product
