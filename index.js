const express = require('express');
const bodyParser = require('express');
const morgan = require('morgan'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.listen(port, () => {console.log(`The app listening on ${port} ...`)});

