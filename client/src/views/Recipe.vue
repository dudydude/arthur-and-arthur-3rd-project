<template>
<section>

<div class="text-center">

<h1 class="mt-3">Diiinneeer Tiiime!!</h1>
<div class="m-4">
   <b-button @click="foorForm = `searchbyMood`" class="btn-orange m-4">Choose my mood</b-button>
   <b-button @click="foorForm = `searchFood`" class="btn-orange m-4">Look for a recipe</b-button>
</div>
</div>

<div v-if="foorForm === `searchbyMood`">
<SearchByFoodMood class="container"/>
</div>

<div v-else-if="foorForm === `searchFood`">
<SearchForFood class="container"/>
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

<style src="vue-multiselect/dist/vue-multiselect.min.css">
.field {
  display: flex;
  flex-direction: row;
}
</style>