'use strict';

const componentdbHandler = require('../models').Component;

class ComponentController {
        async getAll() {
                return componentdbHandler.findAll();
        }

        async getOne(id){
                return componentdbHandler.findOne({
                        where : {
                                id : id
                        }
                }) ;
        }

        async addComponent(name, type, file_path, value){
                return componentdbHandler.create({
                        name : name,
                        type : type,
                        file_path : file_path,
                        value : value
                });
        }

        async updateComponent(id, newData) {
                return componentdbHandler.update(newData, {
                        where: {
                                id: id
                        }
                });
        }

        prepareUpdate(name, type, value){
                let res = {};
                if(name !== undefined){
                        res.name = name;
                }
                if(type !== undefined){
                        res.type = type;
                }
                if(value !== undefined){
                        res.value = value;
                }
                return res;
        }

        async deleteComponentById(id) {
                return componentdbHandler.destroy({
                        where: {
                                id: id
                        },
                        force: true
                });
        }
}

module.exports = new ComponentController();
