<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Frontend </span>
        <span class="font-weight-light">Query</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <Body />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Body from './components/Body'

export default {
	name: 'App',
	components: { Body },
	methods: mapActions(['setApplication']),
	// created() {
	// 	this.setApplication(null)
	// }
}
</script>