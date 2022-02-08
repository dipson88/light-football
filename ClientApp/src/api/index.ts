import axios from 'axios'
import router from '@/router'
import { useLoginStore } from '@/store/useLoginStore'
import { enums, routerHelper } from '@/utils'
import { LoginUserInputType } from '@/utils/types'

axios.defaults.baseURL = '/api/'
axios.interceptors.request.use(request => {
  const loginStore = useLoginStore()

  if (request.headers && loginStore.token) {
    request.headers.Authorization = `Bearer ${loginStore.token}`
  }

  return request
})
axios.interceptors.response.use(response => response, error => {
  switch (error.response.status) {
    case enums.HttpStatuses.Status401: {
      const loginStore = useLoginStore()
      loginStore.token = ''
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
      login ({ email, password }: Partial<LoginUserInputType>) {
        return axios.post('auth/login', { email, password })
      }
    }
  },
  users: {
    get: {
      userInfo () {
        return axios.get('users/info')
      }
    },
    post: {
      createUser (model: LoginUserInputType) {
        return axios.post('users/create', model)
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
