<template>
  <main class="modal">
    <section class="modal__overlay">
    </section>
    <section class="modal__content rounded-sm">
      <header class="bg-color-1 text-white p-2">
        <slot name="header" />
      </header>
      <div class="modal__content__body bg-white p-2">
          <slot name="body" />
      </div>
      <footer class="bg-color-3">
        <div class=" flex justify-space-between p-2 w-12">
          <slot name="footer" />
        </div>
      </footer>
    </section>
  </main>
</template>

<script>

export default {
  components: {
  },
  props: {
    active: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables';

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.5);
  }
  &__content {
    z-index: 9;
    overflow: auto;
    width: 100%;
    max-width: 400px;
    margin: auto;
    position: relative;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    &__body {
      overflow: auto;
    }
  }
}
</style>
