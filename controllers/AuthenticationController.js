'use strict';

const authenticationdbHandler = require('../models').User;

class AuthenticationController {

    async getUserByLogin(login){
        return authenticationdbHandler.findOne({
            where : {
                login : login
            },
            attributes: ['id', 'password', 'email']
        }) ;
    }
}

module.exports = new AuthenticationController();
