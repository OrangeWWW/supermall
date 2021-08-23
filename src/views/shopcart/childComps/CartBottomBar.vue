<template>
  <div class="check-bottom-bar">
    <CheckButton
      class="select-all"
      :is-checked="allChecked"
      @click.native="checkClicked"
    ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span
      class="buy-product"
      @click="buyClick"
    >去计算{{'('+productCount+')'}}</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    productCount () {
      return this.cartList.filter(item => item.checked).length
    },
    allChecked () {
      if (this.cartList.length === 0) {
        return false
      } else {
        return this.cartList.every(item => item.checked)
      }
    }
  },
  methods: {
    checkClicked () {
      if (this.allChecked) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    buyClick () {
      if (!this.allChecked) {
        this.$toast.show('请添加商品到购物车')
      }
    }
  }
}
</script>

<style scoped>
.check-bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.check-bottom-bar .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.check-bottom-bar .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.check-bottom-bar .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
