const express = require('express');
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(expressSession);

const api = require('./api');
const passportStrategy = require('./helpers/passportStrategy');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

const app = express();

app.use(cookieParser());

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_KEY,
  cookie: {
    maxAge: 1000 * 60 * 60 * (24 * 5),
  },
  store: new MongoStore({
    url: process.env.MONGO_URL,
    autoRemove: 'native',
  }),
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, passportStrategy.strategy));

passport.serializeUser(passportStrategy.serialize);

passport.deserializeUser(passportStrategy.deserialize);

api(app);

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(`Connect to mongo failed due: ${err.message}`);
  }

  console.log('Connected to mongodb');
});

app.listen(process.env.PORT, (e) => {
  if (e) {
	  console.error(e);
  }

  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
