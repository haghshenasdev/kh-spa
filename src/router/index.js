// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'Home',
  },
  {
    path:'/auth',
    name:'auth',
    component: () => import('@/views/Auth.vue'),
  },
  {
    path:'/pay/:type(.*)*',
    name:'pay',
    component: () => import('@/views/Pay.vue'),
  },
  {
    path:'/taj',
    name:'taj',
    component: () => import('@/views/Taj.vue'),
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
