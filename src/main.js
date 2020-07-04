import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
// import './plugins/graphql'
import VueQrcodeReader from 'vue-qrcode-reader'
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory"

Vue.use(VueQrcodeReader)
Vue.use(VueApollo)

Vue.config.productionTip = false

const token = localStorage.getItem('token')

const client = new ApolloClient({
   link: new WebSocketLink({
      uri: 'ws://'+localStorage.getItem('IP')+':4000',
      options: {
        reconnect: true,
        timeout: 30000,
        connectionParams: {
          Authorization: `Bearer ${token}`,
          authToken: token
        }
      }
    }),
   cache: new InMemoryCache({
     addTypename: true
   })
 });

const apolloProvider = new VueApollo({
    defaultClient: client,
  })

new Vue({
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
