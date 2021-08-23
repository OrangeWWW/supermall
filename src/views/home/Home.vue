<template>
  <div id="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControlFixed"
      class="tab-control-fixed"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load='true'
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top
      @click.native="backTop"
      v-show="isShowBackTop"
    ></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from 'network/home'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { itemListenerMixin, backTopMixin } from 'commonjs/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  // 导入混入函数
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 初始化的组件对象中没有debounce方法,this.debounce报错
    // console.log(this)
    // console.log(this.getHomeGoods)
  },
  activated () {
    this.$refs.scroll.refresh()
    // 回到首页时，滚动到离开时记录的y位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated () {
    // 保存离开首页时，scroll对象中的y属性，记录离开时的状态
    this.saveY = this.$refs.scroll.scroll.y
    // 取消全局监听图片加载事件
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    // 将当前类型的商品列表传给子组件goods-list
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 网络请求相关事件
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // 请求数据push进data数组中保存
        this.goods[type].list.push(...res.data.list)
        // 请求完数据page+1
        this.goods[type].page = page
        // 请求一次后不再滚动，调用finishPullUp方法继续下次滚动
        this.$refs.scroll.finishPullUp()
      })
    },
    swiperImageLoad () {
      // 获取tabControl的offsetTop属性
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    /**
     * 点击请求相关事件
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControlFixed.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },
    contentScroll (position) {
      // 定位，y轴超过1000显示返回顶部按钮
      this.ListenShowBackTop(position)
      // isTabFixed属性决定tabControl是否吸顶
      this.isTabFixed = -position.y >= this.tabOffsetTop
    },
    loadMore () {
      // 下拉加载更多图片
      this.getHomeGoods(this.currentType)
    },
  },
}
</script>

<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}
.tab-control-fixed {
  position: fixed;
  top: 44px;
  left: 0px;
  right: 0px;
  z-index: 10;
}
.content {
  height: calc(100vh - 12vh);
  overflow: hidden;
}
</style>