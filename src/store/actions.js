import {
  ADD_COUNTER,
  ADD_TO_CART
}
from './mutation-types'

export default {
  addToCart(context, payload) {
    // 查找之前数组中是否有该商品
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断oldProduct，如果有，商品数量加一，如果没有，数组新插入一个数据
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加一')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品到购物车')
      }
    })
  }
}
