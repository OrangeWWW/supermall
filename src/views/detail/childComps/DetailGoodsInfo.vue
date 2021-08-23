<template>
  <div
    class="goods-info"
    v-if="Object.keys(detailInfo).length !== 0"
  >
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        :src="item"
        alt=""
        @load="Load"
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    Load () {
      // 图片加载完再发送自定义事件 
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    }
  },
  watch: {
    detailInfo () {
      // 监听detailInfo对象中图片的数量
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 6px solid #bef8c2;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  font-size: 14px;
  padding: 17px 0;
  text-align: center;
}

.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.info-list img {
  width: 100%;
}
</style>
