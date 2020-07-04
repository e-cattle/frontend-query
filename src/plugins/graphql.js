import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from "apollo-link-ws"
import { InMemoryCache } from "apollo-cache-inmemory"

Vue.use({
  install(Vue) {

      const token = localStorage.getItem('token')
      // Token Raspberry
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMC0wNi0yM1QxNDo0MToxMC4zNTdaIiwiY29kZSI6IjBmYWZiODQwLWI1NjUtMTFlYS05NDExLTZmYzE3Y2E3MjNjOCIsImlhdCI6MTU5MjkyNTYyNH0.GI0dEFEVeVhXP71Vj5fLlb82QRoYeSR-GPTMlRuK-WE"
      // Token Localhost
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMC0wNi0yNFQwOTo1NToyNy4xODdaIiwiY29kZSI6ImExMWQ5OGQwLWI2MDMtMTFlYS1iZjk4LTcxOTk3ODE1NmQ0NCIsImlhdCI6MTU5Mjk5MzcyOX0.giLxNwqoBp7RLIs97AHoBW-Wv-gnk82c9mjkW-GEBw0"

    //  const wsLink = new WebSocketLink({
    //   uri: 'ws://'+localStorage.getItem('IP')+':4000',
    //   options: {
    //     reconnect: true,
    //     timeout: 30000,
    //     connectionParams: {
    //       Authorization: `Bearer ${token}`,
    //       authToken: token
    //     }
    //   }
    // })


    Vue.prototype.$api = new ApolloClient({
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
      cache: new InMemoryCache()
    })

  }
})