<template>
<section>

<div class="text-center">
<h2 class="has-text-centered">À Taaaaaable!!</h2>
<div class="m-2">
   <b-button @click="foorForm = `searchRecipe`" variant="warning">Il y a une zouze, j'claque du flooz</b-button>
</div>
<div class="m-2">
   <b-button @click="foorForm = `searchFridge`" variant="primary">J'ai les crocs, j'déglingue l'frigo!</b-button>
</div>
</div>

<div v-if="foorForm === `searchRecipe`">
<SearchForFood class="m-5"/>
</div>

<div v-else-if="foorForm === `searchFridge`">
<SearchByFridge class="m-5"/>
</div>

<div class="m-5 px-5">
<hr>
</div>
</section>
</template>

<script>
import SearchForFood from "../components/SearchForFood";
import SearchByFridge from "../components/SearchByFridge";
import api from "../api";

export default {
  data() {
    return {
      foorForm: ""
    };
  },
  components: { SearchForFood, SearchByFridge }
};
</script>
