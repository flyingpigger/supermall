import {ADD_COUNTER, ADD_TO_CART, CHANGE_UID, CHANGE_CART, CHANGE_USERNAME} from "./mutations_type";

export default {
  slideCountChange(state, num) {
    state.slideCount += num;
  },
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
  }
};
