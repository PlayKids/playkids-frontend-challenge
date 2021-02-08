import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'

import { VueMaskDirective } from 'v-mask'
require('./globals/filters')

Vue.config.productionTip = false

Vue.directive('mask', VueMaskDirective)
Vue.use(Vuelidate)
Vue.use(vClickOutside)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
