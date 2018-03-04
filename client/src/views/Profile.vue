
<template>
<section class="text-center">
<div>
<h2>Salut à toi {{$root.user.username}}</h2>
</div>
<div>
  <b-button variant="primary" class="m-3 btn-lg" to="/food">In mood for some food</b-button>
</div>
<div>
  <b-button variant="warning" class="m-3 btn-lg" to="/mood">Movies that match my mood</b-button>
</div>
<div class="m-5 px-5">
<hr>
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
