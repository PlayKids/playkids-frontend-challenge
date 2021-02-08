<template>
  <main class="container p-3">
    <h1 class="view_title">Billing</h1>
    <div v-if="loaded">
      <h3 class="flex justify-space-between text-md">
        <span>Total revenue:</span>
        <span>{{revenue | TO_BRL}}</span>
      </h3>
      <hr class="dotted" />
      <template v-if="Object.keys(products).length > 0">
        <section v-for="(products, $category) in products" :key="$category">
          <h2>{{$category}}</h2>
          <table class="border-color-2 w-12">
            <tbody>
              <tr class="w-12">
                <th class="w-6">Product</th>
                <th class="w-3">Units Sold</th>
                <th class="w-3">Revenue</th>
              </tr>
              <tr v-for="(f, $id) in products" :key="$id" class="w-12">
                <td class="w-6">{{f.productName}} </td>
                <td class="w-3 text-center">{{f.quantity}}</td>
                <td class="w-3"><strong>{{f.total | TO_BRL}}</strong></td>
              </tr>
            </tbody>
          </table>
          <hr class="dotted" />
        </section>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      loaded: false,
      products: {},
      revenue: 0
    }
  },
  mounted () {
    for (const order of this.$store.getters.getOrders) {
      this.revenue += order.total
      for (const p in order.products) {
        const quantity = order.products[p]
        const total = order.products[p] * this.getProduct(p).price
        const productName = this.getProduct(p).name
        if (!this.products[this.getProduct(p).category]) {
          this.products[this.getProduct(p).category] = {}
        }
        if (!this.products[this.getProduct(p).category][p]) {
          this.products[this.getProduct(p).category][p] = {
            quantity,
            total,
            productName
          }
        } else {
          this.products[this.getProduct(p).category][p].quantity += quantity
          this.products[this.getProduct(p).category][p].total += total
        }
      }
      this.loaded = true
    }
  },
  methods: {
    getProduct (id) {
      return this.$store.getters.getProducts[id]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables';
h2 {
  text-transform: capitalize;
}
table {
  th {
    background: $color-3;
  }
  tr:nth-child(odd) {
    background-color: #f1f1f1;
  }
}
</style>
