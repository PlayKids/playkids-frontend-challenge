<template>
  <main>
      <transition-group name="fade" tag="ul">
        <template v-if="!loaded" >
          <li v-for="i of 6" :key="'dummy' + i">
            <figure class="rounded-sm shadow dummy">
              <PixelImg class="thumb" :dummy="true" />
              <figcaption>
              </figcaption>
            </figure>
          </li>
        </template>
        <template v-else>
          <li v-for="product of returnProducts" :key="product.id" @click="$emit('picked', product)">
            <strong v-show="selected[product.id]" class="counter text-md">&times;{{selected[product.id]}}</strong>
            <figure class="rounded-sm shadow" :class="selected[product.id] ? 'bg-color-1 text-white' : 'bg-color-2'">
              <div class="shimmer w-12 mb-1">
                <PixelImg class="thumb" />
              </div>
              <figcaption>
                <h3>{{product.name}}</h3>
                <big>{{product.price | TO_BRL}}</big>
              </figcaption>
            </figure>
          </li>
        </template>
      </transition-group>
  </main>
</template>

<script>
import Product from '@/api/product'
import PixelImg from '@/components/helpers/PixelImg'

export default {
  components: {
    PixelImg
  },
  data () {
    return {
      Product: null,
      products: [],
      loaded: false
    }
  },
  props: {
    category: {
      type: String,
      default: 'food'
    },
    query: {
      type: Array,
      default: null
    },
    selected: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    returnProducts () {
      return Object.assign([], this.products).sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    }
  },
  mounted () {
    this.Product = Product()
    this.fetch()
  },
  methods: {
    fetch () {
      this.products = this.$store.getters.getProducts
      if (this.products.length === 0) {
        this.loaded = false
      }
      this.Product.list(this.query).then(
        res => {
          this.$store.dispatch('setProducts', res)
          this.products = res
        }
      ).finally(
        () => { this.loaded = true }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';
.counter {
  background: $color-3;
  border: 2px solid $color-2;
  border-radius: 50%;
  text-align: center;
  width: 2.2rem;
  height: 2.2rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0.5rem;
  z-index: 1;
}
ul {
  width: 100%;
  display: flex;
  overflow: auto;
  box-sizing: border-box;
  padding: 0 1rem ;
  li{
    min-width: 120px;
    max-width: 30%;
    position: relative;
    box-sizing: border-box;
    padding: 0 1rem 1rem 0;
    figure {
      cursor: pointer;
      margin: 0;
      padding: 0.5rem 0.5rem 2rem 0.5rem;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: relative;
      &.dummy {
        background-color: #e1e1e1;
      }
      .shimmer {
        display: flex;
        &::after {
          display: none;
        }
      }
      .thumb {
        width: 100%;
        background-size: cover;
      }
      figcaption {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        big {
          display: block;
          position: absolute;
          font-weight: bold;
          bottom: 0.5rem;
          right: 0.5rem;
        }
      }
    }
  }
}
@media (min-width: $tablet) {
  ul {
    flex-wrap: wrap;
    li {
      width: 25%;
    }
  }
}
</style>
