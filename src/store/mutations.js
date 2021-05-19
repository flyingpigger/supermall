import {ADD_COUNTER, ADD_TO_CART, CHANGE_UID, CHANGE_CART, CHANGE_USERNAME, DELETE_FROM_CART} from "./mutations_type";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [CHANGE_UID](state, payload) {
    state.uid = payload;
  },
  [CHANGE_USERNAME](state, payload) {
    state.userName = payload;
  },
  [CHANGE_CART](state, payload) {
    state.cartList = payload;
  },
  [DELETE_FROM_CART](state, payload) {
    let length = state.cartList.length
    for (let i = 0; i < length; i++) {
      if (state.cartList[i].bid === payload) {
        delete(state.cartList[i])
      }
    }
  }
};
