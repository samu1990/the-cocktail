import Vue from 'vue'
import Vuex from 'vuex'
import {
  auth
} from "@/firebase";
import router from "@/router";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: ''
  },
  mutations: {
    nuevoUsuario(state, payload) {
      state.usuario = payload
    }
  },
  actions: {
    setUsuario({
      commit
    }, user) {
      const usuario = {
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL,
        uid: user.uid
      }
      commit('nuevoUsuario', usuario)
    },
    cerrarSession({
      commit
    }) {
      auth.signOut()
      commit('nuevoUsuario', null)
      router.push({
        name: 'login'
      })
      console.log('Cerrar Seccion');

    }
  }
})