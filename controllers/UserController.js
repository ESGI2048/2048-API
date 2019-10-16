'user strict'
const userdbHandler = require('../models').User;

class UserController {
	async getAll() {
		return userdbHandler.findAll();
	}

	async getOne(id) {
		return userdbHandler.findOne({
			where: {
				id: id
			}
		});
	}
}

module.exports = new UserController();
