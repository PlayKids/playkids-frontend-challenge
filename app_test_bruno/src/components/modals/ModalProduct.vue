<template>
  <Modal v-if="selectedProduct" @closed="resetSelected()">
    <template slot="header">
      <h2 class="mb-0">{{selectedProduct.category}} selected</h2>
    </template>
    <template slot="body">
      <figure class="m-2 ">
        <div class="w-12 shimmer">
          <PixelImg class="w-12" :size="300" />
        </div>
        <figcaption class="">
          <h3>{{selectedProduct.name}}</h3>
          <p>{{selectedProduct.description}}</p>
          <big><strong>{{selectedProduct.price | TO_BRL}}</strong></big>
        </figcaption>
      </figure>
      <div class="quantity flex justify-flex-end w-12">
        <button @click="selectedQuantity = 0">
          <i class="icss-bin"></i>
        </button>
        <button @click="selectedQuantity -= selectedQuantity === 0 ? 0 : 1">
          <i class="icss-minus"></i>
        </button>
        <button @click="selectedQuantity = parseInt(selectedQuantity) + 1">
          <i class="icss-plus"></i>
        </button>
        <input v-mask="'##'" v-model="selectedQuantity" type="number" />
      </div>
    </template>
    <template slot="footer">
      <button @click="$emit('closed')" class="btn text-md">
        Cancel
      </button>
      <button @click="$emit('updated', selectedQuantity)" class="btn-color-1 text-md">
        Update order
      </button>
    </template>
  </Modal>
</template>

<script>
import PixelImg from '@/components/helpers/PixelImg'
import Modal from './Modal'

export default {
  components: {
    PixelImg,
    Modal
  },
  props: {
    selectedProduct: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedQuantity: 0
    }
  },
  mounted () {
    this.selectedQuantity = 0
    if (this.selectedProduct.quantity) {
      this.selectedQuantity = this.selectedProduct.quantity
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';

.quantity {
  button {
    width: 2.5rem;
    margin-right: 10px;
  }
  h2 {
    text-transform: capitalize;
  }
  input[type=number] {
    margin-left: auto;
    width: 2.5rem;
    text-align: right;
  }
}
</style>
