<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
               <v-layout column class="ma-3">
                    <h1 class="headline">Monitorar Valor Temperatura</h1>
                    <v-divider class="mb-3" />
                        <!-- <div v-if="erros">
                            <Erros :erros="erros" />
                        </div> -->
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
                <v-data-table 
                  :headers="headers" 
                  :items="notifyBodyTemperature"
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
  import gql from "graphql-tag"

  export default {
    data() {
      return {
        pagination: {
          rowsPerPage: 5,
          sortBy: 'value',
          descending: true
        },
        notifyBodyTemperature: [],
        filter: {},
        headers: [
            { text: 'ID', value: '_id' },
            { text: 'Recurso', value: 'resource' },
            { text: 'Data Armazenamento', value: 'storaged' },
            { text: 'Data Coleta', value: 'date' },
            { text: 'Valor', value: 'value' },
        ]
      };
    },
    mounted() {},
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
          return 1
        }

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods: {
      getBodyTemperature(){
        const that = this;
        this.$api.subscribe ({
            query: gql`
              subscription notifyBodyTemperature(
                $menorigual: Int
                $maiorigual: Int       
              ) {
                BodyTemperature(
                  value:{
                    Lte: $menorigual
                    Gte: $maiorigual
                  }
                ){
                  node{
                    _id storaged date resource value
                  }
                }
              }
            `,
            variables: {
                menorigual: this.filter.menorigual,
                maiorigual: this.filter.maiorigual
            },
            fetchPolicy: 'network-only',
        })
        .subscribe({
            next (data) {
                const mergedNotify = data.data.BodyTemperature.node
                that.notifyBodyTemperature.push(mergedNotify)
                console.log(that.notifyBodyTemperature)
              // var str = JSON.stringify(this.notifyBodyTemperature, null, 4)
            },
        })
      }
    }
  }

</script>
