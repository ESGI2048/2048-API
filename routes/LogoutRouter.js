'use strict' ;


const localstorage = require('localStorage');
const userController = require('../controllers').UserController;
const authMiddleware = require('../middlewares/Auth.js');

class LogoutRouter {
    setRoutes(router) {
        router.post('/', authMiddleware.verifyAuth, async (req, res) => {
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
