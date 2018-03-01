<template>
<section>

<div>
<h2 class="has-text-centered">À Taaaaaable!!</h2>
<div>
   <button to="/searchrecipe">Il y a une zouze, j'claque du flooz</button>
</div>
<div>
   <router-link to="/searchfrigo">J'ai les crocs, j'déglingue l'frigo!</router-link>
</div>
</div>


<h2>Enter what you're craving for, we will do the rest:</h2>
<SearchForFood/>
</section>

</template>

<script>
import SearchForFood from '../components/SearchForFood';
import api from "../api";

export default {
    components: { SearchForFood }
};
</script>
