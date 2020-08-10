const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const Movie = require("../models/Movie.js");

router.get('/', (req, res) => {

});

router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        req.body.user = req.user.id;
        console.log(JSON.stringify(req.body));
        await Movie.create(req.body);

        res.redirect('favorites');
    } catch (err) {        
       console.error(err);
        // console.log("**M** err.errors.title: \n " + err.errors.title);
        // console.log("**M** err.errors.title.kind: \n " + err.errors.title.kind);
        // if (err.errors.title.kind.localeCompare("unique") == 0 ) {
            // console.log("** M ** this movie already exists");

            // // console.log('** M **' + JSON.stringify(req.params));
            // // console.log('** M **---' + Object.keys(req.body));

            // // console.log('** M **' + Object.keys(req.baseUrl));

            // // console.log('** M **' + Object.keys(req.headers));
            // console.log(Object.keys(res));
            // console.log(Object.keys(res.locals));
            // console.log(res.locals.user.displayName + " already added this favorite");

        //     res.locals.alreadyAdded = true;


        //     res.render('browse');
        // }
    }
})

router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
      let movie = await Movie.findById(req.params.id).populate('user').lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      res.render('favorites', {
        movie
      })
    } catch (err) {
      console.error(err)
      res.render('error/404')
    }
})

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
      let movie = await Movie.findById(req.params.id).lean()
  
      if (!movie) {
        return res.render('error/404')
      }

        await Movie.remove({ _id: req.params.id })
        res.redirect('/favorites')
      
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

module.exports = router;