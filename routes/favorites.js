const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const Movie = require('../models/Movie');

const {ensureAuthenticated} = require('../helpers/auth');
router.get('/', ensureAuthenticated, async (req, res) => {
    console.log("/favorites: req.user " + req.user + "end /favorites req.user");
    try {
      const favorites = await Movie.find({user: req.user.id})
        .populate(req.user.googleId)
        .lean();
      console.log("/favorites - favorites: " + favorites);
      res.render('favorites', {
        favorites,
      })
    } catch (err) {
      console.log(err);
      console.error(err);
      res.render('error/500')
    }
  })

module.exports = router;
