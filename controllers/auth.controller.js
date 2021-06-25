const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generaJwt } = require('../utilities/jwt');
const { response } = require('express');
const { googleVerify } = require('../utilities/google-verify');

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




const googleSingIn = async(req, resp = response) => {

    console.log('este es antes de lo que trae  el request');

    const googleToken = req.body.token;
    console.log(googleToken);

    const { name, email, picture } = await googleVerify(googleToken);

    try {



        // validamos  si el usuario existe en la  BD, lo  buscamos por email
        const userExistente = await Usuario.findOne({ email: email });
        let usuario;


        if (!userExistente) {

            console.log('no existe  el bendito usuario');
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: 'password de prueba',
                img: picture,
                role: 'USER_ROLE',
                google: false
            });

        } else {

            console.log('SI exste  el usuario', userExistente);
            // el usuario si existe  en la BD
            usuario = userExistente;
            usuario.google = true;
        }

        // guardamos en la BD el usuario
        await usuario.save();

        console.log('despues de  salvar al usuario');

        const token = await generaJwt(usuario._id);

        console.log('despues de  generar el token', token);


        resp.json({
            ok: true,
            msg: 'todo ok con google sing on',
            googleToken,
            name,
            email,
            picture,
            token
        });

    } catch (error) {

        resp.status(401).json({
            ok: false,
            msg: 'hubo pedo con google sing on',
            error
        });

    }
}

module.exports = { login, googleSingIn };