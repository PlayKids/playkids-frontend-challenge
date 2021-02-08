<template>
  <main class="main-header bg-color-1 shadow">
    <header class="container p-1 flex justify-space-between align-center m-auto">
      <MainNav />
      <router-link to="/">
        <h1 class="text-md inline  m-0 text-color-0 text-uppercase">
          A simple Food App
        </h1>
        </router-link>
      <i class="icss-lunch text-color-3 text-xl noshrink"></i>
    </header>
  </main>
</template>

<script>
import MainNav from './MainNav.vue'

export default {
  components: {
    MainNav
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';
.main-header {
  width: 100%;
  top: 0;
  z-index: 10;
  position: sticky;
}
</style>
