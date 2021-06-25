// ruta  /api/login

const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
const { validaCampos } = require('../middlewares/validar-campos');


const router = Router();

// login
router.post('/', [
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es mandatorio').isEmail(),
    validaCampos
], login);


router.post('/google', [
    check('token', 'El token de Google es obligatorio').notEmpty(),
    validaCampos
], googleSingIn);


module.exports = router;