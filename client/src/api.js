import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export default {
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        return data;
      })
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  },

  loadUser() {
    const userData = localStorage.getItem("user");
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      return user;
    }
    return false;
  },

  // search for movies

  search(query) {
    // use the service. qui remplace l'url
    return service
      .get(`/movie`, {
        params: {
          query
        }
      })
      .then(res => res.data.results)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  searchKeywords(value) {
    return service
      .get(`keyword/${value.id}`)
      .then(res => res.data.results)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  searchGenre(query) {
    return service
      .get(`genre/${query.id}`)
      .then(res => res.data.results)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  getMovie(id) {
    console.log("loose");

    return service
      .get(`movie/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  selectMovie(id) {
    console.log("je suis la");
    return service
      .post(`combo/movie/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      });
  },

  // search for recipes
  searchRecipe(query) {
    return service
      .get(`/recipes/searchAll`, {
        params: {
          query
        }
      })
      .then(res => res.data.results)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  searchByKeyWords(searchKeyWords) {
    return service
      .get(`/recipes/searchbykeywords/${searchKeyWords}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  searchByIngredients(ingredient) {
    return service
      .get(`/recipes/searchbyingredients/${ingredient}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  searchByTitle(searchTitle) {
    return service
      .get(`/recipes/searchbytitle/${searchTitle}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  }
};
