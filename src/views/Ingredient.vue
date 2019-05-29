<template>
  <div>
    <v-container grid-list-md text-xs-center v-for="(ingredient, index) in Arrbebida" :key="index">
      <h1 class="Title">{{ingredient.ingredients[0].strIngredient}}</h1>
      <v-layout row wrap>
        <v-flex xs12>
          <v-img
            :src="'https://www.thecocktaildb.com/images/ingredients/'+ingredient.ingredients[0].strIngredient+'.png'"
          ></v-img>
        </v-flex>

        <v-flex xs12>
          <p class="orange--text text-xs-center" @click="description=!description">
            <span v-if="!description">Description</span>
            <span v-if="description">Drinks with {{ingredient.ingredients[0].strIngredient}}</span>
          </p>
          <div v-if="description">
            <p class="white--text text-xs-justify">{{ingredient.ingredients[0].strDescription}}</p>
          </div>
          <div v-else>
            <v-layout row wrap>
              <v-flex xs6 v-for="(bebida, index) in ADerivadas[0].drinks" :key="index">
                <router-link :to="{name:'bebida',params:{id:bebida.idDrink}}">
                  <figure>
                    <p>{{bebida.strAlcoholic}}</p>
                    <v-img :src="bebida.strDrinkThumb"></v-img>
                    <figcaption>{{bebida.strDrink}}</figcaption>
                  </figure>
                </router-link>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Arrbebida: [],
      ADerivadas: [],
      id: this.$route.params.id,
      description: false
    };
  },
  methods: {
    getBebidas(id) {
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.Arrbebida.push(data));
      console.log(this.Arrbebida);
    },
    getDerivadas(id) {
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.ADerivadas.push(data));
      console.log(this.ADerivadas);
    }
  },
  created() {
    this.getBebidas(this.id);
    this.getDerivadas(this.id);
  }
};
</script>