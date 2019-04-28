import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import messages from './assets/translations'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'bs', // set locale
  messages, // set locale messages
})

Vue.config.productionTip = false

Vue.prototype.$http = axios

export const api = 'http://localhost:8080'

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
