'use strict'

const express = require('express');
const bodyParser = require('express');
const morgan = require('morgan'); 
const dotenv = require('dotenv');

const RouterBuilder = require('./routes/index.js');
const router = new RouterBuilder();

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;


router.generateRoutes(app);

app.listen(port, () => {console.log(`The app listening on ${port} ...`)});

