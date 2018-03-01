import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Food from "./views/Food.vue";
import Mood from "./views/Mood.vue";
import Recipe from "./views/SearchRecipe.vue";
import MovieCard from "./views/MovieCard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/mood",
      component: Mood
    },
    {
      path: "/food",
      component: Food
    },
    {
      path: "/searchrecipe",
      component: Recipe
    },
    {
      path: "/searchfrigo",
      component: Food
    },
    {
      path: "/movie/:id",
      component: MovieCard
    }
  ]
});
