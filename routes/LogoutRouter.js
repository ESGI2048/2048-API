'use strict' ;


const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router() ;
const localstorage = require('localStorage') ;
const userController = require('../controllers').UserController ;

router.use(bodyParser.json()) ;

class LogoutRouter {
    setRoutes(router) {
        router.post('/', async (req, res) => {
            try {
                if (req.user) {
                    const login = req.user.login;
                    const user = req.user;
                    req.logout();
                    return res.json({message: 'good bye ' + login});
                }
                return res.status(500).end();

            } catch (err) {
                return res.status(500).json({error: 'Signout failed', body: req.body});
            }
        });
    }
}
module.exports =  LogoutRouter;
