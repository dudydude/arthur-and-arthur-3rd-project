<template>
    <section>
        <div>
            <div>
                <b-button @click="showModal">
                    <h2> Montre moi ton combo </H2>
                </b-button>
                <b-modal ref="myModalRef" hide-footer title="Using Component Methods" size="lg">
                    <div class="d-block text-center" v-if="movieOk === true">


                    </div>
                    <div v-else>

                        <div>
                            <b-carousel id="carousel1" style="color: #333; border: 1px solid; " controls indicators background="#fff" :interval="4000"
                                img-width="1024" img-height="400" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

                                <!-- Text slides with image -->
                                <b-carousel-slide v-for="movie in movies" :img-src="poster +  movie.poster_path">

                                </b-carousel-slide>



                                <h5 class="mt-4 ">
                                    Title: {{ movies[slide].title }} </h5>
                                <p>{{movies[slide].overview}}</p>

                            </b-carousel>



                        </div>

                    </div>

                    <div>
                        <h1> Gros combo :</h1>
                        <pre>{{result}}</pre>
                    </div>
                    <b-button variant="primary " @click="selectRecipe(result.title) " v-if="movieOk ===false">Fais voir les films </b-button>
                    <b-button variant="primary " @click="selectRecipe(result.title) " v-else>Lourd combo </b-button>

                    <b-btn class="mt-3 " variant="outline-danger " block @click="hideModal ">Close Me</b-btn>
                </b-modal>
            </div>

        </div>

    </section>
</template>

<script>
import api from "../api";

export default {
  props: ["result"],
  data() {
    return {
      movies: [],
      movieOk: true,
      slide: 0,
      sliding: null,
      poster: "http://image.tmdb.org/t/p/w185/"
    };
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    selectRecipe(id) {
      api.selectRecipe(id).then(res => {
        console.log("Im in ");
        console.log(res);
        this.movies = res.movie;
        this.movieOk = false;
      });
    },

    created: function() {
      console.log(this.result);
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>