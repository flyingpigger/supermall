import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import VueLazyLoad from 'vue-lazyload'
import Toast from "components/common/toast/index.js";
import 'vant/lib/index.css';

import {Cell, CellGroup} from 'vant';
Vue.use(Cell);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require("@/assets/img/common/5-121204193R0-50.gif")
})
Vue.use(ElementUI);
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
