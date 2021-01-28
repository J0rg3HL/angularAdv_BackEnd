const { validationResult } = require('express-validator'); // para  obtener el esultado de las  validaciones

const validaCampos = (req, resp, next) => {

    // validamos si hubieron errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            msg: 'hubo errores de  validacion',
            msg2: errores
        });
    }

    //   si llega aca es que no hubo errores, asiq ue llamamos al next
    next();
};

module.exports = { validaCampos };