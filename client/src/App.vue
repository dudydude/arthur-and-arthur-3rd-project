<template>
  <div id="app">
    <NavBar/>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <div class="text-center text-white">
        <br>
        <h5>Movie, Dine & Chill</h5>
        <h6>made with ❤️ by Arthur & Arthur</h6>
        <p>- WebDev Final Project 2018 -</p>
        <br>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

import api from "./api";

export default {
  components: { NavBar },

  created() {
    const user = api.loadUser();
    if (user) this.$root.user = user;
  }
};
</script>

<style>
html {
  min-height: 100vh;
}

.footer {
  background-color: rgb(255, 127, 19);
  width: 100vw;
}

h6 {
  margin: 0;
  padding: 0;
}
</style>