'use strict';
const userdbHandler = require('../models').User;

class UserController {
	async getAll() {
		return userdbHandler.findAll();
	}

	async getOne(id){
		return userdbHandler.findOne({
			where : {
				id : id
			}
		}) ;
	}

	async addUser(first_name, last_name, login, password, email, score, phone){
		return userdbHandler.create({
			firstName : first_name,
			lastName : last_name,
			login : login,
			password : password,
			email : email,
			score : score,
			phone : phone,
		});
	}


}

module.exports = new UserController();
