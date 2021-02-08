<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <ModalConfirm
        v-if="returnModalConfirm.active"
        :opts="returnModalConfirm"
      />
    </transition>
    <MainHeader />
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
    <transition name="fade" mode="out-in">
      <router-link to="/orders/new" v-if="!($route.name || '').includes('OrdersNew')">
        <ButtonNewOrder />
      </router-link>
    </transition>
  </div>
</template>
<script>
import MainHeader from '@/components/MainHeader.vue'
import ButtonNewOrder from '@/components/buttons/NewOrder.vue'
import ModalConfirm from '@/components/modals/ModalConfirm.vue'

export default {
  components: {
    MainHeader,
    ButtonNewOrder,
    ModalConfirm
  },
  computed: {
    returnModalConfirm () {
      return this.$store.getters.getModalConfirm
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/main.scss';
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
