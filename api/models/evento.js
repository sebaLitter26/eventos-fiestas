'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = Schema({
		name: String,
		description: String,
		image: String
});

module.exports = mongoose.model('Evento', EventoSchema);
