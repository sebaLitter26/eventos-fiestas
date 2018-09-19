'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Evento = require('../models/evento');
var Categoria = require('../models/categoria');
var Producto = require('../models/producto');

function getProducto(req, res){
	var productoId = req.params.id;

	Producto.findById(productoId).populate({path: 'categoria'}).exec((err, producto) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!producto){
				res.status(404).send({message: 'EL producto no existe !!'});
			}else{
				res.status(200).send({producto});
			}
		}
	});
}

function getProductos(req, res){
	var categoriaId = req.params.categoria;

	if(!categoriaId){
		var find = Producto.find({}).sort('number');
	}else{
		var find = Producto.find({categoria: categoriaId}).sort('number');
	}

	find.populate({
		path: 'categoria',
		populate: {
			path: 'evento',
			model: 'Evento'
		}
	}).exec(function(err, productos){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!productos){
				res.status(404).send({message: 'No hay productos !!'});
			}else{
				res.status(200).send({productos});
			}
		}
	});
}

function saveProducto(req, res){
	var producto = new Producto();

	var params = req.body;
	producto.number = params.number;
	producto.name  = params.name;
	producto.duration = params.duration;
	producto.file = null;
	producto.categoria = params.categoria;

	producto.save((err, productoStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!productoStored){
				res.status(404).send({message: 'No se ha guardado el producto'});
			}else{
				res.status(200).send({producto: productoStored});
			}
		}
	});
}

function updateProducto(req, res){
	var productoId = req.params.id;
	var update = req.body;

	Producto.findOneAndUpdate(productoId, update, (err, productoUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!productoUpdated){
				res.status(404).send({message: 'No se ha actualizado el producto'});
			}else{
				res.status(200).send({producto: productoUpdated});
			}
		}
	});
}

function deleteProducto(req, res){
	var productoId = req.params.id;

	Producto.findOneAndDelete(productoId, (err, productoRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!productoRemoved){
				res.status(404).send({message: 'No se ha borrado el producto'});
			}else{
				res.status(200).send({producto: productoRemoved});
			}
		}
	});
}


function uploadFile(req, res){
	var productoId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'mp3' || file_ext == 'ogg'){

			Producto.findOneAndUpdate(productoId, {file: file_name}, (err, productoUpdated) => {
				if(!productoUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el producto'});
				}else{
					res.status(200).send({producto: productoUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}

	}else{
		res.status(200).send({message: 'No has subido el fichero de audio...'});
	}
}

function getProductoFile(req, res){
	var imageFile = req.params.productoFile;
	var path_file = './uploads/productos/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe el fichero de audio...'});
		}
	});
}


module.exports = {
	getProducto,
	getProductos,
	saveProducto,
	updateProducto,
	deleteProducto,
	uploadFile,
	getProductoFile
};
