<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> 
                <v-layout column class="ma-3">
                    <h1 class="headline">Registrar</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="Nome do App"
                            v-model="app.name" />
                        <v-text-field label="Dispositivo"
                            v-model="app.device" />
                        <v-text-field label="Nome do Usuário"
                            v-model="app.user" />
                        <v-text-field label="E-mail"
                            v-model="app.email" />
                        <v-text-field label="Descrição do App"
                            v-model="app.description" />
                        <v-text-field label="Photo"
                            v-model="app.picture" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="register">
                            Registrar
                        </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../common/Erros'
// import gql from 'graphql-tag'
import axios from 'axios'
// import https from 'https'
import { mapActions } from 'vuex'
// import Vue from 'vue'
// import { ApolloClient } from 'apollo-client'
// import { WebSocketLink } from "apollo-link-ws"
// import { setContext } from "apollo-link-context"
// import { InMemoryCache } from "apollo-cache-inmemory"

export default {
    components: { Erros },
    data() {
        return {
            app: {},
            ip: {},
            dados: null,
            erros: null,
            counter: 0
        }
    },
    methods: {
      ...mapActions(['setApplication']),
    //   async setToken () {
    //     const { token, ip } = await this.getToken()

    //     console.log('QRTOKEN: ' + token)
    //     console.log('IP: ' + ip)

    //     localStorage.setItem('QRTOKEN', token)
    //     localStorage.setItem('IP', ip)
    //   },
    //   async getToken () {
    //     this.counter++

    //     console.log('Retry number #' + this.counter)

    //     try {
    //       const { data } = await axios.get('http://192.168.15.16:3000/totem/qr')

    //       return data
    //     } catch (e) {
    //       this.error = e.response.message || e
    //       this.dialog = true

    //       await this.sleep(8000)

    //       return this.getToken()
    //     }
    //   },
    //   sleep (ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms))
    //   },

      register() {
        const kernelurl = 'http://'+this.ip+':3000'
        console.log(this.config)
        console.log(this.app)

        axios.post(kernelurl+'/totem/application/connect', this.app, this.config).then((response) => {
            console.log(response.data)
            // localStorage.setItem('APPTOKEN', response.data.token)
            this.setApplication({
                token: response.data.token,
            })

        }).catch((error) => {
            this.erros = error
        })

        // const IP = 'ws://'+localStorage.getItem('token')+':4000'

        // Vue.use({
        //       install(Vue) {
        //       const wsLink = new WebSocketLink({
        //           uri: IP,
        //       })

        //       const authLink = setContext((_, { headers }) => {
        //           const token = localStorage.getItem('token')
        //   //       console.log(token)
        //   //       // Token Raspberry
        //   //       // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMC0wNi0yM1QxNDo0MToxMC4zNTdaIiwiY29kZSI6IjBmYWZiODQwLWI1NjUtMTFlYS05NDExLTZmYzE3Y2E3MjNjOCIsImlhdCI6MTU5MjkyNTYyNH0.GI0dEFEVeVhXP71Vj5fLlb82QRoYeSR-GPTMlRuK-WE"
        //   //       // Token Localhost
        //   //       // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMC0wNi0yNFQwOTo1NToyNy4xODdaIiwiY29kZSI6ImExMWQ5OGQwLWI2MDMtMTFlYS1iZjk4LTcxOTk3ODE1NmQ0NCIsImlhdCI6MTU5Mjk5MzcyOX0.giLxNwqoBp7RLIs97AHoBW-Wv-gnk82c9mjkW-GEBw0"
        //           return {
        //           headers: {
        //               ...headers,
        //               authorization: token ? `Bearer ${token}` : ''
        //           }
        //           }
        //       })

        //       Vue.prototype.$api = new ApolloClient({
        //           link: authLink.concat(wsLink),
        //           cache: new InMemoryCache()
        //       })

        //     }
        // })
      }
    },
    beforeMount () {
    //   this.setToken()
      this.ip = localStorage.getItem('IP')
      this.config = {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('QRTOKEN') }
      }
    },
    mounted(){}
}
</script>

<style>

</style>
