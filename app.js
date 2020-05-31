const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const request = require('request');

// Models
require('./models/User');
// Config
require('./config/passport')(passport);
// Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const browse = require('./routes/browse');
const search = require('./routes/search');
// Load Keys
const keys = require('./config/keys');
// Express
const app = express();
// Session
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
//Passport
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})
// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Handlebars
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Use Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

// Use Routes
app.use('/', index);

app.use('/auth', auth);
app.use('/browse', browse);

// CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
app.use('/search', search);

const port = 4000;

app.listen(process.env.PORT || port, () =>{
  console.log(`Mike: Server started on port ${port}`);
});


// app.get('/search', (req, res) => {
//   res.render('search');
// });

// CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

// app.post('/search', (req, res) => {
  
//   let movieRes = '';  

//   let movie = '';
//   movie = req.body.movieTitle;

//   //post response movie  
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=52355b2a478c82d6bfe5a57afff6c916&query=${movie}&page=1&include_adult=false`;
  
//   request(url, function (error, response, body) {
//     movieRes = JSON.parse(body);
//     console.log('movieRes: ' + movieRes);
//     console.log('first original_title: ' + movieRes.results[0].original_title);
    
//     res.render('search', {
//       'movies' : movieRes.results.slice(1,7),
//       'firstMovie' : movieRes.results[0]
//     })
//   });
// });
