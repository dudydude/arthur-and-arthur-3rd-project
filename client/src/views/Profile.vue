<template>
  <section class="text-center container my-5">
    <div v-if="!movie">
      <h2>Let's Eat and Chill!</h2>
      <hr class="m-5">
      <h3 class="mt-3 mb-5">How to use the app</h3>
      <h6 class="text-center mx-5 mt-4">You want to choose your food before looking at our recommendation of movies?</h6>
        <h5>> Click on Recipes <</h5>
         <b-button class="button-profile" to="/recipes">Recipes</b-button>
         <br class="m-5">
        <h6 class="mt-5"> You want to look first for a movie before making your dinner menu?</h6> 
        <h5>> Click on Movies <</h5>
        <b-button class="button-profile" @click="movie=true">Movies</b-button>
    </div>

    <div class="text-center" v-if="movie">
      <div>
         <h1 class="mt-3">Moooviiie Tiiime!!</h1>
        <div>
          <h2>Need some inspiration...</h2>
          <h5 class="mb-5"> Choose a mood and we will do the rest...</h5>
          <br>
          <b-button :to="`/moodlist`" class="button-profile mb-5">Mood</b-button>
        </div>
        <div>
          <h2 class="mt-5"> or you already have an idea?</h2>
          <h5 class="mb-5">Choose a movie and we will do the rest...</h5>
          <b-button class="button-profile" :to="`/mood`">Movie</b-button>
        </div>
      </div>
    </div>
  <hr class="m-4">
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