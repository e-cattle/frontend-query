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
                <BodyTemperatureQuery />
            </v-tab-item>
            <v-tab-item>
                <AnimalWeightQuery />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import BodyTemperatureQuery from './BodyTemperatureQuery'
import AnimalWeightQuery from './AnimalWeightQuery'


export default {
    components: { BodyTemperatureQuery, AnimalWeightQuery }
}
</script>

<style>

</style>
