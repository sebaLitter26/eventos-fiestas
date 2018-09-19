'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Evento = require('../models/evento');
var Categoria = require('../models/categoria');
var Producto = require('../models/producto');

function getCategoria(req, res){
	var categoriaId = req.params.id;

	Categoria.findById(categoriaId).populate({path: 'evento'}).exec((err, categoria)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!categoria){
				res.status(404).send({message: 'El categoria no existe.'});
			}else{
				res.status(200).send({categoria});
			}
		}
	});
}

function getCategorias(req, res){
	var eventoId = req.params.evento;

	if(!eventoId){
		// Sacar todos los categorias de la bbdd
		var find = Categoria.find({}).sort('title');
	}else{
		// Sacar los categorias de un eventoa concreto de la bbdd
		var find = Categoria.find({evento: eventoId}).sort('year');
	}

	find.populate({path: 'evento'}).exec((err, categorias) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!categorias){
				res.status(404).send({message: 'No hay categorias'});
			}else{
				res.status(200).send({categorias});
			}
		}
	});
}

function saveCategoria(req, res){
	var categoria = new Categoria();

	var params = req.body;
	categoria.title = params.title;
	categoria.description = params.description;
	categoria.year = params.year;
	categoria.image = 'null';
	categoria.evento = params.evento;

	categoria.save((err, categoriaStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!categoriaStored){
				res.status(404).send({message: 'No se ha guardado el categoria'});
			}else{
				res.status(200).send({categoria: categoriaStored});
			}
		}
	});
}

function updateCategoria(req, res){
	var categoriaId = req.params.id;
	var update = req.body;

	Categoria.findOneAndUpdate(categoriaId, update, (err, categoriaUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!categoriaUpdated){
				res.status(404).send({message: 'No se ha actualizado el categoria'});
			}else{
				res.status(200).send({categoria: categoriaUpdated});
			}
		}
	});
}

function deleteCategoria(req, res){
	var categoriaId = req.params.id;

	Categoria.findOneAndDelete(categoriaId, (err, categoriaRemoved)=>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el categoria'});
		}else{
			if(!categoriaRemoved){
				res.status(404).send({message: 'El categoria no ha sido eliminado'});
			}else{

				Producto.deleteOne({categoria: categoriaRemoved._id},(err, productoRemoved)=>{
					if(err){
						res.status(500).send({message: 'Error al eliminar el producto'});
					}else{
						if(!productoRemoved){
							res.status(404).send({message: 'El producto no ha sido eliminado'});
						}else{
							res.status(200).send({categoria: categoriaRemoved});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var categoriaId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

			Categoria.findOneAndUpdate(categoriaId, {image: file_name}, (err, categoriaUpdated) => {
				if(!categoriaUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({categoria: categoriaUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}

	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/categorias/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	getCategoria,
	saveCategoria,
	getCategorias,
	updateCategoria,
	deleteCategoria,
	uploadImage,
	getImageFile
};
