import { createRouter, createWebHistory } from 'vue-router'
import routerHelper from '@/utils/routerHelper'

import MainLayout from '@/layouts/MainLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'

import HelloWorld from '@/components/HelloWorld.vue'

// TODO add import helper eslint for vue files
import Error404 from '@/components/Error404.vue'

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
          name: routerNames.HelloWorld,
          component: HelloWorld
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
