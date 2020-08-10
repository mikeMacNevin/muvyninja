const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const axios = require('axios');

const Movie = require('../models/Movie');


router.get('/', (req, res) => {
  const requestOne = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  const requestTwo = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=2019`);
  const requestThree = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3`);
  let userID = res.locals.user['id'];

  axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
    const responseOne = responses[0];
    const responseTwo = responses[1];
    const responesThree = responses[2];

    popularNow = responseOne.data.results.slice(0,18);
    yearGrossing = responseTwo.data.results.slice(0,18);

  res.render('browse', {
          'popularNow': popularNow,
          'yearGrossing' : yearGrossing,
          'imageUrl': 'http://image.tmdb.org/t/p/w185/',
          'userID': userID
        });
  })).catch(errors => {
    console.log(errors);
  })

});
  module.exports = router;