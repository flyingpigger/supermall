import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile/',
    component: Profile
  },
  {
    path: '/profile/:uid',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  model: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

export default router
