import Vue from 'vue'
import Vuex from 'vuex'
import Product from '@/api/product'
import VuexPersistence from 'vuex-persist'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex)

const vuexCookie = new VuexPersistence({
  storage: window.localStorage,
  filter: (mutation) => {
    const persisted = [
      'mutateProducts',
      'mutateOrders',
      'mutateBill'
    ]
    return persisted.includes(mutation.type)
  }
})

const sharedMutations = createMutationsSharer({
  predicate: (mutation, state) => {
    const shared = [
      'mutateProducts',
      'mutateOrders',
      'mutateBill'
    ]
    return shared.includes(mutation.type)
  }
})

export default new Vuex.Store({
  plugins: [vuexCookie.plugin, sharedMutations],
  state: {
    products: {},
    orders: [],
    newOrder: {
      id: null,
      products: {},
      customerName: null,
      orderDate: null
    },
    bill: {},
    modalConfirm: {
      active: false,
      content: '',
      callback: null
    }
  },
  mutations: {
    mutateProducts (state, data) {
      for (const product of data) {
        state.products[product.id] = product
      }
    },
    mutateOrders (state, data) {
      state.orders.push(data)
    },
    mutateBill (state, data) {
      state.bill[data.id] = data.quantity
    },
    mutateNewOrder (state, data) {
      state.newOrder = data
    },
    mutateClearOrders (state, data) {
      state.orders = []
    },
    mutateModalConfirm (state, data) {
      state.modalConfirm = data
    }
  },
  actions: {
    setProducts ({ commit }, data) {
      if (!data) {
        Product().list().then(
          res => {
            commit('mutateProducts', res)
          }
        )
      } else {
        commit('mutateProducts', data)
      }
    },
    setOrders ({ commit, state }, data) {
      for (const product in data.products) {
        if (!state.bill[product.id]) {
          commit('mutateBill', {
            id: product,
            quantity: data.products[product]
          })
        } else {
          for (const i in state.bill) {
            if (product.id === i) {
              commit('mutateBill', {
                id: product,
                quantity: state.bill[i] + data.products[product]
              })
            }
          }
        }
      }
      commit('mutateOrders', data)
    },
    setNewOrder ({ commit }, data) {
      commit('mutateNewOrder', data)
    },
    setClearOrders ({ commit }) {
      commit('mutateClearOrders')
    },
    setModalConfirm ({ commit }, data) {
      commit('mutateModalConfirm', data)
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    },
    getOrders (state) {
      return state.orders
    },
    getNewOrder (state) {
      return state.newOrder
    },
    getModalConfirm (state) {
      return state.modalConfirm
    }
  }
})
