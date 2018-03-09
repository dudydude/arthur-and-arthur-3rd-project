<template>
  <section>
    <div id="chooseFoodMood" class="text-center m-3">
      <h3 class="m-2 text-center" v-if="otherShow">What is your mood for tonight?</h3>
      <hr class="mx-5 my-3 px-5">
      <div class="btn-mood">
        <b-button class="m-3">Il y a une zouze, j'claque du flooz</b-button>
        <b-button class="m-3">Il y a les potos, on fait les gros</b-button>
        <b-button class="m-3">I feel like a Sexy Bitch</b-button>
        <b-button class="m-3">In mood for some blood</b-button>
      </div>
    </div>
    <div id="foodRecoByMood">
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
      otherShow: true,
      romance: false
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

<style scoped>
.btn-mood {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>
