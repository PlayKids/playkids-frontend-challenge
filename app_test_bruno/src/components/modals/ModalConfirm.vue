<template>
  <Modal>
    <template slot="header">
      <h2 class="mb-0">Confirm</h2>
    </template>
    <template slot="body">
      <div class="text-md" v-html="opts.content"></div>
    </template>
    <template slot="footer">
      <button @click="$store.dispatch('setModalConfirm', { active: false })" class="btn text-md">
        Cancel
      </button>
      <button @click="opts.callback()" class="btn-color-1 text-md">
        Confirm
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  components: {
    Modal
  },
  props: {
    opts: {
      type: Object,
      required: true
    }
  }
}
</script>
