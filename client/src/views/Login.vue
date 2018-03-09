<template>
  <section class="mt-5 container">
    <b-alert show variant="danger" has-icon v-if="error">
      {{ error.error }}
    </b-alert>
    <b-form @submit.prevent="login">
      <b-form-group
        label="Username"
      >
          <b-form-input maxlength="30" v-model="username" required icon="account"></b-form-input>
      </b-form-group>

      <b-form-group label="Password">
          <b-form-input type="password"
            required
            v-model="password" 
            icon="lock"
            password-reveal>
          </b-form-input>
      </b-form-group>
      <div class="text-center">
      <b-button type="submit" variant="primary" class="btn-test">Login</b-button>
      </div>
    </b-form>
  </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      username: "",
      password: "",

      error: null
    };
  },
  methods: {
    login() {
      this.error = null;
      api
        .login(this.username, this.password)
        .then(user => {
          this.$root.user = user;
          this.$router.push("/profile");
        })
        .catch(err => {
          this.error = err;
        });
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

section {
  min-height: 80vh;
}
</style>

