const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const request = require('request');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const axios = require('axios');

const Movie = require('../models/Movie');


router.get('/', (req, res) => {

  console.log("res: " + JSON.stringify(res.locals.user['id']));

  let userID = res.locals.user['id'];
  const requestOne = axios.get( 'https://api.themoviedb.org/3/discover/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
  const requestTwo = axios.get( 'https://api.themoviedb.org/3/discover/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2');
  const requestThree = axios.get( 'https://api.themoviedb.org/3/discover/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3');

  axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
    const responseOne = responses[0];
    const responseTwo = responses[1];
    const responesThree = responses[2];

    movieRes = responseOne.data.results;

 

    // TEST
    // movieResTest = JSON.stringify(responseOne.data);
    movieResTest = responseOne.data.results;

    res.render('browse', {
            'movies': movieRes,
            'imageUrl': 'http://image.tmdb.org/t/p/w185/',
            'userID': userID
          });
  })).catch(errors => {
    
  })
//   router.post('/movies', ensureAuthenticated, async (req, res) => {
//     try {
//         req.body.user = req.user.id;
        
//         await Movie.create(req.body);
//     } catch (err) {
//         console.error(err);
//         res.render('/error/500');
//     }
// })


   
  });
  module.exports = router;
