module.exports = function(app) {
  
  app.get('/profile', function(req, res) {
    res.render('profile');
  });

  app.get('/edit-profile', function(req, res){
  	res.render('edit-profile');
  });

  app.get('/pro-profile', function(req, res){
  	res.render('pro-profile');
  });


};