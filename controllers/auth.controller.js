const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generaJwt } = require('../utilities/jwt');

const login = async(req, resp) => {

    try {

        console.log(req.body);

        // VALIDAMSO EL CORREO INGRESADO
        const emailValido = await Usuario.findOne({ email: req.body.email });

        if (emailValido) {
            console.log('  si lo encontro:' + emailValido);

            if (!bcrypt.compareSync(req.body.password, emailValido.password)) {
                console.log('los passwords  NO  son iguales, no seas  noob');
            }

            // si  ya llego a qui es  porque   SI COINCIDE  EL PASSWORD
            // ENTONCES  GEERAREMOS UN TOKEN -JWT

            const token = await generaJwt(emailValido._id);

            resp.status(200).json({
                ok: true,
                msg: 'que  pedo  rita ?',
                token: token

            });

        } else {

            // se manda  algun erroro  indicando que la contraseña y password  no coinciden
        }



    } catch (error) {

        resp.status(500).json({
            ok: false,
            msg: 'heble  cn eladministrador'
        });
    }

};

module.exports = { login };