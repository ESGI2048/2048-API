'use strict';

const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

class ResourceRouter {
	constructor() {
		this.path = path.join(__dirname, '../resources'),
		this.options = {
                                root: this.path,
                                dotfile: 'deny',
                                headers: {
                                        'x-timestamp': Date.now(),
                                        'x-sent': true
                                }
                };
	}

	setRoutes(router) {
		router.get('/:filename', (req, res) => {
                        res.sendFile(req.params.filename, this.options, (err) => {
                        	if(err) {
                        		res.status(err['statusCode']).end();
                        	}else {
                        		res.status(200).end();
                                }
                        });

		});
		
	/*	router.use(fileUpload());
		
		router.post('/', (req, res) => {
			if (!req.files || Object.keys(req.files).length === 0) {
   				res.status(400).json({error: 'No files were uploaded'}).end();
  			}
			if(Object.keys(req.files).length > 1) {
				res.status(400).json({error: "Only one file can be send"}).end();
			}
			console.log(req.files);
			console.log(req.body);
			console.log(req.body.name);
			const resourceFile = req.files.file;
			
			resourceFile.mv(path.join(this.path, resourceFile.name), (err) => {
				if(err) {
					return res.status(500).json(err).end();
				}
				res.status(201).json({message: "The resource is saved"});
			});
			
		});*/
	}
}

module.exports = ResourceRouter;
