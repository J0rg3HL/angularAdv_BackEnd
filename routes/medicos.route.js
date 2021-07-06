// api/medicos

const { Router } = require('express');
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/valida-jwt');
const { getMedicos, crearMedicos, updateMedicos, borrarMedicos } = require('../controllers/medicos.controller');

const route = Router();



route.get('/', validaJWT, getMedicos);

route.post('/', [
    validaJWT,
    check('nombre', 'el  nombre es mandatorio enviarlo').notEmpty(),
    check('hospital', 'el  ID del hospital es invalido ').isMongoId(),
    validaCampos
], crearMedicos);

route.put('/:id', [validaJWT,
    check('nombre', 'el  nombre es mandatorio enviarlo').notEmpty(),
    check('hospital', 'el  ID del hospital es invalido ').isMongoId(),
], updateMedicos);

route.delete('/:id', validaJWT, borrarMedicos);





module.exports = route;