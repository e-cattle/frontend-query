import Vue from 'vue'
import VueRouter from 'vue-router'
import QRCode from '../components/auth/QRCode'
import Register from '../components/auth/Register'
import Operations from '../components/Operations'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "qrcode",
      component: QRCode
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/operations",
      name: "operations",
      component: Operations
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path === "/" || to.path === "/body" ) {
//     return next();
//   }
// })

export default router
