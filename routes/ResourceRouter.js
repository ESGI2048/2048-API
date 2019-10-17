'use strict';

const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const FileHandler = require('../utils').FileHandler;

class ResourceRouter {
	constructor() {
		this.fileHandler = new FileHandler();
	}

	setRoutes(router) {
		router.get('/:filename', (req, res) => {
			if(req.params.filename == null || ! req.params.filename instanceof String) {
				return res.status(400).res.json({error: "filename must be a string"}).end();
			}
                        this.fileHandler.sendFile(req.params.filename, res);

		});
		
	}
}

module.exports = ResourceRouter;
