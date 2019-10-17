'use strict';
const controllers = require('../controllers');
const UserController = controllers.UserController;
const authMiddleware = require('../middlewares/AdminAuth.js');

class UserRouter {
        setRoutes(router) {
                router.get('/', authMiddleware.verifyBasicAuth, async (req, res) => {
                    try {
                        const result = await UserController.getAll();
			if(result == null) {
				res.status(404).end();
			}else {
				res.status(200);
                        	res.json(result).end();
			}
                    }catch(err) {
                        res.status(500);
                        res.json({message: "The getAll method failed"}).end();
                    }
                });

                router.get('/:id', authMiddleware.verifyBasicAuth, async (req, res) => {
                    try {
                        const result = await UserController.getOne(req.params.id);
			if(result == null) {
				res.status(404).end();
			}else {
                        	res.status(200);
                        	res.json(result).end();
			}
                    }catch(err) {
                        res.status(500);
                        res.json({message: "The getOne method failed"}).end();
                    }
                    });

                router.post('/', authMiddleware.verifyBasicAuth, async(req, res) => {
                    try{
                        const result = await UserController.addUser(req.body.first_name, req.body.last_name, req.body.login, req.body.password, req.body.email, req.body.score, req.body.phone) ;
                        res.status(201);
                        res.json(result);
                    } catch(err){
                        res.status(500);
                        res.json({message: `The addUser method failed --> ${err}`});
                    }
                });

                router.put('/:id', async (req, res) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {

                            const newData = await  UserController.prepareUpdate(req.body.first_name, req.body.last_name, req.body.login, req.body.password, req.body.email, req.body.score, req.body.phone);
                            const result = await UserController.updateUser(req.params.id, newData);
                            res.status(200);
                            res.json(result);
                        }

                    } catch (err) {
			res.status(500).json(err).end();
                    }
                });

                router.delete('/:id', authMiddleware.verifyBasicAuth, async (req, res) => {
                    const id = parseInt(req.params.id, 10) ;
                    if(typeof id === 'number' && !isNaN(id) ){
                        const result = await UserController.deleteUserById(id) ;

                        if(result){
                            return res.status(204) ;
                        }
                        else{
                            return res.status(404);
                        }
                    }
                    return res.status(500).json({message : 'delete failed , ' + req.params.id + 'is not a number ' }) ;
                });
        }
}

module.exports = UserRouter;

