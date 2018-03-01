<template>
    <section>
<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" v-model="query">
  </div>
  <button @click="search"> Search </button>
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
    };
  },

  methods: {
    search(query) {
      api.search(this.query).then(results => {
        this.results = results;
      });
    },
  },
    
  computed: {},
  
};


</script>