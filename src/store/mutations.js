import {
  ADD_COUNTER,
  ADD_TO_CART
}
from './mutation-types'

export default {
  // mutations中的每个方法尽可能完成功能单一的事件
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
