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
    name:'multImageMaterial',
    component:() => import('@/views/multImageMaterial.vue') 
  },
  {
    path:'/multImageMaterial2',
    name:'multImageMaterial2',
    component:() => import('@/views/multImageMaterial2.vue') 
  },
  {
    path:'/fly',
    name:'fly',
    component:() => import('@/views/fly.vue') 
  },
  {
    path:'/water',
    name:'water',
    component:() => import('@/views/water.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
