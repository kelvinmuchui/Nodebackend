'use strict'


function requireLogin(req, res, next){
	console.log('Middleware triggered')
	console.log(req.session);

	if (req.session.loggedIn == 1){
		next();
	}else{

		res.redirect('/users/login');
	}
}
module.exports = requireLogin;