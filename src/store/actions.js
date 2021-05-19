import { ADD_COUNTER, ADD_TO_CART } from "./mutations_type";

export default {
  AddProduct(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for (const item of context.state.cartList) {
        if (item.bid === payload.bid) {
          oldProduct = item;
          break;
        }
      }
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        reject();
      } else {
        payload.checked = true;
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve();
      }
    });
  }
};
