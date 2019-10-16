'use strict';
const controllers = require('../controllers');
const UserController = controllers.UserController;

class UserRouter {
        setRoutes(router) {
                router.get('/', async (req, res) => {
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

                router.get('/:id', async (req, res) => {
                    try {
                        const result = await UserController.getOne(req.params.id);
                        res.status(200);
                        res.json(result);
                    }catch(err) {
                        res.status(409);
                        res.json({error: "The getOne method failed"});
                    }
                    res.end();
                    });

                router.post('/', async(req, res) => {
                    //try{
                        console.log(req.body.email);
                        const result = await UserController.addUser(req.body.firstName, req.body.lastName, req.body.login, req.body.password, req.body.email, req.body.score, req.body.phone) ;
                        res.status(200);
                        res.json(result);
                    /*} catch(err){
                        res.status(409);
                        res.json({error: "The addUser method failed"});
                    }*/
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

