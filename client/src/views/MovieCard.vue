<template>

  <section>

    <b-card v-if="movie" class="container">
      <b-media no-body>
        <b-media-aside vertical-align="center">
          <b-img alt="placeholder" :src="poster + movie.poster_path" style="max-width: 60rem; max-height: 90rem" /> </b-media-aside>
        <b-media-body class="ml-3">
          <h5 class="mt-0">{{movie.title}}</h5>
          <p>{{movie.overview}}</p>

        </b-media-body>
      </b-media>
      <b-button variant="primary" @click="selectMovie(movie.id)">Choose this movie</b-button>
      <router-link :to="`/mood`">Back to results</router-link>
    </b-card>

    <p v-else>Loading</p>
    <pre>{{movie}}</pre>
  </section>

</template>


<script>
  import api from "../api";

  export default {
    data() {
      return {
        movie: null,
        poster: "http://image.tmdb.org/t/p/w185/",
        results: null
      };
    },
    created() {
      api.getMovie(this.$route.params.id).then(movie => {
        this.movie = movie;
        console.log(this.movie);
      });
    },

    methods: {
      selectMovie(id) {
        api.selectMovie(id).then(res => {
          alert(id);
        });
      }
    }
  };
</script>