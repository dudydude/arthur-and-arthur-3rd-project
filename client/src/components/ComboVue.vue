<template>
  <section>
    <div>
      <div>
        <b-button @click="showModal">
          <h2> Show me your combo </H2>
        </b-button>
        <b-modal ref="myModalRef" hide-footer title="Best combo for the best user" size="lg">
          <div class="d-block text-center">
          </div>
          <div>

            <div>
              <!-- IF MOVIE I DISPLAY A MOVIE CARD  -->


              <div v-if="select === true" class="container">
                <b-carousel id="carousel1" style="color: #333; border: 1px solid;" controls indicators background="#ababab" img-width="1024"
                  img-height="2000" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

                  <b-carousel-slide v-for="result in results" img-src="https://lorempixel.com/1024/480/technics/2/">


                  </b-carousel-slide>


                  <!-- Slides with custom text -->


                </b-carousel>

                <p class="mt-4">

                  <h3>{{results.data.dish[slide].title}}</h3>
                  <p>{{results.data.dish[slide].method}}</p>
                  <ul>
                    <li v-for="ingredient in results.data.dish[slide].ingredients">
                      {{ingredient}}</li>
                  </ul>

              </div>

              <div v-if="path == true">


                <b-media no-body class="container">
                  <b-media-aside vertical-align="center">
                    <b-img alt="placeholder" :src="poster + result.poster_path" style="max-width: 60rem; max-height: 90rem" /> </b-media-aside>
                  <b-media-body class="ml-5">
                    <h5 class="mt-0">{{result.title}}</h5>
                    <br>
                    <p>{{result.overview}}</p>
                    <ul>
                      <li class="ingredients">Release date : {{result.release_date}}</li>
                    </ul>

                  </b-media-body>
                </b-media>
                </b-card>

              </div>
              <!-- IF FOOD I DISPLAY A FOOD CARD  -->

              <div v-else>Food

              </div>
            </div>






          </div>




          <b-button variant="primary " block @click="selectMovie(result.id) " v-if="path == true">Lourd combo Movie : je check</b-button>
          <b-button variant="primary " @click="selectRecipe(result.title)" v-else>Lourd combo </b-button>

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
      results: [],
      //movieOk: true,
      slide: 0,
      sliding: null,
      poster: "http://image.tmdb.org/t/p/w185/",
      path: true,
      select: false
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
        console.log("Im in Disheeeees");
        console.log(res);
        this.results = res;
        this.select = true;
        // this.movieOk = false;
      });
    },

    selectMovie(id) {
      api.selectMovie(id).then(res => {
        console.log(res);
        console.log(res);
        this.results = res;
        this.select = true;
        // this.movieOk = false;
      });
    },

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  },
  created() {
    console.log(this.result);

    if (this.$route.name === "mood") {
      this.path = true;
    } else this.path = false;
  }
};
</script>

<style>
ol ol,
ol ul,
ul ol,
ul ul {
  display: flex;
  flex-direction: row;
}
</style>