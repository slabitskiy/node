const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const api = require('./api');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' })

const app = express();

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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