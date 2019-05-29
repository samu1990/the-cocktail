<template>
  <div class="filtro">
    <h1 class="Title">Search Cocktail</h1>
    <div class="filtre">
      <v-layout row wrap>
        <v-flex xs4>
          <v-btn @click="getBebidas(0),nCategory=0">Alcoholic</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn @click="getBebidas(1),nCategory=1">Non Alcoholic</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn @click="getBebidas(2),nCategory=2">Ingredient</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div class="resultados" v-if="nCategory!=null">
      <h2 class="Title">{{category[nCategory].name}}</h2>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search you Drick"
        aria-label="Search"
        v-model="palabra"
      >
      <div class="bebidas" v-if="palabra.length > 1">
        <v-layout row wrap class="galeria">
          <v-flex xs4 v-for="(bebida, index) of filterItems" :key="index">
            <router-link :to="{name:'bebida',params:{id:bebida.idDrink}}" v-if="nCategory!=2">
              <figure>
                <v-img :src="bebida.strDrinkThumb"></v-img>
                <figcaption>{{bebida.strDrink}}</figcaption>
              </figure>
            </router-link>
            <router-link
              :to="{name:'Ingredient',params:{id:bebida.strIngredient1}}"
              v-if="nCategory==2"
            >
              <figure>
                <v-img
                  :src="'https://www.thecocktaildb.com/images/ingredients/'+bebida.strIngredient1+'.png'"
                ></v-img>
                <figcaption>{{bebida.strIngredient1}}</figcaption>
              </figure>
            </router-link>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "Filtro",
  data() {
    return {
      palabra: "",
      bebidas: [],
      category: [
        {
          url:
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic",
          name: "Alcoholic"
        },
        {
          url:
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
          name: "Non Alcoholic"
        },

        {
          url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
          name: "Ingredient"
        }
      ],
      nCategory: null
    };
  },
  methods: {
    getBebidas(numero) {
      this.bebidas = [];
      var urls = this.category[numero].url;
      fetch(urls)
        .then(data => data.json())
        //.then(data => console.log(data))
        .then(data => this.bebidas.push(data));
      console.log(urls, this.bebidas);
      this.palabra = "";
    }
  },
  created() {},
  computed: {
    filterItems() {
      if (this.palabra.length > 1) {
        return this.bebidas[0].drinks.filter(bebidaS => {
          if (this.nCategory == 2) {
            var name = bebidaS.strIngredient1.toLowerCase();
          } else {
            var name = bebidaS.strDrink.toLowerCase();
          }
          var bpalabra = this.palabra.toLowerCase();
          return name.match(bpalabra);
        });
      }
    }
  }
};
</script>
<style>
.resultados {
  margin: 2% 5%;
}
.resultados .galeria {
  padding: 5%;
}
.resultados .flex {
  margin: 1%;
}
.filtre {
  margin: 0 5%;
}
.filtre .v-btn {
  width: 88%;
}
</style>
