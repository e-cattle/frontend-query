<template>
    <v-container fluid>
        <v-tabs color="blue"
            slider-color="blue">
            <v-tab ripple>
                Temperatura Corporal
            </v-tab>

            <v-tab-item>
                <BodyTemperatureMonitor />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import BodyTemperatureMonitor from './BodyTemperatureMonitor'

export default {
    components: { BodyTemperatureMonitor }
}
</script>

<style>

</style>
