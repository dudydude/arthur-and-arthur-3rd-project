<template>
<section>

<div class="text-center">
<h2 class="has-text-centered">À Taaaaaable!!</h2>
<div class="m-4">
   <b-button @click="foorForm = `searchbyMood`" variant="warning">Set up the dinner mood</b-button>
   <b-button @click="foorForm = `searchFood`" variant="primary">J'ai les crocs, j'déglingue l'frigo!</b-button>
</div>
</div>

<div v-if="foorForm === `searchbyMood`">
<SearchByFoodMood class="m-5"/>
</div>

<div v-else-if="foorForm === `searchFood`">
<SearchForFood class="m-5"/>
</div>


<div class="m-5 px-5">
<hr>
</div>

</section>
</template>

<script>
import SearchForFood from "../components/SearchForFood";
import SearchByFoodMood from "../components/SearchByFoodMood";
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