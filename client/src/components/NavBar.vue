<template>
  <b-navbar toggleable="md" type="dark" class="bg-light" id="navBar">
    <b-navbar-brand>
      <b-button class="btn-orange" href="/">
        <h3 class="text-white">
          <img src="../../public/images/chatlogo.png" alt="Logo" id="logoNavBar" class="d-inline-block align-center">MDC
        </h3>
      </b-button>
      <div class="navbar-nav mr-auto" :class="{ 'is-active': isActive }" @click="isActive = !isActive" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="block-inline d-flex flex-row-reverse" :class="{ 'is-active': isActive }"></b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <div v-if="!$root.user">
          <b-nav-item>
            <b-button class="btn-orange" to="/login" @click.native="isActive = false" variant="outline-primary">
              Login
            </b-button>
            <b-button class="btn-orange" to="/signup" @click.native="isActive = false" variant="outline-primary">
              Signup
            </b-button>
          </b-nav-item>
        </div>

        <div v-else>
          <b-nav-item>
            <b-button class="btn-orange" to="/createcombo" @click.native="isActive = false" variant="outline-primary">
              Create new combo
            </b-button>

            <b-dropdown text="Play Games" variant="outline-primary" class="btn-orange text-white transparent">
              <b-dropdown-item class="">Zloutch</b-dropdown-item>
              <b-dropdown-item class="">Country Guessing Game</b-dropdown-item>
              <b-dropdown-item class="">Pierre Lenoir and Friends</b-dropdown-item>
            </b-dropdown>

            <b-button @click="logout" variant="outline-primary" class="btn-orange">
              Logout
            </b-button>
          </b-nav-item>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      isActive: false
    };
  },

  methods: {
    logout() {
      api.logout();
      this.$root.user = null;
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.btn-orange {
  border-radius: 2rem;
  color: white;
  background-color: rgb(255, 127, 19);
  border: 0;
}

.dropdown-menu.show {
  background-color: transparent !important;
}

.btn.btn-outline-primary.dropdown-toggle {
  border: transparent !important;
  color: white;
}

#logoNavBar {
  max-height: 3.5em;
}

.bg-light,
.navbar-light {
  background-color: rgb(255, 127, 19) !important;
}

.navbar-brand {
  margin: 0;
}
</style>