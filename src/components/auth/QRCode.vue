<template>
  <v-main class="container-qrcode">
      <v-btn color="primary" class="ml-0 mt-3"
          @click="openCamera">
          Lendo QrCode
      </v-btn>
      <v-dialog v-model="state" persistent max-width="50%" max-height="50%">
      <button @click="openCamera">Fechar Camera</button>
        <template v-slot:activator="{ }"/>
        <qrcode-stream v-if="isShowingCamera" @init="onInit" @decode="onDecode"></qrcode-stream>
      </v-dialog>
  </v-main>
</template>

<script>

export default {
  name: 'QRCode',
  data () {
    return {
      isShowingCamera: false,
      state: false,
      qr: null
    }
  },
  methods: {
      openCamera() {
        this.isShowingCamera = !this.isShowingCamera
        this.state = !this.state
      },
      onDecode (content) {
        if(content){
          this.isShowingCamera = false
          this.state = false
          this.qr = JSON.parse(content)
          localStorage.setItem('qrtoken', this.qr.token)
          localStorage.setItem('ip', this.qr.ip)
          this.$router.push({ path: '/register' })
        }
      },
      onInit (promise) {
        promise
        .then(() => {
          this.decodedContent = null
          console.log('Successfully initilized! Ready for scanning now!')
        })
        .catch(error => {
          if (error.name === 'NotAllowedError') {
            this.errorMessage = 'Hey! I need access to your camera'
          } else if (error.name === 'NotFoundError') {
            this.errorMessage = 'Do you even have a camera on your device?'
          } else if (error.name === 'NotSupportedError') {
            this.errorMessage =
              'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
          } else if (error.name === 'NotReadableError') {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
          } else {
            this.errorMessage = 'UNKNOWN ERROR: ' + error.message
          }
          this.$emit('getError', this.errorMessage)
        }
        )
    }
  }
}
</script>


