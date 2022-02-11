import { createRouter, createWebHistory } from 'vue-router'
import { routerHelper } from '@/utils'

import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'

import Error404 from '@/components/errors/Error404.vue'
import Error500 from '@/components/errors/Error500.vue'

import LoginPage from '@/views/LoginPage/index.vue'
import CreateUser from '@/views/CreateUser/index.vue'
import MatchesPage from '@/views/MatchesPage/index.vue'

const routerNames = routerHelper.names

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: routerNames.Home,
          component: MatchesPage
        }
      ]
    },
    {
      path: '/sign-in',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: routerNames.Login,
          component: LoginPage
        }
      ]
    },
    {
      path: '/sign-up',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: routerNames.CreateUser,
          component: CreateUser
        }
      ]
    },
    {
      path: '/error',
      component: ErrorLayout,
      children: [
        {
          path: '404',
          name: routerNames.Error404,
          component: Error404
        },
        {
          path: '500',
          name: routerNames.Error500,
          component: Error500
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: routerNames.Error404 }
    }
  ]
})

export default router
