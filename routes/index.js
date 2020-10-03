const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');
const genreObj = require('../config/constants');


const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const axios = require('axios');

const Movie = require('../models/Movie');


router.get('/', (req, res) => {

  let newVar = '';


  var movieAdded = false;
  var userId;


  // set to random year between 1950 - 2019
  var yearOne = Math.floor(Math.random() * (2019 - 1965) + 1965);
  var yearTwo = Math.floor(Math.random() * (2019 - 1965) + 1965);
  var yearThree = Math.floor(Math.random() * (2019 - 1965) + 1965);

  // get random genre out of small selection
  var genreRandomOne = Math.floor(Math.random() * (4 - 0));
  var genreRandomTwo = Math.floor(Math.random() * (4 - 0));
  var genreRandomThree = Math.floor(Math.random() * (4 - 0));

  var genreOne = genreObj.genre["All"][genreRandomOne][0];
  var genreTwo = genreObj.genre["All"][genreRandomTwo][0];
  var genreThree = genreObj.genre["All"][genreRandomThree][0];

  var genreNameOne = genreObj.genre["All"][genreRandomOne][1];
  var genreNameTwo = genreObj.genre["All"][genreRandomTwo][1];
  var genreNameThree = genreObj.genre["All"][genreRandomThree][1];

  console.log(genreNameOne);

  console.log(genreOne);



  console.log(yearOne);


  const requestOne = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  const requestTwo = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2019`);
  const requestThree = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=${yearOne}&with_genres=${genreOne}`);
  const requestFour = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=${yearTwo}&with_genres=${genreTwo}`);
  const requestFive = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=${yearThree}&with_genres=${genreThree}`);
  
  // const requestSix=  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=1994&with_genres=35`);

  if(res.locals.user) {
    userID = res.locals.user['id'];
  }
  else {
    userID = "";
  }

  axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive]).then(axios.spread((...responses) => {
    const responseOne = responses[0];
    const responseTwo = responses[1];
    const responseThree = responses[2];
    const responseFour = responses[3];
    const responseFive = responses[4];

    // console.log("requestOne: *********************" + requestOne);

    popularNow = responseOne.data.results.slice(0,18);
    yearGrossing = responseTwo.data.results.slice(0,18);
    // yearComedy = responseThree.data.results.slice(0,18);
    randomOne = responseThree.data.results.slice(0,18);
    randomTwo = responseFour.data.results.slice(0,18);
    randomThree = responseFive.data.results.slice(0,18);
    
  console.log(popularNow);

    res.render('index', {
          'popularNow': popularNow,
          'yearGrossing' : yearGrossing,
          'randomOne': randomOne,
          'randomTwo': randomTwo,
          'randomThree': randomThree,
          'genreNameOne': genreNameOne,
          'genreNameTwo' : genreNameTwo,
          'genreNameThree' : genreNameThree,
          'yearOne' : yearOne,
          'yearTwo' : yearTwo,
          'yearThree' : yearThree,
          'imageUrl': 'http://image.tmdb.org/t/p/w185/',
          'userID': userID,
          'movieAdded': movieAdded,        
        });
  })).catch(errors => {
    console.log(errors);
  })
});


  module.exports = router;


