'use strict';

const controllers = require('../controllers');
const authMiddleware = require('../middlewares/AdminAuth.js');
const AuthenticationController = controllers.AuthenticationController;

class AuthenticationRouter{

    setRoutes(router){
        router.get('/admin', authMiddleware.verifyBasicAuth, (req, res, next) => {
            res.sendStatus(204);
        });

        router.get('/:login', async (req, res) => {
            try {
                const result = await AuthenticationController.getUserByLogin(req.params.login);
                res.status(200);
                res.json(result);
            }catch(err) {
                res.status(409);
                res.json({error: "The getUserByLogin method failed"});
            }
            res.end();
        });
    }
}

module.exports = AuthenticationRouter;
