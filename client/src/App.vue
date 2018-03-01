<template>
  <div id="app">
    <NavBar/>
    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="text-center">
          <p><strong>Food & Mood Project</strong> by Arthur & Arthur </p>
            <p>- WebDev Project 2018 -</p>
        </div>
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

