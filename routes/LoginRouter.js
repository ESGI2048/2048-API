'use strict';

const authMiddleware = require('../middlewares/AdminAuth.js');
class LoginRouter{

    setRoutes(router, passport) {

        router.post('/', passport.authenticate('local', {
            //successRedirect: '/',
            failureFlash: true,
            successFlash: 'authentication API succeeded !'
        }), (req, res, next) =>{
                res.status(200);
                res.json({Authenticated : true});
                res.end();
            });

        router.get('/admin', authMiddleware.verifyBasicAuth, (req, res, next) => {
            res.sendStatus(204);
        });
    }

}

module.exports = LoginRouter ;
