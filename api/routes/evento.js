'use strict'

var express = require('express');
var EventoController = require('../controllers/evento');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/eventos' });

api.get('/evento/:id', md_auth.ensureAuth, EventoController.getEvento);
api.post('/evento', md_auth.ensureAuth, EventoController.saveEvento);
api.get('/eventos/:page?', md_auth.ensureAuth, EventoController.getEventos);
api.put('/evento/:id', md_auth.ensureAuth, EventoController.updateEvento);
api.delete('/evento/:id', md_auth.ensureAuth, EventoController.deleteEvento);
api.post('/upload-image-evento/:id', [md_auth.ensureAuth, md_upload], EventoController.uploadImage);
api.get('/get-image-evento/:imageFile', EventoController.getImageFile);

module.exports = api;
