<template>
  <div id="detail">
    <detail-nav-bar
      @titleClick="titleClick"
      ref="navbar"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list
        ref="recommend"
        :goods="recommends"
      ></goods-list>
    </scroll>
    <back-top
      @click.native="backTop"
      v-show="isShowBackTop"
    ></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>
           
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'

import { itemListenerMixin, backTopMixin } from 'commonjs/mixin'
import { debounce } from 'commonjs/utils'


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  // 导入混入函数
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      navIndex: null
    }
  },
  created () {
    // 保存传入的id
    this.iid = this.$route.params.iid
    // 根据id请求数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 轮播图
      this.topImages = data.itemInfo.topImages
      // 商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 商家信息
      this.shop = new Shop(data.shopInfo)
      // 详情页面信息
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获得评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    // 获取详情页主题的Y值
    this.getThemeTopY = debounce(() => {
      // 商品
      this.themeTopYs.push(0);
      // 参数
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // 评论
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // 推荐
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 给一个最大值,便于处理滚动时navBar样式的显示
      this.themeTopYs.push(Number.MAX_VALUE)
    })
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()
      // 图片加载完回调getThemeTopY
      this.getThemeTopY()
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 400)
    },
    addToCart () {
      // 获取购物车要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid
      // 商品添加到购物车vuex
      this.$store.dispatch('addToCart', product).then(res => {
        this.$toast.show(res)
      })
    },
    contentScroll (position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // 详情页滚动时，顶部菜单栏样式随着滚动到相应位置而变化
        if (this.navIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.$refs.navbar.currentIndex = i
        }
      }
      // 定位，y轴超过1000显示返回顶部按钮
      this.ListenShowBackTop(position)
    }
  },
  activated () {
    this.$refs.scroll.refresh()
  },
  destroyed () {
    // 取消全局监听图片加载事件
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
}
</script>
           
<style scoped>
#detail {
  position: relative;
  z-index: 9;
}
.detail-nav-bar {
  background-color: #fff;
}
.content {
  height: calc(100vh - 12vh);
  overflow: hidden;
}
</style>
