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
    var tempPath = req.files.file.path,
        targetPath = 'public/img_uploads/image' + setTime() + '.png';
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        console.log("this is officially registering as PNG");
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
          }); 
      };
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
      }    
    });
    res.redirect('/');
  });

};


  