
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  // name: 'QrPage',
  data() {
    return {
      isShowingCamera: false,
      isScanned: false
    }
  },
  methods: {
      openCamera() {
        this.isShowingCamera = !this.isShowingCamera
      },

      onDecode (content) {
        console.log(content)
        if(content){
          this.isShowingCamera = false
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

<template>
  <div class="qrpage">
    <p>Welcome to the QR Page</p>
    <button @click="openCamera">{{ !isShowingCamera ? 'Scan a QR Code' : 'Close QR Scan' }}</button>
    <qrcode-stream v-if="isShowingCamera" @init="onInit" @decode="onDecode"></qrcode-stream>
  </div>
</template>


<style Lang="scss" scoped>
  p{
    color: #333;
  }
</style>
