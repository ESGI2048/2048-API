'use strict'

class NotificationRouter {
	setRoutes(router) {
		router.get('/', (req, res, next) => {
			res.status(200);
			res.json({notifications : [ {title: "title1", content: "content1"}, {title: "title2", content: "content2"}]});
			res.end();
		});

		router.get('/:id', (req, res, next) => {
			res.status(200);
			res.json({notification: {notification_number: `${req.params.id}`}});
			res.end();
		});

		router.post('/', (req, res, next) => {
			res.status(201);
			res.json({message: "creation de la notification"});
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

module.exports = NotificationRouter;
