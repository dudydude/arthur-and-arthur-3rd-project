<template>
  <section>
    <div id="chooseFoodMood" class="text-center m-3">
      <h3 class="m-2 text-center" v-if="otherShow">What is tonight about?</h3>
      <hr class="mx-5 my-3 px-5">
      <div class="btn-mood-grp">
        <b-button class="m-3 btn-mood">Tonight is the night</b-button>
        <b-button class="m-3 btn-mood">Homies in da hood</b-button>
         <b-button class="m-3 btn-mood">Bromance</b-button>
          <b-button class="m-3 btn-mood">Play it like Maya</b-button>
        <b-button class="m-3 btn-mood">I feel like a Sexy Bitch</b-button>
        <b-button class="m-3 btn-mood">Girls night</b-button>
        <b-button class="m-3 btn-mood">Home alone</b-button>
        <b-button class="m-3 btn-mood">In mood for some blood</b-button>     
      </div>
    </div>
    <div id="foodRecoByMood">
    </div>
      <hr class="mx-5 my-4">
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
.btn-mood-grp {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.btn-mood {
  border-radius: 4rem;
  background-color: rgb(20, 143, 119);
  border: solid 4px rgb(20, 143, 119);
  color: whitesmoke;
  font-size: 2.4rem;
}

.btn-mood:hover {
  border-radius: 4rem;
  background-color: transparent;
  border: solid 4px rgb(20, 143, 119);
  color: rgb(20, 143, 119);
  font-size: 2.4rem;
}
</style>
