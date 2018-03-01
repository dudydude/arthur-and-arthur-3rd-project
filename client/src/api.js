import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

const movieFind = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

// const movieFind = axios.create({
//   baseURL: "https://api.themoviedb.org/3/"
// });

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
    return movieFind
      .get(
        `/search/movie?api_key=f04b2a25baed952b84af0eb4623bbc55&query=${query}`
      )
      .then(res => res.data.results)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  getMovie(id) {
    return movieFind
      .get(
        `/movie/${id}?api_key=f04b2a25baed952b84af0eb4623bbc55&callback=test`
      )
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  }
};

// search for movies
