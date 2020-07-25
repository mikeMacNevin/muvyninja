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
        console.log(req.body);
        await Movie.create(req.body);
    } catch (err) {
        console.log(err);
        console.error(err);
        res.render('error/500');
    }
})

module.exports = router;