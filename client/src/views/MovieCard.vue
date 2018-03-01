<template>
    <div>
        <pre>{{movie}}</pre>
        <p> hello </p>
    </div>
</template>


<script>

import api from '../api';


export default {
    data() {
        return {
            movie: null,
        };
    },  
    created(){
        api.getMovie(this.$route.params.id).then(movie => {
            this.movie = movie;
            console.log(this.movie)
        });
    }
}

</script>