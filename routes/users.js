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

  app.get('/users/new', notLoggedIn, function(req, res) {
    res.render('new');
  });

  app.post('/users', function(req, res, next) {

    if (fs.readFile(req.files.file.path) == undefined) {
      console.log("Fuck Yes!");
    };

      var tempPath = req.files.file.path,
          jpgPath = 'public/img_uploads/image' + setTime() + '.jpg',
          jpegPath = 'public/img_uploads/image' + setTime() + '.jpeg',
          targetPath = 'public/img_uploads/image' + setTime() + '.png',
          extension = path.extname(req.files.file.name).toLowerCase();


      if (extension == undefined && (extension !== '.png' || extension !== '.jpeg' || extension !== 'jpg')) {
        res.send("Sorry you can only upload pngs and jpegs. Please go back and upload a different picture.");
      }


      if (path.extname(req.files.file.name).toLowerCase() === '.png') {
          console.log("this is officially registering as PNG");
          fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
          }); 
      } else if 
          (path.extname(req.files.file.name).toLowerCase() === '.jpeg') {
            fs.rename(tempPath, jpegPath, function(err) {
              if (err) throw err;
                console.log("Upload completed!");
                });
      } else if 
          (path.extname(req.files.file.name).toLowerCase() === '.jpg') {
            fs.rename(tempPath, jpgPath, function(err) {
              if (err) throw err;
                console.log("Upload completed!");
                });
        } 

    req.body.profile_pic = targetPath.slice(7);
    User.create(req.body, function(err) {      
      if (err) {
        if (err.code === 11000) {
          res.send('Conflict', 409);
        } else {
          if (err.name === 'ValidationError') {
            return res.send(Object.keys(err.errors).map(function(errField) {
              return err.errors[errField].message;
            }).join('. '), 406);
          } else {
          next(err);
          }

        }
        return;
      } else {
        res.redirect(307, '/session');
      }
    });
  });

};


  