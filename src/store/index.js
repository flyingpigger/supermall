import Vue from "vue";
import Vuex from "vuex";

import actions from "@/store/actions"
import mutations from "@/store/mutations"
import user from "@/store/modules/user"

Vue.use(Vuex);

const state = {
  cartList: [],
  // uid: "",
  // userName: ""
};
const store = new Vuex.Store({
  modules: {
    user
  },
  state,
  mutations,
  actions
});

export default store;
