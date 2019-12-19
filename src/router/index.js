import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import logIn from '../views/login'
import home1 from '../views/home/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: home1
    },
    {
      path: '/home/articles',
      component: () => import(/* webpackChunkName: "articles" */ '../views/home/homearticles')
    }]
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
