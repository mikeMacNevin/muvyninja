const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const Movie = require('../models/Movie');

const {ensureAuthenticated} = require('../helpers/auth');
router.get('/', ensureAuthenticated, async (req, res) => {
    
    try {
      const favorites = await Movie.find({user: req.user.id})
        .populate(req.user.googleId)
        .lean();
        
      console.log("/favorites - favorites: " + JSON.stringify(favorites));
      
      res.render('favorites', {
        favorites,
      })
    } 
    catch (err) {
      console.log(err);
      console.error(err);
    }
  })


  router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
      let movie = await Movie.findById(req.params.id).lean()
  
      if (!movie) {
        return res.render('error/404')
      }
  
      if (movie.user != req.user.id) {
        res.redirect('/favorites')
      } else {
        await Movie.remove({ _id: req.params.id })
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

module.exports = router;
