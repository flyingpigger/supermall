import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')
const Login = () => import("@/views/login/Login")
const SubmitOrder = () => import("@/views/order/SubmitOrder")
const AddressEdit = () => import("@/views/address/AddressEdit")
const AddressAdd = () => import("@/views/address/AddressAdd")
const AddressList = () => import("@/views/address/AddressList")
const AddressSelect = () => import("@/views/address/AddressSelect")
const MyOrders = () => import("@/views/order/MyOrders")
const Register = () => import("@/views/login/Register")
const ChangePassword = () => import("@/views/login/ChangePassword")

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/detail/:id',
    component: Detail
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
    path: '/submitOrder',
    component: SubmitOrder
  },
  {
    path: '/address',
    component: AddressList
  },
  {
    path: '/addressAdd',
    component: AddressAdd
  },
  {
    path: '/addressEdit',
    name: "addressEdit",
    component: AddressEdit
  },
  {
    path: '/submitOrder',
    name: "submitOrder",
    component: SubmitOrder
  },
  {
    path: '/addressSelect/:id',
    component: AddressSelect
  },
  {
    path: '/myOrder',
    component: MyOrders
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/changePassword',
    component: ChangePassword
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
