<template>
  <section>
    <div>
      <div>
        <b-button @click="showModal">
          <h2> See more </H2>
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
                        <ul v-if="kg" class="text-center">
                          <li v-for="ingredient in result.ingredients">{{ingredient}}</li>
                        </ul>
                        <ul v-if="!kg" class="text-center">
                          <li v-for="ingredient in result.ingredientsUSA">{{ingredient}}</li>
                        </ul>
                        <div class="text-center my-3">
                          <b-button v-if="btnShow" @click="kg=false ; btnShow=false" variant="warning btn-sm">Switch to oz</b-button>
                          <b-button v-if="!btnShow" @click="kg=true ; btnShow=true" variant="primary btn-sm">Switch to kg</b-button>
                        </div>
                      </div>
                      <p class="text-justify mx-5">
                        {{result.method}}
                      </p>

                      <b-button variant="primary " @click="selectRecipe(result.title)">I like it food! </b-button>

                    </b-media-body>
                  </b-media>
                </b-card>

                <div v-show="">
                </div>
              </div>





            </div>

          </div>

          <div>

          </div>


          <b-button variant="primary " block @click="selectMovie(result.id) " v-if="path == true">I like it!</b-button>

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
        select: false,
        secondSate: false
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
          this.secondState = true;
        });
      },

      selectMovie(id) {
        api.selectMovie(id).then(res => {
          console.log(res);
          console.log(res);
          this.results = res;
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
      this.secondSate = false;
      this.select = false;

      if (this.$route.name === "mood") {
        this.path = true;
        api.selectMovie(id).then(res => {
          console.log(res);
          console.log(res);
          this.results = res;
          this.select = true;
          // this.movieOk = false;
        });
      } else this.path = false;
    }
  };
</script>

<style>
</style>