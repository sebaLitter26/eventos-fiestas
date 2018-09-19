'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
		title: String,
		description: String,
		year: Number,
		image: String,
		evento: { type: Schema.ObjectId, ref: 'Evento'}
});

module.exports = mongoose.model('Categoria', CategoriaSchema);