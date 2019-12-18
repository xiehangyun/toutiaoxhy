import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import logIn from '../views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: logIn
  }
]

const router = new VueRouter({
  routes
})

export default router
