<template>
  <!-- ref属性绑定到子组件，标识一个标签，区分其它同类名的标签 -->
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
           
<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    // 传入该值，决定是否实时监听滚动
    probeType: {
      type: Number,
      default: 0
    },
    // 传入该值，决定是否上拉加载更多数据
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo (x, y, time = 300) {
      // this.scroll用来判断scroll对象是否已经存在，如果数据请求过快，而scroll对象还没有初始化，会报错
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
}
</script>
           
<style scoped>
</style>
