<template>
  <section class="text-center container my-5">
    <div v-if="!movie">
       <h2>Let's Chill and Eat!</h2>
      <h3 class="m-2 mt-3">How to use the app</h3>
      <p class="text-center mx-5 my-2">You want to choose your food before looking our recommendation of matching movies? -> Click on Recipes 
        <br> You want to look first for a movie before making your dinner menu? -> Click on Movies</p>
      <hr class="m-1">

      <div id="food" class="tuto-container">
        <b-button class="button-profile" to="/recipes">Recipes</b-button>
        <b-button class="button-profile" @click="movie=true">Movies</b-button>
      </div>

    </div>
    <div class="text-center" v-if="movie">
      <h1> What are you looking for ? </h1>
      <div>
        <div>
          <h2> Choose a mood and we will do the rest :</h2>
          <br>
          <b-button :to="`/moodlist`" class="button-profile">Inspiration </b-button>
        </div>
        <div>
          <h2> May be you already have an idea
            <br>(choose a movie and we will do the rest) :</h2>
          <b-button class="button-profile" :to="`/mood`">Movie</b-button>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      secret: null,
      movie: false
    };
  },

  created() {
    api.getSecret().then(secret => {
      this.secret = secret;
    });
  }
};
</script>

<style scoped>
.tuto-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.button-profile {
  padding: 2rem;
  margin: 2%;
  width: 25vh;
  background-color: rgb(20, 143, 119);
  color: white;
  font-size: 1.6rem;
  border-radius: 50rem;
}

.button-profile:hover {
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

