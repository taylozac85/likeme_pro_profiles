var User = require('../data/models/user');
var mongoose = require('mongoose');

module.exports = function(app) {
  
  app.get('/album/new', function(req, res) {
    res.render('albums');
    console.log(req.session.user)
  });

  app.post('/album', function(req, res){
  	var instance = req.session.user.username;
      User.findOne({ 'username' : instance }, function (err, user){
      	console.log(user.albums)
      	console.log(req.body)
      	user.albums.create({name: req.body.name});
      });
  });

};
