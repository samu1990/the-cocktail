<template>
  <div>
    <h1 class="Title">Login</h1>
    <v-btn block color="error" @click="google()">
      <v-icon left dark>fab fa-google</v-icon>Google
    </v-btn>
    <v-btn @click="cerrarSession()">LOG OUT</v-btn>
  </div>
</template>
<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      registro: false
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    ...mapActions(["cerrarSession"]),
    async google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user);
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          foto: user.photoURL,
          uid: user.uid
        };
        this.nuevoUsuario(usuario);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>