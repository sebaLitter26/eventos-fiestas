'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Evento = require('../models/evento');
var Categoria = require('../models/categoria');
var Producto = require('../models/producto');

function getEvento(req, res){
	var eventoId = req.params.id;

	Evento.findById(eventoId, (err, evento) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!evento){
				res.status(404).send({message: 'El evento no existe'});
			}else{
				res.status(200).send({evento});
			}
		}
	});

}

function getEventos(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Evento.find().sort('name').paginate(page, itemsPerPage, function(err, eventos, total){
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!eventos){
				res.status(404).send({message: 'No hay eventos !!'});
			}else{
				return res.status(200).send({
					total_items: total,
					eventos: eventos
				});
			}
		}
	});
}


function saveEvento(req, res){
	var evento = new Evento();

	var params = req.body;
	evento.name = params.name;
	evento.description = params.description;
	evento.image = 'null';

	evento.save((err, eventoStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el evento'});
		}else{
			if(!eventoStored){
				res.status(404).send({message: 'El evento no ha sido guardado'});
			}else{
				res.status(200).send({evento: eventoStored});
			}
		}
	});
}


function updateEvento(req, res){
	var eventoId = req.params.id;
	var update = req.body;

	Evento.findOneAndUpdate(eventoId, update, (err, eventoUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el evento'});
		}else{
			if(!eventoUpdated){
				res.status(404).send({message: 'El evento no ha sido actualizado'});
			}else{
				res.status(200).send({evento: eventoUpdated});
			}
		}
	});
}

function deleteEvento(req, res){
	var eventoId = req.params.id;

	Evento.findOneAndDelete(eventoId, (err, eventoRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el evento'});
		}else{
			if(!eventoRemoved){
				res.status(404).send({message: 'El evento no ha sido eliminado'});
			}else{
				Categoria.deleteOne({evento: eventoRemoved._id},(err, categoriaRemoved)=>{
					if(err){
						res.status(500).send({message: 'Error al eliminar el categoria'});
					}else{
						if(!categoriaRemoved){
							res.status(404).send({message: 'El categoria no ha sido eliminado'});
						}else{

							Producto.deleteOne({categoria: categoriaRemoved._id},(err, productoRemoved)=>{
								if(err){
									res.status(500).send({message: 'Error al eliminar la canción'});
								}else{
									if(!productoRemoved){
										res.status(404).send({message: 'La canción no ha sido eliminada'});
									}else{
										res.status(200).send({evento: eventoRemoved});
									}
								}
							});
						}
					}
				});

			}
		}
	});
}

function uploadImage(req, res){
	var eventoId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' ||  file_ext == 'gif'){

			Evento.findOneAndUpdate(eventoId, {image: file_name}, (err, eventoUpdated) => {
				if(!eventoId){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({evento: eventoUpdated});
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
	var path_file = './uploads/eventos/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	getEvento,
	saveEvento,
	getEventos,
	updateEvento,
	deleteEvento,
	uploadImage,
	getImageFile
};
