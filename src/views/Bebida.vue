<template>
  <div class="bebida">
    <v-container grid-list-md text-xs-center v-for="(bebida, index) in Arrbebida" :key="index">
      <h1 class="text-xs-center" b-5>{{bebida.drinks[0].strDrink}}</h1>
      <p v-if="bebida.drinks[0].strAlcoholic=='Alcoholic'" class="red--text">Alcoholic Drink +18</p>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="foto">
            <v-img :src="bebida.drinks[0].strDrinkThumb"></v-img>
          </div>
        </v-flex>
        <v-flex xs12>
          <div class="descripcion">
            <p>{{bebida.drinks[0].strInstructions}}</p>
          </div>
        </v-flex>
        <v-flex xs12 class="ingredients">
          <h2 class="text-xs-center" b-5>Ingredients</h2>
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="(item, index) in ingre"
              :key="index"
              v-if="bebida.drinks[0]['strIngredient' + (index+1)]!=''"
            >
              <router-link
                :to="{name:'Ingredient',params:{id:bebida.drinks[0]['strIngredient' + (index+1)]}}"
              >
                <figure>
                  <v-img
                    :src="'https://www.thecocktaildb.com/images/ingredients/'+bebida.drinks[0]['strIngredient' + (index+1)]+'.png'"
                  ></v-img>
                  <figcaption>
                    <span>{{bebida.drinks[0]['strMeasure' + (index+1)]}}</span>
                    {{bebida.drinks[0]['strIngredient' + (index+1)]}}
                  </figcaption>
                </figure>
              </router-link>
            </v-flex>
          </v-layout>
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
      ingre: 15,
      id: this.$route.params.id
    };
  },
  methods: {
    getBebidas(id) {
      var urlAPi =
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
      fetch(urlAPi)
        .then(data => data.json())
        .then(data => this.Arrbebida.push(data));
      console.log(this.Arrbebida);
    }
  },
  created() {
    this.getBebidas(this.id);
  }
};
</script>
<style>
.bebida {
  color: white;
}
.foto {
  margin: 0 20%;
}
.descripcion {
  text-align: center;
  margin: 0 2%;
}
.ingredients > .layout {
  justify-content: center;
}
</style>