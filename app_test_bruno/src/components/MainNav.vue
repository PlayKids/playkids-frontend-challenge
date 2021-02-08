<template>
  <main class="main-nav relative">
    <button
      @click="collapsed = !collapsed"
      class="btn btn-color-3"
      v-click-outside="() => { collapsed = false }"
      >
      <i class="icss-bars"></i>

    </button>
    <nav class="dropdown" :class="collapsed ? 'collapsed' : ''">
      <ul class=" bg-color-3 rounded-sm text-md shadow">
        <li class="border-color-1"><router-link to="/">Orders</router-link></li>
        <li class="border-transparent"><router-link to="/billing">Billing</router-link></li>
      </ul>
    </nav>
  </main>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';
.dropdown {
  position: absolute;
  z-index: 10;
  margin-top: 2rem;
  left: 0;
  top: 0;
  text-align: left;
  font-weight: bold;
  &.collapsed {
    ul {
      max-height: 400px;
    }
  }
  >ul {
    max-height: 0;
    transition: all 200ms;
    li {
      border: 0;
      border-bottom-width: 1px;
      border-style: solid;
      padding: 5px 10px
    }
  }
}
@media (min-width: unquote(map-get($breakpoints,'tablet'))) {
  .btn {
    display: none;
  }
  .dropdown {
    display: block;
    position: relative;
    margin-top: 0;
    ul {
      max-height: unset;
      display: flex;
      li {
        border-bottom: 0;
        border-right: 1px solid $color-1;
      }
    }
  }
}
</style>
