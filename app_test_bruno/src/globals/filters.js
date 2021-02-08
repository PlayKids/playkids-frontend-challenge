import Vue from 'vue'

Vue.filter('TO_BRL', (v) => {
  if (v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
})

Vue.filter('TO_DATE_LONG', (v) => {
  if (v) {
    return v.toLocaleString('pt-BR')
  }
})
