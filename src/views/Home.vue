<template>
  <v-container grid-list-md text-xs-center class="Home">
    <h1 class="Title">Random Drinks</h1>
    <p class="Title">Welcome {{usuario.nombre}}</p>
    <div>
      <v-layout row wrap>
        <v-flex xs6 v-for="(bebida, index) in bebidas" :key="index">
          <router-link :to="{name:'bebida',params:{id:bebida.drinks[0].idDrink}}">
            <figure>
              <p>{{bebida.drinks[0].strAlcoholic}}</p>
              <v-img :src="bebida.drinks[0].strDrinkThumb"></v-img>
              <figcaption>{{bebida.drinks[0].strDrink}}</figcaption>
            </figure>
          </router-link>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bebidas: [],
    };
  },
  methods: {
    getBebidas(context) {
      for (let index = 0; index < 11; index++) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(data => data.json())
          //.then(data => console.log(data))
          .then(data => this.bebidas.push(data));
      }
      console.log(this.bebidas);
    }
  },
  created() {
    this.getBebidas();
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
figcaption {
  color: white;
}
</style>
