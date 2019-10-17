'use strict';
const codedbHandler = require('../models').Code;

class CodeController {
        async getAll() {
                return codedbHandler.findAll();
        }

        async getOne(id){
                return codedbHandler.findOne({
                        where : {
                                id : id
                        }
                }) ;
        }

        async addCode(code, creation_date, expiration_date, description){
                return codedbHandler.create({
                        code : code,
                        creation_date : creation_date,
                        expiration_date : expiration_date,
                        description : description
                });
        }

        async updateCode(id, newData) {
                return codedbHandler.update(newData, {
                        where: {
                                id: id
                        }
                });
        }

        prepareUpdate(code, creation_date, expiration_date, description){
                let res = {};
                if(code !== undefined){
                        res.code = code;
                }
                if(creation_date !== undefined){
                        res.creation_date = creation_date;
                }
                if(expiration_date !== undefined){
                        res.expiration_date = expiration_date;
                }
                if(description !== undefined){
                        res.description = description;
                }
                return res;
        }

        async deleteCodeById(id) {
                return codedbHandler.destroy({
                        where: {
                                id: id
                        },
                        force: true
                });
        }
}

module.exports = new CodeController();
 
