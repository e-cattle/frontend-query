<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
               <v-layout column class="ma-3">
                    <h1 class="headline">Monitorar Valor Temperatura</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="Valor maior igual"
                            v-model.number="filter.maiorigual" />
                        <v-text-field label="Valor menor igual"
                            v-model.number="filter.menorigual" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            v-on:click="getBodyTemperature">
                            Monitorar
                        </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="BodyTemperature" 
                    hide-default-footer class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item._id }}</td>
                        <td>{{ props.item.resource }}</td>
                        <td>{{ props.item.value }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../common/Erros'
import gql from 'graphql-tag'
import { watch } from "@vue/composition-api";
import { useSubscription } from "@vue/apollo-composable";
// https://v4.apollo.vuejs.org/guide-composable/subscription.html#usesubscription
// const result  = useSubscription(gql`
//   subscription {
//     BodyTemperature(
//       value:{
//         Gt: 36
//       }
//     ){
//       node{
//         _id resource value
//       }
//     }
//   }
// `)


export default {
    components: { Erros },
    data() {
        return {
            erros: null,
            BodyTemperature: [],
            filter: {},
            headers: [
                { text: 'ID', value: '_id' },
                { text: 'Data Armazenamento', value: 'storaged' },
                { text: 'Data Coleta', value: 'date' },
                { text: 'Recurso', value: 'resource' },
                { text: 'Valor', value: 'value' },
            ],
        }
    },
    methods: {
        getBodyTemperature() {
          this.result  = useSubscription(gql`
            subscription {
              BodyTemperature(
                value:{
                  Gt: 36
                }
              ){
                node{
                  _id resource value
                }
              }
            }
          `);

          watch(
            this.$api.useSubscription(gql`
              subscription {
                BodyTemperature(
                  value:{
                    Gt: 36
                  }
                ){
                  node{
                    _id resource value
                  }
                }
              }
            `),
            resultado => {
                this.BodyTemperature = resultado.data.BodyTemperature.node
                this.filter = {}
                this.erros = null
            },
            {
              lazy: true // Don't immediately execute handler
            }
          )
            // console.log(this.$api)
            // this.$api.subscribe({
            //     subscription: gql`
            //         subscription (
            //           $menorigual: Int
            //           $maiorigual: Int          
            //         ){
            //             BodyTemperature(
            //               value:{
            //                 Lte: $menorigual
            //                 Gte: $maiorigual
            //               }                         
            //             ){
            //               node{
            //                 _id storaged date resource value
            //               }
            //             }
            //         }
            //     `,
            //     variables: {
            //         menorigual: this.filter.menorigual,
            //         maiorigual: this.filter.maiorigual
            //     },
            //     fetchPolicy: 'network-only'
            // }).then(resultado => {
            //     this.BodyTemperature = resultado.data.BodyTemperature.node
            //     this.filter = {}
            //     this.erros = null
            // }).catch(e => {
            //     this.erros = e
            // })
        }
    }
}
</script>

<style>

</style>
