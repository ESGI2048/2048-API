'use strict';

const ComponentController = require('../controllers').ComponentController;
const fileUpload = require('express-fileupload');
const path = require('path');

class ComponentRouter {
	constructor() {
		this.path = path.join(__dirname, '../resources');
	}

	setRoutes(router) {
		router.use(fileUpload());		

                router.get('/', async (req, res) => {
                    try {
                        const result = await ComponentController.getAll();
                        if(result == null || result.length === 0) {
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
                        const result = await ComponentController.getOne(req.params.id);
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
		        if (!req.files || Object.keys(req.files).length === 0) {
                                return res.status(400).json({error: 'No files were uploaded'}).end();
                        }
                        if(Object.keys(req.files).length > 1) {
                                return res.status(400).json({error: "Only one file can be send"}).end();
                        }
                        const resourceFile = req.files.file;


                    try{
			const result = await ComponentController.addComponent(req.body.name, req.body.type, resourceFile.name, req.body.value) ;
                        resourceFile.mv(path.join(this.path, resourceFile.name), (err) => {
                                if(err) {
                                        return res.status(500).json(err).end();
                                }
                        });
                        res.status(201);
                        res.json(result).end();
                    } catch(err){
                        res.status(409);
                        res.json({error: `The addComponent method failed --> ${err}`}).end();
                    }
                });

                router.put('/:id', async (req, res) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {

                            const newData = await  ComponentController.prepareUpdate();
                            const result = await ComponentController.updateComponent(req.params.id, newData);
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
                        const result = await ComponentController.deleteComponentById(id) ;

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

module.exports = ComponentRouter;

