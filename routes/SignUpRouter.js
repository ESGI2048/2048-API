'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router() ;

const userController = require('../controllers').UserController ;

router.use(bodyParser.json()) ;


class SignUpRouter {
    setRoutes(router) {
        router.post('/', async (req, res) => {

            try {

                if (req.body.login !== undefined && req.body.password !== undefined && req.body.email !== undefined) {

                    const result = await userController.addUser(req.body.firstName, req.body.lastName, req.body.login, req.body.password, req.body.email, req.body.score, req.body.phone);
                    if (result) {
                        res.json(result);
                    } else {
                        res.status(400).json({error: 'signup Failed : ', body: req.body});
                    }

                } else {
                    res.status(400).json({error: 'signup Failed because of your bad informations', body: req.body});
                }

            } catch (err) {
                console.error(err);
                res.status(500).json({error: 'signup Failed', body: req.body});
            }
        });
    }
}


module.exports = SignUpRouter ;
