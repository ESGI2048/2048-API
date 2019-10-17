'use strict' ;

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

                router.post('/', (req, res, next) => {
                        res.status(201);
                        res.json({message: "creation de l'event"});
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

module.exports = EventRouter;

