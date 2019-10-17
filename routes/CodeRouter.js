'use strict';

const CodeController = require('../controllers').CodeController;

class CodeRouter {
        setRoutes(router) {
                router.get('/', async (req, res) => {
                    try {
                        const result = await CodeController.getAll();
                        if(result == null) {
                                res.status(204).end();
                        }else {
                                res.status(200);
                                res.json(result).end();
                        }
                    }catch(err) {
                        res.status(409);
                        res.json({error: "The getAll method failed"}).end();
                    }
                });

                router.get('/:id', async (req, res) => {
                    try {
                        const result = await CodeController.getOne(req.params.id);
                        if(result == null) {
                                res.status(204).end();
                        }else {
                                res.status(200);
                                res.json(result).end();
                        }
                    }catch(err) {
                        res.status(409);
                        res.json({error: "The getOne method failed"}).end();
                    }
                    });

                router.post('/', async(req, res) => {
                    try{
                        const result = await CodeController.addCode(req.body.code, req.body.creation_date, req.body.expiration_date, req.body.description) ;
                        res.status(201);
                        res.json(result);
                    } catch(err){
                        res.status(409);
                        res.json({error: `The addCode failed --> ${err}`});
                    }
                });

                router.put('/:id', async (req, res) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {

                            const newData = await  CodeController.prepareUpdate(req.body.code, req.body.creation_date, req.body.expiration_date, req.body.description);
                            const result = await CodeController.updateCode(req.params.id, newData);
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
                        const result = await CodeController.deleteCodeById(id) ;

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

module.exports = CodeRouter;
