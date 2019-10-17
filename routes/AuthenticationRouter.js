'use strict';

const controllers = require('../controllers');
const AuthenticationController = controllers.AuthenticationController;

class AuthenticationRouter{

    setRoutes(router){
        /*router.post('/:login', async (req, res) => {
            try {
                const result = await AuthenticationController.getUserByLogin(req.params.login);
                res.status(200);
                res.json(result);
            }catch(err) {
                res.status(409);
                res.json({error: "The getUserByLogin method failed"});
            }
            res.end();
        });*/
    }
}

module.exports = AuthenticationRouter;
