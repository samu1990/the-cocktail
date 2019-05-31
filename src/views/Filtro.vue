<template>
  <div class="filtro">
    <h1 class="Title" @click="nCategory=null">Search Cocktail</h1>
    <div
      class="filtre"
      :class="nCategory==null? 'filtroNULL':'filtroNUM'"
      v-for="(item, index) in category"
      :key="index"
    >
      <v-btn @click="getBebidas(index),nCategory=index" :color="item.color">{{item.name}}</v-btn>
    </div>
    <div class="resultados" v-if="nCategory!=null">
      <h2 class="Title">{{category[nCategory].name}}</h2>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search you Drink"
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
          name: "Alcoholic",
          color: "orange lighten-1"
        },
        {
          url:
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
          name: "Non Alcoholic",
          color: "deep-orange lighten-1"
        },

        {
          url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
          name: "Ingredient",
          color: "green lighten-1"
        },
        {
          url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
          name: "Categories",
          color: "deep-purple lighten-1"
        },
        {
          url: "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list",
          name: "Glass",
          color: "cyan lighten-1"
        }
      ],
      nCategory: null
    };
  },
  methods: {
    getBebidas(num) {
      var urls = this.category[num].url;
      this.bebidas = [];
      fetch(urls)
        .then(data => data.json())
        //.then(data => console.log(data))
        .then(data => this.bebidas.push(data));
      console.log(urls);
      console.log(this.bebidas);
    }
  },
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
.filtroNULL {
  margin: 0 5%;
}
.filtroNULL .v-btn {
  margin: 5% 0;
  width: 100%;
  font-size: 15px;
  height: 44px;
  padding: 0 32px;
}
.filtroNUM {
  padding: 0 3px;
}
.filtre button.v-btn {
  color: white;
}
</style>
