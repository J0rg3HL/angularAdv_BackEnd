const { Router } = require('express');
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/valida-jwt');
const { getHospitales, crearHospitales, updateHospitales, borrarHospitales } = require('../controllers/hospitales.controller');

const route = Router();



route.get('/', validaJWT, getHospitales);





route.post('/', [
        validaJWT,
        check('nombre', 'el nombre  del  hospital es necesario, burro').notEmpty(),
        validaCampos
    ],
    crearHospitales);



route.put('/:id', [validaJWT,
    check('nombre', 'el nombre  del  hospital es necesario, burro').notEmpty(),
    validaCampos
], updateHospitales);

route.delete('/:id', [validaJWT], borrarHospitales);





module.exports = route;