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
                    try{
                        const result = await UserController.addUser(req.body.firstName, req.body.lastName, req.body.login, req.body.password, req.body.email, req.body.score, req.body.phone) ;
                        res.status(200);
                        res.json(result);
                    } catch(err){
                        res.status(409);
                        res.json({error: "The addUser method failed"});
                    }
                });

                router.put('/:id', async (req, res) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {

                            const newData = await  UserController.prepareUpdate(req.body.firstName, req.body.lastName, req.body.login, req.body.password, req.body.email, req.body.score, req.body.phone);
                            const result = await UserController.updateUser(req.params.id, newData);
                            res.status(200);
                            res.json(result);
                        }

                    } catch (err) {
                        error(err, res);
                    }
                });

                router.delete('/:id', async (req, res) => {
                    const id = parseInt(req.params.id, 10) ;
                    if(typeof id === 'number' && !isNaN(id) ){
                        const result = await UserController.deleteUserById(id) ;

                        if(result){
                            return res.json({message : 'Success'}) ;
                        }
                        else{
                            return res.status(409).json({message : 'delete failed ' + result}) ;
                        }
                    }
                    return res.status(409).json({message : 'delete failed , ' + req.params.id + 'is not a number ' }) ;
                });
        }
}

module.exports = UserRouter;

