<template>
  <div>
    <div>
      <div>
        <b-button id="btnSeeMore" @click="showModal">
          <h2> See more </h2>
        </b-button>
        <b-modal ref="myModalRef" hide-footer title="Best combo for the best user" size="lg">
          <div class="d-block text-center">
          </div>
          <div>

            <div>
              <!-- IF MOVIE I DISPLAY A MOVIE CARD  -->


              <div class="container">


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

                <div v-else> Food


                  <b-card>
                    <b-media no-body>
                      <b-media-body>
                        <div class="text-center">
                          <h2 class="mt-0">{{result.title}}</h2>
                        </div>
                        <div class="text-center">
                          <p>{{result.cookingTime}}</p>
                        </div>
                        <p class="text-center">
                          <span class="keyWord" v-for="keyWord in result.keyWords">{{keyWord}}</span>
                        </p>
                        <hr class="m-5 px-5">
                        <div>
                          <div class="text-center">
                            <h5 class="m-1">{{result.indication}}</h5>
                            <br>
                            <h6> Ingredients : </h6>
                          </div>

                        </div>
                        <p class="text-justify mx-5">
                          {{result.method}}
                        </p>


                        <b-button variant="primary " block @click="selectRecipe(result.title)">I like it! Give me some movies 🤘 </b-button>
                      </b-media-body>

                    </b-media>
                  </b-card>

                  <ul>
                    <li v-for="result in results">{{result.title}}</li>
                  </ul>
                  <!-- <!-- </div> -->
                </div>

                <pre>{{movies}}</pre>


              </div>

            </div>

          </div>




          <b-button variant="primary " block @click="selectMovie(result.id) " v-if="path == true">I like it!</b-button>

          <b-btn class="mt-3 " variant="outline-danger " block @click="hideModal ">Close Me</b-btn>
        </b-modal>
      </div>

    </div>

  </div>
</template>

<script>
import api from "../api";

export default {
  props: ["result"],
  data() {
    return {
      results: [],
      movies: [],
      //movieOk: true,
      slide: 0,
      sliding: null,
      poster: "http://image.tmdb.org/t/p/w185/",
      path: true,
      select: false,
      secondSate: true
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
        console.log(res.data.movie);
        this.results = res.data.movie;
        this.select = true;
        this.secondState = false;
      });
    },

    selectMovie(id) {
      api.selectMovie(id).then(res => {
        console.log(res);
        console.log(res);
        this.movies = res;
        this.select = true;
        this.secondState = true;
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
    this.select = false;

    if (this.$route.name === "mood") {
      this.path = true;

      this.select = true;
      // this.movieOk = false;
    } else this.path = false;
  }
};
</script>

<style>
#btnSeeMore {
  padding: 2rem;
  margin: 2%;
  width: 45vh;
  background-color: rgb(20, 143, 119) !important;
  color: white;
  font-size: 1.6rem;
  border-radius: 50rem;
}

#btnSeeMore:hover {
  padding: 2rem;
  margin: 2%;
  width: 50vh;
  font-size: 2rem;
  background-color: white;
  color: rgb(20, 143, 119);
  border: 4px solid rgb(20, 143, 119);
  border-radius: 50rem;
}
</style>