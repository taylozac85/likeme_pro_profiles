var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
	name: String,
	user_email: String,
	images: []
});

module.exports = AlbumSchema;