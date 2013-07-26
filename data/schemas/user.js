var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: { 
	  type: String, 
	  required: true
	},
	email: { 
	  type: String,
	  unique: true, 
	  required: true
	},
	password: {
	  type: String,
	  required: true
	},
	company: String,
	location: String,
	description: String,
	website: String,
	phone: String,
	address: String,
	profile_pic: String,
	images: []
});

module.exports = UserSchema;