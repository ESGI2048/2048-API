'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const model = require('./models');
const cors = require('cors');

const RouterBuilder = require('./routes/index.js');
const router = new RouterBuilder();

const passport = require('./config').passportConfig ;
const flash = require('connect-flash') ;

const localStorage = require('localStorage') ;
const cookieParser = require('cookie-parser') ;
const session = require('express-session') ;




dotenv.config();

const app = express();

app.use(cors());




//configuration server


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
//app.use(bodyParser.raw({type : 'application/octet-stream'})) ;
app.use(session({ secret: 'keyboard cat' , saveUninitialized: true, resave:true}));
app.use(flash()) ; // passport use flash message for error or success
app.use(passport.initialize());
app.use(passport.session());

const ignoredRoutes = ["/user", "/event", "/component", "/code", "/login/admin", "/login", "/signup"];



app.use((req, res, next)=>{

    const login = localStorage.getItem('login') ;
    console.log(req.user);
    console.log(login);

    if (!ignoredRoutes.includes(req.originalUrl) && !req.user && login == null ){
        return res.sendStatus(403) ;
    }

    /*if(req.originalUrl != '/signup' && req.originalUrl != '/login'  && !req.user && login == null ){
        return res.status(401).send({error : 'your are not authorized to go in  : ' + req.originalUrl, test : 'test', user : req.user}).end() ;
    }
    else if(req.originalUrl == '/login' && req.user){
        return res.redirect('/') ;
    }*/

    next() ;
}) ;



router.generateRoutes(app, passport);



model.sequelize.authenticate()
    .then(() => {
        console.log('Connected !') ;
        return model.sequelize.sync({ force : false }); // force : if true will drop the table first and re-create it afterwards

    })
    .catch( (err) => {
        console.log('Not connected, something went wrong \n' +  err) ;
    });

const port = process.env.PORT || 8888;

app.listen(port, () => {console.log(`The app listening on ${port} ...`)});

