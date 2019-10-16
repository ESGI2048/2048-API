'use strict'

class UserRouter {
        setRoutes(router) {
                router.get('/', (req, res, next) => {
                        res.status(200);
                        res.json({users : [ {name: "name1", email: "test@test.fr"}, {title: "name2", content: "test2@test.fr"}]});
                        res.end();
                });

                router.get('/:id', (req, res, next) => {
                        res.status(200);
                        res.json({user: {user_number: `${req.params.id}`}});
                        res.end();
                });

                router.post('/', (req, res, next) => {
                        res.status(201);
                        res.json({message: "creation de l'user"});
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

module.exports = UserRouter;

