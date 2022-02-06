import axios from 'axios'

const appToken = 'app-token'

axios.defaults.baseURL = '/api/'
axios.interceptors.request.use(request => {
  const token = localStorage.getItem(appToken)

  if (request.headers && token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})
axios.interceptors.response.use(response => {
  if (response.data.token) {
    localStorage.setItem(appToken, response.data.token)
  }

  return response
})

const api = {
  authenticate: {
    post: {
      login ({ email, password }: { email: string, password: string }) {
        return axios.post('users/login', { email, password })
      }
    }
  }
}

export default {
  api
}
