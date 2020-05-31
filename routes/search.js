const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const request = require('request');



router.get('/', (req, res) => {
      res.render('search');
    });
    
router.post('/film', (req, res) => {
    let movieRes = '';  

    let movie = '';
    movie = req.body.movieTitle;

    //post response movie  
    const url = `https://api.themoviedb.org/3/search/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&query=${movie}&page=1&include_adult=false`;
    
    request(url, function (error, response, body) {
    movieRes = JSON.parse(body);
    console.log('movieRes: ' + movieRes);
    console.log('first original_title: ' + movieRes.results[0].original_title);
    
    res.render('search', {
        'movies' : movieRes.results.slice(1,7),
        'firstMovie' : movieRes.results[0]
    })
    });
});

module.exports = router;