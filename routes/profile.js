var Album = require('../data/models/albums');
var loggedIn = require('./middleware/logged_in');
var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');
var fs = require('fs');
var path = require('path');
var http = require('http');

module.exports = function(app) {

  function setTime() {
    x = new Date();
    y = x.getTime() - 1372395800000;
    return y;
  }

  app.get('/edit-profile', function(req, res){
  	res.render('edit-profile', {user: req.session.user});
  });

  app.get('/edit-profile1', function(req, res){
    if (!req.session.user) {
      res.send("Very sorry but a user with that email already exists please go back and sign in or create a new account.")
    } else {
      res.render('edit-profile', {user: req.session.user});
    }
  });

  app.get('/pro-profile', loggedIn, function(req, res, next){
    bounce = req.session.user.email;
    User.findOne({email: bounce}, function(err, user) {
      if (err) {
        return next (err);
      }
      if (user) {
        req.session.user = user;
        Album.findOne({ 'user_email' : req.session.user.email }, function(err, album){
          if (!album){
            var album = {images: [""]};
            res.render('pro-profile', {user: req.session.user, album: album});
          } else {
            res.render('pro-profile', {user: req.session.user, album: album});
          }
        });
      }
    });
  });

  function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) < milliseconds) {
    };
  };

  app.post('/edit-profile', function(req, res) {
    User.findOne({ 'username' : req.session.user.username }, function(err, user) {
      
      var tempPath = req.files.file.path;
      var extension = path.extname(req.files.file.name).toLowerCase();
      if (extension == ".png") {
        targetPath = 'public/img_uploads/image' + setTime() + '.png';
      } else if (extension == ".jpeg") {
        targetPath = 'public/img_uploads/image' + setTime() + '.jpeg';
      } else if (extension == ".jpg") {
        targetPath = 'public/img_uploads/image' + setTime() + '.jpg';
      } else {
        console.log("There is a problem setting the targetPath");
      };
      
      fs.readFile(tempPath, function(err, data){
        if (err) throw err;
        if (data != "") {
          fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
          });
        }
      });

      user.profile_pic = targetPath.slice(7);
      user.description = req.body.description;
      user.company = req.body.company;
      user.location = req.body.location;
      user.website = req.body.website;
      user.phone = req.body.phone;
      user.address = req.body.address;
      
      user.save(function(err) {
        if (!err){
          res.redirect('/pro-profile');  
        }
      });

    });
  });
};