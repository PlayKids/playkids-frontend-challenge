<template>
  <main class="container">
      <h1 class="view_title">New order</h1>
      <section>
        <label for="name">
          <h2><i class="icss-user" /> Customer's name:</h2>
        </label>
        <input v-model="customerName" id="name" type="text" />
      </section>
      <section>
        <h2><i class="icss-roasted-chicken" /> Select the food:</h2>
        <ProductList
          class="product-list"
          :query="['category=food']"
          :selected="food"
          @picked="selectProduct($event)"
        />
      </section>
      <section>
        <h2><i class="icss-orangeade" /> Select the drinks:</h2>
        <ProductList
          class="product-list"
          :query="['category=drink']"
          :selected="drink"
          @picked="selectProduct($event)"
        />
      </section>
      <ButtonPlaceOrder @click="showSummary = true" :disabled="!isValidOrder()" />
      <transition-group name="fade" mode="out-in">
        <ModalProduct
          key="Product"
          v-if="selectedProduct"
          :selected-product="selectedProduct"
          @closed="resetSelected()"
          @updated="updateOrder($event)"
        />
        <ModalOrderSummary
          key="OrderSummary"
          v-if="showSummary"
          :order="returnOrder"
          @cancel="showSummary = false"
          @continue="showSummary = false; showPayment = true"
        />
        <ModalOrderPayment
          key="OrderPayment"
          v-if="showPayment"
          :order="returnOrder"
          :subtotal="returnTotal"
          @cancel="showPayment = false"
          @confirm="placeOrder()"
        />
      </transition-group>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue'
import ButtonPlaceOrder from '@/components/buttons/PlaceOrder.vue'
import ModalProduct from '@/components/modals/ModalProduct.vue'
import ModalOrderSummary from '@/components/modals/ModalOrderSummary.vue'
import ModalOrderPayment from '@/components/modals/ModalOrderPayment.vue'

export default {
  components: {
    ProductList,
    ButtonPlaceOrder,
    ModalProduct,
    ModalOrderSummary,
    ModalOrderPayment
  },
  data () {
    return {
      customerName: '',
      food: {},
      drink: {},
      selectedProduct: null,
      showSummary: false,
      showPayment: false
    }
  },
  computed: {
    returnOrder () {
      return {
        customerName: this.customerName,
        products: { ...this.food, ...this.drink }
      }
    },
    returnTotal () {
      let total = 0
      for (const p in this.returnOrder.products) {
        total += (this.$store.getters.getProducts[p].price * this.returnOrder.products[p])
      }
      return total
    }
  },
  methods: {
    isValidOrder () {
      let valid = true
      if (this.customerName.length < 2 || (Object.keys(this.food).length === 0 && Object.keys(this.drink).length === 0)) {
        valid = false
      }
      return valid
    },
    resetSelected () {
      this.selectedProduct.quantity = 0
      this.selectedProduct = null
    },
    selectProduct (obj) {
      this.selectedProduct = obj
      if (this[this.selectedProduct.category][this.selectedProduct.id]) {
        this.selectedProduct.quantity = this[this.selectedProduct.category][this.selectedProduct.id]
      }
    },
    updateOrder (v) {
      const q = parseInt(v)
      if (this[this.selectedProduct.category][this.selectedProduct.id]) {
        if (q === 0) {
          this.$delete(this[this.selectedProduct.category], this.selectedProduct.id)
        } else {
          this.$set(this[this.selectedProduct.category], this.selectedProduct.id, q)
        }
      } else {
        this.$set(this[this.selectedProduct.category], this.selectedProduct.id, q)
      }
      this.resetSelected()
    },
    placeOrder () {
      const d = new Date()
      const id = `
        ${Math.floor(Math.random() * 1000)}
        ${d.getSeconds()}
        ${d.getMinutes()}
        ${d.getSeconds()}
        ${d.getDate()}
        ${(d.getMonth() + 1)}
      `.replace(/[\n|\t| ]/g, '')
      this.showSummary = false
      this.$store.dispatch('setOrders', {
        ...this.returnOrder,
        id,
        total: this.returnTotal,
        createdAt: d
      })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
h1, h2, h3 {
  // color: white;
  text-transform: uppercase;
}
section {
  margin-bottom: 2rem;
  .product-list {
    margin: 0 -1rem
  }
}
</style>
