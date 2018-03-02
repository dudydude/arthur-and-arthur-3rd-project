<template>
  <section class="container">
    <div class="text-center" v-if="search">
      <h1> What are looking for ? </h1>
      <div v-if="!show">
        <b-button>Inspiration ? </b-button>
        <b-button @click="show=true">A specific movie ?</b-button>
      </div>
    </div>
    <div v-if="show">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" v-model="query">
        </div>
        <b-button @click="search"> Search </b-button>
      </div>
      <div class="field">
        <label class="label">Keywords</label>
        <div class="control">
          <input id="input" class="form-control" type="text" placeholder="Type to search...">
        </div>
        <b-button @click="searchKeywords"> Search </b-button>
      </div>
      <div class="field">
        <label class="label">Keywords</label>
        <div class="control">
          <input id="input" class="form-control" type="text" placeholder="Type to search...">
        </div>
        <b-button @click="searchKeywords"> Search </b-button>
      </div>
    </div>


    <div>
      <ul>
        <b-card-group deck class="mb-3">
          <li v-for="result in results">

            <div>
              <b-card :title="result.title" :img-src="`http://image.tmdb.org/t/p/w185//`+ result.poster_path" img-alt="Image" img-top tag="article"
                style="max-width: 20rem;" class="mb-2">
                <p class="card-text">
                  {{result.overview}}
                </p>
                <b-button href="#" variant="primary">
                  <router-link :to="`/movie/${result.id}`"> check the page</router-link>
                </b-button>
              </b-card>
            </div>

          </li>
        </b-card-group>
      </ul>
    </div>

  </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      show: false,
      // search: true;
      query: "",
      results: [],
      queryKeywords: ""
    };
  },

  methods: {
    search(query) {
      api.search(this.query).then(results => {
        this.results = results;
      });
    },
    searchKeywords(query) {
      api.searchKeywords(this.query).then(results => {
        this.results = results;
      });
    }
  },

  computed: {}
};
</script>