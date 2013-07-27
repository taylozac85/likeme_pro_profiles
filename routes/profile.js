module.exports = function(app) {

  app.get('/edit-profile', function(req, res){
  	res.render('edit-profile');
  });

  app.get('/pro-profile', function(req, res){
  	if (req.session.user) {
  		res.render('pro-profile', {user: req.session.user});
  	} else {
  		res.redirect('login');
  	};
  });

};