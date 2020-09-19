const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const axios = require('axios');

const Movie = require('../models/Movie');


router.get('/', (req, res) => {
  var movieAdded = false;
  var userId;

  const requestOne = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  const requestTwo = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=2019`);
  const requestThree = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=1994&with_genres=35`);
  

  if(res.locals.user) {
    userID = res.locals.user['id'];
  }
  else {
    userID = "";
  }

  axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
    const responseOne = responses[0];
    const responseTwo = responses[1];
    const responseThree = responses[2];

    console.log("requestOne: *********************" + requestOne);

    popularNow = responseOne.data.results.slice(0,18);
    yearGrossing = responseTwo.data.results.slice(0,18);
    yearComedy = responseThree.data.results.slice(0,18);

  console.log(popularNow);
    // console.log(popularNow);

    res.render('index', {
          'popularNow': popularNow,
          'yearGrossing' : yearGrossing,
          'yearComedy': yearComedy,
          'imageUrl': 'http://image.tmdb.org/t/p/w185/',
          'userID': userID,
          'movieAdded': movieAdded,
          'helpers' : {
            year: function () { return ; }
        }
        });
  })).catch(errors => {
    res.render(index);
    console.log(errors);
  })
});


  module.exports = router;


