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
import axios from 'axios'
import { mapActions } from 'vuex'

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

      register() {
        const kernelurl = 'http://'+this.ip+':3000'
        console.log(this.config)
        console.log(this.app)

        axios.post(kernelurl+'/totem/application/connect', this.app, this.config).then((response) => {
            console.log(response.data)
            this.setApplication({
                token: response.data.token,
            })
            this.$router.push({ path: '/operations' })

        }).catch((error) => {
            this.erros = error
        })

      }
    },
    beforeMount () {
      this.ip = localStorage.getItem('ip')
      this.config = {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('qrtoken') }
      }
    },
    mounted(){}
}
</script>

<style>

</style>
