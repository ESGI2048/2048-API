'use strict';

class LoginRouter{

    setRoutes(router, passport) {
        router.post('/', passport.authenticate('local', {
            //successRedirect: '/',
            failureFlash: true,
            successFlash: 'authentication API succeeded !'
        }), (req, res) =>{
                res.status(200);
                res.json({Authenticated : true});
                res.end();
            }

        );
    }
}

module.exports = LoginRouter ;
