'use strict'

class CodeRouter {
        setRoutes(router) {
                router.get('/', (req, res, next) => {
                        res.status(200);
                        res.json({codes : [ {title: "title1", value: 5}, {title: "title2", value: 10}]});
                        res.end();
                });

                router.get('/:id', (req, res, next) => {
                        res.status(200);
                        res.json({code: {notification_number: `${req.params.id}`}});
                        res.end();
                });

                router.post('/', (req, res, next) => {
                        res.status(201);
                        res.json({message: "creation du code"});
                        res.end();
                });

                router.put('/:id', (req, res, next) => {
                        res.status(200).end();
                });

                router.delete('/:id', (req, res, next) => {
                        res.status(200).end();
                });
        }
}

module.exports = CodeRouter;
