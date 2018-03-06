<template>
  <section class="container">


    <div>
      <b-form inline>
        <div class="field">
          <label class="sr-only" for="inlineFormInputName2">Name</label>

          <b-input class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe" v-model="query" @submit.prevent.stop="search" />

          <b-button @click="search"> OK </b-button>
        </div>
        <div class="field">

          <multiselect v-model="keywordSearch" :options="options" placeholder="Search by keywords" label="name" track-by="name" class="mb-2 mr-sm-2 mb-sm-0"
            id="inlineFormInputName2"></multiselect>
          <b-button @click="searchKeywords"> OK </b-button>
        </div>

        <div class="field">

          <multiselect v-model="genreSearch" :options="genre" placeholder="Search by genre" label="name" track-by="name">
          </multiselect>
          <b-button @click="searchGenre"> OK </b-button>
        </div>


      </b-form>
    </div>

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
.field {
  display: flex;
  flex-direction: row;
}
</style>