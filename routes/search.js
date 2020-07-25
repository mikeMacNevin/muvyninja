const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const request = require('request');
const genreObj = require('../config/constants');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


const axios = require('axios');

const Movie = require('../models/Movie');

router.get('/', (req, res) => {
      res.render('search');
    });
    
router.post('/film', (req, res) => {
    // post variables
    let movieRes = '';      
    let movieTitle = req.body.movieTitle;
    let minYear = `&primary_release_date.gte=${req.body.minYear}-01-01`;
    let maxYear = `&primary_release_date.lte=${req.body.maxYear}-12-31`;
    // let theGenre = genre[req.body.genre];

    let genre = `&with_genres=${genreObj.genre[req.body.genre]}`;
    console.log(minYear);
    console.log(maxYear);
    console.log(genre);

    if (movieTitle.length < 1) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1${minYear}${maxYear}${genre}`;
        axios.get(url)
        .then(response => {
            let movieRes = response.data.results;
            var id =  JSON.stringify(movieRes[0].id);
            console.log(movieRes);
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=52355b2a478c82d6bfe5a57afff6c916
            `).then(response => {
                let cast = response.data.cast.slice(0,4);
        
                console.log("cast - 5: " + JSON.stringify(cast));
                console.log("cast - 5: " + JSON.stringify(cast));

                res.render('search', {
                    'movies' : movieRes.slice(1,19),
                    'firstMovie' : movieRes[0],
                    'cast' : cast
                });
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            console.log(e);
        });
    }
    else if (movieTitle.length > 0) {
    console.log("movieTitle: " + req.body.movieTitle);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&query=${movieTitle}&page=1&include_adult=false`;
    
    axios.get(url)
        .then(response => {
            // console.log(response.data.results);
            let movieRes = response.data.results;
            console.log(JSON.stringify(movieRes[0]));

            res.render('search', {
                'movies' : movieRes.slice(1,7),
                'firstMovie' : movieRes[0]
            });
        }).catch(e => {
            console.log(e)
        });
    }
    //post response movie  
});

// router.post('/movies', ensureAuthenticated, async (req, res) => {
//     try {
//         req.body.user = req.user.id;

//         await Movie.create(req.body);
//     } catch (err) {
//         console.error(err);
//         res.render('error/500');
//     }
// })

module.exports = router;


    // request(url, function (error, response, body) {
    // movieRes = JSON.parse(body);
    // console.log('movieRes: ' + movieRes);
    // console.log('first original_title: ' + movieRes.results[0].original_title);
    