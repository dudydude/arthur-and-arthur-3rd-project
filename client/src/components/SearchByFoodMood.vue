<template>
    <section>
<h2 class="m-2" v-if="otherShow">Enter what you've, we will do the rest for you:</h2>

    <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <router-link type="submit" variant="primary">Il y a une zouze, j'claque du flooz</router-link>
      <router-link type="submit" variant="primary">Il y a les potos, on fait les gros</router-link>
      <router-link type="submit" variant="primary">I'm a Sexy Bitch</router-link>
      <router-link type="submit" variant="primary">In mood for some blood</router-link>
    </b-form>
  </div>
    </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      // search: true;
      query: "",
      ingredients: "",
      show: true,
      otherShow: true
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },

    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.ingredients = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.otherShow = false;
      this.$nextTick(() => {
        this.show = true;
        this.otherShow = true;
      });
    },

    searchRecipe(query) {
      api.searchRecipe(this.query).then(results => {
        this.results = results;
      });
    },

    // searchByKeyWords(keywordSearch) {
    //   api.searchKeywords(this.keywordSearch).then(results => {
    //     this.results = results;
    //   });
    // },

    searchByIngredients(ingredients) {
      api.searchKeywords(this.ingredients).then(results => {
        this.results = results;
      });
    },
    searchByTitle(keywordSearch) {
      api.searchKeywords(this.keywordSearch).then(results => {
        this.results = results;
      });
    }
  },
  computed: {}
};
</script>

