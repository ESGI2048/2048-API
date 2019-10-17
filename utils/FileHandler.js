'use strict';

const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

class FileHandler {
	constructor() {
		this.path = path.join(__dirname, "../resources");
		this.options = {
                	root: this.path,
                        dotfile: 'deny',
                        headers: {
                        	'x-timestamp': Date.now(),
                                'x-sent': true
                        }
                };
	}

	createFile() {

	}

	deleteFile(filename) {
		fs.unlink(path.join(this.path, filename), (err) => {
			if(err) {
				throw new err({message: `The file cannot be delete --> ${err}`});
			}
		});
	}

	uploadFile(req, res, filename) {
		if (!req.files || Object.keys(req.files).length === 0) {
                	return res.status(400).json({message: 'No files were uploaded'}).end();
                }
                if(Object.keys(req.files).length > 1) {
                	return res.status(400).json({message: "Only one file can be send"}).end();
                }
               	const resourceFile = req.files.file;

		resourceFile.mv(path.join(this.path, filename), (err) => {
                	if(err) {
                		return res.status(500).json(err).end();
                	}
                });

	}

	sendFile(filename, res) {
		res.sendFile(filename, this.options, (err) => {
                	if(err) {
                		res.status(err['statusCode']).end();
                	}else {
                		res.status(200).end();
                	}
                });
	}
}

module.exports = FileHandler;
