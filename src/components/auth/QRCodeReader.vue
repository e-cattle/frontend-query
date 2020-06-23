<template>
  <v-main class="container-qrcode">
 <v-row justify="center">
    <v-dialog v-model="state" persistent max-width="100%" max-height="100%">
      <template v-slot:activator="{ }"/>
     <qrcode-stream class="qr-code-container" @init="onInit" @decode="onDecode" :paused="paused">
      <div v-if="decodedContent" class="decoded-content">QRCode lido {{ decodedContent }} </div>
      <div v-else class="decoded-content overline" >posicione sobre o QRCode</div>
    </qrcode-stream>
    </v-dialog>
 </v-row>
  </v-main>
</template>

<script>
// https://gruhn.github.io/vue-qrcode-reader/demos/LoadingIndicator.html

export default {
  name: 'reader-qr-code',
  props: {
    state: Boolean
  },
  data () {
    return {
      qrCodeReaderState: this.state,
      paused: false,
      decodedContent: null,
      errorMessage: ''
    }
  },
  mounted () {
    this.decodedContent = null
  },
  methods: {
    onDecode (content) {
      this.decodedContent = content
      this.paused = true
      // console.log('qrcode: ', this.decodedContent)
      this.qrCodeReaderState = !this.qrCodeReaderState
      this.$emit('getTokem', this.decodedContent)
      // alert(this.decodedContent)
      
    },

    async onDetect (promise) {
      const b = await promise

      this.decodedContent = b.content
      this.paused = true
      console.log('qrcode: ', this.decodedContent)
      this.qrCodeReaderState = !this.qrCodeReaderState
      this.$emit('getTokem', this.decodedContent)
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

<style scoped>

  .container-qrcode {
    width: 100%;
    height: 100%;
    border: 4px solid blue;
  }

 .decoded-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;

  color: white;
  font-weight: bold;
  padding: 10px;
  background-color: rgba(0,0,0,.5);
}

.qr-code-container {
    background: black;
    border: 2px solid red;
}
</style>
