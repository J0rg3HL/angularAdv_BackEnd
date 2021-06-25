// api/busqueda

const { Router } = require('express');
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/valida-jwt');
const { getBusquedaTodo, getBusquedaEspecifica } = require('../controllers/busqueda.controller');


const route = Router();



route.get('/:busqda', validaJWT, getBusquedaTodo);

route.get('/search/:tbl/:busqda', validaJWT, getBusquedaEspecifica);








module.exports = route;