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
					<!-- <v-icon>fingerprint</v-icon> -->
				</v-tab>

				<v-tab>
					Consultas
					<!-- <v-icon>people</v-icon> -->
				</v-tab>

				<v-tab>
					Monitor
					<!-- <v-icon>how_to_reg</v-icon> -->
				</v-tab>

				<v-tab-item>
					<AuthTabs />
				</v-tab-item>

				<!-- <v-tab-item>
					<UsuarioAbas />
				</v-tab-item> -->

				<!-- <v-tab-item>
					<PerfilAbas />
				</v-tab-item> -->
			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthTabs from './auth/Tabs'
// import UsuarioLogado from './autenticacao/UsuarioLogado'
// import UsuarioAbas from './usuario/Abas'
// import PerfilAbas from './perfil/Abas'

export default {
	components: {
		AuthTabs,
		// UsuarioLogado,
		// UsuarioAbas,
		// PerfilAbas,
	},
}
</script>

<style>

</style>
