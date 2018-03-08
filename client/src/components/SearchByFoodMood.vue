<template>
  <section>
    <div id="chooseFoodMood">
      <h3 class="m-2 text-center" v-if="otherShow">What's the mood for tonight?</h3>
      <hr class="mx-5 px-5">
      <b-button @click="romance===true">Il y a une zouze, j'claque du flooz</b-button>
      <b-button>Il y a les potos, on fait les gros</b-button>
      <b-button>I feel like a Sexy Bitch</b-button>
      <b-button>In mood for some blood</b-button>
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