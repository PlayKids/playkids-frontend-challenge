<template>
  <Modal>
    <template slot="header">
      <h2 class="mb-0">Order summary</h2>
    </template>
    <template slot="body">
      <OrderSummary :order="order" />
    </template>
    <template slot="footer">
      <button @click="$emit('cancel')" class="btn text-md">
        Go back
      </button>
      <button @click="$emit('continue')" class="btn-color-1 text-md">
        Payment
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from './_Modal'
import OrderSummary from '@/components/order/Summary.vue'

export default {
  components: {
    Modal,
    OrderSummary
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>
