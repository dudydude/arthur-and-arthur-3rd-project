<template>
  <section>

    <div class="text-center">

      <h1 class="mt-3">Diiinneeer Tiiime!!!</h1>
      <div class="m-4">
        <div>
          <h2>Craving for some movie-food pairing...</h2>
          <h5 class="mb-5"> Choose a mood and we will do the rest...</h5>
          <b-button @click="foorForm = `searchbyMood`" class="button-profile m-4" variant="outline">Choose a mood</b-button>
        </div>
        <div>
          <h2 class="mt-5"> or your stomach is calling for something?</h2>
          <h5 class="mb-5">Choose a recipe and we will do the rest...</h5>
          <b-button @click="foorForm = `searchFood`" class="button-profile m-4" variant="outline">Look for a recipe</b-button>
        </div>
      </div>
    </div>

    <div v-if="foorForm === `searchbyMood`">
      <SearchByFoodMood class="container" />
    </div>

    <div v-else-if="foorForm === `searchFood`">
      <SearchForFood class="container" />
    </div>


    <div class="m-5 px-5">

    </div>

  </section>
</template>

<script>
import SearchForFood from "../components/SearchForFood";
import SearchByFoodMood from "../components/SearchByFoodMood";
import ComboVue from "../components/ComboVue";
import api from "../api";

export default {
  data() {
    return {
      foorForm: "",
      results: [],
      query: "",
      keywordSearch: "",
      ingredients: "",
      title: ""
    };
  },

  components: {
    SearchForFood,
    SearchByFoodMood
  },

  methods: {
    searchByKeyWords(keywordSearch) {
      api.searchByKeyWords(this.keywordSearch).then(results => {
        this.results = results;
      });
    },
    searchByIngredients(ingredients) {
      api.searchByIngredients(this.ingredients).then(results => {
        this.results = results;
      });
    },
    searchByTitle(title) {
      api.searchByTitle(this.title).then(results => {
        this.results = results;
      });
    }
  },
  computed: {}
};
</script>

<style  scoped>
/* src="vue-multiselect/dist/vue-multiselect.min.css" */
/* .field {
  display: flex;
  flex-direction: row;
} */

.btn .button-profile {
  padding: 2rem;
  margin: 2%;
  width: 25vh;
  background-color: rgb(20, 143, 119) !important;
  color: white;
  font-size: 1.6rem;
  border-radius: 50rem;
}

.btn .button-profile:hover {
  padding: 2rem;
  margin: 2%;
  width: 30vh;
  font-size: 2rem;
  background-color: white;
  color: rgb(20, 143, 119);
  border: 4px solid rgb(20, 143, 119);
  border-radius: 50rem;
}
</style>