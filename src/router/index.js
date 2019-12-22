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
      path: '/home/articles',
      component: () => import('../views/home/home/homearticles'),
      title: '内容列表'
    },
    {
      path: '/home/comment',
      component: () => import('../views/home/home/comment'),
      title: '评论列表'
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
