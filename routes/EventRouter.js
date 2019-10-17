'use strict'

const authMiddleware = require('../middlewares/AdminAuth.js')

class EventRouter {
        setRoutes(router) {
                router.get('/', (req, res, next) => {
                        res.status(200);
                        res.json({events : [ {title: "title1", content: "content1"}, {title: "title2", content: "content2"}]});
                        res.end();
                });

                router.get('/:id', (req, res, next) => {
                        res.status(200);
                        res.json({event: {event_number: `${req.params.id}`}});
                        res.end();
                });

                router.post('/', authMiddleware.verifyBasicAuth, (req, res, next) => {
                        res.status(201);
                        res.json({message: "creation de l'event"});
                        res.end();
                });

                router.put('/:id', authMiddleware.verifyBasicAuth, (req, res, next) => {
                        res.status(200).end();
                });

                router.delete('/:id', authMiddleware.verifyBasicAuth, (req, res, next) => {
                        res.status(200).end();
                });
        }
}

module.exports = EventRouter;

