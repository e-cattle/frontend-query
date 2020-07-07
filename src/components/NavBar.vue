<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Frontend </span>
        <span class="font-weight-light">Query</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
        <router-view/>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'NavBar',
  computed: {
    ...mapGetters(['application']),
  },
  mounted() {
    if(this.application && this.application.token){
      this.$router.push({ path: '/operations' })
    } 
  }
}
</script>