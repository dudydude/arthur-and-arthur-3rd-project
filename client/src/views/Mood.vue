<template>
  <section class="container">

      <b-form id="movieSeach">
        <div class="text-center mb-3">
        <h5>- enter your search -</h5>
        </div>
        <b-form-group class="text-center">
          <b-button @click="search" variant="success">
            <b-form-input class="mt-2 mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe" v-model="query" @submit.prevent.stop="search"></b-form-input>
            <h3 class="pt-2">OK</h3>
          </b-button>
          <b-button @click="searchKeywords" variant="success">
            <multiselect v-model="keywordSearch" :options="options" placeholder="Search by keywords" label="name" track-by="name" class="mt-2 mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInputName2"></multiselect>
            <h3 class="pt-3">OK</h3>
          </b-button>
          <b-button @click="searchGenre" variant="success">
            <multiselect v-model="genreSearch" :options="genre" placeholder="Search by genre" label="name" track-by="name" class="mt-2">
            </multiselect>
            <h3 class="pt-2">OK</h3>
          </b-button>
        </b-form-group>
      </b-form>

    <div>
      <ul>
        <li v-for="result in results">
          <b-card>
            <b-media no-body>
              <b-media-aside vertical-align="center">
                <b-img width="250" height="400" alt="placeholder" :src="`http://image.tmdb.org/t/p/w185//`+ result.poster_path" style="width: 20rem; max-height: 50rem"
                />
              </b-media-aside>
              <b-media-body class="ml-3">
                <h3 class="mt-0">Title : {{result.title}}</h3>
                <p>
                  Synopsis :
                  <br>{{result.overview}}

                </p>

                <b-button variant="primary" :to="`movie/${result.id}`">See more</b-button>

                <div>
                  <b-btn v-b-modal.modal1 @click="selectMovie(result.id)">Choose this movie</b-btn>

                  <!-- Modal Component -->
                  <b-modal id="modal1" title="Step 1">
                    <p class="my-4">Vous avez sélectionnez {{result.title}}</p>
                  </b-modal>
                </div>

              </b-media-body>

            </b-media>
          </b-card>
        </li>
      </ul>
    </div>


  </section>
</template>

<script>
import api from "../api";
import Multiselect from "vue-multiselect";
import dataKeyword from "../../../server/data/keywords_tmdb.json";
import dataGenre from "../../../server/data/genre_tmdb.json";

export default {
  data() {
    return {
      show: false,
      // search: true;
      query: "",
      results: [],
      keywordSearch: "",
      options: dataKeyword,
      genreSearch: "",
      genre: dataGenre,
      modal: false
    };
  },
  components: {
    Multiselect
  },
  methods: {
    search(query) {
      api.search(this.query).then(results => {
        this.results = results;
      });
    },
    searchKeywords(keywordSearch) {
      api.searchKeywords(this.keywordSearch).then(results => {
        this.results = results;
      });
    },
    searchGenre(genreSearch) {
      api.searchGenre(this.genreSearch).then(results => {
        this.results = results;
      });
    },
    selectMovie(id) {
      api.selectMovie(id).then(res => {
        this.modal = true;
        console.log(this.modal);
      });
    },
    computed: {}
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
#movieSeach {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.btn-orange {
  border-radius: 2rem;
  color: white;
  width: 15vh;
  background-color: rgb(20, 143, 119);
  border: 0;
  padding: 10rem;
}
</style>