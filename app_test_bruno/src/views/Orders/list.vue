<template>
  <main>
    <SearchBar @filtered="filteredResults = $event" />
    <div class="container pb-7">
      <h1 class="view_title flex justify-space-between">
        Orders
        <button @click="clearOrders()" class="btn text-base text-color-1"><i class="icss-bin" /></button>
      </h1>
      <transition-group name="fade" tag="section">
        <h2 v-if="returnOrders.length === 0" key="empty">No results</h2>
        <article v-for="order in returnOrders"
          :key="order.id"
          class="order rounded-sm bg-alpha-30 shadow bg-color-2"
          >
          <header class="p-1 bg-color-1 bg-alpha-20 flex justify-space-between align-center">
            <h2 class="m-0">#{{order.id}}</h2>
            <strong>{{ order.createdAt | TO_DATE_LONG }}</strong>
          </header>
          <div class="p-1">
          <OrderSummary :order="order" />
          </div>
        </article>
      </transition-group>
    </div>
  </main>
</template>

<script>
import OrderSummary from '@/components/order/Summary.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    OrderSummary,
    SearchBar
  },
  data () {
    return {
      filteredResults: null
    }
  },
  computed: {
    returnOrders () {
      return this.filteredResults ? this.filteredResults : this.$store.getters.getOrders
    }
  },
  mounted () {
    if (this.$store.getters.getProducts.length === 0) {
      this.$store.dispatch('setProducts')
    }
  },
  methods: {
    clearOrders () {
      this.$store.dispatch('setModalConfirm', {
        active: true,
        content: 'Clear order and billing data?',
        callback: () => {
          this.$store.dispatch('setClearOrders')
          this.$store.dispatch('setModalConfirm', { active: false })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables';
article {
  margin-bottom: 1rem;
  &:nth-child(odd) {
    ::after {
      background-color: $color-3;
    }
  }
}
@media (min-width: unquote(map-get($breakpoints,'tablet'))) {
  section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;;
  }
  article {
    margin: 1rem;
    width: calc(50% - 2rem);
  }
}
</style>
