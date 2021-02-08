<template>
  <main class="place-order">
    <button @click="$emit('click')" :disabled="disabled" class="btn btn-color-3 text-md">
      <i class="icss-success" /><strong class="ml-1">Place order</strong>
    </button>
  </main>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.place-order {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9;
}
</style>
