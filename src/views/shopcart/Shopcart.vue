<template>
  <div id="cart">
    <nav-bar>
      <div slot="center">购物车{{'('+length+')'}}</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
    >
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// mapGetters将store中的getter映射到局部计算属性
import { mapGetters } from 'vuex'

export default {
  name: "Shopcart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
  activated () {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100vh - 17vh);
  overflow: hidden;
}
</style>