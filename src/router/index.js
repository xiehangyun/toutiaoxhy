import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import logIn from '../views/login'
import home1 from '../views/home/home/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/home',
      component: home1,
      title: '首页'
    },
    {
      path: '/home/publish',
      component: () => import('../views/home/home/publish')
    },
    {
      path: '/home/publish/:id',
      component: () => import('../views/home/home/publish')
    },
    {
      path: '/home/comment',
      component: () => import('../views/home/home/comment')
    },
    {
      path: '/home/material',
      component: () => import('../views/home/home/material')
    },
    {
      path: '/home/articles',
      component: () => import('../views/home/home/articles')
    }, {
      path: '/home/account',
      component: () => import('../views/home/home/account')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: logIn
  }, {
    path: '*',
    component: () => import('../views/home/home/404')
  }
]

const router = new VueRouter({
  routes
})

export default router
