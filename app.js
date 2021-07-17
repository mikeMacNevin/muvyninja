const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const request = require('request');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');


var compression = require('compression')


// Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
// const browse = require('./routes/browse');
const search = require('./routes/search');
const movies = require('./routes/movies');
const favorites = require('./routes/favorites');


// Models
require('./models/User');
// Config
require('./config/passport')(passport);


// DATABASE - MONGODB
console.log("process.env.MONGO_URI: " + process.env.MONGO_URI) ;


connectDB();


// Express - Start App
const app = express();
app.use(compression())

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Session
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection})
  })
);
//Passport
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})
// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Handlebars
app.engine('handlebars', exphbs({
   defaultLayout: 'main',
   helpers: {
     yearOnly(movieDate) { 
       if (movieDate) {
        return movieDate = movieDate.substring(0, 4); 

       }

      }
   }
}));
app.set('view engine', 'handlebars');


// Use Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

// Use Routes
app.use('/', index);

app.use('/auth', auth);
// app.use('/browse', browse);

// CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
app.use('/search', search);
app.use('/movies', movies);
app.use('/favorites', favorites);



const PORT = 4000;

app.listen(process.env.PORT || PORT, () =>{
  console.log(`Mike: Server started on port ${PORT}`);
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
