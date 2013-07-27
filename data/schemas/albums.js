var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	user_email: {
		type: String,
		required: true
	},
	images: [],
	created_at: { type: Date, default: Date.now } 
});

module.exports = AlbumSchema;