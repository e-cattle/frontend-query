<template>
    <v-container fluid>
        <v-tabs
            color="blue"
            slider-color="blue">
            <v-tab ripple>
                QRCode
            </v-tab>
            <v-tab ripple>
                Registrar
            </v-tab>
            <v-tab-item>
                <QRCode />
            </v-tab-item>
            <v-tab-item>
                <Register />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import Register from './Register'
import QRCode from './QRCode'
export default {
    // components: { Register, Login }
    components: { Register, QRCode}
}
</script>

<style>

</style>
