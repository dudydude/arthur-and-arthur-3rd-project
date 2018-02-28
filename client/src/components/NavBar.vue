<template>
<nav class="navbar">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="../../public/FoodndMoond.jpg" alt="Food & Mood: coz Netflix 'nd Chill is out of date" width="112" height="28">
    </router-link>
    <div
      class="navbar-burger burger"
      :class="{ 'is-active': isActive }"
      @click="isActive = !isActive"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div class="navbar-menu" :class="{ 'is-active': isActive }">
    <div class="navbar-start">
      <router-link
        class="navbar-item" to="/about"
        @click.native="isActive = false"
      >
        About
      </router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped" v-if="!$root.user">
          <p class="control">
            <router-link
              class="navbar-item" to="/login"
              @click.native="isActive = false"
            >
              Login
            </router-link>
          </p>
          <p class="control">
            <router-link
              class="navbar-item" to="/signup"
              @click.native="isActive = false"
            >
              Signup
            </router-link>
          </p>
        </div>
        <div class="field is-grouped" v-else>
            <router-link class="navbar-item" to="/profile" @click.native="isActive = false" >
                <p class="control">
                    Hi {{ $root.user.username }}
                </p>
            </router-link>

          <p class="control">
            <a class="navbar-item" @click="logout">
              Logout
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    logout() {
      api.logout();
      this.$root.user = null;
      this.$router.push('/login');
    },
  },
};
</script>
