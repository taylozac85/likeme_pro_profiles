var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	email: {type: String, unique: true},
	password: String,
	company: String,
	location: String,
	description: String,
	website: String,
	phone: String,
	address: String,
	profile_pic: String
});

module.exports = UserSchema;