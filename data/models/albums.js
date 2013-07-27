var mongoose = require('mongoose');
var AlbumSchema = require('../schemas/albums');

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;