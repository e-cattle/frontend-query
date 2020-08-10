<template>
    <v-container fluid>
        <v-tabs color="blue"
            slider-color="blue">
            <v-tab ripple>
                Temperatura Corporal
            </v-tab>
            <v-tab ripple>
                Peso do Animal
            </v-tab>
            <v-tab-item>
                <BodyTemperatureMonitor />
            </v-tab-item>
            <v-tab-item>
                <AnimalWeightMonitor />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import BodyTemperatureMonitor from './BodyTemperatureMonitor'
import AnimalWeightMonitor from './AnimalWeightMonitor'

export default {
    components: { BodyTemperatureMonitor, AnimalWeightMonitor }
}
</script>

<style>

</style>
