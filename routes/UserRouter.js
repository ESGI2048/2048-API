'use strict'
const controllers = require('../controllers');
const UserController = controllers.User;

class UserRouter {
        setRoutes(router) {
                router.get('/', async (req, res, next) => {
			try {
				const result = await UserController.getAll();
                        	res.status(200);
				res.json(result);
			}catch(err) {
				res.status(409);
				res.json({error: "The getAll method failed"});
			}
                        res.end();
                });

                router.get('/:id', (req, res, next) => {
                        res.status(200);
                        res.json({user: {user_number: `${req.params.id}`}});
                        res.end();
                });

                router.post('/', (req, res, next) => {
                        res.status(201);
                        res.json({message: "creation de l'user"});
                        res.end();
                });

                router.put('/:id', (req, res, next) => {
                        res.status(200).end();
                });

                router.delete('/:id', (req, res, next) => {
                        res.status(200).end();
                });
        }
}

module.exports = UserRouter;

