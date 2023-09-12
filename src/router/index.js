// Composables
import { createRouter, createWebHistory } from 'vue-router'

import  {checkAuth} from '@/composable/useApi'

function authMiddleware(to){
  if (!checkAuth()){
    return { name: 'auth' ,params:{back : to.fullPath}}
  }
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'Home',
  },
  {
    path:'/auth/:back(.*)*',
    name:'auth',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path:'/pay/:type(.*)*',
    name:'pay',
    component: () => import('@/views/Pay.vue'),
    beforeEnter: [authMiddleware],
  },
  {
    path:'/taj',
    name:'taj',
    component: () => import('@/views/Taj.vue'),
    beforeEnter: [authMiddleware],
  },
  {
    path:'/post/:id',
    name:'post',
    component: () => import('@/views/Post.vue'),
  },
  {
    path:'/project/:id',
    name:'project',
    component: () => import('@/views/Project.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
