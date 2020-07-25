const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const request = require('request');

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const Movie = require("../models/Movie");

router.get('/', (req, res) => {
    const title = 'seefilm';
    res.render('index/index');
});


// router.get('/favorites', ensureAuthenticated, async (req, res) => {
//   var currentUser = req.user.firstName;
//   console.log("currentUser: " + currentUser);
  

//   try {
//     const movies = await Movie.find({ user: req.user.id}).lean();
//     res.render('index/favorites', {
//       currentUser: currentUser
//     });
  
//   }
//   catch(err) {
//     console.error(err);
//     res.rendor('error/500');
//   }
// });

module.exports = router;