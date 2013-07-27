module.exports = function(app) {
  
  app.get('/', function(req, res) {
  	if (req.session.user){
  		res.redirect('/pro-profile');
  	} else {
    	res.redirect('users/new');
    }
  });

};