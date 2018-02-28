<template>
    <section>
<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" v-model="query" @keyup.enter="search">
  </div>
</div>

<div>
    <ul>
        <li v-for="result in results">{{result.title}}</li>
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