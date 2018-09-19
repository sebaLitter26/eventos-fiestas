'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categoria');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/categorias' });

api.get('/categoria/:id', md_auth.ensureAuth, CategoriaController.getCategoria);
api.post('/categoria', md_auth.ensureAuth, CategoriaController.saveCategoria);
api.get('/categorias/:evento?', md_auth.ensureAuth, CategoriaController.getCategorias);
api.put('/categoria/:id', md_auth.ensureAuth, CategoriaController.updateCategoria);
api.delete('/categoria/:id', md_auth.ensureAuth, CategoriaController.deleteCategoria);
api.post('/upload-image-categoria/:id', [md_auth.ensureAuth, md_upload], CategoriaController.uploadImage);
api.get('/get-image-categoria/:imageFile', CategoriaController.getImageFile);

module.exports = api;