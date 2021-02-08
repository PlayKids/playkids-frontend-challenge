<template>
  <main class="search-bar sticky w-12 shadow">
    <div class="w-12 container">
      <i
        v-if="searchTerm.length > 0" @click="searchTerm = ''"
        class="icon icss-x text-md"
      />
      <input
        class="w-12"
        type="text"
        v-model="searchTerm"
      />
      <i class="icon text-md icss-search" />
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
@import '@/assets/style/_variables';

.container {
  position: relative;
  z-index: 20;
}
.search-bar {
  top: 5rem;
  background-color: white;
  input {
    width: 100%;
    padding-left: 2rem;
    background-color: white;
  }
  .icon {
    position: absolute;
    margin-top: 0.8rem;
    &.icss-x {
      margin-left: 0.4rem;
      cursor: pointer;
      color: $color-1;
    }
    &.icss-search {
      color: $color-2;
      right: 1.8rem;
    }
  }
}
</style>
