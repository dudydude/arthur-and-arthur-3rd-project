<template>
    <section>
<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" v-model="query">
  </div>
  <button @click="search"> Search </button>
</div>
<div class="field">
  <label class="label">Keywords</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" v-model="queryKeywords">
  </div>
  <button @click="searchKeywords"> Search </button>
</div>

<div>
    <ul>
        <li v-for="result in results">
            <h2>{{result.title}}</h2>
            <router-link :to="`/movie/${result.id}`"> check the page</router-link>
        </li>
    </ul>
</div>
</section>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      query: '',
      results: [],
      queryKeywords:''
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
    },
  },
    
  computed: {},
  
};


</script>