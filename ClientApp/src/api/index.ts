import axios from 'axios'
import router from '@/router'
import { enums, routerHelper } from '@/utils'

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
axios.interceptors.response.use(response => response, error => {
  switch (error.response.status) {
    case enums.HttpStatuses.Status401: {
      router.push({ name: routerHelper.names.Login })
      break
    }
    case enums.HttpStatuses.Status404: {
      router.push({ name: routerHelper.names.Error404 })
      break
    }
    case enums.HttpStatuses.Status500: {
      router.push({ name: routerHelper.names.Error500 })
      break
    }
  }

  return Promise.reject(error)
})

const api = {
  authenticate: {
    post: {
      login ({ email, password }: { email: string, password: string }) {
        return axios.post('auth/login', { email, password })
      }
    }
  },
  users: {
    get: {
      userInfo () {
        return axios.get('users/info')
      }
    }
  }
}

export default {
  api
}

export {
  api
}
