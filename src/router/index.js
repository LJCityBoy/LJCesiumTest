import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'helloworld',
    component: () => import('@/views/helloworld.vue')
  },
  {
    path:'/material',
    name:'material',
    component:() => import('@/views/material.vue')
  },
  {
    path:'/multMaterial',
    name:'material',
    component:() => import('@/views/multMaterial.vue') 
  },
  {
    path:'/multImageMaterial',
    name:'material',
    component:() => import('@/views/multImageMaterial.vue') 
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
