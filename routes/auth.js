const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirected: '/'}
), (req, res) => {
    console.log("google/auth: req.protocol: ");
    res.redirect('/favorites');
});

// router.get('/verify', (req, res) => {
//     if(req.user) {
//         console.log(req.user);
//     } else {
//         console.log('Not Auth');
//     }
// });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;