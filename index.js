const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const dotenv = require('dotenv');
const model = require('./models');

dotenv.config();

const app = express();

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

