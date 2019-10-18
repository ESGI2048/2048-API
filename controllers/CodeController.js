'use strict';
const codedbHandler = require('../models').Code;
const pearson = require('pearson');

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

        async addCode(code, creation_date, expiration_date, score, reward){
                return codedbHandler.create({
                        code : code,
                        creation_date : creation_date,
                        expiration_date : expiration_date,
                        score : score,
                        reward : reward
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

       async generateCode(score) {
                console.log(score);
               const seed = pearson.seed();
               const hash = pearson(Date.now().toString(), 8, seed);
               const currentDate = Math.trunc(Date.now()) / 1000;
               let reward = (score/600)*15;
               if (reward >= 15){
                       reward = 15;
               }
               const result = await this.addCode(hash.toString("hex"), currentDate, currentDate + 3 * 30 * 24 * 360, score, reward );
               return hash.toString("hex");
       }
}

module.exports = new CodeController();
 
