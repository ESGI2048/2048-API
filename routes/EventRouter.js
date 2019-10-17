'use strict';

const EventController = require('../controllers').EventController;
const fileUpload = require('express-fileupload');
const FileHandler = require('../utils').FileHandler;
const SHA256 = require("crypto-js/sha256");

const authMiddleware = require('../middlewares/AdminAuth.js')

class EventRouter {
        constructor() {
                this.fileHandler = new FileHandler();
        }

        setRoutes(router) {
                router.use(fileUpload());

                router.get('/', async (req, res) => {
                    try {
                        const result = await EventController.getAll();
                        if(result == null || result.length === 0) {
                                res.status(204).end();
                        }else {
                                res.status(200);
                                res.json(result).end();
                        }
                    }catch(err) {
                        res.status(400);
                        res.json({error: "The getAll method failed"}).end();
                    }
                });

                router.get('/:id', async (req, res) => {
                    try {
                        const result = await EventController.getOne(req.params.id);
                        if(result == null) {
                                res.status(204).end();
                        }else {
                                res.status(200);
                                res.json(result).end();
                        }
                    }catch(err) {
                        res.status(400);
                        res.json({error: "The getOne method failed"}).end();
                    }
                    });

                router.post('/', authMiddleware.verifyBasicAuth, async (req, res, next) => {
                    try{
                        const extension = req.files.file.name.substring(req.files.file.name.lastIndexOf('.')); 
                        const filename = SHA256(Math.floor(Date.now()).toString()) + extension;
                        const result = await EventController.addEvent(req.body.name, req.body.place, req.body.date, filename, req.body.description);
                        this.fileHandler.uploadFile(req, res, result.file_path);
                        res.status(201);
                        res.json(result).end();
                    } catch(err){
                        res.status(400);
                        res.json({error: `The addEvent method failed --> ${err}`}).end();
                    }
                });


                router.put('/:id', authMiddleware.verifyBasicAuth, async (req, res, next) => {
                    try {
                        const id = parseInt(req.params.id, 10);
                        if (typeof id === 'number' && !isNaN(id)) {
                                const dataToUpdate = await EventController.getOne(req.params.id);
                                if(dataToUpdate == null) {
                                        return res.status(204).json({message: "No data for this id"}).end();
                                }
                                const newData = await  EventController.prepareUpdate(req.body.name, req.body.place, req.body.date, req.body.description);
                                const result = await EventController.updateEvent(req.params.id, newData);
                                if(result) {
                                        if(req.files != undefined || req.files != null) {
                                                this.fileHandler.deleteFile(dataToUpdate.file_path);
                                                const extension = req.files.file.name.substring(req.files.file.name.lastIndexOf('.'));
                                                const filename = SHA256(Math.floor(Date.now()).toString()) + extension;
						this.fileHandler.uploadFile(req, res, filename);
                                                const newData2 = await  EventController.prepareFilePath(filename);
                                                const result2 = await EventController.updateEvent(req.params.id, newData2);

                                        }
                                        res.status(204).end();

                                }else {
                                        throw new err();
                                }
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
                                const dataToDelete = await EventController.getOne(req.params.id);
                                const result = await EventController.deleteEventById(id);
                                if(result){
                                        this.fileHandler.deleteFile(dataToDelete.file_path);
                                        res.status(200).json({message: 'Success'}) ;
                                }

                                else{
                                        res.status(400).json({message: 'delete failed ' + result}) ;
                                }
                        }catch(err) {
                                res.status(400);
                                res.json({error: `The delete method failed --> ${err}`}).end();

                        }

                    }else {
                        return res.status(409).json({message : 'delete failed , ' + req.params.id + 'is not a number ' }) ;
                    }
                });
        }
	
}

module.exports = EventRouter;

