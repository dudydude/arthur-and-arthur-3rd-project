<template>

  <section class="text-center container">
    <div>
      <h2>Salut à toi {{$root.user.username}}</h2>
    </div>

    <h3 class="m-2 mt-5">How to use the app</h3>
    <p class="text-justify mx-5 my-2">Nulla at libero scelerisque, placerat leo eget, mattis arcu. Mauris quis dui et tellus sagittis bibendum vel eu lorem.
      Integer eget aliquam odio. In aliquet vehicula condimentum. Sed sodales leo sit amet diam rutrum, ac ultrices nisl
      fermentum. Pellentesque at ultrices tellus. Suspendisse sed sodales nisi. Suspendisse sagittis fringilla quam, non
      suscipit lectus tincidunt suscipit. Nam quam mauris, placerat et odio vitae, faucibus congue est. Integer vestibulum
      lectus sit amet imperdiet molestie. Fusce nec posuere odio, et venenatis risus. Integer egestas nibh ac leo dignissim
      vehicula. Pellentesque nibh dolor, feugiat at faucibus non, consequat vitae massa. Sed vestibulum vitae erat at maximus.
      Phasellus cursus orci sed dapibus blandit. Phasellus et risus dolor.</p>
    <hr class="m-3">

    <div id="food" class="tuto-container">

      <p> Je cherche d'abord un plat et je vous laisse me surprendre avec un film </p>
      <br>
      <router-link class="button-profile" to="/recipes">In mood for some food</router-link>
    </div>
    <div id="mood" class="tuto-container">
      <p> Je cherche d'abord un plat et je vous laisse me surprendre avec un film </p>
      <br>

      <router-link class="button-profile" to="/mood">Movies that match my mood</router-link>
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