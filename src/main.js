import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import {
  auth
} from "@/firebase";

auth.onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('setUsuario',user)
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});