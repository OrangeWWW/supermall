<template>
  <div
    class="toast"
    v-show="isShow"
  >
    <div>{{message}}</div>
  </div>
</template>
           
<script>
export default {
  name: 'Toast',
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show (res, duration = 1500) {
      this.message = res
      this.isShow = true
      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration)
    }
  },
}
</script>
           
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
