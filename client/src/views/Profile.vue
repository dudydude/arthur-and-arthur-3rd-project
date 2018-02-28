
<template>
<section>
<div
<h2>salut</h2>
</div>
<div>
   <router-link to="/food">In mood for food</router-link>
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
