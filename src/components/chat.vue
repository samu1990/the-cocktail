<template>
  <div class="chat">
    <div class="mensajes" id="allMensajes">
      <div
        class="mensaje text-xs-left"
        v-for="(sms, index) in mensajes"
        :key="index"
        :class="sms.nombre==usuario.nombre ? 'tuyo':'mio'"
      >
        <v-avatar>
          <img :src="sms.foto">
        </v-avatar>
        <div>
          <p class="autor font-weight-black">
            {{sms.nombre}}
            <span class="data text-xs-right caption">{{sms.fecha}}</span>
          </p>
          <p class="text">{{sms.mensaje}}</p>
        </div>
      </div>
    </div>
    <div class="input">
      <v-form @submit.prevent="enviarMensaje()" v-model="valido">
        <v-text-field label="You Message" v-model="mensajeChat" required :rules="reglas"></v-text-field>
      </v-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import moment from "moment";

export default {
  data() {
    return {
      mensajeChat: "",
      mensajes: [],
      valido: false,
      reglas: [v => !!v || "text is required"]
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    enviarMensaje() {
      if (this.valido) {
        console.log(
          "enviarMensaje",
          this.usuario.nombre,
          this.mensajeChat,
          Date.now()
        );
        db.collection("chats").add({
          mensaje: this.mensajeChat,
          fecha: Date.now(),
          nombre: this.usuario.nombre,
          foto: this.usuario.foto
        });
        this.mensajeChat = "";
      }
      document.getElementById(
        "allMensajes"
      ).scrollTop = document.getElementById("allMensajes").scrollHeight;
    }
  },
  actions() {},
  created() {
    moment.locale("en");
    let ref = db
      .collection("chats")
      .orderBy("fecha", "desc")
      .limit(10);

    ref.onSnapshot(querySnapshot => {
      this.mensajes = [];
      querySnapshot.forEach(doc => {
        this.mensajes.unshift({
          mensaje: doc.data().mensaje,
          nombre: doc.data().nombre,
          foto: doc.data().foto,
          fecha: moment(doc.data().fecha).format("DD/MM/YY hh:mm:ss")
        });
      });
    });
  }
};
</script>

<style>
.chat {
  background-color: white;
  margin: 1% 2% 4% 2%;
  border-radius: 5%;
}
.mensajes {
  margin: 5px 4%;
  height: 60vh;
  overflow: auto;
  padding: 2% 0;
}
.mensaje {
  padding: 5px 2%;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  margin-bottom: 5%;
}
.mensaje .v-avatar {
  margin-right: 2%;
}
.mensaje span {
  padding-left: 2%;
}
.mensaje div:last-child {
  width: 100%;
}
.input {
  margin: 0 5%;
  padding-bottom: 4%;
}
.mensaje.tuyo {
  background-color: #cccccc;
  margin-left: 10%;
}
.mensaje.mio {
  margin-right: 10%;
}
</style>
