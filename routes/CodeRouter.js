'use strict';

const CodeController = require('../controllers').CodeController;
const adminAuthMiddleware = require('../middlewares/AdminAuth.js');
const authMiddleware = require('../middlewares/Auth.js');

class CodeRouter {
        setRoutes(router, passport) {
                router.get('/', authMiddleware.verifyAuth, async (req, res) => {
                    try {
                        const result = await CodeController.getAll();
                        if(result == null || result == undefined || result.length == 0) {
                                res.status(404);
                                res.json("There is no reward codes in the database");
                                res.end();
                        }else {
                                res.status(200);
                                res.json(result).end();
                        }
                    }catch(err) {
                        res.status(500);
                        res.json({error: "Internal error"}).end();
                    }
                });

                router.get('/:id', adminAuthMiddleware.verifyBasicAuth, async (req, res) => {
                    try {
                        const result = await CodeController.getOne(req.params.id);
                        if(result == null || result == undefined || result.length == 0) {
                            res.status(404);
                            res.json({error:"The reward code requested is not in the database"});
                            res.end();
                        }else {
                            res.status(200);
                            res.json(result).end();
                        }
                    }catch(err) {
                        res.status(500);
                        res.json({error: "Internal error"}).end();
                    }
                    });

                router.post('/', authMiddleware.verifyAuth,
                    async(req, res) => {
                    try{
                        const result = await CodeController.addCode(req.body.code, req.body.creation_date, req.body.expiration_date, req.body.description) ;
                        res.status(201);
                        res.json(result);
                    } catch(err){
                        res.status(409);
                        res.json({error: `Not possible to add this code because : ${err}`});
                    }
                });

                router.put('/:id', adminAuthMiddleware.verifyBasicAuth, async (req, res) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {
                            const newData = await  CodeController.prepareUpdate(req.body.code, req.body.creation_date, req.body.expiration_date, req.body.description);
                            const result = await CodeController.updateCode(req.params.id, newData);
                            if(result[0] === 1){
                                res.status(204);
                                res.end();
                            }
                            else{
                                res.status(404);
                                res.json({error : "The requested code does not exist"});
                                res.end();
                            }
                        }
                        else {
                            res.status(409);
                            res.json({error : "The id is not a number"});
                            res.end();

                        }
                    } catch (err) {
                        res.status(500);
                        res.json({error : "Internal error"});
                        res.end();
                    }
                });

                router.delete('/:id', adminAuthMiddleware.verifyBasicAuth, async (req, res) => {
                    try {
                        const id = parseInt(req.params.id, 10) ;
                        if(typeof id === 'number' && !isNaN(id) ) {
                            const result = await CodeController.deleteCodeById(id);
                            console.log(result);
                            if (result === 1) {
                                res.status(204);
                                res.end();
                            } else {
                                res.status(404);
                                res.json({error: "The requested code does not exist"});
                                res.end();
                            }
                        }
                        else {
                            res.status(409);
                            res.json({error : "The id is not a number"});
                            res.end();
                        }
                    }
                    catch (err) {
                        res.status(500);
                        res.json({error : "Internal error"});
                        res.end();
                    }
                });
        }
}

module.exports = CodeRouter;
