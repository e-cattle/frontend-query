<template>
	<v-layout column>
		<v-flex>
			<v-main>
				<v-tabs left   icons-and-text>
					<v-tabs-slider color="blue"></v-tabs-slider>

					<v-tab>
						Consultas
					</v-tab>

					<v-tab>
						Monitor
					</v-tab>

					<v-tab-item>
						<QueryTabs />
					</v-tab-item>

					<v-tab-item>
						<MonitorTabs />
					</v-tab-item>
				</v-tabs>
			</v-main>
		</v-flex>
	</v-layout>
</template>

<script>
// import '../plugins/graphql'
import QueryTabs from './query/QueryTabs'
import MonitorTabs from './monitor/MonitorTabs'
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from "apollo-link-ws"
import { InMemoryCache } from "apollo-cache-inmemory"

export default {
	components: {
		QueryTabs,
		MonitorTabs
	},
	beforeMount(){

Vue.use({
  install(Vue) {
    const token = localStorage.getItem('token')

    Vue.prototype.$api = new ApolloClient({
      link: new WebSocketLink({
      uri: 'ws://'+localStorage.getItem('ip')+':4000',
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

	}

}


</script>

<style>

</style>
