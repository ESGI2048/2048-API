'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./classLoader.js');
const NotificationRouter = router.NotificationRouter;

class RouterBuilder {
	constructor() {
		this.listRoutes = ["notification", "component", "event", "code", "authentication"];
	}

	generateRoutes(app) {
		this.listRoutes.forEach((route) => {
			app.use('/' + route, this.routerTemplate(route));
			app.all('*', (req, res, next) => {
				res.status(404);
				res.json({message: "Page note found"});
			});
		}); 
	}

	routerTemplate(routeToLoad) {
		const router = express.Router();
		router.use(bodyParser.json());

		if(routeToLoad == 'notification') {
			const notificationRoutes = new NotificationRouter();
			notificationRoutes.setRoutes(router);
		}
		

		return router;
	}
}

module.exports = RouterBuilder;
