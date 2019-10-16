'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./classLoader.js');
const NotificationRouter = router.NotificationRouter;
const ComponentRouter = router.ComponentRouter;
const EventRouter = router.EventRouter;
const CodeRouter = router.CodeRouter;
const UserRouter = router.UserRouter;
const AuthenticationRouter = router.AuthenticationRouter;

class RouterBuilder {
	constructor() {
		this.listRoutes = ["notification", "component", "event", "code", "authentication", "user"];
	}

	generateRoutes(app) {
		this.listRoutes.forEach((route) => {
			app.use('/' + route, this.routerTemplate(route));
		}); 
		app.all('*', (req, res, next) => {
			res.status(404);
			res.json({message: "Page note found"});
		});
	}

	routerTemplate(routeToLoad) {
		const router = express.Router();
		router.use(bodyParser.json());

		if(routeToLoad == 'notification') {
			const notificationRoutes = new NotificationRouter();
			notificationRoutes.setRoutes(router);
	
		}else if(routeToLoad == 'component') {
			const componentRoutes = new ComponentRouter();
			componentRoutes.setRoutes(router);

		}else if(routeToLoad == 'event') {
			const eventRoutes = new EventRouter();
			eventRoutes.setRoutes(router);

		}else if(routeToLoad == 'code') {
			const codeRoutes = new CodeRouter();
			codeRoutes.setRoutes(router);

		}else if(routeToLoad == 'user') {
			const userRoutes = new UserRouter();
			userRoutes.setRoutes(router);
		}
		else if(routeToLoad == 'authentication') {
		const userRoutes = new AuthenticationRouter();
		userRoutes.setRoutes(router);
}


		

		return router;
	}
}

module.exports = RouterBuilder;
