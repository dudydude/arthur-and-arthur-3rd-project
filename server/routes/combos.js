var express = require("express");
var router = express.Router();
var axios = require("axios");
var Combo = require("../models/combo");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

// add a movie to a combo
router.post(
  "/movie/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res) {
    const newCombo = {
      creator: req.user.id,
      movie: req.params.id
    };

    Combo.create(newCombo).then(combo => {
      res.json(combo);
    });
  }
);

// when adding a movie to the combo, the program will search a dish and add it to the combo

router.get("/movie/:id", function(req, res) {});

// add a dish to the combo

router.post(
  "/dish/:id",
  passport.authenticate("jwt", config.jwtSession),
  function(req, res) {
    Combo.create({
      creator: req.user.id,
      dish: req.params.id
    }).then(combo => {
      res.json(combo);
    });
  }
);

//

module.exports = router;
