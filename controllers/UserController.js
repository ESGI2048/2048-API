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

	async updateUser(id, newData) {
		return userdbHandler.update(newData, {
			where: {
				id: id
			}
		});
	}

	prepareUpdate( first_name, last_name, login, password, email, score, phone){
		let res = {};
		if(first_name !== undefined){
			res.firstName = first_name;
		}
		if(last_name !== undefined){
			res.lastName = last_name;
		}
		if(login !== undefined){
			res.login = login;
		}
		if(password !== undefined){
			res.password = password;
		}
		if(email !== undefined){
			res.email = email;
		}
		if(score !== undefined){
			res.score = score;
		}
		if(phone !== undefined){
			res.phone = phone;
		}
		return res;
	}

	async deleteUserById(id) {
		return userdbHandler.destroy({
			where: {
				id: id
			},
			force: true
		});
	}
}

module.exports = new UserController();
