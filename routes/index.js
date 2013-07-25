/*
 * GET home page.
 */

var User = require('../data/models/user')

module.exports = function(app) {
  app.get('/', function(req, res){
  	if (req.session.user) {
  		res.redirect('/profile');
  		console.log(req.session.user);
  	} else {
  		res.render('index');
  	}
  });
  
};