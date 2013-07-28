var Album = require('../data/models/albums');
var loggedIn = require('./middleware/logged_in');

module.exports = function(app) {

  app.get('/edit-profile', function(req, res){
  	res.render('edit-profile');
  });

  app.get('/pro-profile', loggedIn, function(req, res, next){
    console.log(user);
    var instance = req.session.user.email;
    Album.findOne({ 'user_email' : instance }, function(err, album){
      if (!album){
        console.log("No Album");
        res.render('pro-profile', {user: req.session.user});
      } else {
        console.log(album.images);
    		res.render('pro-profile', {user: req.session.user, album: album});
      }
    });

  });
};