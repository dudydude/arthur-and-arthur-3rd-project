<template>
  <b-navbar toggleable="md" id="navBar">
    <b-navbar-brand class="btn-orangelogo" variant="outline">
      <router-link to="/">
        <h3 class="text-white">
          <img src="../../public/images/chatlogo.png" alt="Logo" id="logoNavBar" class="btn-orangelogo d-inline-block align-center">DCM
        </h3>
      </router-link>
      <div class="navbar-nav mr-auto" :class="{ 'is-active': isActive }" @click="isActive = !isActive" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="block-inline d-flex flex-row-reverse" :class="{ 'is-active': isActive }"></b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <div v-if="!$root.user">
          <b-nav-item>
            <b-button id="btnLogin" class="btn-orange" to="/login" @click.native="isActive = false" variant="outline-primary outline-secondary">
              <h6>Login</h6>
            </b-button>
            <b-button id="btnSignup" class="btn-orange" to="/signup" @click.native="isActive = false" variant="outline-primary outline-secondary">
              <h6>Signup</h6>
            </b-button>
          </b-nav-item>
        </div>

        <div v-else>
          <b-nav-item>

            <b-dropdown id="dropDown" text="Play Games" variant="utline-primary outline-secondary" class="btn-orange text-white transparent">
              <b-dropdown-item class="">Zloutch</b-dropdown-item>
              <b-dropdown-item class="">Country Guessing Game</b-dropdown-item>
              <b-dropdown-item class="">Pierre Lenoir and Friends</b-dropdown-item>
            </b-dropdown>

            <b-button id="btnProfile" class="btn-orange" to="/profile" @click.native="isActive = false" variant="outline-primary outline-secondary">
              <h6>Profile</h6>
            </b-button>

            <b-button id="btnCreaCombo" class="btn-orange" to="/createcombo" @click.native="isActive = false" variant="outline-primary outline-secondary">
              <h6>Create new combo</h6>
            </b-button>

            <b-button id="btnLogout" @click="logout" variant="outline-primary outline-secondary" class="btn-orange">
              <h6>Logout</h6>
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
.btn-orangelogo {
  border-radius: 2rem;
  border: transparent;
  color: white;
  background-color: rgb(255, 127, 19);
  border: 0;
}

.dropdown-menu.show {
  background-color: transparent !important;
}

.btn-outline-primary {
  border: transparent !important;
  color: white;
}
#btnLogin,
#btnSignup,
#dropDown,
#btnLogout,
#btnCreaCombo,
#dropDown,
#btnProfile {
  border: transparent !important;
  color: white;
  background-color: rgb(255, 127, 19);
  border-radius: 2rem;
}

#btnLogin:hover,
#btnSignup:hover,
#dropDown:hover,
#btnLogout:hover,
#btnCreaCombo:hover,
#dropDown:hover,
#btnProfile:hover {
  border: transparent !important;
  color: rgb(255, 127, 19);
  background-color: white;
  border: 0;
}

#logoNavBar {
  max-height: 3.5em;
}

#navBar {
  background-color: rgb(255, 127, 19) !important;
}

.navbar-brand {
  margin: 0;
}

#navBar {
  border: solid 5px white;
  border-radius: 2rem;
}
</style>