<template>
  <div class="mt-5 container">
    <div>
    <b-form @submit.prevent="signup">
      <b-form-group label="Email address:"
                    description="We'll never share your email with anyone else.">
      <b-form-input type="email"
                    v-model="email"
                    required
                    placeholder="Enter email">
      </b-form-input>
      </b-form-group>

      <b-form-group label="Your name:">
      <b-form-input maxlength="30"
                    :type="usernameError && 'danger'"
                    :message="usernameError"
                    v-model="username" 
                    placeholder="Enter username" 
                    required 
                    icon="account">
      </b-form-input>
      </b-form-group>

      <b-form-group label="Password">
          <b-form-input type="password"
            required
            v-model="password" 
            icon="lock"
            password-reveal placeholder="Enter password">
          </b-form-input>
      </b-form-group>
      <div class="text-center"><b-button  type="submit" variant="primary">Signup</b-button></div>
    </b-form>
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",

      error: null
    };
  },
  methods: {
    signup() {
      this.error = null;
      api
        .signup({
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },

  computed: {
    usernameError() {
      if (!this.error) return null;
      if (this.error.email === "UserExistsError") {
        return this.error.message;
      }
    }
  }
};
</script>

