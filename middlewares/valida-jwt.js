const jsonwebtoken = require('jsonwebtoken');


const validaJWT = (req, resp, netx) => {

    // LEEMOS EL TOKEN QUE  VIENEEN LOS HEADERS
    // YA QUE ASI DECIDIMOS MANDARLO
    const token = req.header('x-token');
    console.log('token leido: ', token);

    if (!token) {
        // SI NO HAY UN TOKEN, LE INFORMAMOS AL USUARIO
        resp.status(401).json({
            ok: false,
            msg: 'no mandaste  token,  favor de  verificar tu solicitud'
        });
    }

    try {

        const { uid } = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        console.log(' ***** es el uid: ', uid);
        req.uid = uid;

        // SIN ESTE METODO NO  VA  A FUNCIONAR 
        netx();

    } catch (error) {

        resp.status(401).json({
            ok: false,
            msg: 'el token es  invalido'
        });

    }

};

module.exports = { validaJWT }