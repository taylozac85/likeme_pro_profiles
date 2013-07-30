var Album = require('../data/models/albums');
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

  app.get('/oops1', function(req, res) {
    res.render('oops1');
  });

  app.get('/upload/new', function(req, res) {
  	if (req.session.user) {
  		res.render('upload', {message: 'Upload a photo after you submit an album name', message1: 'Submit an album name'});
  	} else {
  		res.render('index');
  	}
  });

  app.post('/upload/photo', function(req, res){
  	
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

    if (extension !== '.png' && extension !== '.jpeg' && extension !== '.jpg') {
      res.redirect('/oops1');
    } else {
        fs.rename(tempPath, targetPath, function(err) {
          if (err) throw err;
        }); 
        var email = req.session.user.email;
        Album.findOne({ 'user_email' : email}, function (err, album){
          album.images.push(targetPath.slice(7));
          album.save();
        });
        res.render('upload', {message: 'Upload another photo?', message1: 'Nice!'})
      }
  });


  	// var tempPath = req.files.file.path,
   //      targetPath = 'public/img_uploads/image' + setTime() + '.png';
   //  if (path.extname(req.files.file.name).toLowerCase() === '.png') {
   //      console.log("this is officially registering as PNG");
   //      fs.rename(tempPath, targetPath, function(err) {
   //        if (err) throw err;
   //      }); 
   //  };
  //   var email = req.session.user.email;
  //   Album.findOne({ 'user_email' : email}, function (err, album){
  //   	album.images.push(targetPath.slice(7));
  //   	album.save()
  //   });
  //   res.render('upload', {message: 'Upload another photo?', message1: 'Nice!'})
  // });




  app.post('/upload', function(req, res) {
  	req.body.user_email = req.session.user.email;
  	Album.create(req.body, function(err) {      
      if (err) {
        if (err.code === 11000) {
          res.send('Conflict', 409);
        } else {
          if (err.name === 'ValidationError') {
            return res.send('Oy! Your Album needs a name. Go back and submit an album name! Preferably something funky.')
          } else {
          next(err);
          }

        }
        return;
      } else {
        res.render('upload', {message: 'Upload the photo!', message1: 'The Album ' + req.body.name + ' has been created! Choose a photo.'});
      }
    });
  });

};
