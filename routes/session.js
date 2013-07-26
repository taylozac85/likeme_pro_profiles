var User = require('../data/models/user');

module.exports = function(app) {

  app.get('/session/new', function(req, res){
  	res.render('login')
  });

  app.post('/session', function(req, res) {
		User.findOne({email: req.body.email, password: req.body.password},
			function(err, user) {
				if (err) {
					return next (err);
				}

				if (user) {
					req.session.user = user;
					res.redirect('/pro-profile');
				} else {
					res.redirect('/session/new');
				}
			});
	});

};