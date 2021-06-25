const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { listenerCount } = require('../models/usuario');
const { generaJwt } = require('../utilities/jwt');


// PARA  OBTENER  LOS USUARIOS
const getUsuarios = async(req, resp) => {

    console.log('uid  desde getusuarios:', req.uid);


    const desde = Number(req.query.desde) || 0;

    console.log('paginacion:', desde);

    const usuarios = await Usuario.find()
        .skip(desde)
        .limit(3);

    resp.json({
        ok: true,
        message: 'Hola mundo, todo salio  bien',
        usuarios: usuarios
    });
}


// PARA  AGREGAR  UN USUARIO
const postUsuario = async(req, resp) => {

    // LEEMOS  LO QUE  NOS AMNDA EL FRONT-END  Y  LO GUARDAMOS EN LA BD
    const { email, password, nombre } = req.body;
    const usuario = new Usuario(req.body);


    // BUSCAMOS  SI EL EMAIL EXISTE
    const existeUsuario = await Usuario.findOne({ email: usuario.email });

    if (existeUsuario) {
        return resp.status(400).json({
            ok: false,
            mesg: 'El usuario ya Existe,  revisalo por favor'
        });
    }

    try {

        // ANTES DE GUARDAR EL USUARIO, ENCRIPTAMOS EL PASSWORD A UNA VIA 
        const sal_semilla = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, sal_semilla);
        console.log('nuevo password', usuario.password);

        // GRABAMOS A  LA BD
        await usuario.save();

        // generamos  el token para  regresarlo
        const token = await generaJwt(usuario._id);


        resp.json({
            ok: true,
            usuario: usuario,
            token: token
        });

    } catch (error) {

        console.log('algo ocurrio  en la BD', error);
        resp.status(500).json({
            ok: false,
            msg: 'upss un error ocurrio'
        });
    }
}



// PARA ACTUALIZAR UN USUARIO
const putUsuario = async(req, resp) => {

    try {

        // obtenemos el id
        const uid_param = req.params.id;
        const userRequest = req.body;

        console.log('<-----------------------------');
        console.log('sasasas:' + uid_param);
        console.log(userRequest);
        console.log('----------------------------->');

        // buscamos el registro del usuario
        const userToUpdate = await Usuario.findById(uid_param);

        if (userRequest.email === userToUpdate.email) {
            console.log(' se  borrara el email');
            delete userRequest.email;
        }

        delete userRequest.password;
        delete userRequest.google;

        console.log('antes de hacer la actualizacion', userRequest);
        const userActualizado = await Usuario.findByIdAndUpdate(uid_param, userRequest, { new: true });
        console.log('despues de hacer la actualizacion');


        resp.status(200).json({
            ok: true,
            msg: ' se realizo la actualizacion',
            usuario: userActualizado
        });


    } catch (error) {
        console.log('ocurrio un error al actualizar', error);

        resp.status(500).json({
            ok: false,
            msg: ' ocurrio un error al actualizar el usuario'
        });
    }

}



// PARA  BORRAR UN USUARIO
// NOTA:  normalmente  ya no se  recomiendo borrar
// lo  registros de la  BD,  solo  le podriamso  cmabiar el estaus
// de activo a  inactivo y  listenerCount,peor  para  fines PRACTICOS
// LO  HAREMOS


const deleteUsuario = async(req, resp) => {

    console.log('entrando al borrado de  usuario');
    const id_param = req.params.id;
    console.log('el ID es :' + id_param);

    try {


        // buscamos el registro del usuario
        const userToDelete = await Usuario.findById(id_param);

        if (userToDelete) {
            console.log('el suuario si existe :' + userToDelete);

            const borrado = await Usuario.deleteOne({ _id: id_param });

            console.log('lo que  regreso  borrado:' + borrado);

            resp.status(200).json({

                ok: true,
                msg: 'El usuario  fue  borrado',
                usuario: borrado
            });

        }



    } catch (error) {

        resp.status(500).json({

            ok: false,
            msg: 'El usuario  no existe o NO fue  borrado',

        });
    }

};




module.exports = { getUsuarios, postUsuario, putUsuario, deleteUsuario };