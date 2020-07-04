<template>
            <v-flex v-if="notifyBodyTemperature"> 
              <v-layout column class="ma-3">
                  <h1 class="headline">Resultado</h1>
                  <v-divider />
                  <template>
                      <v-text-field label="ID" readonly
                          v-model="notifyBodyTemperature._id" />
                      <v-text-field label="Recurso" readonly
                          v-model="notifyBodyTemperature.resource" />
                      <v-text-field label="Armazenamento" readonly
                          v-model="notifyBodyTemperature.storaged" />
                      <v-text-field label="Valor" readonly
                          v-model="notifyBodyTemperature.value" />
                  </template>
              </v-layout>
          </v-flex>
</template>

<script>
  import gql from "graphql-tag"

const NOTIFY_BODY_TEMPERATURE = gql`
  subscription notifyBodyTemperature {
    BodyTemperature(
      value:{
        Gt: 36
      }
    ){
      node{
        _id storaged date resource value
      }
    }
  }
`

  export default {
    data() {
      return {
        notifyBodyTemperature: [],
        headers: [
            { text: 'ID', value: '_id' },
            { text: 'Data Armazenamento', value: 'storaged' },
            { text: 'Data Coleta', value: 'date' },
            { text: 'Recurso', value: 'resource' },
            { text: 'Valor', value: 'value' },
        ]
      };
    },
    mounted() {},
      apollo: {
        // Subscriptions
        $subscribe: {
          // When a user is added
          notifyBodyTemperature: {
            query: NOTIFY_BODY_TEMPERATURE,
            // Result hook
            result (data) {
              // Let's update the local data
              // alert(data)
              this.notifyBodyTemperature = data.data.BodyTemperature.node
              var str = JSON.stringify(this.notifyBodyTemperature, null, 4)
              alert(str)
            },
          }
        }
      }
    // }
  }

</script>
