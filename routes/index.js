'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./classLoader.js');
const NotificationRouter = router.NotificationRouter;
const ComponentRouter = router.ComponentRouter;
const EventRouter = router.EventRouter;
const CodeRouter = router.CodeRouter;
const UserRouter = router.UserRouter;
const SignUpRouter = router.SignUpRouter;
const LoginRouter = router.LoginRouter;
const LogoutRouter = router.LogoutRouter;
const ResourceRouter = router.ResourceRouter;

class RouterBuilder {
	constructor() {
		this.listRoutes = ["notification", "component", "event", "code", "user", "login", "signup", "logout", "resource"];
	}

	generateRoutes(app, passport) {
		this.listRoutes.forEach((route) => {
			app.use('/' + route, this.routerTemplate(route, passport));
		}); 
		app.all('*', (req, res, next) => {
			res.status(404);
			res.json({message: "Page not found"});
		});
	}

	routerTemplate(routeToLoad, passport) {
		const router = express.Router();
		router.use(bodyParser.json());
		router.use(bodyParser.urlencoded({ extended: true }));

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
			codeRoutes.setRoutes(router, passport);

		}else if(routeToLoad == 'user') {
			const userRoutes = new UserRouter();
			userRoutes.setRoutes(router, passport);
		
		}else if(routeToLoad == 'resource') {
			const resourceRoutes = new ResourceRouter();
			resourceRoutes.setRoutes(router);
		}
		else if(routeToLoad == 'signup') {
			const signupRoutes = new SignUpRouter();
			signupRoutes.setRoutes(router);
		}
		else if(routeToLoad == 'login') {
			const loginRouter = new LoginRouter();
			loginRouter.setRoutes(router, passport);
		}
		else if(routeToLoad == 'logout') {
			const logoutRouter = new LogoutRouter();
			logoutRouter.setRoutes(router);
		}
		return router;
	}
}

module.exports = RouterBuilder;
