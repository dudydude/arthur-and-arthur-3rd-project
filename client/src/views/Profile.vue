
<template>
<section class="text-center">
<div>
<h2>Salut à toi {{$root.user.username}}</h2>
</div>
<div>
   <router-link to="/food">In mood for some food</router-link>
</div>
<div>
   <router-link to="/mood">Movies that match my mood</router-link>
</div>

   </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      secret: null
    };
  },

  created() {
    api.getSecret().then(secret => {
      this.secret = secret;
    });
  }
};
</script>
