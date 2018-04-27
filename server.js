const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.listen(process.env.PORT, (e) => {
	if (e) {
	  console.error(e);
	}
  
	console.log(`Server started on: http://localhost:${process.env.PORT} port`);
  });