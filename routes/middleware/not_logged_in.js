function notLoggedIn(req, res, next) {
	if (req.session.user) {
		res.redirect("pro-profile");
	} else {
		next();
	}
}

module.exports = notLoggedIn;