<template>
  <div>
    <h1 class="Title mb-3">Login</h1>
    <v-btn block color="error" @click="google()">
      <v-icon left dark>fab fa-google</v-icon>Google
    </v-btn>
  </div>
</template>
<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapActions, mapState } from "vuex";

import router from "@/router";
export default {
  data() {
    return {};
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
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
.v-btn {
  margin: 0 5%;
  width: 90%;
  border-radius: 5px;
}
</style>
