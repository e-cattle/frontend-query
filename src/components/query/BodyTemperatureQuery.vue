<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
               <v-layout column class="ma-3">
                    <h1 class="headline">Consultar Temperatura</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="Valor maior igual"
                            v-model.number="filter.maiorigual" />
                        <v-text-field label="Valor menor igual"
                            v-model.number="filter.menorigual" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="getBodyTemperature">
                            Consultar
                        </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table 
                  :headers="headers" 
                  :items="temps"
                  :items-per-page="pagination.rowsPerPage"
                  :page.sync="pagination.page"
                  :sort-by.sync="pagination.sortBy"
                  sort-desc
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item._id }}</td>
                        <td>{{ props.item.resource }}</td>
                        <td>{{ props.item.storaged }}</td>
                        <td>{{ props.item.date }}</td>
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
// import '../../plugins/graphql'

export default {
    components: { Erros },
    data() {
        return {
            pagination: {
              rowsPerPage: 5,
              sortBy: 'storaged',
              descending: true
            },          
            erros: null,
            temps: [],
            filter: {},
            headers: [
                { text: 'ID', value: '_id' },
                { text: 'Recurso', value: 'resource' },
                { text: 'Armazenamento', value: 'storaged' },
                { text: 'Coleta', value: 'date' },
                { text: 'Valor', value: 'value' },
            ],
        }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
          return 1
        }

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods: {
        getBodyTemperature() {
            // console.log(this.$api)
            this.$apollo.query({
                query: gql`
                    query(
                      $menorigual: Int
                      $maiorigual: Int          
                    ){
                        BodyTemperature(
                          value:{
                            Lte: $menorigual
                            Gte: $maiorigual
                          }                         
                        ){
                            _id resource storaged date value
                        }
                    }
                `,
                variables: {
                    menorigual: this.filter.menorigual,
                    maiorigual: this.filter.maiorigual
                },
                fetchPolicy: 'network-only'
            }).then(resultado => {
                this.temps = resultado.data.BodyTemperature
                this.filter = {}
                this.erros = null
            }).catch(e => {
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
