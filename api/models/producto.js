'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
		number: String,
		name: String,
		duration: String,
		file: String,
		categoria: { type: Schema.ObjectId, ref: 'Categoria'}
});

module.exports = mongoose.model('Producto', ProductoSchema);