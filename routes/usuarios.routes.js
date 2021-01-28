// ruta  /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { validaCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/valida-jwt');


const router = Router();



router.get('/', validaJWT, getUsuarios);
// aqui definimos el  etodo post, en el segundo parmetro, definimos varios middleware
// que seran validadores, para garantizar que los valores que lleguen sean correctos
// de acuerdo  nuestras  validaciones deseadas
router.post('/', [
        check('nombre', 'El nombre  no debe ser vacio').notEmpty(),
        check('password', 'El password es obligatorio').notEmpty(),
        check('email', 'El email es mandatorio').isEmail(),
        validaCampos
    ],
    postUsuario);


router.put('/:id', [

    validaJWT,
    check('nombre', 'El nombre  no debe ser vacio').notEmpty(),
    check('role', 'El role es obligatorio').notEmpty(),
    check('email', 'El email es mandatorio').isEmail(),
    validaCampos
], putUsuario);

router.delete('/:id', validaJWT, deleteUsuario);




module.exports = router;