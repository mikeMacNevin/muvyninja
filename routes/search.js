const express = require('express');
const router = express.Router();
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
    // console.log(req.body);
    // post variables

    let movieRes = '';      
    movieRes = JSON.stringify(req.body);
    let movieTitle = req.body.movieTitle;

    console.log("movieTitle: " + movieTitle);

    // console.log("req.body: " + JSON.stringify(req.body));
    let minYear = '';
    let maxYear = '';
    if (req.body.minYear) {
        minYear = `&primary_release_date.gte=${req.body.minYear}-01-01`;
    }
    if (req.body.maxYear) {
        maxYear = `&primary_release_date.lte=${req.body.maxYear}-12-31`;
    }
    // let theGenre = genre[req.body.genre];
    let genre = '';
    if (req.body.genre) {
        genre = `&with_genres=${genreObj.genre[req.body.genre]}`;
    }
    console.log(minYear);
    console.log(maxYear);
    console.log(genre);

    if (movieTitle.length < 1) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1${minYear}${maxYear}${genre}`;
        console.log(url);
        axios.get(url)
        .then(response => {
            let movieRes = response.data.results;
            var id =  JSON.stringify(movieRes[0].id);
            axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=52355b2a478c82d6bfe5a57afff6c916
            `).then(response => {


                let cast = response.data.cast.slice(0,4);
        
                // console.log("cast - 5: " + JSON.stringify(cast));
                // console.log("first movie: " + JSON.stringify(movieRes[0]));
                console.log("first movie year: " + movieRes[0].release_date.slice(0,4));
                let year = movieRes[0].release_date.slice(0,4);
                res.render('search', {
                    'movies' : movieRes.slice(1,19),
                    'year': year,
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
        // let requestOne = axios.get(``);
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&query=${movieTitle}&page=1&include_adult=false`, {
        }).then(function(response) {
            let requestOne = response.data.results;
            console.log("requestOne: " + JSON.stringify(requestOne));
            if (requestOne.length < 1) {
                res.render('search');
            } else {

            let movieId = requestOne[0].id;
            // let movieId = response.data.results[0].movie_id;
            // console.log("movieId: " + movieId);
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=52355b2a478c82d6bfe5a57afff6c916`, {
            }).then(function(response) {
            let requestTwo = response.data;

                // console.log(requestTwo);
            let cast = requestTwo.cast;
            let crew = requestTwo.crew;
            let directors = [];
            let producers = [];
            crew.forEach(e => {
                if (e.job == "Director") {
                    console.log(e);
                    directors.push(e);
                }
            });
            crew.forEach(e => {
                if (e.job == "Producer") {
                    console.log(e);
                    producers.push(e);
                }
            });
        
            let year = requestOne[0].release_date.slice(0,4);
            res.render('search', {
                'movies' : requestOne,
                'firstMovie' : requestOne[0],
                'year': year,
                'cast' : cast.slice(0,8),
                'directors' : directors,
                'producers' : producers,
                });      
            }).catch(e => {
                console.log(e)
                }) 
            }
        }).catch(e => {
        console.log(e);
            
        }) 
    
    }
}); 

module.exports = router;

    // const requestOne = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
    // const requestTwo = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBkey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&year=2019`);
//     axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        
//         let respTwo = [""];
        
//         let respOne = responses[0].data.results;
//         respTwo = responses[1].data;
    
//         console.log("responseOne " + JSON.stringify(respOne[0]));
//         // console.log("respTwo: " + JSON.stringify(respTwo.cast));
//         console.log("respTwo: " + JSON.stringify(respTwo.crew));
       
      
//     }
// });



