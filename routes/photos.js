
var User = require('../data/models/user');
var fs = require('fs');
var path = require('path');
var http = require('http');

module.exports = function(app) {

function setTime() {
  x = new Date();
  y = x.getTime() - 1372395800000;
  return y;
}

  app.get('/upload', function(req, res) {
    res.render('photos');
  });

  app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        jpgPath = path.resolve('./img_uploads/image' + setTime() + '.jpg'),
        jpegPath = path.resolve('./img_uploads/image' + setTime() + '.jpeg'),
        targetPath = path.resolve('./img_uploads/image' + setTime() + '.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        console.log("this is officially registering as PNG");
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
          var instance = req.session.user.username;
          User.findOne({ 'username' : instance }, function (err, user) {
            user.images.push(targetPath);
            user.save();
            if (err) return handleError(err);
            });
            console.log("Upload completed!");
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
    } else {
        fs.unlink(tempPath, function () {
          if (err) throw err;
            console.error("Only .jpeg or .png files are allowed!");
        });
    }
    res.redirect('/');
    console.log(req);
});
};