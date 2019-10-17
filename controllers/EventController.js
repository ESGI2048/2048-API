'use strict';

const eventdbHandler = require('../models').Event;

class EventController {
        async getAll() {
                return eventdbHandler.findAll();
        }

        async getOne(id){
                return eventdbHandler.findOne({
                        where : {
                                id : id
                        }
                }) ;
        }

        async addEvent(name, place, date, file_path, description){
                return eventdbHandler.create({
                        name : name,
                        place : place,
			date : date,
                        file_path : file_path,
                        description : description
                });
        }

        async updateEvent(id, newData) {
                return eventdbHandler.update(newData, {
                        where: {
                                id: id
                        }
                });
        }

        prepareUpdate(name, place, date, description){
                let res = {};
                if(name !== undefined){
                        res.name = name;
                }
                if(place !== undefined){
                        res.place = place;
                }
		if(date !== undefined) {
			res.date = date;
		}
                if(description !== undefined){
                        res.description = description;
                }
                return res;
        }

	prepareFilePath(file_path) {
		let res = {};
		if(file_path !== undefined) {
			res.file_path = file_path;
		}
		return res;
	}

        async deleteEventById(id) {
                return eventdbHandler.destroy({
                        where: {
                                id: id
                        },
                        force: true
                });
        }
}

module.exports = new EventController();
