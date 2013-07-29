var User = require('../data/models/user.js');

function creation = User.create(req.body, function(err) {      
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
  }
);


module.exports = creation;