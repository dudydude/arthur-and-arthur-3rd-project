import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Recipe from "./views/Recipe.vue";
import Mood from "./views/Mood.vue";
import MovieCard from "./views/MovieCard.vue";
import MoodList from "./views/MoodList.vue";
import ComboCreator from "./views/ComboCreator.vue";

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
      component: Mood,
      name: "mood"
    },
    {
      path: "/recipes",
      component: Recipe
    },
    {
      path: "/movie/:id",
      component: MovieCard
    },
    {
      path: "/moodlist",
      component: MoodList
    },
    {
      path: "/createcombo",
      component: ComboCreator
    }
  ]
});
