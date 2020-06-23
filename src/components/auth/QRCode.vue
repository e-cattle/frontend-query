<template>
<v-main>
 <v-chip
  class="center-position-vertical white"
  style="padding: 0">
    <div class="mx-3">
      <div
      class="mx-auto index30"
      v-for="item in items" :key="item.action"
      style="padding: 10px 0">
        <v-btn
        small
        :elevation="2"
        @click="selectOption(item.action)">click
        </v-btn>
      </div>
    </div>
  </v-chip>

  <QRCode :state="viewQRCode" @getTokem="geTokem" @getError="getError"></QRCode>
</v-main>
</template>

<script>
import QRCode from './QRCodeReader'

const methods = {
  geTokem (object) {
   this.qr = JSON.parse(object)
    console.log(this.qr)
    this.$session.set('QRTOKEN', this.qr.token)
    this.$session.set('IP', this.qr.ip)
    this.viewQRCode = false
  },
  getError (object) {
    console.log(object)
    this.viewQRCode = false
  },
  selectOption (action) {
    console.log('click')
    if (action === 'startQRCode') { this.viewQRCode = true
      // alert(this.decodedContent)
     }
    // setTimeout(() => { this.viewQRCode = false }, 20000) }
  }
}

export default {
  name: 'data-app-x',
  components: {
    QRCode
  },
  data () {
    return {
      qr: null,
      viewQRCode: false,
      dialogstartQRCode: false,
      items: [{ action: 'startQRCode' }]
    }
  },
  methods
// em, ch, mm
}
</script>

<style scoped>
  .about {
    background: brown;
    height: 300;
    position: relative;
  }
</style>
