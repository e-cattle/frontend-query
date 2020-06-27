<template>
	<v-layout column>
		<!-- <v-flex>
			<UsuarioLogado />
		</v-flex> -->
		<v-flex>
			<v-tabs left   icons-and-text>
				<v-tabs-slider color="blue"></v-tabs-slider>

				<v-tab>
					Autenticação
				</v-tab>

				<v-tab>
					Consultas
				</v-tab>

				<v-tab>
					Monitor
				</v-tab>

				<v-tab-item>
					<AuthTabs />
				</v-tab-item>

				<v-tab-item>
					<QueryTabs />
				</v-tab-item>

				<v-tab-item>
					<MonitorTabs />
				</v-tab-item>
			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthTabs from './auth/AuthTabs'
import QueryTabs from './query/QueryTabs'
import MonitorTabs from './monitor/MonitorTabs'

export default {
	components: {
		AuthTabs,
		QueryTabs,
		MonitorTabs
	},
}
</script>

<style>

</style>
