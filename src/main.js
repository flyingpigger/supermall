import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import VueCookies from 'vue-cookies'
import VueLazyLoad from 'vue-lazyload'
import Toast from "components/common/toast/index.js";
import 'vant/lib/index.css';

import {Search} from "vant";
Vue.use(Search);

import {Cell} from 'vant';
Vue.use(Cell);

import {AddressEdit, AddressList} from 'vant';
Vue.use(AddressEdit);
Vue.use(AddressList);

import {Card} from 'vant';
Vue.use(Card);

import {NavBar} from 'vant';
Vue.use(NavBar);

import {Sidebar, SidebarItem} from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);

import {Tab, Tabs} from 'vant';
Vue.use(Tab);
Vue.use(Tabs)

import {Button} from 'vant';
Vue.use(Button)

import {Icon} from 'vant';
Vue.use(Icon)

import {Form} from 'vant';
Vue.use(Form)

import {Field} from 'vant';
Vue.use(Field)

import {Swipe, SwipeItem} from 'vant';
Vue.use(Swipe)
Vue.use(SwipeItem)

import {Stepper} from 'vant';
Vue.use(Stepper)

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require("@/assets/img/common/5-121204193R0-50.gif")
})
Vue.use(VueCookies);
Vue.use(Toast);

Vue.config.productionTip = false
//事件总线：跨组件发送信息
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
