import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store/index'
import messages from './lang/translations'
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'bs', // set locale
  messages, // set locale messages
})

Vue.config.productionTip = false

Vue.prototype.$http = axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

export const api = 'http://localhost:8080'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
