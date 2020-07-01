import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
    
  {
    path: '/helloworld',
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
  },
  {
    path:'/geojson',
    name:'geojson',
    component:() => import('@/views/geojson.vue')
  },
  { //圆形扫描
    path:'/circularScan',
    name:'circularScan',
    component:() => import('@/views/circularScan.vue')
  },
  {//雷达扫描
    path:'/radarScan',
    name:'radarScan',
    component:() => import('@/views/radarScan.vue')
  },
  {
    path:'/',
    name:'doubleCircleRipple',
    component:() => import('@/views/doubleCircleRipple.vue')
  }
]

const router = new VueRouter({
  mode:'hash', //hash history
  base:'/',
  routes
 
})

export default router
