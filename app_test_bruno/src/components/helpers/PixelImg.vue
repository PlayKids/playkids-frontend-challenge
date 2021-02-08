<template>
  <img
    :style="!dummy ? `background-image: url(https://picsum.photos/${size}?${Math.floor(Math.random() * 100)}` : ''"
    class="w-12"
    :class="dummy ? 'shimmer' : ''"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw== " alt="" />
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100
    },
    dummy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loaded: false
    }
  }
}
</script>

<style scoped>
img {
  background-size: cover;
}
</style>
