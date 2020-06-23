import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSessionStorage from 'vue-sessionstorage'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)
Vue.use(VueSessionStorage)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
