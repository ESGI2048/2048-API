'use strict'

class ComponentRouter {
        setRoutes(router) {
                router.get('/', (req, res, next) => {
                        res.status(200);
                        res.json({components : [ {name: "compo1", }, {name: "compo2"}]});
                        res.end();
                });

                router.get('/:id', (req, res, next) => {
                        res.status(200);
                        res.json({component: {component_number: `${req.params.id}`}});
                        res.end();
                });

                router.post('/', (req, res, next) => {
                        res.status(201);
                        res.json({message: "creation du composant"});
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

module.exports = ComponentRouter;

