'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/productos' });

api.get('/producto/:id', md_auth.ensureAuth, ProductoController.getProducto);
api.post('/producto', md_auth.ensureAuth, ProductoController.saveProducto);
api.get('/productos/:categoria?', md_auth.ensureAuth, ProductoController.getProductos);
api.put('/producto/:id', md_auth.ensureAuth, ProductoController.updateProducto);
api.delete('/producto/:id', md_auth.ensureAuth, ProductoController.deleteProducto);
api.post('/upload-file-producto/:id', [md_auth.ensureAuth, md_upload], ProductoController.uploadFile);
api.get('/get-producto-file/:productoFile', ProductoController.getProductoFile);


module.exports = api;