const bcrypt = require('bcryptjs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizaImagen } = require('../utilities/actualiza_imagen');




const uploadToFile = (req, resp = response) => {

    const tbl = req.params.tbl;
    const id = req.params.id;
    const tblValidas = ['hospitales', 'usuarios', 'medicos'];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];


    console.log("valor de la  tabla", tbl);
    console.log("valor del id", id);


    if (!tblValidas.includes(tbl)) {

        resp.status(400).json({
            ok: false,
            msg: 'algo salio mal,revisa de nuevo las tablas'
        });
    }

    // validacion que revisa  si se mando o no un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }


    // procesamos la imagen

    // extraemos la imagen
    const fileUp = req.files.imagen;

    // obtenemos  y validamos la  extension
    const nombreSeparado = fileUp.name.split('.'); // nombre_version.1.3.jpg
    const extension = nombreSeparado[nombreSeparado.length - 1];

    if (!extensionesValidas.includes(extension.toLowerCase())) {

        return resp.status(400).json({
            ok: false,
            msg: 'es una extension invalida'
        });
    }

    const nombreFinalArchivo = `${ uuidv4() }.${extension}`;
    const path = `./uploads/${tbl}/${nombreFinalArchivo}`;


    // Use the mv() method to place the file somewhere on your server
    fileUp.mv(path, (err) => {

        if (err)
            return resp.status(500).json({
                ok: false,
                msg: 'todo esta  mal,  a  tratar de  mover el archivo en la  ruta deseada'
            });
    });


    actualizaImagen(tbl, id, nombreFinalArchivo);


    return resp.status(200).json({
        ok: true,
        msg: 'este  es un mensaje de prueba upload to server',
        nombre: nombreFinalArchivo
    });

};




module.exports = { uploadToFile }