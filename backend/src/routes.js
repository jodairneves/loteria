const express = require('express');

const LotoFacil = require('./controllers/LotoFacilController');

const routes = express.Router();

routes.post('/games', LotoFacil.create);

module.exports = routes;
