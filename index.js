'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const dotenv = require('dotenv');
const model = require('./models');
const cors = require('cors');

const RouterBuilder = require('./routes/index.js');
const router = new RouterBuilder();

dotenv.config();

const app = express();

app.use(cors());

router.generateRoutes(app);

model.sequelize.authenticate()
    .then(() => {
        console.log('Connected !') ;
        return model.sequelize.sync({ force : false}); // force : if true will drop the table first and re-create it afterwards

    })
    .catch( (err) => {
        console.log('Not connected, something went wrong \n' +  err) ;
    });

const port = process.env.PORT || 8888;

app.listen(port, () => {console.log(`The app listening on ${port} ...`)});

