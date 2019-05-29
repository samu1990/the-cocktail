<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <span>thecocktail</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/">
          <v-btn icon>
            <v-icon>home</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/Filtro">
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/Login">
          <v-btn icon>
            <v-icon>person</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bebiba: ""
    };
  }
};
</script>
<style>
a {
  color: black;
  text-decoration: none !important;
}

.v-content {
  background-color: #0c0601;
}
.Title {
  color: #b15b00;
  text-align: center;
  margin: 0%;
  margin-top: 2%;
}
.theme--light.v-toolbar {
  background-color: #b15b00;
}
.v-toolbar__title a {
  color: #0c0601;
}
.v-toolbar__content input {
  height: 30px;
  background-color: white;
  border-radius: 30px;
  width: 41%;
  padding: 2px 5%;
}
figure {
  text-align: center;
}
p {
  margin: 0 !important;
}
</style>

