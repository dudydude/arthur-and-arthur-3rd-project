<template>
<section>

<div class="text-center">
<h2 class="has-text-centered">À Taaaaaable!!</h2>
<div class="m-2">
   <b-button @click="show = true" variant="warning">Il y a une zouze, j'claque du flooz</b-button>
</div>
<div class="m-2">
   <b-button @click="otherShow = true" variant="primary" to="/searchfrigo">J'ai les crocs, j'déglingue l'frigo!</b-button>
</div>
</div>

<div v-if="show" v-elseif="otherShow">
<SearchForFood class="m-5"/>
</div>
</section>

</template>

<script>
import SearchForFood from "../components/SearchForFood";
import api from "../api";

export default {
  data() {
    return {
      show: false,
      otherShow: false
    };
  },
  components: { SearchForFood }
};
</script>
