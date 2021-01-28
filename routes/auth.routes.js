// ruta  /api/login

const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validaCampos } = require('../middlewares/validar-campos');


const router = Router();

// login
router.post('/', [
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es mandatorio').isEmail(),
    validaCampos
], login);


module.exports = router;