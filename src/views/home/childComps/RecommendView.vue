<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="item in recommends"
      :key="item.title"
    >
      <a :href="item.link">
        <img
          :src="item.image"
          alt=""
        >
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
           
<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  },
}
</script>
           
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  padding: 15px 0 15px;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 15px;
}
.recommend-item img {
  width: 90%;
}
</style>
