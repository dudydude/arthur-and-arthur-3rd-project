Vue.component("RecipeCard", {
  props: {
    movie: Object
  },
  template: `
  <div>
	  	<section v-for="recipe in recipes">
		    <h5> {{recipe.title}} </h5>
		    <p> {{recipe.indication}} </p>
		    <p> {{recipe.ingredients}} </p>
		    <p> {{recipe.method}} </p>
		    <img :src="recipe.url" alt="foodPic" height="500px">
      </section>
      </div>
  `
});

Vue.component("Recipes", {
  template: `
  <div>
	  	<section v-for="recipe in recipes">
		    <h5> {{recipe.title}} </h5>
		    <p> {{recipe.indication}} </p>
		    <p> {{recipe.ingredients}} </p>
		    <p> {{recipe.method}} </p>
		    <img :src="recipe.url" alt="foodPic" height="500px">
      </section>
      </div>
  `,
  data() {
    return {
      recipes: []
    };
  },
  created() {
    api.getAll().then(recipes => {
      this.recipes = recipes;
    });
  }
});

Vue.component("Home", {
  template: `
	  	<section>
      <h1>Welcome to the Ironmovie library</h1>
      <p>
        <router-link to="/movies">Go to the full list of movie</router-link>
      </p>
      <p>
        <router-link to="/movies/:id">Search for a movie</router-link>
      </p> 
      <p>
      <router-link to="/addOne">Add a movie</router-link>
      </p> 
      <p>
      <router-link to="/deleteOne">Delete a movie</router-link>
      </p> 
      <p>
      <router-link to="/editOne">Edit a movie</router-link>
      </p> 
      </section>
	`
});

const MovieForm = {
  props: {
    defaultValues: Object
  },
  template: `
	<form @submit.prevent="submit()">
		<input v-model="movie.title" placeholder="Title"> <br>
		<input v-model="movie.year" placeholder="Year"> <br>
		<input v-model="movie.director" placeholder="Director"> <br>
		<input v-model="movie.synopsis" placeholder="Synopsis"> <br>
		<input v-model="movie.poster" placeholder="Poster URL"> <br>
		<input type="submit">
	</form>
	`,
  data() {
    return {
      movie: {}
    };
  },
  mounted() {
    this.populateForm();
  },
  methods: {
    populateForm() {
      this.movie = Object.assign({}, this.defaultValues || {});
    },
    movieCopy() {
      return Object.assign({}, this.movie);
    },
    submit() {
      this.$emit("submit", this.movieCopy());
    }
  }
};
