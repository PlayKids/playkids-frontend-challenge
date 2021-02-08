<template>
  <main>
    <h3>{{order.customerName}}</h3>
    <ul>
      <li v-for="(qt, $index) of order.products" :key="$index" class="flex justify-space-between">
        <span>{{getProduct($index).name}} &times; <b>{{qt}}</b></span>
        <strong><small class="mr-2">{{getProduct($index).price | TO_BRL}}</small>{{getProduct($index).price * qt | TO_BRL}}</strong>
      </li>
    </ul>
    <hr class="dotted" />
    <footer>
      <p class="flex justify-space-between m-0">
        <span>Subtotal :</span> <strong>{{returnTotal | TO_BRL}}</strong>
      </p>
      <p class="flex justify-space-between m-0 text-md">
        <span>Total (w/ service):</span> <strong>{{order.total || returnTotal * 1.13| TO_BRL}}</strong>
      </p>
    </footer>
  </main>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    returnTotal () {
      let total = 0
      for (const p in this.order.products) {
        total += (this.$store.getters.getProducts[p].price * this.order.products[p])
      }
      return total
    }
  },
  methods: {
    getProduct (id) {
      return this.$store.getters.getProducts[parseInt(id)]
    }
  }
}
</script>
