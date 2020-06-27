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
            <!-- <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Resultado</h1>
                    <v-divider />
                    <template v-if="dados">
                        <v-text-field label="ID" readonly
                            v-model="dados.id" />
                        <v-text-field label="Nome" readonly
                            v-model="dados.nome" />
                        <v-text-field label="E-mail" readonly
                            v-model="dados.email" />
                        <v-text-field label="Perfis" readonly
                            :value="perfis" />
                    </template>
                </v-layout>
            </v-flex> -->
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../common/Erros'
// import gql from 'graphql-tag'
import axios from 'axios'
// import https from 'https'

// const instance = axios.create({
//   httpsAgent: new https.Agent({  
//     rejectUnauthorized: false
//   })
// })

// console.log('kernelutl: ',kernelurl)

export default {
    components: { Erros },
    data() {
        return {
            app: {},
            // ip: {},
            dados: null,
            erros: null,
            counter: 0
        }
    },
    computed: {
        // perfis() {
        //     return this.dados && this.dados.perfis &&
        //         this.dados.perfis.map(p => p.rotulo).join(',')
        // }
    },
    methods: {
      async setToken () {
        const { token, ip } = await this.getToken()

        console.log('QRTOKEN: ' + token)
        console.log('IP: ' + ip)

        this.$session.set('QRTOKEN', token)
        this.$session.set('IP', ip)
      },
      async getToken () {
        this.counter++

        console.log('Retry number #' + this.counter)

        try {
          const { data } = await axios.get('http://192.168.15.16:3000/totem/qr')

          return data
        } catch (e) {
          this.error = e.response.message || e
          this.dialog = true

          await this.sleep(8000)

          return this.getToken()
        }
      },
      sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      },

    register() {
      this.config = {
      headers: { 'Authorization': 'Bearer ' + this.$session.get('QRTOKEN') }
      }
      const kernelurl = 'http://192.168.15.16:3000'
      console.log(this.config)
      console.log(this.app)

      axios.post(kernelurl+'/totem/application/connect', this.app, this.config).then((response) => {
        console.log(response.data)
      }).catch((error) => {
          this.erros = error
      })
    }
    },
    beforeMount () {
        this.setToken()
        // this.ip = this.$session.get('IP')
        // this.config = {
        // headers: { 'Authorization': 'Bearer ' + this.$session.get('QRTOKEN') }
        // }
    },
    mounted(){
      // this.setToken()
    }
}
</script>

<style>

</style>
