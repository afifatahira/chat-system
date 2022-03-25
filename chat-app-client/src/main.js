import Vue from 'vue'
import App from './App.vue'
import './assets/styles/style.scss'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.headers.common["x-app-id"] = process.env.VUE_APP_ID
axios.defaults.headers.common["x-api-key"] = process.env.VUE_APP_API_KEY

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
