var express = require("express");
var router = express.Router();
var axios = require("axios");

const movieFind = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f04b2a25baed952b84af0eb4623bbc55",
    inlude_adult: false
  }
});

// call api for a list of movies by keyword

router.get("/:id", function(req, res, next) {
  movieFind
    .get(`keyword/${req.params.id}/movies`)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
