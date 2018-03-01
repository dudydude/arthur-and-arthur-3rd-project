<template>
<b-navbar toggleable="md" type="light" class="bg-warning text-white" variant="info" id="navBar">
   
  <b-navbar-brand>
    <router-link class="navbar-item" to="/">
      <img src="../../public/images/chatlogo.png" alt="Logo" width="100rem" height="100rem">
    </router-link>
    <div
      class="navbar-nav mr-auto"
      :class="{ 'is-active': isActive }"
      @click="isActive = !isActive"
    >
      <!-- <span></span>
      <span></span>
      <span></span> -->
    </div>
  </b-navbar-brand>

 <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
 <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="block-inline" :class="{ 'is-active': isActive }">
      <b-nav-item>
        <router-link
          class="navbar-item" to="/about"
          @click.native="isActive = false"
        >
          About
        </router-link>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item> 
          <div v-if="!$root.user">
            <b-nav-item>
              <router-link
                class="navbar-item" to="/login"
                @click.native="isActive = false"
              >
                Login
              </router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link
                class="navbar-item" to="/signup"
                @click.native="isActive = false"
              >
                Signup
              </router-link>
            </b-nav-item>
          </div>
          <div v-else>
              <router-link class="navbar-item" to="/profile" @click.native="isActive = false" >
                  <b-nav-item>
                      Hi {{ $root.user.username }}
                  </b-nav-item>
              </router-link>

            <b-nav-item>
              <a class="navbar-item" @click="logout">
                Logout
              </a>
            </b-nav-item>
          </div>
      </b-nav-item>
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
