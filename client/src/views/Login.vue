<template>
  <section>
    <b-notification type="is-danger" has-icon v-if="error">
      {{ error.error }}
    </b-notification>
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
      <button class="button is-primary">Login</button>
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
