<template>
  <main class="search-bar sticky w-12 shadow">
    <div class="w-12 container">
      <input
        class="w-12"
        type="text"
        v-model="searchTerm"
      />
      <span class="icons text-color-2 text-md">
        <i v-if="searchTerm.length > 0" @click="searchTerm = ''" class="icss-x" />&ensp;
        <i class="icss-search" />
      </span>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      searchTerm: ''
    }
  },
  watch: {
    searchTerm (next) {
      if (next.length > 1) {
        this.filter()
        return
      }
      this.$emit('filtered', null)
    }
  },
  methods: {
    filter () {
      const results = []
      for (const order of this.$store.getters.getOrders) {
        if (order.customerName.includes(this.searchTerm)) {
          results.push(order)
        }
      }
      this.$emit('filtered', results)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 20;

}
.search-bar {
  top: 5rem;
  background-color: white;
  input {
    width: 100%;
    background-color: white;
  }
  .icons {
    position: absolute;
    margin-top: 0.5rem;
    right: 1.8rem;
  }
}
</style>
