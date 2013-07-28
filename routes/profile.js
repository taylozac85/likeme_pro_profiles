var Album = require("../data/models/albums");

module.exports = function(app) {

  app.get('/edit-profile', function(req, res){
  	res.render('edit-profile');
  });

  app.get('/pro-profile', function(req, res){
    var user = req.session.user;
    var album = req.session.album;
    if (req.session.user) {
      res.render('pro-profile', {user: req.session.user, album: album});
  	} else {
  		res.redirect('login');
  	};
  });

};