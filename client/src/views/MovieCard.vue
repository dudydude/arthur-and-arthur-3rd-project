<template>
  <div class="b-container">
    <div v-if="movie">
      <h2>{{movie.title}}</h2>
      <p> {{movie.overview}} </p>


      <pre>{{movie}}</pre>
    </div>
    <p v-else>Loading</p>
  </div>
</template>


<script>
import api from "../api";

export default {
  data() {
    return {
      movie: null,
      poster: "http://image.tmdb.org/t/p/w185/"
    };
  },
  created() {
    api.getMovie(this.$route.params.id).then(movie => {
      this.movie = movie;
      //console.log(this.movie)
    });
  }
};
</script>