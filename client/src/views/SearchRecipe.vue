<template>
<section>
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
