<template>
    <v-container fluid>
        <v-tabs color="blue"
            slider-color="blue">
            <v-tab ripple>
                Temperatura Corporal
            </v-tab>

            <v-tab-item>
                <BodyTemperatureQuery />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import BodyTemperatureQuery from './BodyTemperatureQuery'


export default {
    components: { BodyTemperatureQuery }
}
</script>

<style>

</style>
