// api/uploads

const { Router } = require('express');
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/valida-jwt');
const { uploadToFile } = require('../controllers/uploads.controller');

const fileUpload = require('express-fileupload');

const route = Router();


route.use(fileUpload());

route.put('/:tbl/:id', validaJWT, uploadToFile);


module.exports = route;