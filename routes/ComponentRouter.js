'use strict';

const ComponentController = require('../controllers').ComponentController;
const fileUpload = require('express-fileupload');
const FileHandler = require('../utils').FileHandler;
const SHA256 = require("crypto-js/sha256");

const authMiddleware = require('../middlewares/AdminAuth.js')

class ComponentRouter {
	constructor() {
		this.fileHandler = new FileHandler();
	}

	setRoutes(router) {
		router.use(fileUpload());
                router.get('/', async (req, res) => {
                    try {
                        const result = await ComponentController.getAll();
                        if(result == null || result == undefined || result.length == 0) {
                            res.status(404);
                            res.json("There is no component in the database");
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

                router.get('/:id', async (req, res) => {
                    try {
                        const result = await ComponentController.getOne(req.params.id);
                        if(result == null || result == undefined || result.length == 0) {
                            res.status(404);
                            res.json({error:"The component requested is not in the database"});
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

                router.post('/', authMiddleware.verifyBasicAuth, async (req, res) => {
                    try{
			            const result = await ComponentController.addComponent(req.body.name, req.body.type, SHA256(Date.now()).toString(), req.body.value);
			            this.fileHandler.uploadFile(req, res, result.file_path);
                        res.status(201);
                        res.json(result).end();
                    } catch(err){
                        res.status(400);
                        res.json({error: `The addComponent method failed --> ${err}`}).end();
                    }
                });


                router.put('/:id', authMiddleware.verifyBasicAuth, async (req, res, next) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {
				const dataToUpdate = await ComponentController.getOne(req.params.id);
                        	if(dataToUpdate == null) {
                        		return res.status(204).json({message: "No data for this id"}).end();
                        	}
                            	const newData = await  ComponentController.prepareUpdate(req.body.name, req.body.type, req.body.value);
                            	const result = await ComponentController.updateComponent(req.params.id, newData);
				this.fileHandler.uploadFile(req, res, dataToUpdate.file_path);
                            	res.status(200);
                            	res.json(result);
                        }

                    } catch (err) {
			res.status(400);
			res.json({error: `The put method failed --> ${err}`}).end();

                    }
                });

                router.delete('/:id', authMiddleware.verifyBasicAuth, async (req, res, next) => {
                    const id = parseInt(req.params.id, 10) ;
                    if(typeof id === 'number' && !isNaN(id) ){
			try {
				const result = await ComponentController.deleteComponentById(id);
                        	if(result){
					this.fileHandler.deleteFile(dataToDelete.dataValues.file_path);			
                            		res.status(200).json({message: 'Success'}) ;
                        	}

                        	else{
                            		res.status(400).json({message: 'delete failed ' + result}) ;
                        	}
			}catch(err) {
				res.status(400);
                        	res.json({error: `The delete method failed --> ${err}`}).end();

			}	

                    }
                    return res.status(409).json({message : 'delete failed , ' + req.params.id + 'is not a number ' }) ;
                });
        }

}

module.exports = ComponentRouter;

