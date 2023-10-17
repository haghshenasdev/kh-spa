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
    path: '/about',
    component: () => import('@/views/About.vue'),
    name: 'About',
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
    path:'/payhistory',
    name:'payhistory',
    component: () => import('@/views/PayHistory.vue'),
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
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
