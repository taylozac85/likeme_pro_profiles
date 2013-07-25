var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');

module.exports = function(app) {

  app.get('/users/new', notLoggedIn, function(req, res) {
    res.render('new');
  });

  app.post('/users', function(req, res, next) {
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
      res.redirect('/profile');
    });
  });

};