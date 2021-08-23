<template>
  <div
    v-if="Object.keys(goods).length !== 0"
    class="detail-base-info"
  >
    <div class="info-top">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <!-- 优惠价占位 -->
    </div>
    <div class='info-other'>
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span
        v-for='index in goods.services.length-1'
        :key='index'
        class="info-service-item"
      >
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    },
  },
}
</script>

<style>
.info-top {
  font-size: 20px;
  font-weight: 500;
}
.info-other {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  font-size: 15px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .o-price,
.info-other {
  color: #999;
}
.info-top,
.info-price,
.info-other,
.info-service {
  margin: 2%;
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  padding: 5px 0px;
  border-bottom: 5px solid rgba(100, 100, 100, 0.1);
}
.info-service-item img {
  position: relative;
  top: 3px;
  width: 15px;
}
.info-service-item {
  font-size: 12px;
}
</style>