import {
  debounce
} from 'commonjs/utils'

import BackTop from 'components/content/backTop/BackTop'

// 混入，可以在多个组件中复用该函数
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 保存refresh事件，离开某一组件时，销毁该事件，也就不会在其他的组件继续监听图片加载了
    const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh)
    // 防抖函数对refresh函数做一层封装
    this.itemImgListener = () => {
      refresh()
    }
    // 监听GoodsListItem中图片加载事件
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log(debounce)
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      // this.$refs.scroll拿到Scroll.vue中的scroll对象
      this.$refs.scroll.scrollTo(0, 0)
    },
    ListenShowBackTop(position) {
      // 定位，y轴超过1000显示返回顶部按钮
      this.isShowBackTop = -position.y > 1000
    }
  },
}
